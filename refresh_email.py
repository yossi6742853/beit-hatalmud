#!/usr/bin/env python3
"""Refresh email-cache.js from Gmail via Apps Script proxy."""
import requests, json, datetime, os, sys

PROXY = 'https://script.google.com/macros/s/AKfycbwIFeKofkqY-VRbth-Sja4IDD6vMi-P5L3C9QsI-k3E/exec'
AGENT_TOKEN = 'BHT_AGENT_2026'
OUTPUT = os.path.join(os.path.dirname(__file__), 'js', 'email-cache.js')

# OAuth
# OAuth credentials — set via environment variables or .env file
CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET', '')
REFRESH_TOKEN = os.environ.get('GOOGLE_REFRESH_TOKEN', '')

def get_token():
    r = requests.post('https://oauth2.googleapis.com/token', data={
        'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET,
        'refresh_token': REFRESH_TOKEN, 'grant_type': 'refresh_token'
    })
    return r.json()['access_token']

def gmail_proxy(token, action, **params):
    params['agentToken'] = AGENT_TOKEN
    params['agentAction'] = action
    r = requests.get(PROXY, params=params, headers={'Authorization': f'Bearer {token}'}, allow_redirects=True, timeout=30)
    return r.json()

def main():
    print('Getting OAuth token...')
    token = get_token()

    print('Fetching inbox (50)...')
    inbox = gmail_proxy(token, 'gmailList', q='in:inbox', max='50')
    print(f'  Got {len(inbox)} threads')

    print('Fetching sent (30)...')
    sent = gmail_proxy(token, 'gmailList', q='in:sent newer_than:30d', max='30')
    print(f'  Got {len(sent)} threads')

    max_threads = int(sys.argv[1]) if len(sys.argv) > 1 else 15
    print(f'Reading {max_threads} threads...')
    threads = {}
    for i, t in enumerate(inbox[:max_threads]):
        try:
            msgs = gmail_proxy(token, 'gmailRead', id=t['id'])
            if isinstance(msgs, list):
                threads[t['id']] = msgs
                print(f'  {i+1}/{max_threads} OK')
        except Exception as e:
            print(f'  {i+1}/{max_threads} ERR: {e}')

    cache = {
        'inbox': inbox, 'sent': sent, 'threads': threads,
        '_lastUpdated': datetime.datetime.now().isoformat(),
        '_account': '6787012@gmail.com'
    }

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write(f'/* Email cache - {datetime.datetime.now().strftime("%Y-%m-%d %H:%M")} */\n')
        f.write('const EMAIL_CACHE = ')
        json.dump(cache, f, ensure_ascii=True, indent=None)
        f.write(';\n')

    size = os.path.getsize(OUTPUT)
    print(f'\nDone! {OUTPUT} ({size:,} bytes)')
    print(f'  {len(inbox)} inbox, {len(sent)} sent, {len(threads)} threads')

if __name__ == '__main__':
    main()

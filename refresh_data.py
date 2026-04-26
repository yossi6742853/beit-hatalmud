#!/usr/bin/env python3
"""
refresh_data.py - Download all sheets from BHT API and rebuild js/data-cache.js
Run: python refresh_data.py
"""

import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime

# --- Config ---
API_URL = "https://script.google.com/macros/s/AKfycbx5tzS-Br4F4-JkH2N4qPJ2kA5bNxqqYgzfmvB19YM6NitHFgNziSxhKfZx2gSnX8ySIw/exec"
API_TOKEN = "bht2026"
MAX_RECORDS = 200  # Cap large sheets

SHEETS = [
    "\u05EA\u05DC\u05DE\u05D9\u05D3\u05D9\u05DD",
    "\u05D4\u05D5\u05E8\u05D9\u05DD",
    "\u05E9\u05DB\u05E8_\u05DC\u05D9\u05DE\u05D5\u05D3",
    "\u05E0\u05D5\u05DB\u05D7\u05D5\u05EA",
    "\u05DE\u05D1\u05D7\u05E0\u05D9\u05DD",
    "\u05E6\u05D9\u05D5\u05E0\u05D9\u05DD",
    "\u05D5\u05E2\u05D3\u05D5\u05EA",
    "\u05DE\u05E9\u05D9\u05DE\u05D5\u05EA",
    "\u05E7\u05D5\u05E4\u05D4_\u05E7\u05D8\u05E0\u05D4",
    "\u05DE\u05D9\u05D3\u05E2_\u05E8\u05E4\u05D5\u05D0\u05D9",
    "\u05D8\u05D9\u05D5\u05DC\u05D9\u05DD",
    "\u05DC\u05D5\u05D7_\u05E9\u05E0\u05D4",
    "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",
    "\u05D9\u05D5\u05DE\u05DF_\u05E4\u05E2\u05D9\u05DC\u05D5\u05EA",
    "\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9_\u05D1\u05D9\u05EA",
    "\u05D4\u05EA\u05E0\u05D4\u05D2\u05D5\u05EA",
    "\u05DE\u05E2\u05E8\u05DB\u05EA_\u05E9\u05E2\u05D5\u05EA",
    "\u05EA\u05D5\u05DB\u05E0\u05D9\u05D5\u05EA_\u05EA\u05E9\u05DC\u05D5\u05DD",
    "\u05EA\u05E7\u05E9\u05D5\u05E8\u05EA_\u05D4\u05D5\u05E8\u05D9\u05DD",
    "\u05DE\u05E1\u05D2\u05E8\u05D5\u05EA",
    "\u05E6\u05D5\u05D5\u05EA",
    "\u05E9\u05DB\u05E8_\u05E6\u05D5\u05D5\u05EA",
    "\u05DE\u05E1\u05DE\u05DB\u05D9_\u05E6\u05D5\u05D5\u05EA",
    "\u05EA\u05E7\u05E6\u05D9\u05D1",
    "\u05DE\u05D1\u05E6\u05E2_\u05DC\u05D9\u05DE\u05D5\u05D3",
    "\u05E7\u05D1\u05E6\u05D9\u05DD_\u05DE\u05E6\u05D5\u05E8\u05E4\u05D9\u05DD",
]

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "js", "data-cache.js")


def fetch_sheet(name):
    """Fetch a single sheet from the API."""
    url = f"{API_URL}?mode=api&action=list&sheet={urllib.parse.quote(name)}&token={API_TOKEN}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "BHT-Refresh/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if "error" in data:
                return []
            return data.get("data", [])
    except Exception as e:
        print(f"  ! {name}: {e}")
        return []


import urllib.parse


def main():
    print("=" * 50)
    print("  BHT Data Refresh")
    print("=" * 50)
    print(f"API: {API_URL[:60]}...")
    print(f"Output: {OUTPUT_FILE}")
    print(f"Max records per sheet: {MAX_RECORDS}")
    print()

    cache = {}
    total = 0

    for i, sheet in enumerate(SHEETS, 1):
        print(f"[{i:2d}/{len(SHEETS)}] {sheet}...", end=" ", flush=True)
        rows = fetch_sheet(sheet)
        count = len(rows)
        if count > MAX_RECORDS:
            rows = rows[:MAX_RECORDS]
            print(f"{count} -> capped to {MAX_RECORDS}")
        else:
            print(f"{count} records")
        cache[sheet] = rows
        total += len(rows)

    cache["_lastUpdated"] = datetime.now().isoformat()

    print()
    print(f"Total: {total} records across {len(SHEETS)} sheets")

    # Write output
    js_content = "var DATA_CACHE = " + json.dumps(cache, ensure_ascii=True) + ";"
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)

    size_kb = os.path.getsize(OUTPUT_FILE) / 1024
    print(f"Written: {OUTPUT_FILE} ({size_kb:.0f} KB)")
    print(f"Last updated: {cache['_lastUpdated']}")
    print()
    print("Done! Refresh the browser to see new data.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Upload local student folders to Google Drive (private folder)"""
import os, sys, json, time, requests, mimetypes
from pathlib import Path

# Config
TOKEN_FILE = os.path.expanduser("~/drive_token.txt")
LOCAL_DIR = os.path.expanduser("~/Downloads/תיקי_תלמידים_תלא")
DRIVE_ROOT = "1IRL5jc86XGxRDLpZQbgoY9uBjRq-Majz"
DRIVE_API = "https://www.googleapis.com/drive/v3"
UPLOAD_API = "https://www.googleapis.com/upload/drive/v3"

def get_token():
    """Get fresh OAuth token from environment or config file"""
    # Try env var first, then config file
    creds_path = os.path.expanduser("~/.bht_oauth.json")
    if os.path.exists(creds_path):
        with open(creds_path) as f:
            creds = json.load(f)
    else:
        print(f"ERROR: Create {creds_path} with client_id, client_secret, refresh_token")
        sys.exit(1)
    r = requests.post("https://oauth2.googleapis.com/token", data={
        "client_id": creds["client_id"],
        "client_secret": creds["client_secret"],
        "refresh_token": creds["refresh_token"],
        "grant_type": "refresh_token"
    })
    return r.json()["access_token"]

def headers(token):
    return {"Authorization": f"Bearer {token}"}

def find_or_create_folder(token, name, parent_id):
    """Find existing folder or create new one"""
    q = f"name='{name}' and '{parent_id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false"
    r = requests.get(f"{DRIVE_API}/files", params={"q": q, "fields": "files(id,name)"}, headers=headers(token))
    files = r.json().get("files", [])
    if files:
        return files[0]["id"]
    # Create
    r = requests.post(f"{DRIVE_API}/files", json={
        "name": name, "mimeType": "application/vnd.google-apps.folder", "parents": [parent_id]
    }, headers=headers(token))
    return r.json().get("id")

def file_exists(token, name, parent_id):
    """Check if file already exists in folder"""
    q = f"name='{name}' and '{parent_id}' in parents and trashed=false"
    r = requests.get(f"{DRIVE_API}/files", params={"q": q, "fields": "files(id)"}, headers=headers(token))
    files = r.json().get("files", [])
    return files[0]["id"] if files else None

def upload_file(token, local_path, parent_id):
    """Upload file to Drive using curl + gzip (bypasses NetFree)"""
    import subprocess, gzip as gz, tempfile
    name = os.path.basename(local_path)
    mime = mimetypes.guess_type(local_path)[0] or "application/octet-stream"

    for attempt in range(3):
        try:
            # Step 1: Get resumable upload URL via curl
            meta = json.dumps({"name": name, "parents": [parent_id]})
            r1 = subprocess.run([
                "curl", "-s", "-X", "POST",
                f"{UPLOAD_API}/files?uploadType=resumable&fields=id,name",
                "-H", f"Authorization: Bearer {token}",
                "-H", "Content-Type: application/json",
                "-d", meta, "-D", "-"
            ], capture_output=True, text=True, timeout=15)

            upload_url = ""
            for line in r1.stdout.split("\n"):
                if line.lower().startswith("location:"):
                    upload_url = line.split(":", 1)[1].strip()
                    break
            if not upload_url:
                if attempt < 2:
                    time.sleep(2)
                    continue
                return None

            # Step 2: Gzip the file
            gz_path = os.path.expanduser("~/upload_tmp.gz")
            with open(local_path, "rb") as f:
                raw = f.read()
            with open(gz_path, "wb") as f:
                with gz.GzipFile(fileobj=f, mode="wb") as g:
                    g.write(raw)

            # Step 3: Upload via curl with gzip
            r2 = subprocess.run([
                "curl", "-s", "-X", "PUT", upload_url,
                "-H", "Content-Encoding: gzip",
                "-H", f"Content-Type: {mime}",
                "--data-binary", f"@{gz_path}"
            ], capture_output=True, text=True, timeout=120)

            try:
                os.remove(gz_path)
            except:
                pass

            if '"id"' in r2.stdout:
                return json.loads(r2.stdout).get("id")
            if attempt < 2:
                time.sleep(2)
        except Exception as e:
            if attempt < 2:
                time.sleep(2)
            else:
                print(f" ERR:{e}")
    return None

def main():
    print("=== Upload Student Folders to Google Drive ===\n")

    if not os.path.isdir(LOCAL_DIR):
        print(f"ERROR: {LOCAL_DIR} not found")
        sys.exit(1)

    token = get_token()
    print(f"Token OK. Root folder: {DRIVE_ROOT}\n")

    # Get all student folders
    student_dirs = sorted([
        d for d in os.listdir(LOCAL_DIR)
        if os.path.isdir(os.path.join(LOCAL_DIR, d)) and not d.startswith("_")
    ])

    total_uploaded = 0
    total_skipped = 0
    total_errors = 0

    for i, student in enumerate(student_dirs):
        student_path = os.path.join(LOCAL_DIR, student)
        print(f"[{i+1}/{len(student_dirs)}] {student}...", end="", flush=True)

        # Refresh token every 20 students
        if i > 0 and i % 20 == 0:
            token = get_token()

        # Find or create student folder on Drive
        folder_id = find_or_create_folder(token, student, DRIVE_ROOT)
        if not folder_id:
            print(" ERROR creating folder")
            total_errors += 1
            continue

        # Upload files in student folder
        uploaded = 0
        skipped = 0
        for item in os.listdir(student_path):
            item_path = os.path.join(student_path, item)

            if os.path.isdir(item_path):
                # Create subfolder and upload its contents
                sub_id = find_or_create_folder(token, item, folder_id)
                if not sub_id:
                    continue
                for sub_item in os.listdir(item_path):
                    sub_path = os.path.join(item_path, sub_item)
                    if os.path.isfile(sub_path):
                        existing = file_exists(token, sub_item, sub_id)
                        if existing:
                            skipped += 1
                            continue
                        fid = upload_file(token, sub_path, sub_id)
                        if fid:
                            uploaded += 1
                        else:
                            total_errors += 1
            elif os.path.isfile(item_path):
                existing = file_exists(token, item, folder_id)
                if existing:
                    skipped += 1
                    continue
                fid = upload_file(token, item_path, folder_id)
                if fid:
                    uploaded += 1
                else:
                    total_errors += 1

        total_uploaded += uploaded
        total_skipped += skipped
        print(f" +{uploaded} new, {skipped} exist")

    print(f"\n=== DONE ===")
    print(f"Uploaded: {total_uploaded}")
    print(f"Skipped (already exist): {total_skipped}")
    print(f"Errors: {total_errors}")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Refresh all data caches: Sheets + Email + Drive catalog"""
import subprocess, sys, os, time

DIR = os.path.dirname(os.path.abspath(__file__))

scripts = [
    ('refresh_data.py', 'DATA_CACHE (Google Sheets)'),
    ('refresh_email.py', 'EMAIL_CACHE (Gmail)'),
]

print("=== Refresh All Data ===\n")
for script, desc in scripts:
    path = os.path.join(DIR, script)
    if not os.path.exists(path):
        print(f"SKIP: {desc} ({script} not found)")
        continue
    print(f">>> {desc}...")
    t0 = time.time()
    result = subprocess.run([sys.executable, path], cwd=DIR, capture_output=True, text=True, timeout=120)
    elapsed = time.time() - t0
    if result.returncode == 0:
        # Show last line of output
        last = (result.stdout.strip().split('\n') or [''])[-1]
        print(f"    OK ({elapsed:.1f}s) — {last}")
    else:
        print(f"    ERROR ({elapsed:.1f}s) — {(result.stderr or result.stdout)[:200]}")
    print()

print("=== Done! Run: git add -A && git commit -m 'Refresh data' && git push ===")

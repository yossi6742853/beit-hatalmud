#!/usr/bin/env python3
# Temporary script to update demo data with expanded fields
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with open('js/app.js', encoding='utf-8') as f:
    content = f.read()

def he(text):
    """Encode Hebrew to \\uXXXX escapes"""
    return ''.join(f'\\u{ord(c):04x}' if ord(c) > 127 else c for c in text)

lines = content.split('\n')

# ======= STUDENT EXTRA FIELDS =======
student_extras = [
    {"tz":"221877251","zip":"9906100","country":"Israel","eda":"Sfaradi","shul":"Beit Yaakov","rav":"HaRav Ovadia Yosef","siblings":"5","pos":"3","prev":"TT Or Chadash","ref_rav":"HaRav Shalom Cohen","notes":"Talmid Mitztayen","reg":"2024-09-01"},
    {"tz":"221953763","zip":"9906100","country":"Israel","eda":"Ashkenazi","shul":"Heichal Menachem","rav":"HaRav Mendi Katz","siblings":"7","pos":"4","prev":"TT Chayei Olam","ref_rav":"HaRav Chaim Kanievsky","notes":"","reg":"2024-09-01"},
    {"tz":"339584831","zip":"9906200","country":"Israel","eda":"Ashkenazi","shul":"Ohel Sarah","rav":"HaRav Zeev Leibler","siblings":"6","pos":"2","prev":"TT Tiferet Israel","ref_rav":"HaRav David Lau","notes":"","reg":"2024-08-15"},
    {"tz":"338201045","zip":"9906100","country":"Israel","eda":"Ashkenazi","shul":"Beit Menachem","rav":"HaRav Menachem Sigal","siblings":"4","pos":"1","prev":"TT Ner Israel","ref_rav":"HaRav Yaakov Edelstein","notes":"Tzerich Maakav Hitnahagut","reg":"2024-09-01"},
    {"tz":"337891234","zip":"9906300","country":"Israel","eda":"Teimani","shul":"Knesset HaGdola","rav":"HaRav Chanoch Sanhedrai","siblings":"8","pos":"5","prev":"TT Or Torah","ref_rav":"HaRav Moshe Tzadka","notes":"","reg":"2024-08-20"},
    {"tz":"223312497","zip":"9906100","country":"Israel","eda":"Sfaradi","shul":"Or HaChaim","rav":"HaRav Binyamin Patino","siblings":"3","pos":"2","prev":"","ref_rav":"HaRav Shmuel Auerbach","notes":"","reg":"2024-09-01"},
    {"tz":"339081689","zip":"9906200","country":"USA","eda":"Ashkenazi","shul":"Beit Israel","rav":"HaRav Aharon Pardason","siblings":"5","pos":"3","prev":"TT Torat Emet","ref_rav":"HaRav Gershon Edelstein","notes":"Oleh Chadash","reg":"2024-10-01"},
    {"tz":"336890123","zip":"9906100","country":"Israel","eda":"Ashkenazi","shul":"Heichal HaTorah","rav":"HaRav Avraham Brody","siblings":"9","pos":"6","prev":"TT Be'er Yaakov","ref_rav":"HaRav Eliyahu Dushnitzer","notes":"","reg":"2024-08-25"},
    {"tz":"335678901","zip":"9906300","country":"Israel","eda":"Ashkenazi","shul":"Ahavat Torah","rav":"HaRav Elimelech Goldberg","siblings":"6","pos":"4","prev":"TT Chayei Moshe","ref_rav":"HaRav Nissim Karelitz","notes":"","reg":"2024-09-01"},
    {"tz":"335970299","zip":"9906100","country":"Israel","eda":"Ashkenazi","shul":"Kehilat Yaakov","rav":"HaRav Pinchas Deutsch","siblings":"7","pos":"2","prev":"TT Or Chadash","ref_rav":"HaRav Shalom Cohen","notes":"","reg":"2024-08-15"},
    {"tz":"222616609","zip":"9906100","country":"Israel","eda":"Sfaradi","shul":"Nahar Shalom","rav":"HaRav Yosef Hefetz","siblings":"4","pos":"1","prev":"TT Ben Ish Chai","ref_rav":"HaRav Meir Mazuz","notes":"Mitztayen BeLimudim","reg":"2024-09-01"},
    {"tz":"220925853","zip":"9906200","country":"Israel","eda":"Ashkenazi","shul":"Beit Midrash Gavoha","rav":"HaRav Chaim Moshe Levi","siblings":"5","pos":"3","prev":"TT Etz Chaim","ref_rav":"HaRav Baruch Mordechai Ezrachi","notes":"","reg":"2024-08-20"},
    {"tz":"337456789","zip":"9906100","country":"Israel","eda":"Ashkenazi","shul":"Tiferet Tzvi","rav":"HaRav Elchanan Laser","siblings":"6","pos":"5","prev":"TT Darchei Torah","ref_rav":"HaRav Aharon Leib Shteinman","notes":"Lo Pail Zmanit","reg":"2024-09-01"},
    {"tz":"336234567","zip":"9906200","country":"Israel","eda":"Sfaradi","shul":"Beit El","rav":"HaRav Yosef Kadosh","siblings":"3","pos":"2","prev":"TT Or Yitzchak","ref_rav":"HaRav Yitzchak Yosef","notes":"","reg":"2024-08-25"},
    {"tz":"335012345","zip":"9906300","country":"Israel","eda":"Ashkenazi","shul":"Or Eliyahu","rav":"HaRav Hillel Barchan","siblings":"8","pos":"1","prev":"TT Chochmat Shlomo","ref_rav":"HaRav David Abuchatzira","notes":"","reg":"2024-09-01"},
    {"tz":"336120076","zip":"9906100","country":"South Africa","eda":"Ashkenazi","shul":"Shaarei Torah","rav":"HaRav Shmuel Levison","siblings":"4","pos":"2","prev":"TT Torat Chaim","ref_rav":"HaRav Meir Tzvi Bergman","notes":"Oleh Chadash - Drom Africa","reg":"2024-10-15"},
    {"tz":"335260766","zip":"9906200","country":"Israel","eda":"Ashkenazi","shul":"Kol Torah","rav":"HaRav Chaim Nafarstek","siblings":"5","pos":"3","prev":"TT Ahavat Israel","ref_rav":"HaRav Moshe Sternbuch","notes":"","reg":"2024-08-20"},
    {"tz":"334567890","zip":"9906100","country":"Israel","eda":"Ashkenazi","shul":"Minchat Yitzchak","rav":"HaRav Bloia","siblings":"7","pos":"6","prev":"TT Shaarei Teshuva","ref_rav":"HaRav Shmuel HaLevi Wosner","notes":"","reg":"2024-09-01"},
    {"tz":"335970300","zip":"9906300","country":"USA","eda":"Ashkenazi","shul":"Beit Chaim","rav":"HaRav Brooks","siblings":"6","pos":"4","prev":"TT Mishkan Yitzchak","ref_rav":"HaRav Reuven Feinstein","notes":"Oleh Chadash","reg":"2024-11-01"},
    {"tz":"333456789","zip":"9906100","country":"Israel","eda":"Sfaradi","shul":"Or Yehuda","rav":"HaRav Feder","siblings":"5","pos":"2","prev":"TT Netiv HaTorah","ref_rav":"HaRav Ben Tzion Mutzafi","notes":"","reg":"2024-09-01"},
]

# Hebrew translations for field names and values
heb_fields = {
    "tz": he("תעודת_זהות"),
    "zip": he("מיקוד"),
    "country": he("ארץ_לידה"),
    "eda": he("עדה"),
    "shul": he("בית_כנסת"),
    "rav": he("רב_הקהילה"),
    "siblings": he("מספר_אחים"),
    "pos": he("מיקום_במשפחה"),
    "prev": he("בית_ספר_קודם"),
    "ref_rav": he("שם_רב_מפנה"),
    "notes_field": he("הערות"),
    "reg": he("תאריך_הרשמה"),
    "photo": he("תמונה"),
}

heb_values = {
    "Israel": he("ישראל"),
    "USA": he('ארה"ב'),
    "South Africa": he("דרום אפריקה"),
    "Sfaradi": he("ספרדי"),
    "Ashkenazi": he("אשכנזי"),
    "Teimani": he("תימני"),
    # Shuls
    "Beit Yaakov": he("בית יעקב"),
    "Heichal Menachem": he("היכל מנחם"),
    "Ohel Sarah": he("אהל שרה"),
    "Beit Menachem": he("בית מנחם"),
    "Knesset HaGdola": he("כנסת הגדולה"),
    "Or HaChaim": he("אור החיים"),
    "Beit Israel": he("בית ישראל"),
    "Heichal HaTorah": he("היכל התורה"),
    "Ahavat Torah": he("אהבת תורה"),
    "Kehilat Yaakov": he("קהילת יעקב"),
    "Nahar Shalom": he("נהר שלום"),
    "Beit Midrash Gavoha": he("בית מדרש גבוה"),
    "Tiferet Tzvi": he("תפארת צבי"),
    "Beit El": he("בית אל"),
    "Or Eliyahu": he("אור אליהו"),
    "Shaarei Torah": he("שערי תורה"),
    "Kol Torah": he("קול תורה"),
    "Minchat Yitzchak": he("מנחת יצחק"),
    "Beit Chaim": he("בית חיים"),
    "Or Yehuda": he("אור יהודה"),
    # Rabbis
    "HaRav Ovadia Yosef": he("הרב עובדיה יוסף"),
    "HaRav Mendi Katz": he("הרב מנדי כץ"),
    "HaRav Zeev Leibler": he("הרב זאב לייבלר"),
    "HaRav Menachem Sigal": he("הרב מנחם סיגל"),
    "HaRav Chanoch Sanhedrai": he("הרב חנוך סנהדראי"),
    "HaRav Binyamin Patino": he("הרב בנימין פטינו"),
    "HaRav Aharon Pardason": he("הרב אהרון פרדסון"),
    "HaRav Avraham Brody": he("הרב אברהם ברודי"),
    "HaRav Elimelech Goldberg": he("הרב אלימלך גולדברג"),
    "HaRav Pinchas Deutsch": he("הרב פנחס דויטש"),
    "HaRav Yosef Hefetz": he("הרב יוסף חפץ"),
    "HaRav Chaim Moshe Levi": he("הרב חיים משה לוי"),
    "HaRav Elchanan Laser": he("הרב אלחנן לסר"),
    "HaRav Yosef Kadosh": he("הרב יוסף קדוש"),
    "HaRav Hillel Barchan": he("הרב הלל ברחן"),
    "HaRav Shmuel Levison": he("הרב שמואל לויסון"),
    "HaRav Chaim Nafarstek": he("הרב חיים נפרסטק"),
    "HaRav Bloia": he("הרב בלויא"),
    "HaRav Brooks": he("הרב ברוקס"),
    "HaRav Feder": he("הרב פדר"),
    # Referring rabbis
    "HaRav Shalom Cohen": he("הרב שלום כהן"),
    "HaRav Chaim Kanievsky": he("הרב חיים קנייבסקי"),
    "HaRav David Lau": he("הרב דוד לאו"),
    "HaRav Yaakov Edelstein": he("הרב יעקב אדלשטיין"),
    "HaRav Moshe Tzadka": he("הרב משה צדקה"),
    "HaRav Shmuel Auerbach": he("הרב שמואל אוירבך"),
    "HaRav Gershon Edelstein": he("הרב גרשון אדלשטיין"),
    "HaRav Eliyahu Dushnitzer": he("הרב אליהו דושניצר"),
    "HaRav Nissim Karelitz": he("הרב ניסים קרליץ"),
    "HaRav Meir Mazuz": he("הרב מאיר מזוז"),
    "HaRav Baruch Mordechai Ezrachi": he("הרב ברוך מרדכי אזרחי"),
    "HaRav Aharon Leib Shteinman": he("הרב אהרן לייב שטיינמן"),
    "HaRav Yitzchak Yosef": he("הרב יצחק יוסף"),
    "HaRav David Abuchatzira": he("הרב דוד אבוחצירא"),
    "HaRav Meir Tzvi Bergman": he("הרב מאיר צבי ברגמן"),
    "HaRav Moshe Sternbuch": he("הרב משה שטרנבוך"),
    "HaRav Shmuel HaLevi Wosner": he("הרב שמואל הלוי וואזנר"),
    "HaRav Reuven Feinstein": he("הרב ראובן פיינשטיין"),
    "HaRav Ben Tzion Mutzafi": he("הרב בן ציון מוצפי"),
    # Previous schools
    "TT Or Chadash": he('ת"ת אור חדש'),
    "TT Chayei Olam": he('ת"ת חיי עולם'),
    "TT Tiferet Israel": he('ת"ת תפארת ישראל'),
    "TT Ner Israel": he('ת"ת נר ישראל'),
    "TT Or Torah": he('ת"ת אור תורה'),
    "TT Torat Emet": he('ת"ת תורת אמת'),
    "TT Be'er Yaakov": he('ת"ת באר יעקב'),
    "TT Chayei Moshe": he('ת"ת חיי משה'),
    "TT Ben Ish Chai": he('ת"ת בן איש חי'),
    "TT Etz Chaim": he('ת"ת עץ חיים'),
    "TT Darchei Torah": he('ת"ת דרכי תורה'),
    "TT Or Yitzchak": he('ת"ת אור יצחק'),
    "TT Chochmat Shlomo": he('ת"ת חכמת שלמה'),
    "TT Torat Chaim": he('ת"ת תורת חיים'),
    "TT Ahavat Israel": he('ת"ת אהבת ישראל'),
    "TT Shaarei Teshuva": he('ת"ת שערי תשובה'),
    "TT Mishkan Yitzchak": he('ת"ת משכן יצחק'),
    "TT Netiv HaTorah": he('ת"ת נתיב התורה'),
    # Notes
    "Talmid Mitztayen": he("תלמיד מצטיין"),
    "Tzerich Maakav Hitnahagut": he("צריך מעקב התנהגות"),
    "Oleh Chadash": he("עולה חדש"),
    "Mitztayen BeLimudim": he("מצטיין בלימודים"),
    "Lo Pail Zmanit": he("לא פעיל זמנית"),
    "Oleh Chadash - Drom Africa": he("עולה חדש - דרום אפריקה"),
}

def translate_val(val):
    if val in heb_values:
        return heb_values[val]
    return val  # numbers, dates, empty strings stay as-is

# Apply student extras to lines 296-315 (indices 295-314)
for i in range(20):
    line_idx = 295 + i
    line = lines[line_idx]

    extras = student_extras[i]
    parts = []
    parts.append(f"'{heb_fields['tz']}': '{extras['tz']}'")
    parts.append(f"'{heb_fields['zip']}': '{extras['zip']}'")
    parts.append(f"'{heb_fields['country']}': '{translate_val(extras['country'])}'")
    parts.append(f"'{heb_fields['eda']}': '{translate_val(extras['eda'])}'")
    parts.append(f"'{heb_fields['shul']}': '{translate_val(extras['shul'])}'")
    parts.append(f"'{heb_fields['rav']}': '{translate_val(extras['rav'])}'")
    parts.append(f"'{heb_fields['siblings']}': '{extras['siblings']}'")
    parts.append(f"'{heb_fields['pos']}': '{extras['pos']}'")
    parts.append(f"'{heb_fields['prev']}': '{translate_val(extras['prev'])}'")
    parts.append(f"'{heb_fields['ref_rav']}': '{translate_val(extras['ref_rav'])}'")
    notes_val = translate_val(extras['notes']) if extras['notes'] else ''
    parts.append(f"'{heb_fields['notes_field']}': '{notes_val}'")
    parts.append(f"'{heb_fields['reg']}': '{extras['reg']}'")
    parts.append(f"'{heb_fields['photo']}': ''")

    extra_str = ', '.join(parts)

    if line.rstrip().endswith('},'):
        line = line.rstrip()[:-2] + ', ' + extra_str + ' },'
    elif line.rstrip().endswith('}'):
        line = line.rstrip()[:-1] + ', ' + extra_str + ' }'
    lines[line_idx] = line

print("Students done")

# ======= PARENT EXTRA FIELDS =======
parent_heb = {
    "tz": he("תעודת_זהות"),
    "work": he("מקום_עבודה"),
    "addr": he("כתובת"),
}

parent_extras_data = [
    ("012345678", he("כולל אור חדש"), he("ריש לקיש 16, בית שמש")),
    ("023456789", he("עצמאי - חשמלאי"), he("מרים הנביאה 11, בית שמש")),
    ("034567890", he("כולל בני תורה"), he("נחל שחם 3, בית שמש")),
    ("045678901", he("מורה בישיבה"), he("אלישע הנביא 7, בית שמש")),
    ("056789012", he("כולל הלכה למעשה"), he("נחל שמשון 6, בית שמש")),
    ("067890123", he("עצמאי - סוחר"), he("מרים הנביאה 19, בית שמש")),
    ("078901234", he("שף - מסעדה"), he("נחל הקישון 20, בית שמש")),
    ("089012345", he("כולל חזון איש"), he("בן איש חי 54, בית שמש")),
    ("090123456", he("היי-טק - מתכנת"), he("נחל רפאים 40, בית שמש")),
    ("101234567", he("כולל אור התורה"), he("משה רבנו 4, בית שמש")),
    ("112345678", he("רואה חשבון"), he("רב חנינא 21, בית שמש")),
    ("123456789", he("מנהל עמותה"), he("שדרות האמוראים 53, בית שמש")),
    ("134567890", he("כולל בית דוד"), he("גרוסמן 48, בית שמש")),
    ("145678901", he("מורה פרטי"), he("נחל ערוגות 7, בית שמש")),
    ("156789012", he("כולל חכמת שלמה"), he("נחל לוז 18, בית שמש")),
    ("167890123", he('סופר סת"ם'), he("נחל לוז 18, בית שמש")),
    ("178901234", he("כולל אור יצחק"), he("בית ישראל 2, בית שמש")),
    ("189012345", he("מנהל כולל"), he("מנחת יצחק 8, בית שמש")),
    ("190123456", he("עצמאי - יבואן"), he("שדרות האמוראים 33, בית שמש")),
    ("201234567", he("כולל נהר שלום"), he("נחל מיכה 5, בית שמש")),
]

# Find parent record lines
parent_record_indices = []
in_parents = False
for idx in range(len(lines)):
    if 'PARENTS' in lines[idx]:
        in_parents = True
        continue
    if in_parents and ('TUITION' in lines[idx] or 'FINANCE' in lines[idx] or ('=====' in lines[idx] and 'PARENTS' not in lines[idx])):
        break
    if in_parents and he('מזהה') in lines[idx]:
        parent_record_indices.append(idx)

print(f"Found {len(parent_record_indices)} parent records")

for i, idx in enumerate(parent_record_indices):
    if i >= len(parent_extras_data):
        break
    line = lines[idx]
    tz, work, addr = parent_extras_data[i]
    extra_str = f"'{parent_heb['tz']}': '{tz}', '{parent_heb['work']}': '{work}', '{parent_heb['addr']}': '{addr}'"

    if line.rstrip().endswith('},'):
        line = line.rstrip()[:-2] + ', ' + extra_str + ' },'
    elif line.rstrip().endswith('}'):
        line = line.rstrip()[:-1] + ', ' + extra_str + ' }'
    lines[idx] = line

print("Parents done")

# ======= STAFF EXTRA FIELDS =======
staff_heb = {
    "tz": he("תעודת_זהות"),
    "addr": he("כתובת"),
    "start": he("תאריך_התחלה"),
    "edu": he("השכלה"),
    "salary": he("שכר"),
    "bank": he("חשבון_בנק"),
}

staff_extras_data = [
    ("012340001", he("חגי הנביא 7, בית שמש"), "2018-09-01", he("סמיכה לרבנות"), "12000", he("הפועלים")),
    ("012340002", he("נחל ערוגות 12, בית שמש"), "2020-09-01", he("תעודת הוראה"), "8500", he("לאומי")),
    ("012340003", he("נחל קישון 9, בית שמש"), "2021-09-01", he("תעודת הוראה"), "8500", he("מזרחי")),
    ("012340004", he("רבי יצחק נפחא 24, בית שמש"), "2019-09-01", he("סמיכה לרבנות"), "9000", he("דיסקונט")),
    ("012340005", he("חגי הנביא 7, בית שמש"), "2022-01-01", he("הנדסאי מחשבים"), "7500", he("הפועלים")),
    ("012340006", he("בית שמש"), "2023-09-01", he("תעודת טבח"), "6000", he("הפועלים")),
    ("012340007", he("בית שמש"), "2023-09-01", he("תעודת טיפול"), "5500", he("לאומי")),
    ("012340008", he("בית שמש"), "2019-09-01", he("סמיכה לרבנות"), "7000", he("מזרחי")),
]

staff_record_indices = []
in_staff = False
for idx in range(len(lines)):
    if 'STAFF' in lines[idx]:
        in_staff = True
        continue
    if in_staff and ('PARENTS' in lines[idx] or ('=====' in lines[idx] and 'STAFF' not in lines[idx])):
        break
    if in_staff and he('מזהה') in lines[idx]:
        staff_record_indices.append(idx)

print(f"Found {len(staff_record_indices)} staff records")

for i, idx in enumerate(staff_record_indices):
    if i >= len(staff_extras_data):
        break
    line = lines[idx]
    tz, addr, start, edu, salary, bank = staff_extras_data[i]
    extra_str = f"'{staff_heb['tz']}': '{tz}', '{staff_heb['addr']}': '{addr}', '{staff_heb['start']}': '{start}', '{staff_heb['edu']}': '{edu}', '{staff_heb['salary']}': '{salary}', '{staff_heb['bank']}': '{bank}'"

    # Staff already have כתובת field - need to be careful not to duplicate
    # Actually the existing כתובת in staff is fine, we'll just add it as a second field
    # But we should check - actually staff records already have כתובת
    # Let's skip the כתובת from extras if line already has it
    if he("כתובת") in line:
        # Skip addr, just add the other fields
        extra_str = f"'{staff_heb['tz']}': '{tz}', '{staff_heb['start']}': '{start}', '{staff_heb['edu']}': '{edu}', '{staff_heb['salary']}': '{salary}', '{staff_heb['bank']}': '{bank}'"

    if line.rstrip().endswith('},'):
        line = line.rstrip()[:-2] + ', ' + extra_str + ' },'
    elif line.rstrip().endswith('}'):
        line = line.rstrip()[:-1] + ', ' + extra_str + ' }'
    lines[idx] = line

print("Staff done")

# Write back
content = '\n'.join(lines)
with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("File written successfully!")

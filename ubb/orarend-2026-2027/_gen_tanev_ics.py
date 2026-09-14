# -*- coding: utf-8 -*-
"""Generate UBB tanév structure ICS for orarend-2026-2027.

Dates: limbi română/engleză (matches teaching schedule on csaladen.es).
Labels: Hungarian, prefixed with UBB. Teaching weeks: \"UBB - week N\".
"""
from datetime import date, timedelta
from pathlib import Path

OUT = Path(__file__).with_name("tanev-2026-2027.ics")


def weeks(start: date, end: date):
    cur = start
    out = []
    while cur <= end:
        wend = min(cur + timedelta(days=6), end)
        out.append((cur, wend))
        cur = wend + timedelta(days=1)
    return out


def fmt(d: date) -> str:
    return d.strftime("%Y%m%d")


events: list[str] = []
uid = 0
DTSTAMP = "20260914T100000Z"


def add(summary: str, start: date, end: date, desc: str = "", cats: str = "Tanév"):
    global uid
    uid += 1
    end_excl = end + timedelta(days=1)
    lines = [
        "BEGIN:VEVENT",
        f"UID:tanev-{uid:03d}@csala.ubb",
        f"DTSTAMP:{DTSTAMP}",
        f"DTSTART;VALUE=DATE:{fmt(start)}",
        f"DTEND;VALUE=DATE:{fmt(end_excl)}",
        f"SUMMARY:{summary}",
    ]
    if desc:
        lines.append(f"DESCRIPTION:{desc}")
    lines += [f"CATEGORIES:{cats}", "TRANSP:TRANSPARENT", "END:VEVENT", ""]
    events.extend(lines)


# SEMESTRUL I (identical RO/EN and HU/DE)
add("UBB - Tanév előkészítése", date(2026, 9, 24), date(2026, 9, 25))

s1a = weeks(date(2026, 9, 28), date(2026, 12, 20))
assert len(s1a) == 12, len(s1a)
for i, (a, b) in enumerate(s1a, 1):
    add(f"UBB - week {i}", a, b, "1. félév — oktatási hét")

add("UBB - Karácsonyi szünet", date(2026, 12, 21), date(2027, 1, 2))

s1b = weeks(date(2027, 1, 4), date(2027, 1, 17))
assert len(s1b) == 2, len(s1b)
for i, (a, b) in enumerate(s1b, 13):
    add(f"UBB - week {i}", a, b, "1. félév — oktatási hét")

add("UBB - Vizsgaidőszak", date(2027, 1, 18), date(2027, 2, 7), "1. félév")
add("UBB - Szünet", date(2027, 2, 8), date(2027, 2, 14))
add("UBB - Pótvizsga-időszak", date(2027, 2, 15), date(2027, 2, 21), "1. félév")

# SEMESTRUL II — română/engleză, ani neterminali (matches orarend dates)
s2a = weeks(date(2027, 2, 22), date(2027, 5, 2))
assert len(s2a) == 10, len(s2a)
for i, (a, b) in enumerate(s2a, 1):
    add(f"UBB - week {i}", a, b, "2. félév — oktatási hét")

add("UBB - Húsvéti szünet", date(2027, 5, 3), date(2027, 5, 9))

s2b = weeks(date(2027, 5, 10), date(2027, 6, 6))
assert len(s2b) == 4, len(s2b)
for i, (a, b) in enumerate(s2b, 11):
    add(f"UBB - week {i}", a, b, "2. félév — oktatási hét")

add("UBB - Vizsgaidőszak", date(2027, 6, 7), date(2027, 6, 27), "2. félév")
add("UBB - Szünet", date(2027, 6, 28), date(2027, 7, 4))
add("UBB - Pótvizsga-időszak", date(2027, 7, 5), date(2027, 7, 11), "2. félév")
add("UBB - Gyakorlati időszak", date(2027, 7, 12), date(2027, 8, 1), "ahol releváns")
add("UBB - Nyári szünet", date(2027, 8, 2), date(2027, 10, 3))

for d, name in [
    (date(2026, 12, 1), "UBB - Nagy Egyesülés napja (szabadnap)"),
    (date(2027, 1, 6), "UBB - Vízkereszt (szabadnap)"),
    (date(2027, 1, 7), "UBB - Keresztelő Szent János (szabadnap)"),
    (date(2027, 1, 24), "UBB - A Román Fejedelemségek Egyesülésének napja (szabadnap)"),
    (date(2027, 4, 30), "UBB - Nagypéntek (szabadnap)"),
    (date(2027, 5, 1), "UBB - A munka ünnepe (szabadnap)"),
    (date(2027, 6, 1), "UBB - Gyermeknap (szabadnap)"),
    (date(2027, 6, 21), "UBB - Pünkösd hétfő (szabadnap)"),
]:
    add(name, d, d, cats="Szabadnap")

header = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Csala Denes//UBB Tanev 2026-2027//HU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:UBB tanév 2026-2027",
    "X-WR-TIMEZONE:Europe/Bucharest",
    "X-WR-CALDESC:UBB FMI tanévstruktúra 2026-2027 (ró/en, nem végzős). Forrás: https://www.cs.ubbcluj.ro/invatamant/structura-anului-universitar/",
    "",
]

OUT.write_bytes(("\r\n".join(header + events + ["END:VCALENDAR"]) + "\r\n").encode("utf-8"))
print(f"Wrote {OUT} ({uid} events)")

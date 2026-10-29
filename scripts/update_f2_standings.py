#!/usr/bin/env python3
"""Refresh F2 driver and team points from FIA's public 2026 standings."""
import re
import sys
import unicodedata
from datetime import datetime, timezone
from io import StringIO

import pandas as pd
from urllib.request import Request, urlopen

REPO_FILE = "f2-data.js"
BASE = "https://www.fiaformula2.com/en/standings/2026"


def norm(value):
    value = unicodedata.normalize("NFKD", str(value))
    value = "".join(c for c in value if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def read_table(url, kind):
    with urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30) as response:
        html = response.read().decode("utf-8")
    tables = pd.read_html(StringIO(html))
    for table in tables:
        cols = {norm(c[-1] if isinstance(c, tuple) else c): c for c in table.columns}
        name_col = next((c for n, c in cols.items() if n in ({"driver", "drivers"} if kind == "driver" else {"team", "teams"})), None)
        points_col = next((c for n, c in cols.items() if "point" in n or n in {"pts", "pts."}), None)
        if name_col is None or points_col is None:
            continue
        rows = []
        for _, row in table.iterrows():
            name = re.sub(r"^\s*\d+\s*", "", str(row[name_col])).strip()
            points = pd.to_numeric(row[points_col], errors="coerce")
            if name and name.lower() != "nan" and pd.notna(points):
                rows.append((name, int(points)))
        if rows:
            return rows
    raise RuntimeError(f"Could not find FIA {kind} standings table at {url}")


def replace_points(text, kind, rows):
    if kind == "driver":
        # Match FIA abbreviated names to the full names already used by the UI.
        entries = re.findall(r'\{ pos: (\d+),\s*name: "([^"]+)"[^\n]*?points: (\d+) \}', text)
        source = {norm(name).split()[-1]: (pos, points) for pos, (name, points) in enumerate(rows, 1)}
        updated = 0
        for _, name, _ in entries:
            key = norm(name).split()[-1]
            match = source.get(key)
            if not match:
                raise RuntimeError(f"FIA standings do not include existing driver: {name}")
            pos, points = match
            pattern = re.compile(r'(\{ pos: )\d+(,\s*name: "' + re.escape(name) + r'"[^\n]*?points: )\d+( \})')
            text, count = pattern.subn(lambda m: m.group(1) + str(pos) + m.group(2) + str(points) + m.group(3), text, count=1)
            updated += count
        if updated != len(entries):
            raise RuntimeError("Not all F2 driver rows were refreshed")
    else:
        team_rows = {norm(name): (pos, points) for pos, (name, points) in enumerate(rows, 1)}
        entries = re.findall(r'\{ pos: (\d+),\s*teamId: "([^"]+)",\s*points: (\d+) \}', text)
        names = re.search(r'const F2_TEAM_NAMES = \{(.*?)\};', text, re.S)
        if not names:
            raise RuntimeError("F2 team names were not found")
        mapping = dict(re.findall(r'([a-z_]+): "([^"]+)"', names.group(1)))
        updated = 0
        for _, team_id, _ in entries:
            name = mapping.get(team_id)
            match = team_rows.get(norm(name or ""))
            if not match:
                raise RuntimeError(f"FIA standings do not include existing team: {name}")
            pos, points = match
            pattern = re.compile(r'(\{ pos: )\d+(,\s*teamId: "' + re.escape(team_id) + r'",\s*points: )\d+( \})')
            text, count = pattern.subn(lambda m: m.group(1) + str(pos) + m.group(2) + str(points) + m.group(3), text, count=1)
            updated += count
        if updated != len(entries):
            raise RuntimeError("Not all F2 team rows were refreshed")
    return text


def main():
    path = sys.argv[1]
    with open(path, encoding="utf-8") as file:
        text = file.read()
    original = text
    drivers = read_table(BASE + "/drivers", "driver")
    teams = read_table(BASE + "/teams", "team")
    text = replace_points(text, "driver", drivers)
    text = replace_points(text, "team", teams)
    if text == original:
        return
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    text, count = re.subn(r'lastUpdated: "[^"]+"', f'lastUpdated: "{timestamp} (FIA)"', text, count=1)
    if count != 1:
        raise RuntimeError("Could not update F2_META.lastUpdated")
    with open(path, "w", encoding="utf-8") as file:
        file.write(text)


if __name__ == "__main__":
    main()

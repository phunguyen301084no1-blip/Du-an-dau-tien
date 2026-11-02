"""Ghép src/logic.js vào src/app.html → dist/index.html (một file tự chứa)."""
import os
d = os.path.dirname(os.path.abspath(__file__))
html = open(f"{d}/src/app.html", encoding="utf-8").read()
logic = open(f"{d}/src/logic.js", encoding="utf-8").read()
assert "/*LOGIC*/" in html
os.makedirs(f"{d}/dist", exist_ok=True)
open(f"{d}/dist/index.html", "w", encoding="utf-8").write(html.replace("/*LOGIC*/", logic))
print("dist/index.html", os.path.getsize(f"{d}/dist/index.html"), "bytes")

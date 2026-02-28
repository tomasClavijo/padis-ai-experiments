"""
Herramienta de generación de la referencia de API de PADIS.

Genera docs/padis_checks_api.md por introspección de la librería padislib
instalada localmente. Lista namespaces de checks (api.*_checks) y decoradores
(padislib.api.decorators.*).

Uso:
    python gen_padis_api_spec.py
"""

from __future__ import annotations

import inspect
import os
from dataclasses import dataclass
from typing import Any


@dataclass
class Item:
    qualname: str
    signature: str
    doc: str


def safe_sig(obj: Any) -> str:
    try:
        return str(inspect.signature(obj))
    except Exception:
        return "(...)"


def first_line_doc(obj: Any) -> str:
    doc = inspect.getdoc(obj) or ""
    doc = doc.strip().splitlines()[0] if doc.strip() else ""
    return doc


def public_callables(obj: Any) -> list[tuple[str, Any]]:
    out: list[tuple[str, Any]] = []
    for name in dir(obj):
        if name.startswith("_"):
            continue
        try:
            val = getattr(obj, name)
        except Exception:
            continue
        if callable(val):
            out.append((name, val))
    return out


def emit_section(title: str, items: list[Item]) -> str:
    lines = [f"## {title}", ""]
    if not items:
        lines.append("_No public callables found._")
        lines.append("")
        return "\n".join(lines)

    for it in sorted(items, key=lambda x: x.qualname.lower()):
        lines.append(f"### `{it.qualname}{it.signature}`")
        if it.doc:
            lines.append(f"- {it.doc}")
        lines.append("")
    return "\n".join(lines)


def discover_check_namespaces(api: Any) -> list[str]:
    return sorted(
        [n for n in dir(api) if not n.startswith("_") and n.endswith("_checks")]
    )


def discover_decorators() -> list[Item]:
    try:
        from padislib.api import decorators as dec_mod
    except Exception:
        from padislib.api import decorators as dec_mod  # type: ignore

    items: list[Item] = []
    for name, fn in public_callables(dec_mod):
        try:
            sig = inspect.signature(fn)
            params = list(sig.parameters.values())
        except Exception:
            params = []

        looks_like_padis_decorator = name in {"group", "title", "score", "hints"}
        if not looks_like_padis_decorator:
            if params and params[0].name in {"api"}:
                looks_like_padis_decorator = True

        if not looks_like_padis_decorator:
            continue

        items.append(
            Item(
                qualname=f"padislib.api.decorators.{name}",
                signature=safe_sig(fn),
                doc=first_line_doc(fn),
            )
        )

    return items


def main() -> int:
    from padislib._api import padisapi

    api = padisapi()

    doc_lines: list[str] = []
    doc_lines.append("# PADIS Checks API Reference (Generated)")
    doc_lines.append("")
    doc_lines.append("> Auto-generated from the locally installed `padislib`.")
    doc_lines.append(
        "> This document lists only the intended surface for exercise check authors:"
    )
    doc_lines.append("> - `api.*_checks` namespaces")
    doc_lines.append("> - `padislib.api.decorators.*` decorators")
    doc_lines.append(
        "> Do not edit manually; edit `tools/gen_padis_api_spec.py` and re-run."
    )
    doc_lines.append("")

    try:
        import padislib

        ver = getattr(padislib, "__version__", None)
        if ver:
            doc_lines.append(f"- Detected `padislib` version: `{ver}`")
            doc_lines.append("")
    except Exception:
        pass

    doc_lines.append("## Usage Pattern (Reference)")
    doc_lines.append("")
    doc_lines.append("- Create API: `api = padisapi()`")
    doc_lines.append("- Decorate checks with: `@group`, `@title`, `@score`, `@hints`")
    doc_lines.append("- Finish with: `api.end()`")
    doc_lines.append("")

    decorators = discover_decorators()
    doc_lines.append(emit_section("Decorators", decorators))

    namespaces = discover_check_namespaces(api)
    doc_lines.append("## Check namespaces discovered")
    doc_lines.append("")
    for ns in namespaces:
        doc_lines.append(f"- `api.{ns}`")
    doc_lines.append("")

    for ns_name in namespaces:
        ns_obj = getattr(api, ns_name, None)
        if ns_obj is None:
            continue

        items: list[Item] = []
        for name, fn in public_callables(ns_obj):
            items.append(
                Item(
                    qualname=f"api.{ns_name}.{name}",
                    signature=safe_sig(fn),
                    doc=first_line_doc(fn),
                )
            )

        doc_lines.append(emit_section(ns_name, items))

    out_path = os.path.join("docs", "padis_checks_api.md")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(doc_lines).rstrip() + "\n")

    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env bash
# Build every cv/resumes/<role>.tex into public/resumes/<role>.pdf with XeLaTeX,
# refusing anything that is not exactly one page or that overflows its margins.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RESUME_DIR="$ROOT_DIR/cv/resumes"
PUBLIC_DIR="$ROOT_DIR/public/resumes"

# Same pdflatex toolchain as cv/cv.tex, plus the TeX Gyre Pagella package.
missing=0
for cmd in pdflatex latexmk kpsewhich; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "missing command: $cmd" >&2
    missing=1
  fi
done
for tex_file in tgpagella.sty microtype.sty titlesec.sty enumitem.sty hyperref.sty geometry.sty; do
  if ! kpsewhich "$tex_file" >/dev/null 2>&1; then
    echo "missing TeX file: $tex_file" >&2
    missing=1
  fi
done
if (( missing != 0 )); then
  cat >&2 <<'EOF'

Install the résumé build dependencies on Arch/CachyOS with:

  paru -S --needed texlive-bin texlive-binextra texlive-basic texlive-xetex texlive-latex texlive-latexrecommended texlive-latexextra texlive-fontsrecommended
EOF
  exit 1
fi

BUILD_DIR="$(mktemp -d "$RESUME_DIR/.build.XXXXXX")"
trap 'rm -rf "$BUILD_DIR"' EXIT

cd "$RESUME_DIR"
for source in *.tex; do
  [[ "$source" == "resume-layout.tex" ]] && continue
  role="${source%.tex}"
  if [[ ! "$role" =~ ^[a-z]+(-[a-z]+)*$ ]]; then
    echo "Invalid resume filename: $source" >&2
    exit 1
  fi
  latexmk -pdf -file-line-error -halt-on-error -interaction=nonstopmode \
    -outdir="$BUILD_DIR" "$source"
  pages="$(tr '\n' ' ' < "$BUILD_DIR/$role.log" | sed -n 's/.*Output written on .* (\([0-9][0-9]*\) pages\{0,1\},.*/\1/p')"
  if [[ "$pages" != "1" ]] || [[ ! -s "$BUILD_DIR/$role.pdf" ]]; then
    echo "$role.pdf has ${pages:-unknown} pages; expected exactly one." >&2
    exit 1
  fi
  if grep -Eq 'Overfull \\[hv]box' "$BUILD_DIR/$role.log"; then
    echo "$role has overflowing content." >&2
    exit 1
  fi
  echo "Verified one page: $role.pdf"
done

# Publish only after every source passes. The PDFs are committed so Vercel
# can serve them without a LaTeX toolchain (same policy as public/cv.pdf).
mkdir -p "$PUBLIC_DIR"
rm -f "$PUBLIC_DIR"/*.pdf
cp "$BUILD_DIR"/*.pdf "$PUBLIC_DIR/"

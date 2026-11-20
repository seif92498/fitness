"""Ship the prebuilt static app and allowlisted editable sources (no secrets)."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
archive = root / 'public/downloads/forma-github-pages.zip'
archive.parent.mkdir(parents=True, exist_ok=True)

fixed = {
    'index.html': 'public/downloads/index.html',
    'README.md': 'publish/github/README.md',
    '.gitignore': '.gitignore',
    'scripts/build-fitness.mjs': 'scripts/build-fitness.mjs',
    'design/training-hero.jpg': 'design/training-hero.jpg',
    'design/fonts/OFL.txt': 'design/fonts/OFL.txt',
}
for name in ('shell.html', 'theme.css', 'catalog.js', 'model.js', 'dashboard.js', 'food.js', 'training.js', 'progress.js', 'boot.js'):
    fixed[f'fitness-source/{name}'] = f'fitness-source/{name}'
for weight in (400, 500, 600, 700):
    for subset in ('arabic', 'latin'):
        name = f'design/fonts/{subset}-{weight}.woff2'
        fixed[name] = name

with ZipFile(archive, mode='w', compression=ZIP_DEFLATED, compresslevel=7) as out:
    for name, source in fixed.items():
        out.write(root / source, arcname=name)
    out.writestr('.nojekyll', '')
print(f'{archive.relative_to(root)} · {len(fixed) + 1} files')

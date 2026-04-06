# Riyadh Intelligence Platform Map

## Deployment

- **Source repo**: `aaamezil-sys/riyadh-intel-map` (THIS REPO — all edits happen here)
- **Deployment repo**: `aaamezil-sys/riyadh-map` (serves the live site, contains a copy of index.html at `riyadh-intel-map/index.html`)
- **Live URL**: https://riyadh.ahmedmezil.com/riyadh-intel-map

After making any changes to `index.html`, always:
1. Commit and push to `main` in THIS repo (`riyadh-intel-map`)
2. ALSO copy the updated `index.html` to the deployment repo (`riyadh-map`) at path `riyadh-intel-map/index.html`
3. If you have access to the `riyadh-map` repo, push the update there too. If not, tell the user they need to manually copy index.html to the deployment repo, or add `riyadh-map` to the session's allowed repositories.

## Project Structure

- `index.html` — The entire application (single-file HTML app with embedded CSS + JS)
- `src/data.js` — Extracted data constants (for testing, mirrors data in index.html)
- `src/logic.js` — Extracted pure functions (for testing, mirrors logic in index.html)
- `tests/` — Vitest test suites
- `TEST_COVERAGE_ANALYSIS.md` — Test coverage gap analysis

## Key Details

- **Mapbox token**: Configured in `index.html`. If deploying to a new domain, add the domain to the token's URL restrictions at https://account.mapbox.com/access-tokens
- **Framework**: Vanilla JS + Mapbox GL JS v3.3.0 + Poppins font
- **Test runner**: `npm test` (Vitest + jsdom)
- **Projects**: 37 Vision 2030 megaprojects across 6 sectors

## Important

- Keep `src/data.js` in sync with the PROJECTS array in `index.html`
- After adding/removing projects, update test expectations in `tests/data.test.js` and `tests/logic.test.js`
- Update stats bar counts, FEED text, and TICKER entries when project count changes

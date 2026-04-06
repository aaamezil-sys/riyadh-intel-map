# Riyadh Intelligence Platform Map

## Deployment

- **Live site**: https://aaamezil-sys.github.io/riyadh-intel-map
- **Hosting**: GitHub Pages, deployed from `main` branch, root `/`
- **To deploy**: push to `main` — GitHub Pages auto-deploys within ~1 minute

After making any changes to `index.html`, always:
1. Commit to `main` (or merge feature branch into `main`)
2. `git push origin main`
3. The site updates automatically

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

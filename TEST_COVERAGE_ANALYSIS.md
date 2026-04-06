# Test Coverage Analysis — Riyadh Intelligence Platform Map

## Current State

The application is a single-file HTML app (`index.html`, 629 lines) containing embedded CSS, data, and JavaScript. Prior to this analysis, the project had **zero tests, zero test infrastructure, and zero CI/CD**.

### What We Added

- **Test framework**: Vitest + jsdom
- **Extracted modules**: `src/data.js` (data constants), `src/logic.js` (pure business logic)
- **67 tests** across 2 test suites covering data integrity and core logic

---

## Test Coverage Summary

| Area | Tests | Status |
|------|-------|--------|
| Data integrity (PROJECTS array) | 14 | Covered |
| Configuration objects (COLORS, EMOJI, SECTOR_LABELS) | 6 | Covered |
| FEED / TICKER data | 4 | Covered |
| `buildGeoJSON()` | 8 | Covered |
| `countProjects()` | 6 | Covered |
| `popupHTML()` | 9 | Covered |
| `getFlyToParams()` | 4 | Covered |
| `formatRiyadhTime()` | 3 | Covered |
| `daysUntil2030()` | 4 | Covered |
| `validateProject()` | 6 | Covered |
| `getFeedSlice()` | 4 | Covered |
| **Map interactions (hover, click, popup lifecycle)** | 0 | **Not covered** |
| **DOM updates (clock, feed rotation, filter buttons)** | 0 | **Not covered** |
| **CSS / visual rendering** | 0 | **Not covered** |
| **Mapbox GL integration** | 0 | **Not covered** |
| **Error handling (image fallback, missing data)** | 0 | **Not covered** |

---

## Areas That Need Improved Test Coverage

### 1. DOM Manipulation & UI State (High Priority)

**What's untested**: `updateClock()`, `rotateFeed()`, `updateCounts()`, and `setActive()` all directly mutate the DOM using `getElementById` and `querySelectorAll`. None of this is tested.

**Why it matters**: These functions run on intervals (every 1s for clock, every 4.5s for feed). A broken DOM update would silently fail with no visible error.

**Recommendation**: Extract DOM-writing logic from interval callbacks. Test with jsdom that the correct elements receive the correct `textContent` and `innerHTML` values. Example tests:
- Clock element updates to `HH:MM:SS` format after `updateClock()` call
- Feed items rotate correctly through all 11 entries
- Filter button styling toggles correctly when `setActive()` is called
- Project count elements update when `updateCounts('sports')` is called

---

### 2. Map Event Handlers — Click, Hover, Popup Lifecycle (High Priority)

**What's untested**: The Mapbox `mousemove`, `mouseleave`, and `click` handlers on the `'dot'` layer contain state management logic (`hoveredId`, `activePopup`, `activeProjectId`). None of this is tested.

**Why it matters**: These are the primary user interactions. Bugs here (e.g., stale hover state, popup not closing) would directly impact usability.

**Recommendation**: Mock the Mapbox `map` object and test:
- Hover sets `feature-state` on the correct feature ID
- Hover clears previous feature state when moving to a new feature
- Click opens popup with correct project data
- Click on a new project closes the previous popup
- Popup close event resets `activePopup` and `activeProjectId` to null
- `applyFilter()` clears existing popup and resets hover state

---

### 3. Filter Integration Flow (Medium Priority)

**What's untested**: `applyFilter(sector, fly)` is partially tested via its sub-functions (`buildGeoJSON`, `countProjects`, `getFlyToParams`), but the **integration** — updating the map source, calling fly-to, and updating DOM — is not tested end-to-end.

**Recommendation**: Integration test with mocked Mapbox source:
- `applyFilter('sports')` causes `map.getSource('projects').setData()` to receive GeoJSON with only sports projects
- `applyFilter('all', false)` skips the `flyTo` call
- Active filter button gets correct border/color styling

---

### 4. Image Error Fallback (Medium Priority)

**What's untested**: The `onerror` handler on popup images replaces the image with an emoji fallback. This uses inline event handlers with escaped quotes — fragile and untested.

**Recommendation**:
- Test that `popupHTML()` output for a project with a broken image URL triggers the fallback
- Consider moving the error handler to a named function for easier testing
- Verify the fallback div uses the correct sector emoji and color

---

### 5. Ticker Animation (Low Priority)

**What's untested**: The ticker duplicates its content (`[...TICKER,...TICKER]`) for seamless CSS scrolling. The duplication logic and HTML generation are not tested.

**Recommendation**: Test that the ticker HTML contains exactly 2x the ticker items and each item includes the separator dot.

---

### 6. Edge Cases & Defensive Coding (Low Priority)

**What's untested**:
- What happens if `PROJECTS` array is modified at runtime (e.g., hot-reload)?
- What happens if Mapbox fails to load (network error)?
- What if `getElementById` returns null for a missing element?
- What if a project has coordinates at `(0, 0)` — which is valid but likely a data error?

**Recommendation**: Add defensive checks in the source and corresponding tests:
- Validate that no project has `lat=0, lng=0` (likely a data entry error)
- Test that `buildGeoJSON` and `countProjects` are idempotent
- Add a "Mapbox load failure" graceful degradation path

---

### 7. End-to-End / Visual Regression (Future)

**What's untested**: The entire rendering pipeline — does the map actually show up? Do markers appear at the right locations? Does the popup look correct?

**Recommendation**: When the project grows, add Playwright or Cypress tests:
- Page loads without console errors
- Map container renders with markers visible
- Clicking a filter button changes visible markers
- Popup opens on marker click with correct content
- Clock updates every second
- Responsive layout works on mobile viewports

---

## Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Architecture Note

The main `index.html` still contains the full application inline. The `src/` modules are **extracted copies** of the data and logic for testability. If this project evolves, consider:
1. Moving all JS to `src/` modules
2. Using a bundler (Vite) to produce the single-file output
3. Importing `src/data.js` and `src/logic.js` as the source of truth, with `index.html` consuming the bundled output

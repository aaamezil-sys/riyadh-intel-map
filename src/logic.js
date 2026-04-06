// Extracted pure functions from index.html for testability.
// These functions contain the core business logic of the application.

import { COLORS, EMOJI, SECTOR_LABELS, VALID_SECTORS } from './data.js';

/**
 * Build a GeoJSON FeatureCollection from projects, optionally filtered by sector.
 */
export function buildGeoJSON(projects, sector = 'all') {
  return {
    type: 'FeatureCollection',
    features: projects
      .filter(p => sector === 'all' || p.sector === sector)
      .map(p => ({
        type: 'Feature',
        id: p.id,
        geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
        properties: { id: p.id, sector: p.sector, name: p.name, color: COLORS[p.sector] },
      })),
  };
}

/**
 * Count projects by sector. Returns { total, visible, bySector }.
 */
export function countProjects(projects, sector = 'all') {
  const bySector = {};
  projects.forEach(p => {
    bySector[p.sector] = (bySector[p.sector] || 0) + 1;
  });
  const visible = sector === 'all' ? projects.length : projects.filter(p => p.sector === sector).length;
  return { total: projects.length, visible, bySector };
}

/**
 * Generate popup HTML for a project.
 */
export function popupHTML(p) {
  const c = COLORS[p.sector];

  let imgSection;
  if (p.image) {
    imgSection = `<div class="p-img-wrap">
      <img class="p-img" src="${p.image}" alt="${p.name}" loading="lazy"
        onerror="this.parentNode.innerHTML='<div class=\\'p-img-fallback\\' style=\\'background:${c}18\\'>${EMOJI[p.sector] || '📍'}</div>'">
      <div class="p-img-overlay"></div>
    </div>`;
  } else {
    imgSection = `<div class="p-img-wrap"><div class="p-img-fallback" style="background:${c}15;height:70px">${EMOJI[p.sector] || '📍'}</div></div>`;
  }

  return `
    ${imgSection}
    <div class="ptag" style="background:${c}18;color:${c}">${SECTOR_LABELS[p.sector] || p.sector} · Vision 2030</div>
    <div class="pbody">
      <div class="pname">${p.name}</div>
      <div class="p-insight" style="background:${c}10;border-color:${c};color:${c}">${p.description}</div>
      <div class="phr"></div>
      <div class="pmeta">
        <div class="pm"><div class="pmk">Investment</div><div class="pmv" style="color:${c}">${p.value}</div></div>
        <div class="pm"><div class="pmk">GDP Contribution</div><div class="pmv">${p.gdp}</div></div>
        <div class="pm"><div class="pmk">Jobs</div><div class="pmv">${p.jobs}</div></div>
        <div class="pm"><div class="pmk">Status</div><div class="pmv">${p.status}</div></div>
        <div class="pm"><div class="pmk">Completion</div><div class="pmv">${p.completion}</div></div>
        <div class="pm"><div class="pmk">Phase</div><div class="pmv">${p.phase}</div></div>
      </div>
      <div class="p-actions">
        ${p.link ? `<a class="p-link primary" href="${p.link}" target="_blank" rel="noopener">↗ Official Source</a>` : ''}
        <a class="p-link" href="https://www.google.com/maps?q=${p.lat},${p.lng}" target="_blank" rel="noopener">📍 Maps</a>
      </div>
    </div>`;
}

/**
 * Get the camera fly-to parameters for a given sector filter.
 */
export function getFlyToParams(sector) {
  const ft = {
    all:         { center: [44.5, 26.0],  zoom: 5.2, pitch: 28 },
    sports:      { center: [46.50, 24.55], zoom: 8.8, pitch: 48 },
    realestate:  { center: [44.0, 25.5],  zoom: 5.5, pitch: 36 },
    hospitality: { center: [37.0, 25.8],  zoom: 5.4, pitch: 40 },
    culture:     { center: [46.60, 24.62], zoom: 9.0, pitch: 48 },
    transport:   { center: [46.72, 24.82], zoom: 8.8, pitch: 44 },
    energy:      { center: [46.5, 25.5],  zoom: 5.8, pitch: 36 },
  };
  return ft[sector] || ft.all;
}

/**
 * Format a Date for the Riyadh clock display.
 */
export function formatRiyadhTime(date) {
  const r = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
  const time = [r.getHours(), r.getMinutes(), r.getSeconds()]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
  const dateStr = r.toLocaleDateString('en-US', {
    timeZone: 'Asia/Riyadh',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }) + ' · AST';
  return { time, dateStr };
}

/**
 * Calculate days remaining until Vision 2030 (Jan 1, 2030).
 */
export function daysUntil2030(now = new Date()) {
  return Math.ceil((new Date('2030-01-01') - now) / 86400000);
}

/**
 * Validate a project object has all required fields.
 */
export function validateProject(project) {
  const required = ['id', 'sector', 'name', 'lat', 'lng', 'value', 'gdp', 'jobs', 'status', 'completion', 'phase', 'contractor', 'description'];
  const missing = required.filter(f => project[f] === undefined || project[f] === null);
  const errors = [];

  if (missing.length > 0) {
    errors.push(`Missing fields: ${missing.join(', ')}`);
  }
  if (project.sector && !VALID_SECTORS.includes(project.sector)) {
    errors.push(`Invalid sector: "${project.sector}"`);
  }
  if (typeof project.lat === 'number' && (project.lat < -90 || project.lat > 90)) {
    errors.push(`Invalid latitude: ${project.lat}`);
  }
  if (typeof project.lng === 'number' && (project.lng < -180 || project.lng > 180)) {
    errors.push(`Invalid longitude: ${project.lng}`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Get the feed slice for the rotating metrics display.
 */
export function getFeedSlice(feed, index, count = 4) {
  const slice = [];
  for (let i = 0; i < count; i++) {
    slice.push(feed[(index + i) % feed.length]);
  }
  return slice;
}

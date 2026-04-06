import { describe, it, expect } from 'vitest';
import {
  buildGeoJSON, countProjects, popupHTML,
  getFlyToParams, formatRiyadhTime, daysUntil2030,
  validateProject, getFeedSlice,
} from '../src/logic.js';
import { PROJECTS, FEED, VALID_SECTORS, COLORS } from '../src/data.js';

// ── buildGeoJSON ──

describe('buildGeoJSON', () => {
  it('returns all projects when sector is "all"', () => {
    const result = buildGeoJSON(PROJECTS, 'all');
    expect(result.type).toBe('FeatureCollection');
    expect(result.features).toHaveLength(PROJECTS.length);
  });

  it('returns all projects when sector is omitted (default)', () => {
    const result = buildGeoJSON(PROJECTS);
    expect(result.features).toHaveLength(PROJECTS.length);
  });

  it('filters projects by sector correctly', () => {
    const sports = buildGeoJSON(PROJECTS, 'sports');
    const sportsCount = PROJECTS.filter(p => p.sector === 'sports').length;
    expect(sports.features).toHaveLength(sportsCount);
    sports.features.forEach(f => {
      expect(f.properties.sector).toBe('sports');
    });
  });

  it('returns empty features array for nonexistent sector', () => {
    const result = buildGeoJSON(PROJECTS, 'nonexistent');
    expect(result.features).toHaveLength(0);
  });

  it('produces valid GeoJSON Feature for each project', () => {
    const result = buildGeoJSON(PROJECTS, 'all');
    result.features.forEach(f => {
      expect(f.type).toBe('Feature');
      expect(f.geometry.type).toBe('Point');
      expect(f.geometry.coordinates).toHaveLength(2);
      expect(typeof f.geometry.coordinates[0]).toBe('number'); // lng
      expect(typeof f.geometry.coordinates[1]).toBe('number'); // lat
      expect(f.properties).toHaveProperty('id');
      expect(f.properties).toHaveProperty('sector');
      expect(f.properties).toHaveProperty('name');
      expect(f.properties).toHaveProperty('color');
    });
  });

  it('coordinates are [lng, lat] order (GeoJSON spec)', () => {
    const result = buildGeoJSON(PROJECTS, 'all');
    const firstProject = PROJECTS[0];
    const firstFeature = result.features.find(f => f.id === firstProject.id);
    expect(firstFeature.geometry.coordinates[0]).toBe(firstProject.lng);
    expect(firstFeature.geometry.coordinates[1]).toBe(firstProject.lat);
  });

  it('assigns correct color from COLORS map', () => {
    const result = buildGeoJSON(PROJECTS, 'all');
    result.features.forEach(f => {
      expect(f.properties.color).toBe(COLORS[f.properties.sector]);
    });
  });

  it('handles empty projects array', () => {
    const result = buildGeoJSON([], 'all');
    expect(result.features).toHaveLength(0);
    expect(result.type).toBe('FeatureCollection');
  });
});

// ── countProjects ──

describe('countProjects', () => {
  it('returns total count for "all"', () => {
    const result = countProjects(PROJECTS, 'all');
    expect(result.total).toBe(30);
    expect(result.visible).toBe(30);
  });

  it('returns correct visible count for a specific sector', () => {
    const result = countProjects(PROJECTS, 'sports');
    const expected = PROJECTS.filter(p => p.sector === 'sports').length;
    expect(result.visible).toBe(expected);
    expect(result.total).toBe(30);
  });

  it('returns 0 visible for nonexistent sector', () => {
    const result = countProjects(PROJECTS, 'nonexistent');
    expect(result.visible).toBe(0);
    expect(result.total).toBe(30);
  });

  it('bySector counts sum to total', () => {
    const result = countProjects(PROJECTS);
    const sum = Object.values(result.bySector).reduce((a, b) => a + b, 0);
    expect(sum).toBe(result.total);
  });

  it('bySector has entries for all sectors present in data', () => {
    const result = countProjects(PROJECTS);
    VALID_SECTORS.forEach(s => {
      expect(result.bySector).toHaveProperty(s);
      expect(result.bySector[s]).toBeGreaterThan(0);
    });
  });

  it('handles empty projects array', () => {
    const result = countProjects([]);
    expect(result.total).toBe(0);
    expect(result.visible).toBe(0);
    expect(Object.keys(result.bySector)).toHaveLength(0);
  });
});

// ── popupHTML ──

describe('popupHTML', () => {
  const sampleProject = PROJECTS[0]; // sports project with image

  it('returns a string containing the project name', () => {
    const html = popupHTML(sampleProject);
    expect(html).toContain(sampleProject.name);
  });

  it('includes investment value, gdp, jobs, status, completion, phase', () => {
    const html = popupHTML(sampleProject);
    expect(html).toContain(sampleProject.value);
    expect(html).toContain(sampleProject.gdp);
    expect(html).toContain(sampleProject.jobs);
    expect(html).toContain(sampleProject.status);
    expect(html).toContain(sampleProject.completion);
    expect(html).toContain(sampleProject.phase);
  });

  it('includes sector label', () => {
    const html = popupHTML(sampleProject);
    expect(html).toContain('Sports & Performance');
  });

  it('includes image tag when image is provided', () => {
    const html = popupHTML(sampleProject);
    expect(html).toContain('<img class="p-img"');
    expect(html).toContain(sampleProject.image);
  });

  it('uses fallback when image is empty', () => {
    const noImageProject = PROJECTS.find(p => p.image === '');
    const html = popupHTML(noImageProject);
    expect(html).toContain('p-img-fallback');
    expect(html).not.toContain('<img class="p-img"');
  });

  it('includes Google Maps link with correct coordinates', () => {
    const html = popupHTML(sampleProject);
    expect(html).toContain(`https://www.google.com/maps?q=${sampleProject.lat},${sampleProject.lng}`);
  });

  it('includes official source link when link is provided', () => {
    const html = popupHTML(sampleProject);
    expect(html).toContain(sampleProject.link);
    expect(html).toContain('Official Source');
  });

  it('omits official source link when link is empty', () => {
    const noLinkProject = { ...sampleProject, link: '' };
    const html = popupHTML(noLinkProject);
    expect(html).not.toContain('Official Source');
  });

  it('applies correct sector color', () => {
    const html = popupHTML(sampleProject);
    expect(html).toContain(COLORS[sampleProject.sector]);
  });
});

// ── getFlyToParams ──

describe('getFlyToParams', () => {
  it('returns params for each valid sector', () => {
    VALID_SECTORS.forEach(s => {
      const params = getFlyToParams(s);
      expect(params).toHaveProperty('center');
      expect(params).toHaveProperty('zoom');
      expect(params).toHaveProperty('pitch');
      expect(params.center).toHaveLength(2);
    });
  });

  it('returns params for "all"', () => {
    const params = getFlyToParams('all');
    expect(params.center).toEqual([44.5, 26.0]);
    expect(params.zoom).toBe(5.2);
  });

  it('falls back to "all" params for unknown sector', () => {
    const params = getFlyToParams('unknown');
    expect(params).toEqual(getFlyToParams('all'));
  });

  it('sports sector zooms closer than "all"', () => {
    expect(getFlyToParams('sports').zoom).toBeGreaterThan(getFlyToParams('all').zoom);
  });
});

// ── formatRiyadhTime ──

describe('formatRiyadhTime', () => {
  it('returns time in HH:MM:SS format', () => {
    const result = formatRiyadhTime(new Date('2025-06-15T12:00:00Z'));
    expect(result.time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('returns date string ending with " · AST"', () => {
    const result = formatRiyadhTime(new Date('2025-06-15T12:00:00Z'));
    expect(result.dateStr).toContain('· AST');
  });

  it('pads single-digit hours/minutes/seconds with leading zero', () => {
    // 01:05:03 AST would be 22:05:03 UTC previous day
    const result = formatRiyadhTime(new Date('2025-06-14T22:05:03Z'));
    expect(result.time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    const parts = result.time.split(':');
    parts.forEach(p => expect(p).toHaveLength(2));
  });
});

// ── daysUntil2030 ──

describe('daysUntil2030', () => {
  it('returns positive number for dates before 2030', () => {
    expect(daysUntil2030(new Date('2025-01-01'))).toBeGreaterThan(0);
  });

  it('returns 0 or negative for dates after 2030', () => {
    expect(daysUntil2030(new Date('2030-01-02'))).toBeLessThanOrEqual(0);
  });

  it('returns 1 for Dec 31, 2029', () => {
    expect(daysUntil2030(new Date('2029-12-31'))).toBe(1);
  });

  it('returns approximately 365 for Jan 1, 2029', () => {
    const days = daysUntil2030(new Date('2029-01-01'));
    expect(days).toBe(365);
  });
});

// ── validateProject ──

describe('validateProject', () => {
  it('returns valid for a complete project', () => {
    const result = validateProject(PROJECTS[0]);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('all 30 projects pass validation', () => {
    PROJECTS.forEach(p => {
      const result = validateProject(p);
      expect(result.valid, `Project id=${p.id} "${p.name}" failed: ${result.errors.join(', ')}`).toBe(true);
    });
  });

  it('reports missing fields', () => {
    const result = validateProject({ id: 99, sector: 'sports' });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('Missing fields');
  });

  it('reports invalid sector', () => {
    const result = validateProject({
      id: 99, sector: 'invalid', name: 'Test', lat: 24, lng: 46,
      value: '$1B', gdp: '$1B', jobs: '100', status: 'Active',
      completion: '2030', phase: 'Phase 1', contractor: 'Test', description: 'Test',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('Invalid sector'))).toBe(true);
  });

  it('reports invalid latitude', () => {
    const result = validateProject({
      id: 99, sector: 'sports', name: 'Test', lat: 100, lng: 46,
      value: '$1B', gdp: '$1B', jobs: '100', status: 'Active',
      completion: '2030', phase: 'Phase 1', contractor: 'Test', description: 'Test',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('Invalid latitude'))).toBe(true);
  });

  it('reports invalid longitude', () => {
    const result = validateProject({
      id: 99, sector: 'sports', name: 'Test', lat: 24, lng: 200,
      value: '$1B', gdp: '$1B', jobs: '100', status: 'Active',
      completion: '2030', phase: 'Phase 1', contractor: 'Test', description: 'Test',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('Invalid longitude'))).toBe(true);
  });
});

// ── getFeedSlice ──

describe('getFeedSlice', () => {
  it('returns 4 items by default', () => {
    const slice = getFeedSlice(FEED, 0);
    expect(slice).toHaveLength(4);
  });

  it('wraps around when index exceeds feed length', () => {
    const slice = getFeedSlice(FEED, FEED.length - 1);
    expect(slice).toHaveLength(4);
    expect(slice[0]).toBe(FEED[FEED.length - 1]);
    expect(slice[1]).toBe(FEED[0]); // wrapped
  });

  it('returns correct custom count', () => {
    const slice = getFeedSlice(FEED, 0, 2);
    expect(slice).toHaveLength(2);
  });

  it('returns first 4 items when index is 0', () => {
    const slice = getFeedSlice(FEED, 0);
    expect(slice[0]).toBe(FEED[0]);
    expect(slice[1]).toBe(FEED[1]);
    expect(slice[2]).toBe(FEED[2]);
    expect(slice[3]).toBe(FEED[3]);
  });
});

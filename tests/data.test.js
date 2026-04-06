import { describe, it, expect } from 'vitest';
import {
  PROJECTS, COLORS, EMOJI, SECTOR_LABELS,
  VALID_SECTORS, FEED, TICKER,
} from '../src/data.js';

describe('PROJECTS data integrity', () => {
  const requiredFields = ['id', 'sector', 'name', 'lat', 'lng', 'value', 'gdp', 'jobs', 'status', 'completion', 'phase', 'contractor', 'description'];

  it('should have 37 projects', () => {
    expect(PROJECTS).toHaveLength(37);
  });

  it('every project should have all required fields', () => {
    PROJECTS.forEach(p => {
      requiredFields.forEach(field => {
        expect(p, `Project id=${p.id} "${p.name}" missing "${field}"`).toHaveProperty(field);
      });
    });
  });

  it('every project should have a unique id', () => {
    const ids = PROJECTS.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every project id should be a positive integer', () => {
    PROJECTS.forEach(p => {
      expect(Number.isInteger(p.id) && p.id > 0, `Invalid id: ${p.id}`).toBe(true);
    });
  });

  it('every project should belong to a valid sector', () => {
    PROJECTS.forEach(p => {
      expect(VALID_SECTORS, `Project "${p.name}" has invalid sector "${p.sector}"`).toContain(p.sector);
    });
  });

  it('every project should have valid latitude (-90 to 90)', () => {
    PROJECTS.forEach(p => {
      expect(p.lat).toBeGreaterThanOrEqual(-90);
      expect(p.lat).toBeLessThanOrEqual(90);
    });
  });

  it('every project should have valid longitude (-180 to 180)', () => {
    PROJECTS.forEach(p => {
      expect(p.lng).toBeGreaterThanOrEqual(-180);
      expect(p.lng).toBeLessThanOrEqual(180);
    });
  });

  it('every project latitude should be within Saudi Arabia region (16-33)', () => {
    PROJECTS.forEach(p => {
      expect(p.lat, `"${p.name}" lat=${p.lat} seems outside Saudi Arabia`).toBeGreaterThanOrEqual(16);
      expect(p.lat).toBeLessThanOrEqual(33);
    });
  });

  it('every project longitude should be within Saudi Arabia region (34-56)', () => {
    PROJECTS.forEach(p => {
      expect(p.lng, `"${p.name}" lng=${p.lng} seems outside Saudi Arabia`).toBeGreaterThanOrEqual(34);
      expect(p.lng).toBeLessThanOrEqual(56);
    });
  });

  it('image field should be a string (empty or URL)', () => {
    PROJECTS.forEach(p => {
      expect(typeof p.image).toBe('string');
    });
  });

  it('link field should be a string (empty or URL)', () => {
    PROJECTS.forEach(p => {
      expect(typeof p.link).toBe('string');
    });
  });

  it('name field should be a non-empty string', () => {
    PROJECTS.forEach(p => {
      expect(p.name.length, `Project id=${p.id} has empty name`).toBeGreaterThan(0);
    });
  });

  it('should cover all six sectors', () => {
    const sectors = new Set(PROJECTS.map(p => p.sector));
    VALID_SECTORS.forEach(s => {
      expect(sectors.has(s), `Sector "${s}" has no projects`).toBe(true);
    });
  });
});

describe('COLORS configuration', () => {
  it('should have a color for every valid sector', () => {
    VALID_SECTORS.forEach(s => {
      expect(COLORS).toHaveProperty(s);
    });
  });

  it('every color should be a valid hex color', () => {
    Object.values(COLORS).forEach(c => {
      expect(c).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

describe('EMOJI configuration', () => {
  it('should have an emoji for every valid sector', () => {
    VALID_SECTORS.forEach(s => {
      expect(EMOJI).toHaveProperty(s);
    });
  });

  it('every emoji should be a non-empty string', () => {
    Object.values(EMOJI).forEach(e => {
      expect(e.length).toBeGreaterThan(0);
    });
  });
});

describe('SECTOR_LABELS configuration', () => {
  it('should have a label for every valid sector', () => {
    VALID_SECTORS.forEach(s => {
      expect(SECTOR_LABELS).toHaveProperty(s);
    });
  });

  it('every label should be a non-empty string', () => {
    Object.values(SECTOR_LABELS).forEach(l => {
      expect(l.length).toBeGreaterThan(0);
    });
  });
});

describe('FEED data', () => {
  it('should have at least 4 items for the rotating display', () => {
    expect(FEED.length).toBeGreaterThanOrEqual(4);
  });

  it('every feed item should have label and val', () => {
    FEED.forEach(f => {
      expect(f).toHaveProperty('label');
      expect(f).toHaveProperty('val');
      expect(f.label.length).toBeGreaterThan(0);
      expect(f.val.length).toBeGreaterThan(0);
    });
  });
});

describe('TICKER data', () => {
  it('should have at least one ticker item', () => {
    expect(TICKER.length).toBeGreaterThan(0);
  });

  it('every ticker item should be a non-empty string', () => {
    TICKER.forEach(t => {
      expect(typeof t).toBe('string');
      expect(t.length).toBeGreaterThan(0);
    });
  });
});

// Fetches latest news for each project from Google News RSS.
// Outputs data/news.json with headlines per project ID.
// Runs daily via GitHub Actions — no API key needed.

const https = require('https');
const fs = require('fs');
const path = require('path');

// Project search terms — name + context keywords for better results
const PROJECTS = [
  {id:1, q:'Prince Mohammed bin Salman Stadium Qiddiya'},
  {id:2, q:'King Fahd International Stadium Saudi upgrade'},
  {id:3, q:'Sports Boulevard Riyadh'},
  {id:4, q:'Prince Faisal bin Fahd Olympic Complex'},
  {id:5, q:'King Abdullah Sports City Jeddah'},
  {id:6, q:'New Murabba Arena Riyadh'},
  {id:7, q:'The Mukaab New Murabba Saudi'},
  {id:8, q:'Jeddah Tower Kingdom Tower Saudi'},
  {id:9, q:'ROSHN Saudi communities'},
  {id:10, q:'Trojena NEOM ski resort'},
  {id:11, q:'Expo 2030 Riyadh'},
  {id:12, q:'Oxagon NEOM industrial'},
  {id:13, q:'NEOM The Line Saudi'},
  {id:14, q:'Red Sea Global resort Saudi'},
  {id:15, q:'Amaala Triple Bay Saudi'},
  {id:16, q:'Sindalah Island NEOM'},
  {id:17, q:'Diriyah Gate Saudi'},
  {id:18, q:'King Salman Park Riyadh'},
  {id:19, q:'Qiddiya Entertainment City Saudi'},
  {id:20, q:'Riyadh Season 2025 2026'},
  {id:21, q:'Ithra King Abdulaziz Center Dhahran'},
  {id:22, q:'King Salman International Airport Riyadh'},
  {id:23, q:'Riyadh Metro operational'},
  {id:24, q:'Saudi Land Bridge Railway'},
  {id:25, q:'KAFD King Abdullah Financial District'},
  {id:26, q:'SPARK King Salman Energy Park'},
  {id:27, q:'Jeddah Waterfront Corniche development'},
  {id:28, q:'NEOM green hydrogen plant'},
  {id:29, q:'NEOM solar wind renewable Saudi'},
  {id:30, q:'Saudi Aramco upstream expansion'},
  {id:31, q:'Rua Al Madinah development'},
  {id:32, q:'Ceer Lucid EV Saudi manufacturing'},
  {id:33, q:'The Rig Saudi offshore tourism'},
  {id:34, q:'Aramco Stadium Al Khobar'},
  {id:35, q:'Jeddah Historic District Al-Balad'},
  {id:36, q:'Jeddah rapid transit BRT metro'},
  {id:37, q:'NEOM DataVolt AI data center'},
  {id:38, q:'Prince Abdullah Al Faisal Stadium Jeddah FIFA 2034'},
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
    const block = match[1];
    const title = (block.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
    const pubDate = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
    const source = (block.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || '';
    if (title) {
      items.push({
        title: title.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
        link: link.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1'),
        date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : '',
        source: source.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1'),
      });
    }
  }
  return items;
}

async function fetchNews(project) {
  const q = encodeURIComponent(project.q);
  const url = `https://news.google.com/rss/search?q=${q}&hl=en&gl=SA&ceid=SA:en`;
  try {
    const xml = await fetch(url);
    return { id: project.id, articles: parseRSS(xml) };
  } catch (err) {
    console.error(`  [${project.id}] Error: ${err.message}`);
    return { id: project.id, articles: [] };
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log(`Fetching news for ${PROJECTS.length} projects...`);
  const results = {};

  for (const project of PROJECTS) {
    process.stdout.write(`  [${project.id}] ${project.q.slice(0, 40)}...`);
    const result = await fetchNews(project);
    results[project.id] = result.articles;
    console.log(` ${result.articles.length} articles`);
    await sleep(500); // rate limit
  }

  const output = {
    updated: new Date().toISOString(),
    projects: results,
  };

  const outPath = path.join(__dirname, '..', 'data', 'news.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\nSaved to ${outPath}`);

  const total = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`Total: ${total} articles across ${Object.keys(results).length} projects`);
}

main().catch(err => { console.error(err); process.exit(1); });

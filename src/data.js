// Extracted from index.html for testability.
// This is the single source of truth for project data and configuration constants.

export const VALID_SECTORS = ['sports', 'realestate', 'hospitality', 'culture', 'transport', 'energy'];

export const COLORS = {
  sports: '#F59E0B',
  realestate: '#FB923C',
  hospitality: '#38BDF8',
  culture: '#E879F9',
  transport: '#34D399',
  energy: '#EF4444',
};

export const EMOJI = {
  sports: '🏟️',
  realestate: '🏗️',
  hospitality: '🏨',
  culture: '🎭',
  transport: '🚇',
  energy: '⚡',
};

export const SECTOR_LABELS = {
  sports: 'Sports & Performance',
  realestate: 'Real Estate',
  hospitality: 'Hospitality & Tourism',
  culture: 'Culture & Entertainment',
  transport: 'Transport & Infra',
  energy: 'Energy & Industry',
};

export const PROJECTS = [
  // ── SPORTS ──
  {id:1,sector:"sports",name:"Prince Mohammed bin Salman Stadium (Qiddiya)",lat:24.4949,lng:46.2047,value:"$8B",gdp:"$9.8B GDP contribution",jobs:"185,000",status:"Under Construction",completion:"2029",phase:"Phase 1",contractor:"FCC Construcción + Nesma & Partners",description:"46,979-seat FIFA 2034 World Cup venue built on the edge of Tuwaiq cliffs.",image:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",link:"https://qiddiya.com"},
  {id:2,sector:"sports",name:"King Fahd International Stadium Upgrade",lat:24.7141,lng:46.7189,value:"$500M",gdp:"Direct FIFA 2034 asset",jobs:"12,000",status:"Planning",completion:"2033",phase:"Design",contractor:"TBD",description:"Flagship national stadium hosting FIFA 2034 matches.",image:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",link:"https://www.saff.com.sa"},
  {id:3,sector:"sports",name:"Sports Boulevard — Riyadh",lat:24.6900,lng:46.6950,value:"$3.8B",gdp:"$5.2B",jobs:"94,000",status:"Under Construction",completion:"2030",phase:"Phase 2 of 4",contractor:"Multiple",description:"135km linear sports corridor.",image:"https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",link:"https://sportsblvd.com.sa"},
  {id:4,sector:"sports",name:"Prince Faisal bin Fahd Olympic Complex",lat:24.7248,lng:46.6739,value:"$1.2B",gdp:"$2.1B",jobs:"8,500",status:"Expansion",completion:"2028",phase:"Expansion Phase",contractor:"Saudi Binladin Group",description:"National Olympic training complex.",image:"",link:"https://www.mof.gov.sa"},
  {id:5,sector:"sports",name:"King Abdullah Sports City — Jeddah",lat:21.6437,lng:39.1376,value:"$4B",gdp:"$6.5B",jobs:"47,000",status:"Operational + Expanding",completion:"2026",phase:"Operational",contractor:"SCC",description:"70,000-seat stadium.",image:"https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",link:"https://www.kasa.com.sa"},
  {id:6,sector:"sports",name:"New Murabba Arena",lat:24.7170,lng:46.6180,value:"$50B",gdp:"$48B",jobs:"334,000",status:"Under Construction",completion:"2032",phase:"Phase 1",contractor:"Multiple",description:"45,000-seat events arena.",image:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",link:"https://newmurabba.com"},
  // ── REAL ESTATE ──
  {id:7,sector:"realestate",name:"The Mukaab — New Murabba",lat:24.7155,lng:46.6155,value:"$8B",gdp:"Included in New Murabba $48B",jobs:"50,000+",status:"Under Construction",completion:"2030",phase:"Core Structure",contractor:"TBD — PIF direct",description:"400m cube structure.",image:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",link:"https://newmurabba.com"},
  {id:8,sector:"realestate",name:"Jeddah Tower",lat:21.5433,lng:39.1728,value:"$1.5B",gdp:"$2.3B",jobs:"18,000",status:"Under Construction — Resumed",completion:"2028",phase:"Structure — ~40%",contractor:"Saudi Binladin Group",description:"World's first 1km-tall skyscraper.",image:"https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=800&q=80",link:"https://jeddahtower.com"},
  {id:9,sector:"realestate",name:"ROSHN — National Communities",lat:24.8500,lng:46.8000,value:"$5B+",gdp:"$12B",jobs:"120,000",status:"Rolling Delivery",completion:"2030",phase:"Multiple Phases",contractor:"ROSHN Group (PIF)",description:"400,000+ homes across Saudi cities.",image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",link:"https://www.roshn.sa"},
  {id:10,sector:"realestate",name:"Trojena — NEOM Ski Resort",lat:28.0833,lng:35.4167,value:"$5B",gdp:"$7B tourism",jobs:"30,000",status:"Under Construction",completion:"2027",phase:"Phase 1",contractor:"NEOM Company",description:"Year-round mountain destination.",image:"https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",link:"https://www.neom.com/en-us/regions/trojena"},
  {id:11,sector:"realestate",name:"Expo 2030 Riyadh Site",lat:24.7136,lng:46.6753,value:"$7.8B",gdp:"$38B during event",jobs:"300,000",status:"Under Construction",completion:"2030",phase:"Site Preparation",contractor:"Royal Commission for Riyadh City",description:"World Expo 2030.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",link:"https://expo2030riyadh.com"},
  {id:12,sector:"realestate",name:"Oxagon — NEOM Industrial Port",lat:27.9833,lng:35.2000,value:"$7B",gdp:"$14B",jobs:"90,000",status:"Phase 1 Active",completion:"2030",phase:"Phase 1",contractor:"NEOM Company + partners",description:"World's largest floating industrial complex.",image:"",link:"https://www.neom.com/en-us/regions/oxagon"},
  {id:25,sector:"realestate",name:"KAFD",lat:24.7700,lng:46.6400,value:"$10B",gdp:"$22B",jobs:"67,000",status:"Operational + Expanding",completion:"Ongoing",phase:"Operational",contractor:"Multiple",description:"Riyadh's financial hub.",image:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",link:"https://kafd.sa"},
  {id:26,sector:"realestate",name:"SPARK — King Salman Energy Park",lat:26.8667,lng:49.6833,value:"$4.3B",gdp:"$12B",jobs:"100,000",status:"Phase 1 Operational",completion:"2035",phase:"Phase 2",contractor:"Aramco + MODON",description:"Energy sector supply chain city.",image:"",link:"https://www.spark.com.sa"},
  {id:27,sector:"realestate",name:"Jeddah Waterfront",lat:21.5400,lng:39.1400,value:"$6B",gdp:"$8.5B",jobs:"35,000",status:"Under Construction",completion:"2028",phase:"Phase 2",contractor:"Jeddah Municipality + PIF",description:"30km Corniche regeneration.",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",link:"https://www.jeddah.gov.sa"},
  // ── HOSPITALITY ──
  {id:13,sector:"hospitality",name:"NEOM — The Line",lat:28.0000,lng:35.2000,value:"$500B",gdp:"$48B phase 1",jobs:"380,000",status:"Under Construction",completion:"2035+",phase:"Phase 1",contractor:"Multiple",description:"170km linear cognitive city.",image:"https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",link:"https://www.neom.com/en-us/regions/theline"},
  {id:14,sector:"hospitality",name:"Red Sea Project",lat:22.0000,lng:38.5000,value:"$28B",gdp:"$22B",jobs:"70,000",status:"Phase 1 Operational",completion:"2030",phase:"Phase 1 Open",contractor:"Red Sea Global",description:"Luxury island resort archipelago.",image:"https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80",link:"https://www.theredsea.sa"},
  {id:15,sector:"hospitality",name:"Amaala — Triple Bay",lat:28.3000,lng:35.1500,value:"$12B",gdp:"$9B",jobs:"14,000",status:"Under Construction",completion:"2028",phase:"Phase 1",contractor:"Red Sea Global",description:"Ultra-luxury wellness destination.",image:"",link:"https://www.amaala.com"},
  {id:16,sector:"hospitality",name:"Sindalah Island — NEOM",lat:28.1700,lng:35.4300,value:"$4B",gdp:"$3.5B",jobs:"3,500",status:"Opening 2025–26",completion:"2026",phase:"Final Fit-Out",contractor:"NEOM Company",description:"Luxury yacht hub.",image:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",link:"https://www.neom.com/en-us/regions/sindalah"},
  {id:17,sector:"hospitality",name:"Diriyah Gate Cultural District",lat:24.7300,lng:46.5712,value:"$62B",gdp:"$14.5B commissioned",jobs:"55,000",status:"Phase 1 Delivering",completion:"2030",phase:"Phase 1",contractor:"Diriyah Company (PIF)",description:"UNESCO World Heritage site destination.",image:"https://images.unsplash.com/photo-1548813395-a8c660a9b0d0?w=800&q=80",link:"https://www.diriyah.sa"},
  // ── CULTURE ──
  {id:18,sector:"culture",name:"King Salman Park",lat:24.7500,lng:46.6500,value:"$23B",gdp:"$25B",jobs:"140,000",status:"Phase 1 Open",completion:"2030",phase:"Phase 1 Open",contractor:"Royal Commission for Riyadh City",description:"World's largest urban park.",image:"https://images.unsplash.com/photo-1565181616718-8be44b9d9d2f?w=800&q=80",link:"https://kingsalmanpark.sa"},
  {id:19,sector:"culture",name:"Qiddiya Entertainment City",lat:24.5100,lng:46.2200,value:"$8B",gdp:"$9.8B",jobs:"185,000",status:"Phase 1 Delivering",completion:"2028",phase:"Six Flags Open",contractor:"Qiddiya Investment Company",description:"Saudi Arabia's entertainment capital.",image:"https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",link:"https://qiddiya.com"},
  {id:20,sector:"culture",name:"Riyadh Season",lat:24.6800,lng:46.7200,value:"$1B+ annual",gdp:"$4B annual",jobs:"40,000 seasonal",status:"Annual — Expanding",completion:"Recurring",phase:"Season 6",contractor:"General Entertainment Authority",description:"Annual mega-event season.",image:"",link:"https://www.riyadhseason.sa"},
  {id:21,sector:"culture",name:"Ithra — King Abdulaziz Center",lat:26.3090,lng:50.1130,value:"$2B",gdp:"$3.5B",jobs:"8,000",status:"Operational",completion:"Ongoing",phase:"Operational",contractor:"Saudi Aramco",description:"Cultural and innovation campus.",image:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",link:"https://www.ithra.com"},
  // ── TRANSPORT ──
  {id:22,sector:"transport",name:"King Salman International Airport",lat:24.9576,lng:46.7018,value:"$147B",gdp:"$112B",jobs:"500,000",status:"Under Construction",completion:"2030",phase:"Phase 1",contractor:"KAFD + RCRC",description:"World's largest airport terminal.",image:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",link:"https://www.gaca.gov.sa"},
  {id:23,sector:"transport",name:"Riyadh Metro — Full Network",lat:24.6877,lng:46.7219,value:"$22B",gdp:"$18B",jobs:"44,000",status:"Operational",completion:"2024",phase:"Fully Operational",contractor:"Multiple consortia",description:"176 stations, 6 lines, 176km.",image:"https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",link:"https://www.riyadhmetro.gov.sa"},
  {id:24,sector:"transport",name:"Saudi Land Bridge Railway",lat:24.8000,lng:46.9000,value:"$7B",gdp:"$15B",jobs:"22,000",status:"Planning — Phase 2",completion:"2030",phase:"Phase 2",contractor:"Saudi Railway Company (SAR)",description:"Cross-country freight and passenger railway.",image:"",link:"https://www.sar.com.sa"},
  // ── ENERGY ──
  {id:28,sector:"energy",name:"NEOM Green Hydrogen Plant",lat:28.1000,lng:35.0000,value:"$8.4B",gdp:"$12B",jobs:"15,000",status:"Under Construction",completion:"2030",phase:"Phase 1",contractor:"ACWA Power + Air Products + NEOM Co.",description:"World's largest green hydrogen plant.",image:"https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",link:"https://www.neom.com/en-us/sectors/energy"},
  {id:29,sector:"energy",name:"NEOM Solar & Wind Gigaproject",lat:28.2000,lng:35.5000,value:"$50B",gdp:"$30B",jobs:"25,000",status:"Phase 1 Active",completion:"2030",phase:"Phase 1",contractor:"ACWA Power + Saudi Aramco",description:"50GW renewable energy target for NEOM.",image:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",link:"https://www.neom.com/en-us/sectors/energy"},
  {id:30,sector:"energy",name:"Saudi Aramco — Upstream Expansion",lat:26.3167,lng:50.1167,value:"$40B",gdp:"$180B annual",jobs:"75,000",status:"Active Investment Cycle",completion:"2028",phase:"2024–2028",contractor:"Saudi Aramco + international partners",description:"$40B capital investment program.",image:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",link:"https://www.aramco.com"},
  // ── NEW PROJECTS (2025–2026) ──
  {id:31,sector:"realestate",name:"Rou'a Al Madinah",lat:24.4686,lng:39.6142,value:"$15B",gdp:"$18B",jobs:"93,000",status:"Under Construction",completion:"2030",phase:"Phase 1 Active",contractor:"Rou'a Al Madinah Holding (PIF)",description:"Mega-development surrounding the Prophet's Mosque for 30M+ pilgrims annually.",image:"https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",link:"https://www.rfrmd.com.sa"},
  {id:32,sector:"energy",name:"Ceer & Lucid EV Manufacturing Hub",lat:26.2172,lng:50.1971,value:"$3.4B",gdp:"$8B",jobs:"30,000",status:"Under Construction",completion:"2027",phase:"Factory Build-out",contractor:"Ceer (PIF + Foxconn) + Lucid Motors",description:"Saudi Arabia's first EV manufacturing complex producing 150,000+ vehicles per year.",image:"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",link:"https://www.ceer.sa"},
  {id:33,sector:"hospitality",name:"The Rig — Offshore Adventure",lat:27.0000,lng:49.7000,value:"$5B",gdp:"$3.8B",jobs:"7,000",status:"Under Construction",completion:"2028",phase:"Platform Conversion",contractor:"Saudi Aramco + PIF",description:"World's first tourism destination on repurposed offshore oil platforms in the Arabian Gulf.",image:"https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80",link:"https://www.therig.sa"},
  {id:34,sector:"culture",name:"Jeddah Historic District (Al-Balad)",lat:21.4225,lng:39.8262,value:"$2.5B",gdp:"$4B",jobs:"15,000",status:"Planning",completion:"2029",phase:"Master Planning",contractor:"Ministry of Culture + PIF",description:"UNESCO-backed heritage zone restoration with museums, galleries, and creative industries hub.",image:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",link:"https://www.moc.gov.sa"},
  {id:35,sector:"transport",name:"Jeddah Rapid Transit",lat:21.5433,lng:39.1728,value:"$5.5B",gdp:"$9B",jobs:"42,000",status:"Under Construction",completion:"2029",phase:"Phase 1 — BRT Lines",contractor:"Jeddah Transit Authority",description:"Three-phase BRT and metro system for 1.2M daily riders.",image:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",link:"https://www.jeddah.gov.sa"},
];

export const FEED = [
  {label:"Total Vision 2030 Pipeline",val:"<span>$2.13T+</span> across 35 tracked projects"},
  {label:"Highest Value Project",val:"NEOM The Line — <span>$500B</span>"},
  {label:"Most Jobs Created",val:"King Salman Airport — <span>500,000</span>"},
  {label:"Nearest Deadline",val:"Sindalah Island — <span>2026</span>"},
  {label:"Sports Opportunity Score",val:"<span>9.4 / 10</span> — FIFA 2034 + V2030"},
  {label:"Real Estate Projects Tracked",val:"<span>7</span> mega developments — $100B+"},
  {label:"Energy Sector Investment",val:"<span>$130B+</span> in green & conventional energy"},
  {label:"HarakaMed Target Sites",val:"<span>6</span> high-fit sports venues"},
  {label:"Construction Peak Year",val:"<span>2027–2028</span> across all sectors"},
  {label:"Expo 2030 Visitor Projection",val:"<span>50M</span> visitors in 6 months"},
  {label:"FIFA 2034 Stadium Count",val:"<span>15</span> stadiums across 5 cities"},
];

export const TICKER = [
  "Prince Mohammed bin Salman Stadium · Qiddiya · <strong>$8B</strong> · FIFA 2034 venue",
  "NEOM The Line · 170km linear city · <strong>$500B</strong> · Phase 1 by 2030",
  "Jeddah Tower · World's tallest building · <strong>1,000m</strong> · Completion 2028",
  "King Salman Airport · 185M passengers/year · <strong>$147B</strong>",
  "NEOM Green Hydrogen · <strong>$8.4B</strong> · 650 tonnes/day by 2030",
  "Sports Boulevard Riyadh · 135km active corridor · <strong>$3.8B</strong>",
  "New Murabba · 104,000 residential units · <strong>$50B</strong> · 334,000 jobs",
  "Expo 2030 Riyadh · 50M visitors · 180 nations · <strong>$38B</strong> economic impact",
  "NEOM Solar & Wind · <strong>$50B</strong> clean energy commitment by 2030",
  "Saudi Aramco Expansion · <strong>$40B</strong> upstream investment 2024–2028",
  "HarakaMed · AI markerless motion analysis · ahmedmezil.com",
  "Riyadh Intelligence Platform · riyadh.ahmedmezil.com",
];

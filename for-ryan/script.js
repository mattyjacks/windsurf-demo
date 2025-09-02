// Ride Southern NH — script.js
// Interactivity: render cards, filtering, sorting, scroll-reveal, optional Pexels image hydration.

const SPOTS = [
  {
    id: 'bear-brook',
    name: 'Bear Brook State Park',
    location: 'Allenstown/Deerfield, NH',
    rating: 4.8,
    tags: ['intermediate', 'technical', 'flow', 'scenic'],
    highlights: 'Largest developed NH state park with ~40+ miles of trails; variety from doubletrack to technical singletrack.',
    sources: [
      { label: 'NH State Parks', url: 'https://www.nhstateparks.org/find-parks-trails/bear-brook-state-park' },
    ],
    imageQuery: 'mountain biking forest singletrack',
    lat: 43.1219, lon: -71.3705,
  },
  {
    id: 'pawtuckaway',
    name: 'Pawtuckaway State Park',
    location: 'Nottingham, NH',
    rating: 4.4,
    tags: ['intermediate', 'technical', 'lakes', 'scenic'],
    highlights: 'Rocky glacial terrain and lake views; mixed technical trails and classic NH roots/rocks.',
    sources: [
      { label: 'NH State Parks', url: 'https://www.nhstateparks.org/find-parks-trails/pawtuckaway-state-park' },
    ],
    imageQuery: 'mountain bike lake forest trail',
    lat: 43.1112, lon: -71.1582,
  },
  {
    id: 'fort-rock',
    name: 'Henderson-Swasey / Fort Rock',
    location: 'Exeter & Newfields, NH',
    rating: 4.6,
    tags: ['technical', 'intermediate', 'scenic'],
    highlights: 'Challenging singletrack connected under Route 101 via large culvert; loop options from 1–2 miles and linkups.',
    sources: [
      { label: 'Trail Finder', url: 'https://www.trailfinder.info/trails/trail/henderson-swasey-town-forest-trail-network' },
    ],
    imageQuery: 'technical mountain biking roots rocks new england',
    lat: 42.9971, lon: -70.9556,
  },
  {
    id: 'stratham-hill',
    name: 'Stratham Hill Park',
    location: 'Stratham, NH',
    rating: 4.2,
    tags: ['beginner', 'intermediate', 'flow', 'family'],
    highlights: 'Beginner to intermediate network behind fairgrounds; small climbs and fun singletrack.',
    sources: [
      { label: 'Singletracks', url: 'https://www.singletracks.com/bike-trails/stratham-hill-park/' },
    ],
    imageQuery: 'mtb singletrack park forest',
    lat: 43.0376, lon: -70.8958,
  },
  {
    id: 'mine-falls',
    name: 'Mine Falls Park',
    location: 'Nashua, NH',
    rating: 4.0,
    tags: ['beginner', 'family', 'scenic'],
    highlights: '325-acre urban oasis with canal/river scenery; great for learning and casual rides.',
    sources: [
      { label: 'City of Nashua', url: 'https://www.nashuanh.gov/491/Mine-Falls-Park' },
    ],
    imageQuery: 'cycling gravel path forest river',
    lat: 42.7623, lon: -71.4870,
  },
  {
    id: 'musquash',
    name: 'Musquash Conservation Area',
    location: 'Londonderry, NH',
    rating: 4.3,
    tags: ['intermediate', 'scenic', 'family'],
    highlights: '1,000+ acres and 20+ miles of marked trails; varied terrain from flats to roots/rocks.',
    sources: [
      { label: 'Londonderry Trailways', url: 'https://londonderrytrails.org/musquash-conservation-area/' },
    ],
    imageQuery: 'mountain biking conservation area forest new england',
    lat: 42.8589, lon: -71.3837,
  },
  {
    id: 'fomba',
    name: 'FOMBA — Depot Rd Singletracks',
    location: 'Auburn, NH',
    rating: 4.5,
    tags: ['flow', 'intermediate'],
    highlights: 'Series of ~11 built singletracks; fast, fun, and well-marked by local stewards.',
    sources: [
      { label: 'Singletracks', url: 'https://www.singletracks.com/bike-trails/depot-road-singletracks-fomba/' },
    ],
    imageQuery: 'flow trail mountain bike pine forest',
    lat: 43.0202, lon: -71.3507,
  },
  {
    id: 'grater-woods',
    name: 'Grater Woods',
    location: 'Merrimack, NH',
    rating: 4.1,
    tags: ['intermediate', 'family', 'scenic'],
    highlights: '480-acre forest with multi-use trail network; varied terrain, ponds, wetlands, and wildlife habitat.',
    sources: [
      { label: 'Merrimack Outdoors', url: 'http://www.merrimackoutdoors.org/our-properties/grater-woods' },
    ],
    imageQuery: 'forest trail mountain biking new england trees',
    lat: 42.8298, lon: -71.5176,
  },
  {
    id: 'kingman-farm',
    name: 'Kingman Farm',
    location: 'Madbury, NH',
    rating: 4.0,
    tags: ['beginner', 'intermediate', 'scenic'],
    highlights: 'UNH-owned fields and forest trails; rolling single/doubletrack with some climbs; bring bug spray.',
    sources: [
      { label: 'Singletracks', url: 'https://www.singletracks.com/bike-trails/kingman-farm/' },
    ],
    imageQuery: 'mountain bike field edge forest singletrack',
    lat: 43.1690, lon: -70.9310,
  },
];

// 30 additional MTB locations across NH (approximate coordinates)
const EXTRA_SPOTS = [
  { id:'highland', name:'Highland Mountain Bike Park', location:'Northfield, NH', lat:43.4336, lon:-71.5927 },
  { id:'franklin-falls', name:'Franklin Falls Trails', location:'Franklin, NH', lat:43.4725, lon:-71.6756 },
  { id:'page-hill', name:'Page Hill Trails', location:'Hill, NH', lat:43.5117, lon:-71.7347 },
  { id:'ahern', name:'Ahern State Park', location:'Laconia, NH', lat:43.6524, lon:-71.4847 },
  { id:'winant', name:'Winant Park', location:'Concord, NH', lat:43.2125, lon:-71.5440 },
  { id:'broken-ground', name:'Broken Ground', location:'Concord, NH', lat:43.2209, lon:-71.5003 },
  { id:'oak-hill-concord', name:'Oak Hill Trails', location:'Concord, NH', lat:43.2639, lon:-71.4965 },
  { id:'boston-lot', name:'Boston Lot', location:'Lebanon, NH', lat:43.6535, lon:-72.2592 },
  { id:'frenchs-ledges', name:"French's Ledges", location:'Plainfield, NH', lat:43.5447, lon:-72.3005 },
  { id:'drummer-hill', name:'Drummer Hill', location:'Keene, NH', lat:42.9657, lon:-72.2844 },
  { id:'goose-pond', name:'Goose Pond (Keene)', location:'Keene, NH', lat:42.9927, lon:-72.2889 },
  { id:'pisgah', name:'Pisgah State Park', location:'Chesterfield, NH', lat:42.9117, lon:-72.4940 },
  { id:'parker-mountain', name:'Parker Mountain Trails', location:'Strafford, NH', lat:43.2659, lon:-71.1570 },
  { id:'horse-hill', name:'Horse Hill Nature Preserve', location:'Merrimack, NH', lat:42.8580, lon:-71.5327 },
  { id:'beaver-brook', name:'Beaver Brook Association', location:'Hollis, NH', lat:42.7456, lon:-71.5911 },
  { id:'hampstead-forest', name:'Hampstead Town Forest', location:'Hampstead, NH', lat:42.8822, lon:-71.1600 },
  { id:'rock-rimmon', name:'Rock Rimmon Park', location:'Manchester, NH', lat:42.9957, lon:-71.4907 },
  { id:'rockingham-rail', name:'Rockingham Recreational Trail', location:'Auburn/Candia, NH', lat:43.0126, lon:-71.3510 },
  { id:'fort-mountain', name:'Fort Mountain / Epsom Town Forest', location:'Epsom, NH', lat:43.2240, lon:-71.3310 },
  { id:'whitaker-woods', name:'Whitaker Woods', location:'North Conway, NH', lat:44.0548, lon:-71.1232 },
  { id:'echo-lake', name:'Echo Lake / Cathedral Ledge', location:'North Conway, NH', lat:44.0704, lon:-71.1386 },
  { id:'great-glen', name:'Great Glen Trails', location:'Gorham, NH', lat:44.2584, lon:-71.2059 },
  { id:'prkr', name:'PRKR MTN Trails', location:'Littleton, NH', lat:44.3070, lon:-71.7733 },
  { id:'pine-hill-littleton', name:'Pine Hill Trails', location:'Littleton, NH', lat:44.3005, lon:-71.7716 },
  { id:'bethlehem-trails', name:'Bethlehem Trails Association', location:'Bethlehem, NH', lat:44.2818, lon:-71.6981 },
  { id:'attitash', name:'Attitash Bike Park (seasonal)', location:'Bartlett, NH', lat:44.0827, lon:-71.2304 },
  { id:'bear-notch', name:'Bear Notch (seasonal biking)', location:'Bartlett, NH', lat:44.1009, lon:-71.2592 },
  { id:'fox-forest', name:'Fox State Forest', location:'Hillsborough, NH', lat:43.1126, lon:-71.8974 },
  { id:'greenfield-sp', name:'Greenfield State Park', location:'Greenfield, NH', lat:42.9909, lon:-71.8739 },
  { id:'ahern-laconia', name:'WOW Trail Connector (Laconia)', location:'Laconia, NH', lat:43.6458, lon:-71.4687 },
];

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #123124, #0c1f18)',
  'linear-gradient(135deg, #102a20, #0a1b14)',
  'linear-gradient(135deg, #0f2c23, #0c1915)'
];

function createSpotCard(spot, idx) {
  const card = document.createElement('article');
  card.className = 'card reveal';

  const imgWrap = document.createElement('div');
  imgWrap.className = 'card__img';
  imgWrap.style.background = PLACEHOLDER_GRADIENTS[idx % PLACEHOLDER_GRADIENTS.length];

  const img = document.createElement('img');
  img.alt = `${spot.name} — mountain biking`;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.style.opacity = '0';
  imgWrap.appendChild(img);

  const body = document.createElement('div');
  body.className = 'card__body';

  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = spot.name;

  const meta = document.createElement('div');
  meta.className = 'card__meta';
  meta.innerHTML = `<span>${spot.location}</span><span class="rating"><span class="star">★</span>${spot.rating.toFixed(1)}</span>`;

  const tags = document.createElement('div');
  tags.className = 'card__tags';
  spot.tags.forEach(t => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = t;
    tags.appendChild(tag);
  });

  const desc = document.createElement('p');
  desc.textContent = spot.highlights;

  const footer = document.createElement('div');
  footer.className = 'card__footer';

  const links = document.createElement('div');
  links.className = 'card__links';
  spot.sources.forEach(s => {
    const a = document.createElement('a');
    a.className = 'link';
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = s.label;
    links.appendChild(a);
  });

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(tags);
  body.appendChild(desc);
  body.appendChild(footer);
  footer.appendChild(links);

  card.appendChild(imgWrap);
  card.appendChild(body);
  card.dataset.tags = spot.tags.join(',');
  card.dataset.rating = String(spot.rating);
  card.dataset.query = spot.imageQuery || '';

  return { card, img };
}

function renderSpots(spots) {
  const grid = document.getElementById('spotsGrid');
  grid.innerHTML = '';
  spots.forEach((s, i) => {
    const { card, img } = createSpotCard(s, i);
    grid.appendChild(card);
    hydrateImage(card, img);
  });
  observeReveals();
}

function filterAndSort() {
  const active = document.querySelector('.chip.is-active')?.dataset.filter || 'all';
  const sortByRating = document.getElementById('sortByRating').checked;

  let arr = [...SPOTS];
  if (active !== 'all') arr = arr.filter(s => s.tags.includes(active));
  if (sortByRating) arr.sort((a,b) => b.rating - a.rating);
  renderSpots(arr);
}

function bindFilters() {
  const chips = document.querySelectorAll('#filters .chip');
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    ch.classList.add('is-active');
    filterAndSort();
  }));
  document.getElementById('sortByRating').addEventListener('change', filterAndSort);
}

// Basic scroll reveal
function observeReveals() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Optional Pexels hydration
async function hydrateImage(card, imgEl) {
  const apiKey = document.querySelector('meta[name="pexels-api-key"]').content.trim();
  if (!apiKey) {
    // No API key: leave gradient placeholder; optionally set a subtle pattern SVG
    return;
  }
  const query = card.dataset.query || 'mountain biking trail forest';
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`, {
      headers: { Authorization: apiKey }
    });
    if (!res.ok) throw new Error('Pexels fetch failed');
    const data = await res.json();
    const photo = data.photos?.[0];
    if (photo?.src?.large) {
      imgEl.src = photo.src.large;
      imgEl.addEventListener('load', () => { imgEl.style.opacity = '1'; });
      imgEl.alt = `${card.querySelector('.card__title').textContent} — Photo by ${photo.photographer} on Pexels`;
    }
  } catch (e) {
    // Silently fail; gradient remains
    // console.warn(e);
  }
}

// Map
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  const map = L.map('map', { scrollWheelZoom: true }).setView([43.9, -71.6], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const all = [...SPOTS, ...EXTRA_SPOTS];
  const group = L.featureGroup();
  all.forEach(p => {
    if (typeof p.lat === 'number' && typeof p.lon === 'number') {
      const m = L.marker([p.lat, p.lon]).bindPopup(`<strong>${p.name}</strong><br/><span style="color:#6fd8ae">${p.location || ''}</span>`);
      m.addTo(group);
    }
  });
  group.addTo(map);
  try { map.fitBounds(group.getBounds().pad(0.08)); } catch (_) {}
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  bindFilters();
  filterAndSort();
  // reveal hero & section headers
  observeReveals();
  initMap();
});

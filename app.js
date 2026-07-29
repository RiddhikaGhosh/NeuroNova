/* ===== LifeLink – Smart Blood Donor Network ===== */
/* Application Logic */

// ===== DATA =====
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const COMPATIBILITY = {
  'O-':  { donateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], receiveFrom: ['O-'], label: 'Universal Donor' },
  'O+':  { donateTo: ['O+', 'A+', 'B+', 'AB+'], receiveFrom: ['O-', 'O+'], label: 'Most Common' },
  'A-':  { donateTo: ['A-', 'A+', 'AB-', 'AB+'], receiveFrom: ['O-', 'A-'], label: 'Rare Type' },
  'A+':  { donateTo: ['A+', 'AB+'], receiveFrom: ['O-', 'O+', 'A-', 'A+'], label: 'Common Type' },
  'B-':  { donateTo: ['B-', 'B+', 'AB-', 'AB+'], receiveFrom: ['O-', 'B-'], label: 'Rare Type' },
  'B+':  { donateTo: ['B+', 'AB+'], receiveFrom: ['O-', 'O+', 'B-', 'B+'], label: 'Common Type' },
  'AB-': { donateTo: ['AB-', 'AB+'], receiveFrom: ['O-', 'A-', 'B-', 'AB-'], label: 'Rarest Type' },
  'AB+': { donateTo: ['AB+'], receiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], label: 'Universal Receiver' }
};

const RARE_GROUPS = ['AB-', 'B-', 'O-'];

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'];

// Sample Donors Data
const SAMPLE_DONORS = [
  { name: 'Rahul Sharma', blood: 'O+', city: 'Mumbai', phone: '+91 98765 43210', available: true, lastDonation: '2026-03-15', donations: 12 },
  { name: 'Priya Patel', blood: 'A+', city: 'Delhi', phone: '+91 87654 32109', available: true, lastDonation: '2026-02-20', donations: 8 },
  { name: 'Arjun Singh', blood: 'B+', city: 'Bangalore', phone: '+91 76543 21098', available: false, lastDonation: '2026-06-01', donations: 15 },
  { name: 'Sneha Reddy', blood: 'AB-', city: 'Hyderabad', phone: '+91 65432 10987', available: true, lastDonation: '2025-12-10', donations: 6 },
  { name: 'Amit Kumar', blood: 'O-', city: 'Chennai', phone: '+91 54321 09876', available: true, lastDonation: '2026-01-25', donations: 20 },
  { name: 'Divya Nair', blood: 'B-', city: 'Kolkata', phone: '+91 43210 98765', available: true, lastDonation: '2026-04-05', donations: 10 },
  { name: 'Karan Mehta', blood: 'A-', city: 'Pune', phone: '+91 32109 87654', available: false, lastDonation: '2026-05-20', donations: 5 },
  { name: 'Ananya Gupta', blood: 'AB+', city: 'Ahmedabad', phone: '+91 21098 76543', available: true, lastDonation: '2025-11-18', donations: 9 },
  { name: 'Vikram Joshi', blood: 'O+', city: 'Jaipur', phone: '+91 10987 65432', available: true, lastDonation: '2026-03-30', donations: 14 },
  { name: 'Meera Iyer', blood: 'A+', city: 'Lucknow', phone: '+91 09876 54321', available: true, lastDonation: '2026-02-14', donations: 7 },
  { name: 'Rohan Das', blood: 'B+', city: 'Mumbai', phone: '+91 98765 11111', available: true, lastDonation: '2026-01-10', donations: 11 },
  { name: 'Pooja Verma', blood: 'O-', city: 'Delhi', phone: '+91 87654 22222', available: false, lastDonation: '2026-06-10', donations: 3 },
  { name: 'Aditya Rao', blood: 'AB+', city: 'Bangalore', phone: '+91 76543 33333', available: true, lastDonation: '2025-10-05', donations: 16 },
  { name: 'Kavita Mishra', blood: 'B-', city: 'Hyderabad', phone: '+91 65432 44444', available: true, lastDonation: '2026-04-22', donations: 4 },
  { name: 'Nikhil Agarwal', blood: 'A-', city: 'Chennai', phone: '+91 54321 55555', available: true, lastDonation: '2025-09-15', donations: 13 },
];

// Sample Blood Banks
const BLOOD_BANKS = [
  { name: 'Red Cross Blood Bank', location: 'Mumbai, Maharashtra', bloods: { 'O+': 45, 'A+': 32, 'B+': 28, 'AB+': 12, 'O-': 5, 'A-': 8, 'B-': 3, 'AB-': 2 }, contact: '+91 22 2345 6789', units: 135 },
  { name: 'Apollo Blood Centre', location: 'Delhi, NCR', bloods: { 'O+': 52, 'A+': 38, 'B+': 22, 'AB+': 15, 'O-': 7, 'A-': 10, 'B-': 4, 'AB-': 3 }, contact: '+91 11 3456 7890', units: 151 },
  { name: 'Fortis Blood Bank', location: 'Bangalore, Karnataka', bloods: { 'O+': 38, 'A+': 25, 'B+': 30, 'AB+': 8, 'O-': 3, 'A-': 6, 'B-': 2, 'AB-': 1 }, contact: '+91 80 4567 8901', units: 113 },
  { name: 'AIIMS Blood Centre', location: 'Hyderabad, Telangana', bloods: { 'O+': 60, 'A+': 42, 'B+': 35, 'AB+': 18, 'O-': 8, 'A-': 12, 'B-': 5, 'AB-': 4 }, contact: '+91 40 5678 9012', units: 184 },
  { name: 'Tata Blood Bank', location: 'Chennai, Tamil Nadu', bloods: { 'O+': 33, 'A+': 20, 'B+': 18, 'AB+': 10, 'O-': 4, 'A-': 5, 'B-': 2, 'AB-': 1 }, contact: '+91 44 6789 0123', units: 93 },
  { name: 'Narayana Blood Centre', location: 'Kolkata, West Bengal', bloods: { 'O+': 40, 'A+': 28, 'B+': 24, 'AB+': 14, 'O-': 6, 'A-': 9, 'B-': 3, 'AB-': 2 }, contact: '+91 33 7890 1234', units: 126 },
];

// Leaderboard data
const LEADERBOARD = [
  { name: 'Amit Kumar', blood: 'O-', donations: 20, city: 'Chennai' },
  { name: 'Aditya Rao', blood: 'AB+', donations: 16, city: 'Bangalore' },
  { name: 'Arjun Singh', blood: 'B+', donations: 15, city: 'Bangalore' },
  { name: 'Vikram Joshi', blood: 'O+', donations: 14, city: 'Jaipur' },
  { name: 'Nikhil Agarwal', blood: 'A-', donations: 13, city: 'Chennai' },
  { name: 'Rahul Sharma', blood: 'O+', donations: 12, city: 'Mumbai' },
  { name: 'Rohan Das', blood: 'B+', donations: 11, city: 'Mumbai' },
  { name: 'Divya Nair', blood: 'B-', donations: 10, city: 'Kolkata' },
  { name: 'Ananya Gupta', blood: 'AB+', donations: 9, city: 'Ahmedabad' },
  { name: 'Priya Patel', blood: 'A+', donations: 8, city: 'Delhi' },
];

// Dashboard data
const DASHBOARD_DATA = {
  requests: { 'O+': 85, 'A+': 72, 'B+': 58, 'AB+': 35, 'O-': 42, 'A-': 28, 'B-': 22, 'AB-': 15 },
  regions: [
    { name: 'Mumbai', count: 234 },
    { name: 'Delhi', count: 198 },
    { name: 'Bangalore', count: 167 },
    { name: 'Hyderabad', count: 145 },
    { name: 'Chennai', count: 132 },
  ],
  alerts: [
    { type: 'critical', text: 'AB- blood critically low in Mumbai region – Only 2 units remaining' },
    { type: 'critical', text: 'O- shortage alert in Delhi – Emergency donors needed' },
    { type: 'warning', text: 'B- running low across Bangalore blood banks' },
    { type: 'warning', text: 'Increased demand for O+ in Chennai hospitals' },
  ]
};

// ===== APP STATE =====
let currentPage = 'home';
let registeredDonors = [...SAMPLE_DONORS];

// ===== ROUTER =====
function navigateTo(page) {
  currentPage = page;
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateActiveNav();
  closeMobileMenu();
}

function updateActiveNav() {
  document.querySelectorAll('.nav a').forEach(link => {
    link.classList.toggle('active', link.dataset.page === currentPage);
  });
}

function closeMobileMenu() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.mobile-toggle');
  if (nav) nav.classList.remove('open');
  if (toggle) toggle.classList.remove('open');
}

// ===== RENDER =====
function renderPage() {
  const main = document.getElementById('main-content');
  switch (currentPage) {
    case 'home': main.innerHTML = renderHome(); break;
    case 'register': main.innerHTML = renderRegister(); break;
    case 'find': main.innerHTML = renderFind(); break;
    case 'emergency': main.innerHTML = renderEmergency(); break;
    case 'compatibility': main.innerHTML = renderCompatibility(); break;
    case 'banks': main.innerHTML = renderBanks(); break;
    case 'awareness': main.innerHTML = renderAwareness(); break;
    case 'dashboard': main.innerHTML = renderDashboard(); break;
    default: main.innerHTML = renderHome();
  }
  initPageEffects();
}

// ===== HOME PAGE =====
function renderHome() {
  return `
    <!-- Hero -->
    <section class="lp-hero" id="hero-section">
      <div class="lp-hero-inner">
        <p class="lp-eyebrow">One Platform. Thousands of Lifesavers.</p>
        <h1 class="lp-hero-title">Connecting Donors.<br><span class="lp-red">Saving Lives.</span></h1>
        <p class="lp-lede">
          Every year, thousands of patients — many needing rare blood types like AB-, B- and O- —
          lose critical time searching for a match. LifeLink links donors, patients, hospitals and
          blood banks on one live network, so the right blood group reaches the right person before
          it's too late.
        </p>
        <div class="lp-hero-ctas">
          <button class="btn btn-primary btn-lg" onclick="navigateTo('find')">🔍 Find Blood Donor</button>
          <button class="btn btn-outline btn-lg" onclick="navigateTo('register')">❤️ Register as Donor</button>
          <button class="btn btn-outline btn-lg lp-emergency-btn" onclick="navigateTo('emergency')">🚨 Emergency Request</button>
        </div>
      </div>

      <div class="lp-hero-pulse" aria-hidden="true">
        <div class="lp-pulse-track">
          <svg viewBox="0 0 590 70" preserveAspectRatio="none">
            <path d="M0,35 L210,35 L224,35 L232,10 L244,60 L254,20 L264,35 L590,35" />
          </svg>
          <svg viewBox="0 0 590 70" preserveAspectRatio="none">
            <path d="M0,35 L210,35 L224,35 L232,10 L244,60 L254,20 L264,35 L590,35" />
          </svg>
        </div>
      </div>

      <div class="lp-stats-row">
        <div class="lp-stat animate-on-scroll">
          <div class="stat-number" data-count="15847">0</div>
          <div class="lp-stat-label">Registered Donors</div>
        </div>
        <div class="lp-stat animate-on-scroll">
          <div class="stat-number" data-count="8432">0</div>
          <div class="lp-stat-label">Successful Donations</div>
        </div>
        <div class="lp-stat animate-on-scroll">
          <div class="stat-number" data-count="2156">0</div>
          <div class="lp-stat-label">Active Requests Fulfilled</div>
        </div>
        <div class="lp-stat animate-on-scroll">
          <div class="stat-number" data-count="342">0</div>
          <div class="lp-stat-label">Partner Blood Banks</div>
        </div>
      </div>
    </section>

    <!-- The Problem -->
    <section class="lp-problem-section">
      <div class="container">
        <div class="lp-section-head">
          <p class="lp-eyebrow">The Problem</p>
          <h2>A shortage measured in minutes, not units</h2>
        </div>

        <div class="lp-problem-grid">
          <div class="lp-problem-card animate-on-scroll">
            <div class="lp-problem-num">01</div>
            <h3>Rare groups vanish fast</h3>
            <p>AB-, B- and O- make up a fraction of the donor pool, so hospitals often have zero units on hand when a critical case arrives.</p>
          </div>
          <div class="lp-problem-card animate-on-scroll">
            <div class="lp-problem-num">02</div>
            <h3>Families search blind</h3>
            <p>Relatives call friends, post on social media, and wait — with no way to see who's nearby, eligible, and actually available right now.</p>
          </div>
          <div class="lp-problem-card animate-on-scroll">
            <div class="lp-problem-num">03</div>
            <h3>Donors go untracked</h3>
            <p>Willing donors exist everywhere, but without a shared network, hospitals can't reach them the moment it matters.</p>
          </div>
        </div>

        <div class="lp-cta-banner animate-on-scroll">
          <div>
            <h2>Your donation can restart a heartbeat.</h2>
            <p>Join the network — it takes two minutes to register, and you could be the reason someone makes it through the night.</p>
          </div>
          <button class="btn btn-primary btn-lg" onclick="navigateTo('register')">Register as Donor</button>
        </div>
      </div>
    </section>
  `;
}

// ===== REGISTER PAGE =====
function renderRegister() {
  return `
    <div class="page-header">
      <h1>Register as <span class="text-accent">Blood Donor</span></h1>
      <p>Join our network of lifesavers. Your single donation can save up to 3 lives.</p>
    </div>
    <section class="section">
      <div class="container">
        <div class="form-card animate-on-scroll">
          <h2>Donor Registration</h2>
          <p class="subtitle">Fill in your details to join the LifeLink donor network.</p>
          <form id="register-form" onsubmit="handleRegister(event)">
            <div class="form-grid">
              <div class="form-group">
                <label>Full Name <span class="required">*</span></label>
                <input type="text" class="form-control" id="reg-name" placeholder="Enter your full name" required>
              </div>
              <div class="form-group">
                <label>Blood Group <span class="required">*</span></label>
                <select class="form-control" id="reg-blood" required>
                  <option value="">Select blood group</option>
                  ${BLOOD_GROUPS.map(bg => `<option value="${bg}">${bg}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Age <span class="required">*</span></label>
                <input type="number" class="form-control" id="reg-age" placeholder="e.g. 25" min="18" max="65" required>
              </div>
              <div class="form-group">
                <label>Gender <span class="required">*</span></label>
                <select class="form-control" id="reg-gender" required>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>Phone Number <span class="required">*</span></label>
                <input type="tel" class="form-control" id="reg-phone" placeholder="+91 XXXXX XXXXX" required>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" id="reg-email" placeholder="your@email.com">
              </div>
              <div class="form-group">
                <label>City / Location <span class="required">*</span></label>
                <select class="form-control" id="reg-city" required>
                  <option value="">Select city</option>
                  ${CITIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Last Blood Donation Date</label>
                <input type="date" class="form-control" id="reg-last-donation" onchange="checkDonationEligibility()">
                <div id="donation-eligibility"></div>
              </div>
              <div class="form-group full-width">
                <label>Availability Status <span class="required">*</span></label>
                <select class="form-control" id="reg-availability" required>
                  <option value="Available">Available for Donation</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
              <div class="form-group full-width" style="margin-top: 12px;">
                <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Register as Donor</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

function checkDonationEligibility() {
  const lastDate = document.getElementById('reg-last-donation').value;
  const container = document.getElementById('donation-eligibility');
  if (!lastDate) { container.innerHTML = ''; return; }
  
  const last = new Date(lastDate);
  const now = new Date();
  const diffMs = now - last;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const threeMonths = 90;
  
  if (diffDays < threeMonths) {
    const daysLeft = threeMonths - diffDays;
    container.innerHTML = `
      <div class="donation-warning">
        ⚠️ You need to wait ${daysLeft} more day${daysLeft > 1 ? 's' : ''} before your next donation (3-month gap required).
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="donation-warning ok">
        ✅ You are eligible to donate blood! Last donation was ${diffDays} days ago.
      </div>
    `;
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const blood = document.getElementById('reg-blood').value;
  const city = document.getElementById('reg-city').value;
  const phone = document.getElementById('reg-phone').value;
  const availability = document.getElementById('reg-availability').value;
  const lastDonation = document.getElementById('reg-last-donation').value;
  
  const newDonor = {
    name,
    blood,
    city,
    phone,
    available: availability === 'Available',
    lastDonation: lastDonation || null,
    donations: 0
  };
  registeredDonors.push(newDonor);
  
  showToast(`Welcome ${name}! You've been registered as a ${blood} blood donor in ${city}.`, 'success');
  
  // Show modal
  showModal(
    'Registration Successful! 🎉',
    `Thank you for joining LifeLink, ${name}! As a ${blood} donor in ${city}, you are now part of a network saving lives every day.${RARE_GROUPS.includes(blood) ? ' Your rare blood type is in high demand — you will receive priority emergency alerts.' : ''}`,
    [
      { text: 'Find Donors', class: 'btn-outline', action: () => { closeModal(); navigateTo('find'); } },
      { text: 'Go Home', class: 'btn-primary', action: () => { closeModal(); navigateTo('home'); } }
    ]
  );
}

// ===== FIND DONOR PAGE =====
function renderFind() {
  return `
    <div class="page-header">
      <h1>Find Blood <span class="text-accent">Donors</span></h1>
      <p>Search our network of verified donors by blood group and location.</p>
    </div>
    <section class="section">
      <div class="container">
        <div class="search-bar animate-on-scroll">
          <select class="form-control" id="search-blood" onchange="filterDonors()">
            <option value="">All Blood Groups</option>
            ${BLOOD_GROUPS.map(bg => `<option value="${bg}">${bg}</option>`).join('')}
          </select>
          <select class="form-control" id="search-city" onchange="filterDonors()">
            <option value="">All Locations</option>
            ${CITIES.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
          <select class="form-control" id="search-availability" onchange="filterDonors()">
            <option value="">All Status</option>
            <option value="available">Available Only</option>
          </select>
          <button class="btn btn-primary" onclick="filterDonors()">🔍 Search</button>
        </div>
        <div id="search-summary" class="animate-on-scroll" style="margin-bottom: 20px; font-size: 0.95rem; color: var(--text-secondary);">
          Showing all ${registeredDonors.length} donors
        </div>
        <div class="donor-results" id="donor-results">
          ${renderDonorCards(registeredDonors)}
        </div>
      </div>
    </section>
  `;
}

function renderDonorCards(donors) {
  if (donors.length === 0) {
    return `<div style="text-align: center; padding: 60px 20px; grid-column: 1 / -1;">
      <div style="font-size: 3rem; margin-bottom: 16px;">😔</div>
      <h3 style="margin-bottom: 8px;">No donors found</h3>
      <p style="color: var(--text-secondary);">Try adjusting your search criteria or check back later.</p>
    </div>`;
  }
  
  return donors.map(d => {
    const initials = d.name.split(' ').map(n => n[0]).join('');
    const distance = (Math.random() * 15 + 1).toFixed(1);
    return `
      <div class="donor-card">
        <div class="donor-card-header">
          <div class="donor-avatar">${initials}</div>
          <div>
            <div class="donor-name">${d.name}</div>
            <span class="donor-blood">${d.blood}</span>
          </div>
        </div>
        <div class="donor-details">
          <div class="donor-detail">📍 ${d.city} · ${distance} km away</div>
          <div class="donor-detail">🩸 ${d.donations || 0} donations</div>
          <div class="donor-detail">
            <span class="donor-status ${d.available ? 'available' : 'unavailable'}">
              <span class="donor-status-dot"></span>
              ${d.available ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>
        <button class="btn ${d.available ? 'btn-primary' : 'btn-outline'} btn-sm" style="width: 100%;" 
          onclick="${d.available ? `showToast('Contact request sent to ${d.name}. They will be notified.', 'success')` : `showToast('This donor is currently unavailable.', 'error')`}">
          ${d.available ? '📞 Contact Donor' : 'Unavailable'}
        </button>
      </div>
    `;
  }).join('');
}

function filterDonors() {
  const blood = document.getElementById('search-blood').value;
  const city = document.getElementById('search-city').value;
  const availability = document.getElementById('search-availability').value;
  
  let filtered = registeredDonors.filter(d => {
    if (blood && d.blood !== blood) return false;
    if (city && d.city !== city) return false;
    if (availability === 'available' && !d.available) return false;
    return true;
  });
  
  document.getElementById('donor-results').innerHTML = renderDonorCards(filtered);
  document.getElementById('search-summary').textContent = `Showing ${filtered.length} of ${registeredDonors.length} donors${blood ? ` with blood group ${blood}` : ''}${city ? ` in ${city}` : ''}`;
}

// ===== EMERGENCY PAGE =====
function renderEmergency() {
  return `
    <div class="page-header" style="background: linear-gradient(180deg, var(--red-50), #fff);">
      <h1>🚨 Emergency Blood <span class="text-accent">Request</span></h1>
      <p>Submit an urgent request and we'll instantly notify nearby compatible donors.</p>
    </div>
    <section class="section">
      <div class="container">
        <div class="form-card animate-on-scroll">
          <h2>🩸 Urgent Blood Request</h2>
          <p class="subtitle">Please fill in the details accurately. Nearby donors will be alerted immediately.</p>
          <form id="emergency-form" onsubmit="handleEmergency(event)">
            <div class="form-grid">
              <div class="form-group">
                <label>Patient Name <span class="required">*</span></label>
                <input type="text" class="form-control" id="em-patient" placeholder="Patient's full name" required>
              </div>
              <div class="form-group">
                <label>Required Blood Group <span class="required">*</span></label>
                <select class="form-control" id="em-blood" required>
                  <option value="">Select blood group</option>
                  ${BLOOD_GROUPS.map(bg => `<option value="${bg}">${bg}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Hospital Name <span class="required">*</span></label>
                <input type="text" class="form-control" id="em-hospital" placeholder="Hospital name" required>
              </div>
              <div class="form-group">
                <label>Hospital Location <span class="required">*</span></label>
                <select class="form-control" id="em-location" required>
                  <option value="">Select location</option>
                  ${CITIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Contact Number <span class="required">*</span></label>
                <input type="tel" class="form-control" id="em-phone" placeholder="+91 XXXXX XXXXX" required>
              </div>
              <div class="form-group">
                <label>Units Required</label>
                <input type="number" class="form-control" id="em-units" placeholder="e.g. 2" min="1" max="20" value="1">
              </div>
              <div class="form-group full-width">
                <label>Urgency Level <span class="required">*</span></label>
                <div class="urgency-selector">
                  <div class="urgency-option" data-level="normal" onclick="selectUrgency('normal')">
                    <div style="font-size: 1.3rem; margin-bottom: 4px;">🟢</div>
                    Normal
                  </div>
                  <div class="urgency-option" data-level="urgent" onclick="selectUrgency('urgent')">
                    <div style="font-size: 1.3rem; margin-bottom: 4px;">🟡</div>
                    Urgent
                  </div>
                  <div class="urgency-option selected critical" data-level="critical" onclick="selectUrgency('critical')">
                    <div style="font-size: 1.3rem; margin-bottom: 4px;">🔴</div>
                    Critical
                  </div>
                </div>
                <input type="hidden" id="em-urgency" value="critical">
              </div>
              <div class="form-group full-width" style="margin-top: 12px;">
                <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; background: linear-gradient(135deg, #dc2626, #991b1b);">
                  🚨 Submit Emergency Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

function selectUrgency(level) {
  document.querySelectorAll('.urgency-option').forEach(opt => {
    opt.classList.remove('selected', 'normal', 'urgent', 'critical');
  });
  const selected = document.querySelector(`.urgency-option[data-level="${level}"]`);
  selected.classList.add('selected', level);
  document.getElementById('em-urgency').value = level;
}

function handleEmergency(e) {
  e.preventDefault();
  const patient = document.getElementById('em-patient').value;
  const blood = document.getElementById('em-blood').value;
  const hospital = document.getElementById('em-hospital').value;
  const location = document.getElementById('em-location').value;
  const urgency = document.getElementById('em-urgency').value;
  
  // Find matching donors
  const matchingDonors = registeredDonors.filter(d => d.blood === blood && d.available);
  const nearbyDonors = matchingDonors.filter(d => d.city === location);
  
  showToast(`🚨 Emergency alert sent to ${matchingDonors.length} compatible donors! ${nearbyDonors.length} are in ${location}.`, 'success');
  
  // Simulate notification sequence
  setTimeout(() => {
    showToast(`📱 ${nearbyDonors.length > 0 ? nearbyDonors[0].name : 'A nearby donor'} has been notified of the ${urgency} request.`, 'info');
  }, 2000);
  
  setTimeout(() => {
    showToast(`✅ 3 donors have confirmed availability for ${patient}'s request at ${hospital}.`, 'success');
  }, 4500);
  
  showModal(
    'Emergency Request Submitted 🚨',
    `Your ${urgency} blood request for ${blood} has been submitted.\n\n• Patient: ${patient}\n• Hospital: ${hospital}, ${location}\n• ${matchingDonors.length} compatible donors notified\n• ${nearbyDonors.length} donors near ${location}\n\nDonors will receive push notifications and SMS alerts immediately.`,
    [
      { text: 'View Donors', class: 'btn-outline', action: () => { closeModal(); navigateTo('find'); document.getElementById('search-blood').value = blood; filterDonors(); } },
      { text: 'Done', class: 'btn-primary', action: () => closeModal() }
    ]
  );
}

// ===== COMPATIBILITY CHECKER =====
function renderCompatibility() {
  return `
    <div class="page-header">
      <h1>Blood Group <span class="text-accent">Compatibility</span></h1>
      <p>Find out which blood types are compatible for transfusion.</p>
    </div>
    <section class="section">
      <div class="container">
        <div class="compatibility-tool animate-on-scroll">
          <div class="compat-select-row">
            <label>Select your blood group:</label>
            <select class="form-control" id="compat-select" onchange="showCompatibility()" style="max-width: 200px;">
              <option value="">Choose...</option>
              ${BLOOD_GROUPS.map(bg => `<option value="${bg}">${bg}</option>`).join('')}
            </select>
          </div>
          <div id="compat-results"></div>
        </div>
      </div>
    </section>
  `;
}

function showCompatibility() {
  const blood = document.getElementById('compat-select').value;
  const container = document.getElementById('compat-results');
  
  if (!blood) { container.innerHTML = ''; return; }
  
  const data = COMPATIBILITY[blood];
  
  container.innerHTML = `
    <div class="compat-result active">
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="font-family: 'Outfit', sans-serif; font-size: 3.5rem; font-weight: 900; color: var(--accent); margin-bottom: 8px;">${blood}</div>
        <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-secondary);">${data.label}</div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 800px; margin: 0 auto;">
        <div>
          <div class="compat-direction">
            <h3>🩸 ${blood} Can Donate To</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">These blood types can receive from ${blood}</p>
          </div>
          <div class="compat-grid" style="max-width: none;">
            ${BLOOD_GROUPS.map(bg => `
              <div class="compat-item ${data.donateTo.includes(bg) ? 'can-donate' : 'cannot'}">
                ${bg}
                <span class="compat-label">${data.donateTo.includes(bg) ? '✓ Compatible' : '✗ No'}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          <div class="compat-direction">
            <h3>💉 ${blood} Can Receive From</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">These blood types can donate to ${blood}</p>
          </div>
          <div class="compat-grid" style="max-width: none;">
            ${BLOOD_GROUPS.map(bg => `
              <div class="compat-item ${data.receiveFrom.includes(bg) ? 'can-donate' : 'cannot'}">
                ${bg}
                <span class="compat-label">${data.receiveFrom.includes(bg) ? '✓ Compatible' : '✗ No'}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ===== BLOOD BANKS =====
function renderBanks() {
  return `
    <div class="page-header">
      <h1>Blood Bank <span class="text-accent">Directory</span></h1>
      <p>Find nearby blood banks with real-time availability and contact information.</p>
    </div>
    <section class="section">
      <div class="container">
        <div class="bank-grid">
          ${BLOOD_BANKS.map(bank => `
            <div class="bank-card animate-on-scroll">
              <div class="bank-name">🏥 ${bank.name}</div>
              <div class="bank-location">📍 ${bank.location}</div>
              <div class="bank-units">Total Units Available: <strong>${bank.units}</strong></div>
              <div class="bank-bloods">
                ${Object.entries(bank.bloods).map(([bg, units]) => `
                  <span class="bank-blood-tag ${units <= 5 ? 'low' : ''}">${bg}: ${units}${units <= 5 ? ' ⚠️' : ''}</span>
                `).join('')}
              </div>
              <div class="bank-contact">📞 ${bank.contact}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// ===== AWARENESS PAGE =====
function renderAwareness() {
  return `
    <div class="page-header">
      <h1>Blood Donation <span class="text-accent">Awareness</span></h1>
      <p>Learn everything about blood donation and why it matters.</p>
    </div>
    <section class="section">
      <div class="container">
        <div class="awareness-grid">
          <div class="awareness-card animate-on-scroll">
            <h3><span style="font-size: 1.3rem;">💪</span> Benefits of Blood Donation</h3>
            <ul>
              <li>Saves up to 3 lives with a single donation</li>
              <li>Free health screening before every donation</li>
              <li>Reduces risk of heart disease and cancer</li>
              <li>Stimulates production of new blood cells</li>
              <li>Burns approximately 650 calories per donation</li>
              <li>Gives a sense of purpose and community service</li>
            </ul>
          </div>
          <div class="awareness-card animate-on-scroll">
            <h3><span style="font-size: 1.3rem;">✅</span> Who Can Donate Blood</h3>
            <ul>
              <li>Age between 18 to 65 years</li>
              <li>Minimum weight of 50 kg (110 lbs)</li>
              <li>Hemoglobin level at least 12.5 g/dL</li>
              <li>No chronic illnesses or infections</li>
              <li>Have not donated in the last 3 months</li>
              <li>In good general health on donation day</li>
            </ul>
          </div>
          <div class="awareness-card animate-on-scroll">
            <h3><span style="font-size: 1.3rem;">❌</span> Who Cannot Donate Blood</h3>
            <ul>
              <li>Individuals with HIV, Hepatitis B/C</li>
              <li>Pregnant or breastfeeding women</li>
              <li>People with heart, kidney, or liver disease</li>
              <li>Those on certain medications (anticoagulants)</li>
              <li>People with recent tattoos or piercings (6 months)</li>
              <li>Individuals under the influence of alcohol</li>
            </ul>
          </div>
          <div class="awareness-card animate-on-scroll">
            <h3><span style="font-size: 1.3rem;">🚫</span> Common Myths Debunked</h3>
            <ul>
              <li><strong>Myth:</strong> Donating blood makes you weak → <em>You recover within 24-48 hours</em></li>
              <li><strong>Myth:</strong> You can get diseases from donating → <em>Sterile, single-use equipment is always used</em></li>
              <li><strong>Myth:</strong> Vegetarians can't donate → <em>Diet doesn't affect eligibility if you're healthy</em></li>
              <li><strong>Myth:</strong> It's very painful → <em>Only a small pinch, over in seconds</em></li>
              <li><strong>Myth:</strong> Blood donation takes hours → <em>The actual process takes only 8-10 minutes</em></li>
            </ul>
          </div>
          <div class="awareness-card animate-on-scroll" style="grid-column: 1 / -1;">
            <h3><span style="font-size: 1.3rem;">🛡️</span> Safety of Blood Donation</h3>
            <ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <li>All equipment is sterile, single-use, and disposable</li>
              <li>Trained medical staff supervise every step</li>
              <li>Pre-donation health check ensures donor safety</li>
              <li>Blood is tested for infectious diseases before use</li>
              <li>Donors are given refreshments and rest time post-donation</li>
              <li>Adverse reactions are extremely rare (less than 1%)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ===== DASHBOARD =====
function renderDashboard() {
  return `
    <div class="page-header">
      <h1>Data Analytics <span class="text-accent">Dashboard</span></h1>
      <p>Real-time insights on blood demand trends and shortage alerts.</p>
    </div>
    <section class="section">
      <div class="container">
        <div class="dashboard-grid">
          <div>
            <div class="chart-card animate-on-scroll">
              <h3>🩸 Blood Groups Most Requested This Month</h3>
              <div class="bar-chart" id="bar-chart">
                ${Object.entries(DASHBOARD_DATA.requests).sort((a, b) => b[1] - a[1]).map(([bg, count], i) => {
                  const maxCount = Math.max(...Object.values(DASHBOARD_DATA.requests));
                  const width = (count / maxCount) * 100;
                  const colors = ['red', 'red', 'blue', 'blue', 'green', 'amber', 'amber', 'amber'];
                  return `
                    <div class="bar-item">
                      <div class="bar-label">${bg}</div>
                      <div class="bar-track">
                        <div class="bar-fill ${colors[i]}" data-width="${width}" style="width: 0%">${count} requests</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="chart-card animate-on-scroll" style="margin-top: 24px;">
              <h3>⚠️ Rare Blood Shortage Alerts</h3>
              <div class="alert-list">
                ${DASHBOARD_DATA.alerts.map(alert => `
                  <div class="alert-item ${alert.type}">
                    <div class="alert-icon">${alert.type === 'critical' ? '🔴' : '🟡'}</div>
                    <span>${alert.text}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div>
            <div class="chart-card animate-on-scroll">
              <h3>📍 Regions with Highest Demand</h3>
              <div class="region-list">
                ${DASHBOARD_DATA.regions.map((r, i) => `
                  <div class="region-item">
                    <div>
                      <span style="font-weight: 700; color: var(--accent); margin-right: 8px;">#${i + 1}</span>
                      <span class="region-name">${r.name}</span>
                    </div>
                    <span class="region-count">${r.count}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="chart-card animate-on-scroll" style="margin-top: 24px;">
              <h3>📊 Quick Stats</h3>
              <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 8px;">
                <div style="padding: 16px; background: var(--red-50); border-radius: var(--radius-md); border-left: 4px solid var(--accent);">
                  <div style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--accent);">357</div>
                  <div style="font-size: 0.85rem; color: var(--text-secondary);">Total requests this month</div>
                </div>
                <div style="padding: 16px; background: #ecfdf5; border-radius: var(--radius-md); border-left: 4px solid #10b981;">
                  <div style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 800; color: #059669;">89%</div>
                  <div style="font-size: 0.85rem; color: var(--text-secondary);">Request fulfillment rate</div>
                </div>
                <div style="padding: 16px; background: var(--blue-50); border-radius: var(--radius-md); border-left: 4px solid var(--blue-500);">
                  <div style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--blue-500);">28 min</div>
                  <div style="font-size: 0.85rem; color: var(--text-secondary);">Avg. response time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ===== TOAST SYSTEM =====
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// ===== MODAL =====
function showModal(title, message, actions) {
  let overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.remove();
  
  overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <h3>${title}</h3>
      <p style="white-space: pre-line;">${message}</p>
      <div class="modal-actions">
        ${actions.map(a => `<button class="btn ${a.class}" id="modal-action-${a.text.replace(/\s/g, '')}">${a.text}</button>`).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  
  // Bind actions
  actions.forEach(a => {
    const btn = document.getElementById(`modal-action-${a.text.replace(/\s/g, '')}`);
    if (btn) btn.addEventListener('click', a.action);
  });
  
  // Click outside to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  
  // Animate in
  requestAnimationFrame(() => overlay.classList.add('active'));
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
}

// ===== SCROLL EFFECTS =====
function initPageEffects() {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  
  // Animate stat counters
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    animateCounter(el, target);
  });
  
  // Animate dashboard bars
  setTimeout(() => {
    document.querySelectorAll('.bar-fill[data-width]').forEach(el => {
      el.style.width = el.dataset.width + '%';
    });
  }, 500);
}

function animateCounter(el, target) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current).toLocaleString();
          }
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(el);
}

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.mobile-toggle');
  nav.classList.toggle('open');
  toggle.classList.toggle('open');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderPage();
  
  // Setup nav click handlers (delegated since nav is static)
  document.addEventListener('click', (e) => {
    const navLink = e.target.closest('.nav a[data-page]');
    if (navLink) {
      e.preventDefault();
      navigateTo(navLink.dataset.page);
    }
  });
});

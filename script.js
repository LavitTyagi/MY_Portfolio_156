// // Set this to your deployed backend URL, for example https://your-api.onrender.com
// const API_BASE = 'http://localhost:5000/api';
// const DEFAULT_PROFILE = {
//   name: 'Lavit Tyagi (लवित त्यागी)',
//   title: 'Data Analytics & Full-Stack Developer',
//   contact: 'Add your public contact details',
//   summary: 'Computer Science Engineering student interested in data analytics, Python, SQL, and full-stack application development.',
//   textAlign: 'justify',
//   skills: [{ name: 'Python', level: 80 }, { name: 'SQL', level: 80 }, { name: 'Excel', level: 80 }, { name: 'MERN Stack', level: 70 }],
//   sections: [{ heading: 'EDUCATION', body: 'B.Tech Computer Science Engineering — ITM University Gwalior' }, { heading: 'PROJECTS', body: 'Travel and Tourism Web Application — MERN stack project' }],
//   photoUrl: '', pdfUrl: '', pdfName: ''
// };
// let profile = structuredClone(DEFAULT_PROFILE);
// let authToken = sessionStorage.getItem('portfolioAdminToken') || '';
// const $ = (id) => document.getElementById(id);
// const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// const projects = [
//   { title: 'Travel and Tourism Web Application', category: 'web', desc: 'MERN-stack platform concept for travel services, bookings, and user accounts.', tags: ['React', 'Node.js', 'MongoDB'] },
//   { title: 'Soil Health Analysis', category: 'ds', desc: 'Machine-learning project exploring crop prediction from soil and environmental features.', tags: ['Python', 'Pandas', 'Scikit-learn'] },
//   { title: 'Sales Analytics Dashboard', category: 'da', desc: 'Dashboard concept for tracking sales performance and business KPIs.', tags: ['Excel', 'SQL', 'Power BI'] },
//   { title: 'Course Management System', category: 'web', desc: 'Web application concept for course listings, enrollment, and progress tracking.', tags: ['React', 'Express', 'MongoDB'] }
// ];
// function renderProjects(filter = 'all') {
//   $('projectsGrid').innerHTML = '';
//   projects.filter(p => filter === 'all' || p.category === filter).forEach(p => {
//     const card = document.createElement('article'); card.className = 'project-card';
//     const head = document.createElement('div'); head.className = 'project-header'; head.textContent = ({ ds: 'DATA SCIENCE & ML', da: 'DATA ANALYTICS', web: 'FULL-STACK WEB' })[p.category];
//     const body = document.createElement('div'); body.className = 'project-body';
//     const title = document.createElement('h3'); title.textContent = p.title;
//     const desc = document.createElement('p'); desc.textContent = p.desc;
//     const chips = document.createElement('div'); chips.className = 'skills-chips'; p.tags.forEach(t => { const s = document.createElement('span'); s.textContent = t; chips.appendChild(s); });
//     body.append(title, desc, chips); card.append(head, body); $('projectsGrid').appendChild(card);
//   });
// }
// function renderResume(data = profile) {
//   $('outName').textContent = data.name || '';
//   $('outTitle').textContent = data.title || '';
//   $('outContact').textContent = data.contact || '';
//   $('outSummary').textContent = data.summary || '';
//   $('outSummary').className = `align-${['left', 'center', 'right', 'justify'].includes(data.textAlign) ? data.textAlign : 'left'}`;
//   $('outSkillsContainer').replaceChildren();
//   (data.skills || []).forEach(skill => {
//     const line = document.createElement('div'); line.className = 'skill-line';
//     const name = document.createElement('span'); name.textContent = skill.name;
//     const level = document.createElement('strong'); level.textContent = `${Math.max(0, Math.min(100, Number(skill.level) || 0))}%`;
//     line.append(name, level); $('outSkillsContainer').appendChild(line);
//   });
//   $('outDynamicSectionsContainer').replaceChildren();
//   (data.sections || []).forEach(section => {
//     const wrap = document.createElement('div'); wrap.className = 'res-body-section';
//     const h = document.createElement('h5'); h.textContent = section.heading || '';
//     const p = document.createElement('p'); p.textContent = section.body || '';
//     wrap.append(h, p); $('outDynamicSectionsContainer').appendChild(wrap);
//   });
//   if (data.photoUrl) $('heroProfileImg').src = data.photoUrl;
//   if (data.pdfUrl) {
//     $('pdfPublicMessage').classList.add('hidden'); $('uploadedPreviewContainer').classList.remove('hidden');
//     $('uploadedFileName').textContent = data.pdfName || 'Published resume.pdf';
//     $('downloadUploadedBtn').href = data.pdfUrl; $('pdfViewerIframe').src = data.pdfUrl;
//   } else {
//     $('uploadedPreviewContainer').classList.add('hidden'); $('pdfPublicMessage').classList.remove('hidden');
//   }
// }
// function fillEditor(data = profile) {
//   $('bName').value = data.name || ''; $('bTitle').value = data.title || ''; $('bContact').value = data.contact || '';
//   $('bSummary').value = data.summary || ''; $('bTextAlign').value = data.textAlign || 'left';
//   $('bSkills').value = (data.skills || []).map(s => `${s.name} | ${s.level}`).join('\n');
//   $('bSections').value = (data.sections || []).map(s => `${s.heading}\n${s.body}`).join('\n\n');
// }
// function readEditor() {
//   const skills = $('bSkills').value.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
//     const [name, rawLevel = '70'] = line.split('|'); return { name: name.trim(), level: Math.max(0, Math.min(100, Number(rawLevel.trim()) || 0)) };
//   }).filter(s => s.name);
//   const blocks = $('bSections').value.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
//   const sections = blocks.map(block => { const lines = block.split('\n'); return { heading: (lines.shift() || '').trim(), body: lines.join('\n').trim() }; });
//   return { ...profile, name: $('bName').value.trim(), title: $('bTitle').value.trim(), contact: $('bContact').value.trim(), summary: $('bSummary').value.trim(), textAlign: $('bTextAlign').value, skills, sections };
// }
// function setAdminMode(isAdmin) {
//   document.querySelectorAll('.admin-only').forEach(el => el.classList.toggle('hidden', !isAdmin));
//   $('adminLoginBtn').classList.toggle('hidden', isAdmin); $('adminLogoutBtn').classList.toggle('hidden', !isAdmin);
//   $('adminStatusIndicator').innerHTML = isAdmin ? '<i class="fa-solid fa-lock-open"></i> Admin mode — changes are not public until saved.' : '<i class="fa-solid fa-lock"></i> Public viewing mode';
//   $('builderFormCard').classList.toggle('hidden', !isAdmin);
// }
// async function api(path, options = {}) {
//   if (API_BASE.includes('YOUR-BACKEND-URL')) throw new Error('Backend URL is not configured yet. Follow README setup steps first.');
//   const headers = { ...(options.headers || {}) }; if (authToken) headers.Authorization = `Bearer ${authToken}`;
//   if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
//   const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
//   const data = await response.json().catch(() => ({ message: 'Unexpected server response' }));
//   if (!response.ok) throw new Error(data.message || 'Request failed'); return data;
// }
// async function loadPublishedProfile() {
//   try { const result = await api('/profile'); profile = { ...DEFAULT_PROFILE, ...result.profile }; }
//   catch (error) { console.warn(error.message); profile = { ...DEFAULT_PROFILE }; }
//   renderResume(profile); fillEditor(profile);
// }
// $('themeToggle').addEventListener('click', () => { document.body.classList.toggle('dark-theme'); document.body.classList.toggle('light-theme'); $('themeToggle').innerHTML = document.body.classList.contains('dark-theme') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>'; });
// $('hamburger').addEventListener('click', () => $('navLinks').classList.toggle('open'));
// document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => $('navLinks').classList.remove('open')));
// document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderProjects(btn.dataset.filter); }));
// document.querySelectorAll('.mode-btn').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b === btn)); $('modeBuilder').classList.toggle('hidden', btn.dataset.mode !== 'builder'); $('modeUpload').classList.toggle('hidden', btn.dataset.mode !== 'upload'); }));
// $('adminLoginBtn').addEventListener('click', () => $('adminModal').classList.remove('hidden'));
// $('closeAdminModal').addEventListener('click', () => $('adminModal').classList.add('hidden'));
// $('adminModal').addEventListener('click', e => { if (e.target === $('adminModal')) $('adminModal').classList.add('hidden'); });
// $('adminLoginForm').addEventListener('submit', async e => { e.preventDefault(); $('loginMessage').textContent = 'Signing in…'; try { const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email: $('adminEmail').value.trim(), password: $('adminPassword').value }) }); authToken = data.token; sessionStorage.setItem('portfolioAdminToken', authToken); setAdminMode(true); $('adminModal').classList.add('hidden'); $('loginMessage').textContent = ''; } catch (err) { $('loginMessage').textContent = err.message; } });
// $('adminLogoutBtn').addEventListener('click', () => { authToken = ''; sessionStorage.removeItem('portfolioAdminToken'); setAdminMode(false); });
// $('saveResumeBtn').addEventListener('click', async () => { try { const updated = readEditor(); const result = await api('/profile', { method: 'PUT', body: JSON.stringify(updated) }); profile = { ...DEFAULT_PROFILE, ...result.profile }; renderResume(profile); fillEditor(profile); alert('Resume saved and published for all visitors.'); } catch (err) { alert(`Could not save resume: ${err.message}`); } });
// $('heroImageInput').addEventListener('change', async e => { const file = e.target.files[0]; if (!file) return; if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { alert('Choose a JPG, PNG, or WebP image.'); return; } if (file.size > 5 * 1024 * 1024) { alert('Image must be 5 MB or smaller.'); return; } const form = new FormData(); form.append('file', file); try { const result = await api('/upload/photo', { method: 'POST', body: form }); profile = { ...profile, photoUrl: result.url }; $('heroProfileImg').src = result.url; alert('Profile photo published.'); } catch (err) { alert(`Photo upload failed: ${err.message}`); } e.target.value = ''; });
// $('resumeFileInput').addEventListener('change', async e => { const file = e.target.files[0]; if (!file) return; if (file.type !== 'application/pdf') { alert('Please choose a PDF file.'); return; } if (file.size > 8 * 1024 * 1024) { alert('PDF must be 8 MB or smaller.'); return; } const form = new FormData(); form.append('file', file); try { const result = await api('/upload/resume', { method: 'POST', body: form }); profile = { ...profile, pdfUrl: result.url, pdfName: result.originalName }; renderResume(profile); alert('PDF resume published for all visitors.'); } catch (err) { alert(`PDF upload failed: ${err.message}`); } e.target.value = ''; });
// $('yearNow').textContent = new Date().getFullYear();
// (async () => { renderProjects(); setAdminMode(false); await loadPublishedProfile(); if (authToken) { try { await api('/auth/me'); setAdminMode(true); } catch { authToken = ''; sessionStorage.removeItem('portfolioAdminToken'); } } })();




// Backend API base URL

// Script ke last me is tarah safely run karein:
// Backend API base URL
const API_BASE = 'http://localhost:5000/api';

const DEFAULT_PROFILE = {
  name: 'Lavit Tyagi (लवित त्यागी)',
  title: 'Data Analytics & Full-Stack Developer',
  contact: 'Add your public contact details',
  summary: 'Computer Science Engineering student interested in data analytics, Python, SQL, and full-stack application development.',
  textAlign: 'justify',
  nameAlign: 'left',
  titleAlign: 'left',
  contactAlign: 'left',
  summaryHeadingAlign: 'left',
  skillsAlign: 'left',
  skillsHeadingAlign: 'left',
  template: 'classic',
  fontFamily: 'sans',
  fontSize: 'medium',
  accentColor: '#0284c7',
  aboutBio: 'I am a Computer Science Engineering student at ITM University Gwalior. I work on web applications, data analytics, and machine-learning projects.',
  aboutSkills: ['Python', 'SQL', 'Excel', 'Power BI / Tableau', 'React', 'Node.js', 'MongoDB', 'Pandas'],
  aboutStats: [
    { title: '2026', label: 'Graduation Year' },
    { title: 'Python', label: 'Analytics' },
    { title: 'SQL', label: 'Databases' },
    { title: 'MERN', label: 'Web Development' }
  ],
  projects: [
    { title: 'Travel and Tourism Web Application', category: 'web', desc: 'MERN-stack platform concept for travel services, bookings, and user accounts.', tags: ['React', 'Node.js', 'MongoDB'], link: 'https://github.com' },
    { title: 'Soil Health Analysis', category: 'ds', desc: 'Machine-learning project exploring crop prediction from soil and environmental features.', tags: ['Python', 'Pandas', 'Scikit-learn'], link: 'https://github.com' },
    { title: 'Sales Analytics Dashboard', category: 'da', desc: 'Dashboard concept for tracking sales performance and business KPIs.', tags: ['Excel', 'SQL', 'Power BI'], link: '' },
    { title: 'Course Management System', category: 'web', desc: 'Web application concept for course listings, enrollment, and progress tracking.', tags: ['React', 'Express', 'MongoDB'], link: '' }
  ],
  certificates: [
    { title: 'Certifications & Training', desc: 'Certificate details can be added after verification.', link: '' },
    { title: 'Academic Learning', desc: 'Computer Science Engineering — ITM University Gwalior.', link: '' }
  ],
  skills: [
    { name: 'Python', level: 80 },
    { name: 'SQL', level: 80 },
    { name: 'Excel', level: 80 },
    { name: 'MERN Stack', level: 70 }
  ],
  sections: [
    { heading: 'EDUCATION', body: 'B.Tech Computer Science Engineering — ITM University Gwalior', headingAlign: 'left', bodyAlign: 'left' },
    { heading: 'PROJECTS', body: 'Travel and Tourism Web Application — MERN stack project', headingAlign: 'left', bodyAlign: 'left' }
  ],
  photoUrl: '',
  pdfUrl: '',
  pdfName: ''
};

let profile = structuredClone(DEFAULT_PROFILE);
let authToken = sessionStorage.getItem('portfolioAdminToken') || '';
let isAdminLoggedIn = false;
let currentProjectFilter = 'all';

const $ = (id) => document.getElementById(id);

// --- API HELPER ---
async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (authToken) headers.Authorization = 'Bearer ' + authToken;
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(API_BASE + path, { ...options, headers, cache: options.cache || 'no-store' });
  const data = await response.json().catch(() => ({ message: 'Unexpected server response' }));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

function hasAboutProfile(data) {
  return data &&
    typeof data.aboutBio === 'string' &&
    Array.isArray(data.aboutSkills) &&
    data.aboutSkills.every(skill => typeof skill === 'string') &&
    Array.isArray(data.aboutStats) &&
    data.aboutStats.every(stat =>
      stat && typeof stat.title === 'string' && typeof stat.label === 'string'
    );
}

function aboutProfileMatches(saved, expected) {
  return hasAboutProfile(saved) &&
    saved.aboutBio === expected.aboutBio &&
    saved.aboutSkills.length === expected.aboutSkills.length &&
    saved.aboutSkills.every((skill, index) => skill === expected.aboutSkills[index]) &&
    saved.aboutStats.length === expected.aboutStats.length &&
    saved.aboutStats.every((stat, index) =>
      stat.title === expected.aboutStats[index].title &&
      stat.label === expected.aboutStats[index].label
    );
}

// --- SYNC WITH MONGO DB ---
async function saveProfileToDb(alertMsg = 'Changes saved successfully!') {
  try {
    const aboutData = {
      aboutBio: profile.aboutBio,
      aboutSkills: [...(profile.aboutSkills || [])],
      aboutStats: (profile.aboutStats || []).map(({ title, label }) => ({ title, label }))
    };
    const result = await api('/profile', {
      method: 'PUT',
      body: JSON.stringify(profile)
    });
    if (!aboutProfileMatches(result.profile, aboutData)) {
      throw new Error('The backend did not return the saved About paragraph, skills, and stats. Restart the backend from the current backend/server.js and try again.');
    }
    profile = { ...DEFAULT_PROFILE, ...result.profile };
    renderAll();
    if (alertMsg) alert(alertMsg);
  } catch (err) {
    console.error('Could not save About data to MongoDB:', err);
    alert('Could not save changes to MongoDB: ' + err.message);
  }
}

// --- RENDER ABOUT ---
function renderAbout() {
  if ($('aboutBio')) $('aboutBio').textContent = profile.aboutBio || '';
  if ($('aboutTextInput')) $('aboutTextInput').value = profile.aboutBio || '';

  const chipsContainer = $('aboutSkillsContainer');
  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    (profile.aboutSkills || []).forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      chipsContainer.appendChild(span);
    });
  }

  const statsContainer = $('aboutStatsContainer');
  if (statsContainer) {
    statsContainer.innerHTML = '';
    (profile.aboutStats || []).forEach(stat => {
      const box = document.createElement('div');
      box.className = 'stat-box';
      const title = document.createElement('h3');
      title.textContent = stat.title || '';
      const label = document.createElement('p');
      label.textContent = stat.label || '';
      box.append(title, label);
      statsContainer.appendChild(box);
    });
  }

  const skillsEditor = $('aboutSkillsEditor');
  if (skillsEditor) {
    skillsEditor.innerHTML = '';
    (profile.aboutSkills || []).forEach((skill, idx) => {
      const tag = document.createElement('div');
      tag.className = 'chip-tag';
      const name = document.createElement('span');
      name.textContent = skill;
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.title = 'Delete';
      deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      deleteButton.onclick = () => {
        profile.aboutSkills.splice(idx, 1);
        renderAbout();
      };
      tag.append(name, deleteButton);
      skillsEditor.appendChild(tag);
    });
  }

  const statsEditor = $('aboutStatsEditor');
  if (statsEditor) {
    statsEditor.innerHTML = '';
    (profile.aboutStats || []).forEach((st, idx) => {
      const row = document.createElement('div');
      row.className = 'item-row';
      const content = document.createElement('span');
      const title = document.createElement('strong');
      title.textContent = st.title || '';
      content.append(title, document.createTextNode(' - ' + (st.label || '')));
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.title = 'Delete';
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.onclick = () => {
        profile.aboutStats.splice(idx, 1);
        renderAbout();
      };
      row.append(content, deleteButton);
      statsEditor.appendChild(row);
    });
  }
}

// --- RENDER PROJECTS ---
function renderProjects(filter = currentProjectFilter) {
  currentProjectFilter = filter;
  const grid = $('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const projs = profile.projects || [];
  projs.filter(p => filter === 'all' || p.category === filter).forEach((p, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const head = document.createElement('div');
    head.className = 'project-header';
    const catMap = { ds: 'DATA SCIENCE & ML', da: 'DATA ANALYTICS', web: 'FULL-STACK WEB' };
    const categoryName = catMap[p.category] || 'PROJECT';

    head.innerHTML = '<span>' + categoryName + '</span>';

    if (isAdminLoggedIn) {
      const delBtn = document.createElement('button');
      delBtn.className = 'card-delete-btn';
      delBtn.title = 'Delete project';
      delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      delBtn.onclick = async () => {
        if (confirm('Delete project "' + p.title + '"?')) {
          profile.projects.splice(index, 1);
          await saveProfileToDb('Project removed!');
        }
      };
      head.appendChild(delBtn);
    }

    const body = document.createElement('div');
    body.className = 'project-body';

    const title = document.createElement('h3');
    title.textContent = p.title;

    const desc = document.createElement('p');
    desc.textContent = p.desc;

    const chips = document.createElement('div');
    chips.className = 'skills-chips';
    (p.tags || []).forEach(t => {
      const s = document.createElement('span');
      s.textContent = t;
      chips.appendChild(s);
    });

    body.append(title, desc, chips);

    if (p.link) {
      const linkA = document.createElement('a');
      linkA.className = 'project-link-btn';
      linkA.href = p.link;
      linkA.target = '_blank';
      linkA.rel = 'noopener noreferrer';
      linkA.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> View Project';
      body.appendChild(linkA);
    }

    card.append(head, body);
    grid.appendChild(card);
  });
}

// --- RENDER CERTIFICATES ---
function renderCertificates() {
  const container = $('certificatesGrid');
  if (!container) return;
  container.innerHTML = '';

  (profile.certificates || []).forEach((c, idx) => {
    const card = document.createElement('div');
    card.className = 'cert-card';

    if (isAdminLoggedIn) {
      const delBtn = document.createElement('button');
      delBtn.className = 'cert-card-delete';
      delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      delBtn.title = 'Delete Certificate';
      delBtn.onclick = async () => {
        if (confirm('Delete certificate "' + c.title + '"?')) {
          profile.certificates.splice(idx, 1);
          await saveProfileToDb('Certificate deleted!');
        }
      };
      card.appendChild(delBtn);
    }

    const icon = document.createElement('div');
    icon.className = 'cert-icon';
    icon.innerHTML = '<i class="fa-solid fa-award"></i>';

    const h3 = document.createElement('h3');
    h3.textContent = c.title;

    const p = document.createElement('p');
    p.textContent = c.desc;

    card.append(icon, h3, p);

    if (c.link) {
      const link = document.createElement('a');
      link.className = 'cert-link';
      link.href = c.link;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Verify Credential →';
      card.appendChild(link);
    }

    container.appendChild(card);
  });
}

// --- RENDER RESUME ---
function getResumePdfUrl(disposition) {
  return API_BASE + '/resume/pdf?disposition=' + disposition;
}

function loadPdfPreview(pdfUrl) {
  const iframe = $('pdfViewerIframe');
  if (!iframe) return;
  if (!pdfUrl) {
    iframe.removeAttribute('src');
    if ($('pdfViewerFallbackLink')) $('pdfViewerFallbackLink').removeAttribute('href');
    return;
  }
  const inlinePdfUrl = getResumePdfUrl('inline') + '#toolbar=0&navpanes=0';
  if (iframe.getAttribute('src') !== inlinePdfUrl) iframe.src = inlinePdfUrl;
  if ($('pdfViewerFallbackLink')) {
    $('pdfViewerFallbackLink').href = getResumePdfUrl('inline');
    $('pdfViewerFallbackLink').target = '_blank';
    $('pdfViewerFallbackLink').rel = 'noopener';
  }
}

function renderResume(data = profile) {
  const alignments = ['left', 'center', 'right', 'justify'];
  const applyAlignment = (element, value) => {
    if (!element) return;
    const align = alignments.includes(value) ? value : 'left';
    element.className = 'align-' + align;
  };

  if ($('outName')) $('outName').textContent = data.name || '';
  if ($('outTitle')) $('outTitle').textContent = data.title || '';
  if ($('outContact')) $('outContact').textContent = data.contact || '';
  applyAlignment($('outName'), data.nameAlign);
  applyAlignment($('outTitle'), data.titleAlign);
  applyAlignment($('outContact'), data.contactAlign);
  applyAlignment($('outSummaryHeading'), data.summaryHeadingAlign);
  if ($('outSummary')) {
    $('outSummary').textContent = data.summary || '';
    applyAlignment($('outSummary'), data.textAlign);
  }

  const sc = $('outSkillsContainer');
  if (sc) {
    sc.replaceChildren();
    sc.className = 'skills-list align-' + (alignments.includes(data.skillsAlign) ? data.skillsAlign : 'left');
    (data.skills || []).forEach(skill => {
      const line = document.createElement('div');
      line.className = 'skill-line';
      const name = document.createElement('span');
      name.textContent = skill.name;
      const level = document.createElement('strong');
      level.textContent = Math.max(0, Math.min(100, Number(skill.level) || 0)) + '%';
      line.append(name, level);
      sc.appendChild(line);
    });
  }
  applyAlignment($('outSkillsHeading'), data.skillsHeadingAlign);

  const dsc = $('outDynamicSectionsContainer');
  if (dsc) {
    dsc.replaceChildren();
    (data.sections || []).forEach(section => {
      const wrap = document.createElement('div');
      wrap.className = 'res-body-section';
      const h = document.createElement('h5');
      h.textContent = section.heading || '';
      const p = document.createElement('p');
      p.textContent = section.body || '';
      applyAlignment(h, section.headingAlign || 'left');
      applyAlignment(p, section.bodyAlign || 'left');
      wrap.append(h, p);
      dsc.appendChild(wrap);
    });
  }

  const resumeCard = $('liveResumeCard');
  if (resumeCard) {
    const templates = ['classic', 'modern', 'minimal'];
    const fonts = { sans: 'Arial, sans-serif', serif: 'Georgia, serif', mono: '"Courier New", monospace' };
    const sizes = { small: '13px', medium: '15px', large: '17px' };
    const template = templates.includes(data.template) ? data.template : 'classic';
    const fontFamily = fonts[data.fontFamily] || fonts.sans;
    const fontSize = sizes[data.fontSize] || sizes.medium;
    const accentColor = /^#[0-9a-f]{6}$/i.test(data.accentColor || '') ? data.accentColor : '#0284c7';
    resumeCard.dataset.template = template;
    resumeCard.style.setProperty('--resume-font', fontFamily);
    resumeCard.style.setProperty('--resume-font-size', fontSize);
    resumeCard.style.setProperty('--resume-accent', accentColor);
  }

  if (data.photoUrl && $('heroProfileImg')) $('heroProfileImg').src = data.photoUrl;

  const hasValidPdf = Boolean(data.pdfUrl && typeof data.pdfUrl === 'string' && data.pdfUrl.trim() !== '');

  if (hasValidPdf) {
    if ($('pdfPublicMessage')) $('pdfPublicMessage').classList.add('hidden');
    if ($('uploadedPreviewContainer')) $('uploadedPreviewContainer').classList.remove('hidden');
    if ($('uploadedFileName')) $('uploadedFileName').textContent = data.pdfName || 'Published resume.pdf';
    const viewButton = $('viewUploadedBtn');
    if (viewButton) viewButton.href = getResumePdfUrl('inline');
    const downloadButton = $('downloadUploadedBtn');
    if (downloadButton) {
      downloadButton.href = getResumePdfUrl('attachment');
      downloadButton.download = data.pdfName || 'Published resume.pdf';
    }
    loadPdfPreview(data.pdfUrl);
  } else {
    if ($('uploadedPreviewContainer')) $('uploadedPreviewContainer').classList.add('hidden');
    if ($('pdfPublicMessage')) $('pdfPublicMessage').classList.remove('hidden');
    if ($('pdfViewerIframe')) $('pdfViewerIframe').removeAttribute('src');
    if ($('pdfViewerFallbackLink')) $('pdfViewerFallbackLink').removeAttribute('href');
    if ($('viewUploadedBtn')) $('viewUploadedBtn').removeAttribute('href');
    if ($('downloadUploadedBtn')) {
      $('downloadUploadedBtn').removeAttribute('href');
      $('downloadUploadedBtn').removeAttribute('download');
    }
  }
}

// --- FILL FORM CONTROLS ---
function fillEditor(data = profile) {
  if ($('bName')) $('bName').value = data.name || '';
  if ($('bTitle')) $('bTitle').value = data.title || '';
  if ($('bContact')) $('bContact').value = data.contact || '';
  if ($('bSummary')) $('bSummary').value = data.summary || '';
  if ($('bTextAlign')) $('bTextAlign').value = data.textAlign || 'left';
  if ($('bNameAlign')) $('bNameAlign').value = data.nameAlign || 'left';
  if ($('bTitleAlign')) $('bTitleAlign').value = data.titleAlign || 'left';
  if ($('bContactAlign')) $('bContactAlign').value = data.contactAlign || 'left';
  if ($('bSummaryHeadingAlign')) $('bSummaryHeadingAlign').value = data.summaryHeadingAlign || 'left';
  if ($('bSkillsAlign')) $('bSkillsAlign').value = data.skillsAlign || 'left';
  if ($('bSkillsHeadingAlign')) $('bSkillsHeadingAlign').value = data.skillsHeadingAlign || 'left';
  if ($('bTemplate')) $('bTemplate').value = data.template || 'classic';
  if ($('bFontFamily')) $('bFontFamily').value = data.fontFamily || 'sans';
  if ($('bFontSize')) $('bFontSize').value = data.fontSize || 'medium';
  if ($('bAccentColor')) $('bAccentColor').value = /^#[0-9a-f]{6}$/i.test(data.accentColor || '') ? data.accentColor : '#0284c7';
  if ($('bSkills')) $('bSkills').value = (data.skills || []).map(s => s.name + ' | ' + s.level).join('\n');
  renderBuilderSectionInputs();
}

function createSectionAlignmentControl(labelText, className, value) {
  const group = document.createElement('div');
  group.className = 'form-group section-align-control';
  const label = document.createElement('label');
  label.textContent = labelText;
  const select = document.createElement('select');
  select.className = className;
  [['left', 'Left'], ['center', 'Center'], ['right', 'Right'], ['justify', 'Justify']].forEach(([optionValue, optionText]) => {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionText;
    select.appendChild(option);
  });
  select.value = ['left', 'center', 'right', 'justify'].includes(value) ? value : 'left';
  group.append(label, select);
  return group;
}

function renderBuilderSectionInputs() {
  const container = $('builderSectionsList');
  if (!container) return;
  container.innerHTML = '';

  (profile.sections || []).forEach((sec, idx) => {
    const block = document.createElement('div');
    block.className = 'section-edit-block';
    const actions = document.createElement('div');
    actions.className = 'section-edit-actions';
    const moveUpButton = document.createElement('button');
    moveUpButton.type = 'button';
    moveUpButton.className = 'section-order-btn';
    moveUpButton.title = 'Move section up';
    moveUpButton.setAttribute('aria-label', 'Move section up');
    moveUpButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    moveUpButton.disabled = idx === 0;
    const moveDownButton = document.createElement('button');
    moveDownButton.type = 'button';
    moveDownButton.className = 'section-order-btn';
    moveDownButton.title = 'Move section down';
    moveDownButton.setAttribute('aria-label', 'Move section down');
    moveDownButton.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
    moveDownButton.disabled = idx === profile.sections.length - 1;
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-section-btn';
    removeButton.title = 'Remove section';
    removeButton.setAttribute('aria-label', 'Remove section');
    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    actions.append(moveUpButton, moveDownButton, removeButton);

    const headingGroup = document.createElement('div');
    headingGroup.className = 'form-group';
    const headingLabel = document.createElement('label');
    headingLabel.textContent = 'Heading';
    const headingInput = document.createElement('input');
    headingInput.type = 'text';
    headingInput.className = 'sec-heading-input';
    headingInput.value = sec.heading || '';
    headingInput.placeholder = 'e.g. EXPERIENCE';
    headingGroup.append(headingLabel, headingInput);

    const bodyGroup = document.createElement('div');
    bodyGroup.className = 'form-group';
    const bodyLabel = document.createElement('label');
    bodyLabel.textContent = 'Paragraph / Content';
    const bodyInput = document.createElement('textarea');
    bodyInput.className = 'sec-body-input';
    bodyInput.rows = 3;
    bodyInput.value = sec.body || '';
    bodyInput.placeholder = 'Paragraph details...';
    bodyGroup.append(bodyLabel, bodyInput);
    block.append(
      actions,
      headingGroup,
      createSectionAlignmentControl('Heading alignment', 'sec-heading-align-input', sec.headingAlign),
      bodyGroup,
      createSectionAlignmentControl('Content alignment', 'sec-body-align-input', sec.bodyAlign)
    );

    const updateSectionOrder = (offset) => {
      profile.sections = readBuilderSections();
      const targetIndex = idx + offset;
      if (targetIndex < 0 || targetIndex >= profile.sections.length) return;
      [profile.sections[idx], profile.sections[targetIndex]] = [profile.sections[targetIndex], profile.sections[idx]];
      renderBuilderSectionInputs();
      renderResume(readEditor());
    };
    moveUpButton.onclick = () => updateSectionOrder(-1);
    moveDownButton.onclick = () => updateSectionOrder(1);
    removeButton.onclick = () => {
      profile.sections = readBuilderSections();
      profile.sections.splice(idx, 1);
      renderBuilderSectionInputs();
      renderResume(readEditor());
    };
    block.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('input', () => renderResume(readEditor()));
      input.addEventListener('change', () => renderResume(readEditor()));
    });
    container.appendChild(block);
  });
}

function readBuilderSections() {
  const secBlocks = document.querySelectorAll('#builderSectionsList .section-edit-block');
  return Array.from(secBlocks, sb => {
    const heading = sb.querySelector('.sec-heading-input').value.trim();
    const body = sb.querySelector('.sec-body-input').value.trim();
    const headingAlign = sb.querySelector('.sec-heading-align-input').value;
    const bodyAlign = sb.querySelector('.sec-body-align-input').value;
    return { heading, body, headingAlign, bodyAlign };
  });
}

function readEditor() {
  const skillsText = $('bSkills') ? $('bSkills').value : '';
  const skills = skillsText.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
    const parts = line.split('|');
    const name = parts[0] ? parts[0].trim() : '';
    const rawLevel = parts[1] ? parts[1].trim() : '70';
    return { name, level: Math.max(0, Math.min(100, Number(rawLevel) || 0)) };
  }).filter(s => s.name);
  const sections = readBuilderSections().filter(section => section.heading || section.body);

  return {
    ...profile,
    name: $('bName') ? $('bName').value.trim() : profile.name,
    title: $('bTitle') ? $('bTitle').value.trim() : profile.title,
    contact: $('bContact') ? $('bContact').value.trim() : profile.contact,
    summary: $('bSummary') ? $('bSummary').value.trim() : profile.summary,
    textAlign: $('bTextAlign') ? $('bTextAlign').value : 'left',
    nameAlign: $('bNameAlign') ? $('bNameAlign').value : 'left',
    titleAlign: $('bTitleAlign') ? $('bTitleAlign').value : 'left',
    contactAlign: $('bContactAlign') ? $('bContactAlign').value : 'left',
    summaryHeadingAlign: $('bSummaryHeadingAlign') ? $('bSummaryHeadingAlign').value : 'left',
    skillsAlign: $('bSkillsAlign') ? $('bSkillsAlign').value : 'left',
    skillsHeadingAlign: $('bSkillsHeadingAlign') ? $('bSkillsHeadingAlign').value : 'left',
    template: $('bTemplate') ? $('bTemplate').value : 'classic',
    fontFamily: $('bFontFamily') ? $('bFontFamily').value : 'sans',
    fontSize: $('bFontSize') ? $('bFontSize').value : 'medium',
    accentColor: $('bAccentColor') ? $('bAccentColor').value : '#0284c7',
    skills,
    sections
  };
}

function renderAll() {
  renderAbout();
  renderProjects();
  renderCertificates();
  renderResume(profile);
  fillEditor(profile);
}

// --- ADMIN MODE ---
function setAdminMode(isAdmin) {
  isAdminLoggedIn = isAdmin;
  document.querySelectorAll('.admin-only').forEach(el => el.classList.toggle('hidden', !isAdmin));
  if ($('adminLoginBtn')) $('adminLoginBtn').classList.toggle('hidden', isAdmin);
  if ($('adminLogoutBtn')) $('adminLogoutBtn').classList.toggle('hidden', !isAdmin);
  if ($('adminStatusIndicator')) {
    $('adminStatusIndicator').innerHTML = isAdmin
      ? '<i class="fa-solid fa-lock-open"></i> Admin mode — full page control active.'
      : '<i class="fa-solid fa-lock"></i> Public viewing mode';
  }
  if ($('builderFormCard')) $('builderFormCard').classList.toggle('hidden', !isAdmin);
  renderProjects();
  renderCertificates();
}

async function loadPublishedProfile() {
  try {
    const result = await api('/profile');
    if (!result.profile) throw new Error('The API returned no profile data.');
    if (!hasAboutProfile(result.profile)) {
      throw new Error('The API response is missing About fields. Restart the backend from the current backend/server.js.');
    }
    profile = { ...DEFAULT_PROFILE, ...result.profile };
  } catch (error) {
    console.error('Could not load the published profile from MongoDB:', error);
    profile = {
      ...DEFAULT_PROFILE,
      aboutBio: '',
      aboutSkills: [],
      aboutStats: []
    };
    alert('Could not load the latest portfolio data from MongoDB: ' + error.message);
  }
  renderAll();
}

// --- EVENT REGISTRATION ---
function setupEventListeners() {
  // Modal open & close
  if ($('adminLoginBtn')) {
    $('adminLoginBtn').addEventListener('click', () => {
      $('adminModal').classList.remove('hidden');
    });
  }
  if ($('closeAdminModal')) {
    $('closeAdminModal').addEventListener('click', () => {
      $('adminModal').classList.add('hidden');
    });
  }
  if ($('adminModal')) {
    $('adminModal').addEventListener('click', (e) => {
      if (e.target === $('adminModal')) $('adminModal').classList.add('hidden');
    });
  }

  // Admin Login submit
  if ($('adminLoginForm')) {
    $('adminLoginForm').addEventListener('submit', async (e) => {
      e.preventDefault(); $('loginMessage').textContent = 'Signing in…';
      try {
        const data = await api('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: $('adminEmail').value.trim(), password: $('adminPassword').value })
        });
        authToken = data.token;
        sessionStorage.setItem('portfolioAdminToken', authToken);
        setAdminMode(true);
        $('adminModal').classList.add('hidden'); $('loginMessage').textContent = '';
      } catch (err) {
        $('loginMessage').textContent = err.message;
      }
    });
  }

  // Admin Logout
  if ($('adminLogoutBtn')) {
    $('adminLogoutBtn').addEventListener('click', () => {
      authToken = '';
      sessionStorage.removeItem('portfolioAdminToken');
      setAdminMode(false);
    });
  }

  // About Me
  if ($('addAboutSkillBtn')) {
    $('addAboutSkillBtn').addEventListener('click', () => {
      const val = $('newAboutSkillInput').value.trim();
      if (!val) return;
      if (!profile.aboutSkills) profile.aboutSkills = [];
      profile.aboutSkills.push(val);
      $('newAboutSkillInput').value = '';
      renderAbout();
    });
  }

  if ($('addStatBtn')) {
    $('addStatBtn').addEventListener('click', () => {
      const title = $('newStatTitle').value.trim();
      const label = $('newStatLabel').value.trim();
      if (!title || !label) { alert('Enter both stat value and label'); return; }
      if (!profile.aboutStats) profile.aboutStats = [];
      profile.aboutStats.push({ title, label });
      $('newStatTitle').value = ''; $('newStatLabel').value = '';
      renderAbout();
    });
  }

  if ($('saveAboutBtn')) {
    $('saveAboutBtn').addEventListener('click', async () => {
      profile.aboutBio = $('aboutTextInput').value.trim();
      await saveProfileToDb('About section & details saved to MongoDB!');
    });
  }

  // Projects Add
  if ($('addProjectForm')) {
    $('addProjectForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = $('projTitle').value.trim();
      const category = $('projCategory').value;
      const desc = $('projDesc').value.trim();
      const tags = $('projTags').value.split(',').map(t => t.trim()).filter(Boolean);
      const link = $('projLink').value.trim();

      if (!profile.projects) profile.projects = [];
      profile.projects.unshift({ title, category, desc, tags, link });
      await saveProfileToDb('New project added and published!');
      $('addProjectForm').reset();
    });
  }

  // Certificate Add
  if ($('addCertForm')) {
    $('addCertForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = $('certTitle').value.trim();
      const desc = $('certDesc').value.trim();
      const link = $('certLink').value.trim();

      if (!profile.certificates) profile.certificates = [];
      profile.certificates.push({ title, desc, link });
      await saveProfileToDb('Certificate added and published!');
      $('addCertForm').reset();
    });
  }

  // Dynamic Resume Blocks
  if ($('addSectionBlockBtn')) {
    $('addSectionBlockBtn').addEventListener('click', () => {
      profile.sections = readBuilderSections();
      profile.sections.push({ heading: 'NEW SECTION', body: 'Add paragraph here...', headingAlign: 'left', bodyAlign: 'left' });
      renderBuilderSectionInputs();
      renderResume(readEditor());
    });
  }

  [
    'bName', 'bNameAlign', 'bTitle', 'bTitleAlign', 'bContact', 'bContactAlign',
    'bSummary', 'bTextAlign', 'bSummaryHeadingAlign', 'bSkills', 'bSkillsAlign',
    'bSkillsHeadingAlign', 'bTemplate', 'bFontFamily', 'bFontSize', 'bAccentColor'
  ].forEach(id => {
    if ($(id)) {
      $(id).addEventListener('input', () => renderResume(readEditor()));
      $(id).addEventListener('change', () => renderResume(readEditor()));
    }
  });

  if ($('resetResumeDesignBtn')) {
    $('resetResumeDesignBtn').addEventListener('click', () => {
      $('bTemplate').value = DEFAULT_PROFILE.template;
      $('bFontFamily').value = DEFAULT_PROFILE.fontFamily;
      $('bFontSize').value = DEFAULT_PROFILE.fontSize;
      $('bAccentColor').value = DEFAULT_PROFILE.accentColor;
      renderResume(readEditor());
    });
  }

  if ($('printResumeBtn')) {
    $('printResumeBtn').addEventListener('click', () => window.print());
  }

  if ($('saveResumeBtn')) {
    $('saveResumeBtn').addEventListener('click', async () => {
      profile = readEditor();
      await saveProfileToDb('Resume saved and published to MongoDB!');
    });
  }

  // Navigation & Theme
  if ($('themeToggle')) {
    $('themeToggle').addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      document.body.classList.toggle('light-theme');
      $('themeToggle').innerHTML = document.body.classList.contains('dark-theme')
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
  }

  if ($('hamburger')) {
    $('hamburger').addEventListener('click', () => $('navLinks').classList.toggle('open'));
  }

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => $('navLinks').classList.remove('open'));
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b === btn));
      $('modeBuilder').classList.toggle('hidden', btn.dataset.mode !== 'builder'); $('modeUpload').classList.toggle('hidden', btn.dataset.mode !== 'upload');
      if (btn.dataset.mode === 'upload') loadPdfPreview(profile.pdfUrl);
    });
  });

  // Photo & PDF Upload
  if ($('heroImageInput')) {
    $('heroImageInput').addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { alert('Choose a JPG, PNG, or WebP image.'); return; }
      if (file.size > 5 * 1024 * 1024) { alert('Image must be 5 MB or smaller.'); return; }

      const form = new FormData();
      form.append('file', file);
      try {
        const result = await api('/upload/photo', { method: 'POST', body: form });
        profile.photoUrl = result.url;
        $('heroProfileImg').src = result.url;
        alert('Profile photo published.');
      } catch (err) {
        alert('Photo upload failed: ' + err.message);
      }
      e.target.value = '';
    });
  }

  if ($('resumeFileInput')) {
    $('resumeFileInput').addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) { alert('Please choose a PDF file.'); return; }
      if (file.size > 8 * 1024 * 1024) { alert('PDF must be 8 MB or smaller.'); return; }

      const form = new FormData();
      form.append('file', file);
      try {
        const result = await api('/upload/resume', { method: 'POST', body: form });
        profile.pdfUrl = result.url;
        profile.pdfName = result.originalName;
        renderResume(profile);
        if ($('modeUpload') && !$('modeUpload').classList.contains('hidden')) loadPdfPreview(profile.pdfUrl);
        alert('PDF resume published for all visitors.');
      } catch (err) {
        alert('PDF upload failed: ' + err.message);
      }
      e.target.value = '';
    });
  }

  if ($('yearNow')) $('yearNow').textContent = new Date().getFullYear();
}

// --- INITIAL LOAD ---
window.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  setAdminMode(false);
  await loadPublishedProfile();

  if (authToken) {
    try {
      await api('/auth/me');
      setAdminMode(true);
    } catch {
      authToken = '';
      sessionStorage.removeItem('portfolioAdminToken');
    }
  }
});
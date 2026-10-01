document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        icon.className = body.classList.contains('light-theme') ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    });

    // 2. Profile Image Uploader in Hero Section
    const heroImageInput = document.getElementById('heroImageInput');
    const heroProfileImg = document.getElementById('heroProfileImg');

    heroImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            heroProfileImg.src = imageURL;
        }
    });

    // 3. Projects Data & Filtering
    const projectsData = [
        { title: "Travel and Tourism App", category: "ds", desc: "Full-stack MERN platform incorporating Mappls location services and JWT authentication.", tags: ["React", "Node.js", "MongoDB", "Mappls"] },
        { title: "Course Management System", category: "web", desc: "Engineered a CMS using MERN stack with course creation, enrollment, and progress tracking.", tags: ["React", "Express", "Node.js"] },
        { title: "Soil Health Analysis ML", category: "ds", desc: "Crop prediction system using Random Forest Classifier in Python and Flask.", tags: ["Python", "Flask", "Scikit-Learn"] },
        { title: "Global Sales Dashboard", category: "da", desc: "Interactive Tableau & Python BI dashboard tracking multinational quarterly performance.", tags: ["Tableau", "SQL", "Pandas"] },
        { title: "AI Stock Trend Analyzer", category: "ds", desc: "Deep neural network time-series forecasting model for equities and crypto trends.", tags: ["TensorFlow", "Python", "Flask"] },
    ];

    const projectsGrid = document.getElementById('projectsGrid');

    function renderProjects(filter) {
        projectsGrid.innerHTML = '';
        const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-header">
                    <i class="fa-solid fa-chart-pie"></i> <span>${p.category.toUpperCase()}</span>
                </div>
                <div class="project-body">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <div class="skills-chips" style="margin-bottom: 1rem;">
                        ${p.tags.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <a href="#contact" class="btn btn-sm btn-outline"><i class="fa-solid fa-arrow-right"></i> Learn More</a>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }
    renderProjects('all');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.dataset.filter);
        });
    });

    // 4. Resume Mode Toggle
    const modeBtns = document.querySelectorAll('.mode-btn');
    const modeUpload = document.getElementById('modeUpload');
    const modeBuilder = document.getElementById('modeBuilder');

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.mode === 'upload') {
                modeUpload.style.display = 'block';
                modeBuilder.style.display = 'none';
            } else {
                modeUpload.style.display = 'none';
                modeBuilder.style.display = 'block';
            }
        });
    });

    // 5. PDF File Upload & Embedded Iframe Viewer Handling
    const resumeFileInput = document.getElementById('resumeFileInput');
    const dropZone = document.getElementById('dropZone');
    const uploadedPreviewContainer = document.getElementById('uploadedPreviewContainer');
    const uploadedFileName = document.getElementById('uploadedFileName');
    const pdfViewerIframe = document.getElementById('pdfViewerIframe');
    let uploadedFileObj = null;

    resumeFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadedFileObj = file;
            uploadedFileName.innerHTML = `<i class="fa-solid fa-file-pdf text-accent"></i> ${file.name}`;
            pdfViewerIframe.src = URL.createObjectURL(file);
            dropZone.style.display = 'none';
            uploadedPreviewContainer.style.display = 'block';
        }
    });

    document.getElementById('removeUploadedBtn').addEventListener('click', () => {
        resumeFileInput.value = '';
        pdfViewerIframe.src = '';
        uploadedFileObj = null;
        uploadedPreviewContainer.style.display = 'none';
        dropZone.style.display = 'block';
    });

    document.getElementById('downloadUploadedBtn').addEventListener('click', () => {
        if (uploadedFileObj) {
            const url = URL.createObjectURL(uploadedFileObj);
            const a = document.createElement('a');
            a.href = url;
            a.download = uploadedFileObj.name;
            a.click();
        }
    });

    // 6. Admin Lock & Hide Form Feature (Password Protected)
    const adminStatusIndicator = document.getElementById('adminStatusIndicator');
    const lockEditorBtn = document.getElementById('lockEditorBtn');
    const unlockEditorBtn = document.getElementById('unlockEditorBtn');
    const builderFormCard = document.getElementById('builderFormCard');
    const builderLayoutGrid = document.getElementById('builderLayoutGrid');

    const ADMIN_PASSWORD = "admin123";

    function setEditorLocked(locked) {
        if (locked) {
            builderFormCard.style.display = 'none';
            builderLayoutGrid.classList.add('locked-layout');
            adminStatusIndicator.innerHTML = `<i class="fa-solid fa-lock text-success"></i> <span>Resume Locked & Secured (Viewing Mode Only)</span>`;
            lockEditorBtn.style.display = 'none';
            unlockEditorBtn.style.display = 'inline-flex';
        } else {
            builderFormCard.style.display = 'block';
            builderLayoutGrid.classList.remove('locked-layout');
            adminStatusIndicator.innerHTML = `<i class="fa-solid fa-lock-open text-warning"></i> <span>Editor Unlocked (Admin Mode)</span>`;
            lockEditorBtn.style.display = 'inline-flex';
            unlockEditorBtn.style.display = 'none';
        }
    }

    lockEditorBtn.addEventListener('click', () => {
        renderLiveResume();
        setEditorLocked(true);
        alert("Resume successfully locked and secured! The editing box is now hidden from visitors.");
    });

    unlockEditorBtn.addEventListener('click', () => {
        const pwd = prompt("Enter Admin Password to Unlock Editor:");
        if (pwd === ADMIN_PASSWORD) {
            setEditorLocked(false);
            alert("Editor unlocked successfully!");
        } else if (pwd !== null) {
            alert("Incorrect password!");
        }
    });

    // 7. Dynamic Custom Sections & Skill Bars Adder
    const addSkillBtn = document.getElementById('addSkillBtn');
    const skillInputsList = document.getElementById('skillInputsList');
    const addCustomSectionBtn = document.getElementById('addCustomSectionBtn');
    const customSectionsList = document.getElementById('customSectionsList');
    const updateBuilderPreview = document.getElementById('updateBuilderPreview');

    addSkillBtn.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'skill-input-row';
        row.innerHTML = `
            <input type="text" class="sk-name" placeholder="Skill Name">
            <input type="number" class="sk-val" value="85" min="10" max="100">
            <button type="button" class="btn-del-skill" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>
        `;
        skillInputsList.appendChild(row);
    });

    addCustomSectionBtn.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'custom-sec-row';
        row.innerHTML = `
            <input type="text" class="cs-heading" placeholder="Section Heading (e.g. EDUCATION)">
            <textarea class="cs-body" rows="2" placeholder="Section details / paragraphs..."></textarea>
            <select class="cs-align">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify" selected>Justify</option>
            </select>
            <button type="button" class="btn-del-skill mt-1" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i> Remove</button>
        `;
        customSectionsList.appendChild(row);
    });

    function renderLiveResume() {
        document.getElementById('outName').textContent = document.getElementById('bName').value;
        document.getElementById('outTitle').textContent = document.getElementById('bTitle').value;
        document.getElementById('outContact').textContent = document.getElementById('bContact').value;

        const summaryEl = document.getElementById('outSummary');
        summaryEl.textContent = document.getElementById('bSummary').value;
        summaryEl.className = `align-${document.getElementById('bTextAlign').value}`;

        const headerStyle = document.getElementById('bHeaderStyle').value;
        const outNameEl = document.getElementById('outName');
        if (headerStyle === 'uppercase') {
            outNameEl.style.textTransform = 'uppercase';
            outNameEl.style.letterSpacing = '1px';
        } else if (headerStyle === 'italic') {
            outNameEl.style.fontStyle = 'italic';
        } else {
            outNameEl.style.textTransform = 'none';
            outNameEl.style.fontStyle = 'normal';
        }

        // Render Skills Bars
        const outSkillsContainer = document.getElementById('outSkillsContainer');
        outSkillsContainer.innerHTML = '';
        document.querySelectorAll('.skill-input-row').forEach(r => {
            const name = r.querySelector('.sk-name').value;
            const val = r.querySelector('.sk-val').value;
            if (name) {
                const item = document.createElement('div');
                item.className = 'skill-3d-item';
                item.innerHTML = `
                    <div class="skill-info-line">
                        <span>${name}</span>
                        <span>${val}%</span>
                    </div>
                    <div class="skill-bar-track">
                        <div class="skill-bar-fill" style="width: ${val}%"></div>
                    </div>
                `;
                outSkillsContainer.appendChild(item);
            }
        });

        // Render Dynamic Custom Sections
        const outDynamicContainer = document.getElementById('outDynamicSectionsContainer');
        outDynamicContainer.innerHTML = '';
        document.querySelectorAll('.custom-sec-row').forEach(r => {
            const heading = r.querySelector('.cs-heading').value;
            const bodyText = r.querySelector('.cs-body').value;
            const align = r.querySelector('.cs-align').value;

            if (heading || bodyText) {
                const secDiv = document.createElement('div');
                secDiv.className = 'res-body-section';
                secDiv.innerHTML = `
                    <h5>${heading}</h5>
                    <p class="align-${align}">${bodyText}</p>
                `;
                outDynamicContainer.appendChild(secDiv);
            }
        });
    }

    updateBuilderPreview.addEventListener('click', () => {
        renderLiveResume();
        setEditorLocked(true);
        alert("Resume updated and locked successfully!");
    });

    renderLiveResume();

    document.getElementById('printBuilderResume').addEventListener('click', () => window.print());
});
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyRFarrvYeDds21r3tMzVW8VDFQG1RCgGQeevU_nkD04_OsIlq5DsYA6SvREZ7draie/exec";

let translations = {};
let currentLang = 'gl';

async function loadTranslations() {
    try {
        const response = await fetch('json/translations.json');
        translations = await response.json();
        switchLanguage('gl');
    } catch (error) {
        console.error("Error cargando el archivo translations.json:", error);
    }
}

function toggleNavMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('open');
}

function closeNavMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.remove('open');
}

function switchLanguage(lang) {
    currentLang = lang;
    if (!translations[lang]) return;
    const t = translations[lang];

    document.getElementById('btn-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-gl').classList.toggle('active', lang === 'gl');
    document.documentElement.lang = lang;

    document.title = t.title;

    document.getElementById('nav-item-where').innerText = t.navWhere;
    document.getElementById('nav-item-bus').innerText = t.navBus;
    document.getElementById('nav-item-rsvp').innerText = t.navRsvp;

    document.getElementById('i18n-hero-subtitle').innerText = t.heroSubtitle;
    document.getElementById('i18n-hero-date').innerText = t.heroDate;
    document.getElementById('i18n-hero-start').innerText = t.heroStart;
    document.getElementById('i18n-cd-days').innerText = t.cdDays;
    document.getElementById('i18n-cd-hours').innerText = t.cdHours;
    document.getElementById('i18n-cd-min').innerText = t.cdMin;
    document.getElementById('i18n-cd-sec').innerText = t.cdSec;

    document.getElementById('i18n-where-title').innerText = t.whereTitle;
    document.getElementById('i18n-where-desc').innerText = t.whereDesc;
    document.getElementById('i18n-ceremony-tag').innerText = t.ceremonyTag;
    document.getElementById('i18n-ceremony-place').innerText = t.ceremonyPlace;
	document.getElementById('i18n-reception-place').innerText = t.receptionPlace;
    document.getElementById('i18n-reception-tag').innerText = t.receptionTag;
    document.getElementById('i18n-reception-time').innerText = t.receptionTime;
    document.getElementById('i18n-btn-maps-1').innerText = t.btnMaps;
    document.getElementById('i18n-btn-maps-2').innerText = t.btnMaps;

    document.getElementById('i18n-bus-section-title').innerText = t.busSectionTitle;
    document.getElementById('i18n-bus-section-desc').innerText = t.busSectionDesc;
    document.getElementById('i18n-bus-outbound-title').innerText = t.busOutboundTitle;
    document.getElementById('i18n-bus-out1-loc').innerText = t.busOut1Loc;
    document.getElementById('i18n-bus-out1-desc').innerText = t.busOut1Desc;
    document.getElementById('i18n-bus-out2-loc').innerText = t.busOut2Loc;
    document.getElementById('i18n-bus-out2-desc').innerText = t.busOut2Desc;
    document.getElementById('i18n-bus-out3-loc').innerText = t.busOut3Loc;
    document.getElementById('i18n-bus-out3-desc').innerText = t.busOut3Desc;
    document.getElementById('i18n-bus-return-title').innerText = t.busReturnTitle;
    document.getElementById('i18n-bus-ret2-loc').innerText = t.busRet2Loc;
    document.getElementById('i18n-bus-ret2-desc').innerText = t.busRet2Desc;

    document.getElementById('i18n-rsvp-title').innerText = t.rsvpTitle;
    document.getElementById('i18n-rsvp-desc').innerText = t.rsvpDesc;
    updateMainCardTitle();
    document.getElementById('i18n-label-firstname').innerText = t.labelFirstname;
    document.getElementById('nombre').placeholder = t.placeholderFirstname;
    document.getElementById('i18n-label-lastname1').innerText = t.labelLastname1;
    document.getElementById('primerApellido').placeholder = t.placeholderLastname1;
    document.getElementById('i18n-label-lastname2').innerText = t.labelLastname2;
    document.getElementById('segundoApellido').placeholder = t.placeholderLastname2;

    document.getElementById('i18n-label-attending').innerText = t.labelAttending;
    document.getElementById('btn-attending-yes').innerText = t.radioYes;
    document.getElementById('btn-attending-no').innerText = t.radioNo;

    document.getElementById('i18n-label-bus').innerText = t.labelBus;
    document.getElementById('btn-bus-no').innerText = t.busNo;
    document.getElementById('btn-bus-idavolta').innerText = t.busIdaVolta;

    document.getElementById('i18n-label-diet-options').innerText = t.labelDietOptions;
    document.getElementById('i18n-label-diet-detail').innerText = t.labelDietDetail;
    document.getElementById('intoleranciasDetalle').placeholder = t.placeholderDietDetail;
	
	const dietGroupMain = document.getElementById('dietGroup_main');
    if (dietGroupMain) {
        const btnNinguna = dietGroupMain.querySelector('[data-diet="Ninguna"]');
        const btnCeliaco = dietGroupMain.querySelector('[data-diet="Celíaco/a"]');
        const btnVegetariano = dietGroupMain.querySelector('[data-diet="Vexetariano/a"], [data-diet="Vegetariano/a"]');
        const btnVegano = dietGroupMain.querySelector('[data-diet="Vegano/a"]');
        const btnAlergias = dietGroupMain.querySelector('[data-diet="Alergias"]');
        const btnOtra = dietGroupMain.querySelector('[data-diet="Otra"]');

        if (btnNinguna) btnNinguna.innerText = t.dietNinguna;
        if (btnCeliaco) btnCeliaco.innerText = t.dietCeliaco;
        if (btnVegetariano) btnVegetariano.innerText = t.dietVegetariano;
        if (btnVegano) btnVegano.innerText = t.dietVegano;
        if (btnAlergias) btnAlergias.innerText = t.dietAlergia;
        if (btnOtra) btnOtra.innerText = t.dietOtra;
    }

    document.getElementById('i18n-label-song-main').innerText = t.labelSong;
    document.getElementById('cancion_main').placeholder = t.placeholderSong;
    document.getElementById('i18n-label-msg-main').innerText = t.labelMsg;
    document.getElementById('mensaje_main').placeholder = t.placeholderMsg;

    document.getElementById('btnAddCompanion').innerText = t.btnAddCompanion;
    document.getElementById('btnAddChild').innerText = t.btnAddChild;
    document.getElementById('submitBtn').innerText = t.submitBtn;

    renderCompanions();
    renderChildren();
}

const weddingDate = new Date('May 22, 2027 18:00:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
};

setInterval(updateCountdown, 1000);
updateCountdown();

let mainPersonOpen = true;

function updateMainCardTitle() {
    if (!translations[currentLang]) return;
    const t = translations[currentLang];
    const name = document.getElementById('nombre').value.trim();
    const surname = document.getElementById('primerApellido').value.trim();
    const titleEl = document.querySelector('#main_person_card h4');
    if (name || surname) {
        titleEl.innerText = `👤 ${name} ${surname}`.trim();
    } else {
        titleEl.innerText = t.mainPersonTitle;
    }
}

function collapseAll() {
    mainPersonOpen = false;
    document.getElementById('body_main').classList.remove('open');
    document.getElementById('icon_main').classList.remove('rotated');

    companions.forEach(c => {
        c.isOpen = false;
        const body = document.getElementById(`comp_body_${c.id}`);
        const icon = document.getElementById(`comp_icon_${c.id}`);
        if (body) body.classList.remove('open');
        if (icon) icon.classList.remove('rotated');
    });

    childrenList.forEach(ch => {
        ch.isOpen = false;
        const body = document.getElementById(`child_body_${ch.id}`);
        const icon = document.getElementById(`child_icon_${ch.id}`);
        if (body) body.classList.remove('open');
        if (icon) icon.classList.remove('rotated');
    });
}

function toggleAccordion(targetId) {
    if (targetId === 'main') {
        const newState = !mainPersonOpen;
        collapseAll();
        mainPersonOpen = newState;
        if (mainPersonOpen) {
            document.getElementById('body_main').classList.add('open');
            document.getElementById('icon_main').classList.add('rotated');
        }
    } else if (typeof targetId === 'string' && targetId.startsWith('child_')) {
        const rawId = parseInt(targetId.replace('child_', ''));
        const ch = childrenList.find(c => c.id === rawId);
        if (ch) {
            const newState = !ch.isOpen;
            collapseAll();
            ch.isOpen = newState;
            const body = document.getElementById(`child_body_${rawId}`);
            const icon = document.getElementById(`child_icon_${rawId}`);
            if (ch.isOpen) {
                if (body) body.classList.add('open');
                if (icon) icon.classList.add('rotated');
            }
        }
    } else {
        const comp = companions.find(c => c.id === targetId);
        if (comp) {
            const newState = !comp.isOpen;
            collapseAll();
            comp.isOpen = newState;
            const body = document.getElementById(`comp_body_${targetId}`);
            const icon = document.getElementById(`comp_icon_${targetId}`);
            if (comp.isOpen) {
                if (body) body.classList.add('open');
                if (icon) icon.classList.add('rotated');
            }
        }
    }
}

function selectAttendance(value) {
    document.getElementById('asistencia').value = value;
    const btnYes = document.getElementById('btn-attending-yes');
    const btnNo = document.getElementById('btn-attending-no');
    const conditionalFields = document.getElementById('conditionalFields');
    const companionsSection = document.getElementById('companionsSection');
    const globalQuestionsSection = document.getElementById('globalQuestionsSection');

    if (value === 'Sí') {
        btnYes.className = 'btn-toggle active-green';
        btnNo.className = 'btn-toggle';
        conditionalFields.style.display = 'block';
        companionsSection.style.display = 'block';
        globalQuestionsSection.style.display = 'block';
    } else {
        btnYes.className = 'btn-toggle';
        btnNo.className = 'btn-toggle active-red';
        conditionalFields.style.display = 'none';
        companionsSection.style.display = 'none';
        globalQuestionsSection.style.display = 'none';
    }
}

function selectBus(idPrefix, value) {
    if (idPrefix === 'main') {
        document.getElementById('autobus').value = value;
        document.getElementById('btn-bus-no').className = 'btn-toggle';
        document.getElementById('btn-bus-idavolta').className = 'btn-toggle';
        if (value === 'No') document.getElementById('btn-bus-no').className = 'btn-toggle active-red';
        else if (value === 'Ida e volta') document.getElementById('btn-bus-idavolta').className = 'btn-toggle active-green';
    } else {
        const comp = companions.find(c => c.id === idPrefix);
        if (comp) comp.autobus = value;
        const container = document.getElementById(`busGroup_comp_${idPrefix}`);
        container.querySelectorAll('.btn-toggle').forEach(b => b.className = 'btn-toggle');
        
        const activeBtn = container.querySelector(`[data-bus="${value}"]`);
        if (activeBtn) {
            if (value === 'No') activeBtn.className = 'btn-toggle active-red';
            else activeBtn.className = 'btn-toggle active-green';
        }
    }
}

function selectDiet(idPrefix, value) {
    if (idPrefix === 'main') {
        document.getElementById('tipoMenu').value = value;
        const container = document.getElementById('dietGroup_main');
        container.querySelectorAll('.btn-toggle').forEach(b => b.className = 'btn-toggle');
        const activeBtn = container.querySelector(`[data-diet="${value}"]`);
        if (activeBtn) {
            if (value === 'Ninguna') activeBtn.className = 'btn-toggle active-green';
            else activeBtn.className = 'btn-toggle active-primary';
        }

        const detailGroup = document.getElementById('dietaryDetailGroup_main');
        const detailInput = document.getElementById('intoleranciasDetalle');
        if (value === 'Alergias' || value === 'Otra') {
            detailGroup.style.display = 'block';
            detailInput.required = true;
        } else {
            detailGroup.style.display = 'none';
            detailInput.required = false;
            detailInput.value = '';
        }
    } else if (typeof idPrefix === 'string' && idPrefix.startsWith('child_')) {
        const rawId = parseInt(idPrefix.replace('child_', ''));
        const ch = childrenList.find(c => c.id === rawId);
        if (ch) ch.tipoMenu = value;

        const container = document.getElementById(`dietGroup_${idPrefix}`);
        container.querySelectorAll('.btn-toggle').forEach(b => b.className = 'btn-toggle');
        const activeBtn = container.querySelector(`[data-diet="${value}"]`);
        if (activeBtn) {
            if (value === 'Ninguna') activeBtn.className = 'btn-toggle active-green';
            else activeBtn.className = 'btn-toggle active-primary';
        }

        const detailGroup = document.getElementById(`dietaryDetailGroup_${idPrefix}`);
        const detailInput = detailGroup.querySelector('input');
        if (value === 'Alergias' || value === 'Otra') {
            detailGroup.style.display = 'block';
            if (detailInput) detailInput.required = true;
        } else {
            detailGroup.style.display = 'none';
            if (detailInput) {
                detailInput.required = false;
                detailInput.value = '';
            }
        }
    } else {
        const comp = companions.find(c => c.id === idPrefix);
        if (comp) comp.tipoMenu = value;

        const container = document.getElementById(`dietGroup_comp_${idPrefix}`);
        container.querySelectorAll('.btn-toggle').forEach(b => b.className = 'btn-toggle');
        const activeBtn = container.querySelector(`[data-diet="${value}"]`);
        if (activeBtn) {
            if (value === 'Ninguna') activeBtn.className = 'btn-toggle active-green';
            else activeBtn.className = 'btn-toggle active-primary';
        }

        const detailGroup = document.getElementById(`dietaryDetailGroup_comp_${idPrefix}`);
        const detailInput = detailGroup.querySelector('input');
        if (value === 'Alergias' || value === 'Otra') {
            detailGroup.style.display = 'block';
            if (detailInput) detailInput.required = true;
        } else {
            detailGroup.style.display = 'none';
            if (detailInput) {
                detailInput.required = false;
                detailInput.value = '';
            }
        }
    }
}

// GESTIÓN DE ACOMPAÑANTE (Máximo 1)
let companions = [];

function addCompanion() {
    if (companions.length >= 1) return;

    collapseAll();
    const id = Date.now();
    companions.push({
        id: id,
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        autobus: '',
        tipoMenu: '',
        intoleranciasDetalle: '',
        isOpen: true
    });
    renderCompanions();
}

function deleteCompanion(id) {
    companions = companions.filter(c => c.id !== id);
    renderCompanions();
}

function updateCompanionCardTitle(id) {
    if (!translations[currentLang]) return;
    const comp = companions.find(c => c.id === id);
    if (!comp) return;
    const titleEl = document.getElementById(`comp_title_${id}`);
    const t = translations[currentLang];
    
    let nameStr = `${comp.nombre} ${comp.primerApellido}`.trim();
    if (!nameStr) nameStr = t.companionHeaderTitle;
    
    // Limpiar posibles iconos duplicados previos antes de asignar
    nameStr = nameStr.replace(/^[👤\s]+/, '').trim();
    titleEl.innerText = `👤 ${nameStr}`;
}

function renderCompanions() {
    if (!translations[currentLang]) return;
    const container = document.getElementById('companionsContainer');
    container.innerHTML = '';
    const t = translations[currentLang];

    const addBtn = document.getElementById('btnAddCompanion');
    if (companions.length >= 1) {
        addBtn.style.display = 'none';
    } else {
        addBtn.style.display = 'block';
    }

    companions.forEach((comp) => {
        const card = document.createElement('div');
        card.className = 'person-card';
        card.id = `comp_card_${comp.id}`;

        card.innerHTML = `
            <div class="person-card-header" onclick="toggleAccordion(${comp.id})">
                <h4 id="comp_title_${comp.id}"></h4>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <button type="button" class="btn-delete-companion" onclick="event.stopPropagation(); deleteCompanion(${comp.id})">
                        🗑️ ${t.labelDeleteComp}
                    </button>
                    <span class="toggle-icon ${comp.isOpen ? 'rotated' : ''}" id="comp_icon_${comp.id}">▼</span>
                </div>
            </div>

            <div class="person-card-body ${comp.isOpen ? 'open' : ''}" id="comp_body_${comp.id}">
                <div class="form-group">
                    <label>${t.labelFirstname}</label>
                    <input type="text" value="${comp.nombre}" oninput="companions.find(c=>c.id===${comp.id}).nombre=this.value; updateCompanionCardTitle(${comp.id});" placeholder="${t.placeholderFirstname}" required>
                </div>
                <div class="form-group">
                    <label>${t.labelLastname1}</label>
                    <input type="text" value="${comp.primerApellido}" oninput="companions.find(c=>c.id===${comp.id}).primerApellido=this.value; updateCompanionCardTitle(${comp.id});" placeholder="${t.placeholderLastname1}" required>
                </div>
                <div class="form-group">
                    <label>${t.labelLastname2}</label>
                    <input type="text" value="${comp.segundoApellido}" onchange="companions.find(c=>c.id===${comp.id}).segundoApellido=this.value;" placeholder="${t.placeholderLastname2}">
                </div>

                <div class="comp-conditional-fields">
                    <div class="form-group">
                        <label>${t.labelBus}</label>
                        <div class="btn-group-toggle" id="busGroup_comp_${comp.id}">
                            <button type="button" class="btn-toggle ${comp.autobus === 'No' ? 'active-red' : ''}" data-bus="No" onclick="selectBus(${comp.id}, 'No')">${t.busNo}</button>
                            <button type="button" class="btn-toggle ${comp.autobus === 'Ida e volta' ? 'active-green' : ''}" data-bus="Ida e volta" onclick="selectBus(${comp.id}, 'Ida e volta')">${t.busIdaVolta}</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>${t.labelDietOptions}</label>
                        <div class="btn-group-toggle" id="dietGroup_comp_${comp.id}">
                            <button type="button" class="btn-toggle ${comp.tipoMenu === 'Ninguna' ? 'active-green' : ''}" data-diet="Ninguna" onclick="selectDiet(${comp.id}, 'Ninguna')">${t.dietNinguna}</button>
                            <button type="button" class="btn-toggle ${comp.tipoMenu === 'Celíaco/a' ? 'active-primary' : ''}" data-diet="Celíaco/a" onclick="selectDiet(${comp.id}, 'Celíaco/a')">${t.dietCeliaco}</button>
                            <button type="button" class="btn-toggle ${comp.tipoMenu === 'Vexetariano/a' ? 'active-primary' : ''}" data-diet="Vexetariano/a" onclick="selectDiet(${comp.id}, 'Vexetariano/a')">${t.dietVegetariano}</button>
                            <button type="button" class="btn-toggle ${comp.tipoMenu === 'Vegano/a' ? 'active-primary' : ''}" data-diet="Vegano/a" onclick="selectDiet(${comp.id}, 'Vegano/a')">${t.dietVegano}</button>
                            <button type="button" class="btn-toggle ${comp.tipoMenu === 'Alergias' ? 'active-primary' : ''}" data-diet="Alergias" onclick="selectDiet(${comp.id}, 'Alergias')">${t.dietAlergia}</button>
                            <button type="button" class="btn-toggle ${comp.tipoMenu === 'Otra' ? 'active-primary' : ''}" data-diet="Otra" onclick="selectDiet(${comp.id}, 'Otra')">${t.dietOtra}</button>
                        </div>

                        <div id="dietaryDetailGroup_comp_${comp.id}" style="display:${comp.tipoMenu === 'Alergias' || comp.tipoMenu === 'Otra' ? 'block' : 'none'}; margin-top: 12px;">
                            <label style="font-size: 0.85rem;">${t.labelDietDetail}</label>
                            <input type="text" value="${comp.intoleranciasDetalle}" onchange="companions.find(c=>c.id===${comp.id}).intoleranciasDetalle=this.value;" placeholder="${t.placeholderDietDetail}">
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
        updateCompanionCardTitle(comp.id);
    });
}

// GESTIÓN DE NIÑOS (Máximo 2)
let childrenList = [];

function addChild() {
    if (childrenList.length >= 2) return;

    collapseAll();
    const id = Date.now();
    childrenList.push({
        id: id,
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        tipoMenu: '',
        intoleranciasDetalle: '',
        isOpen: true
    });
    renderChildren();
}

function deleteChild(id) {
    childrenList = childrenList.filter(c => c.id !== id);
    renderChildren();
}

function updateChildCardTitle(id) {
    if (!translations[currentLang]) return;
    const ch = childrenList.find(c => c.id === id);
    if (!ch) return;
    const index = childrenList.findIndex(c => c.id === id);
    const titleEl = document.getElementById(`child_title_${id}`);
    const t = translations[currentLang];
    
    let nameStr = `${ch.nombre} ${ch.primerApellido}`.trim();
    if (!nameStr) nameStr = `${t.childHeaderTitle} ${index + 1}`;
    
    // Limpiar posibles iconos duplicados previos antes de asignar
    nameStr = nameStr.replace(/^[👶\s]+/, '').trim();
    titleEl.innerText = `👶 ${nameStr}`;
}

function renderChildren() {
    if (!translations[currentLang]) return;
    const container = document.getElementById('childrenContainer');
    container.innerHTML = '';
    const t = translations[currentLang];

    const addBtn = document.getElementById('btnAddChild');
    if (childrenList.length >= 2) {
        addBtn.style.display = 'none';
    } else {
        addBtn.style.display = 'block';
    }

    childrenList.forEach((ch) => {
        const card = document.createElement('div');
        card.className = 'person-card';
        card.id = `child_card_${ch.id}`;

        card.innerHTML = `
            <div class="person-card-header" onclick="toggleAccordion('child_${ch.id}')">
                <h4 id="child_title_${ch.id}"></h4>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <button type="button" class="btn-delete-companion" onclick="event.stopPropagation(); deleteChild(${ch.id})">
                        🗑️ ${t.labelDeleteComp}
                    </button>
                    <span class="toggle-icon ${ch.isOpen ? 'rotated' : ''}" id="child_icon_${ch.id}">▼</span>
                </div>
            </div>

            <div class="person-card-body ${ch.isOpen ? 'open' : ''}" id="child_body_${ch.id}">
                <div class="form-group">
                    <label>${t.labelFirstname}</label>
                    <input type="text" value="${ch.nombre}" oninput="childrenList.find(c=>c.id===${ch.id}).nombre=this.value; updateChildCardTitle(${ch.id});" placeholder="${t.placeholderFirstname}" required>
                </div>
                <div class="form-group">
                    <label>${t.labelLastname1}</label>
                    <input type="text" value="${ch.primerApellido}" oninput="childrenList.find(c=>c.id===${ch.id}).primerApellido=this.value; updateChildCardTitle(${ch.id});" placeholder="${t.placeholderLastname1}" required>
                </div>
                <div class="form-group">
                    <label>${t.labelLastname2}</label>
                    <input type="text" value="${ch.segundoApellido}" onchange="childrenList.find(c=>c.id===${ch.id}).segundoApellido=this.value;" placeholder="${t.placeholderLastname2}">
                </div>

                <div class="child-conditional-fields">
                    <div class="form-group">
                        <label>${t.labelDietOptions}</label>
                        <div class="btn-group-toggle" id="dietGroup_child_${ch.id}">
                            <button type="button" class="btn-toggle ${ch.tipoMenu === 'Ninguna' ? 'active-green' : ''}" data-diet="Ninguna" onclick="selectDiet('child_${ch.id}', 'Ninguna')">${t.dietNinguna}</button>
                            <button type="button" class="btn-toggle ${ch.tipoMenu === 'Celíaco/a' ? 'active-primary' : ''}" data-diet="Celíaco/a" onclick="selectDiet('child_${ch.id}', 'Celíaco/a')">${t.dietCeliaco}</button>
                            <button type="button" class="btn-toggle ${ch.tipoMenu === 'Vexetariano/a' ? 'active-primary' : ''}" data-diet="Vexetariano/a" onclick="selectDiet('child_${ch.id}', 'Vexetariano/a')">${t.dietVegetariano}</button>
                            <button type="button" class="btn-toggle ${ch.tipoMenu === 'Vegano/a' ? 'active-primary' : ''}" data-diet="Vegano/a" onclick="selectDiet('child_${ch.id}', 'Vegano/a')">${t.dietVegano}</button>
                            <button type="button" class="btn-toggle ${ch.tipoMenu === 'Alergias' ? 'active-primary' : ''}" data-diet="Alergias" onclick="selectDiet('child_${ch.id}', 'Alergias')">${t.dietAlergia}</button>
                            <button type="button" class="btn-toggle ${ch.tipoMenu === 'Otra' ? 'active-primary' : ''}" data-diet="Otra" onclick="selectDiet('child_${ch.id}', 'Otra')">${t.dietOtra}</button>
                        </div>

                        <div id="dietaryDetailGroup_child_${ch.id}" style="display:${ch.tipoMenu === 'Alergias' || ch.tipoMenu === 'Otra' ? 'block' : 'none'}; margin-top: 12px;">
                            <label style="font-size: 0.85rem;">${t.labelDietDetail}</label>
                            <input type="text" value="${ch.intoleranciasDetalle}" onchange="childrenList.find(c=>c.id===${ch.id}).intoleranciasDetalle=this.value;" placeholder="${t.placeholderDietDetail}">
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
        updateChildCardTitle(ch.id);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();

    const form = document.getElementById('rsvpForm');
    const statusMsg = document.getElementById('statusMsg');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const t = translations[currentLang];
        
        const nombre = document.getElementById('nombre').value.trim();
        const primerApellido = document.getElementById('primerApellido').value.trim();
        const segundoApellido = document.getElementById('segundoApellido').value.trim();
        const asistencia = document.getElementById('asistencia').value;

        if (!nombre || !primerApellido || !asistencia) {
            alert(t.alertRequired);
            return;
        }

        if (asistencia === 'Sí') {
            const autobus = document.getElementById('autobus').value;
            const tipoMenu = document.getElementById('tipoMenu').value;

            if (!autobus || !tipoMenu) {
                alert(t.alertRequired);
                return;
            }

            for (let comp of companions) {
                const compNombre = (comp.nombre || '').trim();
                const compPrimerApellido = (comp.primerApellido || '').trim();

                if (!compNombre || !compPrimerApellido || !comp.autobus || !comp.tipoMenu) {
                    alert(t.alertRequired);
                    return;
                }

                if ((comp.tipoMenu === 'Alergias' || comp.tipoMenu === 'Otra') && !(comp.intoleranciasDetalle || '').trim()) {
                    alert(t.alertRequired);
                    return;
                }
            }

            for (let ch of childrenList) {
                const chNombre = (ch.nombre || '').trim();
                const chPrimerApellido = (ch.primerApellido || '').trim();

                if (!chNombre || !chPrimerApellido || !ch.tipoMenu) {
                    alert(t.alertRequired);
                    return;
                }

                if ((ch.tipoMenu === 'Alergias' || ch.tipoMenu === 'Otra') && !(ch.intoleranciasDetalle || '').trim()) {
                    alert(t.alertRequired);
                    return;
                }
            }
        }

        const payload = {
            titular: {
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                asistencia: asistencia,
                autobus: document.getElementById('autobus').value || '',
                tipoMenu: document.getElementById('tipoMenu').value || '',
                intoleranciasDetalle: (document.getElementById('intoleranciasDetalle').value || '').trim()
            },
            acompanantes: companions.map(c => ({
                ...c,
                nombre: c.nombre.trim(),
                primerApellido: c.primerApellido.trim(),
                segundoApellido: (c.segundoApellido || '').trim(),
                intoleranciasDetalle: (c.intoleranciasDetalle || '').trim()
            })),
            ninos: childrenList.map(ch => ({
                ...ch,
                nombre: ch.nombre.trim(),
                primerApellido: ch.primerApellido.trim(),
                segundoApellido: (ch.segundoApellido || '').trim(),
                intoleranciasDetalle: (ch.intoleranciasDetalle || '').trim()
            })),
            sugerenciasGlobales: {
                cancion: (document.getElementById('cancion_main').value || '').trim(),
                mensaje: (document.getElementById('mensaje_main').value || '').trim()
            }
        };

        submitBtn.disabled = true;
        submitBtn.innerText = t.sendingBtn;

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            statusMsg.className = 'status-msg status-success';
            statusMsg.innerText = t.msgSuccess;
            statusMsg.style.display = 'block';
            
            form.reset();
            companions = [];
            childrenList = [];
            document.getElementById('asistencia').value = '';
            document.getElementById('autobus').value = '';
            document.getElementById('tipoMenu').value = '';
            document.querySelectorAll('.btn-toggle').forEach(b => b.className = 'btn-toggle');
            document.getElementById('conditionalFields').style.display = 'none';
            document.getElementById('companionsSection').style.display = 'none';
            document.getElementById('globalQuestionsSection').style.display = 'none';
            
            updateMainCardTitle();

            renderCompanions();
            renderChildren();
        })
        .catch(error => {
            statusMsg.className = 'status-msg status-error';
            statusMsg.innerText = t.msgError;
            statusMsg.style.display = 'block';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = t.submitBtn;
        });
    });
});
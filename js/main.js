const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxrIBbepFUU_swfVEw4zsYMJILUboDtHmhLwO5cMkcxPSoppza0q7boK-MFioGjPnh/exec";

let translations = {};
let currentLang = 'gl';

async function loadTranslations() {
    try {
        const response = await fetch('../json/translations.json');
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
    document.getElementById('i18n-bus-ret1-loc').innerText = t.busRet1Loc;
    document.getElementById('i18n-bus-ret1-desc').innerText = t.busRet1Desc;
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
    document.getElementById('btn-bus-ida').innerText = t.busIda;
    document.getElementById('btn-bus-volta').innerText = t.busVolta;
    document.getElementById('btn-bus-idavolta').innerText = t.busIdaVolta;

    document.getElementById('i18n-label-diet-options').innerText = t.labelDietOptions;
    document.getElementById('i18n-label-diet-detail').innerText = t.labelDietDetail;
    document.getElementById('intoleranciasDetalle').placeholder = t.placeholderDietDetail;

    document.getElementById('i18n-label-song-main').innerText = t.labelSong;
    document.getElementById('cancion_main').placeholder = t.placeholderSong;
    document.getElementById('i18n-label-msg-main').innerText = t.labelMsg;
    document.getElementById('mensaje_main').placeholder = t.placeholderMsg;

    document.getElementById('btnAddCompanion').innerText = t.btnAddCompanion;
    document.getElementById('submitBtn').innerText = t.submitBtn;

    renderCompanions();
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

    if (value === 'Sí') {
        btnYes.className = 'btn-toggle active-green';
        btnNo.className = 'btn-toggle';
        conditionalFields.style.display = 'block';
        companionsSection.style.display = 'block';
    } else {
        btnYes.className = 'btn-toggle';
        btnNo.className = 'btn-toggle active-red';
        conditionalFields.style.display = 'none';
        companionsSection.style.display = 'none';
    }
}

function selectCompanionAttendance(id, value) {
    const comp = companions.find(c => c.id === id);
    if (!comp) return;
    comp.asistencia = value;

    const card = document.getElementById(`comp_card_${id}`);
    const btnYes = card.querySelector('.btn-attending-yes');
    const btnNo = card.querySelector('.btn-attending-no');
    const condFields = card.querySelector('.comp-conditional-fields');

    if (value === 'Sí') {
        btnYes.className = 'btn-toggle btn-attending-yes active-green';
        btnNo.className = 'btn-toggle btn-attending-no';
        condFields.style.display = 'block';
    } else {
        btnYes.className = 'btn-toggle btn-attending-yes';
        btnNo.className = 'btn-toggle btn-attending-no active-red';
        condFields.style.display = 'none';
    }
    updateCompanionCardTitle(id);
}

function selectBus(idPrefix, value) {
    if (idPrefix === 'main') {
        document.getElementById('autobus').value = value;
        ['no', 'ida', 'volta', 'idavolta'].forEach(k => {
            document.getElementById(`btn-bus-${k}`).className = 'btn-toggle';
        });
        if (value === 'No') document.getElementById('btn-bus-no').className = 'btn-toggle active-red';
        else if (value === 'Sólo ida') document.getElementById('btn-bus-ida').className = 'btn-toggle active-green';
        else if (value === 'Sólo vuelta') document.getElementById('btn-bus-volta').className = 'btn-toggle active-green';
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

let companions = [];

function addCompanion() {
    if (!translations[currentLang]) return;
    if (companions.length >= 4) {
        alert(translations[currentLang].alertMaxCompanions);
        return;
    }

    collapseAll();

    const id = Date.now();
    companions.push({
        id: id,
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        asistencia: '',
        autobus: '',
        tipoMenu: '',
        intoleranciasDetalle: '',
        cancion: '',
        mensaje: '',
        isOpen: true
    });
    renderCompanions();
}

function removeCompanion(id) {
    companions = companions.filter(c => c.id !== id);
    renderCompanions();
}

function updateCompanionCardTitle(id) {
    if (!translations[currentLang]) return;
    const comp = companions.find(c => c.id === id);
    if (!comp) return;
    const index = companions.findIndex(c => c.id === id);
    const titleEl = document.getElementById(`comp_title_${id}`);
    const t = translations[currentLang];
    
    let nameStr = `${comp.nombre} ${comp.primerApellido}`.trim();
    if (!nameStr) nameStr = `${t.companionHeaderTitle} ${index + 1}`;
    titleEl.innerText = `👤 ${nameStr}`;
}

function renderCompanions() {
    if (!translations[currentLang]) return;
    const container = document.getElementById('companionsContainer');
    container.innerHTML = '';
    const t = translations[currentLang];

    const addBtn = document.getElementById('btnAddCompanion');
    if (companions.length >= 4) {
        addBtn.style.opacity = '0.5';
        addBtn.style.cursor = 'not-allowed';
    } else {
        addBtn.style.opacity = '1';
        addBtn.style.cursor = 'pointer';
    }

    companions.forEach((comp, index) => {
        const card = document.createElement('div');
        card.className = 'person-card';
        card.id = `comp_card_${comp.id}`;

        let displayName = `${comp.nombre} ${comp.primerApellido}`.trim();
        if (!displayName) displayName = `${t.companionHeaderTitle} ${index + 1}`;

        card.innerHTML = `
            <div class="person-card-header" onclick="toggleAccordion(${comp.id})">
                <h4 id="comp_title_${comp.id}">👤 ${displayName}</h4>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <button type="button" class="btn-delete-companion" onclick="event.stopPropagation(); removeCompanion(${comp.id})">
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
                    <input type="text" value="${comp.segundoApellido}" onchange="companions.find(c=>c.id===${comp.id}).segundoApellido=this.value;" placeholder="${t.placeholderLastname2}" required>
                </div>

                <div class="form-group">
                    <label>${t.labelAttending}</label>
                    <div class="btn-group-toggle">
                        <button type="button" class="btn-toggle btn-attending-yes ${comp.asistencia === 'Sí' ? 'active-green' : ''}" onclick="selectCompanionAttendance(${comp.id}, 'Sí')">${t.radioYes}</button>
                        <button type="button" class="btn-toggle btn-attending-no ${comp.asistencia === 'No' ? 'active-red' : ''}" onclick="selectCompanionAttendance(${comp.id}, 'No')">${t.radioNo}</button>
                    </div>
                </div>

                <div class="comp-conditional-fields" style="display: ${comp.asistencia === 'Sí' ? 'block' : 'none'};">
                    <div class="form-group">
                        <label>${t.labelBus}</label>
                        <div class="btn-group-toggle" id="busGroup_comp_${comp.id}">
                            <button type="button" class="btn-toggle ${comp.autobus === 'No' ? 'active-red' : ''}" data-bus="No" onclick="selectBus(${comp.id}, 'No')">${t.busNo}</button>
                            <button type="button" class="btn-toggle ${comp.autobus === 'Sólo ida' ? 'active-green' : ''}" data-bus="Sólo ida" onclick="selectBus(${comp.id}, 'Sólo ida')">${t.busIda}</button>
                            <button type="button" class="btn-toggle ${comp.autobus === 'Sólo vuelta' ? 'active-green' : ''}" data-bus="Sólo vuelta" onclick="selectBus(${comp.id}, 'Sólo vuelta')">${t.busVolta}</button>
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

                    <div class="form-group" style="margin-top: 20px;">
                        <label style="font-size: 0.85rem;">${t.labelSong}</label>
                        <input type="text" value="${comp.cancion}" onchange="companions.find(c=>c.id===${comp.id}).cancion=this.value;" placeholder="${t.placeholderSong}">
                    </div>

                    <div class="form-group">
                        <label style="font-size: 0.85rem;">${t.labelMsg}</label>
                        <textarea rows="3" onchange="companions.find(c=>c.id===${comp.id}).mensaje=this.value;" placeholder="${t.placeholderMsg}">${comp.mensaje}</textarea>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
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

        if (!nombre || !primerApellido || !segundoApellido || !asistencia) {
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
                if (!comp.nombre.trim() || !comp.primerApellido.trim() || !comp.segundoApellido.trim() || !comp.asistencia) {
                    alert(t.alertRequired);
                    return;
                }
                if (comp.asistencia === 'Sí' && (!comp.autobus || !comp.tipoMenu)) {
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
                intoleranciasDetalle: document.getElementById('intoleranciasDetalle').value || '',
                cancion: document.getElementById('cancion_main').value || '',
                mensaje: document.getElementById('mensaje_main').value || ''
            },
            acompanantes: companions
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
            document.getElementById('asistencia').value = '';
            document.getElementById('autobus').value = '';
            document.getElementById('tipoMenu').value = '';
            document.querySelectorAll('.btn-toggle').forEach(b => b.className = 'btn-toggle');
            document.getElementById('conditionalFields').style.display = 'none';
            document.getElementById('companionsSection').style.display = 'none';
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

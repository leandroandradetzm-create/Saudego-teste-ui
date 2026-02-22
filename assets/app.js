/**
 * SAÚDEGO - modelo PWA (telas/abas)
 * Próximo passo: implementar dados reais (meds, glicemias, QR, emergência) + backend.
 */

const state = {
  tab: 'resumo',
  profile: 'adulto', // 'adulto' | 'crianca'
};

const $app = document.getElementById('app');
const $tabbar = document.getElementById('tabbar');
const $profileBtn = document.getElementById('profileBtn');
const $sheet = document.getElementById('sheet');

function setActiveTab(tab){
  state.tab = tab;
  [...$tabbar.querySelectorAll('.tab')].forEach(b=>{
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  render();
}

function setProfile(p){
  state.profile = p;
  $profileBtn.textContent = (p === 'crianca') ? 'Criança ▾' : 'Adulto ▾';
  closeSheet();
  render();
}

function openSheet(){ $sheet.classList.add('show'); $sheet.setAttribute('aria-hidden','false'); }
function closeSheet(){ $sheet.classList.remove('show'); $sheet.setAttribute('aria-hidden','true'); }

function card(title, bodyHtml){
  return `
    <section class="card">
      <p class="h1">${title}</p>
      ${bodyHtml}
    </section>
  `;
}

function renderResumo(){
  const isKid = state.profile === 'crianca';
  const top = `
    <p class="p">
      ${isKid ? 'Perfil infantil (puericultura)' : 'Perfil adulto (dados essenciais e emergência)'} •
      protótipo de interface (referência de design).
    </p>
    <div class="grid">
      <div class="tile"><b>Alergias</b><div class="muted">Adicionar e destacar no cartão</div></div>
      <div class="tile"><b>Condições</b><div class="muted">HAS, DM, asma…</div></div>
      <div class="tile"><b>Medicamentos</b><div class="muted">Horários + lembretes</div></div>
      <div class="tile"><b>Emergência</b><div class="muted">Contatos e dados críticos</div></div>
    </div>
  `;
  const actions = `
    <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
      <button class="btn" data-action="goCarteirinha" type="button">Ver carteirinha</button>
      <button class="btn secondary" data-action="goMedicamentos" type="button">Medicamentos</button>
    </div>
  `;
  return card('Resumo de Saúde', top + actions);
}

function renderMedicamentos(){
  const body = `
    <p class="p">Aqui vamos colocar: lista, horários, lembretes e “agenda do dia”.</p>
    <div class="list">
      <div class="listItem"><b>Amlodipino</b><span class="muted">5 mg • 08:00</span></div>
      <div class="listItem"><b>Metformina</b><span class="muted">850 mg • 08:00 / 20:00</span></div>
    </div>
    <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
      <button class="btn" type="button" data-action="addMed">+ Adicionar</button>
      <button class="btn secondary" type="button" data-action="goResumo">Voltar</button>
    </div>
  `;
  return card('Medicamentos', body);
}

function renderDiabetes(){
  const body = `
    <p class="p">Tabela padrão: Jejum / Pré e Pós refeições / Ao deitar.</p>
    <div class="list">
      <div class="listItem"><b>Hoje</b><span class="muted">Jejum: — • Pré-almoço: — • Pós-almoço: —</span></div>
      <div class="listItem"><b>Registrar</b><span class="muted">Entrada rápida + observação</span></div>
    </div>
    <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
      <button class="btn" type="button" data-action="addGlicemia">+ Registrar glicemia</button>
      <button class="btn secondary" type="button" data-action="goResumo">Voltar</button>
    </div>
  `;
  return card('Diabetes', body);
}

function renderCarteirinha(){
  const body = `
    <p class="p">Cartão do paciente + QR para compartilhar com profissional (verificado).</p>

    <div style="margin-top:12px; border:1px dashed rgba(15,23,42,.18); border-radius:16px; padding:14px; text-align:center;">
      <div style="font-weight:900;">[ QR CODE ]</div>
      <div class="p" style="margin-top:6px;">Simulação • Próximo passo: gerar token</div>
    </div>

    <div class="list" style="margin-top:12px;">
      <div class="listItem"><b>Tipo sanguíneo</b><span class="muted">O+ (exemplo)</span></div>
      <div class="listItem"><b>Alergias</b><span class="muted">Dipirona (exemplo)</span></div>
      <div class="listItem"><b>Condições</b><span class="muted">HAS / DM2 (exemplo)</span></div>
    </div>

    <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
      <button class="btn" type="button" data-action="genQR">Gerar QR/Link</button>
      <button class="btn secondary" type="button" data-action="goResumo">Voltar</button>
    </div>
  `;
  return card('Carteirinha', body);
}

function renderMais(){
  const body = `
    <div class="list">
      <button class="listItem" type="button" data-action="emergencia">
        <b>Modo EMERGÊNCIA</b>
        <span class="muted">Contatos + dados essenciais</span>
      </button>
      <button class="listItem" type="button" data-action="perfis">
        <b>Perfis (Família / Criança)</b>
        <span class="muted">Responsável cria perfis infantis</span>
      </button>
      <div class="listItem">
        <b>SAÚDEGO Premium</b>
        <span class="muted">R$ 9,90/mês • R$ 79,90/ano • Vitalício R$ 199,90</span>
      </div>
      <div class="listItem">
        <b>Profissional (em breve)</b>
        <span class="muted">Cadastro verificado (CRM/CRO/COREN) • médico evolui</span>
      </div>
    </div>
  `;
  return card('Mais', body);
}

function render(){
  let html = '';
  switch(state.tab){
    case 'resumo': html = renderResumo(); break;
    case 'medicamentos': html = renderMedicamentos(); break;
    case 'diabetes': html = renderDiabetes(); break;
    case 'carteirinha': html = renderCarteirinha(); break;
    case 'mais': html = renderMais(); break;
    default: html = renderResumo();
  }
  $app.innerHTML = html;
}

$tabbar.addEventListener('click', (e)=>{
  const b = e.target.closest('.tab');
  if(!b) return;
  setActiveTab(b.dataset.tab);
});

$profileBtn.addEventListener('click', openSheet);

$sheet.addEventListener('click', (e)=>{
  if(e.target === $sheet) closeSheet();
  const a = e.target.closest('[data-action]');
  if(!a) return;
  const action = a.dataset.action;

  if(action === 'closeSheet') closeSheet();
  if(action === 'switchProfile') setProfile(a.dataset.profile);
});

document.addEventListener('click', (e)=>{
  const a = e.target.closest('[data-action]');
  if(!a) return;

  const action = a.dataset.action;
  if(action === 'goCarteirinha') setActiveTab('carteirinha');
  if(action === 'goMedicamentos') setActiveTab('medicamentos');
  if(action === 'goResumo') setActiveTab('resumo');
  if(action === 'addMed') alert('Adicionar medicamento (placeholder).');
  if(action === 'addGlicemia') alert('Registrar glicemia (placeholder).');
  if(action === 'genQR') alert('Gerar QR/Link (placeholder).');
  if(action === 'emergencia') alert('Modo EMERGÊNCIA (placeholder).');
  if(action === 'perfis') openSheet();
});

// init
setProfile('adulto');
setActiveTab('resumo');

<template>
  <div class="lp">

    <!-- NAV -->
    <nav class="lp-nav" :class="{ 'lp-nav--scrolled': scrolled }">
      <div class="lp-nav__inner">
        <div class="lp-nav__brand">
          <div class="lp-nav__logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" />
              <circle cx="12" cy="13" r="2.5" fill="none" stroke="white" stroke-width="1.5" />
            </svg>
          </div>
          <div>
            <p class="lp-nav__name">SystemACE</p>
            <p class="lp-nav__sub">EPI DASHBOARD</p>
          </div>
        </div>
        <div class="lp-nav__links">
          <a href="#servicos">Serviços</a>
          <a href="#porque">Por que nós</a>
          <a href="#contato">Contato</a>
        </div>
        <div class="lp-nav__ctas">
          <button class="lp-btn lp-btn--ghost" @click="$router.push('/cadastro')">Cadastrar</button>
          <button class="lp-btn lp-btn--primary" @click="$router.push('/login')">
            Entrar
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="lp-hero">
      <div class="lp-hero__bg-glow lp-hero__bg-glow--1"></div>
      <div class="lp-hero__bg-glow lp-hero__bg-glow--2"></div>
      <div class="lp-hero__grid-overlay"></div>

      <div class="lp-hero__inner">
        <!-- Left -->
        <div class="lp-hero__copy">
          <div class="lp-hero__pill">
            <span class="lp-hero__pill-dot"></span>
            Gestão inteligente de EPIs
          </div>
          <h1 class="lp-hero__h1">
            Proteção com<br>
            <em class="lp-hero__gradient-text">controle total</em>
          </h1>
          <p class="lp-hero__desc">
            Central estratégica para gestão de Equipamentos de Proteção Individual.
            Rastreabilidade completa, conformidade com a NR-6 e visibilidade
            em tempo real para toda sua equipe.
          </p>
          <div class="lp-hero__actions">
            <button class="lp-btn lp-btn--primary lp-btn--lg" @click="$router.push('/login')">
              Acessar plataforma
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9M9 4.5l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
            <a href="#servicos" class="lp-btn lp-btn--outline lp-btn--lg">Ver serviços</a>
          </div>
          <div class="lp-hero__stats">
            <div class="lp-hero__stat">
              <span class="lp-hero__stat-val">100%</span>
              <span class="lp-hero__stat-lbl">Conformidade NR-6</span>
            </div>
            <div class="lp-hero__stat-sep"></div>
            <div class="lp-hero__stat">
              <span class="lp-hero__stat-val">80%</span>
              <span class="lp-hero__stat-lbl">Redução de tempo</span>
            </div>
            <div class="lp-hero__stat-sep"></div>
            <div class="lp-hero__stat">
              <span class="lp-hero__stat-val">360°</span>
              <span class="lp-hero__stat-lbl">Visibilidade</span>
            </div>
          </div>
        </div>

        <!-- Right: fake dashboard card -->
        <div class="lp-hero__visual">
          <div class="lp-dash">
            <div class="lp-dash__top">
              <div class="lp-dash__traffic">
                <span class="lp-dash__traffic-dot lp-dash__traffic-dot--red"></span>
                <span class="lp-dash__traffic-dot lp-dash__traffic-dot--yellow"></span>
                <span class="lp-dash__traffic-dot lp-dash__traffic-dot--green"></span>
              </div>
              <span class="lp-dash__label">Dashboard · EPIs</span>
            </div>
            <div class="lp-dash__kpis">
              <div class="lp-dash__kpi">
                <span class="lp-dash__kpi-val">247</span>
                <span class="lp-dash__kpi-lbl">Total EPIs</span>
              </div>
              <div class="lp-dash__kpi">
                <span class="lp-dash__kpi-val lp-dash__kpi-val--green">198</span>
                <span class="lp-dash__kpi-lbl">Disponível</span>
              </div>
              <div class="lp-dash__kpi">
                <span class="lp-dash__kpi-val lp-dash__kpi-val--blue">49</span>
                <span class="lp-dash__kpi-lbl">Em uso</span>
              </div>
            </div>
            <div class="lp-dash__bars-header">
              <span>Estoque por tipo</span>
              <span class="lp-dash__live">● Ao vivo</span>
            </div>
            <div class="lp-dash__bars">
              <div v-for="b in bars" :key="b.name" class="lp-dash__bar-row">
                <span class="lp-dash__bar-name">{{ b.name }}</span>
                <div class="lp-dash__bar-track">
                  <div class="lp-dash__bar-fill" :style="{ width: b.pct + '%', background: b.color }"></div>
                </div>
                <span class="lp-dash__bar-qty">{{ b.qty }}</span>
              </div>
            </div>
            <div class="lp-dash__badge">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#34D399" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              Conformidade NR-6: 98.4%
            </div>
          </div>

          <div class="lp-fc lp-fc--tl">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1L9.5 5.5H14.5L10.5 8.5L12 13.5L7.5 10.5L3 13.5L4.5 8.5L0.5 5.5H5.5L7.5 1Z"
                fill="#F59E0B" />
            </svg>
            <div>
              <p class="lp-fc__val">NR-6 ativa</p>
              <p class="lp-fc__sub">Em conformidade</p>
            </div>
          </div>

          <div class="lp-fc lp-fc--br">
            <span class="lp-fc__dot"></span>
            <div>
              <p class="lp-fc__val">Entrega registrada</p>
              <p class="lp-fc__sub">Há 2 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVIÇOS -->
    <section class="lp-section lp-section--alt" id="servicos">
      <div class="lp-section__inner">
        <div class="lp-section__head">
          <p class="lp-tag">O que oferecemos</p>
          <h2>Serviços Especializados</h2>
          <p class="lp-section__sub">Soluções completas para gestão, conformidade e rastreabilidade de EPIs.</p>
        </div>
        <div class="lp-services">
          <div v-for="sv in services" :key="sv.title" class="lp-sv">
            <div class="lp-sv__icon" v-html="sv.icon"></div>
            <h3>{{ sv.title }}</h3>
            <p>{{ sv.desc }}</p>
            <span class="lp-sv__chips">{{ sv.chips }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- POR QUE NÓS -->
    <section class="lp-section" id="porque">
      <div class="lp-section__inner lp-why__layout">
        <div class="lp-why__left">
          <p class="lp-tag">Nossos diferenciais</p>
          <h2>Por que escolher<br>o SystemACE?</h2>
          <p class="lp-section__sub">Diferenciais estratégicos construídos para o sucesso real da sua operação.</p>
          <div class="lp-why__metric">
            <span class="lp-why__metric-num">3×</span>
            <span class="lp-why__metric-text">mais eficiência na gestão<br>de entregas de EPIs</span>
          </div>
        </div>
        <div class="lp-why__cards">
          <div v-for="c in whyCards" :key="c.title" class="lp-wc">
            <span class="lp-wc__icon">{{ c.icon }}</span>
            <h4>{{ c.title }}</h4>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTATO -->
    <section class="lp-section lp-section--alt" id="contato">
      <div class="lp-section__inner lp-contact__layout">
        <div class="lp-contact__left">
          <p class="lp-tag">Fale conosco</p>
          <h2>Solicite uma<br>Demonstração</h2>
          <p class="lp-section__sub">Preencha o formulário e nossa equipe entrará em contato em breve.</p>
          <div class="lp-contact__info">
            <div class="lp-contact__info-item">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1C5 1 3 3 3 5.5c0 3.5 4.5 8.5 4.5 8.5S12 9 12 5.5C12 3 10 1 7.5 1z" stroke="#4D8FF5"
                  stroke-width="1.3" />
                <circle cx="7.5" cy="5.5" r="1.5" stroke="#4D8FF5" stroke-width="1.3" />
              </svg>
              SENAI Roberto Mange — Joinville, SC
            </div>
            <div class="lp-contact__info-item">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="#4D8FF5" stroke-width="1.3" />
                <path d="M1.5 5l6 4 6-4" stroke="#4D8FF5" stroke-width="1.3" stroke-linecap="round" />
              </svg>
              contato@systemace.com.br
            </div>
          </div>
        </div>
        <div class="lp-form">
          <div class="lp-form__row">
            <div class="lp-form__group">
              <label>Nome</label>
              <input v-model="form.nome" type="text" placeholder="Seu nome" />
            </div>
            <div class="lp-form__group">
              <label>Sobrenome</label>
              <input v-model="form.sobrenome" type="text" placeholder="Seu sobrenome" />
            </div>
          </div>
          <div class="lp-form__row">
            <div class="lp-form__group">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="seu@email.com" />
            </div>
            <div class="lp-form__group">
              <label>Telefone</label>
              <input v-model="form.telefone" type="tel" placeholder="(11) 00000-0000" />
            </div>
          </div>
          <div class="lp-form__group">
            <label>Empresa / Instituição</label>
            <input v-model="form.empresa" type="text" placeholder="Nome da empresa ou instituição" />
          </div>
          <div class="lp-form__group">
            <label>Mensagem</label>
            <textarea v-model="form.mensagem" placeholder="Como podemos ajudar?"></textarea>
          </div>
          <button class="lp-btn lp-btn--primary lp-btn--full" @click="enviar">
            Enviar mensagem
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 7.5h9M9 4.5l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="lp-footer">
      <div class="lp-footer__inner">
        <div class="lp-footer__top">
          <div class="lp-footer__brand">
            <div class="lp-nav__logo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" />
                <circle cx="12" cy="13" r="2.5" fill="none" stroke="white" stroke-width="1.5" />
              </svg>
            </div>
            <div>
              <p class="lp-nav__name">SystemACE</p>
              <p class="lp-nav__sub">EPI DASHBOARD</p>
            </div>
          </div>
          <p class="lp-footer__desc">Central inteligente para gestão estratégica de EPIs. Conformidade, rastreabilidade
            e eficiência em uma única plataforma.</p>
          <p class="lp-footer__contact">Seg.–Sex: 8h às 18h<br>contato@systemace.com.br</p>
          <div v-for="col in footerCols" :key="col.title" class="lp-footer__col">
            <h5>{{ col.title }}</h5>
            <a v-for="l in col.links" :key="l" href="#">{{ l }}</a>
          </div>
        </div>
        <div class="lp-footer__bottom">
          <p>© {{ year }} SystemACE · Desenvolvido por alunos do SENAI Roberto Mange</p>
          <p>Todos os direitos reservados</p>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const year = new Date().getFullYear()
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const bars = [
  { name: 'Capacetes', qty: 64, pct: 88, color: '#4D8FF5' },
  { name: 'Luvas', qty: 52, pct: 72, color: '#34D399' },
  { name: 'Óculos', qty: 38, pct: 52, color: '#A78BFA' },
  { name: 'Coletes', qty: 44, pct: 61, color: '#F59E0B' },
]

const services = [
  {
    title: 'Auditoria de Conformidade',
    desc: 'Mantenha sua empresa 100% regularizada. O SystemACE monitora automaticamente a validade dos CAs e garante conformidade com as normas do Ministério do Trabalho.',
    chips: 'NR-6 · CA · Ministério do Trabalho',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h9"/></svg>`,
  },
  {
    title: 'Assinatura Digital',
    desc: 'Integração total com o ecossistema da sua organização. Automatize a importação de dados de funcionários e a baixa de estoque em tempo real, eliminando retrabalho.',
    chips: 'Validade jurídica · Sem papel',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  },
  {
    title: 'Gestão de Sistemas',
    desc: 'Cautelas eletrônicas com validade jurídica. Elimine o arquivo morto e organize o histórico de entregas de forma digital, segura e rastreável.',
    chips: 'Rastreabilidade · Histórico completo',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  },
]

const whyCards = [
  { icon: '🛡️', title: 'Segurança Jurídica Blindada', desc: 'Assinaturas digitais com prova jurídica incontestável de cada EPI entregue e cada treinamento realizado.' },
  { icon: '📊', title: 'Visibilidade 360° em Tempo Real', desc: 'Dashboards para saber exatamente quem está protegido, onde está seu estoque e antecipar compras.' },
  { icon: '🔗', title: 'Integração Nativa', desc: 'Sincroniza com RH e ERP. Quando um funcionário muda de função, o sistema atualiza automaticamente.' },
  { icon: '⚡', title: 'Eficiência Operacional', desc: 'Reduza em 80% o tempo de entrega. Automatize processos burocráticos e foque na estratégia.' },
]

const footerCols = [
  { title: 'Plataforma', links: ['Auditoria', 'Assinatura Digital', 'Gestão', 'Dashboard'] },
  { title: 'Empresa', links: ['Sobre nós', 'Contato', 'Privacidade', 'Termos de Uso'] },
]

const form = reactive({ nome: '', sobrenome: '', email: '', telefone: '', empresa: '', mensagem: '' })
function enviar() {
  if (!form.nome || !form.email) return alert('Preencha nome e email.')
  alert('Mensagem enviada! Entraremos em contato em breve.')
  Object.keys(form).forEach(k => form[k] = '')
}
</script>

<style scoped>
/* ─── TOKENS ─────────────────────────────────────────── */
.lp {
  --c-bg: #06091A;
  --c-bg2: #0C1228;
  --c-bg3: #101A34;
  --c-blue: #2563EB;
  --c-blue2: #3B82F6;
  --c-blue3: #4D8FF5;
  --c-cyan: #38BDF8;
  --c-green: #34D399;
  --c-text: #E8EEFF;
  --c-muted: #6B7FA8;
  --c-border: rgba(255, 255, 255, 0.07);
  --c-border2: rgba(59, 130, 246, 0.3);
  --r: 14px;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
  background: var(--c-bg);
  color: var(--c-text);
  overflow-x: hidden;
}

/* ─── GLOBAL RESETS inside .lp ───────────────────────── */
.lp *,
.lp *::before,
.lp *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.lp h1,
.lp h2,
.lp h3,
.lp h4,
.lp h5 {
  font-family: 'Syne', 'DM Sans', sans-serif;
}

.lp a {
  text-decoration: none;
}

/* ─── BUTTONS ─────────────────────────────────────────── */
.lp-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 9px 20px;
  border-radius: 9px;
  cursor: pointer;
  border: none;
  transition: background .2s, border-color .2s, color .2s, transform .15s, box-shadow .2s;
  white-space: nowrap;
}

.lp-btn--primary {
  background: var(--c-blue);
  color: #fff;
  box-shadow: 0 4px 20px rgba(37, 99, 235, .35);
}

.lp-btn--primary:hover {
  background: #1D4ED8;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(37, 99, 235, .45);
}

.lp-btn--ghost {
  background: none;
  color: var(--c-muted);
  border: 1px solid var(--c-border);
}

.lp-btn--ghost:hover {
  border-color: var(--c-blue3);
  color: var(--c-text);
}

.lp-btn--outline {
  background: none;
  color: var(--c-muted);
  border: 1px solid var(--c-border);
}

.lp-btn--outline:hover {
  border-color: var(--c-border2);
  color: var(--c-text);
}

.lp-btn--lg {
  font-size: 15px;
  padding: 13px 26px;
  border-radius: 11px;
}

.lp-btn--full {
  width: 100%;
  justify-content: center;
  padding: 14px;
  font-size: 15px;
  border-radius: 11px;
}

/* ─── NAV ─────────────────────────────────────────────── */
.lp-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 0 64px;
  transition: background .3s, border-color .3s, backdrop-filter .3s;
  border-bottom: 1px solid transparent;
}

.lp-nav--scrolled {
  background: rgba(6, 9, 26, .92);
  backdrop-filter: blur(20px) saturate(1.2);
  border-color: var(--c-border);
}

.lp-nav__inner {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 66px;
  gap: 24px;
}

.lp-nav__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lp-nav__logo {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(140deg, #2563EB, #1A3FC0);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 14px rgba(37, 99, 235, .45);
}

.lp-nav__name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
}

.lp-nav__sub {
  font-size: 9px;
  color: var(--c-muted);
  letter-spacing: 2.5px;
  line-height: 1;
}

.lp-nav__links {
  display: flex;
  gap: 30px;
}

.lp-nav__links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-muted);
  transition: color .2s;
}

.lp-nav__links a:hover {
  color: var(--c-text);
}

.lp-nav__ctas {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* ─── HERO ─────────────────────────────────────────────── */
.lp-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 96px 64px 80px;
  position: relative;
  overflow: hidden;
}

.lp-hero__bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}

.lp-hero__bg-glow--1 {
  width: 640px;
  height: 540px;
  top: -60px;
  right: -80px;
  background: radial-gradient(ellipse, rgba(37, 99, 235, .16) 0%, transparent 70%);
}

.lp-hero__bg-glow--2 {
  width: 420px;
  height: 380px;
  bottom: 40px;
  left: -60px;
  background: radial-gradient(ellipse, rgba(56, 189, 248, .08) 0%, transparent 70%);
}

.lp-hero__grid-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: linear-gradient(rgba(255, 255, 255, .022) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .022) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
}

.lp-hero__inner {
  max-width: 1180px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.lp-hero__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(37, 99, 235, .1);
  border: 1px solid rgba(56, 189, 248, .25);
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 12px;
  color: var(--c-cyan);
  font-weight: 500;
  letter-spacing: .4px;
  margin-bottom: 28px;
  animation: lpFadeUp .55s ease both;
}

.lp-hero__pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-cyan);
  animation: lpPulse 2.4s ease-in-out infinite;
}

.lp-hero__h1 {
  font-size: clamp(44px, 5.5vw, 70px);
  font-weight: 800;
  line-height: 1.04;
  margin-bottom: 22px;
  animation: lpFadeUp .55s .08s ease both;
}

.lp-hero__gradient-text {
  font-style: normal;
  background: linear-gradient(130deg, var(--c-blue2) 0%, var(--c-cyan) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.lp-hero__desc {
  font-size: 16.5px;
  color: var(--c-muted);
  line-height: 1.8;
  max-width: 430px;
  margin-bottom: 36px;
  animation: lpFadeUp .55s .16s ease both;
}

.lp-hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: lpFadeUp .55s .24s ease both;
}

.lp-hero__stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 48px;
  animation: lpFadeUp .55s .36s ease both;
}

.lp-hero__stat-sep {
  width: 1px;
  height: 30px;
  background: var(--c-border);
}

.lp-hero__stat-val {
  display: block;
  font-family: 'Syne', sans-serif;
  font-size: 26px;
  font-weight: 800;
}

.lp-hero__stat-lbl {
  display: block;
  font-size: 11.5px;
  color: var(--c-muted);
  margin-top: 2px;
}

/* dashboard mock card */
.lp-hero__visual {
  position: relative;
  animation: lpFadeUp .55s .12s ease both;
}

.lp-dash {
  background: var(--c-bg2);
  border: 1px solid var(--c-border);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, .55), 0 0 0 1px rgba(37, 99, 235, .07);
}

.lp-dash__top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.lp-dash__traffic {
  display: flex;
  gap: 6px;
}

.lp-dash__traffic-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.lp-dash__traffic-dot--red {
  background: #EF4444;
  opacity: .65;
}

.lp-dash__traffic-dot--yellow {
  background: #F59E0B;
  opacity: .65;
}

.lp-dash__traffic-dot--green {
  background: #34D399;
  opacity: .65;
}

.lp-dash__label {
  font-size: 12px;
  color: var(--c-muted);
  margin-left: 4px;
}

.lp-dash__kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.lp-dash__kpi {
  background: var(--c-bg3);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 13px 10px;
  text-align: center;
}

.lp-dash__kpi-val {
  display: block;
  font-family: 'Syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
}

.lp-dash__kpi-val--green {
  color: var(--c-green);
}

.lp-dash__kpi-val--blue {
  color: var(--c-blue2);
}

.lp-dash__kpi-lbl {
  font-size: 11px;
  color: var(--c-muted);
  margin-top: 3px;
}

.lp-dash__bars-header {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--c-muted);
  margin-bottom: 12px;
}

.lp-dash__live {
  color: var(--c-green);
  font-size: 10px;
  font-weight: 600;
}

.lp-dash__bars {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 16px;
}

.lp-dash__bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lp-dash__bar-name {
  font-size: 12px;
  color: var(--c-muted);
  min-width: 70px;
}

.lp-dash__bar-track {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, .06);
  border-radius: 3px;
  overflow: hidden;
}

.lp-dash__bar-fill {
  height: 100%;
  border-radius: 3px;
}

.lp-dash__bar-qty {
  font-size: 11px;
  color: var(--c-muted);
  min-width: 24px;
  text-align: right;
}

.lp-dash__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(52, 211, 153, .1);
  border: 1px solid rgba(52, 211, 153, .2);
  color: var(--c-green);
  font-size: 11.5px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
}

/* floating cards */
.lp-fc {
  position: absolute;
  background: var(--c-bg2);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 11px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, .45);
  font-size: 12px;
}

.lp-fc--tl {
  top: -16px;
  left: -26px;
  animation: lpFloat1 4s ease-in-out infinite;
}

.lp-fc--br {
  bottom: 20px;
  right: -22px;
  animation: lpFloat2 4s 1.2s ease-in-out infinite;
}

.lp-fc__val {
  font-weight: 600;
  font-size: 13px;
  line-height: 1.2;
}

.lp-fc__sub {
  font-size: 11px;
  color: var(--c-muted);
  margin-top: 1px;
}

.lp-fc__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c-green);
  box-shadow: 0 0 8px rgba(52, 211, 153, .6);
  flex-shrink: 0;
}

/* ─── SECTIONS ─────────────────────────────────────────── */
.lp-section {
  padding: 108px 64px;
}

.lp-section--alt {
  background: var(--c-bg2);
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
}

.lp-section__inner {
  max-width: 1180px;
  margin: 0 auto;
}

.lp-section__head {
  text-align: center;
  margin-bottom: 60px;
}

.lp-section__head h2 {
  font-size: clamp(28px, 3.2vw, 44px);
  font-weight: 800;
  margin-bottom: 14px;
}

.lp-section__sub {
  font-size: 16px;
  color: var(--c-muted);
  line-height: 1.75;
  max-width: 480px;
  margin: 0 auto;
}

.lp-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--c-blue3);
  margin-bottom: 14px;
}

/* ─── SERVIÇOS ─────────────────────────────────────────── */
.lp-services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.lp-sv {
  background: rgba(255, 255, 255, .03);
  border: 1px solid var(--c-border);
  border-radius: var(--r);
  padding: 30px;
  position: relative;
  overflow: hidden;
  transition: border-color .25s, transform .25s;
}

.lp-sv::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--c-blue), var(--c-cyan));
  opacity: 0;
  transition: opacity .25s;
}

.lp-sv:hover {
  border-color: var(--c-border2);
  transform: translateY(-4px);
}

.lp-sv:hover::before {
  opacity: 1;
}

.lp-sv__icon {
  width: 46px;
  height: 46px;
  border-radius: 11px;
  background: rgba(37, 99, 235, .12);
  border: 1px solid rgba(37, 99, 235, .2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-blue3);
  margin-bottom: 18px;
}

.lp-sv h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 11px;
}

.lp-sv p {
  font-size: 14px;
  color: var(--c-muted);
  line-height: 1.7;
  margin-bottom: 18px;
}

.lp-sv__chips {
  font-size: 11px;
  color: var(--c-muted);
  background: var(--c-bg3);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 4px 10px;
  display: inline-block;
}

/* ─── POR QUE ──────────────────────────────────────────── */
.lp-why__layout {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 80px;
  align-items: center;
}

.lp-why__left h2 {
  font-size: clamp(28px, 3.2vw, 44px);
  font-weight: 800;
  line-height: 1.12;
  margin-bottom: 16px;
}

.lp-why__left .lp-section__sub {
  max-width: 100%;
  margin: 0 0 32px;
}

.lp-why__metric {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 22px;
  border-radius: 14px;
  background: rgba(37, 99, 235, .07);
  border: 1px solid rgba(37, 99, 235, .18);
}

.lp-why__metric-num {
  font-family: 'Syne', sans-serif;
  font-size: 42px;
  font-weight: 800;
  color: var(--c-blue2);
  line-height: 1;
}

.lp-why__metric-text {
  font-size: 13px;
  color: var(--c-muted);
  line-height: 1.55;
}

.lp-why__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.lp-wc {
  background: var(--c-bg2);
  border: 1px solid var(--c-border);
  border-radius: var(--r);
  padding: 24px;
  transition: border-color .25s;
}

.lp-wc:hover {
  border-color: var(--c-border2);
}

.lp-wc__icon {
  font-size: 22px;
  margin-bottom: 13px;
  display: block;
}

.lp-wc h4 {
  font-size: 14.5px;
  font-weight: 700;
  margin-bottom: 9px;
  line-height: 1.3;
}

.lp-wc p {
  font-size: 13px;
  color: var(--c-muted);
  line-height: 1.65;
}

/* ─── CONTATO ──────────────────────────────────────────── */
.lp-contact__layout {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 80px;
  align-items: start;
}

.lp-contact__left h2 {
  font-size: clamp(28px, 3.2vw, 44px);
  font-weight: 800;
  line-height: 1.12;
  margin-bottom: 16px;
}

.lp-contact__left .lp-section__sub {
  max-width: 100%;
  margin: 0 0 28px;
}

.lp-contact__info {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.lp-contact__info-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  color: var(--c-muted);
}

.lp-form {
  background: var(--c-bg3);
  border: 1px solid var(--c-border);
  border-radius: 18px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lp-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.lp-form__group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.lp-form__group label {
  font-size: 12px;
  color: var(--c-muted);
  font-weight: 500;
}

.lp-form__group input,
.lp-form__group textarea {
  background: var(--c-bg2);
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 11px 14px;
  color: var(--c-text);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color .2s;
}

.lp-form__group input:focus,
.lp-form__group textarea:focus {
  border-color: var(--c-blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, .12);
}

.lp-form__group input::placeholder,
.lp-form__group textarea::placeholder {
  color: var(--c-muted);
  opacity: .7;
}

.lp-form__group textarea {
  min-height: 108px;
  resize: vertical;
}

/* ─── FOOTER ───────────────────────────────────────────── */
.lp-footer {
  background: var(--c-bg);
  border-top: 1px solid var(--c-border);
  padding: 58px 64px 28px;
}

.lp-footer__inner {
  max-width: 1180px;
  margin: 0 auto;
}

.lp-footer__top {
  display: grid;
  grid-template-columns: 2.2fr 1fr 1fr;
  gap: 52px;
  margin-bottom: 42px;
  align-items: start;
}

.lp-footer__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.lp-footer__desc {
  font-size: 13px;
  color: var(--c-muted);
  line-height: 1.75;
  max-width: 260px;
  margin-bottom: 16px;
}

.lp-footer__contact {
  font-size: 12.5px;
  color: var(--c-muted);
  line-height: 1.9;
}

.lp-footer__col h5 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 14px;
}

.lp-footer__col a {
  display: block;
  font-size: 13px;
  color: var(--c-muted);
  margin-bottom: 9px;
  transition: color .2s;
}

.lp-footer__col a:hover {
  color: var(--c-text);
}

.lp-footer__bottom {
  border-top: 1px solid var(--c-border);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
}

.lp-footer__bottom p {
  font-size: 12px;
  color: var(--c-muted);
}

/* ─── KEYFRAMES ─────────────────────────────────────────── */
@keyframes lpFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes lpPulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: .35;
    transform: scale(1.6);
  }
}

@keyframes lpFloat1 {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-9px);
  }
}

@keyframes lpFloat2 {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(7px);
  }
}

/* ─── RESPONSIVE ────────────────────────────────────────── */
@media (max-width: 1080px) {
  .lp-hero__inner {
    grid-template-columns: 1fr;
  }

  .lp-hero__visual {
    display: none;
  }

  .lp-services {
    grid-template-columns: 1fr 1fr;
  }

  .lp-why__layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .lp-contact__layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .lp-footer__top {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .lp-nav {
    padding: 0 20px;
  }

  .lp-nav__links {
    display: none;
  }

  .lp-hero,
  .lp-section {
    padding-left: 20px;
    padding-right: 20px;
  }

  .lp-services {
    grid-template-columns: 1fr;
  }

  .lp-why__cards {
    grid-template-columns: 1fr;
  }

  .lp-form {
    padding: 20px;
  }

  .lp-form__row {
    grid-template-columns: 1fr;
  }

  .lp-footer {
    padding: 44px 20px 24px;
  }

  .lp-footer__top {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .lp-footer__bottom {
    flex-direction: column;
    gap: 6px;
  }
}
</style>

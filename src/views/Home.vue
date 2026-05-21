<template>
  <div class="lp">

    <!-- ── NAV ── -->
    <nav class="lp-nav" :class="{ 'lp-nav--scrolled': scrolled }">
      <div class="lp-nav__inner">
        <div class="lp-nav__brand" @click="scrollTo('top')">
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

    <!-- ── HERO ── -->
    <section class="lp-hero" id="top">
      <div class="lp-hero__bg">
        <div class="lp-hero__bg-pattern"></div>
        <div class="lp-hero__bg-glow lp-hero__bg-glow--1"></div>
        <div class="lp-hero__bg-glow lp-hero__bg-glow--2"></div>
      </div>

      <div class="lp-hero__inner">
        <div class="lp-hero__top">
          <div class="lp-hero__pill">
            <span class="lp-hero__pill-dot"></span>
            Gestão inteligente de EPIs
          </div>
          <h1 class="lp-hero__h1">
            Boas-vindas ao<br>
            <em>SystemACE</em>
          </h1>
          <p class="lp-hero__desc">
            Sua central inteligente para gestão estratégica de EPIs.
            Monitore conformidades, controle estoques e garanta a segurança
            da sua equipe com dados em tempo real — o controle que você
            precisa, com a agilidade que sua operação exige.
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
        </div>

        <div class="lp-hero__showcase">
          <!-- left: team illustration via SVG -->
          <div class="lp-hero__media">
            <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" class="lp-hero__svg">
              <defs>
                <linearGradient id="lp-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#DDE8FB" />
                  <stop offset="100%" stop-color="#A6BFE6" />
                </linearGradient>
                <linearGradient id="lp-desk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#8A613C" />
                  <stop offset="100%" stop-color="#6B4A2D" />
                </linearGradient>
                <linearGradient id="lp-floor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#E5DBC9" />
                  <stop offset="100%" stop-color="#C4B496" />
                </linearGradient>
                <linearGradient id="lp-screen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#1A3FC0" />
                  <stop offset="100%" stop-color="#2563EB" />
                </linearGradient>
              </defs>
              <!-- background room -->
              <rect width="600" height="280" fill="url(#lp-sky)" />
              <rect y="280" width="600" height="140" fill="url(#lp-floor)" />
              <!-- window -->
              <rect x="40" y="30" width="180" height="120" rx="6" fill="#fff" opacity=".5" />
              <line x1="130" y1="30" x2="130" y2="150" stroke="#A6BFE6" stroke-width="2" />
              <line x1="40" y1="90" x2="220" y2="90" stroke="#A6BFE6" stroke-width="2" />
              <!-- desk -->
              <rect x="0" y="270" width="600" height="40" fill="url(#lp-desk)" />
              <!-- monitors -->
              <g transform="translate(100,150)">
                <rect width="140" height="90" rx="4" fill="#1F2937" />
                <rect x="5" y="5" width="130" height="80" rx="2" fill="url(#lp-screen)" />
                <!-- chart -->
                <rect x="15" y="20" width="6" height="50" fill="#fff" opacity=".7" />
                <rect x="28" y="35" width="6" height="35" fill="#fff" opacity=".7" />
                <rect x="41" y="15" width="6" height="55" fill="#fff" opacity=".9" />
                <rect x="54" y="40" width="6" height="30" fill="#fff" opacity=".7" />
                <rect x="67" y="25" width="6" height="45" fill="#fff" opacity=".7" />
                <rect x="80" y="10" width="6" height="60" fill="#fff" />
                <rect x="93" y="30" width="6" height="40" fill="#fff" opacity=".7" />
                <rect x="106" y="20" width="6" height="50" fill="#fff" opacity=".8" />
                <rect x="60" y="240" width="20" height="10" fill="#374151" />
                <rect x="40" y="250" width="60" height="6" fill="#374151" />
              </g>
              <g transform="translate(280,140)">
                <rect width="160" height="100" rx="4" fill="#1F2937" />
                <rect x="5" y="5" width="150" height="90" rx="2" fill="url(#lp-screen)" />
                <!-- pie chart -->
                <circle cx="55" cy="50" r="28" fill="#fff" opacity=".15" />
                <path d="M 55 50 L 55 22 A 28 28 0 0 1 79 60 Z" fill="#34D399" />
                <path d="M 55 50 L 79 60 A 28 28 0 0 1 39 71 Z" fill="#F59E0B" />
                <!-- lines -->
                <rect x="95" y="25" width="50" height="4" rx="2" fill="#fff" opacity=".7" />
                <rect x="95" y="35" width="40" height="4" rx="2" fill="#fff" opacity=".5" />
                <rect x="95" y="45" width="45" height="4" rx="2" fill="#fff" opacity=".5" />
                <rect x="95" y="55" width="30" height="4" rx="2" fill="#fff" opacity=".5" />
                <rect x="65" y="260" width="30" height="10" fill="#374151" />
                <rect x="40" y="270" width="80" height="6" fill="#374151" />
              </g>
              <!-- people silhouettes -->
              <g transform="translate(450,180)">
                <!-- person 1 -->
                <circle cx="20" cy="30" r="14" fill="#F4B89A" />
                <path d="M 0 90 Q 0 50 20 50 Q 40 50 40 90 Z" fill="#2563EB" />
                <rect x="14" y="20" width="12" height="8" rx="2" fill="#3A2517" />
              </g>
              <g transform="translate(495,170)">
                <!-- person 2 -->
                <circle cx="20" cy="30" r="14" fill="#E8A484" />
                <path d="M 0 100 Q 0 50 20 50 Q 40 50 40 100 Z" fill="#1F4FCE" />
                <path d="M 8 26 Q 20 14 32 26 L 30 18 L 10 18 Z" fill="#3A2517" />
              </g>
              <g transform="translate(40,180)">
                <!-- person 3 -->
                <circle cx="20" cy="30" r="14" fill="#F4B89A" />
                <path d="M 0 100 Q 0 50 20 50 Q 40 50 40 100 Z" fill="#1D4ED8" />
                <path d="M 6 24 Q 20 10 34 24 L 32 32 L 8 32 Z" fill="#2A1810" />
              </g>
              <!-- laptop on desk -->
              <g transform="translate(245,250)">
                <rect width="60" height="40" rx="2" fill="#374151" />
                <rect x="3" y="3" width="54" height="34" rx="1" fill="url(#lp-screen)" />
                <rect x="-6" y="40" width="72" height="3" rx="1" fill="#1F2937" />
              </g>
            </svg>
            <div class="lp-hero__media-grad"></div>
          </div>

          <!-- right: floating card -->
          <div class="lp-hero__floating">
            <div class="lp-dash">
              <div class="lp-dash__top">
                <div class="lp-dash__traffic">
                  <span class="lp-dash__traffic-dot lp-dash__traffic-dot--red"></span>
                  <span class="lp-dash__traffic-dot lp-dash__traffic-dot--yellow"></span>
                  <span class="lp-dash__traffic-dot lp-dash__traffic-dot--green"></span>
                </div>
                <span class="lp-dash__label">Dashboard · EPIs</span>
                <span class="lp-dash__live"><span class="lp-dash__live-dot"></span>Ao vivo</span>
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
                  <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#059669" stroke-width="1.6" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                Conformidade NR-6: 98.4%
              </div>
            </div>
          </div>
        </div>

        <!-- bottom stats row -->
        <div class="lp-hero__stats">
          <div class="lp-hero__stat">
            <span class="lp-hero__stat-val">100%</span>
            <span class="lp-hero__stat-lbl">Conformidade NR-6</span>
          </div>
          <div class="lp-hero__stat">
            <span class="lp-hero__stat-val">80%</span>
            <span class="lp-hero__stat-lbl">Redução de tempo</span>
          </div>
          <div class="lp-hero__stat">
            <span class="lp-hero__stat-val">360°</span>
            <span class="lp-hero__stat-lbl">Visibilidade</span>
          </div>
          <div class="lp-hero__stat">
            <span class="lp-hero__stat-val">24/7</span>
            <span class="lp-hero__stat-lbl">Disponibilidade</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SERVIÇOS ── -->
    <section class="lp-services" id="servicos">
      <div class="lp-section__inner">
        <div class="lp-section__head">
          <p class="lp-tag">O que oferecemos</p>
          <h2>Serviços Especializados</h2>
          <p class="lp-section__sub">Soluções completas para gestão, conformidade e rastreabilidade de Equipamentos de
            Proteção Individual.</p>
        </div>

        <div class="lp-services__list">
          <article v-for="(sv, i) in services" :key="sv.title" class="lp-sv" :data-i="i">
            <div class="lp-sv__visual">
              <div class="lp-sv__visual-bg" :style="{ background: sv.bg }"></div>
              <div class="lp-sv__icon" v-html="sv.icon"></div>
              <div class="lp-sv__visual-pattern"></div>
            </div>
            <div class="lp-sv__body">
              <span class="lp-sv__num">0{{ i + 1 }}</span>
              <h3>{{ sv.title }}</h3>
              <p>{{ sv.desc }}</p>
              <div class="lp-sv__chips">
                <span v-for="c in sv.chips" :key="c" class="lp-sv__chip">{{ c }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── POR QUE NÓS ── -->
    <section class="lp-why" id="porque">
      <div class="lp-section__inner">
        <div class="lp-section__head lp-section__head--light">
          <p class="lp-tag lp-tag--light">Diferenciais</p>
          <h2>Por que nos escolher?</h2>
          <p class="lp-section__sub lp-section__sub--light">Não somos os únicos, mas somos os melhores. Os diferenciais
            estratégicos do SystemACE.</p>
        </div>

        <div class="lp-why__cards">
          <div v-for="c in whyCards" :key="c.title" class="lp-wc">
            <div class="lp-wc__icon-wrap">
              <div class="lp-wc__icon" v-html="c.icon"></div>
            </div>
            <h4>{{ c.title }}</h4>
            <p>{{ c.desc }}</p>
            <div class="lp-wc__stat">
              <span class="lp-wc__stat-val">{{ c.stat }}</span>
              <span class="lp-wc__stat-lbl">{{ c.statLbl }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CONTATO ── -->
    <section class="lp-contact" id="contato">
      <div class="lp-section__inner lp-contact__inner">
        <div class="lp-contact__left">
          <div class="lp-contact__left-bg"></div>
          <div class="lp-contact__left-content">
            <p class="lp-tag lp-tag--onDark">Fale conosco</p>
            <h2>Solicite uma<br>Demonstração</h2>
            <p>Conheça o SystemACE em uma demonstração personalizada. Nossa equipe entrará em contato em até 24 horas.
            </p>
            <div class="lp-contact__info">
              <div class="lp-contact__info-item">
                <div class="lp-contact__info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.5-2-4.5-4.5-4.5z"
                      stroke="currentColor" stroke-width="1.5" />
                    <circle cx="8" cy="6" r="1.8" stroke="currentColor" stroke-width="1.5" />
                  </svg>
                </div>
                <div>
                  <p class="lp-contact__info-lbl">Endereço</p>
                  <p class="lp-contact__info-val">SENAI Roberto Mange — Joinville, SC</p>
                </div>
              </div>
              <div class="lp-contact__info-item">
                <div class="lp-contact__info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5" />
                    <path d="M2 5l6 4 6-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>
                <div>
                  <p class="lp-contact__info-lbl">Email</p>
                  <p class="lp-contact__info-val">contato@systemace.com.br</p>
                </div>
              </div>
              <div class="lp-contact__info-item">
                <div class="lp-contact__info-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
                    <path d="M8 4v4l2.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>
                <div>
                  <p class="lp-contact__info-lbl">Horário</p>
                  <p class="lp-contact__info-val">Seg. a Sex. — 8h às 18h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form class="lp-form" @submit.prevent="enviar">
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
          <button class="lp-btn lp-btn--white lp-btn--full" type="submit">
            Enviar mensagem
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 7.5h9M9 4.5l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </section>

    <!-- ── FOOTER ── -->
    <footer class="lp-footer">
      <div class="lp-section__inner">
        <div class="lp-footer__top">
          <div class="lp-footer__brand-col">
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
            <p class="lp-footer__desc">Central inteligente para gestão estratégica de EPIs. Conformidade,
              rastreabilidade e eficiência em uma única plataforma.</p>
          </div>

          <div v-for="col in footerCols" :key="col.title" class="lp-footer__col">
            <h5>{{ col.title }}</h5>
            <a v-for="l in col.links" :key="l" href="#">{{ l }}</a>
          </div>
        </div>

        <div class="lp-footer__bottom">
          <p>© {{ year }} SystemACE · Desenvolvido por alunos do SENAI Roberto Mange</p>
          <div class="lp-footer__bottom-links">
            <a href="#">Privacidade</a>
            <a href="#">Termos</a>
          </div>
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

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const bars = [
  { name: 'Capacetes', qty: 64, pct: 88, color: '#2563EB' },
  { name: 'Luvas', qty: 52, pct: 72, color: '#10B981' },
  { name: 'Óculos', qty: 38, pct: 52, color: '#8B5CF6' },
  { name: 'Coletes', qty: 44, pct: 61, color: '#F59E0B' },
]

const services = [
  {
    title: 'Auditoria de Conformidade',
    desc: 'Mantenha sua empresa 100% regularizada. O SystemACE monitora automaticamente a validade dos CAs e garante conformidade com as normas do Ministério do Trabalho.',
    chips: ['NR-6', 'Certificado de Aprovação', 'Ministério do Trabalho'],
    bg: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1D4ED8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19l4 4 10-10"/><path d="M32 20v12a3 3 0 01-3 3H11a3 3 0 01-3-3V11a3 3 0 013-3h15"/></svg>`,
  },
  {
    title: 'Assinatura Digital',
    desc: 'Integração total com o ecossistema da sua organização. Automatize a importação de dados de funcionários e a baixa de estoque em tempo real, eliminando retrabalho e centralizando a informação.',
    chips: ['Validade jurídica', 'Sem papel', 'Histórico completo'],
    bg: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 33h15"/><path d="M27.5 6.5a3.5 3.5 0 015 5L12 32 5 33.5 6.5 27z"/></svg>`,
  },
  {
    title: 'Gestão de Sistemas',
    desc: 'Cautelas eletrônicas com validade jurídica. Elimine o arquivo morto e organize o histórico de entregas de forma digital, segura e rastreável.',
    chips: ['Cautelas digitais', 'Rastreabilidade', 'Dashboard em tempo real'],
    bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="32" height="22" rx="3"/><path d="M14 35h12M20 28v7"/></svg>`,
  },
]

const whyCards = [
  {
    title: 'Segurança Jurídica Blindada',
    desc: 'Assinaturas digitais e histórico em tempo real, com prova jurídica incontestável de cada EPI entregue e treinamento.',
    stat: '100%',
    statLbl: 'Conformidade legal',
    icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 5v6c0 5.7 3.9 10.7 9 12 5.1-1.3 9-6.3 9-12V5l-9-3z"/><path d="M9 13l3 3 5-5"/></svg>`,
  },
  {
    title: 'Visibilidade 360° em Tempo Real',
    desc: 'Dashboards intuitivos para saber exatamente quem está protegido, onde seu estoque está e antecipar compras.',
    stat: '24/7',
    statLbl: 'Monitoramento ativo',
    icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="20" height="16" rx="2"/><path d="M3 9h20M8 13v3M13 11v5M18 14v2"/></svg>`,
  },
  {
    title: 'Integração Nativa',
    desc: 'Sincroniza com RH e ERP. Quando um funcionário muda de função, o sistema atualiza automaticamente as necessidades de EPI.',
    stat: '+15',
    statLbl: 'Integrações ativas',
    icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-3 3a4.24 4.24 0 11-6-6l3-3"/><path d="M15 9l3-3a4.24 4.24 0 116 6l-3 3"/><line x1="9" y1="17" x2="17" y2="9"/></svg>`,
  },
  {
    title: 'Eficiência Operacional',
    desc: 'Reduza em até 80% o tempo de entrega de EPIs. Automatize processos burocráticos e foque na estratégia, não no papel.',
    stat: '−80%',
    statLbl: 'Tempo operacional',
    icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="14,2 3,15 13,15 12,24 23,11 13,11"/></svg>`,
  },
]

const footerCols = [
  { title: 'Plataforma', links: ['Auditoria', 'Assinatura Digital', 'Gestão de Sistemas', 'Dashboard'] },
  { title: 'Empresa', links: ['Sobre nós', 'Contato', 'Carreiras'] },
  { title: 'Legal', links: ['Privacidade', 'Termos de Uso', 'LGPD'] },
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
  --c-bg: #FFFFFF;
  --c-bg-alt: #F8FAFC;
  --c-bg-blue: #EFF6FF;
  --c-dark: #0B1326;
  --c-dark2: #0F1B36;
  --c-blue: #2563EB;
  --c-blue2: #1D4ED8;
  --c-blue3: #3B82F6;
  --c-blue4: #60A5FA;
  --c-text: #0B1326;
  --c-text2: #1F2937;
  --c-muted: #64748B;
  --c-muted2: #94A3B8;
  --c-border: #E2E8F0;
  --c-border2: #CBD5E1;
  --c-success: #10B981;
  --r: 14px;
  font-family: 'Inter', 'DM Sans', 'Segoe UI', sans-serif;
  background: var(--c-bg);
  color: var(--c-text);
  overflow-x: hidden;
  letter-spacing: -0.01em;
}

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
  font-family: 'Inter', 'DM Sans', sans-serif;
  letter-spacing: -0.025em;
}

.lp a {
  text-decoration: none;
  color: inherit;
}

/* ─── BUTTONS ─────────────────────────────────────────── */
.lp-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  transition: background .2s, border-color .2s, color .2s, transform .15s, box-shadow .2s;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.lp-btn--primary {
  background: var(--c-blue);
  color: #fff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, .25);
}

.lp-btn--primary:hover {
  background: var(--c-blue2);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, .35);
}

.lp-btn--ghost {
  background: transparent;
  color: var(--c-text2);
  border: 1px solid var(--c-border);
}

.lp-btn--ghost:hover {
  background: var(--c-bg-blue);
  border-color: var(--c-blue3);
  color: var(--c-blue);
}

.lp-btn--outline {
  background: transparent;
  color: var(--c-text2);
  border: 1.5px solid var(--c-border2);
}

.lp-btn--outline:hover {
  border-color: var(--c-blue);
  color: var(--c-blue);
}

.lp-btn--white {
  background: #fff;
  color: var(--c-blue2);
  box-shadow: 0 4px 14px rgba(0, 0, 0, .12);
}

.lp-btn--white:hover {
  background: var(--c-bg-alt);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, .18);
}

.lp-btn--lg {
  font-size: 15px;
  padding: 14px 28px;
  border-radius: 12px;
}

.lp-btn--full {
  width: 100%;
  justify-content: center;
  padding: 15px;
  font-size: 15px;
  border-radius: 12px;
}

/* ─── NAV ─────────────────────────────────────────────── */
.lp-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 0 64px;
  transition: background .3s, border-color .3s, backdrop-filter .3s, box-shadow .3s;
  border-bottom: 1px solid transparent;
}

.lp-nav--scrolled {
  background: rgba(255, 255, 255, .85);
  backdrop-filter: blur(20px) saturate(1.4);
  border-color: var(--c-border);
  box-shadow: 0 1px 0 rgba(0, 0, 0, .02);
}

.lp-nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 24px;
}

.lp-nav__brand {
  display: flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
}

.lp-nav__logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(140deg, var(--c-blue), var(--c-blue2));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(37, 99, 235, .28);
}

.lp-nav__name {
  font-weight: 700;
  font-size: 15.5px;
  line-height: 1.2;
  color: var(--c-text);
}

.lp-nav__sub {
  font-size: 9px;
  color: var(--c-muted);
  letter-spacing: 2.2px;
  line-height: 1;
  font-weight: 600;
}

.lp-nav__links {
  display: flex;
  gap: 32px;
}

.lp-nav__links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-muted);
  transition: color .2s;
  position: relative;
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
  position: relative;
  padding: 130px 64px 100px;
  overflow: hidden;
  background: var(--c-bg);
}

.lp-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.lp-hero__bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(37, 99, 235, .04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, .04) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent);
}

.lp-hero__bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}

.lp-hero__bg-glow--1 {
  width: 600px;
  height: 500px;
  top: -200px;
  right: -100px;
  background: radial-gradient(ellipse, rgba(37, 99, 235, .12) 0%, transparent 70%);
}

.lp-hero__bg-glow--2 {
  width: 500px;
  height: 400px;
  top: 200px;
  left: -150px;
  background: radial-gradient(ellipse, rgba(56, 189, 248, .08) 0%, transparent 70%);
}

.lp-hero__inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.lp-hero__top {
  max-width: 720px;
  margin: 0 auto 56px;
  text-align: center;
}

.lp-hero__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--c-bg-blue);
  border: 1px solid rgba(37, 99, 235, .18);
  padding: 7px 16px;
  border-radius: 100px;
  font-size: 13px;
  color: var(--c-blue2);
  font-weight: 600;
  margin-bottom: 24px;
  animation: lpFadeUp .6s ease both;
}

.lp-hero__pill-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-blue);
  animation: lpPulse 2.4s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(37, 99, 235, .6);
}

.lp-hero__h1 {
  font-size: clamp(40px, 5.5vw, 72px);
  font-weight: 800;
  line-height: 1.04;
  margin-bottom: 22px;
  animation: lpFadeUp .6s .08s ease both;
}

.lp-hero__h1 em {
  font-style: normal;
  background: linear-gradient(130deg, var(--c-blue) 0%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.lp-hero__desc {
  font-size: 17px;
  color: var(--c-muted);
  line-height: 1.7;
  max-width: 580px;
  margin: 0 auto 36px;
  animation: lpFadeUp .6s .16s ease both;
}

.lp-hero__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  animation: lpFadeUp .6s .24s ease both;
}

/* showcase */
.lp-hero__showcase {
  position: relative;
  border-radius: 22px;
  overflow: visible;
  animation: lpFadeUp .6s .32s ease both;
  margin-bottom: 64px;
}

.lp-hero__media {
  width: 100%;
  height: 420px;
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 30px 70px rgba(15, 27, 54, .18), 0 0 0 1px rgba(0, 0, 0, .04);
}

.lp-hero__svg {
  width: 100%;
  height: 100%;
  display: block;
}

.lp-hero__media-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(11, 19, 38, .4) 100%);
  pointer-events: none;
}

.lp-hero__floating {
  position: absolute;
  bottom: -50px;
  right: 32px;
  width: 380px;
  z-index: 2;
  animation: lpFloatY 6s ease-in-out infinite;
}

/* dashboard mock card */
.lp-dash {
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 30px 60px rgba(15, 27, 54, .15);
}

.lp-dash__top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.lp-dash__traffic {
  display: flex;
  gap: 5px;
}

.lp-dash__traffic-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.lp-dash__traffic-dot--red {
  background: #EF4444;
}

.lp-dash__traffic-dot--yellow {
  background: #F59E0B;
}

.lp-dash__traffic-dot--green {
  background: #10B981;
}

.lp-dash__label {
  font-size: 12px;
  color: var(--c-muted);
  margin-left: 4px;
  flex: 1;
  font-weight: 500;
}

.lp-dash__live {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: var(--c-success);
  font-weight: 600;
}

.lp-dash__live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-success);
  animation: lpPulse 1.6s infinite;
}

.lp-dash__kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 18px;
}

.lp-dash__kpi {
  background: var(--c-bg-alt);
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 11px 8px;
  text-align: center;
}

.lp-dash__kpi-val {
  display: block;
  font-size: 22px;
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.02em;
}

.lp-dash__kpi-val--green {
  color: var(--c-success);
}

.lp-dash__kpi-val--blue {
  color: var(--c-blue);
}

.lp-dash__kpi-lbl {
  font-size: 10.5px;
  color: var(--c-muted);
  margin-top: 2px;
  font-weight: 500;
}

.lp-dash__bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.lp-dash__bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lp-dash__bar-name {
  font-size: 11.5px;
  color: var(--c-muted);
  min-width: 60px;
  font-weight: 500;
}

.lp-dash__bar-track {
  flex: 1;
  height: 5px;
  background: var(--c-bg-alt);
  border-radius: 3px;
  overflow: hidden;
}

.lp-dash__bar-fill {
  height: 100%;
  border-radius: 3px;
}

.lp-dash__bar-qty {
  font-size: 11px;
  color: var(--c-text2);
  min-width: 20px;
  text-align: right;
  font-weight: 600;
}

.lp-dash__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, .08);
  border: 1px solid rgba(16, 185, 129, .2);
  color: var(--c-success);
  font-size: 11px;
  font-weight: 600;
  padding: 6px 11px;
  border-radius: 7px;
}

/* hero stats bottom */
.lp-hero__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  padding: 28px 0;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  animation: lpFadeUp .6s .4s ease both;
}

.lp-hero__stat {
  text-align: center;
  padding: 0 24px;
  border-right: 1px solid var(--c-border);
}

.lp-hero__stat:last-child {
  border-right: none;
}

.lp-hero__stat-val {
  display: block;
  font-size: 32px;
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.03em;
}

.lp-hero__stat-lbl {
  display: block;
  font-size: 12.5px;
  color: var(--c-muted);
  margin-top: 4px;
  font-weight: 500;
}

/* ─── COMMON SECTION ─────────────────────────────────── */
.lp-section__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.lp-section__head {
  text-align: center;
  margin-bottom: 64px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.lp-section__head h2 {
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--c-text);
}

.lp-section__sub {
  font-size: 17px;
  color: var(--c-muted);
  line-height: 1.7;
}

.lp-section__head--light h2 {
  color: var(--c-text);
}

.lp-section__sub--light {
  color: var(--c-muted);
}

.lp-tag {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--c-blue);
  margin-bottom: 16px;
  display: inline-block;
}

.lp-tag--light {
  color: var(--c-blue2);
}

.lp-tag--onDark {
  color: var(--c-blue4);
}

/* ─── SERVIÇOS ────────────────────────────────────────── */
.lp-services {
  padding: 110px 64px;
  background: var(--c-bg);
}

.lp-services__list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.lp-sv {
  display: grid;
  grid-template-columns: 280px 1fr;
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: 20px;
  overflow: hidden;
  transition: border-color .3s, transform .3s, box-shadow .3s;
}

.lp-sv:hover {
  border-color: var(--c-blue3);
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(15, 27, 54, .08);
}

.lp-sv__visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 220px;
}

.lp-sv__visual-bg {
  position: absolute;
  inset: 0;
}

.lp-sv__visual-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, .6) 1px, transparent 0);
  background-size: 20px 20px;
  opacity: .4;
}

.lp-sv__icon {
  position: relative;
  z-index: 1;
  width: 88px;
  height: 88px;
  border-radius: 22px;
  background: rgba(255, 255, 255, .95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 30px rgba(15, 27, 54, .12);
}

.lp-sv__body {
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  position: relative;
}

.lp-sv__num {
  position: absolute;
  top: 24px;
  right: 32px;
  font-size: 13px;
  font-weight: 700;
  color: var(--c-muted2);
  letter-spacing: 1.5px;
}

.lp-sv__body h3 {
  font-size: 22px;
  font-weight: 700;
  color: var(--c-text);
}

.lp-sv__body p {
  font-size: 15px;
  color: var(--c-muted);
  line-height: 1.7;
}

.lp-sv__chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.lp-sv__chip {
  font-size: 12px;
  color: var(--c-text2);
  font-weight: 500;
  background: var(--c-bg-alt);
  border: 1px solid var(--c-border);
  padding: 5px 11px;
  border-radius: 7px;
}

/* ─── POR QUE NÓS ─────────────────────────────────────── */
.lp-why {
  padding: 110px 64px;
  background: linear-gradient(180deg, var(--c-bg-blue) 0%, #DBEAFE 100%);
  position: relative;
  overflow: hidden;
}

.lp-why::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(37, 99, 235, .05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, .05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
}

.lp-why .lp-section__inner {
  position: relative;
  z-index: 1;
}

.lp-why__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.lp-wc {
  background: var(--c-dark);
  border-radius: 18px;
  padding: 28px;
  position: relative;
  overflow: hidden;
  transition: transform .3s, box-shadow .3s;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lp-wc::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--c-blue3), #06B6D4);
}

.lp-wc::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(37, 99, 235, .18) 0%, transparent 70%);
  pointer-events: none;
}

.lp-wc:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 50px rgba(11, 19, 38, .3);
}

.lp-wc__icon-wrap {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--c-blue) 0%, var(--c-blue2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(37, 99, 235, .4);
}

.lp-wc h4 {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.35;
  min-height: 44px;
}

.lp-wc p {
  font-size: 13.5px;
  color: rgba(255, 255, 255, .65);
  line-height: 1.7;
  flex: 1;
}

.lp-wc__stat {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, .08);
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.lp-wc__stat-val {
  font-size: 22px;
  font-weight: 800;
  color: var(--c-blue4);
  letter-spacing: -0.02em;
}

.lp-wc__stat-lbl {
  font-size: 11.5px;
  color: rgba(255, 255, 255, .5);
}

/* ─── CONTATO ─────────────────────────────────────────── */
.lp-contact {
  padding: 110px 64px;
  background: var(--c-bg);
}

.lp-contact__inner {
  display: grid;
  grid-template-columns: 1.05fr 1.2fr;
  gap: 0;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(15, 27, 54, .15);
}

.lp-contact__left {
  position: relative;
  min-height: 600px;
  overflow: hidden;
}

.lp-contact__left-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(37, 99, 235, .4) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(6, 182, 212, .3) 0%, transparent 50%),
    linear-gradient(135deg, var(--c-dark) 0%, var(--c-dark2) 100%);
}

.lp-contact__left-content {
  position: relative;
  z-index: 1;
  padding: 56px 48px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.lp-contact__left-content h2 {
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
}

.lp-contact__left-content>p {
  font-size: 15.5px;
  color: rgba(255, 255, 255, .7);
  line-height: 1.7;
}

.lp-contact__info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: auto;
}

.lp-contact__info-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, .08);
}

.lp-contact__info-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, .08);
  border: 1px solid rgba(255, 255, 255, .12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--c-blue4);
}

.lp-contact__info-lbl {
  font-size: 11px;
  color: rgba(255, 255, 255, .5);
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 3px;
}

.lp-contact__info-val {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.lp-form {
  background: #fff;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lp-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.lp-form__group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.lp-form__group label {
  font-size: 12.5px;
  color: var(--c-text2);
  font-weight: 600;
}

.lp-form__group input,
.lp-form__group textarea {
  background: #fff;
  border: 1.5px solid var(--c-border);
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--c-text);
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}

.lp-form__group input:focus,
.lp-form__group textarea:focus {
  border-color: var(--c-blue);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, .1);
}

.lp-form__group input::placeholder,
.lp-form__group textarea::placeholder {
  color: var(--c-muted2);
}

.lp-form__group textarea {
  min-height: 110px;
  resize: vertical;
}

.lp-form .lp-btn {
  margin-top: 6px;
  background: var(--c-blue);
  color: #fff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, .25);
}

.lp-form .lp-btn:hover {
  background: var(--c-blue2);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, .35);
}

/* ─── FOOTER ──────────────────────────────────────────── */
.lp-footer {
  background: var(--c-dark);
  padding: 72px 64px 32px;
  position: relative;
  overflow: hidden;
}

.lp-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--c-blue3), transparent);
}

.lp-footer__top {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 56px;
  margin-bottom: 48px;
}

.lp-footer__brand {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 18px;
}

.lp-footer__brand .lp-nav__name {
  color: #fff;
}

.lp-footer__brand .lp-nav__sub {
  color: rgba(255, 255, 255, .5);
}

.lp-footer__desc {
  font-size: 14px;
  color: rgba(255, 255, 255, .6);
  line-height: 1.7;
  max-width: 320px;
}

.lp-footer__col h5 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #fff;
  letter-spacing: 0.3px;
}

.lp-footer__col a {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, .55);
  margin-bottom: 11px;
  transition: color .2s;
}

.lp-footer__col a:hover {
  color: #fff;
}

.lp-footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, .08);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lp-footer__bottom p {
  font-size: 12.5px;
  color: rgba(255, 255, 255, .4);
}

.lp-footer__bottom-links {
  display: flex;
  gap: 24px;
}

.lp-footer__bottom-links a {
  font-size: 12.5px;
  color: rgba(255, 255, 255, .4);
  transition: color .2s;
}

.lp-footer__bottom-links a:hover {
  color: #fff;
}

/* ─── KEYFRAMES ──────────────────────────────────────── */
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

@keyframes lpFloatY {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 1100px) {
  .lp-hero__floating {
    position: relative;
    right: auto;
    bottom: auto;
    margin: -40px auto 0;
  }

  .lp-why__cards {
    grid-template-columns: 1fr 1fr;
  }

  .lp-contact__inner {
    grid-template-columns: 1fr;
  }

  .lp-footer__top {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .lp-footer__brand-col {
    grid-column: 1 / -1;
  }
}

@media (max-width: 820px) {
  .lp-nav {
    padding: 0 20px;
  }

  .lp-nav__links {
    display: none;
  }

  .lp-hero {
    padding: 110px 20px 80px;
  }

  .lp-hero__media {
    height: 280px;
  }

  .lp-hero__floating {
    width: 320px;
  }

  .lp-hero__stats {
    grid-template-columns: 1fr 1fr;
  }

  .lp-hero__stat:nth-child(2) {
    border-right: none;
  }

  .lp-hero__stat:nth-child(1),
  .lp-hero__stat:nth-child(2) {
    border-bottom: 1px solid var(--c-border);
    padding-bottom: 20px;
  }

  .lp-hero__stat:nth-child(3),
  .lp-hero__stat:nth-child(4) {
    padding-top: 20px;
  }

  .lp-services,
  .lp-why,
  .lp-contact {
    padding: 80px 20px;
  }

  .lp-sv {
    grid-template-columns: 1fr;
  }

  .lp-sv__visual {
    min-height: 180px;
  }

  .lp-sv__body {
    padding: 28px 24px;
  }

  .lp-why__cards {
    grid-template-columns: 1fr;
  }

  .lp-contact__left-content,
  .lp-form {
    padding: 32px 24px;
  }

  .lp-form__row {
    grid-template-columns: 1fr;
  }

  .lp-footer {
    padding: 56px 20px 28px;
  }

  .lp-footer__top {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .lp-footer__bottom {
    flex-direction: column;
    gap: 12px;
  }
}
</style>

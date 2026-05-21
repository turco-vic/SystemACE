<template>
  <div class="home">

    <!-- NAV -->
    <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
      <div class="nav__inner">
        <div class="nav__brand" @click="$router.push('/')">
          <div class="nav__logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" />
              <circle cx="12" cy="13" r="2.5" fill="none" stroke="white" stroke-width="1.5" />
            </svg>
          </div>
          <div>
            <p class="nav__name">SystemACE</p>
            <p class="nav__sub">EPI DASHBOARD</p>
          </div>
        </div>

        <div class="nav__links">
          <router-link to="/" exact-active-class="nav__link--active">Início</router-link>
          <router-link to="/sobre" active-class="nav__link--active">Sobre</router-link>
          <router-link to="/contato" active-class="nav__link--active">Contato</router-link>
        </div>

        <div class="nav__ctas">
          <button class="btn btn--ghost" @click="$router.push('/cadastro')">Cadastrar</button>
          <button class="btn btn--primary" @click="$router.push('/login')">Entrar</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero__inner">
        <div class="hero__image">
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80" alt="Equipe trabalhando" />
          <div class="hero__overlay"></div>

          <div class="hero__card">
            <h1>Boas-vindas ao <span>SystemACE</span></h1>
            <p>
              Sua central inteligente para gestão estratégica de EPIs.
              Monitore conformidades, controle estoques e garanta a segurança
              da sua equipe com dados em tempo real — o controle que você precisa,
              com a agilidade que sua operação exige.
            </p>
          </div>
        </div>

        <button class="hero__cta" @click="scrollToSection('porque')">
          Por que nos escolher?
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </section>

    <!-- SERVIÇOS -->
    <section class="services" id="servicos">
      <div class="services__inner">
        <h2 class="services__title">Serviços Especializados</h2>

        <div class="services__list">
          <article v-for="sv in services" :key="sv.title" class="sv">
            <div class="sv__img">
              <img :src="sv.img" :alt="sv.title" />
            </div>
            <div class="sv__body">
              <h3>{{ sv.title }}</h3>
              <p>{{ sv.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- POR QUE NOS ESCOLHER -->
    <section class="why" id="porque">
      <div class="why__inner">
        <div class="why__head">
          <h2>Por que nos escolher?</h2>
          <p>Não somos os únicos, mas somos os melhores. Os diferenciais estratégicos do SystemACE para o sucesso real
            da sua gestão.</p>
        </div>

        <div class="why__cards">
          <div v-for="c in whyCards" :key="c.title" class="wc">
            <h4>{{ c.title }}</h4>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRÉVIA CONTATO -->
    <section class="cta-contact">
      <div class="cta-contact__inner">
        <div class="cta-contact__image">
          <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80" alt="Equipe SystemACE" />
          <div class="cta-contact__overlay"></div>
          <div class="cta-contact__content">
            <h2>Fale conosco e solicite uma demonstração</h2>
            <p>Conheça o SystemACE em uma demonstração personalizada. Nossa equipe entra em contato em até 24 horas.</p>
            <button class="btn btn--white btn--lg" @click="$router.push('/contato')">
              Ir para Contato
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 5l3 3-3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <Footer />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Footer from '../components/Footer.vue'

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const services = [
  {
    title: 'Auditoria de Conformidade',
    desc: 'Mantenha sua empresa 100% regularizada. O SystemACE monitora automaticamente a validade dos CAs e garante que cada entrega esteja em total conformidade com as normas do Ministério do Trabalho.',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
  },
  {
    title: 'Assinatura Digital',
    desc: 'Integração total com o ecossistema da sua organização. Automatize a importação de dados de funcionários e a baixa de estoque em tempo real, eliminando o retrabalho e centralizando a informação.',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  },
  {
    title: 'Gestão de Sistemas',
    desc: 'Gestão de cautelas eletrônicas com validade jurídica. Elimine o arquivo morto e organize o histórico de entregas de forma digital, segura e rastreável.',
    img: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=800&q=80',
  },
]

const whyCards = [
  {
    title: 'Segurança Jurídica "Blindada"',
    desc: 'Proteja sua empresa contra passivos trabalhistas. Com assinaturas digitais e histórico em tempo real, você tem prova jurídica incontestável de cada EPI entregue e treinado.',
  },
  {
    title: 'Visibilidade 360° em Tempo Real',
    desc: 'Dashboards intuitivos que mostram exatamente quem está protegido, onde seu estoque está e que falta comprar. Antecipe seu orçamento de segurança.',
  },
  {
    title: 'Integração Nativa',
    desc: 'Gestão de Sistemas que existe para sua empresa. Sincroniza dados de funcionários da sua empresa. Quando um funcionário muda de função, o sistema atualiza a necessidade de EPI automaticamente.',
  },
  {
    title: 'Eficiência Operacional (Adeus ao Papel)',
    desc: 'Reduza em até 80% o tempo de entrega de equipamentos. Automatize processos burocráticos e foque na estratégia, não no preenchimento de formulários.',
  },
]
</script>

<style scoped>
/* TOKENS */
.home {
  --c-dark: #1E3D58;
  --c-light: #43B0F1;
  --c-bg: #F5F5F0;
  --c-bg2: #FFFFFF;
  --c-text: #1E3D58;
  --c-muted: #5A7187;
  --c-border: #E2E5EA;
  font-family: 'Inter', 'DM Sans', 'Segoe UI', sans-serif;
  background: var(--c-bg);
  color: var(--c-text);
  min-height: 100vh;
  letter-spacing: -0.01em;
}

.home *,
.home *::before,
.home *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.home a {
  text-decoration: none;
  color: inherit;
}

.home h1,
.home h2,
.home h3,
.home h4 {
  font-family: inherit;
  letter-spacing: -0.02em;
  color: var(--c-text);
}

/* BUTTONS */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 999px;
  cursor: pointer;
  border: none;
  transition: background .2s, color .2s, transform .15s, box-shadow .2s, border-color .2s;
  white-space: nowrap;
}

.btn--primary {
  background: var(--c-light);
  color: #fff;
  box-shadow: 0 4px 14px rgba(67, 176, 241, .32);
}

.btn--primary:hover {
  background: #2E9BDF;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(67, 176, 241, .4);
}

.btn--ghost {
  background: transparent;
  color: var(--c-text);
  border: 1px solid var(--c-border);
}

.btn--ghost:hover {
  border-color: var(--c-light);
  color: var(--c-light);
}

.btn--white {
  background: #fff;
  color: var(--c-dark);
  box-shadow: 0 6px 20px rgba(0, 0, 0, .18);
}

.btn--white:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, .22);
}

.btn--lg {
  font-size: 15px;
  padding: 13px 28px;
}

/* NAV */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 0 60px;
  transition: background .3s, border-color .3s, backdrop-filter .3s;
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: rgba(245, 245, 240, .92);
  backdrop-filter: blur(20px) saturate(1.4);
  border-color: var(--c-border);
}

.nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: 24px;
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
}

.nav__logo {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(140deg, var(--c-dark) 0%, #2A567C 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(30, 61, 88, .25);
}

.nav__name {
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2;
  color: var(--c-text);
}

.nav__sub {
  font-size: 9px;
  color: var(--c-muted);
  letter-spacing: 2.2px;
  font-weight: 600;
}

.nav__links {
  display: flex;
  gap: 36px;
}

.nav__links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-muted);
  transition: color .2s;
  position: relative;
  padding: 4px 0;
}

.nav__links a:hover {
  color: var(--c-text);
}

.nav__link--active {
  color: var(--c-text) !important;
}

.nav__link--active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--c-light);
  border-radius: 2px;
}

.nav__ctas {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* HERO */
.hero {
  padding: 110px 60px 60px;
}

.hero__inner {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.hero__image {
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 5px solid var(--c-light);
  box-shadow: 0 20px 50px rgba(30, 61, 88, .18);
}

.hero__image img {
  width: 100%;
  height: 460px;
  object-fit: cover;
  display: block;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(30, 61, 88, .15) 0%, rgba(30, 61, 88, .55) 100%);
}

.hero__card {
  position: absolute;
  bottom: 32px;
  left: 32px;
  max-width: 460px;
  background: rgba(255, 255, 255, .96);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: 26px 28px;
  box-shadow: 0 12px 32px rgba(30, 61, 88, .18);
}

.hero__card h1 {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 12px;
}

.hero__card h1 span {
  color: var(--c-light);
}

.hero__card p {
  font-size: 14.5px;
  color: var(--c-muted);
  line-height: 1.7;
}

.hero__cta {
  margin-top: 36px;
  background: var(--c-light);
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 36px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(67, 176, 241, .35);
  transition: background .2s, transform .15s, box-shadow .2s;
}

.hero__cta:hover {
  background: #2E9BDF;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(67, 176, 241, .45);
}

/* SERVIÇOS */
.services {
  padding: 90px 60px;
  background: var(--c-bg);
}

.services__inner {
  max-width: 1180px;
  margin: 0 auto;
}

.services__title {
  text-align: center;
  font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 800;
  margin-bottom: 56px;
}

.services__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.sv {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(30, 61, 88, .08);
  transition: transform .3s, box-shadow .3s;
  display: flex;
  flex-direction: column;
}

.sv:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(30, 61, 88, .14);
}

.sv__img {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.sv__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .5s;
}

.sv:hover .sv__img img {
  transform: scale(1.05);
}

.sv__body {
  padding: 24px 26px 28px;
}

.sv__body h3 {
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 12px;
}

.sv__body p {
  font-size: 14px;
  color: var(--c-muted);
  line-height: 1.7;
}

/* POR QUE */
.why {
  padding: 90px 60px;
  background: var(--c-light);
  position: relative;
}

.why__inner {
  max-width: 1180px;
  margin: 0 auto;
}

.why__head {
  text-align: center;
  margin-bottom: 48px;
}

.why__head h2 {
  font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 800;
  color: #fff;
  margin-bottom: 14px;
}

.why__head p {
  font-size: 16px;
  color: rgba(255, 255, 255, .88);
  line-height: 1.65;
  max-width: 660px;
  margin: 0 auto;
}

.why__cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.wc {
  background: var(--c-dark);
  border-radius: 14px;
  padding: 26px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform .3s, box-shadow .3s;
}

.wc:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(30, 61, 88, .32);
}

.wc h4 {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.35;
}

.wc p {
  font-size: 13.5px;
  color: rgba(255, 255, 255, .72);
  line-height: 1.65;
}

/* CTA CONTATO */
.cta-contact {
  padding: 80px 60px;
  background: var(--c-bg);
}

.cta-contact__inner {
  max-width: 1180px;
  margin: 0 auto;
}

.cta-contact__image {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 5px solid var(--c-light);
  box-shadow: 0 20px 50px rgba(30, 61, 88, .2);
}

.cta-contact__image img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
}

.cta-contact__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(30, 61, 88, .78) 0%, rgba(30, 61, 88, .55) 100%);
}

.cta-contact__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 60px;
  max-width: 600px;
}

.cta-contact__content h2 {
  font-size: clamp(24px, 2.6vw, 34px);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 14px;
}

.cta-contact__content p {
  font-size: 15.5px;
  color: rgba(255, 255, 255, .85);
  line-height: 1.65;
  margin-bottom: 24px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .services__list {
    grid-template-columns: 1fr 1fr;
  }

  .why__cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .nav {
    padding: 0 20px;
  }

  .nav__links {
    display: none;
  }

  .hero {
    padding: 96px 20px 50px;
  }

  .hero__image img {
    height: 380px;
  }

  .hero__card {
    bottom: 20px;
    left: 20px;
    right: 20px;
    padding: 20px;
  }

  .hero__card h1 {
    font-size: 22px;
  }

  .services,
  .why,
  .cta-contact {
    padding: 70px 20px;
  }

  .services__list,
  .why__cards {
    grid-template-columns: 1fr;
  }

  .cta-contact__image img {
    height: 460px;
  }

  .cta-contact__content {
    padding: 28px 24px;
  }
}

</style>

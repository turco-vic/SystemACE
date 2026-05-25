<template>
    <div class="sobre">

        <!-- NAV -->
        <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
            <div class="nav__inner">
                <div class="nav__brand" @click="$router.push('/')">
                    <div class="nav__logo">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                                fill="white" />
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
                <p class="hero__tag">Quem somos</p>
                <h1>Modernizando a gestão de EPIs no <span>SENAI Roberto Mange</span></h1>
                <p class="hero__desc">
                    O SystemACE nasceu para substituir métodos manuais e arcaicos de controle
                    de Equipamentos de Proteção Individual por uma solução digital, segura
                    e rastreável, garantindo a integridade física dos usuários e a conformidade
                    legal da instituição.
                </p>
            </div>
        </section>

        <!-- MISSÃO / VISÃO / VALORES -->
        <section class="mvv">
            <div class="mvv__inner">
                <div v-for="m in mvv" :key="m.title" class="mvv-card">
                    <div class="mvv-card__icon" v-html="m.icon"></div>
                    <h3>{{ m.title }}</h3>
                    <p>{{ m.desc }}</p>
                </div>
            </div>
        </section>

        <!-- HISTÓRIA -->
        <section class="history">
            <div class="history__inner">
                <div class="history__text">
                    <p class="tag">Nossa história</p>
                    <h2>De ideia acadêmica<br>a solução real</h2>
                    <p>
                        O SystemACE é um projeto desenvolvido por alunos do SENAI Roberto Mange — Joinville/SC,
                        como resposta a uma necessidade observada na própria instituição: a ausência de um
                        sistema formal de controle de EPIs gerava desorganização, riscos à segurança e
                        exposição jurídica.
                    </p>
                    <p>
                        Mais que um trabalho acadêmico, o sistema foi pensado para resolver um problema
                        real, em conformidade com a <strong>NR-6</strong> e a <strong>LGPD</strong>,
                        unindo tecnologia, segurança e responsabilidade institucional.
                    </p>
                </div>
                <div class="history__image">
                    <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1000&q=80" alt="SENAI" />
                </div>
            </div>
        </section>

        <!-- PROBLEMAS RESOLVIDOS -->
        <section class="problems">
            <div class="problems__inner">
                <div class="problems__head">
                    <p class="tag tag--light">Problemas que resolvemos</p>
                    <h2>O que muda com o SystemACE</h2>
                </div>
                <div class="problems__grid">
                    <div v-for="p in problems" :key="p.problem" class="prob">
                        <div class="prob__row">
                            <span class="prob__label prob__label--bad">Antes</span>
                            <p>{{ p.problem }}</p>
                        </div>
                        <div class="prob__divider"></div>
                        <div class="prob__row">
                            <span class="prob__label prob__label--good">Depois</span>
                            <p>{{ p.solution }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- USUÁRIOS -->
        <section class="users">
            <div class="users__inner">
                <div class="users__head">
                    <p class="tag">Para quem foi feito</p>
                    <h2>Três perfis, uma plataforma</h2>
                    <p>Cada usuário acessa o que precisa — sem permissões desnecessárias.</p>
                </div>
                <div class="users__grid">
                    <div v-for="u in users" :key="u.role" class="user">
                        <div class="user__icon" :style="{ background: u.color }">{{ u.emoji }}</div>
                        <h3>{{ u.role }}</h3>
                        <ul>
                            <li v-for="perm in u.permissions" :key="perm">{{ perm }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- TEAM / CTA -->
        <section class="team-cta">
            <div class="team-cta__inner">
                <div class="team-cta__box">
                    <h2>Quer conhecer o SystemACE de perto?</h2>
                    <p>Entre em contato com nossa equipe e descubra como podemos modernizar a gestão de EPIs da sua
                        instituição.</p>
                    <div class="team-cta__actions">
                        <button class="btn btn--white btn--lg" @click="$router.push('/contato')">
                            Falar com a equipe
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 5l3 3-3 3" stroke="currentColor" stroke-width="1.8"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <router-link to="/" class="btn btn--ghost-light btn--lg">Voltar ao início</router-link>
                    </div>
                </div>
            </div>
        </section>

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

const mvv = [
    {
        title: 'Missão',
        desc: 'Digitalizar e simplificar o controle de EPIs, garantindo segurança, conformidade e eficiência para instituições de todos os portes.',
        icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="13" r="10"/><circle cx="13" cy="13" r="6"/><circle cx="13" cy="13" r="2" fill="currentColor"/></svg>`,
    },
    {
        title: 'Visão',
        desc: 'Ser referência nacional em gestão digital de Equipamentos de Proteção Individual em instituições de ensino e pequenas indústrias.',
        icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 13s4.5-8 12-8 12 8 12 8-4.5 8-12 8-12-8-12-8z"/><circle cx="13" cy="13" r="3.5"/></svg>`,
    },
    {
        title: 'Valores',
        desc: 'Segurança em primeiro lugar, transparência, responsabilidade legal, simplicidade e respeito ao usuário e seus dados (LGPD).',
        icon: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 5v7c0 5.7 3.9 10.7 9 12 5.1-1.3 9-6.3 9-12V5l-9-3z"/></svg>`,
    },
]

const problems = [
    { problem: 'Equipamentos perdidos ou extraviados.', solution: 'Registro digital com histórico completo de cada movimentação.' },
    { problem: 'Reposição ineficiente e custos elevados.', solution: 'Gestão de estoque automatizada com alertas de nível crítico.' },
    { problem: 'Riscos de segurança e acidentes.', solution: 'Solicitação e aprovação digitalizada, rastreável por usuário.' },
    { problem: 'Multas e problemas jurídicos.', solution: 'Conformidade com normas (NR-6) e validade jurídica das entregas.' },
    { problem: 'Retrabalho e erros humanos.', solution: 'Fluxo digital e automatizado, fim do papel e do arquivo morto.' },
    { problem: 'Falta de visibilidade gerencial.', solution: 'Dashboard com métricas em tempo real e exportação de relatórios.' },
]

const users = [
    {
        role: 'Funcionário (Admin)',
        emoji: '👷',
        color: 'linear-gradient(135deg, #1E3D58 0%, #2A567C 100%)',
        permissions: ['CRUD completo de EPIs', 'Validação e controle de estoque', 'Geração de relatórios', 'Gerenciamento de usuários'],
    },
    {
        role: 'Professor',
        emoji: '👨‍🏫',
        color: 'linear-gradient(135deg, #43B0F1 0%, #2E9BDF 100%)',
        permissions: ['Visualização e uso de EPIs', 'Aprovação de solicitações', 'Histórico de uso pessoal'],
    },
    {
        role: 'Aluno',
        emoji: '🧑‍🎓',
        color: 'linear-gradient(135deg, #5A7187 0%, #3D5468 100%)',
        permissions: ['Visualizar EPIs disponíveis', 'Solicitar empréstimo', 'Acompanhar status'],
    },
]
</script>

<style scoped>
.sobre {
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

.sobre *,
.sobre *::before,
.sobre *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.sobre a {
    text-decoration: none;
    color: inherit;
}

.sobre h1,
.sobre h2,
.sobre h3,
.sobre h4 {
    letter-spacing: -0.02em;
    color: var(--c-text);
}

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

.btn--ghost-light {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, .3);
}

.btn--ghost-light:hover {
    border-color: #fff;
}

.btn--white {
    background: #fff;
    color: var(--c-dark);
    box-shadow: 0 6px 20px rgba(0, 0, 0, .18);
}

.btn--white:hover {
    transform: translateY(-1px);
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
    backdrop-filter: blur(20px);
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
}

.tag {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--c-light);
    margin-bottom: 14px;
    display: inline-block;
}

.tag--light {
    color: rgba(255, 255, 255, .85);
}

/* HERO */
.hero {
    padding: 140px 60px 80px;
    text-align: center;
}

.hero__inner {
    max-width: 800px;
    margin: 0 auto;
}

.hero__tag {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--c-light);
    margin-bottom: 18px;
}

.hero h1 {
    font-size: clamp(36px, 4.5vw, 56px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 22px;
}

.hero h1 span {
    color: var(--c-light);
}

.hero__desc {
    font-size: 17px;
    color: var(--c-muted);
    line-height: 1.7;
}

/* MVV */
.mvv {
    padding: 30px 60px 80px;
}

.mvv__inner {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.mvv-card {
    background: #fff;
    border-radius: 16px;
    padding: 32px 28px;
    box-shadow: 0 8px 24px rgba(30, 61, 88, .06);
    transition: transform .3s, box-shadow .3s;
}

.mvv-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(30, 61, 88, .12);
}

.mvv-card__icon {
    width: 52px;
    height: 52px;
    border-radius: 13px;
    background: rgba(67, 176, 241, .12);
    color: var(--c-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
}

.mvv-card h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
}

.mvv-card p {
    font-size: 14px;
    color: var(--c-muted);
    line-height: 1.7;
}

/* HISTORY */
.history {
    padding: 80px 60px;
    background: #fff;
}

.history__inner {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 60px;
    align-items: center;
}

.history__text h2 {
    font-size: clamp(28px, 3.2vw, 40px);
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 20px;
}

.history__text p {
    font-size: 15.5px;
    color: var(--c-muted);
    line-height: 1.75;
    margin-bottom: 14px;
}

.history__text p strong {
    color: var(--c-text);
    font-weight: 600;
}

.history__image {
    border-radius: 18px;
    overflow: hidden;
    border: 5px solid var(--c-light);
    box-shadow: 0 16px 40px rgba(30, 61, 88, .16);
}

.history__image img {
    width: 100%;
    height: 380px;
    object-fit: cover;
    display: block;
}

/* PROBLEMS */
.problems {
    padding: 90px 60px;
    background: var(--c-dark);
}

.problems__inner {
    max-width: 1180px;
    margin: 0 auto;
}

.problems__head {
    text-align: center;
    margin-bottom: 48px;
}

.problems__head h2 {
    font-size: clamp(28px, 3.2vw, 40px);
    font-weight: 800;
    color: #fff;
}

.problems__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}

.prob {
    background: rgba(255, 255, 255, .05);
    border: 1px solid rgba(255, 255, 255, .1);
    border-radius: 14px;
    padding: 22px;
}

.prob__row {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.prob__label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 6px;
    width: fit-content;
}

.prob__label--bad {
    background: rgba(239, 68, 68, .15);
    color: #FCA5A5;
}

.prob__label--good {
    background: rgba(67, 176, 241, .15);
    color: var(--c-light);
}

.prob p {
    font-size: 14px;
    color: rgba(255, 255, 255, .8);
    line-height: 1.6;
}

.prob__divider {
    height: 1px;
    background: rgba(255, 255, 255, .08);
    margin: 14px 0;
}

/* USERS */
.users {
    padding: 90px 60px;
    background: var(--c-bg);
}

.users__inner {
    max-width: 1180px;
    margin: 0 auto;
}

.users__head {
    text-align: center;
    margin-bottom: 48px;
}

.users__head h2 {
    font-size: clamp(28px, 3.2vw, 40px);
    font-weight: 800;
    margin-bottom: 14px;
}

.users__head p {
    font-size: 16px;
    color: var(--c-muted);
}

.users__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.user {
    background: #fff;
    border-radius: 18px;
    padding: 32px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(30, 61, 88, .08);
    transition: transform .3s, box-shadow .3s;
}

.user:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(30, 61, 88, .14);
}

.user__icon {
    width: 70px;
    height: 70px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin: 0 auto 20px;
}

.user h3 {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 18px;
}

.user ul {
    list-style: none;
    text-align: left;
}

.user li {
    font-size: 14px;
    color: var(--c-muted);
    line-height: 1.6;
    padding: 8px 0;
    padding-left: 22px;
    position: relative;
    border-bottom: 1px solid var(--c-border);
}

.user li:last-child {
    border-bottom: none;
}

.user li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 16px;
    width: 12px;
    height: 2px;
    background: var(--c-light);
    border-radius: 2px;
}

/* TEAM CTA */
.team-cta {
    padding: 80px 60px;
    background: var(--c-bg);
}

.team-cta__inner {
    max-width: 1180px;
    margin: 0 auto;
}

.team-cta__box {
    background: linear-gradient(135deg, var(--c-dark) 0%, #2A567C 100%);
    border-radius: 22px;
    padding: 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.team-cta__box::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(67, 176, 241, .25) 0%, transparent 70%);
}

.team-cta__box h2 {
    position: relative;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    color: #fff;
    margin-bottom: 14px;
}

.team-cta__box p {
    position: relative;
    font-size: 16px;
    color: rgba(255, 255, 255, .78);
    line-height: 1.65;
    max-width: 560px;
    margin: 0 auto 28px;
}

.team-cta__actions {
    position: relative;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 1024px) {
    .mvv__inner {
        grid-template-columns: 1fr;
    }

    .history__inner {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .problems__grid {
        grid-template-columns: 1fr 1fr;
    }

    .users__grid {
        grid-template-columns: 1fr;
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
        padding: 120px 20px 60px;
    }

    .mvv,
    .history,
    .problems,
    .users,
    .team-cta {
        padding-left: 20px;
        padding-right: 20px;
    }

    .problems__grid {
        grid-template-columns: 1fr;
    }

    .team-cta__box {
        padding: 40px 24px;
    }
}
</style>

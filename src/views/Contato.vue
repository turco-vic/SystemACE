<template>
    <div class="contato">

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
                <p class="hero__tag">Estamos por perto</p>
                <h1>Fale com a equipe do <span>SystemACE</span></h1>
                <p class="hero__desc">
                    Tem dúvidas, quer agendar uma demonstração ou conhecer melhor a plataforma?
                    Preencha o formulário abaixo ou use um dos nossos canais — respondemos em até 24 horas úteis.
                </p>
            </div>
        </section>

        <!-- INFO + FORM -->
        <section class="main">
            <div class="main__inner">

                <div class="info">
                    <h2>Canais diretos</h2>
                    <p class="info__sub">Escolha o canal que preferir. Estamos disponíveis em horário comercial.</p>

                    <div class="info__list">
                        <div v-for="item in infos" :key="item.label" class="info-card">
                            <div class="info-card__icon" v-html="item.icon"></div>
                            <div>
                                <p class="info-card__lbl">{{ item.label }}</p>
                                <p class="info-card__val">{{ item.value }}</p>
                                <p v-if="item.extra" class="info-card__extra">{{ item.extra }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="info__hours">
                        <p class="info__hours-title">Horário de atendimento</p>
                        <p>Segunda à Sexta — 8h às 18h</p>
                        <p>Sábados, Domingos e feriados — fechado</p>
                    </div>
                </div>

                <form class="form" @submit.prevent="enviar">
                    <h2>Envie uma mensagem</h2>
                    <p class="form__sub">Preencha os campos abaixo e nossa equipe entrará em contato.</p>

                    <div class="form__row">
                        <div class="form__group">
                            <label>Nome</label>
                            <input v-model="form.nome" type="text" placeholder="Seu nome" />
                        </div>
                        <div class="form__group">
                            <label>Sobrenome</label>
                            <input v-model="form.sobrenome" type="text" placeholder="Seu sobrenome" />
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form__group">
                            <label>Email</label>
                            <input v-model="form.email" type="email" placeholder="seu@email.com" />
                        </div>
                        <div class="form__group">
                            <label>Telefone</label>
                            <input v-model="form.telefone" type="tel" placeholder="(11) 00000-0000" />
                        </div>
                    </div>

                    <div class="form__group">
                        <label>Assunto</label>
                        <select v-model="form.assunto">
                            <option value="">Selecione um assunto</option>
                            <option value="demo">Solicitar demonstração</option>
                            <option value="duvida">Tirar dúvidas</option>
                            <option value="suporte">Suporte técnico</option>
                            <option value="parceria">Parceria</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    <div class="form__group">
                        <label>Mensagem</label>
                        <textarea v-model="form.mensagem" placeholder="Conte mais sobre sua necessidade..."></textarea>
                    </div>

                    <button class="form__submit" type="submit">
                        Enviar mensagem
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 5l3 3-3 3" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </form>

            </div>
        </section>

        <!-- FAQ -->
        <section class="faq">
            <div class="faq__inner">
                <div class="faq__head">
                    <p class="tag">Perguntas frequentes</p>
                    <h2>Dúvidas comuns</h2>
                </div>

                <div class="faq__list">
                    <details v-for="(q, i) in faq" :key="i" class="faq-item">
                        <summary>
                            <span>{{ q.q }}</span>
                            <span class="faq-item__icon">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.8"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </summary>
                        <p>{{ q.a }}</p>
                    </details>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Footer from '../components/Footer.vue'

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const infos = [
    {
        label: 'Email',
        value: 'contato@systemace.com.br',
        extra: 'Resposta em até 24h úteis',
        icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="14" height="12" rx="2"/><path d="M2 5l7 5 7-5"/></svg>`,
    },
    {
        label: 'Telefone',
        value: '(47) 0000-0000',
        extra: 'Comercial — Seg. a Sex.',
        icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 13v2a2 2 0 01-2 2c-7.7-.5-13.5-6.3-14-14a2 2 0 012-2h2a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L6 8.4a14 14 0 005.6 5.6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6A2 2 0 0116 13z"/></svg>`,
    },
    {
        label: 'Endereço',
        value: 'SENAI Roberto Mange',
        extra: 'Joinville, SC — Brasil',
        icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7c0 5-6 9-6 9s-6-4-6-9a6 6 0 0112 0z"/><circle cx="9" cy="7" r="2"/></svg>`,
    },
]

const faq = [
    { q: 'O SystemACE é uma solução paga?', a: 'O SystemACE é um projeto desenvolvido por alunos do SENAI Roberto Mange e atualmente está em fase de desenvolvimento. Entre em contato para saber sobre disponibilidade.' },
    { q: 'É possível integrar com sistemas que já uso?', a: 'Sim. O sistema foi projetado com integração nativa em mente, podendo sincronizar dados de RH e ERP existentes.' },
    { q: 'Como o sistema garante a conformidade com a NR-6?', a: 'Toda movimentação de EPI é registrada digitalmente, com data, hora, responsável e assinatura digital — garantindo rastreabilidade e validade jurídica.' },
    { q: 'Os dados dos usuários estão protegidos?', a: 'Sim. O SystemACE foi projetado em total conformidade com a LGPD (Lei Geral de Proteção de Dados) e segue boas práticas de segurança da informação.' },
    { q: 'Quem pode usar o sistema?', a: 'O sistema possui três perfis: Funcionário (administrador), Professor e Aluno — cada um com permissões específicas para suas funções.' },
]

const form = reactive({ nome: '', sobrenome: '', email: '', telefone: '', assunto: '', mensagem: '' })

function enviar() {
    if (!form.nome || !form.email || !form.mensagem) {
        return alert('Por favor, preencha nome, email e mensagem.')
    }
    alert('Mensagem enviada com sucesso! Nossa equipe entrará em contato em até 24h.')
    Object.keys(form).forEach(k => form[k] = '')
}
</script>

<style scoped>
.contato {
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

.contato *,
.contato *::before,
.contato *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.contato a {
    text-decoration: none;
    color: inherit;
}

.contato h1,
.contato h2,
.contato h3,
.contato h4 {
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

/* HERO */
.hero {
    padding: 140px 60px 60px;
    text-align: center;
}

.hero__inner {
    max-width: 760px;
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
    font-size: clamp(36px, 4.5vw, 54px);
    font-weight: 800;
    line-height: 1.12;
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

/* MAIN */
.main {
    padding: 40px 60px 100px;
}

.main__inner {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 40px;
    align-items: start;
}

/* INFO */
.info {
    background: var(--c-dark);
    border-radius: 22px;
    padding: 44px 36px;
    color: #fff;
    position: relative;
    overflow: hidden;
}

.info::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(67, 176, 241, .22) 0%, transparent 70%);
}

.info h2 {
    position: relative;
    font-size: 24px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 8px;
}

.info__sub {
    position: relative;
    font-size: 14.5px;
    color: rgba(255, 255, 255, .7);
    line-height: 1.6;
    margin-bottom: 32px;
}

.info__list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 36px;
}

.info-card {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 0;
    border-top: 1px solid rgba(255, 255, 255, .08);
}

.info-card:first-child {
    border-top: none;
    padding-top: 0;
}

.info-card__icon {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    background: rgba(67, 176, 241, .15);
    color: var(--c-light);
    border: 1px solid rgba(67, 176, 241, .25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.info-card__lbl {
    font-size: 11px;
    color: rgba(255, 255, 255, .55);
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 3px;
}

.info-card__val {
    font-size: 15px;
    color: #fff;
    font-weight: 600;
}

.info-card__extra {
    font-size: 12.5px;
    color: rgba(255, 255, 255, .5);
    margin-top: 2px;
}

.info__hours {
    position: relative;
    padding: 18px;
    border-radius: 12px;
    background: rgba(67, 176, 241, .08);
    border: 1px solid rgba(67, 176, 241, .18);
}

.info__hours-title {
    font-size: 12px;
    color: var(--c-light);
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin-bottom: 8px;
}

.info__hours p {
    font-size: 13.5px;
    color: rgba(255, 255, 255, .78);
    line-height: 1.7;
}

/* FORM */
.form {
    background: #fff;
    border-radius: 22px;
    padding: 44px;
    box-shadow: 0 10px 30px rgba(30, 61, 88, .08);
}

.form h2 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
}

.form__sub {
    font-size: 14.5px;
    color: var(--c-muted);
    margin-bottom: 28px;
}

.form__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
}

.form__group {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 14px;
}

.form__row .form__group {
    margin-bottom: 0;
}

.form__group label {
    font-size: 12.5px;
    color: var(--c-text);
    font-weight: 600;
}

.form__group input,
.form__group textarea,
.form__group select {
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

.form__group input:focus,
.form__group textarea:focus,
.form__group select:focus {
    border-color: var(--c-light);
    box-shadow: 0 0 0 4px rgba(67, 176, 241, .12);
}

.form__group input::placeholder,
.form__group textarea::placeholder {
    color: #94A3B8;
}

.form__group textarea {
    min-height: 130px;
    resize: vertical;
}

.form__group select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%235A7187' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
    cursor: pointer;
}

.form__submit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--c-light);
    color: #fff;
    border: none;
    padding: 15px;
    border-radius: 12px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    box-shadow: 0 4px 14px rgba(67, 176, 241, .32);
    transition: background .2s, transform .15s, box-shadow .2s;
}

.form__submit:hover {
    background: #2E9BDF;
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(67, 176, 241, .42);
}

/* FAQ */
.faq {
    padding: 90px 60px;
    background: #fff;
}

.faq__inner {
    max-width: 880px;
    margin: 0 auto;
}

.faq__head {
    text-align: center;
    margin-bottom: 40px;
}

.faq__head h2 {
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
}

.faq__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.faq-item {
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color .2s;
}

.faq-item[open] {
    border-color: var(--c-light);
}

.faq-item summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    font-size: 15px;
    font-weight: 600;
    color: var(--c-text);
    cursor: pointer;
    list-style: none;
}

.faq-item summary::-webkit-details-marker {
    display: none;
}

.faq-item__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff;
    color: var(--c-light);
    transition: transform .25s;
}

.faq-item[open] .faq-item__icon {
    transform: rotate(180deg);
}

.faq-item p {
    padding: 0 24px 22px;
    font-size: 14.5px;
    color: var(--c-muted);
    line-height: 1.7;
}

@media (max-width: 1024px) {
    .main__inner {
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
        padding: 120px 20px 40px;
    }

    .main,
    .faq {
        padding-left: 20px;
        padding-right: 20px;
    }

    .info,
    .form {
        padding: 32px 24px;
    }

    .form__row {
        grid-template-columns: 1fr;
    }
}
</style>

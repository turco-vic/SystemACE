<template>
    <footer class="footer">
        <div class="footer__inner">

            <div class="footer__main">

                <!-- BRAND -->
                <div class="footer__brand-col">
                    <div class="footer__brand">
                        <div class="footer__logo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                                    fill="white" />
                                <circle cx="12" cy="13" r="2.5" fill="none" stroke="white" stroke-width="1.5" />
                            </svg>
                        </div>
                        <div>
                            <p class="footer__brand-name">SystemACE</p>
                            <p class="footer__brand-sub">EPI DASHBOARD</p>
                        </div>
                    </div>
                    <p class="footer__desc">
                        Central inteligente para gestão estratégica de Equipamentos de Proteção
                        Individual. Conformidade, rastreabilidade e eficiência em uma única plataforma.
                    </p>
                </div>

                <!-- NAVEGAÇÃO -->
                <div class="footer__col">
                    <h5 class="footer__col-title">Navegação</h5>
                    <nav class="footer__links">
                        <router-link to="/">Início</router-link>
                        <router-link to="/sobre">Sobre</router-link>
                        <router-link to="/contato">Contato</router-link>
                    </nav>
                </div>

                <!-- PLATAFORMA -->
                <div class="footer__col">
                    <h5 class="footer__col-title">Plataforma</h5>
                    <nav class="footer__links">
                        <router-link to="/login">Entrar</router-link>
                        <router-link to="/cadastro">Cadastrar</router-link>
                        <a href="#">Documentação</a>
                    </nav>
                </div>

                <!-- CONTATO -->
                <div class="footer__col">
                    <h5 class="footer__col-title">Contato</h5>
                    <div class="footer__contact">
                        <p>SENAI Roberto Mange<br />Joinville, SC</p>
                        <a href="mailto:contato@systemace.com.br">contato@systemace.com.br</a>
                        <p class="footer__hours">Seg. a Sex. — 8h às 18h</p>
                    </div>
                </div>

            </div>

            <!-- BOTTOM BAR -->
            <div class="footer__bottom">
                <p>© {{ year }} SystemACE · Desenvolvido por alunos do SENAI Roberto Mange</p>
                <div class="footer__bottom-links">
                    <a href="#">Privacidade</a>
                    <a href="#">Termos</a>
                    <a href="#">LGPD</a>
                </div>
            </div>

        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
/* ── Reset local ─────────────────────────────────── */
.footer *,
.footer *::before,
.footer *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.footer a {
    text-decoration: none;
    color: inherit;
}

/* ── Tokens (espelham Home.vue) ──────────────────── */
.footer {
    --c-dark:   #1E3D58;
    --c-light:  #43B0F1;
    --c-muted:  #5A7187;
    --c-border: rgba(255, 255, 255, 0.1);
}

/* ── Shell ───────────────────────────────────────── */
.footer {
    background: #1E3D58;
    border-top: 3px solid #43B0F1;
    padding: 80px 60px 32px;
    font-family: 'Inter', 'DM Sans', 'Segoe UI', sans-serif;
    width: 100%;
    color: rgba(255, 255, 255, 0.65);
}

.footer__inner {
    max-width: 1200px;
    margin: 0 auto;
}

/* ── Grid principal ──────────────────────────────── */
.footer__main {
    display: grid;
    grid-template-columns: 2.2fr 1fr 1fr 1.5fr;
    column-gap: 64px;
    row-gap: 48px;
    align-items: start;
    padding-bottom: 56px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* ── Brand ───────────────────────────────────────── */
.footer__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.footer__logo {
    width: 42px;
    height: 42px;
    border-radius: 11px;
    background: linear-gradient(140deg, #152A3C 0%, #2A567C 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.footer__brand-name {
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.2;
    letter-spacing: -0.3px;
}

.footer__brand-sub {
    font-size: 9.5px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 2.4px;
    margin-top: 3px;
}

.footer__desc {
    font-size: 14px;
    line-height: 1.85;
    color: rgba(255, 255, 255, 0.5);
    max-width: 300px;
}

/* ── Colunas ─────────────────────────────────────── */
.footer__col-title {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.35);
    letter-spacing: 1.8px;
    text-transform: uppercase;
    margin-bottom: 22px;
}

.footer__links {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.footer__links a {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.2s;
}

.footer__links a:hover {
    color: #43B0F1;
}

/* ── Coluna contato ──────────────────────────────── */
.footer__contact {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.footer__contact p,
.footer__contact a {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.65;
    transition: color 0.2s;
}

.footer__contact a:hover {
    color: #43B0F1;
}

.footer__hours {
    font-size: 13.5px !important;
    color: rgba(255, 255, 255, 0.35) !important;
}

/* ── Bottom bar ──────────────────────────────────── */
.footer__bottom {
    padding-top: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.footer__bottom > p {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.3);
}

.footer__bottom-links {
    display: flex;
    gap: 28px;
}

.footer__bottom-links a {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.2s;
}

.footer__bottom-links a:hover {
    color: #43B0F1;
}

/* ── Responsivo ──────────────────────────────────── */
@media (max-width: 1024px) {
    .footer {
        padding: 64px 40px 28px;
    }

    .footer__main {
        grid-template-columns: 1fr 1fr;
        column-gap: 40px;
        row-gap: 40px;
    }

    .footer__brand-col {
        grid-column: 1 / -1;
    }
}

@media (max-width: 640px) {
    .footer {
        padding: 52px 24px 24px;
    }

    .footer__main {
        grid-template-columns: 1fr;
        row-gap: 36px;
    }

    .footer__desc {
        max-width: 100%;
    }

    .footer__bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
}
</style>

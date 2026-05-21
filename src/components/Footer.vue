<template>
    <footer class="footer">
        <div class="footer__inner">

            <div class="footer__main">
                <div class="footer__brand-col">
                    <img src="../assets/LogoACEbranco.png" alt="SystemACE" class="footer__logo" />
                    <p class="footer__desc">
                        Central inteligente para gestão estratégica de Equipamentos
                        de Proteção Individual. Conformidade, rastreabilidade e
                        eficiência em uma única plataforma.
                    </p>
                </div>

                <div class="footer__col">
                    <h5>Navegação</h5>
                    <router-link to="/">Início</router-link>
                    <router-link to="/sobre">Sobre</router-link>
                    <router-link to="/contato">Contato</router-link>
                </div>

                <div class="footer__col">
                    <h5>Plataforma</h5>
                    <router-link to="/login">Entrar</router-link>
                    <router-link to="/cadastro">Cadastrar</router-link>
                    <a href="#">Documentação</a>
                </div>

                <div class="footer__col">
                    <h5>Contato</h5>
                    <p>SENAI Roberto Mange<br>Joinville, SC</p>
                    <p>contato@systemace.com.br</p>
                    <p>Seg. a Sex. — 8h às 18h</p>
                </div>
            </div>

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
.footer {
    background: #152A3C;
    border-top: 3px solid #43B0F1;
    padding: 56px 60px 24px;
    font-family: 'Inter', 'DM Sans', 'Segoe UI', sans-serif;
    width: 100%;
}

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

.footer__inner {
    max-width: 1180px;
    margin: 0 auto;
}

.footer__main {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
    gap: 64px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* BRAND */
.footer__logo {
    height: 48px;
    width: auto;
    display: block;
    margin-bottom: 18px;
}

.footer__desc {
    font-size: 13.5px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.75;
    max-width: 340px;
}

/* COLUMNS */
.footer__col h5 {
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 18px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.footer__col a {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.9;
    transition: color .2s;
}

.footer__col a:hover {
    color: #43B0F1;
}

.footer__col p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.75;
    margin-bottom: 12px;
}

.footer__col p:last-child {
    margin-bottom: 0;
}

/* BOTTOM */
.footer__bottom {
    padding-top: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.footer__bottom p {
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.4);
}

.footer__bottom-links {
    display: flex;
    gap: 24px;
}

.footer__bottom-links a {
    font-size: 12.5px;
    color: rgba(255, 255, 255, 0.4);
    transition: color .2s;
}

.footer__bottom-links a:hover {
    color: #43B0F1;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
    .footer {
        padding: 48px 32px 22px;
    }

    .footer__main {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }

    .footer__brand-col {
        grid-column: 1 / -1;
    }
}

@media (max-width: 720px) {
    .footer {
        padding: 40px 20px 20px;
    }

    .footer__main {
        grid-template-columns: 1fr;
        gap: 32px;
    }

    .footer__bottom {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
}
</style>

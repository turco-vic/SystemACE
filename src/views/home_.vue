<template>
  <!-- NAV -->
  <nav class="navbar">
    <div class="nav-logo">
     
      <img src="src/assets/LogoACEbranco.png" />
      <div>
        <span class="logo-name">SystemACE</span>
        <span class="logo-sub">EPI Dashboard</span>
      </div>
    </div>
    <div class="nav-links">
      <a href="#servicos">Serviços</a>
      <a href="#porque">Por que nós</a>
      <a href="#contato">Contato</a>
    </div>
    <div class="nav-ctas">
      <button class="btn-ghost">Cadastrar Agente</button>
      <button class="btn-primary">Login</button>
    </div>
  </nav>

  <main>
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-noise"></div>
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-badge fade-up">
            <span class="badge-dot"></span>
            Gestão inteligente de EPIs
          </div>
          <h1 class="fade-up delay-1">Boas-Vindas ao <em>SystemACE</em></h1>
          <p class="fade-up delay-2">
            Sua central inteligente para gestão estratégica de EPIs.
            Monitore conformidades, controle estoques e garanta a segurança
            da sua equipe com dados em tempo real.
          </p>
          <div class="hero-ctas fade-up delay-3">
            <button class="btn-primary btn-lg">Solicitar Demo</button>
            <button class="btn-ghost btn-lg">Saiba Mais</button>
          </div>
          <div class="hero-stats fade-up delay-4">
            <div v-for="s in stats" :key="s.label" class="stat-item">
              <div class="stat-num">{{ s.value }}</div>
              <div class="stat-label">{{ s.label }}</div>
            </div>
          </div>
        </div>

        <div class="hero-visual fade-up delay-2">
          <div class="hero-img-wrap">
            <!--
              HERO IMAGE: substitua por
              <img src="@/assets/hero.svg" alt="Dashboard" class="hero-img" />
            -->
            <div class="img-placeholder" style="aspect-ratio:4/3;">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              Imagem Hero — substitua por SVG
            </div>
            <div class="img-float">
              <div class="float-label">EPIs em conformidade</div>
              <div class="float-val">98.4%</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVIÇOS -->
    <section class="services" id="servicos">
      <div class="section-inner">
        <div class="services-header">
          <div class="section-tag">O que oferecemos</div>
          <h2 class="section-title">Serviços Especializados</h2>
          <p class="section-sub">Soluções completas para gestão, conformidade e rastreabilidade de EPIs.</p>
        </div>
        <div class="services-grid">
          <div v-for="(sv, i) in services" :key="i" class="service-card">
            <!--
              SERVIÇO IMAGE: substitua por
              <img :src="sv.img" :alt="sv.title" class="service-img" />
              Imagens: assets/service-auditoria.svg | service-assinatura.svg | service-gestao.svg
            -->
            <div class="img-placeholder" style="height:180px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              {{ sv.imgLabel }}
            </div>
            <div class="service-body">
              <div class="service-icon" v-html="sv.icon"></div>
              <h3>{{ sv.title }}</h3>
              <p>{{ sv.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- POR QUE NÓS -->
    <section class="why" id="porque">
      <div class="section-inner why-layout">
        <div>
          <div class="section-tag">Diferenciais</div>
          <h2 class="section-title">Por que nos escolher?</h2>
          <p class="section-sub">Diferenciais estratégicos construídos para o sucesso real da sua operação.</p>
        </div>
        <div class="why-cards">
          <div v-for="(c, i) in whyCards" :key="i" class="why-card">
            <div class="why-icon">{{ c.icon }}</div>
            <h4>{{ c.title }}</h4>
            <p>{{ c.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTATO -->
    <section class="contact" id="contato">
      <div class="section-inner contact-layout">
        <!--
          CONTATO IMAGE: substitua por
          <img src="@/assets/contact.svg" alt="Contato" class="contact-img" />
        -->
        <div class="img-placeholder contact-visual">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          Imagem Contato — substitua por SVG
        </div>
        <div class="contact-form">
          <div class="section-tag">Fale conosco</div>
          <h2>Solicite uma Demonstração</h2>
          <p>Preencha o formulário e nossa equipe entrará em contato em breve.</p>
          <div class="form-row">
            <div class="form-group">
              <label>Nome</label>
              <input v-model="form.name" type="text" placeholder="Seu nome" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="seu@email.com" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Telefone</label>
              <input v-model="form.phone" type="tel" placeholder="(11) 00000-0000" />
            </div>
            <div class="form-group">
              <label>Empresa</label>
              <input v-model="form.company" type="text" placeholder="Nome da empresa" />
            </div>
          </div>
          <div class="form-group">
            <label>Mensagem</label>
            <textarea v-model="form.message" placeholder="Como podemos ajudar?"></textarea>
          </div>
          <div class="recaptcha-mock">
            <div class="recaptcha-box"></div>
            <span>Não sou um robô</span>
          </div>
          <button class="btn-submit" @click="handleSubmit">Enviar Mensagem</button>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-brand">
            <!-- LOGO FOOTER: substitua por <img src="@/assets/logo.svg" class="footer-logo-img" /> -->
            <div class="footer-logo-icon">S</div>
            <div>
              <div class="brand-name">SystemACE</div>
              <div class="brand-sub">EPI Dashboard</div>
            </div>
          </div>
          <p class="footer-desc">Central inteligente para gestão estratégica de EPIs. Conformidade, rastreabilidade e eficiência em uma única plataforma.</p>
          <div class="footer-contact">Seg.–Sex: 8h00 às 18h00<br />contato@systemace.com.br</div>
        </div>
        <div v-for="col in footerCols" :key="col.title" class="footer-col">
          <h5>{{ col.title }}</h5>
          <a v-for="link in col.links" :key="link" href="#">{{ link }}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ year }} SystemACE. Todos os direitos reservados.</p>
        <p>Desenvolvido com ❤️ para segurança do trabalho</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { reactive } from 'vue'

const year = new Date().getFullYear()

const stats = [
  { value: '100%', label: 'Conformidade NR' },
  { value: '80%',  label: 'Redução de tempo' },
  { value: '360°', label: 'Visibilidade' },
]

const services = [
  {
    title: 'Auditoria de Conformidade',
    imgLabel: 'Imagem 1 — Auditoria',
    description: 'Mantenha sua empresa 100% regularizada. O SystemACE monitora automaticamente a validade dos CAs e garante conformidade com as normas do Ministério do Trabalho.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D8FF5" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`,
  },
  {
    title: 'Assinatura Digital',
    imgLabel: 'Imagem 2 — Assinatura Digital',
    description: 'Integração total com o ecossistema da sua organização. Automatize a importação de dados de funcionários e a baixa de estoque em tempo real, eliminando retrabalho.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D8FF5" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  },
  {
    title: 'Gestão de Sistemas',
    imgLabel: 'Imagem 3 — Gestão de Sistemas',
    description: 'Gestão de cautelas eletrônicas com validade jurídica. Elimine o arquivo morto e o histórico de entregas de forma digital, segura e rastreável.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D8FF5" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  },
]

const whyCards = [
  { icon: '🛡️', title: 'Segurança Jurídica "Blindada"', description: 'Assinaturas digitais e histórico em tempo real, com prova jurídica incontestável de cada EPI entregue e treinado.' },
  { icon: '📊', title: 'Visibilidade 360° em Tempo Real', description: 'Dashboards intuitivos para saber exatamente quem está protegido, onde seu estoque está e antecipar compras.' },
  { icon: '🔗', title: 'Integração Nativa', description: 'Sincroniza dados de RH e ERP. Quando um funcionário muda de função, o sistema atualiza a necessidade de EPI automaticamente.' },
  { icon: '⚡', title: 'Eficiência Operacional', description: 'Reduza em 80% o tempo de entrega. Automatize processos burocráticos e foque na estratégia, não em formulários.' },
]

const footerCols = [
  { title: 'Plataforma', links: ['Auditoria', 'Assinatura Digital', 'Gestão de Sistemas', 'Dashboard'] },
  { title: 'Empresa',    links: ['Sobre nós', 'Contato', 'Política de Privacidade', 'Termos de Uso'] },
]

const form = reactive({ name: '', email: '', phone: '', company: '', message: '' })

function handleSubmit() {
  console.log('Form:', { ...form })
  alert('Mensagem enviada! Entraremos em contato em breve.')
}
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue: #1B6EF3;
  --blue-dark: #0D4FC0;
  --blue-light: #4D8FF5;
  --cyan: #00D4FF;
  --bg: #050A14;
  --bg2: #0A1628;
  --bg3: #0F1E3A;
  --surface: rgba(255,255,255,0.04);
  --border: rgba(255,255,255,0.08);
  --text: #F0F4FF;
  --muted: #7A8FB0;
  --radius: 16px;
}

html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
}
h1,h2,h3,h4 { font-family: 'Syne', sans-serif; }

/* Buttons */
.btn-ghost {
  background: none; border: 1px solid var(--border); color: var(--text);
  padding: 9px 20px; border-radius: 8px; font-size: 14px; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: border-color .2s;
}
.btn-ghost:hover { border-color: var(--blue); }
.btn-primary {
  background: var(--blue); border: none; color: #fff;
  padding: 9px 22px; border-radius: 8px; font-size: 14px; font-weight: 600;
  cursor: pointer; font-family: 'DM Sans', sans-serif;
  transition: background .2s, transform .15s;
}
.btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }
.btn-lg { padding: 14px 30px; font-size: 15px; }

/* Shared */
.section-inner { max-width: 1200px; margin: 0 auto; }
.section-tag { font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--blue-light); margin-bottom: 16px; }
.section-title { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; margin-bottom: 16px; }
.section-sub { font-size: 16px; color: var(--muted); line-height: 1.7; }

/* Placeholder — remova quando colocar os SVGs */
.img-placeholder {
  width: 100%; background: var(--bg3);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 10px; color: var(--muted); font-size: 12px;
  border: 1px dashed var(--border); border-radius: 8px;
}
.img-placeholder svg { opacity: .3; }

/* Animations */
@keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
.fade-up { animation: fadeUp .7s ease both; }
.delay-1 { animation-delay: .1s; }
.delay-2 { animation-delay: .2s; }
.delay-3 { animation-delay: .3s; }
.delay-4 { animation-delay: .45s; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }

/* ── NAV ── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 60px;
  background: rgba(5,10,20,0.75); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.nav-logo { display: flex; align-items: center; gap: 10px; }
.logo-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: linear-gradient(135deg, var(--blue), var(--cyan));
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; color: #fff;
}
.logo-img { width: 40px; height: 40px; }
.logo-name { display: block; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; }
.logo-sub  { display: block; font-size: 10px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }
.nav-links { display: flex; gap: 32px; }
.nav-links a { color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 500; transition: color .2s; }
.nav-links a:hover { color: var(--text); }
.nav-ctas { display: flex; gap: 12px; align-items: center; }

/* ── HERO ── */
.hero {
  min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
  padding: 120px 60px 80px; position: relative; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 70% 40%, rgba(27,110,243,0.15) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 20% 80%, rgba(0,212,255,0.08) 0%, transparent 60%);
}
.hero-noise {
  position: absolute; inset: 0; z-index: 0; opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
}
.hero-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
  max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 1;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(27,110,243,0.12); border: 1px solid rgba(27,110,243,0.3);
  padding: 6px 14px; border-radius: 100px; font-size: 12px; color: var(--cyan);
  font-weight: 500; letter-spacing: 0.5px; margin-bottom: 28px;
}
.badge-dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; animation: pulse 2s infinite; }
.hero-content h1 { font-size: clamp(38px,5vw,64px); font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
.hero-content h1 em { font-style: normal; color: var(--blue-light); }
.hero-content p { font-size: 17px; color: var(--muted); line-height: 1.7; max-width: 460px; margin-bottom: 40px; }
.hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
.hero-stats { display: flex; gap: 40px; margin-top: 52px; }
.stat-num { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; }
.stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; }
.hero-img-wrap {
  border-radius: 20px; overflow: hidden; position: relative;
  border: 1px solid var(--border);
  box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(27,110,243,0.1);
}
.hero-img { width: 100%; display: block; }
.img-float {
  position: absolute; bottom: -20px; left: -24px;
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 14px; padding: 16px 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.float-label { font-size: 11px; color: var(--muted); margin-bottom: 4px; }
.float-val { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--cyan); }

/* ── SERVIÇOS ── */
.services { padding: 100px 60px; background: var(--bg2); }
.services-header { text-align: center; margin-bottom: 72px; }
.services-header .section-sub { max-width: 560px; margin: 0 auto; }
.services-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
.service-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden;
  transition: border-color .3s, transform .3s; position: relative;
}
.service-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--blue), var(--cyan));
  opacity: 0; transition: opacity .3s;
}
.service-card:hover { border-color: rgba(27,110,243,0.4); transform: translateY(-4px); }
.service-card:hover::before { opacity: 1; }
.service-img { width: 100%; height: 180px; object-fit: cover; display: block; }
.service-body { padding: 28px; }
.service-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: rgba(27,110,243,0.12); border: 1px solid rgba(27,110,243,0.2);
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
}
.service-card h3 { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
.service-card p { font-size: 14px; color: var(--muted); line-height: 1.65; }

/* ── POR QUE NÓS ── */
.why { padding: 100px 60px; background: var(--bg); }
.why-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.why-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.why-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 14px; padding: 24px; transition: border-color .25s;
}
.why-card:hover { border-color: rgba(27,110,243,0.35); }
.why-icon { font-size: 22px; margin-bottom: 14px; }
.why-card h4 { font-size: 15px; font-weight: 700; margin-bottom: 10px; line-height: 1.3; }
.why-card p  { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* ── CONTATO ── */
.contact { padding: 100px 60px; background: var(--bg2); }
.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.contact-img { width: 100%; border-radius: 20px; display: block; }
.contact-visual { min-height: 460px; border-radius: 20px; }
.contact-form { display: flex; flex-direction: column; gap: 14px; }
.contact-form h2 { font-size: 32px; font-weight: 800; margin-bottom: 8px; }
.contact-form > p { font-size: 15px; color: var(--muted); margin-bottom: 10px; line-height: 1.6; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 12px; color: var(--muted); font-weight: 500; }
.form-group input, .form-group textarea {
  background: var(--bg3); border: 1px solid var(--border); border-radius: 10px;
  padding: 12px 16px; color: var(--text); font-family: 'DM Sans', sans-serif;
  font-size: 14px; outline: none; transition: border-color .2s;
}
.form-group input:focus, .form-group textarea:focus { border-color: var(--blue); }
.form-group textarea { resize: vertical; min-height: 110px; }
.recaptcha-mock {
  border: 1px solid var(--border); border-radius: 8px; padding: 12px 16px;
  display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--muted);
  background: var(--bg3);
}
.recaptcha-box { width: 22px; height: 22px; border: 2px solid var(--border); border-radius: 4px; flex-shrink: 0; }
.btn-submit {
  background: linear-gradient(135deg, var(--blue), var(--blue-dark));
  border: none; color: #fff; padding: 14px; border-radius: 10px;
  font-size: 15px; font-weight: 600; cursor: pointer;
  font-family: 'Syne', sans-serif; letter-spacing: 0.5px;
  transition: opacity .2s, transform .15s;
}
.btn-submit:hover { opacity: .9; transform: translateY(-1px); }

/* ── FOOTER ── */
footer { background: var(--bg); border-top: 1px solid var(--border); padding: 60px 60px 32px; }
.footer-inner { max-width: 1200px; margin: 0 auto; }
.footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; margin-bottom: 48px; }
.footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.footer-logo-icon {
  width: 36px; height: 36px; border-radius: 8px;
  background: linear-gradient(135deg, var(--blue), var(--cyan));
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 14px; color: #fff;
}
.footer-logo-img { width: 36px; height: 36px; }
.brand-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; }
.brand-sub  { font-size: 10px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }
.footer-desc { font-size: 13px; color: var(--muted); line-height: 1.7; max-width: 280px; }
.footer-contact { margin-top: 20px; font-size: 13px; color: var(--muted); line-height: 1.9; }
.footer-col h5 { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 16px; }
.footer-col a { display: block; font-size: 13px; color: var(--muted); text-decoration: none; margin-bottom: 10px; transition: color .2s; }
.footer-col a:hover { color: var(--text); }
.footer-bottom {
  border-top: 1px solid var(--border); padding-top: 28px;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-bottom p { font-size: 12px; color: var(--muted); }
</style>
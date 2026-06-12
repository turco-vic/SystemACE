<template>
  <div v-if="mobileOpen" class="sidebar-overlay" @click="mobileOpen = false"></div>

  <aside class="sidebar" :class="{ collapsed: isCollapsed, 'mobile-open': mobileOpen }">

    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" />
          <circle cx="12" cy="13" r="2.5" fill="none" stroke="white" stroke-width="1.5" />
        </svg>
      </div>
      <div class="logo-text">
        <span class="logo-name">SystemACE</span>
        <span class="logo-sub">EPI DASHBOARD</span>
      </div>
      <button class="mobile-close" @click="mobileOpen = false">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <button class="collapse-btn" @click="toggleCollapse" :title="isCollapsed ? 'Expandir' : 'Recolher'">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="collapse-arrow">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </button>

    <nav class="sidebar-nav">
      <div class="nav-section-label">Menu</div>

      <router-link to="/dashboard" class="nav-item" :class="{ active: $route.path === '/dashboard' }" title="Dashboard"
        @click="mobileOpen = false">
        <span class="nav-icon">
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="1" width="6" height="6" rx="1.5" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" />
          </svg>
        </span>
        <span class="nav-label">Dashboard</span>
      </router-link>

      <router-link to="/epis" class="nav-item" :class="{ active: $route.path === '/epis' }" title="Cadastro de EPI"
        @click="mobileOpen = false">
        <span class="nav-icon">
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
            <path d="M8 7v8M2 4l6 3 6-3" />
          </svg>
        </span>
        <span class="nav-label">Cadastro de EPI</span>
      </router-link>

      <router-link to="/CadastroAluno" class="nav-item" :class="{ active: $route.path === '/CadastroAluno' }"
        title="Cadastro de Alunos" @click="mobileOpen = false">
        <span class="nav-icon">
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="6" cy="5" r="3" />
            <path d="M1 14c0-3 2-5 5-5s5 2 5 5" />
            <path d="M12 6v4M14 8h-4" />
          </svg>
        </span>
        <span class="nav-label">Cadastro de Alunos</span>
      </router-link>

      <router-link to="/CadastroFuncionario" class="nav-item"
        :class="{ active: $route.path === '/CadastroFuncionario' }" title="Cadastro de Funcionário"
        @click="mobileOpen = false">
        <span class="nav-icon">
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="5" r="3" />
            <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
          </svg>
        </span>
        <span class="nav-label">Cadastro de Funcionário</span>
      </router-link>

      <router-link to="/gerenciar-solicitacoes" class="nav-item"
        :class="{ active: $route.path === '/gerenciar-solicitacoes' }" title="Solicitações" @click="mobileOpen = false">
        <span class="nav-icon">
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="12" height="12" rx="2" />
            <path d="M5 8h6M5 5h6M5 11h4" />
          </svg>
        </span>
        <span class="nav-label">Solicitações</span>
      </router-link>
    </nav>

    <div class="sidebar-bottom">
      <div class="nav-divider"></div>
      <router-link to="/PerfilFuncionario" class="nav-item" :class="{ active: $route.path === '/PerfilFuncionario' }"
        title="Perfil" @click="mobileOpen = false">
        <span class="nav-icon">
          <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="5" r="3" />
            <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
          </svg>
        </span>
        <span class="nav-label">Perfil</span>
      </router-link>
    </div>

  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(false)
const mobileOpen = ref(false)

const toggleCollapse = () => { isCollapsed.value = !isCollapsed.value }

defineExpose({ mobileOpen, isCollapsed })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

.sidebar {
  --sb-bg: #1E3D58;
  --sb-accent: #43B0F1;
  --sb-text: rgba(255, 255, 255, 0.65);
  --sb-text-strong: #ffffff;
  --sb-border: rgba(255, 255, 255, 0.1);
  --sb-width: 232px;
  --sb-width-collapsed: 68px;

  width: var(--sb-width);
  background: var(--sb-bg);
  display: flex;
  flex-direction: column;
  font-family: 'IBM Plex Sans', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 60;
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.collapsed {
  width: var(--sb-width-collapsed);
}

/* Overlay mobile */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 59;
  backdrop-filter: blur(2px);
}

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 18px 16px;
  border-bottom: 1px solid var(--sb-border);
  min-height: 72px;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
}

.logo-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.2s ease 0.05s;
}

.collapsed .logo-text {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s ease;
}

.logo-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--sb-text-strong);
  letter-spacing: -0.3px;
  line-height: 1.2;
  white-space: nowrap;
}

.logo-sub {
  font-size: 0.55rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 2px;
  margin-top: 2px;
  white-space: nowrap;
}

.mobile-close {
  display: none;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
  flex-shrink: 0;
}

/* Collapse button — fica dentro da sidebar */
.collapse-btn {
  position: absolute;
  top: 23px;
  right: 8px;
  width: 26px;
  height: 26px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: color 0.2s, background 0.2s;
  padding: 0;
  flex-shrink: 0;
}

.collapse-btn:hover {
  color: #fff;
  background: rgba(67, 176, 241, 0.25);
  border-color: rgba(67, 176, 241, 0.4);
}

.collapse-arrow {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.collapsed .collapse-arrow {
  transform: rotate(180deg);
}

/* Nav */
.sidebar-nav {
  flex: 1;
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-section-label {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1.6px;
  text-transform: uppercase;
  padding: 0 10px;
  margin-bottom: 8px;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.2s ease 0.05s;
}

.collapsed .nav-section-label {
  opacity: 0;
  transition: opacity 0.1s ease;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px;
  border-radius: 9px;
  text-decoration: none;
  color: var(--sb-text);
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: var(--sb-text-strong);
}

.nav-item.active {
  background: rgba(67, 176, 241, 0.15);
  color: var(--sb-accent);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 18px;
  background: var(--sb-accent);
  border-radius: 0 3px 3px 0;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 20px;
}

.nav-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 1;
  transition: opacity 0.2s ease 0.05s;
}

.collapsed .nav-label {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s ease;
}

.collapsed .nav-item {
  justify-content: center;
  gap: 0;
  padding: 10px 0;
}

.collapsed .sidebar-logo {
  justify-content: center;
  padding: 18px 0;
}

/* Bottom */
.sidebar-bottom {
  padding: 12px 12px 22px;
  flex-shrink: 0;
}

.nav-divider {
  height: 1px;
  background: var(--sb-border);
  margin-bottom: 12px;
}

/* Mobile */
@media (max-width: 768px) {
  .sidebar {
    left: -232px;
    width: 232px !important;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .sidebar.mobile-open {
    left: 0;
  }

  .sidebar-overlay {
    display: block;
  }

  .mobile-close {
    display: flex;
    align-items: center;
  }

  .collapse-btn {
    display: none;
  }

  .collapsed .nav-label {
    opacity: 1;
    pointer-events: auto;
  }

  .collapsed .logo-text {
    opacity: 1;
    pointer-events: auto;
  }

  .collapsed .nav-section-label {
    opacity: 1;
  }

  .collapsed .nav-item {
    justify-content: flex-start;
    gap: 11px;
    padding: 10px;
    overflow: hidden;
  }

  .collapsed .sidebar-logo {
    justify-content: flex-start;
    padding: 18px 16px;
  }
}
</style>

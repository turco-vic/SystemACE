<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">

    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="#2563EB" />
          <path
            d="M7 14C7 10.134 10.134 7 14 7C17.866 7 21 10.134 21 14C21 17.866 17.866 21 14 21C10.134 21 7 17.866 7 14Z"
            stroke="white" stroke-width="2" />
          <circle cx="14" cy="14" r="3" fill="white" />
        </svg>
      </div>
      <span class="logo-text">SystemACE</span>
    </div>

    <!-- Collapse button — fixo na borda direita -->
    <button class="collapse-btn" @click="toggleCollapse" :title="isCollapsed ? 'Expandir' : 'Recolher'">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
        :style="{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </button>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <div class="nav-section-label">MENU</div>

      <router-link to="/dashboard" class="nav-item" :class="{ active: $route.path === '/dashboard' }" title="Dashboard">
        <span class="nav-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="1" width="6" height="6" rx="1" />
            <rect x="9" y="1" width="6" height="6" rx="1" />
            <rect x="1" y="9" width="6" height="6" rx="1" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
        </span>
        <span class="nav-label">Dashboard</span>
      </router-link>

      <router-link to="/epis" class="nav-item" :class="{ active: $route.path === '/epis' }" title="Cadastro de EPI">
        <span class="nav-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
            <path d="M8 1v14M2 4l6 3 6-3" />
          </svg>
        </span>
        <span class="nav-label">Cadastro de EPI</span>
      </router-link>

      <router-link to="/CadastroAluno" class="nav-item" :class="{ active: $route.path === '/CadastroAluno' }"
        title="Cadastro de Alunos">
        <span class="nav-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="6" cy="5" r="3" />
            <path d="M1 14c0-3 2-5 5-5s5 2 5 5" />
            <path d="M12 6v4M14 8h-4" />
          </svg>
        </span>
        <span class="nav-label">Cadastro de Alunos</span>
      </router-link>

      <router-link to="/CadastroFuncionario" class="nav-item"
        :class="{ active: $route.path === '/CadastroFuncionario' }" title="Cadastro de Funcionário">
        <span class="nav-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="5" r="3" />
            <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
          </svg>
        </span>
        <span class="nav-label">Cadastro de Funcionário</span>
      </router-link>

      <router-link to="/gerenciar-solicitacoes" class="nav-item"
        :class="{ active: $route.path === '/gerenciar-solicitacoes' }" title="Solicitações">
        <span class="nav-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
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
        title="Perfil">
        <span class="nav-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
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
const toggleCollapse = () => { isCollapsed.value = !isCollapsed.value }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');

.sidebar {
  width: 220px;
  min-height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e5e9f0;
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease;
  font-family: 'IBM Plex Sans', sans-serif;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 60;
  flex-shrink: 0;
  overflow: visible;
}

.sidebar.collapsed {
  width: 64px;
}

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 16px;
  border-bottom: 1px solid #e5e9f0;
  overflow: hidden;
  min-height: 68px;
}

.logo-icon {
  flex-shrink: 0;
}

.logo-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.2s ease, max-width 0.25s ease;
  max-width: 140px;
}

.collapsed .logo-text {
  opacity: 0;
  max-width: 0;
}

/* Collapse button — fixado na borda direita da sidebar */
.collapse-btn {
  position: absolute;
  top: 20px;
  right: -12px;
  width: 24px;
  height: 24px;
  background: #ffffff;
  border: 1px solid #e5e9f0;
  border-radius: 50%;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 70;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: color 0.2s, background 0.2s, border-color 0.2s;
  padding: 0;
}

.collapse-btn:hover {
  color: #2563EB;
  border-color: #2563EB;
  background: #eff6ff;
}

/* Nav */
.sidebar-nav {
  flex: 1;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.nav-section-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 1px;
  padding: 0 8px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.2s;
}

.collapsed .nav-section-label {
  opacity: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 8px;
  text-decoration: none;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.15s ease;
  white-space: nowrap;
  overflow: hidden;
}

.nav-item:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.nav-item.active {
  background-color: #eff6ff;
  color: #2563EB;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.nav-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.2s, max-width 0.25s;
  max-width: 160px;
}

.collapsed .nav-label {
  opacity: 0;
  max-width: 0;
}

/* Bottom */
.sidebar-bottom {
  padding: 10px 10px 20px;
}

.nav-divider {
  height: 1px;
  background-color: #e5e9f0;
  margin-bottom: 10px;
}
</style>

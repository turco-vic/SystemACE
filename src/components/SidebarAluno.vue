<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="#2563EB" />
          <path
            d="M7 14C7 10.134 10.134 7 14 7V7C17.866 7 21 10.134 21 14V14C21 17.866 17.866 21 14 21V21C10.134 21 7 17.866 7 14V14Z"
            stroke="white" stroke-width="2" />
          <circle cx="14" cy="14" r="3" fill="white" />
        </svg>
      </div>
      <span class="logo-text">SystemACE</span>
      <button class="collapse-btn" @click="toggleCollapse">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <div class="nav-section-label">MENU</div>

      <router-link to="/alunos" class="nav-item" :class="{ active: $route.path === '/alunos' }" title="alunos">
        <span class="nav-label">Dashboard</span>
      </router-link>
      <router-link to="/CatalogoEpis" class="nav-item" :class="{ active: $route.path === '/CatalogoEpis' }" title="Cadastro de EPI">
        <span class="nav-label">Catalogo de Epis</span>
      </router-link>
      <router-link to="/minhas-solicitacoes" class="nav-item" :class="{ active: $route.path === '/minhas-solicitacoes' }" title="Cadastro de Funcionario">
        <span class="nav-label">Minhas Solicitações</span>
      </router-link>
    </nav>

    <div class="sidebar-bottom">
      <div class="nav-divider"></div>
      <router-link to="/PerfilAluno" class="nav-item" :class="{ active: $route.path === '/PerfilAluno' }">
        <span class="nav-label">Perfil</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
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
  position: relative;
  flex-shrink: 0;
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
  position: relative;
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
  transition: opacity 0.2s ease, width 0.2s ease;
}

.collapsed .logo-text {
  opacity: 0;
  width: 0;
}

.collapse-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s, background 0.2s;
  flex-shrink: 0;
}

.collapse-btn:hover {
  color: #2563EB;
  background: #eff6ff;
}

.collapsed .collapse-btn svg {
  transform: rotate(180deg);
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
  position: relative;
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

.nav-item.active .nav-icon svg path,
.nav-item.active .nav-icon svg rect {
  stroke: #2563EB;
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
  transition: opacity 0.2s, width 0.2s;
}

.collapsed .nav-label {
  opacity: 0;
  width: 0;
}

.nav-badge {
  background-color: #ef4444;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.collapsed .nav-badge {
  opacity: 0;
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
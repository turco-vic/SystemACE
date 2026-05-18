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

      <router-link to="/dashboard" class="nav-item" :class="{ active: $route.path === '/dashboard' }" title="Dashboard">
        <span class="nav-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
            <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
            <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
            <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </span>
        <span class="nav-label">Dashboard</span>
      </router-link>

      <router-link to="/epis" class="nav-item" :class="{ active: $route.path === '/epis' }" title="Cadastro de EPI">
        <span class="nav-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1.5L11.25 6.75H16.5L12.375 10.125L13.875 15.375L9 12.375L4.125 15.375L5.625 10.125L1.5 6.75H6.75L9 1.5Z"
              stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="nav-label">Cadastro de EPI</span>
      </router-link>

      <router-link to="/solicitacoes" class="nav-item" :class="{ active: $route.path === '/solicitacoes' }"
        title="Solicitações">
        <span class="nav-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3 3H15C15.825 3 16.5 3.675 16.5 4.5V12C16.5 12.825 15.825 13.5 15 13.5H9.75L6.75 16.5V13.5H3C2.175 13.5 1.5 12.825 1.5 12V4.5C1.5 3.675 2.175 3 3 3Z"
              stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="nav-label">Solicitações</span>
        <span class="nav-badge">3</span>
      </router-link>
    </nav>

    <div class="sidebar-bottom">
      <div class="nav-divider"></div>
      <router-link to="/configuracoes" class="nav-item" :class="{ active: $route.path === '/configuracoes' }">
        <span class="nav-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
              stroke="currentColor" stroke-width="1.5" />
            <path
              d="M14.25 9C14.25 8.775 14.235 8.5575 14.2125 8.3475L15.645 7.2375C15.9 7.035 15.9675 6.675 15.8025 6.39L14.4225 4.11C14.2575 3.825 13.905 3.72 13.6125 3.8475L11.9325 4.5525C11.5875 4.305 11.2125 4.0875 10.8075 3.9225L10.5675 2.13C10.5225 1.8225 10.2525 1.5975 9.9375 1.5975H7.0625C6.7475 1.5975 6.4775 1.8225 6.4325 2.1225L6.1925 3.915C5.7875 4.08 5.4125 4.2975 5.0675 4.545L3.3875 3.84C3.0875 3.705 2.7425 3.81 2.5775 4.1025L1.1975 6.3825C1.0325 6.6675 1.0925 7.02 1.3475 7.2375L2.7875 8.355C2.7575 8.565 2.7425 8.7825 2.7425 9C2.7425 9.2175 2.7575 9.435 2.7875 9.645L1.3475 10.7625C1.0925 10.98 1.0325 11.3325 1.1975 11.6175L2.5775 13.8975C2.7425 14.19 3.0875 14.2875 3.3875 14.16L5.0675 13.455C5.4125 13.7025 5.7875 13.92 6.1925 14.085L6.4325 15.8775C6.4775 16.1775 6.7475 16.4025 7.0625 16.4025H9.9375C10.2525 16.4025 10.5225 16.1775 10.5675 15.87L10.8075 14.0775C11.2125 13.9125 11.5875 13.695 11.9325 13.4475L13.6125 14.1525C13.905 14.28 14.2575 14.175 14.4225 13.89L15.8025 11.61C15.9675 11.325 15.9 10.965 15.645 10.7625L14.2125 9.6525C14.235 9.4425 14.25 9.225 14.25 9Z"
              stroke="currentColor" stroke-width="1.5" />
          </svg>
        </span>
        <span class="nav-label">Configurações</span>
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
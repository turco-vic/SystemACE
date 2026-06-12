<template>
  <div class="app-layout">
    <SidebarAluno ref="sidebarRef" />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <button class="hamburger" @click="openMobileSidebar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
          <div>
            <h1 class="page-title">Dashboard do Aluno</h1>
            <p class="page-sub">Bem-vindo de volta! Aqui está o resumo dos seus equipamentos.</p>
          </div>
        </div>
        <div class="header-right">
          <button class="btn-logout" @click="handleLogout">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Sair
          </button>
        </div>
      </header>

      <main class="content-main">

        <!-- Stat cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">EPIs com Você</span>
              <span class="stat-icon-wrap blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" />
                </svg>
              </span>
            </div>
            <div class="stat-number">{{ episAtribuidos.length }}</div>
            <div class="stat-sub">Equipamentos ativos</div>
            <div class="mini-list" v-if="episAtribuidos.length">
              <div v-for="epi in episAtribuidos.slice(0, 3)" :key="epi.id_entrega_aluno" class="mini-item">
                {{ epi.epis?.nome || 'EPI' }}
              </div>
              <p v-if="episAtribuidos.length > 3" class="more-count">+ {{ episAtribuidos.length - 3 }} outros</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Solicitações</span>
              <span class="stat-icon-wrap orange">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="12" height="12" rx="2" />
                  <path d="M5 8h6M5 5h6M5 11h4" />
                </svg>
              </span>
            </div>
            <div class="stat-number">{{ solicitacoesPendente.length }}</div>
            <div class="stat-sub">Pendentes de aprovação</div>
            <div class="mini-list" v-if="solicitacoesPendente.length">
              <div v-for="sol in solicitacoesPendente.slice(0, 3)" :key="sol.idsolicitacoes" class="mini-item">
                {{ sol.epis?.nome || 'EPI' }}
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Avisos e Alertas</span>
              <span class="stat-icon-wrap red">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 2L15 13.5H1L8 2z" />
                  <path d="M8 6.5v3M8 11.8v.2" />
                </svg>
              </span>
            </div>
            <div class="stat-number">{{ episVencendo.length + (solicitacoesPendente.length > 0 ? 1 : 0) }}</div>
            <div class="stat-sub">Itens requerem atenção</div>
            <ul class="alerts-list">
              <li v-if="episVencendo.length > 0" class="alert-item warning">
                <span class="alert-dot"></span>
                {{ episVencendo.length }} EPI(s) vencendo em breve
              </li>
              <li v-if="solicitacoesPendente.length > 0" class="alert-item info">
                <span class="alert-dot"></span>
                Solicitações aguardando análise
              </li>
              <li class="alert-item standard">
                <span class="alert-dot"></span>
                Zele pelo seu equipamento
              </li>
            </ul>
          </div>
        </div>

        <!-- Atividade recente -->
        <div class="card">
          <div class="card-head">
            <h2 class="card-title">Atividade Recente</h2>
          </div>
          <div class="activity-list">
            <div v-for="activity in recentActivities" :key="activity.id" class="activity-row">
              <div class="activity-icon" :class="activity.iconClass">
                <svg v-if="activity.iconClass === 'aprovado'" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <svg v-else-if="activity.iconClass === 'rejeitado'" width="14" height="14" viewBox="0 0 14 14"
                  fill="none">
                  <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5" />
                  <path d="M7 4.5V7.5l2 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </div>
              <div class="activity-info">
                <p class="activity-desc">{{ activity.description }}</p>
                <span class="activity-date">{{ formatDate(activity.date) }}</span>
              </div>
              <span class="status-pill" :class="activity.statusClass">{{ activity.statusText }}</span>
            </div>
            <div v-if="recentActivities.length === 0" class="no-data">
              Nenhuma atividade registrada recentemente.
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SidebarAluno from '../components/SidebarAluno.vue'
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'

const { supabase, session, signOut } = useSupabase()
const router = useRouter()

const sidebarRef = ref(null)
const openMobileSidebar = () => { if (sidebarRef.value) sidebarRef.value.mobileOpen = true }

const episAtribuidos = ref([])
const solicitacoes = ref([])
const episVencendo = ref([])

const solicitacoesPendente = computed(() =>
  solicitacoes.value.filter(sol => sol.status === 'pendente')
)

const recentActivities = computed(() =>
  solicitacoes.value.slice(0, 5).map(sol => ({
    id: `sol-${sol.idsolicitacoes}`,
    description: `Solicitação de ${sol.epis?.nome || 'EPI'}`,
    date: sol.data_solicitacao,
    iconClass: sol.status,
    statusClass: sol.status,
    statusText: sol.status.charAt(0).toUpperCase() + sol.status.slice(1)
  })).sort((a, b) => new Date(b.date) - new Date(a.date))
)

const loadDashboardData = async () => {
  try {
    const userEmail = session.value.user.email
    const { data: alunoData } = await supabase.from('aluno').select('idaluno').eq('email', userEmail).single()
    if (!alunoData) return
    const alunoId = alunoData.idaluno

    const { data: episData } = await supabase
      .from('aluno_has_epis')
      .select('*, epis:epis_id (nome, tipo, data_validade)')
      .eq('aluno_id', alunoId)
    episAtribuidos.value = episData || []

    const { data: solData } = await supabase
      .from('solicitacoes')
      .select('*, epis:epis_id (nome, tipo)')
      .eq('aluno_id', alunoId)
      .order('data_solicitacao', { ascending: false })
    solicitacoes.value = solData || []

    episVencendo.value = episAtribuidos.value.filter(epi => {
      if (!epi.epis?.data_validade) return false
      const diffDays = Math.ceil((new Date(epi.epis.data_validade) - new Date()) / (1000 * 60 * 60 * 24))
      return diffDays <= 30 && diffDays > 0
    })
  } catch (error) {
    console.error('Erro:', error)
  }
}

const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('pt-BR') : ''

const handleLogout = async () => {
  await signOut()
  router.push('/login')
}

onMounted(loadDashboardData)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

/* ── Tokens ──────────────────────────────────────── */
.app-layout {
  --c-dark: #1E3D58;
  --c-accent: #43B0F1;
  --c-bg: #F5F5F0;
  --c-surface: #FFFFFF;
  --c-text: #1E3D58;
  --c-muted: #5A7187;
  --c-faint: #8FA3B5;
  --c-border: #E2E5EA;

  display: flex;
  min-height: 100vh;
  background: var(--c-bg);
  font-family: 'IBM Plex Sans', sans-serif;
  overflow-x: hidden;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-x: hidden;
}

/* ── Header ──────────────────────────────────────── */
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 2rem;
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border);
  position: sticky;
  top: 0;
  z-index: 10;
  gap: 12px;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--c-text);
  letter-spacing: -0.3px;
  margin: 0;
  line-height: 1.2;
}

.page-sub {
  font-size: 0.8rem;
  color: var(--c-faint);
  margin: 3px 0 0 0;
}

.hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  cursor: pointer;
  color: var(--c-text);
  transition: background 0.15s;
  flex-shrink: 0;
}

.hamburger:hover {
  background: #EDF0F2;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 7px;
  background: none;
  border: 1px solid var(--c-border);
  padding: 9px 18px;
  border-radius: 999px;
  color: var(--c-muted);
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.btn-logout:hover {
  border-color: #ef4444;
  color: #dc2626;
  background: rgba(239, 68, 68, .05);
}

/* ── Main ────────────────────────────────────────── */
.content-main {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* ── Stats ───────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--c-surface);
  border-radius: 14px;
  padding: 22px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.stat-card:hover {
  box-shadow: 0 8px 20px rgba(30, 61, 88, .08);
  transform: translateY(-2px);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--c-faint);
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.stat-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrap.blue {
  background: rgba(67, 176, 241, .12);
  color: var(--c-accent);
}

.stat-icon-wrap.orange {
  background: rgba(245, 158, 11, .1);
  color: #d97706;
}

.stat-icon-wrap.red {
  background: rgba(239, 68, 68, .08);
  color: #dc2626;
}

.stat-number {
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--c-text);
  line-height: 1;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}

.stat-sub {
  font-size: 0.78rem;
  color: var(--c-muted);
  margin-bottom: 16px;
}

/* Mini list */
.mini-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
}

.mini-item {
  background: #FAFAF7;
  padding: 7px 12px;
  border-radius: 7px;
  font-size: 0.8rem;
  color: var(--c-muted);
  border-left: 3px solid var(--c-accent);
}

.more-count {
  font-size: 0.75rem;
  color: var(--c-faint);
  margin: 2px 0 0 4px;
}

/* Alerts */
.alerts-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  padding: 9px 12px;
  border-radius: 8px;
}

.alert-item.warning {
  color: #9a3412;
  background: rgba(234, 88, 12, .08);
}

.alert-item.info {
  color: #1e40af;
  background: rgba(67, 176, 241, .1);
}

.alert-item.standard {
  color: var(--c-muted);
  background: #FAFAF7;
}

.alert-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

/* ── Card atividade ──────────────────────────────── */
.card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
  overflow: hidden;
}

.card-head {
  padding: 20px 22px 0;
}

.card-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 18px 0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.activity-list {
  padding: 0 22px;
}

.activity-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #EDF0F2;
}

.activity-row:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.aprovado {
  background: rgba(34, 197, 94, .12);
  color: #16a34a;
}

.activity-icon.pendente {
  background: rgba(234, 179, 8, .12);
  color: #a16207;
}

.activity-icon.rejeitado {
  background: rgba(239, 68, 68, .1);
  color: #dc2626;
}

.activity-icon.devolvido {
  background: rgba(67, 176, 241, .12);
  color: var(--c-accent);
}

.activity-info {
  flex: 1;
}

.activity-desc {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--c-text);
  margin: 0 0 3px 0;
}

.activity-date {
  font-size: 0.75rem;
  color: var(--c-faint);
}

.status-pill {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  white-space: nowrap;
}

.status-pill.aprovado {
  background: rgba(34, 197, 94, .12);
  color: #166534;
}

.status-pill.pendente {
  background: rgba(234, 179, 8, .12);
  color: #854d0e;
}

.status-pill.rejeitado {
  background: rgba(239, 68, 68, .1);
  color: #991b1b;
}

.status-pill.devolvido {
  background: rgba(67, 176, 241, .12);
  color: #1E3D58;
}

.no-data {
  text-align: center;
  padding: 36px;
  color: var(--c-faint);
  font-size: 0.875rem;
}

/* ── Responsivo ──────────────────────────────────── */
@media (max-width: 900px) {
  .content-main {
    padding: 16px;
    gap: 14px;
  }

  .top-header {
    padding: 12px 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .hamburger {
    display: flex;
  }

  .app-layout {
    display: block;
  }

  .main-wrapper {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .page-sub {
    display: none;
  }
}
</style>

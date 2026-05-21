<template>
  <div class="app-layout">
    <SidebarAluno />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Dashboard do Aluno</h1>
          <p class="stat-sub">Bem-vindo de volta! Aqui está o resumo dos seus equipamentos.</p>
        </div>
        <div class="header-right">
          <button class="btn-logout-ghost" @click="handleLogout">
            <span class="icon">🏃</span> Sair
          </button>
        </div>
      </header>

      <main class="content-container">
        <div class="dashboard-grid">
          
          <div class="card stat-card">
            <div class="card-header">
              <span class="card-icon blue">🛡️</span>
              <h3>EPIs com Você</h3>
            </div>
            <div class="card-body">
              <div class="stat-main">
                <span class="stat-number">{{ episAtribuidos.length }}</span>
                <span class="stat-label">Equipamentos ativos</span>
              </div>
              <div class="mini-list">
                <div v-for="epi in episAtribuidos.slice(0, 3)" :key="epi.id_entrega_aluno" class="mini-item">
                  {{ epi.epis?.nome || 'EPI' }}
                </div>
                <p v-if="episAtribuidos.length > 3" class="more-count">+ {{ episAtribuidos.length - 3 }} outros</p>
              </div>
            </div>
          </div>

          <div class="card stat-card">
            <div class="card-header">
              <span class="card-icon orange">⏳</span>
              <h3>Solicitações</h3>
            </div>
            <div class="card-body">
              <div class="stat-main">
                <span class="stat-number">{{ solicitacoesPendente.length }}</span>
                <span class="stat-label">Pendentes de aprovação</span>
              </div>
              <div class="mini-list">
                <div v-for="sol in solicitacoesPendente.slice(0, 3)" :key="sol.idsolicitacoes" class="mini-item">
                  {{ sol.epis?.nome || 'EPI' }}
                </div>
              </div>
            </div>
          </div>

          <div class="card stat-card">
            <div class="card-header">
              <span class="card-icon red">🔔</span>
              <h3>Avisos e Alertas</h3>
            </div>
            <div class="card-body">
              <ul class="alerts-list">
                <li v-if="episVencendo.length > 0" class="alert-item warning">
                  <span class="dot"></span>
                  {{ episVencendo.length }} EPI(s) vencendo em breve
                </li>
                <li v-if="solicitacoesPendente.length > 0" class="alert-item info">
                  <span class="dot"></span>
                  Há solicitações aguardando análise
                </li>
                <li class="alert-item standard">
                  <span class="dot"></span>
                  Zele pelo seu equipamento
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div class="card timeline-card">
          <div class="card-header-main">
            <h2>Atividade Recente</h2>
          </div>
          <div class="activity-timeline">
            <div v-for="activity in recentActivities" :key="activity.id" class="activity-row">
              <div class="activity-icon-box" :class="activity.iconClass">
                <i :class="activity.icon"></i>
              </div>
              <div class="activity-info">
                <p class="activity-desc">{{ activity.description }}</p>
                <span class="activity-date">{{ formatDate(activity.date) }}</span>
              </div>
              <div class="activity-status">
                <span class="status-pill" :class="activity.statusClass">{{ activity.statusText }}</span>
              </div>
            </div>
            <div v-if="recentActivities.length === 0" class="empty-state">
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

const episAtribuidos = ref([])
const solicitacoes = ref([])
const episVencendo = ref([])

const solicitacoesPendente = computed(() => {
  return solicitacoes.value.filter(sol => sol.status === 'pendente')
})

const recentActivities = computed(() => {
  return solicitacoes.value.slice(0, 5).map(sol => ({
    id: `sol-${sol.idsolicitacoes}`,
    description: `Solicitação de ${sol.epis?.nome || 'EPI'}`,
    date: sol.data_solicitacao,
    icon: sol.status === 'aprovado' ? 'fas fa-check' : (sol.status === 'rejeitado' ? 'fas fa-times' : 'fas fa-clock'),
    iconClass: sol.status,
    statusClass: sol.status,
    statusText: sol.status.charAt(0).toUpperCase() + sol.status.slice(1)
  })).sort((a, b) => new Date(b.date) - new Date(a.date))
})

const loadDashboardData = async () => {
  try {
    const userEmail = session.value.user.email;
    const { data: alunoData } = await supabase.from('aluno').select('idaluno').eq('email', userEmail).single();

    if (!alunoData) return;
    const alunoId = alunoData.idaluno;

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

.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9;
  font-family: 'IBM Plex Sans', sans-serif;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Header */
.top-header {
  background: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.stat-sub {
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 4px;
}

.btn-logout-ghost {
  background: transparent;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-logout-ghost:hover {
  background: #f1f5f9;
  color: #ef4444;
}

/* Dashboard Content */
.content-container {
  padding: 2rem;
  max-width: 1200px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat-card {
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.25rem;
}

.card-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  margin: 0;
}

.card-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.card-icon.blue { background: #eff6ff; }
.card-icon.orange { background: #fff7ed; }
.card-icon.red { background: #fef2f2; }

.stat-main {
  margin-bottom: 1.5rem;
}

.stat-number {
  display: block;
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

.mini-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mini-item {
  background: #f8fafc;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #475569;
  border-left: 3px solid #cbd5e1;
}

.more-count {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 4px 0 0 4px;
}

/* Alerts */
.alerts-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  padding: 8px;
  border-radius: 6px;
}

.alert-item.warning { color: #9a3412; background: #fff7ed; }
.alert-item.info { color: #1e40af; background: #eff6ff; }

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

/* Timeline */
.timeline-card {
  padding: 1.5rem;
}

.card-header-main h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.activity-row {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
  gap: 1rem;
}

.activity-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.activity-icon-box.aprovado { background: #dcfce7; color: #15803d; }
.activity-icon-box.pendente { background: #fef9c3; color: #a16207; }
.activity-icon-box.rejeitado { background: #fee2e2; color: #b91c1c; }

.activity-info {
  flex: 1;
}

.activity-desc {
  font-weight: 500;
  font-size: 0.9rem;
  color: #334155;
  margin: 0;
}

.activity-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.status-pill {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
}

.status-pill.aprovado { background: #dcfce7; color: #166534; }
.status-pill.pendente { background: #fef9c3; color: #854d0e; }
.status-pill.rejeitado { background: #fee2e2; color: #991b1b; }

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
}
</style>
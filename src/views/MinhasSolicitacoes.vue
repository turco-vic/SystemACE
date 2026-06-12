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
            <h1 class="page-title">Minhas Solicitações</h1>
            <p class="page-sub">Acompanhe o status e o histórico dos seus pedidos de EPIs.</p>
          </div>
        </div>
      </header>

      <main class="content-main">
        <p v-if="solicitacoes.length > 0" class="total-label">
          Total: <strong>{{ solicitacoes.length }}</strong>
        </p>

        <div class="solicitacoes-list">
          <div v-for="sol in solicitacoes" :key="sol.idsolicitacoes" class="sol-card">
            <div class="sol-top">
              <div class="sol-icon">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
                  <path d="M8 7v8M2 4l6 3 6-3" />
                </svg>
              </div>
              <div class="sol-info">
                <h3>{{ sol.epis?.nome || 'Equipamento' }}</h3>
                <span class="sol-type">{{ sol.epis?.tipo || 'Geral' }}</span>
              </div>
              <span class="status-pill" :class="sol.status">{{ getStatusText(sol.status) }}</span>
            </div>

            <div class="sol-dates">
              <div class="date-item">
                <span class="date-label">Solicitado em</span>
                <span class="date-val">{{ formatDate(sol.data_solicitacao) }}</span>
              </div>
              <div v-if="sol.data_aprovacao" class="date-item">
                <span class="date-label">Aprovação</span>
                <span class="date-val">{{ formatDate(sol.data_aprovacao) }}</span>
              </div>
              <div v-if="sol.data_entrega" class="date-item">
                <span class="date-label">Entrega</span>
                <span class="date-val">{{ formatDate(sol.data_entrega) }}</span>
              </div>
              <div v-if="sol.data_devolucao" class="date-item">
                <span class="date-label">Devolução</span>
                <span class="date-val">{{ formatDate(sol.data_devolucao) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="solicitacoes.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="8" width="32" height="26" rx="4" stroke="#8FA3B5" stroke-width="2" />
              <path d="M13 20h14M13 26h8" stroke="#8FA3B5" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <h3>Nenhuma solicitação encontrada</h3>
          <p>Você ainda não realizou nenhum pedido de equipamento.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SidebarAluno from '../components/SidebarAluno.vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase, session } = useSupabase()

const sidebarRef = ref(null)
const openMobileSidebar = () => { if (sidebarRef.value) sidebarRef.value.mobileOpen = true }

const solicitacoes = ref([])

const loadSolicitacoes = async () => {
  try {
    const { data: alunoData } = await supabase.from('aluno').select('idaluno')
      .eq('email', session.value.user.email).single()
    if (!alunoData) return
    const { data, error } = await supabase.from('solicitacoes')
      .select('*, epis:epis_id (nome, tipo)')
      .eq('aluno_id', alunoData.idaluno)
      .order('data_solicitacao', { ascending: false })
    if (error) throw error
    solicitacoes.value = data || []
  } catch (e) { console.error(e) }
}

const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR') : ''

const getStatusText = (s) => ({
  pendente: 'Pendente', aprovado: 'Aprovado', rejeitado: 'Rejeitado',
  entregue: 'Entregue', devolvido: 'Devolvido'
}[s] || s)

onMounted(loadSolicitacoes)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

.app-layout {
  --c-dark: #1E3D58;
  --c-accent: #43B0F1;
  --c-bg: #F5F5F0;
  --c-surface: #FFFFFF;
  --c-text: #1E3D58;
  --c-muted: #5A7187;
  --c-faint: #8FA3B5;
  --c-border: #E2E5EA;

  min-height: 100vh;
  background: var(--c-bg);
  font-family: 'IBM Plex Sans', sans-serif;
  overflow-x: hidden;
}

.main-wrapper {
  margin-left: 232px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.top-header {
  display: flex;
  align-items: center;
  padding: 1.4rem 2rem;
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border);
  position: sticky;
  top: 0;
  z-index: 10;
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
  flex-shrink: 0;
}

.content-main {
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.total-label {
  font-size: 0.875rem;
  color: var(--c-muted);
  margin-bottom: 16px;
}

.solicitacoes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sol-card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
  padding: 20px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.sol-card:hover {
  box-shadow: 0 8px 20px rgba(30, 61, 88, .08);
  transform: translateY(-1px);
}

.sol-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid #EDF0F2;
}

.sol-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(67, 176, 241, .1);
  color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sol-info {
  flex: 1;
}

.sol-info h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 3px 0;
}

.sol-type {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--c-faint);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.status-pill {
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.status-pill.pendente {
  background: rgba(245, 158, 11, .12);
  color: #92400e;
}

.status-pill.aprovado {
  background: rgba(34, 197, 94, .12);
  color: #166534;
}

.status-pill.rejeitado {
  background: rgba(239, 68, 68, .1);
  color: #991b1b;
}

.status-pill.entregue {
  background: rgba(139, 92, 246, .1);
  color: #5b21b6;
}

.status-pill.devolvido {
  background: rgba(67, 176, 241, .12);
  color: #1E3D58;
}

.sol-dates {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.date-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.date-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--c-faint);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.date-val {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--c-muted);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--c-surface);
  border-radius: 14px;
  border: 2px dashed var(--c-border);
}

.empty-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.empty-state h3 {
  color: var(--c-text);
  margin-bottom: 6px;
  font-size: 1rem;
}

.empty-state p {
  color: var(--c-faint);
  font-size: 0.875rem;
}

@media (max-width: 900px) {
  .main-wrapper {
    margin-left: 0;
  }

  .hamburger {
    display: flex;
  }

  .content-main {
    padding: 16px;
  }

  .top-header {
    padding: 12px 16px;
  }
}

@media (max-width: 600px) {
  .page-sub {
    display: none;
  }
}
</style>

<template>
  <div class="app-layout">
    <SidebarAluno />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Minhas Solicitações</h1>
          <p class="stat-sub">Acompanhe o status e o histórico dos seus pedidos de EPIs.</p>
        </div>
      </header>

      <main class="content-container">
        <div class="status-summary" v-if="solicitacoes.length > 0">
          <div class="summary-item">
            <span class="dot pendente"></span>
            Total: <strong>{{ solicitacoes.length }}</strong>
          </div>
        </div>

        <div class="solicitacoes-grid">
          <div 
            v-for="solicitacao in solicitacoes" 
            :key="solicitacao.idsolicitacoes" 
            class="card solicitacao-card"
          >
            <div class="card-main-info">
              <div class="epi-icon-box">
                <span class="icon">🛡️</span>
              </div>
              <div class="info-text">
                <h3>{{ solicitacao.epis?.nome || 'Equipamento' }}</h3>
                <span class="category-badge">{{ solicitacao.epis?.tipo || 'Geral' }}</span>
              </div>
              <div class="status-badge-container">
                <span class="status-pill" :class="getStatusClass(solicitacao.status)">
                  {{ getStatusText(solicitacao.status) }}
                </span>
              </div>
            </div>

            <div class="card-details-grid">
              <div class="detail-group">
                <label>Solicitado em</label>
                <span>{{ formatDate(solicitacao.data_solicitacao) }}</span>
              </div>
              
              <div class="detail-group" v-if="solicitacao.data_aprovacao">
                <label>Aprovação</label>
                <span>{{ formatDate(solicitacao.data_aprovacao) }}</span>
              </div>

              <div class="detail-group" v-if="solicitacao.data_entrega">
                <label>Entrega</label>
                <span>{{ formatDate(solicitacao.data_entrega) }}</span>
              </div>

              <div class="detail-group" v-if="solicitacao.data_devolucao">
                <label>Devolução</label>
                <span>{{ formatDate(solicitacao.data_devolucao) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="solicitacoes.length === 0" class="empty-state-container">
          <div class="empty-icon">📂</div>
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
const solicitacoes = ref([])

const loadSolicitacoes = async () => {
  try {
    const userEmail = session.value.user.email;
    const { data: alunoData } = await supabase
      .from('aluno')
      .select('idaluno')
      .eq('email', userEmail)
      .single();

    if (!alunoData) return;

    const { data, error } = await supabase
      .from('solicitacoes')
      .select(`
        *,
        epis:epis_id (nome, tipo)
      `)
      .eq('aluno_id', alunoData.idaluno)
      .order('data_solicitacao', { ascending: false })

    if (error) throw error
    solicitacoes.value = data || []
  } catch (error) {
    console.error('Erro:', error)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const getStatusClass = (status) => {
  return status // Retorna o próprio status para a classe CSS
}

const getStatusText = (status) => {
  const texts = {
    'pendente': 'Pendente',
    'aprovado': 'Aprovado',
    'rejeitado': 'Rejeitado',
    'entregue': 'Entregue',
    'devolvido': 'Devolvido'
  }
  return texts[status] || status
}

onMounted(loadSolicitacoes)
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

/* Content */
.content-container {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.status-summary {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
}

.summary-item {
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Grid de Cards */
.solicitacoes-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.solicitacao-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-main-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.epi-icon-box {
  width: 48px;
  height: 48px;
  background: #f8fafc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.info-text {
  flex: 1;
}

.info-text h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.category-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* Status Pills */
.status-pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
}

.status-pill.pendente { background: #fff7ed; color: #9a3412; }
.status-pill.aprovado { background: #f0fdf4; color: #166534; }
.status-pill.rejeitado { background: #fef2f2; color: #991b1b; }
.status-pill.entregue { background: #f5f3ff; color: #5b21b6; }
.status-pill.devolvido { background: #eff6ff; color: #1e40af; }

/* Grid de Detalhes (Datas) */
.card-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-group label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
}

.detail-group span {
  font-size: 0.9rem;
  font-weight: 500;
  color: #475569;
}

/* Empty State */
.empty-state-container {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state-container h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-state-container p {
  color: #64748b;
}

@media (max-width: 640px) {
  .card-main-info {
    flex-direction: column;
    align-items: flex-start;
  }
  .status-badge-container {
    margin-top: 1rem;
  }
}
</style>
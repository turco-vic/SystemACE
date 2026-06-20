<template>
  <div class="gerenciar-solicitacoes app-layout">
    <SidebarACE />
    
    <div class="main-wrapper">
      <main class="dashboard-main solicitacoes-admin-main">
        <div class="page-header">
          <h1 class="page-title">Gerenciar Solicitações de EPIs</h1>
          <p class="page-subtitle">Analise e aprove ou rejeite as solicitações de empréstimo dos alunos.</p>
        </div>

        <div class="card filters-section">
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Buscar por aluno ou EPI..." 
              class="form-input"
            >
          </div>
          
          <select v-model="statusFilter" class="form-input select-input">
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="rejeitado">Rejeitado</option>
            <option value="entregue">Entregue</option>
            <option value="devolvido">Devolvido</option>
          </select>

          <button 
            v-if="filteredSolicitacoes.some(s => s.status === 'pendente')"
            @click="aceitarTodos"
            class="btn btn-success-solid"
            title="Aprovar todas as solicitações pendentes"
          >
            <i class="fas fa-check-double"></i> Aceitar Todas
          </button>
        </div>

        <div v-if="loading" class="state-container">
          <i class="fas fa-spinner fa-spin state-icon"></i>
          <p>Carregando solicitações...</p>
        </div>

        <div v-else-if="filteredSolicitacoes.length === 0" class="state-container empty-state">
          <i class="fas fa-inbox state-icon"></i>
          <p>Nenhuma solicitação encontrada com os filtros atuais.</p>
        </div>

        <div v-else class="solicitacoes-grid">
          <div v-for="solicitacao in filteredSolicitacoes" :key="solicitacao.idsolicitacoes" class="card solicitacao-card">
            <div class="solicitacao-header">
              
              <div class="aluno-perfil-wrapper">
                <img 
                  :src="getFotoUrl(solicitacao.aluno)" 
                  alt="Foto do Aluno" 
                  class="aluno-foto"
                >
                <div class="aluno-info">
                  <h3>{{ solicitacao.aluno?.nome }} {{ solicitacao.aluno?.sobrenome }}</h3>
                  <p class="aluno-email"><i class="fas fa-envelope"></i> {{ solicitacao.aluno?.email }}</p>
                </div>
              </div>

              <span :class="['status-badge', `status-${solicitacao.status}`]">
                {{ getStatusText(solicitacao.status) }}
              </span>
            </div>

            <div class="solicitacao-body">
              <div class="epi-info">
                <h4>{{ solicitacao.epis?.nome }}</h4>
                <div class="epi-details">
                  <span class="epi-tag"><i class="fas fa-tag"></i> {{ solicitacao.epis?.tipo || 'N/A' }}</span>
                  <span class="epi-date"><i class="fas fa-calendar-alt"></i> {{ formatDate(solicitacao.data_solicitacao) }}</span>
                </div>
              </div>

              <div class="solicitacao-actions" v-if="solicitacao.status === 'pendente'">
                <button 
                  @click="aprovarSolicitacao(solicitacao)" 
                  class="btn btn-success-outline"
                  :disabled="processandoId === solicitacao.idsolicitacoes"
                >
                  <i class="fas fa-check"></i> Aprovar
                </button>
                <button 
                  @click="abrirRejeitarModal(solicitacao)" 
                  class="btn btn-danger-outline"
                  :disabled="processandoId === solicitacao.idsolicitacoes"
                >
                  <i class="fas fa-times"></i> Rejeitar
                </button>
              </div>
              
              <div v-else-if="solicitacao.status === 'aprovado'" class="solicitacao-actions">
                <button 
                  @click="marcarEntregue(solicitacao)" 
                  class="btn btn-primary-outline"
                  :disabled="processandoId === solicitacao.idsolicitacoes"
                >
                  <i class="fas fa-box"></i> Entregar
                </button>
              </div>

              <div v-else-if="solicitacao.status === 'entregue'" class="solicitacao-actions">
                <button 
                  @click="marcarDevolvido(solicitacao)" 
                  class="btn btn-purple-outline"
                  :disabled="processandoId === solicitacao.idsolicitacoes"
                >
                  <i class="fas fa-undo"></i> Devolver
                </button>
              </div>
            </div>

            <div v-if="solicitacao.motivo_rejeicao" class="motivo-rejeicao">
              <i class="fas fa-exclamation-circle"></i>
              <div>
                <strong>Motivo da rejeição:</strong>
                <p>{{ solicitacao.motivo_rejeicao }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <Transition name="modal-fade">
      <div v-if="showRejeitarModal" class="modal-overlay" @click="fecharRejeitarModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Rejeitar Solicitação</h3>
            <button class="btn-close" @click="fecharRejeitarModal"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <p>Deseja realmente rejeitar a solicitação de <strong>{{ solicitacaoSelecionada?.aluno?.nome }}</strong>?</p>
            <div class="form-group">
              <label for="motivo">Motivo da rejeição (opcional)</label>
              <textarea 
                id="motivo"
                v-model="motivoRejeicao" 
                placeholder="Explique o motivo da rejeição para o aluno..."
                class="form-input textarea-input"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="fecharRejeitarModal" class="btn btn-secondary">Cancelar</button>
            <button @click="confirmarRejeicao" class="btn btn-danger-solid">Confirmar Rejeição</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SidebarACE from '../components/SidebarACE.vue'
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'

const { supabase, session, registrarEntregaEPI, removerEntregaEPI } = useSupabase()
const router = useRouter()

const solicitacoes = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const loading = ref(true)
const showRejeitarModal = ref(false)
const solicitacaoSelecionada = ref(null)
const motivoRejeicao = ref('')
const processandoId = ref(null)

const filteredSolicitacoes = computed(() => {
  return solicitacoes.value.filter(sol => {
    const matchesSearch = !searchQuery.value || 
      sol.aluno?.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      sol.aluno?.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      sol.epis?.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !statusFilter.value || sol.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const getFotoUrl = (aluno) => {
  if (aluno?.foto) return aluno.foto;
  
  const inicialNome = aluno?.nome?.charAt(0) || '';
  const inicialSobrenome = aluno?.sobrenome?.charAt(0) || '';
  const iniciais = `${inicialNome}${inicialSobrenome}`.toUpperCase() || 'AL';
  
  return `https://ui-avatars.com/api/?name=${iniciais}&background=2563EB&color=fff&size=128`;
}

const formatDate = (dateString) => {
  if (!dateString) return '---'
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const getStatusText = (status) => {
  const statusMap = {
    pendente: 'Pendente',
    aprovado: 'Aprovado',
    rejeitado: 'Rejeitado',
    entregue: 'Entregue',
    devolvido: 'Devolvido'
  }
  return statusMap[status] || status
}

const loadSolicitacoes = async () => {
  try {
    const { data, error } = await supabase
      .from('solicitacoes')
      .select(`
        idsolicitacoes,
        aluno_id,
        epis_id,
        status,
        data_solicitacao,
        data_aprovacao,
        data_entrega,
        data_devolucao,
        motivo_rejeicao,
        aluno:aluno_id (
          nome,
          sobrenome,
          email,
          cpf,
          foto
        ),
        epis:epis_id (
          nome,
          tipo,
          codigo_patrimonio
        )
      `)
      .order('data_solicitacao', { ascending: false })

    if (error) throw error
    solicitacoes.value = data || []
  } catch (error) {
    console.error('Erro ao carregar solicitações:', error)
  } finally {
    loading.value = false
  }
}

const aprovarSolicitacao = async (solicitacao) => {
  if (!confirm(`Aprovar solicitação de ${solicitacao.aluno?.nome}?`)) return
  processandoId.value = solicitacao.idsolicitacoes

  try {
    const { error } = await supabase
      .from('solicitacoes')
      .update({
        status: 'aprovado',
        data_aprovacao: new Date().toISOString().split('T')[0]
      })
      .eq('idsolicitacoes', solicitacao.idsolicitacoes)

    if (error) throw error
    loadSolicitacoes()
  } catch (error) {
    console.error('Erro ao aprovar solicitação:', error)
    alert('Erro ao aprovar solicitação: ' + error.message)
  } finally {
    processandoId.value = null
  }
}

const abrirRejeitarModal = (solicitacao) => {
  solicitacaoSelecionada.value = solicitacao
  motivoRejeicao.value = ''
  showRejeitarModal.value = true
}

const fecharRejeitarModal = () => {
  showRejeitarModal.value = false
  solicitacaoSelecionada.value = null
  motivoRejeicao.value = ''
}

const confirmarRejeicao = async () => {
  if (!solicitacaoSelecionada.value) return
  processandoId.value = solicitacaoSelecionada.value.idsolicitacoes

  try {
    const { error } = await supabase
      .from('solicitacoes')
      .update({
        status: 'rejeitado',
        motivo_rejeicao: motivoRejeicao.value || null
      })
      .eq('idsolicitacoes', solicitacaoSelecionada.value.idsolicitacoes)

    if (error) throw error
    fecharRejeitarModal()
    loadSolicitacoes()
  } catch (error) {
    console.error('Erro ao rejeitar solicitação:', error)
    alert('Erro ao rejeitar solicitação: ' + error.message)
  } finally {
    processandoId.value = null
  }
}

const marcarEntregue = async (solicitacao) => {
  if (!confirm('Confirmar entrega do EPI ao aluno?')) return
  processandoId.value = solicitacao.idsolicitacoes

  try {
    const { error: updateError } = await supabase
      .from('solicitacoes')
      .update({
        status: 'entregue',
        data_entrega: new Date().toISOString().split('T')[0]
      })
      .eq('idsolicitacoes', solicitacao.idsolicitacoes)

    if (updateError) throw updateError

    const dataEntrega = new Date().toISOString().split('T')[0]
    await registrarEntregaEPI(
      solicitacao.aluno_id,
      solicitacao.epis_id,
      dataEntrega
    )
    loadSolicitacoes()
  } catch (error) {
    console.error('Erro ao marcar como entregue:', error)
    alert('Erro: ' + error.message)
  } finally {
    processandoId.value = null
  }
}

const marcarDevolvido = async (solicitacao) => {
  if (!confirm('Confirmar devolução do EPI?')) return
  processandoId.value = solicitacao.idsolicitacoes

  try {
    const { error: updateError } = await supabase
      .from('solicitacoes')
      .update({
        status: 'devolvido',
        data_devolucao: new Date().toISOString().split('T')[0]
      })
      .eq('idsolicitacoes', solicitacao.idsolicitacoes)

    if (updateError) throw updateError

    await removerEntregaEPI(solicitacao.aluno_id, solicitacao.epis_id)
    loadSolicitacoes()
  } catch (error) {
    console.error('Erro ao marcar como devolvido:', error)
    alert('Erro: ' + error.message)
  } finally {
    processandoId.value = null
  }
}

const aceitarTodos = async () => {
  const pendentes = solicitacoes.value.filter(s => s.status === 'pendente')
  if (pendentes.length === 0) return

  const confirmar = confirm(`Deseja aceitar todas as ${pendentes.length} solicitações pendentes?`)
  if (!confirmar) return

  try {
    for (const solicitacao of pendentes) {
      await supabase
        .from('solicitacoes')
        .update({
          status: 'aprovado',
          data_aprovacao: new Date().toISOString().split('T')[0]
        })
        .eq('idsolicitacoes', solicitacao.idsolicitacoes)
    }
    loadSolicitacoes()
  } catch (error) {
    console.error('Erro ao aceitar todos:', error)
    alert('Erro ao aceitar todos: ' + error.message)
  }
}

onMounted(() => {
  loadSolicitacoes()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

/* Layout Base idêntico ao Dashboard */
.app-layout {
  display: flex;
  flex-direction: row; 
  min-height: 100vh;
  background-color: #f1f5f9;
  font-family: 'IBM Plex Sans', sans-serif;

}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dashboard-main {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* Tipografia de Cabeçalho */
.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.page-subtitle {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
}

/* Cards Gerais */
.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e5e9f0;
}

/* Filtros */
.filters-section {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  padding: 16px 20px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e5e9f0;
  border-radius: 6px;
  padding: 0 12px;
  flex: 1;
  min-width: 250px;
  transition: border-color 0.2s;
}

.search-box:focus-within {
  border-color: #2563EB;
}

.search-icon {
  color: #94a3b8;
  font-size: 0.875rem;
}

.form-input {
  border: none;
  background: transparent;
  padding: 10px;
  font-family: inherit;
  font-size: 0.875rem;
  color: #1e293b;
  width: 100%;
  outline: none;
}

.select-input {
  border: 1px solid #e5e9f0;
  border-radius: 6px;
  padding: 10px 12px;
  background: #ffffff;
  color: #475569;
  cursor: pointer;
  width: auto;
  transition: border-color 0.2s;
}

.select-input:focus {
  border-color: #2563EB;
}

/* Botões */
.btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;
  font-family: inherit;
  border: 1px solid transparent;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-success-solid { background-color: #22c55e; color: white; }
.btn-success-solid:hover:not(:disabled) { background-color: #16a34a; }

.btn-success-outline { background-color: #dcfce7; color: #16a34a; }
.btn-success-outline:hover:not(:disabled) { background-color: #bbf7d0; }

.btn-danger-outline { background-color: #fef2f2; color: #ef4444; }
.btn-danger-outline:hover:not(:disabled) { background-color: #fecaca; }

.btn-danger-solid { background-color: #ef4444; color: white; }
.btn-danger-solid:hover:not(:disabled) { background-color: #dc2626; }

.btn-primary-outline { background-color: #eff6ff; color: #2563EB; }
.btn-primary-outline:hover:not(:disabled) { background-color: #dbeafe; }

.btn-purple-outline { background-color: #f3e8ff; color: #9333ea; }
.btn-purple-outline:hover:not(:disabled) { background-color: #e9d5ff; }

.btn-secondary { background-color: #f1f5f9; color: #475569; }
.btn-secondary:hover:not(:disabled) { background-color: #e2e8f0; }

/* Grid de Solicitações */
.solicitacoes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.solicitacao-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.solicitacao-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
}

.aluno-perfil-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.aluno-foto {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e5e9f0;
}

.aluno-info h3 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 2px 0;
}

.aluno-email {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Badges */
.status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.status-pendente { background-color: #fffbeb; color: #d97706; }
.status-aprovado { background-color: #dcfce7; color: #16a34a; }
.status-rejeitado { background-color: #fef2f2; color: #ef4444; }
.status-entregue { background-color: #eff6ff; color: #2563EB; }
.status-devolvido { background-color: #f1f5f9; color: #64748b; }

/* Body do Card */
.solicitacao-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.epi-info h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin: 0 0 8px 0;
}

.epi-details {
  display: flex;
  gap: 10px;
  font-size: 0.75rem;
  color: #94a3b8;
}

.epi-tag, .epi-date {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e5e9f0;
  font-weight: 500;
}

.solicitacao-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed #e5e9f0;
}

.solicitacao-actions .btn {
  flex: 1;
  justify-content: center;
}

.motivo-rejeicao {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 10px 12px;
  display: flex;
  gap: 8px;
  margin-top: 8px;
  font-size: 0.78rem;
  color: #991b1b;
}

.motivo-rejeicao i {
  margin-top: 2px;
}

.motivo-rejeicao strong {
  display: block;
  margin-bottom: 2px;
  color: #7f1d1d;
}

.motivo-rejeicao p {
  margin: 0;
}

/* Loading & Empty States */
.state-container {
  text-align: center;
  padding: 64px 20px;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e5e9f0;
}

.state-icon {
  font-size: 2.5rem;
  color: #cbd5e1;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 20px;
}

.modal-content {
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
  border: 1px solid #e5e9f0;
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e9f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s;
}

.btn-close:hover {
  color: #1e293b;
}

.modal-body {
  padding: 20px;
}

.modal-body p {
  font-size: 0.875rem;
  color: #475569;
  margin: 0 0 16px 0;
}

.form-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

.textarea-input {
  border: 1px solid #e5e9f0;
  border-radius: 6px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 0.875rem;
  color: #1e293b;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;
}

.textarea-input:focus {
  outline: none;
  border-color: #2563EB;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #e5e9f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #f8fafc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard-main {
    padding: 16px;
  }
  
  .solicitacoes-grid {
    grid-template-columns: 1fr;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .select-input, .btn-success-solid {
    width: 100%;
    justify-content: center;
  }
}
</style>
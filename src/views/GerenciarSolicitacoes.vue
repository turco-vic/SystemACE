<template>
  <div class="app-layout" @click="() => { }">
    <SidebarACE ref="sidebarRef" />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <button class="hamburger" @click.stop="openMobileSidebar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
          <div>
            <h1 class="page-title">Gerenciar Solicitações de EPIs</h1>
            <p class="page-sub">Analise e aprove ou rejeite as solicitações de empréstimo dos alunos.</p>
          </div>
        </div>
      </header>

      <main class="content-main">
        <!-- Filtros -->
        <div class="card filters-bar">
          <div class="search-wrap">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="#8FA3B5" stroke-width="1.5" />
              <path d="M10.5 10.5L14 14" stroke="#8FA3B5" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Buscar por aluno ou EPI..." class="search-input" />
          </div>
          <select v-model="statusFilter" class="filter-select">
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="rejeitado">Rejeitado</option>
            <option value="entregue">Entregue</option>
            <option value="devolvido">Devolvido</option>
          </select>
          <button v-if="filteredSolicitacoes.some(s => s.status === 'pendente')" @click="aceitarTodos"
            class="btn-accept-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Aceitar Todas
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="state-box">
          <div class="spinner"></div>
          <p>Carregando solicitações...</p>
        </div>

        <!-- Empty -->
        <div v-else-if="filteredSolicitacoes.length === 0" class="state-box">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="8" width="32" height="26" rx="4" stroke="#8FA3B5" stroke-width="2" />
            <path d="M13 20h14M13 26h8" stroke="#8FA3B5" stroke-width="2" stroke-linecap="round" />
          </svg>
          <p>Nenhuma solicitação encontrada.</p>
        </div>

        <!-- Grid -->
        <div v-else class="sol-grid">
          <div v-for="sol in filteredSolicitacoes" :key="sol.idsolicitacoes" class="sol-card">
            <!-- Header do card -->
            <div class="sol-head">
              <div class="aluno-info">
                <div class="aluno-avatar">{{ getIniciais(sol.aluno) }}</div>
                <div>
                  <p class="aluno-name">{{ sol.aluno?.nome }} {{ sol.aluno?.sobrenome }}</p>
                  <p class="aluno-email">{{ sol.aluno?.email }}</p>
                </div>
              </div>
              <span class="status-pill" :class="sol.status">{{ getStatusText(sol.status) }}</span>
            </div>

            <!-- Body -->
            <div class="sol-body">
              <p class="epi-name">{{ sol.epis?.nome }}</p>
              <div class="epi-tags">
                <span class="tag">{{ sol.epis?.tipo || 'N/A' }}</span>
                <span class="tag">{{ formatDate(sol.data_solicitacao) }}</span>
              </div>
            </div>

            <!-- Motivo rejeição -->
            <div v-if="sol.motivo_rejeicao" class="motivo-box">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L15 13.5H1L8 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M8 6.5v3M8 11.8v.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <div><strong>Motivo:</strong> {{ sol.motivo_rejeicao }}</div>
            </div>

            <!-- Ações -->
            <div class="sol-actions" v-if="sol.status === 'pendente'">
              <button @click="aprovarSolicitacao(sol)" :disabled="processandoId === sol.idsolicitacoes"
                class="btn-aprovar">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                Aprovar
              </button>
              <button @click="abrirRejeitarModal(sol)" :disabled="processandoId === sol.idsolicitacoes"
                class="btn-rejeitar">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
                Rejeitar
              </button>
            </div>
            <div class="sol-actions" v-else-if="sol.status === 'aprovado'">
              <button @click="marcarEntregue(sol)" :disabled="processandoId === sol.idsolicitacoes"
                class="btn-entregar">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
                  <path d="M8 7v8M2 4l6 3 6-3" />
                </svg>
                Marcar Entregue
              </button>
            </div>
            <div class="sol-actions" v-else-if="sol.status === 'entregue'">
              <button @click="marcarDevolvido(sol)" :disabled="processandoId === sol.idsolicitacoes"
                class="btn-devolver">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h8M6 4l-4 3 4 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                Marcar Devolvido
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal Rejeitar -->
    <Transition name="fade">
      <div v-if="showRejeitarModal" class="modal-overlay" @click="fecharRejeitarModal">
        <div class="modal-box" @click.stop>
          <div class="modal-head">
            <h2>Rejeitar Solicitação</h2>
            <button class="btn-close-modal" @click="fecharRejeitarModal">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <p>Rejeitar solicitação de <strong>{{ solicitacaoSelecionada?.aluno?.nome }}</strong>?</p>
            <div class="form-group">
              <label>Motivo (opcional)</label>
              <textarea v-model="motivoRejeicao" placeholder="Explique o motivo da rejeição..."
                class="textarea"></textarea>
            </div>
          </div>
          <div class="modal-foot">
            <button @click="fecharRejeitarModal" class="btn-cancel-modal">Cancelar</button>
            <button @click="confirmarRejeicao" class="btn-confirm-reject">Confirmar Rejeição</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SidebarACE from '../components/SidebarACE.vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase, registrarEntregaEPI, removerEntregaEPI } = useSupabase()

const sidebarRef = ref(null)
const openMobileSidebar = () => { if (sidebarRef.value) sidebarRef.value.mobileOpen = true }

const solicitacoes = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const loading = ref(true)
const showRejeitarModal = ref(false)
const solicitacaoSelecionada = ref(null)
const motivoRejeicao = ref('')
const processandoId = ref(null)

const filteredSolicitacoes = computed(() => solicitacoes.value.filter(sol => {
  const q = searchQuery.value.toLowerCase()
  const matchesSearch = !q ||
    sol.aluno?.nome.toLowerCase().includes(q) ||
    sol.aluno?.email.toLowerCase().includes(q) ||
    sol.epis?.nome.toLowerCase().includes(q)
  const matchesStatus = !statusFilter.value || sol.status === statusFilter.value
  return matchesSearch && matchesStatus
}))

const getIniciais = (aluno) => {
  const n = aluno?.nome?.charAt(0) || ''
  const s = aluno?.sobrenome?.charAt(0) || ''
  return (n + s).toUpperCase() || 'AL'
}

const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR') : '---'

const getStatusText = (s) => ({ pendente: 'Pendente', aprovado: 'Aprovado', rejeitado: 'Rejeitado', entregue: 'Entregue', devolvido: 'Devolvido' }[s] || s)

const loadSolicitacoes = async () => {
  try {
    const { data, error } = await supabase.from('solicitacoes')
      .select(`idsolicitacoes, aluno_id, epis_id, status, data_solicitacao, data_aprovacao, data_entrega, data_devolucao, motivo_rejeicao,
        aluno:aluno_id (nome, sobrenome, email, foto),
        epis:epis_id (nome, tipo, codigo_patrimonio)`)
      .order('data_solicitacao', { ascending: false })
    if (error) throw error
    solicitacoes.value = data || []
  } catch (e) { console.error(e) } finally { loading.value = false }
}

const aprovarSolicitacao = async (sol) => {
  if (!confirm(`Aprovar solicitação de ${sol.aluno?.nome}?`)) return
  processandoId.value = sol.idsolicitacoes
  try {
    const { error } = await supabase.from('solicitacoes').update({ status: 'aprovado', data_aprovacao: new Date().toISOString().split('T')[0] }).eq('idsolicitacoes', sol.idsolicitacoes)
    if (error) throw error
    loadSolicitacoes()
  } catch (e) { alert('Erro: ' + e.message) } finally { processandoId.value = null }
}

const abrirRejeitarModal = (sol) => { solicitacaoSelecionada.value = sol; motivoRejeicao.value = ''; showRejeitarModal.value = true }
const fecharRejeitarModal = () => { showRejeitarModal.value = false; solicitacaoSelecionada.value = null; motivoRejeicao.value = '' }

const confirmarRejeicao = async () => {
  if (!solicitacaoSelecionada.value) return
  processandoId.value = solicitacaoSelecionada.value.idsolicitacoes
  try {
    const { error } = await supabase.from('solicitacoes').update({ status: 'rejeitado', motivo_rejeicao: motivoRejeicao.value || null }).eq('idsolicitacoes', solicitacaoSelecionada.value.idsolicitacoes)
    if (error) throw error
    fecharRejeitarModal(); loadSolicitacoes()
  } catch (e) { alert('Erro: ' + e.message) } finally { processandoId.value = null }
}

const marcarEntregue = async (sol) => {
  if (!confirm('Confirmar entrega do EPI ao aluno?')) return
  processandoId.value = sol.idsolicitacoes
  try {
    const hoje = new Date().toISOString().split('T')[0]
    const { error } = await supabase.from('solicitacoes').update({ status: 'entregue', data_entrega: hoje }).eq('idsolicitacoes', sol.idsolicitacoes)
    if (error) throw error
    await registrarEntregaEPI(sol.aluno_id, sol.epis_id, hoje)
    loadSolicitacoes()
  } catch (e) { alert('Erro: ' + e.message) } finally { processandoId.value = null }
}

const marcarDevolvido = async (sol) => {
  if (!confirm('Confirmar devolução do EPI?')) return
  processandoId.value = sol.idsolicitacoes
  try {
    const { error } = await supabase.from('solicitacoes').update({ status: 'devolvido', data_devolucao: new Date().toISOString().split('T')[0] }).eq('idsolicitacoes', sol.idsolicitacoes)
    if (error) throw error
    await removerEntregaEPI(sol.aluno_id, sol.epis_id)
    loadSolicitacoes()
  } catch (e) { alert('Erro: ' + e.message) } finally { processandoId.value = null }
}

const aceitarTodos = async () => {
  const pendentes = solicitacoes.value.filter(s => s.status === 'pendente')
  if (!pendentes.length || !confirm(`Aceitar todas as ${pendentes.length} solicitações pendentes?`)) return
  try {
    for (const sol of pendentes) {
      await supabase.from('solicitacoes').update({ status: 'aprovado', data_aprovacao: new Date().toISOString().split('T')[0] }).eq('idsolicitacoes', sol.idsolicitacoes)
    }
    loadSolicitacoes()
  } catch (e) { alert('Erro: ' + e.message) }
}

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
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Filtros */
.card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
}

.filters-bar {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 14px 18px;
  flex-wrap: wrap;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 220px;
  background: #FAFAF7;
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 10px 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-wrap:focus-within {
  border-color: var(--c-accent);
  box-shadow: 0 0 0 3px rgba(67, 176, 241, .1);
  background: #fff;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: var(--c-text);
  width: 100%;
  font-family: inherit;
}

.search-input::placeholder {
  color: var(--c-faint);
}

.filter-select {
  padding: 10px 14px;
  border: 1px solid var(--c-border);
  border-radius: 9px;
  background: var(--c-surface);
  color: var(--c-muted);
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-select:focus {
  border-color: var(--c-accent);
}

.btn-accept-all {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(34, 197, 94, .12);
  color: #16a34a;
  border: 1px solid rgba(34, 197, 94, .2);
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 0.845rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-accept-all:hover {
  background: rgba(34, 197, 94, .2);
}

/* States */
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 56px;
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  color: var(--c-faint);
  font-size: 0.875rem;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(67, 176, 241, .2);
  border-top-color: var(--c-accent);
  border-radius: 50%;
  animation: spin .7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Grid */
.sol-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.sol-card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.sol-card:hover {
  box-shadow: 0 8px 20px rgba(30, 61, 88, .08);
  transform: translateY(-2px);
}

.sol-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 14px;
  border-bottom: 1px solid #EDF0F2;
}

.aluno-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.aluno-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(67, 176, 241, .12);
  color: var(--c-accent);
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.aluno-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 2px 0;
}

.aluno-email {
  font-size: 0.75rem;
  color: var(--c-faint);
  margin: 0;
}

.status-pill {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.7rem;
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
  background: rgba(67, 176, 241, .12);
  color: #1E3D58;
}

.status-pill.devolvido {
  background: rgba(100, 116, 139, .1);
  color: #5A7187;
}

.sol-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.epi-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--c-text);
  margin: 0;
}

.epi-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: #FAFAF7;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 0.75rem;
  color: var(--c-muted);
  font-weight: 500;
}

.motivo-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: rgba(239, 68, 68, .06);
  border: 1px solid rgba(239, 68, 68, .15);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.78rem;
  color: #991b1b;
}

.sol-actions {
  display: flex;
  gap: 8px;
}

.btn-aprovar,
.btn-rejeitar,
.btn-entregar,
.btn-devolver {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px;
  border-radius: 9px;
  font-size: 0.845rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, transform 0.1s;
}

.btn-aprovar {
  background: rgba(34, 197, 94, .12);
  color: #16a34a;
  border-color: rgba(34, 197, 94, .2);
}

.btn-aprovar:hover:not(:disabled) {
  background: rgba(34, 197, 94, .2);
}

.btn-rejeitar {
  background: rgba(239, 68, 68, .08);
  color: #dc2626;
  border-color: rgba(239, 68, 68, .15);
}

.btn-rejeitar:hover:not(:disabled) {
  background: rgba(239, 68, 68, .15);
}

.btn-entregar {
  background: rgba(67, 176, 241, .1);
  color: var(--c-accent);
  border-color: rgba(67, 176, 241, .2);
}

.btn-entregar:hover:not(:disabled) {
  background: rgba(67, 176, 241, .18);
}

.btn-devolver {
  background: rgba(139, 92, 246, .1);
  color: #7c3aed;
  border-color: rgba(139, 92, 246, .2);
}

.btn-devolver:hover:not(:disabled) {
  background: rgba(139, 92, 246, .18);
}

.btn-aprovar:disabled,
.btn-rejeitar:disabled,
.btn-entregar:disabled,
.btn-devolver:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, .45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  backdrop-filter: blur(3px);
}

.modal-box {
  background: var(--c-surface);
  border-radius: 16px;
  padding: 28px;
  max-width: 460px;
  width: 90%;
  box-shadow: 0 24px 64px rgba(30, 61, 88, .18);
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-head h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
}

.btn-close-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-faint);
  padding: 6px;
  border-radius: 7px;
  display: flex;
  transition: color 0.15s, background 0.15s;
}

.btn-close-modal:hover {
  color: #dc2626;
  background: rgba(239, 68, 68, .06);
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal-body p {
  font-size: 0.875rem;
  color: var(--c-muted);
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--c-muted);
}

.textarea {
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 10px 13px;
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--c-text);
  background: #FAFAF7;
  resize: vertical;
  min-height: 90px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.textarea:focus {
  border-color: var(--c-accent);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(67, 176, 241, .1);
}

.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-cancel-modal {
  background: #EDF0F2;
  color: var(--c-muted);
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel-modal:hover {
  background: #DDE2E8;
}

.btn-confirm-reject {
  background: #dc2626;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-confirm-reject:hover {
  background: #b91c1c;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

  .sol-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .filters-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .page-sub {
    display: none;
  }
}
</style>

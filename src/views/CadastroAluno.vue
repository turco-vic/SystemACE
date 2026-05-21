<template>
  <div class="app-layout" @click="activeMenu = null">
    <SidebarACE />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Gestão de Alunos</h1>
          <p class="stat-sub">Total: <strong>{{ stats.total }}</strong> alunos</p>
        </div>
        <div class="header-right">
          <button class="btn-primary" @click="openCadastroModal">
            <span class="icon">➕</span>
            Cadastrar Aluno
          </button>
        </div>
      </header>

      <main class="content-container">
        <div class="card search-card">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Buscar por nome, email ou CPF..." 
              class="search-input"
            />
          </div>
        </div>

        <div class="card table-card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th class="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="aluno in filteredAlunos" :key="aluno.idaluno">
                  <td>
                    <div class="user-profile">
                      <div class="avatar">
                        <img v-if="aluno.foto" :src="aluno.foto" alt="Avatar" />
                        <span v-else>{{ aluno.nome?.charAt(0).toUpperCase() || '?' }}</span>
                      </div>
                      <div class="user-info">
                        <span class="user-name">{{ aluno.nome }} {{ aluno.sobrenome }}</span>
                        <span class="user-id">#{{ aluno.idaluno }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ aluno.email || '—' }}</td>
                  <td>{{ aluno.cpf || '—' }}</td>
                  <td>{{ aluno.telefone || '—' }}</td>
                  <td class="text-right">
                    <div class="actions-wrapper">
                      <button class="btn-dots" @click.stop="openMenu($event, aluno)">⋮</button>
                      
                      <div v-if="activeMenu === aluno.idaluno" class="dropdown-menu">
                        <button @click="editarAluno(aluno)" class="dropdown-item">✏️ Editar</button>
                        <button @click="abrirDetalhesAluno(aluno)" class="dropdown-item">📦 Ver EPIs</button>
                        <div class="dropdown-divider"></div>
                        <button @click="deletarAluno(aluno.idaluno)" class="dropdown-item delete">🗑️ Excluir</button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredAlunos.length === 0">
                  <td colspan="5" class="empty-state">
                    Nenhum aluno encontrado para esta busca.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <div v-if="showCadastroModal" class="modal-overlay" @click="closeCadastroModal">
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditando ? 'Editar Aluno' : 'Novo Aluno' }}</h3>
          <button class="close-x" @click="closeCadastroModal">&times;</button>
        </div>
        
        <div v-if="!isEditando" class="modal-alert">
          <p>⚠️ Cadastro manual não gera senha. O aluno deve se registrar para acessar o app.</p>
        </div>

        <form @submit.prevent="salvarAluno" class="modal-form">
          <div class="form-grid">
            <div class="field">
              <label>Nome *</label>
              <input v-model="form.nome" type="text" required placeholder="Ex: João" />
            </div>
            <div class="field">
              <label>Sobrenome</label>
              <input v-model="form.sobrenome" type="text" placeholder="Ex: Silva" />
            </div>
            <div class="field">
              <label>CPF</label>
              <input v-model="form.cpf" type="text" placeholder="000.000.000-00" />
            </div>
            <div class="field">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="email@exemplo.com" />
            </div>
            <div class="field full-width">
              <label>Telefone</label>
              <input v-model="form.telefone" type="text" placeholder="(00) 00000-0000" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" @click="closeCadastroModal">Cancelar</button>
            <button type="submit" class="btn-primary">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showDetalhesModal" class="modal-overlay" @click="showDetalhesModal = false">
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h3>EPIs de {{ detalhesAluno.nome }}</h3>
          <button class="close-x" @click="showDetalhesModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div v-if="loadingEPIsAluno" class="loader">Carregando equipamentos...</div>
          <div v-else>
            <ul v-if="episDoAluno.length > 0" class="epi-list">
              <li v-for="item in episDoAluno" :key="item.id_entrega_aluno" class="epi-item">
                <span class="epi-name">{{ item.epis?.nome }}</span>
                <span class="badge">Patrimônio: {{ item.epis?.codigo_patrimonio || 'N/A' }}</span>
              </li>
            </ul>
            <div v-else class="empty-state">Nenhum EPI vinculado a este aluno.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
'
<script setup>

import SidebarACE from '../components/sidebarace.vue'
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

// Lógica Supabase
const { getAlunos, addAluno, updateAluno, deleteAluno, getAlunoComEPIs } = useSupabase()

// Estados
const alunos = ref([])
const searchQuery = ref('')
const activeMenu = ref(null)
const showCadastroModal = ref(false)
const isEditando = ref(false)
const editandoId = ref(null)
const stats = ref({ total: 0 })
const loadingEPIsAluno = ref(false)
const episDoAluno = ref([])
const showDetalhesModal = ref(false)
const detalhesAluno = ref({})

const form = ref({ nome: '', sobrenome: '', cpf: '', email: '', telefone: '' })

// Filtragem
const filteredAlunos = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return alunos.value
  return alunos.value.filter(a => 
    (a.nome + ' ' + a.sobrenome).toLowerCase().includes(q) ||
    (a.email || '').toLowerCase().includes(q) ||
    (a.cpf || '').includes(q)
  )
})

// Ações
const carregarAlunos = async () => {
  try {
    alunos.value = await getAlunos() || []
    stats.value.total = alunos.value.length
  } catch (e) { console.error(e) }
}

const openCadastroModal = () => {
  isEditando.value = false
  form.value = { nome: '', sobrenome: '', cpf: '', email: '', telefone: '' }
  showCadastroModal.value = true
}

const closeCadastroModal = () => {
  showCadastroModal.value = false
}

const salvarAluno = async () => {
  try {
    if (isEditando.value) {
      await updateAluno(editandoId.value, form.value)
    } else {
      await addAluno(form.value)
    }
    await carregarAlunos()
    closeCadastroModal()
  } catch (e) { alert('Erro ao salvar') }
}

const openMenu = (event, aluno) => {
  activeMenu.value = activeMenu.value === aluno.idaluno ? null : aluno.idaluno
}

const editarAluno = (aluno) => {
  isEditando.value = true
  editandoId.value = aluno.idaluno
  form.value = { ...aluno }
  showCadastroModal.value = true
  activeMenu.value = null
}

const abrirDetalhesAluno = async (aluno) => {
  detalhesAluno.value = aluno
  loadingEPIsAluno.value = true
  showDetalhesModal.value = true
  activeMenu.value = null
  episDoAluno.value = await getAlunoComEPIs(aluno.idaluno) || []
  loadingEPIsAluno.value = false
}

const deletarAluno = async (id) => {
  if (confirm('Excluir este aluno permanentemente?')) {
    await deleteAluno(id)
    await carregarAlunos()
  }
}

onMounted(carregarAlunos)
</script>

<style scoped>
/* Layout Base */
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
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
  margin: 4px 0 0;
}

/* Cards e Content */
.content-container {
  padding: 2rem;
  max-width: 1300px;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
}

/* Busca */
.search-card {
  padding: 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8fafc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.search-input {
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
  font-size: 0.95rem;
}

/* Tabela */
.table-card {
  overflow: visible;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-size: 0.9rem;
}

/* Aluno Info Cell */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #475569;
  overflow: hidden;
}

.user-name {
  display: block;
  font-weight: 600;
  color: #1e293b;
}

.user-id {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Ações e Dropdown */
.actions-wrapper {
  position: relative;
}

.btn-dots {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #94a3b8;
  padding: 0.5rem;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  z-index: 50;
  min-width: 160px;
  overflow: hidden;
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.dropdown-item:hover { background: #f8fafc; }
.dropdown-item.delete { color: #ef4444; }

.dropdown-divider {
  height: 1px;
  background: #f1f5f9;
}

/* Modais */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 550px;
  padding: 2rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.field { display: flex; flex-direction: column; gap: 0.5rem; }
.full-width { grid-column: span 2; }

label { font-size: 0.85rem; font-weight: 600; color: #475569; }

input {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline-color: #2563eb;
}

.modal-alert {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: #c2410c;
}

.modal-footer {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Botões */
.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-ghost {
  background: transparent;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
}

.badge {
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #64748b;
}

.text-right { text-align: right; }
.empty-state { text-align: center; padding: 3rem; color: #94a3b8; }
</style>
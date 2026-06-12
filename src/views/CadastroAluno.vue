<template>
  <div class="app-layout" @click="activeMenu = null">
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
            <h1 class="page-title">Gestão de Alunos</h1>
            <p class="page-sub">Total: <strong>{{ stats.total }}</strong> alunos</p>
          </div>
        </div>
        <div class="header-right">
          <button class="btn-primary" @click.stop="openCadastroModal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            Cadastrar Aluno
          </button>
        </div>
      </header>

      <main class="content-main">

        <!-- Search card -->
        <div class="card search-card">
          <div class="search-wrap">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="#8FA3B5" stroke-width="1.5" />
              <path d="M10.5 10.5L14 14" stroke="#8FA3B5" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Buscar por nome, email ou CPF..."
              class="search-input" />
          </div>
        </div>

        <!-- Table card -->
        <div class="card table-card">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th class="th-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="aluno in filteredAlunos" :key="aluno.idaluno">
                  <td>
                    <div class="user-cell">
                      <div class="avatar">
                        <img v-if="aluno.foto" :src="aluno.foto" alt="Avatar" />
                        <span v-else>{{ aluno.nome?.charAt(0).toUpperCase() || '?' }}</span>
                      </div>
                      <div>
                        <span class="user-name">{{ aluno.nome }} {{ aluno.sobrenome }}</span>
                        <span class="user-id">#{{ aluno.idaluno }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ aluno.email || '—' }}</td>
                  <td class="mono">{{ aluno.cpf || '—' }}</td>
                  <td class="mono">{{ aluno.telefone || '—' }}</td>
                  <td class="td-right">
                    <div class="actions-wrap">
                      <button class="btn-dots" @click.stop="openMenu($event, aluno)">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="3" r="1.2" fill="currentColor" />
                          <circle cx="8" cy="8" r="1.2" fill="currentColor" />
                          <circle cx="8" cy="13" r="1.2" fill="currentColor" />
                        </svg>
                      </button>
                      <div v-if="activeMenu === aluno.idaluno" class="action-menu">
                        <button @click.stop="editarAluno(aluno)" class="menu-item">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 13L4.5 12 12.5 4 10 1.5 2 9.5 1 13Z" stroke="currentColor" stroke-width="1.2"
                              stroke-linejoin="round" />
                          </svg>
                          Editar
                        </button>
                        <button @click.stop="abrirDetalhesAluno(aluno)" class="menu-item">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
                            <path d="M8 7v8M2 4l6 3 6-3" />
                          </svg>
                          Ver EPIs
                        </button>
                        <div class="menu-divider"></div>
                        <button @click.stop="deletarAluno(aluno.idaluno)" class="menu-item danger">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 3.5H12M5 3.5V2.5H9V3.5M5.5 6V11M8.5 6V11M3 3.5L3.5 12H10.5L11 3.5H3Z"
                              stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Excluir
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredAlunos.length === 0">
                  <td colspan="5" class="no-data">Nenhum aluno encontrado.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>

    <!-- Modal Cadastro / Edição -->
    <div v-if="showCadastroModal" class="modal-overlay" @click="closeCadastroModal">
      <div class="modal-box" @click.stop>
        <div class="modal-head">
          <h2>{{ isEditando ? 'Editar Aluno' : 'Novo Aluno' }}</h2>
          <button class="btn-close-modal" @click="closeCadastroModal">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div v-if="!isEditando" class="modal-alert">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L15 13.5H1L8 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M8 6.5v3M8 11.8v.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          Cadastro manual não gera senha. O aluno deve se registrar para acessar o sistema.
        </div>

        <form @submit.prevent="salvarAluno" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nome *</label>
              <input v-model="form.nome" type="text" required placeholder="Ex: João" />
            </div>
            <div class="form-group">
              <label>Sobrenome</label>
              <input v-model="form.sobrenome" type="text" placeholder="Ex: Silva" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>CPF</label>
              <input v-model="form.cpf" type="text" placeholder="000.000.000-00" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="email@exemplo.com" />
            </div>
          </div>
          <div class="form-group">
            <label>Telefone</label>
            <input v-model="form.telefone" type="text" placeholder="(00) 00000-0000" />
          </div>
          <div class="modal-foot">
            <button type="button" class="btn-cancel-modal" @click="closeCadastroModal">Cancelar</button>
            <button type="submit" class="btn-save">Salvar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal EPIs do aluno -->
    <div v-if="showDetalhesModal" class="modal-overlay" @click="showDetalhesModal = false">
      <div class="modal-box" @click.stop>
        <div class="modal-head">
          <h2>EPIs de {{ detalhesAluno.nome }}</h2>
          <button class="btn-close-modal" @click="showDetalhesModal = false">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="epi-list-wrap">
          <div v-if="loadingEPIsAluno" class="no-data">Carregando equipamentos...</div>
          <ul v-else-if="episDoAluno.length > 0" class="epi-list">
            <li v-for="item in episDoAluno" :key="item.id_entrega_aluno" class="epi-item">
              <div class="epi-icon">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
                  <path d="M8 7v8M2 4l6 3 6-3" />
                </svg>
              </div>
              <span class="epi-name">{{ item.epis?.nome }}</span>
              <span class="epi-badge">{{ item.epis?.codigo_patrimonio || 'S/N' }}</span>
            </li>
          </ul>
          <div v-else class="no-data">Nenhum EPI vinculado a este aluno.</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import SidebarACE from '../components/SidebarACE.vue'
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { getAlunos, addAluno, updateAluno, deleteAluno, getAlunoComEPIs } = useSupabase()

const sidebarRef = ref(null)
const openMobileSidebar = () => { if (sidebarRef.value) sidebarRef.value.mobileOpen = true }

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

const filteredAlunos = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return alunos.value
  return alunos.value.filter(a =>
    (a.nome + ' ' + a.sobrenome).toLowerCase().includes(q) ||
    (a.email || '').toLowerCase().includes(q) ||
    (a.cpf || '').includes(q)
  )
})

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

const closeCadastroModal = () => { showCadastroModal.value = false }

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
  activeMenu.value = null
}

onMounted(carregarAlunos)
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

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--c-accent);
  color: #fff;
  border: none;
  padding: 9px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 600;
  font-family: inherit;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(67, 176, 241, .28);
}

.btn-primary:hover {
  background: #2E9BDF;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(67, 176, 241, .38);
}

/* ── Main ────────────────────────────────────────── */
.content-main {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* ── Cards ───────────────────────────────────────── */
.card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
}

.search-card {
  padding: 14px 18px;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 9px;
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

.table-card {
  overflow: hidden;
}

/* ── Tabela ──────────────────────────────────────── */
.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table thead tr {
  background: #FAFAF7;
}

.data-table th {
  padding: 10px 16px;
  text-align: left;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--c-faint);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  border-bottom: 1px solid var(--c-border);
  white-space: nowrap;
}

.th-right {
  text-align: right;
}

.data-table td {
  padding: 13px 16px;
  color: var(--c-muted);
  border-bottom: 1px solid #EDF0F2;
  vertical-align: middle;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.data-table tbody tr:hover td {
  background: #FAFAF7;
}

.td-right {
  text-align: right;
}

.mono {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
}

/* User cell */
.user-cell {
  display: flex;
  align-items: center;
  gap: 11px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(67, 176, 241, .12);
  color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  display: block;
  font-weight: 600;
  color: var(--c-text);
  font-size: 0.875rem;
}

.user-id {
  display: block;
  font-size: 0.72rem;
  color: var(--c-faint);
  margin-top: 2px;
}

/* Ações */
.actions-wrap {
  position: relative;
  display: inline-block;
}

.btn-dots {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-faint);
  padding: 6px 8px;
  border-radius: 7px;
  transition: background 0.15s, color 0.15s;
  display: flex;
  align-items: center;
}

.btn-dots:hover {
  background: #EDF0F2;
  color: var(--c-text);
}

.action-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  z-index: 200;
  min-width: 148px;
  box-shadow: 0 8px 24px rgba(30, 61, 88, .12);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: none;
  color: var(--c-muted);
  cursor: pointer;
  font-size: 0.845rem;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
}

.menu-item:hover {
  background: #FAFAF7;
  color: var(--c-text);
}

.menu-item.danger:hover {
  background: rgba(239, 68, 68, .06);
  color: #dc2626;
}

.menu-divider {
  height: 1px;
  background: var(--c-border);
}

.no-data {
  text-align: center;
  color: var(--c-faint);
  padding: 40px;
  font-size: 0.875rem;
}

/* ── Modais ──────────────────────────────────────── */
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
  max-width: 540px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(30, 61, 88, .18);
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.modal-head h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
  letter-spacing: -0.2px;
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

.modal-alert {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  background: rgba(234, 88, 12, .07);
  border: 1px solid rgba(234, 88, 12, .2);
  color: #9a3412;
  padding: 11px 14px;
  border-radius: 9px;
  font-size: 0.82rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-muted);
}

.form-group input {
  background: #FAFAF7;
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 10px 13px;
  color: var(--c-text);
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  outline: none;
}

.form-group input:focus {
  border-color: var(--c-accent);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(67, 176, 241, .1);
}

.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.btn-save {
  background: var(--c-accent);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(67, 176, 241, .28);
}

.btn-save:hover {
  background: #2E9BDF;
  box-shadow: 0 6px 18px rgba(67, 176, 241, .38);
}

.btn-cancel-modal {
  background: #EDF0F2;
  color: var(--c-muted);
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  transition: background 0.2s;
}

.btn-cancel-modal:hover {
  background: #DDE2E8;
}

/* EPI list no modal */
.epi-list-wrap {
  padding: 0 4px;
}

.epi-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.epi-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  background: #FAFAF7;
  border-radius: 9px;
  border: 1px solid var(--c-border);
}

.epi-icon {
  width: 30px;
  height: 30px;
  background: rgba(67, 176, 241, .1);
  color: var(--c-accent);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.epi-name {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--c-text);
}

.epi-badge {
  background: rgba(67, 176, 241, .1);
  color: var(--c-accent);
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ── Responsivo ──────────────────────────────────── */
@media (max-width: 900px) {
  .content-main {
    padding: 16px;
    gap: 12px;
  }

  .top-header {
    padding: 12px 16px;
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
  .form-row {
    grid-template-columns: 1fr;
  }

  .page-sub {
    display: none;
  }
}
</style>

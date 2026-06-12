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
            <h1 class="page-title">Gestão de Funcionários</h1>
            <p class="page-sub">Total: <strong>{{ stats.total }}</strong> funcionários</p>
          </div>
        </div>
        <button class="btn-primary" @click.stop="openCadastroModal">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          Cadastrar Funcionário
        </button>
      </header>

      <main class="content-main">
        <div class="card search-card">
          <div class="search-wrap">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="#8FA3B5" stroke-width="1.5" />
              <path d="M10.5 10.5L14 14" stroke="#8FA3B5" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Buscar por nome, email ou CPF..."
              class="search-input" />
          </div>
          <select v-model="statusFilter" class="filter-select">
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <div class="card table-card">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Funcionário</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Função</th>
                  <th>Status</th>
                  <th class="th-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="func in filteredFuncionarios" :key="func.idfuncionario">
                  <td>
                    <div class="user-cell">
                      <div class="avatar">
                        <img v-if="func.foto" :src="func.foto" alt="Avatar" />
                        <span v-else>{{ func.nome?.charAt(0).toUpperCase() || '?' }}</span>
                      </div>
                      <div>
                        <span class="user-name">{{ func.nome }} {{ func.sobrenome }}</span>
                        <span class="user-id">#{{ func.idfuncionario }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ func.email || '—' }}</td>
                  <td class="mono">{{ func.cpf || '—' }}</td>
                  <td>{{ func.funcao || '—' }}</td>
                  <td>
                    <span class="status-pill" :class="func.status === 'Ativo' ? 'ativo' : 'inativo'">
                      {{ func.status || 'Ativo' }}
                    </span>
                  </td>
                  <td class="td-right">
                    <div class="actions-wrap">
                      <button class="btn-dots" @click.stop="openMenu($event, func)">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="3" r="1.2" fill="currentColor" />
                          <circle cx="8" cy="8" r="1.2" fill="currentColor" />
                          <circle cx="8" cy="13" r="1.2" fill="currentColor" />
                        </svg>
                      </button>
                      <div v-if="activeMenu === func.idfuncionario" class="action-menu"
                        :class="{ 'drop-up': menuUpId === func.idfuncionario }">
                        <button @click.stop="editarFuncionario(func)" class="menu-item">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 13L4.5 12 12.5 4 10 1.5 2 9.5 1 13Z" stroke="currentColor" stroke-width="1.2"
                              stroke-linejoin="round" />
                          </svg>
                          Editar
                        </button>
                        <button @click.stop="toggleStatus(func)" class="menu-item">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2" />
                            <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" stroke-width="1.2"
                              stroke-linecap="round" />
                          </svg>
                          {{ func.status === 'Ativo' ? 'Desativar' : 'Ativar' }}
                        </button>
                        <div class="menu-divider"></div>
                        <button @click.stop="deletarFuncionario(func.idfuncionario)" class="menu-item danger">
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
                <tr v-if="filteredFuncionarios.length === 0">
                  <td colspan="6" class="no-data">Nenhum funcionário encontrado.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal -->
    <div v-if="showCadastroModal" class="modal-overlay" @click="closeCadastroModal">
      <div class="modal-box" @click.stop>
        <div class="modal-head">
          <h2>{{ isEditando ? 'Editar Funcionário' : 'Novo Funcionário' }}</h2>
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
          Cadastro manual não gera senha. O funcionário deve se registrar para acessar o sistema.
        </div>

        <form @submit.prevent="salvarFuncionario" class="modal-form">
          <div class="form-row">
            <div class="form-group"><label>Nome *</label><input v-model="form.nome" type="text" required
                placeholder="Ex: Carlos" /></div>
            <div class="form-group"><label>Sobrenome</label><input v-model="form.sobrenome" type="text"
                placeholder="Ex: Souza" /></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>CPF</label><input v-model="form.cpf" type="text"
                placeholder="000.000.000-00" /></div>
            <div class="form-group"><label>Email</label><input v-model="form.email" type="email"
                placeholder="email@exemplo.com" /></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Telefone</label><input v-model="form.telefone" type="text"
                placeholder="(00) 00000-0000" /></div>
            <div class="form-group"><label>Função</label><input v-model="form.funcao" type="text"
                placeholder="Ex: Almoxarife" /></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Data de Nascimento</label><input v-model="form.data_nascimento"
                type="date" /></div>
            <div class="form-group" v-if="isEditando"><label>Status</label>
              <select v-model="form.status">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn-cancel-modal" @click="closeCadastroModal">Cancelar</button>
            <button type="submit" class="btn-save" :disabled="saving">{{ saving ? 'Salvando...' : 'Salvar' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarACE from '../components/SidebarACE.vue'
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { getFuncionarios, addFuncionario, updateFuncionario, deleteFuncionario } = useSupabase()

const sidebarRef = ref(null)
const openMobileSidebar = () => { if (sidebarRef.value) sidebarRef.value.mobileOpen = true }

const funcionarios = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const activeMenu = ref(null)
const menuUpId = ref(null)
const showCadastroModal = ref(false)
const isEditando = ref(false)
const editandoId = ref(null)
const saving = ref(false)
const stats = ref({ total: 0 })

const form = ref({ nome: '', sobrenome: '', cpf: '', email: '', telefone: '', funcao: '', data_nascimento: '', status: 'Ativo' })

const filteredFuncionarios = computed(() => {
  let res = funcionarios.value
  const q = searchQuery.value.toLowerCase().trim()
  if (q) res = res.filter(f => (f.nome + ' ' + f.sobrenome).toLowerCase().includes(q) || (f.email || '').toLowerCase().includes(q) || (f.cpf || '').includes(q))
  if (statusFilter.value) res = res.filter(f => f.status === statusFilter.value)
  return res
})

const carregarFuncionarios = async () => {
  try { funcionarios.value = await getFuncionarios() || []; stats.value.total = funcionarios.value.length }
  catch (e) { console.error(e) }
}

const openCadastroModal = () => {
  isEditando.value = false
  form.value = { nome: '', sobrenome: '', cpf: '', email: '', telefone: '', funcao: '', data_nascimento: '', status: 'Ativo' }
  showCadastroModal.value = true
}

const closeCadastroModal = () => { showCadastroModal.value = false }

const salvarFuncionario = async () => {
  saving.value = true
  try {
    const payload = { nome: form.value.nome, sobrenome: form.value.sobrenome, cpf: form.value.cpf || null, email: form.value.email || null, telefone: form.value.telefone || null, funcao: form.value.funcao || null, data_nascimento: form.value.data_nascimento || null, status: form.value.status || 'Ativo' }
    if (isEditando.value) await updateFuncionario(editandoId.value, payload)
    else await addFuncionario(payload)
    await carregarFuncionarios(); closeCadastroModal()
  } catch (e) { alert('Erro ao salvar: ' + e.message) } finally { saving.value = false }
}

const openMenu = (event, func) => {
  const id = func.idfuncionario
  if (activeMenu.value === id) { activeMenu.value = null; menuUpId.value = null; return }
  const rect = event.currentTarget.getBoundingClientRect()
  menuUpId.value = (window.innerHeight - rect.bottom) < 180 ? id : null
  activeMenu.value = id
}

const editarFuncionario = (func) => { isEditando.value = true; editandoId.value = func.idfuncionario; form.value = { ...func, data_nascimento: func.data_nascimento || '' }; showCadastroModal.value = true; activeMenu.value = null }

const toggleStatus = async (func) => {
  try { await updateFuncionario(func.idfuncionario, { status: func.status === 'Ativo' ? 'Inativo' : 'Ativo' }); await carregarFuncionarios() }
  catch (e) { alert('Erro: ' + e.message) }
  activeMenu.value = null
}

const deletarFuncionario = async (id) => {
  if (confirm('Excluir este funcionário permanentemente?')) {
    try { await deleteFuncionario(id); await carregarFuncionarios() }
    catch (e) { alert('Erro: ' + e.message) }
  }
  activeMenu.value = null
}

onMounted(carregarFuncionarios)
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
  flex-shrink: 0;
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

.card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
}

.search-card {
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
  min-width: 200px;
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
}

.filter-select:focus {
  border-color: var(--c-accent);
}

.table-card {
  overflow: hidden;
}

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

.status-pill {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
}

.status-pill.ativo {
  background: rgba(34, 197, 94, .12);
  color: #16a34a;
}

.status-pill.inativo {
  background: rgba(239, 68, 68, .1);
  color: #dc2626;
}

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

.action-menu.drop-up {
  top: auto;
  bottom: calc(100% + 4px);
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

.form-group input,
.form-group select {
  background: #FAFAF7;
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 10px 13px;
  color: var(--c-text);
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.form-group input:focus,
.form-group select:focus {
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
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
  .form-row {
    grid-template-columns: 1fr;
  }

  .page-sub {
    display: none;
  }

  .search-card {
    flex-direction: column;
  }
}
</style>

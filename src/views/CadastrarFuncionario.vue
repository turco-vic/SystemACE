<template>
  <div class="app-layout" @click="activeMenu = null">
    <SidebarACE />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Gestão de Funcionários</h1>
          <p class="stat-sub">Total: <strong>{{ stats.total }}</strong> funcionários</p>
        </div>
        <div class="header-right">
          <button class="btn-primary" @click="openCadastroModal">
            <span class="icon">➕</span>
            Cadastrar Funcionário
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
          <select v-model="statusFilter" class="status-select">
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <div class="card table-card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Funcionário</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Função</th>
                  <th>Status</th>
                  <th class="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="func in filteredFuncionarios" :key="func.idfuncionario">
                  <td>
                    <div class="user-profile">
                      <div class="avatar">
                        <img v-if="func.foto" :src="func.foto" alt="Avatar" />
                        <span v-else>{{ func.nome?.charAt(0).toUpperCase() || '?' }}</span>
                      </div>
                      <div class="user-info">
                        <span class="user-name">{{ func.nome }} {{ func.sobrenome }}</span>
                        <span class="user-id">#{{ func.idfuncionario }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ func.email || '—' }}</td>
                  <td>{{ func.cpf || '—' }}</td>
                  <td>{{ func.funcao || '—' }}</td>
                  <td>
                    <span class="status-badge" :class="func.status === 'Ativo' ? 'ativo' : 'inativo'">
                      {{ func.status || 'Ativo' }}
                    </span>
                  </td>
                  <td class="text-right">
                    <div class="actions-wrapper">
                      <button class="btn-dots" @click.stop="openMenu($event, func)">⋮</button>
                      <div v-if="activeMenu === func.idfuncionario" class="dropdown-menu">
                        <button @click="editarFuncionario(func)" class="dropdown-item">✏️ Editar</button>
                        <button @click="toggleStatus(func)" class="dropdown-item">
                          {{ func.status === 'Ativo' ? '🔴 Desativar' : '🟢 Ativar' }}
                        </button>
                        <div class="dropdown-divider"></div>
                        <button @click="deletarFuncionario(func.idfuncionario)" class="dropdown-item delete">🗑️ Excluir</button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredFuncionarios.length === 0">
                  <td colspan="6" class="empty-state">Nenhum funcionário encontrado.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal Cadastro / Edição -->
    <div v-if="showCadastroModal" class="modal-overlay" @click="closeCadastroModal">
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditando ? 'Editar Funcionário' : 'Novo Funcionário' }}</h3>
          <button class="close-x" @click="closeCadastroModal">&times;</button>
        </div>

        <div v-if="!isEditando" class="modal-alert">
          <p>⚠️ Cadastro manual não gera senha. O funcionário deve se registrar para acessar o sistema.</p>
        </div>

        <form @submit.prevent="salvarFuncionario" class="modal-form">
          <div class="form-grid">
            <div class="field">
              <label>Nome *</label>
              <input v-model="form.nome" type="text" required placeholder="Ex: Carlos" />
            </div>
            <div class="field">
              <label>Sobrenome</label>
              <input v-model="form.sobrenome" type="text" placeholder="Ex: Souza" />
            </div>
            <div class="field">
              <label>CPF</label>
              <input v-model="form.cpf" type="text" placeholder="000.000.000-00" />
            </div>
            <div class="field">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="email@exemplo.com" />
            </div>
            <div class="field">
              <label>Telefone</label>
              <input v-model="form.telefone" type="text" placeholder="(00) 00000-0000" />
            </div>
            <div class="field">
              <label>Função</label>
              <input v-model="form.funcao" type="text" placeholder="Ex: Almoxarife" />
            </div>
            <div class="field">
              <label>Data de Nascimento</label>
              <input v-model="form.data_nascimento" type="date" />
            </div>
            <div class="field" v-if="isEditando">
              <label>Status</label>
              <select v-model="form.status">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-ghost" @click="closeCadastroModal">Cancelar</button>
            <button type="submit" class="btn-primary" :disabled="saving">
              {{ saving ? 'Salvando...' : 'Salvar' }}
            </button>
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

const { getFuncionarios, addFuncionario, updateFuncionario, deleteFuncionario, supabase } = useSupabase()

const funcionarios = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const activeMenu = ref(null)
const showCadastroModal = ref(false)
const isEditando = ref(false)
const editandoId = ref(null)
const saving = ref(false)
const stats = ref({ total: 0 })

const form = ref({
  nome: '', sobrenome: '', cpf: '', email: '',
  telefone: '', funcao: '', data_nascimento: '', status: 'Ativo'
})

const filteredFuncionarios = computed(() => {
  let res = funcionarios.value
  const q = searchQuery.value.toLowerCase().trim()
  if (q) {
    res = res.filter(f =>
      (f.nome + ' ' + f.sobrenome).toLowerCase().includes(q) ||
      (f.email || '').toLowerCase().includes(q) ||
      (f.cpf || '').includes(q)
    )
  }
  if (statusFilter.value) {
    res = res.filter(f => f.status === statusFilter.value)
  }
  return res
})

const carregarFuncionarios = async () => {
  try {
    funcionarios.value = await getFuncionarios() || []
    stats.value.total = funcionarios.value.length
  } catch (e) {
    console.error(e)
  }
}

const openCadastroModal = () => {
  isEditando.value = false
  form.value = { nome: '', sobrenome: '', cpf: '', email: '', telefone: '', funcao: '', data_nascimento: '', status: 'Ativo' }
  showCadastroModal.value = true
}

const closeCadastroModal = () => {
  showCadastroModal.value = false
}

const salvarFuncionario = async () => {
  saving.value = true
  try {
    const payload = {
      nome: form.value.nome,
      sobrenome: form.value.sobrenome,
      cpf: form.value.cpf || null,
      email: form.value.email || null,
      telefone: form.value.telefone || null,
      funcao: form.value.funcao || null,
      data_nascimento: form.value.data_nascimento || null,
      status: form.value.status || 'Ativo',
    }
    if (isEditando.value) {
      await updateFuncionario(editandoId.value, payload)
    } else {
      await addFuncionario(payload)
    }
    await carregarFuncionarios()
    closeCadastroModal()
  } catch (e) {
    alert('Erro ao salvar: ' + e.message)
  } finally {
    saving.value = false
  }
}

const openMenu = (event, func) => {
  activeMenu.value = activeMenu.value === func.idfuncionario ? null : func.idfuncionario
}

const editarFuncionario = (func) => {
  isEditando.value = true
  editandoId.value = func.idfuncionario
  form.value = { ...func, data_nascimento: func.data_nascimento || '' }
  showCadastroModal.value = true
  activeMenu.value = null
}

const toggleStatus = async (func) => {
  const novoStatus = func.status === 'Ativo' ? 'Inativo' : 'Ativo'
  try {
    await updateFuncionario(func.idfuncionario, { status: novoStatus })
    await carregarFuncionarios()
  } catch (e) {
    alert('Erro ao alterar status: ' + e.message)
  }
  activeMenu.value = null
}

const deletarFuncionario = async (id) => {
  if (confirm('Excluir este funcionário permanentemente?')) {
    try {
      await deleteFuncionario(id)
      await carregarFuncionarios()
    } catch (e) {
      alert('Erro ao excluir: ' + e.message)
    }
  }
  activeMenu.value = null
}

onMounted(carregarFuncionarios)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

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
  min-width: 0;
}

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

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #2563eb;
  color: white;
  border: none;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}

.btn-primary:hover:not(:disabled) { background: #1d4ed8; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.content-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 1.25rem 1.5rem;
}

.search-card {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 12px;
}

.search-icon { color: #94a3b8; font-size: 0.9rem; }

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 9px 0;
  font-size: 0.875rem;
  color: #1e293b;
  outline: none;
  font-family: inherit;
}

.status-select {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.875rem;
  color: #475569;
  background: #f8fafc;
  outline: none;
  font-family: inherit;
  cursor: pointer;
}

.table-card { padding: 0; overflow: hidden; }

.table-responsive { overflow-x: auto; }

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table th {
  background: #f8fafc;
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 14px 16px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background: #f8fafc; }

.text-right { text-align: right; }

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img { width: 100%; height: 100%; object-fit: cover; }

.user-name { display: block; font-weight: 600; color: #1e293b; }
.user-id { display: block; font-size: 0.75rem; color: #94a3b8; }

.status-badge {
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.ativo { background: #f0fdf4; color: #166534; }
.status-badge.inativo { background: #fef2f2; color: #991b1b; }

.actions-wrapper { position: relative; display: inline-block; }

.btn-dots {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #94a3b8;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-dots:hover { background: #f1f5f9; color: #475569; }

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 110%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  z-index: 100;
  min-width: 160px;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: none;
  text-align: left;
  font-size: 0.875rem;
  color: #334155;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.dropdown-item:hover { background: #f8fafc; }
.dropdown-item.delete { color: #ef4444; }
.dropdown-item.delete:hover { background: #fef2f2; }
.dropdown-divider { border-top: 1px solid #f1f5f9; }

.empty-state {
  text-align: center;
  color: #94a3b8;
  padding: 3rem;
  font-size: 0.9rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
}

.modal-card {
  background: white;
  border-radius: 14px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.close-x {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #94a3b8;
  cursor: pointer;
  line-height: 1;
}

.close-x:hover { color: #475569; }

.modal-alert {
  margin: 1rem 1.5rem 0;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: #92400e;
}

.modal-form { padding: 1.25rem 1.5rem; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.field input,
.field select {
  padding: 9px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1e293b;
  font-family: inherit;
  background: white;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus,
.field select:focus { border-color: #2563eb; }

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;
  margin-top: 0.5rem;
}

.btn-ghost {
  padding: 9px 18px;
  background: white;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.btn-ghost:hover { border-color: #2563eb; color: #2563eb; }

@media (max-width: 640px) {
  .form-grid { grid-template-columns: 1fr; }
  .search-card { flex-direction: column; }
}
</style>
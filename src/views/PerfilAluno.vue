<template>
  <div class="app-layout">
    <SidebarAluno />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Meu Perfil</h1>
          <p class="stat-sub">Gerencie suas informações pessoais.</p>
        </div>
      </header>

      <main class="content-container">

        <div v-if="loading" class="loading-state">Carregando...</div>

        <div v-else class="profile-layout">

          <!-- Card avatar + info básica -->
          <div class="card avatar-card">
            <div class="avatar-wrapper">
              <img v-if="aluno.foto" :src="aluno.foto" class="avatar-img" alt="Foto" />
              <div v-else class="avatar-placeholder">
                {{ iniciais }}
              </div>
              <label class="avatar-edit-btn" title="Trocar foto">
                📷
                <input type="file" accept="image/*" class="hidden-input" @change="handleFotoChange" />
              </label>
            </div>
            <h2 class="profile-name">{{ aluno.nome }} {{ aluno.sobrenome }}</h2>
            <span class="profile-role">Aluno</span>
            <p class="profile-email">{{ aluno.email }}</p>
          </div>

          <!-- Card formulário -->
          <div class="card form-card">
            <div v-if="successMsg" class="success-banner">{{ successMsg }}</div>
            <div v-if="errorMsg" class="error-banner">{{ errorMsg }}</div>

            <h3 class="section-title">Dados Pessoais</h3>
            <div class="form-grid">
              <div class="field">
                <label>Nome</label>
                <input v-model="form.nome" type="text" :disabled="!editando" />
              </div>
              <div class="field">
                <label>Sobrenome</label>
                <input v-model="form.sobrenome" type="text" :disabled="!editando" />
              </div>
              <div class="field">
                <label>CPF</label>
                <input v-model="form.cpf" type="text" :disabled="!editando" />
              </div>
              <div class="field">
                <label>Telefone</label>
                <input v-model="form.telefone" type="text" :disabled="!editando" />
              </div>
              <div class="field">
                <label>Data de Nascimento</label>
                <input v-model="form.data_nascimento" type="date" :disabled="!editando" />
              </div>
              <div class="field">
                <label>Email</label>
                <input v-model="form.email" type="email" disabled />
              </div>
            </div>

            <div class="form-actions">
              <button v-if="!editando" class="btn-primary" @click="editando = true">Editar</button>
              <template v-else>
                <button class="btn-secondary" @click="cancelarEdicao">Cancelar</button>
                <button class="btn-primary" @click="salvar" :disabled="saving">
                  {{ saving ? 'Salvando...' : 'Salvar' }}
                </button>
              </template>
            </div>

            <hr class="divider" />

            <h3 class="section-title">Alterar Senha</h3>
            <div class="form-grid">
              <div class="field">
                <label>Nova Senha</label>
                <input v-model="novaSenha" type="password" placeholder="Mínimo 6 caracteres" />
              </div>
              <div class="field">
                <label>Confirmar Senha</label>
                <input v-model="confirmarSenha" type="password" placeholder="Repita a senha" />
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" @click="alterarSenha" :disabled="savingPwd">
                {{ savingPwd ? 'Alterando...' : 'Alterar Senha' }}
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SidebarAluno from '../components/SidebarAluno.vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase, session } = useSupabase()

const aluno = ref({})
const form = ref({})
const loading = ref(true)
const editando = ref(false)
const saving = ref(false)
const savingPwd = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const novaSenha = ref('')
const confirmarSenha = ref('')

const iniciais = computed(() => {
  const n = aluno.value.nome?.charAt(0) || ''
  const s = aluno.value.sobrenome?.charAt(0) || ''
  return (n + s).toUpperCase() || '?'
})

const carregarPerfil = async () => {
  try {
    const email = session.value?.user?.email
    if (!email) throw new Error('Sessão inválida.')
    const { data, error } = await supabase
      .from('aluno')
      .select('*')
      .eq('email', email)
      .maybeSingle()
    if (error) throw error
    if (!data) throw new Error('Perfil não encontrado. Verifique se seu cadastro foi concluído.')
    aluno.value = data
    form.value = { ...data }
  } catch (e) {
    errorMsg.value = 'Erro ao carregar perfil: ' + e.message
    console.error(e)
  } finally {
    loading.value = false
  }
}

const cancelarEdicao = () => {
  form.value = { ...aluno.value }
  editando.value = false
  errorMsg.value = ''
}

const salvar = async () => {
  saving.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    const email = session.value?.user?.email
    if (!email) throw new Error('Sessão inválida.')
    const { error } = await supabase
      .from('aluno')
      .update({
        nome: form.value.nome,
        sobrenome: form.value.sobrenome,
        cpf: form.value.cpf,
        telefone: form.value.telefone,
        data_nascimento: form.value.data_nascimento || null,
      })
      .eq('email', email)
    if (error) throw error
    aluno.value = { ...aluno.value, ...form.value }
    editando.value = false
    successMsg.value = 'Perfil atualizado com sucesso!'
    setTimeout(() => successMsg.value = '', 3000)
  } catch (e) {
    errorMsg.value = 'Erro ao salvar: ' + e.message
  } finally {
    saving.value = false
  }
}

const alterarSenha = async () => {
  if (!novaSenha.value || novaSenha.value.length < 6) {
    errorMsg.value = 'A senha deve ter no mínimo 6 caracteres.'
    return
  }
  if (novaSenha.value !== confirmarSenha.value) {
    errorMsg.value = 'As senhas não coincidem.'
    return
  }
  savingPwd.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    const { error } = await supabase.auth.updateUser({ password: novaSenha.value })
    if (error) throw error
    novaSenha.value = ''
    confirmarSenha.value = ''
    successMsg.value = 'Senha alterada com sucesso!'
    setTimeout(() => successMsg.value = '', 3000)
  } catch (e) {
    errorMsg.value = 'Erro ao alterar senha: ' + e.message
  } finally {
    savingPwd.value = false
  }
}

const handleFotoChange = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    const nome = `aluno-${aluno.value.idaluno}-${Date.now()}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(nome, file, { upsert: true })
    if (uploadError) throw uploadError
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(nome)
    const fotoUrl = urlData.publicUrl
    const { error } = await supabase.from('aluno').update({ foto: fotoUrl }).eq('idaluno', aluno.value.idaluno)
    if (error) throw error
    aluno.value.foto = fotoUrl
    successMsg.value = 'Foto atualizada!'
    setTimeout(() => successMsg.value = '', 3000)
  } catch (e) {
    errorMsg.value = 'Erro ao enviar foto: ' + e.message
  }
}

onMounted(carregarPerfil)
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

.content-container {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.loading-state {
  text-align: center;
  color: #64748b;
  padding: 4rem;
}

.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 1.5rem;
}

/* Avatar Card */
.avatar-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 0.5rem;
}

.avatar-img,
.avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  background: #2563eb;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
}

.hidden-input {
  display: none;
}

.profile-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.profile-role {
  font-size: 0.75rem;
  font-weight: 600;
  background: #eff6ff;
  color: #2563eb;
  padding: 2px 10px;
  border-radius: 99px;
}

.profile-email {
  font-size: 0.8rem;
  color: #64748b;
  word-break: break-all;
}

/* Form Card */
.form-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.field input {
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

.field input:focus {
  border-color: #2563eb;
}

.field input:disabled {
  background: #f8fafc;
  color: #94a3b8;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-primary {
  padding: 9px 20px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}

.btn-primary:hover:not(:disabled) { background: #1d4ed8; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-secondary {
  padding: 9px 20px;
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

.btn-secondary:hover { border-color: #2563eb; color: #2563eb; }

.divider {
  border: none;
  border-top: 1px solid #f1f5f9;
  margin: 0.5rem 0;
}

.success-banner {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.85rem;
}

.error-banner {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .profile-layout { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
}
</style>
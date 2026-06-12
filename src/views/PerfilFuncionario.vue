<template>
  <div class="app-layout">
    <SidebarACE ref="sidebarRef" />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <button class="hamburger" @click="openMobileSidebar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
          <div>
            <h1 class="page-title">Meu Perfil</h1>
            <p class="page-sub">Gerencie suas informações pessoais.</p>
          </div>
        </div>
        <button class="btn-logout" @click="deslogar">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Sair
        </button>
      </header>

      <main class="content-main">
        <div v-if="loading" class="loading-state">Carregando...</div>

        <div v-else class="profile-layout">
          <!-- Avatar card -->
          <div class="card avatar-card">
            <div class="avatar-wrap">
              <img v-if="funcionario.foto" :src="funcionario.foto" class="avatar-img" alt="Foto" />
              <div v-else class="avatar-placeholder">{{ iniciais }}</div>
              <label class="avatar-edit" title="Trocar foto">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M11 2l3 3-9 9H2v-3L11 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <input type="file" accept="image/*" class="hidden" @change="handleFotoChange" />
              </label>
            </div>
            <h2 class="profile-name">{{ funcionario.nome }} {{ funcionario.sobrenome }}</h2>
            <span class="profile-role">{{ funcionario.funcao || 'Funcionário' }}</span>
            <span class="profile-status" :class="funcionario.status === 'Ativo' ? 'ativo' : 'inativo'">
              {{ funcionario.status || 'Ativo' }}
            </span>
            <p class="profile-email">{{ funcionario.email }}</p>
          </div>

          <!-- Form card -->
          <div class="card form-card">
            <div v-if="successMsg" class="banner success">{{ successMsg }}</div>
            <div v-if="errorMsg" class="banner error">{{ errorMsg }}</div>

            <h3 class="section-title">Dados Pessoais</h3>
            <div class="form-grid">
              <div class="form-group"><label>Nome</label><input v-model="form.nome" type="text" :disabled="!editando" />
              </div>
              <div class="form-group"><label>Sobrenome</label><input v-model="form.sobrenome" type="text"
                  :disabled="!editando" /></div>
              <div class="form-group"><label>CPF</label><input v-model="form.cpf" type="text" :disabled="!editando" />
              </div>
              <div class="form-group"><label>Telefone</label><input v-model="form.telefone" type="text"
                  :disabled="!editando" /></div>
              <div class="form-group"><label>Data de Nascimento</label><input v-model="form.data_nascimento" type="date"
                  :disabled="!editando" /></div>
              <div class="form-group"><label>Função</label><input v-model="form.funcao" type="text"
                  :disabled="!editando" /></div>
              <div class="form-group"><label>Email</label><input v-model="form.email" type="email" disabled /></div>
              <div class="form-group"><label>Status</label><input :value="funcionario.status" disabled /></div>
            </div>
            <div class="form-actions">
              <button v-if="!editando" class="btn-primary" @click="editando = true">Editar</button>
              <template v-else>
                <button class="btn-cancel" @click="cancelarEdicao">Cancelar</button>
                <button class="btn-primary" @click="salvar" :disabled="saving">{{ saving ? 'Salvando...' : 'Salvar'
                  }}</button>
              </template>
            </div>

            <hr class="divider" />

            <h3 class="section-title">Alterar Senha</h3>
            <div class="form-grid">
              <div class="form-group"><label>Nova Senha</label><input v-model="novaSenha" type="password"
                  placeholder="Mínimo 6 caracteres" /></div>
              <div class="form-group"><label>Confirmar Senha</label><input v-model="confirmarSenha" type="password"
                  placeholder="Repita a senha" /></div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" @click="alterarSenha" :disabled="savingPwd">{{ savingPwd ? 'Alterando...' : 'Alterar Senha' }}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SidebarACE from '../components/SidebarACE.vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase, session } = useSupabase()
const router = useRouter()

const sidebarRef = ref(null)
const openMobileSidebar = () => { if (sidebarRef.value) sidebarRef.value.mobileOpen = true }

const funcionario = ref({})
const form = ref({})
const loading = ref(true)
const editando = ref(false)
const saving = ref(false)
const savingPwd = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const novaSenha = ref('')
const confirmarSenha = ref('')

const iniciais = computed(() => ((funcionario.value.nome?.charAt(0) || '') + (funcionario.value.sobrenome?.charAt(0) || '')).toUpperCase() || '?')

const carregarPerfil = async () => {
  try {
    const email = session.value?.user?.email
    if (!email) throw new Error('Sessão inválida.')
    const { data, error } = await supabase.from('funcionario').select('*').eq('email', email).maybeSingle()
    if (error) throw error
    if (!data) throw new Error('Perfil não encontrado.')
    funcionario.value = data; form.value = { ...data }
  } catch (e) { errorMsg.value = 'Erro ao carregar perfil: ' + e.message }
  finally { loading.value = false }
}

const cancelarEdicao = () => { form.value = { ...funcionario.value }; editando.value = false; errorMsg.value = '' }

const salvar = async () => {
  saving.value = true; errorMsg.value = ''; successMsg.value = ''
  try {
    const { error } = await supabase.from('funcionario').update({ nome: form.value.nome, sobrenome: form.value.sobrenome, cpf: form.value.cpf, telefone: form.value.telefone, data_nascimento: form.value.data_nascimento || null, funcao: form.value.funcao }).eq('email', session.value?.user?.email)
    if (error) throw error
    funcionario.value = { ...funcionario.value, ...form.value }; editando.value = false
    successMsg.value = 'Perfil atualizado com sucesso!'; setTimeout(() => successMsg.value = '', 3000)
  } catch (e) { errorMsg.value = 'Erro ao salvar: ' + e.message } finally { saving.value = false }
}

const alterarSenha = async () => {
  if (!novaSenha.value || novaSenha.value.length < 6) { errorMsg.value = 'Mínimo 6 caracteres.'; return }
  if (novaSenha.value !== confirmarSenha.value) { errorMsg.value = 'Senhas não coincidem.'; return }
  savingPwd.value = true; errorMsg.value = ''; successMsg.value = ''
  try {
    const { error } = await supabase.auth.updateUser({ password: novaSenha.value })
    if (error) throw error
    novaSenha.value = ''; confirmarSenha.value = ''
    successMsg.value = 'Senha alterada com sucesso!'; setTimeout(() => successMsg.value = '', 3000)
  } catch (e) { errorMsg.value = 'Erro: ' + e.message } finally { savingPwd.value = false }
}

const handleFotoChange = async (e) => {
  const file = e.target.files?.[0]; if (!file) return
  try {
    const nome = `func-${funcionario.value.idfuncionario}-${Date.now()}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(nome, file, { upsert: true })
    if (uploadError) throw uploadError
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(nome)
    await supabase.from('funcionario').update({ foto: urlData.publicUrl }).eq('idfuncionario', funcionario.value.idfuncionario)
    funcionario.value.foto = urlData.publicUrl
    successMsg.value = 'Foto atualizada!'; setTimeout(() => successMsg.value = '', 3000)
  } catch (e) { errorMsg.value = 'Erro ao enviar foto: ' + e.message }
}

const deslogar = async () => { await supabase.auth.signOut(); router.push('/login') }

onMounted(carregarPerfil)
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

.btn-logout {
  display: flex;
  align-items: center;
  gap: 7px;
  background: none;
  border: 1px solid var(--c-border);
  padding: 9px 18px;
  border-radius: 999px;
  color: var(--c-muted);
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.btn-logout:hover {
  border-color: #ef4444;
  color: #dc2626;
  background: rgba(239, 68, 68, .05);
}

.content-main {
  padding: 2rem;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.loading-state {
  text-align: center;
  color: var(--c-faint);
  padding: 4rem;
}

.profile-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  align-items: start;
}

.card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
  padding: 24px;
}

.avatar-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.avatar-wrap {
  position: relative;
  margin-bottom: 4px;
}

.avatar-img,
.avatar-placeholder {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  background: var(--c-accent);
  color: #fff;
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: var(--c-surface);
  border: 2px solid var(--c-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--c-muted);
  transition: border-color 0.2s, color 0.2s;
}

.avatar-edit:hover {
  border-color: var(--c-accent);
  color: var(--c-accent);
}

.hidden {
  display: none;
}

.profile-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
}

.profile-role {
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(67, 176, 241, .12);
  color: var(--c-accent);
  padding: 3px 12px;
  border-radius: 999px;
}

.profile-status {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 12px;
  border-radius: 999px;
}

.profile-status.ativo {
  background: rgba(34, 197, 94, .12);
  color: #16a34a;
}

.profile-status.inativo {
  background: rgba(239, 68, 68, .1);
  color: #dc2626;
}

.profile-email {
  font-size: 0.78rem;
  color: var(--c-faint);
  word-break: break-all;
}

.form-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
  letter-spacing: -0.2px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--c-faint);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.form-group input {
  padding: 10px 13px;
  border: 1px solid var(--c-border);
  border-radius: 9px;
  font-size: 0.875rem;
  color: var(--c-text);
  font-family: inherit;
  background: #FAFAF7;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  border-color: var(--c-accent);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(67, 176, 241, .1);
}

.form-group input:disabled {
  background: #F0F2F4;
  color: var(--c-faint);
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-primary {
  padding: 10px 24px;
  background: var(--c-accent);
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(67, 176, 241, .28);
}

.btn-primary:hover:not(:disabled) {
  background: #2E9BDF;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  padding: 10px 20px;
  background: #EDF0F2;
  color: var(--c-muted);
  border: none;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #DDE2E8;
}

.divider {
  border: none;
  border-top: 1px solid #EDF0F2;
  margin: 4px 0;
}

.banner {
  padding: 11px 14px;
  border-radius: 9px;
  font-size: 0.82rem;
  line-height: 1.5;
}

.banner.success {
  background: rgba(34, 197, 94, .1);
  color: #166534;
  border: 1px solid rgba(34, 197, 94, .2);
}

.banner.error {
  background: rgba(239, 68, 68, .08);
  color: #991b1b;
  border: 1px solid rgba(239, 68, 68, .2);
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

  .profile-layout {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .page-sub {
    display: none;
  }
}
</style>

<template>
    <div class="cadastro-page">

        <div class="left-panel">
            <div class="circle circle-top"></div>
            <div class="circle circle-bottom"></div>
            <div class="left-content">
                <h2 class="left-title">Já possui uma conta?</h2>
                <p class="left-subtitle">Se você já tem uma conta,<br>basta fazer o login.</p>
                <button class="btn-entrar" @click="$router.push('/login')">Entre</button>
            </div>
        </div>

        <div class="right-panel">
            <div class="form-area">
                <h1 class="form-title">Crie sua conta</h1>

                <p v-if="erro" class="msg msg--erro">{{ erro }}</p>
                <p v-if="sucesso" class="msg msg--ok">{{ sucesso }}</p>

                <div class="input-row">
                    <input v-model="nome" type="text" placeholder="Nome *" class="input-field" :disabled="loading" />
                    <input v-model="sobrenome" type="text" placeholder="Sobrenome" class="input-field"
                        :disabled="loading" />
                </div>

                <div class="input-row">
                    <input v-model="email" type="email" placeholder="Email *" class="input-field" :disabled="loading" />
                    <input v-model="cpf" type="text" placeholder="CPF * (000.000.000-00)" class="input-field"
                        :disabled="loading" @input="formatarCPF" maxlength="14" />
                </div>

                <div class="input-row">
                    <div class="input-wrapper">
                        <label class="field-label">Data de Nascimento</label>
                        <input v-model="dataNascimento" type="date" class="input-field input-field--date"
                            :disabled="loading" />
                    </div>
                    <input v-model="telefone" type="tel" placeholder="Telefone ((11) 00000-0000)" class="input-field"
                        :disabled="loading" @input="formatarTelefone" maxlength="15" />
                </div>

                <div class="input-row">
                    <div class="password-wrapper">
                        <input v-model="senha" :type="showPassword ? 'text' : 'password'"
                            placeholder="Senha * (mín. 6 caracteres)" class="input-field" autocomplete="new-password"
                            :disabled="loading" />
                        <button class="toggle-password" @click="showPassword = !showPassword" type="button">
                            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        </button>
                    </div>
                    <div class="password-wrapper">
                        <input v-model="confirmar" :type="showConfirm ? 'text' : 'password'"
                            placeholder="Confirmar senha *" class="input-field" :disabled="loading" />
                        <button class="toggle-password" @click="showConfirm = !showConfirm" type="button">
                            <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        </button>
                    </div>
                </div>

                <button class="btn-cadastrar" @click="handleCadastro" :disabled="loading">
                    <span v-if="loading" class="spinner"></span>
                    <span v-else>Cadastrar-se</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'

const router = useRouter()
const { supabase } = useSupabase()

const nome = ref('')
const sobrenome = ref('')
const email = ref('')
const cpf = ref('')
const dataNascimento = ref('')
const telefone = ref('')
const senha = ref('')
const confirmar = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const erro = ref('')
const sucesso = ref('')

function formatarCPF() {
    let v = cpf.value.replace(/\D/g, '')
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2')
    cpf.value = v
}

function formatarTelefone() {
    let v = telefone.value.replace(/\D/g, '')
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2')
    telefone.value = v
}

async function handleCadastro() {
    erro.value = ''
    sucesso.value = ''

    if (!nome.value || !email.value || !cpf.value || !senha.value || !confirmar.value) {
        erro.value = 'Preencha todos os campos obrigatórios (*).'
        return
    }
    if (cpf.value.replace(/\D/g, '').length !== 11) {
        erro.value = 'CPF inválido. Informe os 11 dígitos.'
        return
    }
    if (senha.value.length < 6) {
        erro.value = 'A senha deve ter pelo menos 6 caracteres.'
        return
    }
    if (senha.value !== confirmar.value) {
        erro.value = 'As senhas não coincidem.'
        return
    }

    loading.value = true
    try {
        const { error: authError } = await supabase.auth.signUp({
            email: email.value,
            password: senha.value,
            options: {
                data: {
                    tipo: 'aluno',
                    nome: nome.value,
                    sobrenome: sobrenome.value || '',
                    cpf: cpf.value,
                }
            }
        })
        if (authError) throw authError

        // Atualiza data_nascimento e telefone (não passam pela trigger)
        if (dataNascimento.value || telefone.value) {
            const { data: alunoData } = await supabase
                .from('aluno')
                .select('idaluno')
                .eq('email', email.value)
                .single()

            if (alunoData?.idaluno) {
                await supabase.from('aluno').update({
                    data_nascimento: dataNascimento.value || null,
                    telefone: telefone.value || null,
                }).eq('idaluno', alunoData.idaluno)
            }
        }

        sucesso.value = 'Conta criada com sucesso! Redirecionando para o login...'
        setTimeout(() => router.push('/login'), 2500)

    } catch (e) {
        if (e.message?.includes('already registered') || e.message?.includes('already been registered')) {
            erro.value = 'Este email já está cadastrado.'
        } else if (e.message?.includes('duplicate key') && e.message?.includes('cpf')) {
            erro.value = 'Este CPF já está cadastrado.'
        } else if (e.message?.includes('Password should be')) {
            erro.value = 'Senha muito fraca. Use pelo menos 6 caracteres.'
        } else {
            erro.value = 'Erro ao cadastrar: ' + e.message
        }
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.cadastro-page {
    display: flex;
    min-height: 100vh;
    font-family: 'Segoe UI', sans-serif;
}

.left-panel {
    width: 36%;
    background: linear-gradient(160deg, #62c3f8 0%, #3a9de8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
}

.circle-top {
    width: 420px;
    height: 420px;
    top: -120px;
    left: -100px;
}

.circle-bottom {
    width: 300px;
    height: 300px;
    bottom: -80px;
    right: -60px;
}

.left-content {
    text-align: center;
    z-index: 1;
    padding: 24px;
}

.left-title {
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 14px;
}

.left-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, .9);
    line-height: 1.6;
    margin-bottom: 28px;
}

.btn-entrar {
    padding: 13px 48px;
    background: #fff;
    color: #3a9de8;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.1s;
}

.btn-entrar:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.btn-entrar:active {
    transform: scale(0.98);
}

.right-panel {
    flex: 1;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 52px;
}

.form-area {
    width: 100%;
    max-width: 540px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.form-title {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 4px;
    text-align: center;
}

.msg {
    width: 100%;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 13px;
    text-align: center;
    line-height: 1.4;
}

.msg--erro {
    background: #fff0f0;
    border: 1px solid #fca5a5;
    color: #dc2626;
}

.msg--ok {
    background: #f0fdf4;
    border: 1px solid #86efac;
    color: #16a34a;
}

.input-row {
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: flex-end;
}

.input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.field-label {
    font-size: 11px;
    font-weight: 600;
    color: #888;
    padding-left: 14px;
    letter-spacing: 0.3px;
}

.input-field {
    flex: 1;
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 999px;
    background: #dbeeff;
    font-size: 14px;
    color: #333;
    outline: none;
    min-width: 0;
    transition: background 0.2s;
    font-family: inherit;
}

.input-field--date {
    cursor: pointer;
}

.input-field:disabled {
    opacity: .65;
    cursor: not-allowed;
}

.input-field::placeholder {
    color: #888;
}

.input-field:focus {
    background: #c8e2f8;
}

.password-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    min-width: 0;
}

.password-wrapper .input-field {
    width: 100%;
    padding-right: 42px;
}

.toggle-password {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
    display: flex;
    align-items: center;
    padding: 0;
}

.btn-cadastrar {
    width: 100%;
    padding: 13px;
    background: #3fa9f5;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
}

.btn-cadastrar:hover:not(:disabled) {
    background: #2a96e8;
    box-shadow: 0 4px 14px rgba(63, 169, 245, .4);
}

.btn-cadastrar:active:not(:disabled) {
    transform: scale(0.98);
}

.btn-cadastrar:disabled {
    opacity: .7;
    cursor: not-allowed;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, .4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 900px) {
    .cadastro-page {
        flex-direction: column;
    }

    .left-panel {
        width: 100%;
        min-height: 200px;
    }

    .right-panel {
        padding: 36px 20px;
    }

    .input-row {
        flex-direction: column;
    }
}
</style>

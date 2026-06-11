<template>
    <div class="login-page">

        <div class="left-panel">
            <!-- Brand no topo -->
            <div class="brand" @click="$router.push('/')">
                <div class="brand__logo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                            fill="white" />
                        <circle cx="12" cy="13" r="2.5" fill="none" stroke="white" stroke-width="1.5" />
                    </svg>
                </div>
                <div>
                    <p class="brand__name">SystemACE</p>
                    <p class="brand__sub">EPI DASHBOARD</p>
                </div>
            </div>

            <div class="form-area">
                <!-- Headline da área -->
                <div class="form-header">
                    <h1 class="form-title">Bem-vindo de volta</h1>
                    <p class="form-sub">Entre com suas credenciais para acessar o sistema.</p>
                </div>

                <p v-if="erro" class="msg msg--erro">{{ erro }}</p>

                <div class="input-group">
                    <input v-model="email" type="email" placeholder="Email" class="input-field" autocomplete="email"
                        :disabled="loading" @keyup.enter="handleLogin" />
                </div>

                <div class="input-group password-group">
                    <input v-model="senha" :type="showPassword ? 'text' : 'password'" placeholder="Senha"
                        class="input-field" autocomplete="current-password" :disabled="loading"
                        @keyup.enter="handleLogin" />
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

                <button class="btn-entrar" @click="handleLogin" :disabled="loading">
                    <span v-if="loading" class="spinner"></span>
                    <span v-else>Entrar</span>
                </button>

                <!-- Stats âncora visual -->
                <div class="stats">
                    <div class="stat">
                        <span class="stat__num">NR-6</span>
                        <span class="stat__label">Conformidade</span>
                    </div>
                    <div class="stat__divider"></div>
                    <div class="stat">
                        <span class="stat__num">100%</span>
                        <span class="stat__label">Rastreabilidade</span>
                    </div>
                    <div class="stat__divider"></div>
                    <div class="stat">
                        <span class="stat__num">SENAI</span>
                        <span class="stat__label">Roberto Mange</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-panel">
            <div class="circle circle-top"></div>
            <div class="circle circle-bottom"></div>
            <div class="right-content">
                <div class="right-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                            fill="rgba(255,255,255,0.9)" />
                        <circle cx="12" cy="13" r="2.5" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" />
                    </svg>
                </div>
                <h2 class="right-title">Novo aqui?</h2>
                <p class="right-sub">Crie sua conta e gerencie seus EPIs com segurança e praticidade.</p>
                <button class="btn-cadastrar" @click="$router.push('/cadastro')">Cadastrar-se</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../composables/useSupabase'

const router = useRouter()
const { signIn } = useSupabase()

const email = ref('')
const senha = ref('')
const showPassword = ref(false)
const loading = ref(false)
const erro = ref('')

async function handleLogin() {
    erro.value = ''
    if (!email.value || !senha.value) {
        erro.value = 'Preencha email e senha.'
        return
    }
    loading.value = true
    try {
        const result = await signIn(email.value, senha.value)
        const tipo = result.tipo
        if (tipo === 'funcionario' || tipo === 'admin') {
            router.push('/dashboard')
        } else {
            router.push('/dashboard')
        }
    } catch (e) {
        if (e.message?.includes('Invalid login credentials')) {
            erro.value = 'Email ou senha incorretos.'
        } else if (e.message?.includes('Email not confirmed')) {
            erro.value = 'Confirme seu email antes de entrar.'
        } else {
            erro.value = 'Erro ao entrar. Tente novamente.'
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

.login-page {
    display: flex;
    min-height: 100vh;
    font-family: 'Inter', 'DM Sans', 'Segoe UI', sans-serif;
}

/* ── Painel esquerdo ─────────────────────────────── */
.left-panel {
    flex: 1;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 40px 56px;
}

/* Brand */
.brand {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    width: fit-content;
}

.brand__logo {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(140deg, #1E3D58 0%, #2A567C 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(30, 61, 88, .2);
}

.brand__name {
    font-size: 16px;
    font-weight: 700;
    color: #1E3D58;
    line-height: 1.2;
    letter-spacing: -0.3px;
}

.brand__sub {
    font-size: 9px;
    font-weight: 600;
    color: #5A7187;
    letter-spacing: 2px;
    margin-top: 2px;
}

/* Form area */
.form-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 40px 0;
}

.form-header {
    text-align: center;
    margin-bottom: 8px;
}

.form-title {
    font-size: 28px;
    font-weight: 800;
    color: #1a1a2e;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
}

.form-sub {
    font-size: 14px;
    color: #5A7187;
    line-height: 1.5;
}

.msg {
    width: 100%;
    max-width: 340px;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 13px;
    text-align: center;
}

.msg--erro {
    background: #fff0f0;
    border: 1px solid #fca5a5;
    color: #dc2626;
}

.input-group {
    width: 100%;
    max-width: 340px;
}

.password-group {
    position: relative;
}

.input-field {
    width: 100%;
    padding: 13px 18px;
    border: none;
    border-radius: 999px;
    background: #dbeeff;
    font-size: 14px;
    color: #333;
    outline: none;
    transition: background 0.2s;
    font-family: inherit;
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

.toggle-password {
    position: absolute;
    right: 16px;
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

.btn-entrar {
    width: 100%;
    max-width: 340px;
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
    font-family: inherit;
}

.btn-entrar:hover:not(:disabled) {
    background: #2a96e8;
    box-shadow: 0 6px 18px rgba(63, 169, 245, .35);
}

.btn-entrar:active:not(:disabled) {
    transform: scale(0.98);
}

.btn-entrar:disabled {
    opacity: .7;
    cursor: not-allowed;
}

/* Stats */
.stats {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 32px;
    padding-top: 28px;
    border-top: 1px solid #E2E8F0;
    width: 100%;
    max-width: 340px;
    justify-content: center;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
}

.stat__num {
    font-size: 15px;
    font-weight: 800;
    color: #1E3D58;
    letter-spacing: -0.3px;
}

.stat__label {
    font-size: 11px;
    color: #5A7187;
    white-space: nowrap;
}

.stat__divider {
    width: 1px;
    height: 28px;
    background: #E2E8F0;
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

/* ── Painel direito ──────────────────────────────── */
.right-panel {
    width: 42%;
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
    background: rgba(255, 255, 255, 0.12);
}

.circle-top {
    width: 420px;
    height: 420px;
    top: -120px;
    right: -100px;
}

.circle-bottom {
    width: 300px;
    height: 300px;
    bottom: -80px;
    left: -60px;
}

.right-content {
    text-align: center;
    z-index: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
}

.right-icon {
    width: 72px;
    height: 72px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    backdrop-filter: blur(8px);
}

.right-title {
    font-size: 32px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 14px;
    letter-spacing: -0.5px;
}

.right-sub {
    font-size: 15px;
    color: rgba(255, 255, 255, .85);
    line-height: 1.65;
    max-width: 240px;
    margin-bottom: 32px;
}

.btn-cadastrar {
    padding: 13px 48px;
    background: #fff;
    color: #3a9de8;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.1s;
    font-family: inherit;
}

.btn-cadastrar:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
    transform: translateY(-1px);
}

.btn-cadastrar:active {
    transform: scale(0.98);
}

@media (max-width: 768px) {
    .login-page {
        flex-direction: column;
    }

    .left-panel {
        padding: 32px 24px;
    }

    .right-panel {
        width: 100%;
        min-height: 260px;
    }
}
</style>

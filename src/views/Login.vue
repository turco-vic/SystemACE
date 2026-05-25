<template>
    <div class="login-page">

        <div class="left-panel">
            <div class="brand">SystemACE</div>

            <div class="form-area">
                <h1 class="form-title">Entre com sua conta!</h1>

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
            </div>
        </div>

        <div class="right-panel">
            <div class="circle circle-top"></div>
            <div class="circle circle-bottom"></div>
            <div class="right-content">
                <h2 class="right-title">Novo aqui?</h2>
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
    font-family: 'Segoe UI', sans-serif;
}

.left-panel {
    flex: 1;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 40px 50px;
}

.brand {
    font-size: 22px;
    font-weight: 700;
    color: #3fa9f5;
    letter-spacing: -0.5px;
}

.form-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.form-title {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
    text-align: center;
}

.msg {
    width: 100%;
    max-width: 320px;
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
    max-width: 320px;
}

.password-group {
    position: relative;
}

.input-field {
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 999px;
    background: #dbeeff;
    font-size: 14px;
    color: #333;
    outline: none;
    transition: background 0.2s;
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

.btn-entrar {
    width: 100%;
    max-width: 320px;
    padding: 12px;
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
    transition: background 0.2s, transform 0.1s;
}

.btn-entrar:hover:not(:disabled) {
    background: #2a96e8;
}

.btn-entrar:active:not(:disabled) {
    transform: scale(0.98);
}

.btn-entrar:disabled {
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
    background: rgba(255, 255, 255, 0.15);
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
}

.right-title {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 28px;
}

.btn-cadastrar {
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

.btn-cadastrar:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.btn-cadastrar:active {
    transform: scale(0.98);
}

@media (max-width: 768px) {
    .login-page {
        flex-direction: column;
    }

    .right-panel {
        width: 100%;
        min-height: 220px;
    }
}
</style>

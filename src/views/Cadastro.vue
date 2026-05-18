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

                <div class="input-row">
                    <input v-model="nome" type="text" placeholder="Nome" class="input-field" />
                    <input v-model="sobrenome" type="text" placeholder="Sobrenome" class="input-field" />
                </div>

                <div class="input-row">
                    <input v-model="email" type="email" placeholder="Email" class="input-field" />
                    <div class="password-wrapper">
                        <input v-model="senha" :type="showPassword ? 'text' : 'password'" placeholder="Senha"
                            class="input-field" autocomplete="new-password" />
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
                </div>

                <div class="terms-row">
                    <label class="checkbox-label">
                        <input type="checkbox" v-model="aceitouTermos" class="checkbox" />
                        <span>Eu li os <a href="#" class="terms-link">Termos e Condições</a></span>
                    </label>
                </div>

                <button class="btn-cadastrar" :class="{ active: aceitouTermos }" :disabled="!aceitouTermos"
                    @click="handleCadastro">
                    Cadastrar-se
                </button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Cadastro',
    data() {
        return {
            nome: '', sobrenome: '', email: '', senha: '',
            showPassword: false, aceitouTermos: false,
        }
    },
    methods: {
        handleCadastro() {
            if (!this.aceitouTermos) return
            console.log('Cadastro:', this.nome, this.email)
        }
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
    padding: 20px;
}

.left-title {
    font-size: 30px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 14px;
}

.left-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 28px;
}

.btn-entrar {
    padding: 13px 48px;
    background: #ffffff;
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
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 50px;
}

.form-area {
    width: 100%;
    max-width: 460px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
}

.form-title {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 6px;
    text-align: center;
}

.input-row {
    display: flex;
    gap: 12px;
    width: 100%;
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
    padding-right: 40px;
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

.terms-row {
    width: 100%;
    display: flex;
    justify-content: center;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #555;
    cursor: pointer;
}

.checkbox {
    accent-color: #3fa9f5;
    width: 15px;
    height: 15px;
    cursor: pointer;
}

.terms-link {
    color: #3fa9f5;
    text-decoration: none;
}

.terms-link:hover {
    text-decoration: underline;
}

.btn-cadastrar {
    padding: 12px 40px;
    background: #b8d9f5;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 999px;
    cursor: not-allowed;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
}

.btn-cadastrar.active {
    background: #3fa9f5;
    cursor: pointer;
}

.btn-cadastrar.active:hover {
    background: #2a96e8;
    box-shadow: 0 4px 14px rgba(63, 169, 245, 0.4);
}

.btn-cadastrar.active:active {
    transform: scale(0.98);
}

@media (max-width: 768px) {
    .cadastro-page {
        flex-direction: column;
    }

    .left-panel {
        width: 100%;
        min-height: 220px;
    }

    .input-row {
        flex-direction: column;
    }
}
</style>

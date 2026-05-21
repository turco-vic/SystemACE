<template>
  <div class="minhas-solicitacoes" app-layout>
    <SidebarACE />
    
    <main class="solicitacoes-main">
      
      
      <section class="content">
        <div class="content-header">
          <h1>Minhas Solicitações</h1>
          <p>Histórico de todas as suas solicitações de EPIs</p>
        </div>

        <div v-if="loading" class="feedback-state loading">
          <p>Carregando suas solicitações...</p>
        </div>

        <div v-else-if="errorMsg" class="feedback-state error">
          <p>{{ errorMsg }}</p>
          <button @click="loadSolicitacoes" class="btn-retry">Tentar novamente</button>
        </div>

        <div v-else class="solicitacoes-list">
          <div v-if="solicitacoes.length === 0" class="feedback-state empty">
            <p>Você ainda não fez nenhuma solicitação.</p>
          </div>

          <div 
            v-else
            v-for="solicitacao in solicitacoes" 
            :key="solicitacao.idsolicitacoes" 
            class="solicitacao-card"
          >
            <div class="solicitacao-info">
              <h3>{{ solicitacao.epis?.nome || 'EPI não especificado' }}</h3>
              <p class="solicitacao-type">{{ solicitacao.epis?.tipo || 'Tipo não informado' }}</p>
              
              <div class="datas-container">
                <p class="solicitacao-date">
                  <strong>Solicitado:</strong> {{ formatDate(solicitacao.data_solicitacao) }}
                </p>
                <p v-if="solicitacao.data_aprovacao" class="solicitacao-date">
                  <strong>Aprovado:</strong> {{ formatDate(solicitacao.data_aprovacao) }}
                </p>
                <p v-if="solicitacao.data_entrega" class="solicitacao-date">
                  <strong>Entregue:</strong> {{ formatDate(solicitacao.data_entrega) }}
                </p>
                <p v-if="solicitacao.data_devolucao" class="solicitacao-date">
                  <strong>Devolvido:</strong> {{ formatDate(solicitacao.data_devolucao) }}
                </p>
              </div>
            </div>
            
            <div class="solicitacao-status" :class="getStatusClass(solicitacao.status)">
              {{ getStatusText(solicitacao.status) }}
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SidebarACE from '../SidebarACE.vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase, session } = useSupabase()

const solicitacoes = ref([])
const loading = ref(true)
const errorMsg = ref('')

const loadSolicitacoes = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const userEmail = session.value?.user?.email
    if (!userEmail) throw new Error('Usuário não autenticado')

    // Busca o ID do aluno
    const { data: alunoData, error: alunoError } = await supabase
      .from('aluno')
      .select('idaluno')
      .eq('email', userEmail)
      .single()

    if (alunoError || !alunoData) {
      throw new Error('Cadastro de aluno não encontrado.')
    }

    // Busca as solicitações do aluno
    const { data, error } = await supabase
      .from('solicitacoes')
      .select(`
        *,
        epis:epis_id (
          nome,
          tipo
        )
      `)
      .eq('aluno_id', alunoData.idaluno)
      .order('data_solicitacao', { ascending: false })

    if (error) throw error
    
    solicitacoes.value = data || []
  } catch (error) {
    console.error('Erro ao carregar solicitações:', error.message)
    errorMsg.value = 'Não foi possível carregar as solicitações no momento.'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  // Adicionado o timezone UTC para evitar que a data volte um dia dependendo do fuso
  return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

const getStatusClass = (status) => {
  const statusMap = {
    'pendente': 'status-pendente',
    'aprovado': 'status-aprovado',
    'rejeitado': 'status-rejeitado',
    'entregue': 'status-entregue',
    'devolvido': 'status-devolvido'
  }
  return statusMap[status?.toLowerCase()] || 'status-desconhecido'
}

const getStatusText = (status) => {
  const statusMap = {
    'pendente': 'Pendente',
    'aprovado': 'Aprovado',
    'rejeitado': 'Rejeitado',
    'entregue': 'Entregue',
    'devolvido': 'Devolvido'
  }
  return statusMap[status?.toLowerCase()] || status || 'Desconhecido'
}

onMounted(() => {
  loadSolicitacoes()
})
</script>

<style scoped>
.minhas-solicitacoes {
  min-height: 100vh;
  background-color: #293140;
  display: flex;
  flex-direction: column;
}

.solicitacoes-main {
  display: flex;
  flex: 1;
  /* Altura total menos o header (ajuste o valor de 80px conforme seu Header) */
  min-height: calc(100vh - 80px);
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.content-header {
  margin-bottom: 30px;
}

.content-header h1 {
  color: white;
  font-size: 2rem;
  margin-bottom: 8px;
}

.content-header p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

/* Estilos de Feedback (Loading, Erro, Vazio) */
.feedback-state {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.feedback-state.error {
  color: #ffb4a9;
  border-color: #f44336;
  background: rgba(244, 67, 54, 0.1);
}

.btn-retry {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-retry:hover {
  background-color: #d32f2f;
}

/* Lista e Cards */
.solicitacoes-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.solicitacao-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s, background 0.2s;
}

.solicitacao-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.solicitacao-info h3 {
  color: white;
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.solicitacao-type {
  color: #90caf9;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.datas-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.solicitacao-date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.solicitacao-date strong {
  color: rgba(255, 255, 255, 0.9);
}

/* Badges de Status */
.solicitacao-status {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 110px;
}

.status-pendente { background: rgba(255, 152, 0, 0.2); color: #ffb74d; border: 1px solid #ff9800; }
.status-aprovado { background: rgba(76, 175, 80, 0.2); color: #81c784; border: 1px solid #4CAF50; }
.status-rejeitado { background: rgba(244, 67, 54, 0.2); color: #e57373; border: 1px solid #f44336; }
.status-entregue { background: rgba(156, 39, 176, 0.2); color: #ba68c8; border: 1px solid #9C27B0; }
.status-devolvido { background: rgba(33, 150, 243, 0.2); color: #64b5f6; border: 1px solid #2196F3; }
.status-desconhecido { background: rgba(158, 158, 158, 0.2); color: #e0e0e0; border: 1px solid #9e9e9e; }

/* Responsividade */
@media (max-width: 768px) {
  .solicitacoes-main {
    flex-direction: column;
  }

  .solicitacao-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .solicitacao-status {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
<template>
  <div class="app-layout">
    <SidebarAluno />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Catálogo de EPIs</h1>
          <p class="stat-sub">Explore e solicite equipamentos de proteção disponíveis.</p>
        </div>
      </header>

      <main class="content-container">
        <div class="filters">
          <input v-model="searchQuery" type="text" placeholder="Buscar EPIs..." class="search-input">
          <select v-model="tipoFilter" class="filter-select">
            <option value="">Todos os tipos</option>
            <option value="Capacete">Capacete</option>
            <option value="Luvas">Luvas</option>
            <option value="Óculos">Óculos</option>
            <option value="Máscara">Máscara</option>
          </select>
          <select v-model="disponibilidadeFilter" class="filter-select">
            <option value="">Todas as disponibilidades</option>
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
          </select>
        </div>

        <div class="epis-grid">
          <div v-for="epi in filteredEpis" :key="epi.idepis" class="card epi-card">
            <div class="card-main-info">
              <div class="epi-icon-box">
                <img :src="getImagemEpi(epi)" :alt="epi.nome">
              </div>
              <div class="info-text">
                <h3>{{ epi.nome }}</h3>
                <span class="category-badge">{{ epi.tipo }}</span>
              </div>
              <div class="status-badge-container">
                <span class="status-pill" :class="epi.disponivel ? 'disponivel' : 'indisponivel'">
                  {{ epi.disponivel ? 'Disponível' : 'Indisponível' }}
                </span>
              </div>
            </div>

            <div class="card-description">
              <p>{{ epi.descricao }}</p>
            </div>

            <div class="card-actions">
              <button
                @click="solicitarEPI(epi)"
                :disabled="!epi.disponivel"
                class="btn-solicitar"
                :class="{ disabled: !epi.disponivel }"
              >
                Solicitar Empréstimo
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredEpis.length === 0" class="empty-state-container">
          <div class="empty-icon">📂</div>
          <h3>Nenhum EPI encontrado</h3>
          <p>Tente ajustar os filtros aplicados.</p>
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

const epis = ref([])
const searchQuery = ref('')
const tipoFilter = ref('')
const disponibilidadeFilter = ref('')

const filteredEpis = computed(() => {
  return epis.value.filter(epi => {
    const termoBusca = searchQuery.value.toLowerCase().trim()
    const matchesSearch = !termoBusca ||
      (epi.nome && String(epi.nome).toLowerCase().includes(termoBusca)) ||
      (epi.descricao && String(epi.descricao).toLowerCase().includes(termoBusca))

    const matchesTipo = !tipoFilter.value ||
      (epi.tipo && String(epi.tipo).toLowerCase() === String(tipoFilter.value).toLowerCase())

    let matchesDisponibilidade = true
    if (disponibilidadeFilter.value !== '') {
      const isDisponivel = epi.disponivel === true || epi.disponivel === 'true' || epi.disponivel === 1
      const isFiltroDisponivel = disponibilidadeFilter.value === 'true'
      matchesDisponibilidade = isDisponivel === isFiltroDisponivel
    }

    return matchesSearch && matchesTipo && matchesDisponibilidade
  })
})

const getImagemEpi = (epi) => {
  if (epi.foto) return epi.foto
  const nomeEpi = epi.nome || 'EPI'
  const iniciais = nomeEpi.substring(0, 2).toUpperCase()
  return `https://ui-avatars.com/api/?name=${iniciais}&background=475569&color=fff&size=300&font-size=0.4`
}

const loadEpis = async () => {
  try {
    const { data, error } = await supabase
      .from('epis')
      .select('*')
      .eq('ativo', true)

    if (error) throw error
    epis.value = data || []
  } catch (error) {
    console.error('Erro ao carregar EPIs:', error)
    alert('Erro ao carregar EPIs')
  }
}

const solicitarEPI = async (epi) => {
  if (!epi.disponivel) return

  try {
    const userEmail = session.value.user.email
    const { data: alunoData } = await supabase
      .from('aluno')
      .select('idaluno')
      .eq('email', userEmail)
      .single()

    if (!alunoData) {
      alert('Perfil do aluno não encontrado')
      return
    }

    const { error } = await supabase
      .from('solicitacoes')
      .insert({
        aluno_id: alunoData.idaluno,
        epis_id: epi.idepis,
        status: 'pendente',
        data_solicitacao: new Date().toISOString().split('T')[0]
      })

    if (error) throw error

    alert('Solicitação enviada com sucesso!')
    loadEpis()
  } catch (error) {
    console.error('Erro ao solicitar EPI:', error)
    alert('Erro ao enviar solicitação: ' + error.message)
  }
}

onMounted(loadEpis)
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
}

/* Header */
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

/* Content */
.content-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Filtros */
.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-input,
.filter-select {
  padding: 8px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #1e293b;
  font-size: 0.875rem;
  font-family: 'IBM Plex Sans', sans-serif;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus,
.filter-select:focus {
  border-color: #94a3b8;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

/* Grid de Cards */
.epis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.epi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-main-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.epi-icon-box {
  width: 48px;
  height: 48px;
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.epi-icon-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-text {
  flex: 1;
  min-width: 0;
}

.info-text h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* Status Pills */
.status-pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
}

.status-pill.disponivel  { background: #f0fdf4; color: #166534; }
.status-pill.indisponivel { background: #fef2f2; color: #991b1b; }

/* Descrição */
.card-description {
  margin-bottom: 1.25rem;
}

.card-description p {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* Botão */
.card-actions {
  margin-top: auto;
}

.btn-solicitar {
  width: 100%;
  padding: 10px;
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'IBM Plex Sans', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-solicitar:hover:not(:disabled) {
  background: #334155;
}

.btn-solicitar:disabled,
.btn-solicitar.disabled {
  background: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}

/* Empty State */
.empty-state-container {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state-container h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-state-container p {
  color: #64748b;
}

@media (max-width: 640px) {
  .card-main-info {
    flex-direction: column;
    align-items: flex-start;
  }
  .status-badge-container {
    margin-top: 0.5rem;
  }
  .filters {
    flex-direction: column;
  }
  .search-input {
    width: 100%;
  }
}
</style>
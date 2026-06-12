<template>
  <div class="app-layout">
    <SidebarAluno ref="sidebarRef" />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <button class="hamburger" @click="openMobileSidebar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
          <div>
            <h1 class="page-title">Catálogo de EPIs</h1>
            <p class="page-sub">Explore e solicite equipamentos de proteção disponíveis.</p>
          </div>
        </div>
      </header>

      <main class="content-main">
        <!-- Filtros -->
        <div class="filters-bar">
          <div class="search-wrap">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="#8FA3B5" stroke-width="1.5" />
              <path d="M10.5 10.5L14 14" stroke="#8FA3B5" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Buscar EPIs..." class="search-input" />
          </div>
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

        <!-- Grid -->
        <div class="epis-grid" v-if="filteredEpis.length > 0">
          <div v-for="epi in filteredEpis" :key="epi.idepis" class="epi-card">
            <div class="card-top">
              <div class="epi-avatar">
                <img v-if="epi.foto" :src="epi.foto" :alt="epi.nome" />
                <svg v-else width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z"/><path d="M8 7v8M2 4l6 3 6-3"/>
                </svg>
              </div>
              <div class="card-info">
                <h3 class="card-name">{{ epi.nome }}</h3>
                <span class="card-type">{{ epi.tipo }}</span>
              </div>
              <span class="status-pill" :class="epi.disponivel ? 'disponivel' : 'indisponivel'">
                {{ epi.disponivel ? 'Disponível' : 'Indisponível' }}
              </span>
            </div>
            <p class="card-desc">{{ epi.descricao || 'Sem descrição.' }}</p>
            <button @click="solicitarEPI(epi)" :disabled="!epi.disponivel" class="btn-solicitar"
              :class="{ disabled: !epi.disponivel }">
              Solicitar Empréstimo
            </button>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <div class="empty-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="8" width="32" height="26" rx="4" stroke="#8FA3B5" stroke-width="2"/>
              <path d="M13 20h14M13 26h8" stroke="#8FA3B5" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
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

const sidebarRef = ref(null)
const openMobileSidebar = () => { if (sidebarRef.value) sidebarRef.value.mobileOpen = true }

const epis = ref([])
const searchQuery = ref('')
const tipoFilter = ref('')
const disponibilidadeFilter = ref('')

const filteredEpis = computed(() => epis.value.filter(epi => {
  const q = searchQuery.value.toLowerCase().trim()
  const matchesSearch = !q ||
    (epi.nome && epi.nome.toLowerCase().includes(q)) ||
    (epi.descricao && epi.descricao.toLowerCase().includes(q))
  const matchesTipo = !tipoFilter.value ||
    (epi.tipo && epi.tipo.toLowerCase() === tipoFilter.value.toLowerCase())
  let matchesDisp = true
  if (disponibilidadeFilter.value !== '') {
    const isDisp = epi.disponivel === true || epi.disponivel === 'true'
    matchesDisp = isDisp === (disponibilidadeFilter.value === 'true')
  }
  return matchesSearch && matchesTipo && matchesDisp
}))

const loadEpis = async () => {
  try {
    const { data, error } = await supabase.from('epis').select('*').eq('ativo', true)
    if (error) throw error
    epis.value = data || []
  } catch (e) { console.error(e) }
}

const solicitarEPI = async (epi) => {
  if (!epi.disponivel) return
  try {
    const { data: alunoData } = await supabase.from('aluno').select('idaluno')
      .eq('email', session.value.user.email).single()
    if (!alunoData) { alert('Perfil não encontrado'); return }
    const { error } = await supabase.from('solicitacoes').insert({
      aluno_id: alunoData.idaluno,
      epis_id: epi.idepis,
      status: 'pendente',
      data_solicitacao: new Date().toISOString().split('T')[0]
    })
    if (error) throw error
    alert('Solicitação enviada com sucesso!')
    loadEpis()
  } catch (e) { alert('Erro: ' + e.message) }
}

onMounted(loadEpis)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

.app-layout {
  --c-dark:    #1E3D58;
  --c-accent:  #43B0F1;
  --c-bg:      #F5F5F0;
  --c-surface: #FFFFFF;
  --c-text:    #1E3D58;
  --c-muted:   #5A7187;
  --c-faint:   #8FA3B5;
  --c-border:  #E2E5EA;

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
  transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
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
}

.header-left { display: flex; align-items: center; gap: 12px; }

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--c-text);
  letter-spacing: -0.3px;
  margin: 0;
  line-height: 1.2;
}

.page-sub { font-size: 0.8rem; color: var(--c-faint); margin: 3px 0 0 0; }

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

.content-main {
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.filters-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 200px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 10px 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-wrap:focus-within {
  border-color: var(--c-accent);
  box-shadow: 0 0 0 3px rgba(67,176,241,.1);
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

.search-input::placeholder { color: var(--c-faint); }

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
  transition: border-color 0.2s;
}

.filter-select:focus { border-color: var(--c-accent); }

/* Grid */
.epis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.epi-card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30,61,88,.04);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.epi-card:hover {
  box-shadow: 0 8px 20px rgba(30,61,88,.1);
  transform: translateY(-2px);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid #EDF0F2;
}

.epi-avatar {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(67,176,241,.1);
  color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.epi-avatar img { width: 100%; height: 100%; object-fit: cover; }

.card-info { flex: 1; min-width: 0; }

.card-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 3px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-type {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--c-faint);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.status-pill {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.status-pill.disponivel   { background: rgba(34,197,94,.12); color: #166534; }
.status-pill.indisponivel { background: rgba(239,68,68,.1);  color: #991b1b; }

.card-desc {
  font-size: 0.85rem;
  color: var(--c-muted);
  line-height: 1.6;
  flex: 1;
  margin: 0;
}

.btn-solicitar {
  width: 100%;
  padding: 10px;
  background: var(--c-accent);
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(67,176,241,.25);
}

.btn-solicitar:hover:not(:disabled) {
  background: #2E9BDF;
  box-shadow: 0 6px 18px rgba(67,176,241,.38);
}

.btn-solicitar.disabled,
.btn-solicitar:disabled {
  background: #EDF0F2;
  color: var(--c-faint);
  cursor: not-allowed;
  box-shadow: none;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--c-surface);
  border-radius: 14px;
  border: 2px dashed var(--c-border);
}

.empty-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.empty-state h3 { color: var(--c-text); margin-bottom: 6px; font-size: 1rem; }
.empty-state p  { color: var(--c-faint); font-size: 0.875rem; }

/* Responsivo */
@media (max-width: 900px) {
  .main-wrapper { margin-left: 0; }
  .hamburger { display: flex; }
  .content-main { padding: 16px; }
  .top-header { padding: 12px 16px; }
}

@media (max-width: 600px) {
  .filters-bar { flex-direction: column; }
  .page-sub { display: none; }
}
</style>

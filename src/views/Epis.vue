<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <SidebarACE />

    <!-- Main Content -->
    <div class="main-wrapper">
      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Gestão de EPIs</h1>
        </div>
        <div class="header-right">
          <button class="btn-primary" @click="openCadastroModal">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1V14M1 7.5H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Cadastrar
          </button>
          <button class="btn-secondary" @click="showFiltroModal = true">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1 3H14M3 7.5H12M5.5 12H9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Filtrar
          </button>
          <button v-if="filtroTipo || filtroDisponibilidade" class="btn-danger-soft" @click="limparFiltros">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Limpar
          </button>
          <button class="btn-secondary" @click="exportarTablePDF">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1V10M7.5 10L4.5 7M7.5 10L10.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.5 11.5V13H13.5V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Exportar
          </button>
        </div>
      </header>

      <main class="epis-main">
        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">TOTAL CADASTRADO</span>
              <span class="stat-icon-wrap total">📦</span>
            </div>
            <div class="stat-number">{{ stats.total }}</div>
            <div class="stat-sub">Todos os EPIs registrados</div>
          </div>
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">EM ESTOQUE</span>
              <span class="stat-icon-wrap avail">✓</span>
            </div>
            <div class="stat-number">{{ stats.emEstoque }}</div>
            <div class="stat-sub">Com quantidade disponível</div>
          </div>
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">EM USO</span>
              <span class="stat-icon-wrap inuse">⚙️</span>
            </div>
            <div class="stat-number">{{ stats.emUso }}</div>
            <div class="stat-sub">Entregas ativas</div>
          </div>
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">VENCIDOS / ALERTA</span>
              <span class="stat-icon-wrap alert">⚠️</span>
            </div>
            <div class="stat-number">{{ stats.vencidos }}</div>
            <div class="stat-sub warn">Requer atenção</div>
          </div>
        </div>

        <!-- Search + Table card -->
        <div class="card">
          <!-- Search bar inside card -->
          <div class="table-toolbar">
            <div class="search-wrap">
              <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#94a3b8" stroke-width="1.5"/>
                <path d="M10.5 10.5L14 14" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Filtre por nome, tipo ou patrimônio..."
                class="search-input"
              />
            </div>
            <span class="results-count">{{ filteredEPIs.length }} registro(s)</span>
          </div>

          <!-- Table -->
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>CÓD. PATRIMÔNIO</th>
                  <th>TIPO</th>
                  <th>ESTOQUE</th>
                  <th>STATUS</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="epi in filteredEPIs" :key="epi.idepis">
                  <td>
                    <div class="epi-name-cell">
                      <div class="epi-avatar">📦</div>
                      <div>
                        <div class="epi-title">{{ epi.nome }}</div>
                        <div class="epi-subtitle">{{ epi.tipo || 'Sem tipo' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="mono">{{ epi.codigo_patrimonio || '---' }}</td>
                  <td>{{ epi.tipo || '---' }}</td>
                  <td class="mono">{{ epi.quantidade || 0 }} un</td>
                  <td>
                    <span :class="['status-badge', getStatusClass(epi)]">
                      {{ getStatusText(epi) }}
                    </span>
                  </td>
                  <td class="actions-cell">
                    <button class="btn-dots" @click="openMenu($event, epi)" title="Ações">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="3" r="1.2" fill="currentColor"/>
                        <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
                        <circle cx="8" cy="13" r="1.2" fill="currentColor"/>
                      </svg>
                    </button>
                    <div v-if="activeMenu === epi.idepis" class="action-menu">
                      <button @click="editarEPI(epi)" class="menu-item">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L4.5 12 12.5 4 10 1.5 2 9.5 1 13Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                        Editar
                      </button>
                      <button @click="visualizarDetalhes(epi)" class="menu-item">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M7 6V10M7 4.5V5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                        Detalhes
                      </button>
                      <button @click="deletarEPI(epi.idepis)" class="menu-item danger">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5H12M5 3.5V2.5H9V3.5M5.5 6V11M8.5 6V11M3 3.5L3.5 12H10.5L11 3.5H3Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredEPIs.length === 0">
                  <td colspan="6" class="no-data">Nenhum EPI encontrado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal Cadastro -->
    <div v-if="showCadastroModal" class="modal-overlay" @click="showCadastroModal = false">
      <div class="modal-box" @click.stop>
        <div class="modal-head">
          <h2>{{ novoEPI.idepis ? 'Editar EPI' : 'Cadastrar Novo EPI' }}</h2>
          <button class="btn-close-modal" @click="showCadastroModal = false">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3L15 15M15 3L3 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
        <form class="modal-form" @submit.prevent="salvarEPI">
          <div class="form-group">
            <label>Nome do EPI *</label>
            <input v-model="novoEPI.nome" type="text" required placeholder="Ex: Capacete de Segurança"/>
          </div>
          <div class="form-group">
            <label>Tipo *</label>
            <input v-model="novoEPI.tipo" type="text" required placeholder="Ex: Proteção Cabeça"/>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Quantidade *</label>
              <input v-model.number="novoEPI.quantidade" type="number" required min="0" placeholder="0"/>
            </div>
            <div class="form-group">
              <label>Código Patrimônio</label>
              <input v-model="novoEPI.codigo_patrimonio" type="text" placeholder="Ex: PAT-001"/>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Data de Validade</label>
              <input v-model="novoEPI.data_validade" type="date"/>
            </div>
            <div class="form-group">
              <label>Disponível</label>
              <select v-model="novoEPI.disponivel">
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Foto do EPI</label>
            <input ref="fotoInput" type="file" @change="handleFotoChange" accept="image/*" class="file-input"/>
            <div v-if="novoEPI.fotoPreview" class="foto-preview">
              <img :src="novoEPI.fotoPreview" alt="Preview"/>
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn-cancel-modal" @click="showCadastroModal = false">Cancelar</button>
            <button type="submit" class="btn-save">Salvar EPI</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Filtro -->
    <div v-if="showFiltroModal" class="modal-overlay" @click="showFiltroModal = false">
      <div class="modal-box modal-sm" @click.stop>
        <div class="modal-head">
          <h2>Filtrar EPIs</h2>
          <button class="btn-close-modal" @click="showFiltroModal = false">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3L15 15M15 3L3 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="modal-form">
          <div class="form-group">
            <label>Tipo de EPI</label>
            <select v-model="filtroTipo">
              <option value="">— Todos os tipos —</option>
              <option v-for="tipo in tiposUnicos" :key="tipo" :value="tipo">{{ tipo }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Disponibilidade</label>
            <select v-model="filtroDisponibilidade">
              <option value="">— Todos —</option>
              <option value="sim">Disponível</option>
              <option value="nao">Indisponível</option>
            </select>
          </div>
          <div class="modal-foot">
            <button @click="limparFiltrosEFechar" class="btn-cancel-modal">Limpar Tudo</button>
            <button @click="showFiltroModal = false" class="btn-save">Aplicar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay click-out para fechar menus -->
    <div v-if="activeMenu" class="menu-overlay" @click="activeMenu = null"></div>
  </div>
</template>

<script setup>
import SidebarACE from '../components/SidebarACE.vue'
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { jsPDF } from 'jspdf'

const { getEPIs, addEPI, deleteEPI, supabase } = useSupabase()

const epis = ref([])
const searchQuery = ref('')
const showCadastroModal = ref(false)
const showFiltroModal = ref(false)
const activeMenu = ref(null)
const filtroTipo = ref('')
const filtroDisponibilidade = ref('')

const stats = ref({ total: 0, emEstoque: 0, emUso: 0, vencidos: 0 })

const novoEPI = ref({
  nome: '', tipo: '', quantidade: 0, codigo_patrimonio: '',
  data_validade: null, disponivel: true, foto: null, fotoPreview: null
})

const fotoInput = ref(null)

const tiposUnicos = computed(() => {
  const tipos = [...new Set(epis.value.map(e => e.tipo).filter(Boolean))]
  return tipos.sort()
})

const filteredEPIs = computed(() => {
  let res = epis.value
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    res = res.filter(e =>
      e.nome.toLowerCase().includes(q) ||
      (e.codigo_patrimonio && e.codigo_patrimonio.toLowerCase().includes(q)) ||
      (e.tipo && e.tipo.toLowerCase().includes(q))
    )
  }
  if (filtroTipo.value) res = res.filter(e => e.tipo === filtroTipo.value)
  if (filtroDisponibilidade.value !== '') {
    const disp = filtroDisponibilidade.value === 'sim'
    res = res.filter(e => e.disponivel === disp)
  }
  return res
})

const calcularStats = async () => {
  const total = epis.value.length
  const emEstoque = epis.value.filter(e => e.quantidade && e.quantidade > 0).length
  const { data: alunosComEpis } = await supabase.from('aluno_has_epis').select('epis_id')
  const { data: funcionariosComEpis } = await supabase.from('funcionario_has_epis').select('epis_id').is('data_devolucao', null)
  const idsEmUso = new Set()
  if (alunosComEpis) alunosComEpis.forEach(i => idsEmUso.add(i.epis_id))
  if (funcionariosComEpis) funcionariosComEpis.forEach(i => idsEmUso.add(i.epis_id))
  const hoje = new Date().toISOString().split('T')[0]
  const vencidos = epis.value.filter(e => e.data_validade && e.data_validade < hoje).length
  stats.value = { total, emEstoque, emUso: idsEmUso.size, vencidos }
}

const getStatusClass = (epi) => {
  if (!epi.disponivel) return 'indisponivel'
  if (epi.quantidade === 0) return 'sem-estoque'
  if (epi.data_validade && epi.data_validade < new Date().toISOString().split('T')[0]) return 'vencido'
  return 'disponivel'
}

const getStatusText = (epi) => {
  if (!epi.disponivel) return 'Indisponível'
  if (epi.quantidade === 0) return 'Sem estoque'
  if (epi.data_validade && epi.data_validade < new Date().toISOString().split('T')[0]) return 'Vencido'
  return 'Disponível'
}

const openCadastroModal = () => {
  novoEPI.value = { nome: '', tipo: '', quantidade: 0, codigo_patrimonio: '', data_validade: null, disponivel: true, foto: null, fotoPreview: null }
  showCadastroModal.value = true
}

const handleFotoChange = (e) => {
  const file = e.target.files?.[0]
  if (file) {
    novoEPI.value.foto = file
    const reader = new FileReader()
    reader.onload = (ev) => { novoEPI.value.fotoPreview = ev.target?.result }
    reader.readAsDataURL(file)
  }
}

const salvarEPI = async () => {
  try {
    if (!novoEPI.value.nome.trim()) { alert('Nome do EPI é obrigatório'); return }
    const quantidade = novoEPI.value.quantidade || 1
    let fotoUrl = null
    if (novoEPI.value.foto) {
      const nomeArquivo = `${Date.now()}-${novoEPI.value.foto.name}`
      const { error: uploadError } = await supabase.storage.from('epis').upload(nomeArquivo, novoEPI.value.foto)
      if (uploadError) throw uploadError
      const { data: urlData } = supabase.storage.from('epis').getPublicUrl(nomeArquivo)
      fotoUrl = urlData.publicUrl
    }
    const episCriar = []
    for (let i = 0; i < quantidade; i++) {
      episCriar.push({
        nome: novoEPI.value.nome, tipo: novoEPI.value.tipo, quantidade: 1,
        codigo_patrimonio: novoEPI.value.codigo_patrimonio ? `${novoEPI.value.codigo_patrimonio}-${i + 1}` : null,
        data_validade: novoEPI.value.data_validade, disponivel: novoEPI.value.disponivel, foto: fotoUrl
      })
    }
    const { error } = await supabase.from('epis').insert(episCriar)
    if (error) { alert('Erro ao salvar EPI: ' + error.message); return }
    alert(`${quantidade} EPI(s) cadastrado(s) com sucesso!`)
    showCadastroModal.value = false
    await carregarEPIs()
  } catch (e) { alert('Erro: ' + e.message) }
}

const carregarEPIs = async () => {
  try { epis.value = await getEPIs(); calcularStats() }
  catch (e) { console.error(e) }
}

const openMenu = (event, epi) => {
  event.stopPropagation()
  activeMenu.value = activeMenu.value === epi.idepis ? null : epi.idepis
}

const editarEPI = (epi) => { novoEPI.value = { ...epi }; showCadastroModal.value = true; activeMenu.value = null }

const visualizarDetalhes = (epi) => {
  alert(`EPI: ${epi.nome}\nTipo: ${epi.tipo}\nEstoque: ${epi.quantidade}\nCódigo: ${epi.codigo_patrimonio}`)
  activeMenu.value = null
}

const limparFiltros = () => { filtroTipo.value = ''; filtroDisponibilidade.value = '' }
const limparFiltrosEFechar = () => { limparFiltros(); showFiltroModal.value = false }

const deletarEPI = async (id) => {
  if (!confirm('Deseja deletar este EPI?')) { activeMenu.value = null; return }
  const { error } = await supabase.from('epis').delete().eq('idepis', id)
  if (error) { alert('Erro: ' + error.message); return }
  alert('EPI deletado!')
  activeMenu.value = null
  await carregarEPIs()
}

const exportarTablePDF = () => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let y = 20
  doc.setFillColor(37, 99, 235)
  doc.rect(0, 0, pageWidth, 30, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont(undefined, 'bold')
  doc.text('Relatório de EPIs', 14, 20)
  y = 45
  doc.setTextColor(30, 41, 59)
  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')
  doc.text(`Total: ${stats.value.total} | Em Estoque: ${stats.value.emEstoque} | Em Uso: ${stats.value.emUso} | Vencidos: ${stats.value.vencidos}`, 14, y)
  y += 12
  filteredEPIs.value.forEach(epi => {
    doc.setFont(undefined, 'bold')
    doc.text(`• ${epi.nome}`, 14, y)
    y += 5
    doc.setFont(undefined, 'normal')
    doc.setFontSize(8)
    doc.text(`  Tipo: ${epi.tipo || '---'} | Cód: ${epi.codigo_patrimonio || '---'} | Estoque: ${epi.quantidade || 0} | ${getStatusText(epi)}`, 14, y)
    y += 5
    doc.setFontSize(10)
    if (y > pageHeight - 30) { doc.addPage(); y = 20 }
  })
  doc.save(`EPIs_${new Date().toISOString().split('T')[0]}.pdf`)
}

onMounted(carregarEPIs)
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

/* Header */
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e9f0;
  position: sticky;
  top: 0;
  z-index: 10;
  flex-wrap: wrap;
  gap: 12px;
}

.page-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 600;
  transition: background 0.2s, transform 0.15s;
  font-family: inherit;
}
.btn-primary:hover { background-color: #1d4ed8; transform: translateY(-1px); }

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #ffffff;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 500;
  transition: all 0.2s;
  font-family: inherit;
}
.btn-secondary:hover { border-color: #2563EB; color: #2563EB; background-color: #eff6ff; }

.btn-danger-soft {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 500;
  transition: all 0.2s;
  font-family: inherit;
}
.btn-danger-soft:hover { background-color: #fee2e2; }

/* Main */
.epis-main {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px 20px;
  border: 1px solid #e5e9f0;
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.stat-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
.stat-icon-wrap.total  { background-color: #eff6ff; }
.stat-icon-wrap.avail  { background-color: #f0fdf4; }
.stat-icon-wrap.inuse  { background-color: #fffbeb; }
.stat-icon-wrap.alert  { background-color: #fef2f2; }

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 6px;
}

.stat-sub {
  font-size: 0.75rem;
  color: #64748b;
}
.stat-sub.warn { color: #ef4444; }

/* Card */
.card {
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e5e9f0;
  overflow: hidden;
}

/* Toolbar */
.table-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  flex-wrap: wrap;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 240px;
  background-color: #f8fafc;
  border: 1px solid #e5e9f0;
  border-radius: 7px;
  padding: 8px 12px;
  transition: border-color 0.2s;
}
.search-wrap:focus-within { border-color: #2563EB; background-color: #fff; }

.search-icon { flex-shrink: 0; }

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: #1e293b;
  width: 100%;
  font-family: inherit;
}
.search-input::placeholder { color: #94a3b8; }

.results-count {
  font-size: 0.78rem;
  color: #94a3b8;
  white-space: nowrap;
}

/* Table */
.table-wrap { overflow-x: auto; }

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table thead tr {
  background-color: #f8fafc;
}

.data-table th {
  padding: 10px 16px;
  text-align: left;
  font-size: 0.7rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e5e9f0;
  white-space: nowrap;
}

.data-table td {
  padding: 13px 16px;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background-color: #f8fafc; }

.epi-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.epi-avatar {
  width: 36px;
  height: 36px;
  background-color: #eff6ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.epi-title {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

.epi-subtitle {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 2px;
}

.mono { font-family: 'IBM Plex Mono', monospace; font-size: 0.82rem; }

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 0.72rem;
  font-weight: 700;
}
.status-badge.disponivel    { background: #dcfce7; color: #16a34a; }
.status-badge.sem-estoque   { background: #fef9c3; color: #ca8a04; }
.status-badge.vencido       { background: #fef2f2; color: #ef4444; }
.status-badge.indisponivel  { background: #f1f5f9; color: #64748b; }

/* Actions */
.actions-cell { position: relative; text-align: center; }

.btn-dots {
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  padding: 4px 8px;
  border-radius: 5px;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-dots:hover { background-color: #f1f5f9; color: #1e293b; }

.action-menu {
  position: absolute;
  right: 4px;
  top: calc(100% + 4px);
  background: #ffffff;
  border: 1px solid #e5e9f0;
  border-radius: 8px;
  z-index: 200;
  min-width: 140px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 14px;
  background: none;
  border: none;
  color: #475569;
  cursor: pointer;
  text-align: left;
  font-size: 0.845rem;
  font-family: inherit;
  transition: background 0.15s;
}
.menu-item:hover { background-color: #f8fafc; color: #1e293b; }
.menu-item.danger:hover { background-color: #fef2f2; color: #ef4444; }

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
}

.no-data {
  text-align: center;
  color: #94a3b8;
  padding: 48px !important;
  font-size: 0.875rem;
}

/* Modals */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  backdrop-filter: blur(2px);
}

.modal-box {
  background: #ffffff;
  border-radius: 12px;
  padding: 28px;
  max-width: 560px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}
.modal-sm { max-width: 400px; }

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-head h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.btn-close-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  padding: 4px;
  border-radius: 5px;
  transition: all 0.15s;
  display: flex;
}
.btn-close-modal:hover { color: #ef4444; background: #fef2f2; }

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
}

.form-group input,
.form-group select {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  padding: 9px 12px;
  color: #1e293b;
  font-size: 0.875rem;
  font-family: inherit;
  transition: all 0.2s;
}
.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #2563EB;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
}

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.btn-save {
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 9px 22px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  transition: background 0.2s;
}
.btn-save:hover { background-color: #1d4ed8; }

.btn-cancel-modal {
  background-color: #f1f5f9;
  color: #475569;
  border: none;
  padding: 9px 18px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  transition: background 0.2s;
}
.btn-cancel-modal:hover { background-color: #e2e8f0; }

.file-input {
  font-size: 0.82rem;
  color: #475569;
  cursor: pointer;
}

.foto-preview {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  margin-top: 4px;
}
.foto-preview img { width: 100%; height: 100%; object-fit: cover; }

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .epis-main { padding: 16px; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .top-header { padding: 14px 16px; }
  .form-row { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr; }
}
</style>
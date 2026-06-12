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
          <h1 class="page-title">Gestão de EPIs</h1>
        </div>
        <div class="header-right">
          <button class="btn-primary" @click="openCadastroModal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            Cadastrar
          </button>
          <button class="btn-secondary" @click="showFiltroModal = true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 3H13M3 7H11M5 11H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            Filtrar
          </button>
          <button v-if="filtroTipo || filtroDisponibilidade" class="btn-danger-soft" @click="limparFiltros">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            Limpar
          </button>
          <button class="btn-secondary" @click="exportarTablePDF">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V10M7 10L4 7M7 10L10 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M1 11V13H13V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
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
              <span class="stat-label">Total Cadastrado</span>
              <span class="stat-icon-wrap total">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
                  <path d="M8 7v8M2 4l6 3 6-3" />
                </svg>
              </span>
            </div>
            <div class="stat-number">{{ stats.total }}</div>
            <div class="stat-sub">Todos os EPIs registrados</div>
          </div>
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Em Estoque</span>
              <span class="stat-icon-wrap avail">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 8.5l3.5 3.5L13 5" />
                </svg>
              </span>
            </div>
            <div class="stat-number">{{ stats.emEstoque }}</div>
            <div class="stat-sub">Com quantidade disponível</div>
          </div>
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Em Uso</span>
              <span class="stat-icon-wrap inuse">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 2" />
                </svg>
              </span>
            </div>
            <div class="stat-number">{{ stats.emUso }}</div>
            <div class="stat-sub">Entregas ativas</div>
          </div>
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">Vencidos / Alerta</span>
              <span class="stat-icon-wrap alert">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 2L15 13.5H1L8 2z" />
                  <path d="M8 6.5v3M8 11.8v.2" />
                </svg>
              </span>
            </div>
            <div class="stat-number">{{ stats.vencidos }}</div>
            <div class="stat-sub warn">Requer atenção</div>
          </div>
        </div>

        <!-- Table card -->
        <div class="card">
          <div class="table-toolbar">
            <div class="search-wrap">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#8FA3B5" stroke-width="1.5" />
                <path d="M10.5 10.5L14 14" stroke="#8FA3B5" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <input v-model="searchQuery" type="text" placeholder="Filtre por nome, tipo ou patrimônio..."
                class="search-input" />
            </div>
            <span class="results-count">{{ filteredEPIs.length }} registro(s)</span>
          </div>

          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cód. Patrimônio</th>
                  <th>Tipo</th>
                  <th>Estoque</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="epi in filteredEPIs" :key="epi.idepis">
                  <td>
                    <div class="epi-name-cell">
                      <div class="epi-avatar">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
                          <path d="M8 7v8M2 4l6 3 6-3" />
                        </svg>
                      </div>
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
                    <span :class="['status-badge', getStatusClass(epi)]">{{ getStatusText(epi) }}</span>
                  </td>
                  <td class="actions-cell">
                    <button class="btn-dots" @click="openMenu($event, epi)" title="Ações">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="3" r="1.2" fill="currentColor" />
                        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
                        <circle cx="8" cy="13" r="1.2" fill="currentColor" />
                      </svg>
                    </button>
                    <div v-if="activeMenu === epi.idepis" class="action-menu">
                      <button @click="editarEPI(epi)" class="menu-item">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 13L4.5 12 12.5 4 10 1.5 2 9.5 1 13Z" stroke="currentColor" stroke-width="1.2"
                            stroke-linejoin="round" />
                        </svg>
                        Editar
                      </button>
                      <button @click="visualizarDetalhes(epi)" class="menu-item">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2" />
                          <path d="M7 6V10M7 4.5V5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                        </svg>
                        Detalhes
                      </button>
                      <button @click="deletarEPI(epi.idepis)" class="menu-item danger">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 3.5H12M5 3.5V2.5H9V3.5M5.5 6V11M8.5 6V11M3 3.5L3.5 12H10.5L11 3.5H3Z"
                            stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
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

    <!-- Modal Cadastro / Edição -->
    <div v-if="showCadastroModal" class="modal-overlay" @click="showCadastroModal = false">
      <div class="modal-box" @click.stop>
        <div class="modal-head">
          <h2>{{ novoEPI.idepis ? 'Editar EPI' : 'Cadastrar Novo EPI' }}</h2>
          <button class="btn-close-modal" @click="showCadastroModal = false">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <form class="modal-form" @submit.prevent="salvarEPI">
          <div class="form-group">
            <label>Nome do EPI *</label>
            <input v-model="novoEPI.nome" type="text" required placeholder="Ex: Capacete de Segurança" />
          </div>
          <div class="form-group">
            <label>Tipo *</label>
            <input v-model="novoEPI.tipo" type="text" required placeholder="Ex: Proteção craniana" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Quantidade *</label>
              <input v-model.number="novoEPI.quantidade" type="number" required min="0" placeholder="0" />
            </div>
            <div class="form-group">
              <label>Código Patrimônio</label>
              <input v-model="novoEPI.codigo_patrimonio" type="text" placeholder="Ex: EPI-001" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Data de Validade</label>
              <input v-model="novoEPI.data_validade" type="date" />
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
            <input ref="fotoInput" type="file" @change="handleFotoChange" accept="image/*" class="file-input" />
            <div v-if="novoEPI.fotoPreview" class="foto-preview">
              <img :src="novoEPI.fotoPreview" alt="Preview" />
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
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

    <div v-if="activeMenu" class="menu-overlay" @click="activeMenu = null"></div>
  </div>
</template>

<script setup>
import SidebarACE from '../components/SidebarACE.vue'
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { jsPDF } from 'jspdf'

const { getEPIs, addEPI, deleteEPI, supabase } = useSupabase()

const sidebarRef = ref(null)
const openMobileSidebar = () => { if (sidebarRef.value) sidebarRef.value.mobileOpen = true }
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
  doc.setFillColor(30, 61, 88)
  doc.rect(0, 0, pageWidth, 30, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont(undefined, 'bold')
  doc.text('Relatório de EPIs', 14, 20)
  y = 45
  doc.setTextColor(30, 61, 88)
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

/* ── Tokens ──────────────────────────────────────── */
.app-layout {
  --c-dark: #1E3D58;
  --c-accent: #43B0F1;
  --c-bg: #F5F5F0;
  --c-surface: #FFFFFF;
  --c-text: #1E3D58;
  --c-muted: #5A7187;
  --c-faint: #8FA3B5;
  --c-border: #E2E5EA;

  display: flex;
  min-height: 100vh;
  background: var(--c-bg);
  font-family: 'IBM Plex Sans', sans-serif;
  overflow-x: hidden;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-x: hidden;
}

/* ── Header ──────────────────────────────────────── */
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
  flex-wrap: wrap;
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
}

.header-right {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
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
  transition: background 0.15s;
  flex-shrink: 0;
}

.hamburger:hover {
  background: #EDF0F2;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--c-accent);
  color: #fff;
  border: none;
  padding: 9px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 600;
  font-family: inherit;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(67, 176, 241, .28);
}

.btn-primary:hover {
  background: #2E9BDF;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(67, 176, 241, .38);
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--c-surface);
  color: var(--c-muted);
  border: 1px solid var(--c-border);
  padding: 9px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.btn-secondary:hover {
  border-color: var(--c-accent);
  color: var(--c-accent);
}

.btn-danger-soft {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(239, 68, 68, .06);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, .2);
  padding: 9px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.845rem;
  font-weight: 500;
  font-family: inherit;
  transition: background 0.2s;
}

.btn-danger-soft:hover {
  background: rgba(239, 68, 68, .12);
}

/* ── Main ────────────────────────────────────────── */
.epis-main {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* ── Stats ───────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--c-surface);
  border-radius: 14px;
  padding: 20px 22px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
  transition: box-shadow 0.2s, transform 0.2s;
}

.stat-card:hover {
  box-shadow: 0 8px 20px rgba(30, 61, 88, .08);
  transform: translateY(-2px);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.stat-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--c-faint);
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.stat-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrap.total {
  background: rgba(67, 176, 241, .12);
  color: var(--c-accent);
}

.stat-icon-wrap.avail {
  background: rgba(34, 197, 94, .1);
  color: #16a34a;
}

.stat-icon-wrap.inuse {
  background: rgba(245, 158, 11, .1);
  color: #d97706;
}

.stat-icon-wrap.alert {
  background: rgba(239, 68, 68, .08);
  color: #dc2626;
}

.stat-number {
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--c-text);
  line-height: 1;
  margin-bottom: 7px;
  letter-spacing: -0.5px;
}

.stat-sub {
  font-size: 0.78rem;
  color: var(--c-muted);
}

.stat-sub.warn {
  color: #dc2626;
  font-weight: 500;
}

/* ── Card tabela ─────────────────────────────────── */
.card {
  background: var(--c-surface);
  border-radius: 14px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, .04);
  overflow: hidden;
}

.table-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--c-border);
  flex-wrap: wrap;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 220px;
  background: #FAFAF7;
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 9px 13px;
  transition: border-color 0.2s, background 0.2s;
}

.search-wrap:focus-within {
  border-color: var(--c-accent);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(67, 176, 241, .1);
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

.search-input::placeholder {
  color: var(--c-faint);
}

.results-count {
  font-size: 0.78rem;
  color: var(--c-faint);
  white-space: nowrap;
}

/* ── Tabela ──────────────────────────────────────── */
.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table thead tr {
  background: #FAFAF7;
}

.data-table th {
  padding: 10px 16px;
  text-align: left;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--c-faint);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  border-bottom: 1px solid var(--c-border);
  white-space: nowrap;
}

.data-table td {
  padding: 13px 16px;
  color: var(--c-muted);
  border-bottom: 1px solid #EDF0F2;
  vertical-align: middle;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.data-table tbody tr:hover td {
  background: #FAFAF7;
}

.epi-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.epi-avatar {
  width: 36px;
  height: 36px;
  background: rgba(67, 176, 241, .1);
  color: var(--c-accent);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.epi-title {
  font-weight: 600;
  color: var(--c-text);
  font-size: 0.875rem;
}

.epi-subtitle {
  font-size: 0.75rem;
  color: var(--c-faint);
  margin-top: 2px;
}

.mono {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.82rem;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
}

.status-badge.disponivel {
  background: rgba(34, 197, 94, .12);
  color: #16a34a;
}

.status-badge.sem-estoque {
  background: rgba(234, 179, 8, .1);
  color: #a16207;
}

.status-badge.vencido {
  background: rgba(239, 68, 68, .1);
  color: #dc2626;
}

.status-badge.indisponivel {
  background: rgba(100, 116, 139, .1);
  color: #5A7187;
}

/* Ações */
.actions-cell {
  position: relative;
  text-align: center;
}

.btn-dots {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-faint);
  padding: 6px 8px;
  border-radius: 7px;
  transition: background 0.15s, color 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-dots:hover {
  background: #EDF0F2;
  color: var(--c-text);
}

.action-menu {
  position: absolute;
  right: 4px;
  top: calc(100% + 4px);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  z-index: 200;
  min-width: 148px;
  box-shadow: 0 8px 24px rgba(30, 61, 88, .12);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: none;
  color: var(--c-muted);
  cursor: pointer;
  font-size: 0.845rem;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
}

.menu-item:hover {
  background: #FAFAF7;
  color: var(--c-text);
}

.menu-item.danger:hover {
  background: rgba(239, 68, 68, .06);
  color: #dc2626;
}

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
}

.no-data {
  text-align: center;
  color: var(--c-faint);
  padding: 48px !important;
  font-size: 0.875rem;
}

/* ── Modais ──────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, .45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  backdrop-filter: blur(3px);
}

.modal-box {
  background: var(--c-surface);
  border-radius: 16px;
  padding: 28px;
  max-width: 560px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(30, 61, 88, .18);
}

.modal-sm {
  max-width: 400px;
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-head h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
  letter-spacing: -0.2px;
}

.btn-close-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-faint);
  padding: 6px;
  border-radius: 7px;
  transition: color 0.15s, background 0.15s;
  display: flex;
}

.btn-close-modal:hover {
  color: #dc2626;
  background: rgba(239, 68, 68, .06);
}

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
  color: var(--c-muted);
}

.form-group input,
.form-group select {
  background: #FAFAF7;
  border: 1px solid var(--c-border);
  border-radius: 9px;
  padding: 10px 13px;
  color: var(--c-text);
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--c-accent);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(67, 176, 241, .1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.btn-save {
  background: var(--c-accent);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(67, 176, 241, .28);
}

.btn-save:hover {
  background: #2E9BDF;
  box-shadow: 0 6px 18px rgba(67, 176, 241, .38);
}

.btn-cancel-modal {
  background: #EDF0F2;
  color: var(--c-muted);
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  transition: background 0.2s;
}

.btn-cancel-modal:hover {
  background: #DDE2E8;
}

.file-input {
  font-size: 0.82rem;
  color: var(--c-muted);
  cursor: pointer;
}

.foto-preview {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--c-border);
  margin-top: 4px;
}

.foto-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Responsivo ──────────────────────────────────── */
@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .epis-main {
    padding: 16px;
    gap: 14px;
  }

  .top-header {
    padding: 12px 16px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .hamburger {
    display: flex;
  }

  .app-layout {
    display: block;
  }

  .main-wrapper {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .header-right {
    gap: 6px;
  }

  .btn-primary,
  .btn-secondary,
  .btn-danger-soft {
    padding: 8px 12px;
    font-size: 0.8rem;
  }
}
</style>

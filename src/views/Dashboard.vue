<template>
  <div class="app-layout">
    <component :is="isAdmin ? SidebarACE : SidebarAluno" ref="sidebarRef" />

    <div class="main-wrapper">
      <header class="top-header">
        <div class="header-left">
          <!-- Hambúrguer — só mobile -->
          <button class="hamburger" @click="openMobileSidebar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
          <h1 class="page-title">Dashboard</h1>
        </div>
        <div class="header-right">
          <button v-if="isAdmin" class="btn-exportar" @click="exportarPDF">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1V11M8 11L5 8M8 11L11 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M2 12V14H14V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            Exportar
          </button>
        </div>
      </header>

      <main class="dashboard-main">

        <!-- Stat Cards -->
        <div class="stats-grid">
          <template v-if="isAdmin">
            <div class="stat-card">
              <div class="stat-header">
                <span class="stat-label">Total de EPIs</span>
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
                <span class="stat-label">Disponível</span>
                <span class="stat-icon-wrap avail">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                </span>
              </div>
              <div class="stat-number">{{ stats.disponivel }}</div>
              <div class="stat-sub">{{ stats.percentualDisponibilidade }}% do total</div>
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
              <div class="stat-sub">{{ stats.emUso }} entregas ativas</div>
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
              <div class="stat-number">{{ alertas.length }}</div>
              <div class="stat-sub warn">Requer atenção</div>
            </div>
          </template>

          <template v-else>
            <div class="stat-card">
              <div class="stat-header">
                <span class="stat-label">EPIs Disponíveis</span>
                <span class="stat-icon-wrap avail">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                </span>
              </div>
              <div class="stat-number">{{ stats.disponivel }}</div>
              <div class="stat-sub">Disponíveis para solicitação</div>
            </div>
            <div class="stat-card">
              <div class="stat-header">
                <span class="stat-label">Meus EPIs</span>
                <span class="stat-icon-wrap inuse">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v3l2 2" />
                  </svg>
                </span>
              </div>
              <div class="stat-number">{{ meusEPIs }}</div>
              <div class="stat-sub">EPIs em uso</div>
            </div>
            <div class="stat-card">
              <div class="stat-header">
                <span class="stat-label">Solicitações</span>
                <span class="stat-icon-wrap total">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="12" height="12" rx="2" />
                    <path d="M5 8h6M5 5h6M5 11h4" />
                  </svg>
                </span>
              </div>
              <div class="stat-number">{{ minhasSolicitacoes }}</div>
              <div class="stat-sub">Total de solicitações</div>
            </div>
          </template>
        </div>

        <!-- Middle grid -->
        <div class="mid-grid">
          <div class="card card-estoque">
            <h2 class="card-title">Estoque por Tipo</h2>
            <div class="estoque-list">
              <div v-for="item in estoque" :key="item.tipo" class="estoque-row">
                <span class="estoque-label">{{ item.tipo || 'Sem tipo' }}</span>
                <div class="bar-track">
                  <div class="bar-fill" :style="{ width: getEstoquePercent(item.quantidade) + '%' }"></div>
                </div>
                <span class="estoque-val">{{ item.quantidade }}</span>
              </div>
            </div>
          </div>

          <div class="card card-circle">
            <h2 class="card-title">Disponibilidade</h2>
            <div class="circle-wrap">
              <svg class="donut" width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="60" class="donut-bg" />
                <circle cx="75" cy="75" r="60" class="donut-fill"
                  :style="{ 'stroke-dasharray': `${stats.percentualDisponibilidade * 3.77} 377` }" />
              </svg>
              <div class="circle-inner">
                <span class="circle-pct">{{ stats.percentualDisponibilidade }}%</span>
                <span class="circle-lbl">Disponíveis</span>
              </div>
            </div>
            <p class="circle-obs">Estoque suficiente. Reavaliar em breve.</p>
          </div>

          <div class="card card-atividade">
            <h2 class="card-title">Atividade</h2>
            <div class="atividade-list">
              <div v-for="(a, idx) in atividades" :key="idx" class="ativ-item">
                <span class="ativ-dot"
                  :class="a.type === 'entrega' ? 'green' : a.type === 'devolucao' ? 'red' : 'yellow'"></span>
                <span class="ativ-text">{{ a.text }}</span>
                <span class="ativ-time">{{ a.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Entregas Recentes - só admin -->
        <div v-if="isAdmin" class="card card-table">
          <h2 class="card-title">Entregas Recentes</h2>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>EPI</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entrega in entregasRecentes" :key="entrega.id_entrega_aluno">
                  <td>{{ entrega.aluno.nome }} {{ entrega.aluno.sobrenome }}</td>
                  <td>{{ entrega.epis.nome }}</td>
                  <td>{{ formatDate(entrega.data_entrega) }}</td>
                  <td><span class="badge badge--ativo">Ativo</span></td>
                </tr>
                <tr v-if="!entregasRecentes.length">
                  <td colspan="4" class="no-data">Nenhuma entrega recente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Devoluções Pendentes - só admin -->
        <div v-if="isAdmin" class="card card-table">
          <h2 class="card-title">Devoluções Pendentes</h2>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>EPI</th>
                  <th>Patrimônio</th>
                  <th>Data Entrega</th>
                  <th>Tipo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="func in funcionariosEPIs" :key="`func-${func.id_entrega_func}`">
                  <td>{{ func.funcionario.nome }} {{ func.funcionario.sobrenome }}</td>
                  <td>{{ func.funcionario.email }}</td>
                  <td>{{ func.epis.nome }}</td>
                  <td>{{ func.epis.codigo_patrimonio || '---' }}</td>
                  <td>{{ formatDate(func.data_entrega) }}</td>
                  <td><span class="badge badge--tipo">Funcionário</span></td>
                  <td><span class="badge badge--urgente">Urgente</span></td>
                </tr>
                <tr v-for="aluno in alunosEPIs" :key="`aluno-${aluno.id_entrega_aluno}`">
                  <td>{{ aluno.aluno.nome }} {{ aluno.aluno.sobrenome }}</td>
                  <td>{{ aluno.aluno.email }}</td>
                  <td>{{ aluno.epis.nome }}</td>
                  <td>{{ aluno.epis.codigo_patrimonio || '---' }}</td>
                  <td>{{ formatDate(aluno.data_entrega) }}</td>
                  <td><span class="badge badge--tipo">Aluno</span></td>
                  <td><span class="badge badge--urgente">Urgente</span></td>
                </tr>
                <tr v-if="!funcionariosEPIs.length && !alunosEPIs.length">
                  <td colspan="7" class="no-data">Nenhuma devolução pendente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Mensagem para aluno -->
        <div v-if="!isAdmin" class="card card-aluno-msg">
          <h2 class="card-title">Seus EPIs</h2>
          <p class="aluno-msg">Acesse <strong>Minhas Solicitações</strong> para ver seus EPIs solicitados e o status de
            cada um.</p>
          <router-link to="/minhas-solicitacoes" class="btn-ver-solicitacoes">Ver minhas solicitações</router-link>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarACE from '../components/SidebarACE.vue'
import SidebarAluno from '../components/SidebarAluno.vue'
import { ref, watch, onMounted } from 'vue'

const sidebarRef = ref(null)
const openMobileSidebar = () => {
  if (sidebarRef.value) sidebarRef.value.mobileOpen = true
}
import { createClient } from '@supabase/supabase-js'
import { useSupabase } from '../composables/useSupabase'
import { jsPDF } from 'jspdf'

const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const {
  getDashboardStats,
  getEntregasRecentes,
  getEstoquePerTipo,
  alertasEPIs,
  getFuncionarioComEPIs,
  getAlunoComEPIsAtrasados,
} = useSupabase()

const isAdmin = ref(false)
const stats = ref({ total: 0, disponivel: 0, emUso: 0, percentualDisponibilidade: 0 })
const entregasRecentes = ref([])
const estoque = ref([])
const alertas = ref([])
const funcionariosEPIs = ref([])
const alunosEPIs = ref([])
const meusEPIs = ref(0)
const minhasSolicitacoes = ref(0)

const formatDate = (date) => {
  if (!date) return '---'
  return new Date(date).toLocaleDateString('pt-BR')
}

const getEstoquePercent = (quantidade) => {
  if (!estoque.value.length) return 0
  const max = Math.max(...estoque.value.map(e => e.quantidade || 0))
  if (max === 0) return 0
  return (quantidade / max) * 100
}

onMounted(async () => {
  const { data: { session } } = await supabaseClient.auth.getSession()
  const tipo = session?.user?.user_metadata?.tipo
  isAdmin.value = tipo === 'funcionario' || tipo === 'admin'

  try {
    stats.value = await getDashboardStats()
    estoque.value = await getEstoquePerTipo()
    alertas.value = await alertasEPIs()

    if (isAdmin.value) {
      entregasRecentes.value = await getEntregasRecentes(5)
      funcionariosEPIs.value = await getFuncionarioComEPIs()
      alunosEPIs.value = await getAlunoComEPIsAtrasados()
    } else {
      // Busca dados do aluno logado
      const { data: alunoData } = await supabaseClient
        .from('aluno')
        .select('idaluno')
        .eq('auth_id', session.user.id)
        .single()

      if (alunoData?.idaluno) {
        const { data: epis } = await supabaseClient
          .from('aluno_has_epis')
          .select('id_entrega_aluno')
          .eq('aluno_id', alunoData.idaluno)
        meusEPIs.value = epis?.length || 0

        const { data: sols } = await supabaseClient
          .from('solicitacoes')
          .select('idsolicitacoes')
          .eq('aluno_id', alunoData.idaluno)
        minhasSolicitacoes.value = sols?.length || 0
      }
    }
  } catch (e) {
    console.error('Erro ao carregar dashboard:', e)
  }
})

// Atividades (renderiza eventos recentes: entregas, devoluções pendentes)
const atividades = ref([])

const buildAtividades = () => {
  const items = []

  // Prioriza entregas recentes
  if (entregasRecentes.value && entregasRecentes.value.length) {
    entregasRecentes.value.slice(0, 3).forEach(e => {
      items.push({
        type: 'entrega',
        text: `Entrega: ${e.epis?.nome} — ${e.aluno?.nome} ${e.aluno?.sobrenome}`,
        time: formatDate(e.data_entrega),
      })
    })
  }

  // Checa devoluções pendentes a partir de alunosEPIs/funcionariosEPIs (se admin)
  if (isAdmin.value) {
    const pendentes = [];
    (funcionariosEPIs.value || []).forEach(f => {
      if (!f.data_devolucao) pendentes.push({ type: 'devolucao', text: `Devolução pendente: ${f.epis?.nome} — ${f.funcionario?.nome}`, time: formatDate(f.data_entrega) })
    });
    (alunosEPIs.value || []).forEach(a => {
      if (!a.data_devolucao) pendentes.push({ type: 'devolucao', text: `Devolução pendente: ${a.epis?.nome} — ${a.aluno?.nome}`, time: formatDate(a.data_entrega) })
    });
    // adiciona até completar 3 itens
    pendentes.slice(0, Math.max(0, 3 - items.length)).forEach(p => items.push(p))
  }

  // Fallback: mensagens estáticas se nada
  if (!items.length) {
    items.push({ type: 'entrega', text: 'Entrega realizada', time: 'Há pouco' })
    items.push({ type: 'devolucao', text: 'Devolução pendente', time: '4 dias' })
    items.push({ type: 'inventario', text: 'Inventário atualizado', time: 'Há 8 horas' })
  }

  atividades.value = items.slice(0, 3)
}

// Reconstrói atividades quando as fontes mudam
watch([entregasRecentes, funcionariosEPIs, alunosEPIs], buildAtividades, { immediate: true })

const exportarPDF = () => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let y = 20

  doc.setFillColor(30, 61, 88)
  doc.rect(0, 0, pageWidth, 30, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont(undefined, 'bold')
  doc.text('Controle Total de EPIs', 14, 20)
  doc.setFontSize(9)
  doc.setFont(undefined, 'normal')
  doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 27)

  y = 45
  doc.setTextColor(30, 61, 88)
  doc.setFontSize(13)
  doc.setFont(undefined, 'bold')
  doc.text('Estatísticas', 14, y)
  y += 8

  const statData = [
    ['Total de EPIs', stats.value.total],
    ['Disponível', stats.value.disponivel],
    ['Em Uso', stats.value.emUso],
    ['Disponibilidade', `${stats.value.percentualDisponibilidade}%`]
  ]

  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')
  statData.forEach(([label, val], i) => {
    const x = 14 + (i % 2) * 90
    const yy = y + Math.floor(i / 2) * 14
    doc.setDrawColor(67, 176, 241)
    doc.roundedRect(x, yy - 6, 82, 12, 2, 2)
    doc.setTextColor(30, 61, 88)
    doc.setFont(undefined, 'bold')
    doc.text(String(val), x + 4, yy + 2)
    doc.setFont(undefined, 'normal')
    doc.setTextColor(90, 113, 135)
    doc.setFontSize(8)
    doc.text(label, x + 4, yy + 7)
    doc.setFontSize(10)
  })

  y += 34

  if (estoque.value.length) {
    doc.setTextColor(30, 61, 88)
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Estoque por Tipo', 14, y)
    y += 8
    doc.setFontSize(9)
    doc.setFont(undefined, 'normal')
    estoque.value.forEach(item => {
      doc.setTextColor(30, 61, 88)
      doc.text(`${item.tipo || 'Sem tipo'}: ${item.quantidade} unidades`, 14, y)
      y += 6
      if (y > pageHeight - 30) { doc.addPage(); y = 20 }
    })
    y += 4
  }

  if (entregasRecentes.value.length) {
    doc.setTextColor(30, 61, 88)
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Entregas Recentes', 14, y)
    y += 8
    doc.setFontSize(9)
    doc.setFont(undefined, 'normal')
    entregasRecentes.value.slice(0, 5).forEach(e => {
      doc.text(`• ${e.aluno.nome} ${e.aluno.sobrenome} — ${e.epis.nome} (${formatDate(e.data_entrega)})`, 14, y)
      y += 5
      if (y > pageHeight - 30) { doc.addPage(); y = 20 }
    })
  }

  doc.save(`DashEPI_${new Date().toISOString().split('T')[0]}.pdf`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

/* ── Tokens da marca ─────────────────────────────── */
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
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
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
}

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--c-text);
  letter-spacing: -0.3px;
  margin: 0;
}

.btn-exportar {
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--c-accent);
  color: #fff;
  border: none;
  padding: 9px 22px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  font-family: inherit;
  box-shadow: 0 4px 14px rgba(67, 176, 241, 0.3);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
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
  transition: background 0.15s, border-color 0.15s;
  flex-shrink: 0;
}

.hamburger:hover {
  background: #EDF0F2;
  border-color: #C8CDD4;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  /* No mobile o main-wrapper ocupa 100% já que a sidebar sai do fluxo */
  .app-layout {
    display: block;
  }

  .main-wrapper {
    width: 100%;
  }
}


/* ── Main ────────────────────────────────────────── */
.dashboard-main {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* ── Stat cards ──────────────────────────────────── */
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
  box-shadow: 0 2px 8px rgba(30, 61, 88, 0.04);
  transition: box-shadow 0.2s, transform 0.2s;
}

.stat-card:hover {
  box-shadow: 0 8px 20px rgba(30, 61, 88, 0.08);
  transform: translateY(-2px);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.stat-label {
  font-size: 0.7rem;
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
  background: rgba(67, 176, 241, 0.12);
  color: var(--c-accent);
}

.stat-icon-wrap.avail {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.stat-icon-wrap.inuse {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.stat-icon-wrap.alert {
  background: rgba(239, 68, 68, 0.08);
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

/* ── Mid grid ────────────────────────────────────── */
.mid-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.card {
  background: var(--c-surface);
  border-radius: 14px;
  padding: 22px;
  border: 1px solid var(--c-border);
  box-shadow: 0 2px 8px rgba(30, 61, 88, 0.04);
}

.card-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 18px 0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

/* Estoque */
.estoque-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.estoque-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.estoque-label {
  font-size: 0.82rem;
  color: var(--c-muted);
  min-width: 90px;
  font-weight: 500;
}

.bar-track {
  flex: 1;
  height: 8px;
  background: #EDF0F2;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #43B0F1, #7CCBF7);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.estoque-val {
  font-size: 0.82rem;
  color: var(--c-faint);
  font-weight: 600;
  min-width: 30px;
  text-align: right;
}

/* Donut */
.card-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle-wrap {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 12px;
}

.donut {
  transform: rotateZ(-90deg);
}

.donut-bg {
  fill: none;
  stroke: #EDF0F2;
  stroke-width: 12;
}

.donut-fill {
  fill: none;
  stroke: var(--c-accent);
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

.circle-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.circle-pct {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--c-text);
  letter-spacing: -0.5px;
}

.circle-lbl {
  display: block;
  font-size: 0.75rem;
  color: var(--c-faint);
  margin-top: 2px;
}

.circle-obs {
  font-size: 0.78rem;
  color: var(--c-faint);
  text-align: center;
  margin: 0;
}

/* Atividade */
.atividade-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ativ-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 13px;
  background: #FAFAF7;
  border-radius: 10px;
  border: 1px solid var(--c-border);
}

.ativ-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ativ-dot.green {
  background: #22c55e;
}

.ativ-dot.red {
  background: #ef4444;
}

.ativ-dot.yellow {
  background: #f59e0b;
}

.ativ-text {
  flex: 1;
  font-size: 0.82rem;
  color: var(--c-muted);
}

.ativ-time {
  font-size: 0.75rem;
  color: var(--c-faint);
}

/* ── Tabelas ─────────────────────────────────────── */
.card-table {
  overflow: hidden;
}

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
  padding: 10px 14px;
  text-align: left;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--c-faint);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  border-bottom: 1px solid var(--c-border);
}

.data-table td {
  padding: 13px 14px;
  color: var(--c-muted);
  border-bottom: 1px solid #EDF0F2;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.data-table tbody tr:hover td {
  background: #FAFAF7;
}

/* Badges */
.badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.badge--ativo {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.badge--urgente {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.badge--tipo {
  background: rgba(67, 176, 241, 0.1);
  color: #2E86C1;
  font-weight: 600;
}

.no-data {
  text-align: center;
  color: var(--c-faint);
  padding: 32px !important;
  font-size: 0.875rem;
}

/* ── Card aluno ──────────────────────────────────── */
.card-aluno-msg {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.aluno-msg {
  font-size: 0.9rem;
  color: var(--c-muted);
  line-height: 1.6;
}

.btn-ver-solicitacoes {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  background: var(--c-accent);
  color: #fff;
  padding: 10px 24px;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  box-shadow: 0 4px 14px rgba(67, 176, 241, 0.3);
}

.btn-ver-solicitacoes:hover {
  background: #2E9BDF;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(67, 176, 241, 0.4);
}

/* ── Responsivo ──────────────────────────────────── */

/* Impede scroll horizontal em qualquer situação */
.app-layout {
  overflow-x: hidden;
}

.main-wrapper {
  overflow-x: hidden;
  min-width: 0;
}

.dashboard-main {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}

/* Tabelas: scroll interno, nunca empurram o layout */
.table-wrap {
  overflow-x: auto;
  width: 100%;
}

/* Grid quebra em 2 colunas quando o espaço aperta */
@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .mid-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Abaixo de 900px (sidebar + conteúdo ficam apertados) */
@media (max-width: 900px) {
  .dashboard-main {
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

  .mid-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-number {
    font-size: 1.75rem;
  }
}

/* Telas pequenas — tudo em coluna única */
@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .top-header {
    padding: 10px 12px;
  }

  .page-title {
    font-size: 1rem;
  }

  .btn-exportar {
    padding: 8px 14px;
    font-size: 0.8rem;
  }

  .dashboard-main {
    padding: 12px;
  }
}
</style>

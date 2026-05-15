<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <SidebarACE />

    <!-- Main Content -->
    <div class="main-wrapper">
      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">Dashboard</h1>
        </div>
        <div class="header-right">
          <button class="btn-exportar" @click="exportarPDF">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1V11M8 11L5 8M8 11L11 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12V14H14V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Exportar
          </button>
        </div>
      </header>

      <main class="dashboard-main">
        <!-- Stat Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">TOTAL DE EPIs</span>
              <span class="stat-icon-wrap total">📦</span>
            </div>
            <div class="stat-number">{{ stats.total }}</div>
            <div class="stat-sub">✓ 10 em até esta semana</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">DISPONÍVEL</span>
              <span class="stat-icon-wrap avail">✓</span>
            </div>
            <div class="stat-number">{{ stats.disponivel }}</div>
            <div class="stat-sub">{{ stats.percentualDisponibilidade }}% do total</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">EM USO</span>
              <span class="stat-icon-wrap inuse">⚙️</span>
            </div>
            <div class="stat-number">{{ stats.emUso }}</div>
            <div class="stat-sub">{{ stats.emUso }} entregas ativas</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-label">VENCIDOS EM 30 DIAS</span>
              <span class="stat-icon-wrap alert">⚠️</span>
            </div>
            <div class="stat-number">{{ alertas.length }}</div>
            <div class="stat-sub warn">⚠️ Ação necessária</div>
          </div>
        </div>

        <!-- Middle grid: chart + disponibilidade + atividade -->
        <div class="mid-grid">
          <!-- Estoque por tipo -->
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

          <!-- Disponibilidade circular -->
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

          <!-- Atividade -->
          <div class="card card-atividade">
            <h2 class="card-title">Atividade</h2>
            <div class="atividade-list">
              <div class="ativ-item">
                <span class="ativ-dot green"></span>
                <span class="ativ-text">Entrega realizada</span>
                <span class="ativ-time">Há 2 horas</span>
              </div>
              <div class="ativ-item">
                <span class="ativ-dot red"></span>
                <span class="ativ-text">Devolução pendente</span>
                <span class="ativ-time">4 dias</span>
              </div>
              <div class="ativ-item">
                <span class="ativ-dot yellow"></span>
                <span class="ativ-text">Inventário atualizado</span>
                <span class="ativ-time">Há 8 horas</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Entregas Recentes -->
        <div class="card card-table">
          <h2 class="card-title">Entregas Recentes</h2>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>EPI</th>
                  <th>DATA</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entrega in entregasRecentes" :key="entrega.id_entrega_aluno">
                  <td>{{ entrega.aluno.nome }} {{ entrega.aluno.sobrenome }}</td>
                  <td>{{ entrega.epis.nome }}</td>
                  <td>{{ formatDate(entrega.data_entrega) }}</td>
                  <td><span class="badge-ativo">ATIVO</span></td>
                </tr>
                <tr v-if="!entregasRecentes.length">
                  <td colspan="4" class="no-data">Nenhuma entrega recente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Devoluções Pendentes -->
        <div class="card card-table">
          <h2 class="card-title">Devoluções Pendentes</h2>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>EMAIL</th>
                  <th>EPI</th>
                  <th>PATRIMÔNIO</th>
                  <th>DATA ENTREGA</th>
                  <th>TIPO</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="func in funcionariosEPIs" :key="`func-${func.id_entrega_func}`">
                  <td>{{ func.funcionario.nome }} {{ func.funcionario.sobrenome }}</td>
                  <td>{{ func.funcionario.email }}</td>
                  <td>{{ func.epis.nome }}</td>
                  <td>{{ func.epis.codigo_patrimonio || '---' }}</td>
                  <td>{{ formatDate(func.data_entrega) }}</td>
                  <td><span class="badge-tipo">👨‍💼 Funcionário</span></td>
                  <td><span class="badge-urgente">⚠️ URGENTE</span></td>
                </tr>
                <tr v-for="aluno in alunosEPIs" :key="`aluno-${aluno.id_entrega_aluno}`">
                  <td>{{ aluno.aluno.nome }} {{ aluno.aluno.sobrenome }}</td>
                  <td>{{ aluno.aluno.email }}</td>
                  <td>{{ aluno.epis.nome }}</td>
                  <td>{{ aluno.epis.codigo_patrimonio || '---' }}</td>
                  <td>{{ formatDate(aluno.data_entrega) }}</td>
                  <td><span class="badge-tipo">👨‍🎓 Aluno</span></td>
                  <td><span class="badge-urgente">⚠️ URGENTE</span></td>
                </tr>
                <tr v-if="!funcionariosEPIs.length && !alunosEPIs.length">
                  <td colspan="7" class="no-data">Nenhuma devolução pendente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarACE from '../components/SidebarACE.vue'
import { ref, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { jsPDF } from 'jspdf'

const {
  getDashboardStats,
  getEntregasRecentes,
  getEstoquePerTipo,
  alertasEPIs,
  getFuncionarioComEPIs,
  getAlunoComEPIsAtrasados,
} = useSupabase()

const stats = ref({ total: 0, disponivel: 0, emUso: 0, percentualDisponibilidade: 0 })
const entregasRecentes = ref([])
const estoque = ref([])
const alertas = ref([])
const funcionariosEPIs = ref([])
const alunosEPIs = ref([])

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

const exportarPDF = () => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let y = 20

  doc.setFillColor(37, 99, 235)
  doc.rect(0, 0, pageWidth, 30, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont(undefined, 'bold')
  doc.text('Controle Total de EPIs', 14, 20)
  doc.setFontSize(9)
  doc.setFont(undefined, 'normal')
  doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 27)

  y = 45
  doc.setTextColor(30, 41, 59)
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
    doc.setDrawColor(37, 99, 235)
    doc.roundedRect(x, yy - 6, 82, 12, 2, 2)
    doc.setTextColor(30, 41, 59)
    doc.setFont(undefined, 'bold')
    doc.text(String(val), x + 4, yy + 2)
    doc.setFont(undefined, 'normal')
    doc.setTextColor(100, 116, 139)
    doc.setFontSize(8)
    doc.text(label, x + 4, yy + 7)
    doc.setFontSize(10)
  })

  y += 34

  if (estoque.value.length) {
    doc.setTextColor(30, 41, 59)
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Estoque por Tipo', 14, y)
    y += 8
    doc.setFontSize(9)
    doc.setFont(undefined, 'normal')
    estoque.value.forEach(item => {
      doc.setTextColor(30, 41, 59)
      doc.text(`${item.tipo || 'Sem tipo'}: ${item.quantidade} unidades`, 14, y)
      y += 6
      if (y > pageHeight - 30) { doc.addPage(); y = 20 }
    })
    y += 4
  }

  if (entregasRecentes.value.length) {
    doc.setTextColor(30, 41, 59)
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

onMounted(async () => {
  try {
    stats.value = await getDashboardStats()
    entregasRecentes.value = await getEntregasRecentes(5)
    estoque.value = await getEstoquePerTipo()
    alertas.value = await alertasEPIs()
    funcionariosEPIs.value = await getFuncionarioComEPIs()
    alunosEPIs.value = await getAlunoComEPIsAtrasados()
  } catch (e) {
    console.error('Erro ao carregar dashboard:', e)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }

.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9;
  font-family: 'IBM Plex Sans', sans-serif;
}

/* Main wrapper */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Top Header */
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
}

.page-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.btn-exportar {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background 0.2s, transform 0.15s;
  font-family: inherit;
}

.btn-exportar:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

/* Main content area */
.dashboard-main {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1400px;
  width: 100%;
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
  font-size: 0.7rem;
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
.stat-icon-wrap.total { background-color: #eff6ff; }
.stat-icon-wrap.avail { background-color: #f0fdf4; }
.stat-icon-wrap.inuse { background-color: #fffbeb; }
.stat-icon-wrap.alert { background-color: #fef2f2; }

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 6px;
}

.stat-sub {
  font-size: 0.78rem;
  color: #64748b;
}

.stat-sub.warn {
  color: #ef4444;
}

/* Middle grid */
.mid-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

/* Cards */
.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e5e9f0;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.4px;
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
  color: #475569;
  min-width: 90px;
  font-weight: 500;
}

.bar-track {
  flex: 1;
  height: 8px;
  background-color: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563EB, #60a5fa);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.estoque-val {
  font-size: 0.82rem;
  color: #94a3b8;
  font-weight: 600;
  min-width: 30px;
  text-align: right;
}

/* Circle */
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
  stroke: #f1f5f9;
  stroke-width: 12;
}

.donut-fill {
  fill: none;
  stroke: #2563EB;
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
  color: #1e293b;
}

.circle-lbl {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 2px;
}

.circle-obs {
  font-size: 0.78rem;
  color: #94a3b8;
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
  padding: 10px 12px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e5e9f0;
}

.ativ-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ativ-dot.green { background-color: #22c55e; }
.ativ-dot.red   { background-color: #ef4444; }
.ativ-dot.yellow { background-color: #f59e0b; }

.ativ-text {
  flex: 1;
  font-size: 0.82rem;
  color: #475569;
}

.ativ-time {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Tables */
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
  background-color: #f8fafc;
}

.data-table th {
  padding: 10px 14px;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e5e9f0;
}

.data-table td {
  padding: 12px 14px;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.data-table tbody tr:hover td {
  background-color: #f8fafc;
}

.badge-ativo {
  display: inline-block;
  background-color: #dcfce7;
  color: #16a34a;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 700;
}

.badge-urgente {
  display: inline-block;
  background-color: #fef2f2;
  color: #ef4444;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 700;
}

.badge-tipo {
  display: inline-block;
  background-color: #f1f5f9;
  color: #64748b;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
}

.no-data {
  text-align: center;
  color: #94a3b8;
  padding: 32px !important;
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .mid-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .dashboard-main { padding: 16px; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .mid-grid { grid-template-columns: 1fr; }
  .top-header { padding: 14px 16px; }
}

@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr; }
}
</style>
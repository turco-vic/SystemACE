<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF6B00,FFB347&height=200&section=header&text=Sistema%20de%20Gestão%20de%20EPIs&fontSize=36&fontColor=ffffff&fontAlignY=38&desc=SENAI%20SC%20Joinville&descAlignY=58&descSize=18" />

<br>

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge)
![Instituição](https://img.shields.io/badge/Instituição-SENAI%20SC%20Joinville-blue?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-MIT-green?style=for-the-badge)

</div>

---

## 📋 Sobre o Projeto

O **Sistema de Gestão de EPIs** é uma solução desenvolvida para modernizar e digitalizar o controle de Equipamentos de Proteção Individual (EPIs) do **SENAI SC Joinville**, substituindo métodos manuais e arcaicos por um sistema seguro, rastreável e eficiente.

> ⚠️ **Problema identificado:** A ausência de um sistema formal de controle de EPIs gera desorganização, riscos à integridade física dos usuários, exposição jurídica e prejuízos financeiros à instituição.

---

## 🚨 Problemas que o Sistema Resolve

| Problema | Impacto | Solução |
|----------|---------|---------|
| Falta de rastreabilidade | Equipamentos perdidos ou extraviados | Registro digital com histórico completo |
| Estoque descontrolado | Reposição ineficiente e custos elevados | Gestão de estoque automatizada |
| Sem controle de uso | Riscos de segurança e acidentes | Solicitação e aprovação digitalizada |
| Ausência de registros | Multas e problemas jurídicos | Conformidade com normas de segurança |
| Processos manuais | Retrabalho e erros humanos | Fluxo digital e automatizado |

---

## 👥 Usuários do Sistema
```
┌─────────────────────────────────────────────────────────┐
│                   SISTEMA DE EPIs                       │
├──────────────┬──────────────────┬───────────────────────┤
│  FUNCIONÁRIO │    PROFESSOR     │        ALUNO          │
├──────────────┼──────────────────┼───────────────────────┤
│ ✅ Cadastrar │ ✅ Usar EPIs     │ ✅ Usar EPIs          │
│ ✅ Listar    │ ✅ Aceitar       │ ✅ Solicitar EPIs     │
│ ✅ Editar    │    solicitações  │                       │
│ ✅ Remover   │                  │                       │
│ ✅ Validar   │                  │                       │
└──────────────┴──────────────────┴───────────────────────┘
```

### 🔐 Detalhamento de Permissões

**👷 Funcionário (Admin)**
- CRUD completo de EPIs (Criar, Ler, Atualizar, Deletar)
- Validação e controle do estoque
- Geração de relatórios
- Gerenciamento de usuários

**👨‍🏫 Professor**
- Visualização e utilização de EPIs disponíveis
- Aprovação/rejeição de solicitações de alunos
- Histórico de uso pessoal

**🧑‍🎓 Aluno**
- Visualização de EPIs disponíveis
- Solicitação de empréstimo de EPIs
- Acompanhamento do status das solicitações

---

## 🛠️ Funcionalidades Planejadas

- [x] Planejamento do sistema
- [x] Levantamento de requisitos
- [x] Modelagem do banco de dados
- [ ] Desenvolvimento do back-end
- [ ] Desenvolvimento do front-end
- [ ] Sistema de autenticação e perfis
- [ ] Controle de estoque em tempo real
- [ ] Histórico de movimentações
- [ ] Relatórios e dashboards
- [ ] Testes e validação
- [ ] Deploy e implantação

---

## 🗂️ Estrutura do Sistema
```
sistema-epis/
├── 📁 backend/
│   ├── 📁 controllers/
│   ├── 📁 models/
│   ├── 📁 routes/
│   └── 📁 middlewares/
├── 📁 frontend/
│   ├── 📁 components/
│   ├── 📁 pages/
│   └── 📁 assets/
├── 📁 database/
│   └── 📄 schema.sql
└── 📄 README.md
```

---

## ⚙️ Tecnologias Utilizadas

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

---

## 📐 Regras de Negócio

1. **Solicitação de EPI:** Alunos solicitam → Professor aprova → Funcionário libera
2. **Devolução:** Prazo definido na solicitação; atrasos são registrados
3. **Estoque mínimo:** Alertas automáticos quando estoque atinge nível crítico
4. **Rastreabilidade:** Toda movimentação é registrada com data, hora e responsável
5. **Acesso por perfil:** Cada tipo de usuário acessa apenas suas funcionalidades

---

## 🔒 Conformidade e Segurança

Este sistema foi projetado em conformidade com:

- **NR-6** — Norma Regulamentadora de Equipamentos de Proteção Individual
- **LGPD** — Lei Geral de Proteção de Dados
- Boas práticas de segurança da informação

---

## 👨‍💻 Equipe

> Desenvolvido por alunos do **SENAI Roberto Mange** como projeto acadêmico.

---

## 📫 Contato

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/turco-vic)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enzo-alves-turcovic-10b7ab201/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:enzoturcovic@gmail.com)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF6B00,FFB347&height=80&section=footer" />

</div>

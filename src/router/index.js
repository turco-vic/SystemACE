import { createRouter, createWebHistory } from "vue-router";
import { createClient } from "@supabase/supabase-js";

import Sobre from "../views/Sobre.vue";
import Login from "../views/Login.vue";
import Cadastro from "../views/Cadastro.vue";
import Dashboard from "../views/Dashboard.vue";
import Estoque from "../views/Estoque.vue";
import home_ from "../views/Home.vue";
import Epis from "../views/Epis.vue";
import GerenciarSolicitacoes from "../views/GerenciarSolicitacoes.vue";
import MinhasSolicitacoes from "../views/MinhasSolicitacoes.vue";
import Alunos from "../views/Alunos.vue";
import CadastroAluno from "../views/CadastroAluno.vue";
import PerfilAluno from "../views/PerfilAluno.vue";
import PerfilFuncionario from "../views/PerfilFuncionario.vue";
import CadastrarFuncionario from "../views/CadastrarFuncionario.vue";
import Contato from "../views/Contato.vue";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const rotasAdmin = [
    "/epis",
    "/CadastroAluno",
    "/CadastroFuncionario",
    "/gerenciar-solicitacoes",
    "/alunos",
    "/PerfilFuncionario",
    "/estoque",
];

const rotasAluno = ["/PerfilAluno", "/minhas-solicitacoes", "/CatalogoEpis"];
const rotasPublicas = ["/", "/login", "/cadastro", "/sobre", "/contato"];

const routes = [
    { path: "/", component: home_ },
    { path: "/sobre", component: Sobre },
    { path: "/contato", component: Contato },
    { path: "/login", component: Login },
    { path: "/cadastro", component: Cadastro },
    { path: "/dashboard", component: Dashboard },
    { path: "/epis", component: Epis },
    { path: "/estoque", component: Estoque },
    { path: "/gerenciar-solicitacoes", component: GerenciarSolicitacoes },
    { path: "/minhas-solicitacoes", component: MinhasSolicitacoes },
    { path: "/alunos", component: Alunos },
    { path: "/CadastroAluno", component: CadastroAluno },
    { path: "/PerfilAluno", component: PerfilAluno },
    { path: "/PerfilFuncionario", component: PerfilFuncionario },
    { path: "/CadastroFuncionario", component: CadastrarFuncionario },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    const {
        data: { session },
    } = await supabaseClient.auth.getSession();

    // Não logado tentando acessar rota protegida
    if (!session && !rotasPublicas.includes(to.path)) {
        return "/login";
    }

    // Logado tentando acessar login/cadastro
    if (session && (to.path === "/login" || to.path === "/cadastro")) {
        return "/dashboard";
    }

    if (session) {
        const tipo = session.user?.user_metadata?.tipo;
        const isAdmin = tipo === "funcionario" || tipo === "admin";

        // Aluno tentando acessar rota de admin
        if (!isAdmin && rotasAdmin.includes(to.path)) {
            return "/PerfilAluno";
        }

        // Admin tentando acessar rota de aluno
        if (isAdmin && rotasAluno.includes(to.path)) {
            return "/dashboard";
        }
    }
});

export default router;

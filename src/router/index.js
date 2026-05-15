import { createRouter, createWebHistory } from 'vue-router'

import Sobre from "../views/Sobre.vue"
import Login from "../views/Login.vue"
import Cadastro from "../views/Cadastro.vue"
import Dashboard from "../views/Dashboard.vue"
import Estoque from "../views/Estoque.vue"
import home_ from "../views/Home.vue"
import Epis from "../views/Epis.vue"

const routes = [

    {
        path: "/sobre",
        component: Sobre
    },
    {
        path: "/epis",
        component: Epis
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/cadastro",
        component: Cadastro
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/estoque",
        component: Estoque
    },

    {
        path: "/",
        component: home_
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

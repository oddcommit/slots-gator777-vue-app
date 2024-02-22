import Vue from 'vue'
import Router from 'vue-router'

import index from './components/index/index.vue'
import callback from './components/callback/callback.vue'
import callback2 from './components/callback/callback2.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: index
    },
    {
        path: '/callback',
        component: callback
    },
    {
        path: '/callback2',
        component: callback2
    },
    // {
    //     path: '/turntable',
    //     component: turntable
    // },
    // {
    //     path: '/signin',
    //     component: login
    // },
    // {
    //     path: '/signup',
    //     component: register
    // },
    // {
    //     path: '/home',
    //     component: home
    // },
    // {
    //     path: '/service',
    //     component: service
    // },
    // {
    //     path: '/forgot',
    //     component: forgot
    // },
    // {
    //     path: '/deposit',
    //     component: deposit
    // },
    // {
    //     path: '/withdraw',
    //     component: withdraw
    // },
    // {
    //     path: '/bind',
    //     component: bind
    // },
    // {
    //     path: '/email',
    //     component: email
    // },
    // {
    //     path: '/emailDetail',
    //     component: emailDetail
    // },
    // {
    //     path: '/activity',
    //     component: activity
    // },
    // {
    //     path: '/activityDetail',
    //     component: activityDetail
    // }
]

export default new Router({
    routes
})
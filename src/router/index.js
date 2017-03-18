import Vue from 'vue'
import Router from 'vue-router'
import Help from '@/components/Help'
import PullDown from '@/components/pull-down/PullDown'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Help',
            component: Help
        },
        {
            path: '/pull-down',
            name: 'PullDown',
            component: PullDown
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

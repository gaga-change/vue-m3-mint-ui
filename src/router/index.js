import Vue from 'vue'
import Router from 'vue-router'
import Help from '@/components/Help'

Vue.use(Router);

let routes = [];

require('./nav.config.json').navList.map((page) => {
    routes.push({
        path: page.path,
        name: page.name,
        component: require(`../components${page.path + '/' + page.name}`)
    })
});

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Help',
            component: Help
        },
        ...routes,
        {
            path: '*',
            redirect: '/'
        }
    ]
})

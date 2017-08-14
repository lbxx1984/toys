
export default [
    {
        path: '/lifecycle', label: 'Life Cycle', component: require('./demos/LifeCycle.vue')
    },
    {
        path: '/bind', label: 'Bind', component: require('./demos/Bind.vue')
    },
    {
        path: '/for', label: 'For', component: require('./demos/For.vue')
    },
    {
        path: '/if', label: 'If', component: require('./demos/If.vue')
    },
    {
        path: '/computed', label: 'Computed', component: require('./demos/Computed.vue')
    },
    {
        path: '/event', label: 'Event', component: require('./demos/Event.vue')
    },
    {
        path: '/bar', label: 'test', component: require('./demos/Test.vue')
    },
    {
        path: "*", redirect: '/lifecycle'
    }
];


export default [
    {
        path: '/lifeCycle', label: 'Life Cycle', component: require('./demos/LifeCycle.vue')
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
        path: '/form', label: 'Form', component: require('./demos/Form.vue')
    },
    {
        path: '/component', label: 'Component', component: require('./demos/Component.vue')
    },
    {
        path: "*", redirect: '/lifeCycle'
    }
];

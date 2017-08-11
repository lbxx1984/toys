
export default [
    {
        path: '/lifecycle', label: '生命周期', component: require('./demos/LifeCycle.vue')
    },
    {
        path: '/bind', label: '数据绑定', component: require('./demos/Bind.vue')
    },
    {
        path: '/for', label: '循环', component: require('./demos/For.vue')
    },
    {
        path: '/if', label: '条件', component: require('./demos/If.vue')
    },
    {
        path: '/computed', label: '计算属性', component: require('./demos/Computed.vue')
    },
    {
        path: '/bar', label: 'test', component: require('./demos/Test.vue')
    },
    {
        path: "*", redirect: '/lifecycle'
    }
];

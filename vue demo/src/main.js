
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routingConfig';
import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({routes});

const appProps = {
    props: {
        modules: routes.map(item => {
            let {path, label} = item;
            return {path, label}; 
        }) 
    }
};

new Vue({
    el: '#main',
    router,
    render: h => h(App, appProps)
});

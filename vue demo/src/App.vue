<template>
    <div class="app">
        <div class="menu-bar">
            <h2>VUE DEMO</h2>
            <template v-for="(item, index) in modules">
                <router-link :to="item.path" :key="index">{{index + 1 + '.' + item.label}}</router-link>
            </template>
        </div>
        <div class="main-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['modules'],
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style lang="less">
    .menu-bar {
        border-right: 1px solid;
        width: 200px;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        a {
            padding: 0 10px;
            display: block;
            line-height: 40px;
            text-decoration: none;
            color: #000;
        }
        h2 {
            text-align: center;
        }
        .router-link-active {
            background-color: rgba(0, 0, 0, 0.3);
            color: #FFF;
        }
    }
    .main-container {
        margin-left: 200px;
    }
</style>

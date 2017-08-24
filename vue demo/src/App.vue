<template>
    <div class="app">
        <div class="menu-bar">
            <h2>
                <img src="https://cn.vuejs.org/images/logo.png" style="width:30px;"/>
                VUE DEMO
            </h2>
            <hr/>
            <template v-for="(item, index) in modules">
                <router-link :to="item.path" :key="index" v-if="item.path !== '*'">{{index + 1 + '.' + item.label}}</router-link>
            </template>
        </div>
        <textarea disabled class="code-container">{{filename + '\n=======================================\n' + code}}</textarea>
        <div class="main-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import codeMap from './codeMap';
    export default {
        props: ['modules'],
        data () {
            return {
                codeMap: codeMap
            }
        },
        computed: {
            filename() {
                let path = this.$route.path;
                if (path.indexOf('/') !== 0) return '';
                return path.replace('/', '').replace(/\b(\w)|\s(\w)/g, m => m.toUpperCase()) + '.vue';
            },
            code() {
                return this.codeMap[this.filename] || '';
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
            img {
                position: relative;
                top: 5px;
            }
            text-align: center;
        }
        .router-link-active {
            background-color: #EBEBE4;
        }
    }
    .code-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 800px;
        border-left: 1px solid;
        background-color: #EBEBE4;
    }
    .main-container {
        margin-left: 200px;
        margin-right: 800px;
    }
</style>

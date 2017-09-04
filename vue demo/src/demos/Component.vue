<template>
    <div class="container">
        <h2>component</h2>
        <hr/>
        <local-component
            :parentMessage="msg"
            staticMessage="message never changed"
            :staticNumber="1"
            @click.native="clickChild"
        ></local-component>
        <hr/>
        <file-component
            :parentMessage="msg"
            @childCallback="childCallback"
            @click.native="clickChild"
            v-model="modelMsg"
        ></file-component>
        <hr/>
        {{modelMsg}}
        <hr/>
        <div>{{clkmsg}}</div>
        <button @click="changeMessage">Change Father Component's Message</button>
    </div>
</template>


<script>

    import FileComponent from '../components/FileComponent.vue';

    const LocalComponent = {
        template: [
            '<div style="background-color:#EBEBE4;margin:10px;">',
            '    <h4>local component</h4>',
            '    Local Component Message: {{msg}}<br/>',
            '    Father Bind Message: {{parentMessage}}<br/>',
            '    Father Static Message: {{staticMessage}}<br/>',
            '    Father Static Number + 1: {{staticNumber + 1}}<br/>',
            '    <button v-on:click="changeMessage">Change Local Component\'s Message</button>',
            '</div>'
        ].join('\n'),
        props: ['parentMessage', 'staticMessage', 'staticNumber'],
        data() {
            return {
                msg: 'it is local component!'
            }
        },
        methods: {
            changeMessage() {
                this.msg = 'it is local component, update time ' + (+new Date());
            }
        }
    };

    export default {
        components: {
            'local-component': LocalComponent,
            'file-component': FileComponent
        },
        data() {
            return {
                msg: 'it is father component!',
                modelMsg: 'hello model',
                clkmsg: ''
            }
        },
        methods: {
            changeMessage() {
                this.msg = 'it is father component, update time ' + (+new Date());
            },
            childCallback(timer) {
                this.msg = 'it is father component, update time ' + timer;
            },
            clickChild(e) {
                this.clkmsg = 'you have clicked child component at (' + e.layerX + ', ' + e.layerY + ')';
            }
        }
    }

</script>


<style lang="less">

</style>

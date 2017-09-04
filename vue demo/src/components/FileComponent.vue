<template>
    <div class="file-component-container">
        <h4>File Component</h4>
        <div>Local Component Message:{{msg}}</div>
        <div>Father Bind Message:{{parentMessage}}</div>
        <button @click="changeMessage">change both messages</button>
        <h5>v-model example</h5>
        {{customValue}} <button @click="customChangeHandler">emit change for v-model</button>
    </div>
</template>

<script>

    export default {
        props: ['parentMessage', 'customValue'],
        model: {
            prop: 'customValue',
            event: 'customChange'
        },
        data() {
            return {
                msg: 'it is single file component!'
            }
        },
        methods: {
            changeMessage() {
                const timer = +new Date();
                this.msg = 'it is single file component, update time ' + timer;
                this.$emit('childCallback', timer);
            },
            customChangeHandler() {
                this.$emit('customChange', (this.customValue + '').split(',')[0] + ',' + (+new Date()));
            }
        }
    }


</script>

<style lang="less">
    .file-component-container {
        background-color: #EBEBE4;
        margin: 10px;
    }
</style>

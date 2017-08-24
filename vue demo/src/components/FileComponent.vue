<template>
    <div class="file-component-container">
        <h4>File Component</h4>
        <div>Local Component Message:{{msg}}</div>
        <div>Father Bind Message:{{parentMessage}}</div>
        <button @click="changeMessage">change both messages</button>
    </div>
</template>

<script>

    export default {
        props: ['parentMessage'],
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

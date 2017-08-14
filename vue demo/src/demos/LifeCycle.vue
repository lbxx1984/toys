<template>
    <div class="container">
        <h2>Life Cycle</h2>
        <hr/>
        <div v-for="line in msg">{{line}}</div>
        <button @click="addCount">{{'count: ' + count}}</button>
        <h6>See more life cycle callback actions in console.</h6>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: [],
                count: 0
            }
        },
        methods: {
            addCount() {
                this.count++;
            }
        },
        beforeCreate() {
            console.log('beforeCreate: ' + new Date().getTime());
        },
        created() {
            this.msg.push('created: ' + new Date().getTime());
        },
        beforeMount() {
            this.msg.push('beforeMount: ' + new Date().getTime());
        },
        mounted() {
            this.msg.push('mounted: ' + new Date().getTime());
        },
        beforeUpdate() {
            console.log('beforeUpdate: ' + new Date().getTime());
        },
        updated() {
            console.log('updated: ' + new Date().getTime());
        },
        beforeDestroy() {
            console.log('beforeDestroy: ' + new Date().getTime());
        },
        destroyed() {
            console.log('destroyed: ' + new Date().getTime());
        }
    }
</script>

<style lang="less">

</style>

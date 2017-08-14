<template>
    <div class="container">
        <h2>Event</h2>
        <hr/>
        <h6>count: {{count}}</h6>
        <button v-on:click="count++">Inline JavaScript</button><br/>
        <button @click="add">Event Handler</button><br/>
        <button @click="add(5, $event)">Inline Event Handler<br/>this button will pass a custom param to event handler.</button><br/>
        <button @click.ctrl="add(100)">Modifer Key<br/>this button works only when you click it while 'ctrl' pressing down.</button><br/>
        <button @click.once="add(10)">Event Modifier<br/>this button works <b style="color:red;">only once</b>.</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        methods: {
            add(n) {
                this.count += isNaN(n) ? 1 : n;
            }
        }
    }
</script>

<style lang="less">

</style>

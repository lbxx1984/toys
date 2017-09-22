<template>
    <div class="border-container">
        <h2>v-if</h2>
        <hr/>
        <h5 v-if="num > 0.6">{{num}} > 0.6</h5>
        <h5 v-else-if="num > 0.3">0.6 => {{num}} > 0.3</h5>
        <h5 v-else>0.3 => {{num}}</h5>
        <button @click="random">random</button>
        <h5>with out v-if</h5>
        <ul>
            <li v-for="(item, index) in arr">{{index + ': ' + item}}</li>
        </ul>
        <h5>v-if="(index + 1) % 3 !== 0"</h5>
        <ul>
            <li v-for="(item, index) in arr" v-if="(index + 1) % 3 !== 0">{{index}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num: Math.random().toFixed(1),
                arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        methods: {
            random() {
                this.num = Math.random().toFixed(1);
            }
        }
    }
</script>

<style>
    .border-container {
        border: 1px solid;
    }
</style>

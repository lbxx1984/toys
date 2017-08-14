<template>
    <div class="container">
        <h2>computed</h2>
        <hr/>
        <div>{{message}}</div>
        <div>{{reversedMessage}}</div>
        <div>{{arr}}</div>
        <div>{{computedArr}}</div>
        <div>{{computedArr2BaseOnArr}}</div>
        <button @click="changeMessage">random</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '11542158454136854638979',
                arr: []
            }
        },
        computed: {
            reversedMessage() {
                return 'Computed data：' + this.message.split('').reverse().join('');
            },
            computedArr: {
                set(value) {
                    this.arr = value.split('');
                    // computed循环set会导致浏览器崩溃
                    // this.computedArr2BaseOnArr = value;
                },
                get() {
                    return this.arr.join('');
                }
            },
            computedArr2BaseOnArr: {
                set(value) {
                    this.computedArr = value + value;
                },
                get() {
                    return this.computedArr.split('').join('-');
                }
            }
        },
        methods: {
            changeMessage() {
                let value = parseInt(Math.random() * 1000000000000000000, 10) + '';
                this.message = value;
                this.computedArr2BaseOnArr = value;
            }
        }
    }
</script>

<style lang="less">

</style>

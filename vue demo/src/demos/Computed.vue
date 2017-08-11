<template>
    <div class="container">
        <h2>computed</h2>
        <div>{{message}}</div>
        <div>{{reversedMessage}}</div>
        <hr/>
        <div>{{arr}}</div>
        <div>{{computedArr}}</div>
        <div>{{computedArr2BaseOnArr}}</div>
        <hr/>
        <button @click="changeMessage">修改</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                message: '这是一个正向的字符串',
                arr: []
            }
        },
        computed: {
            reversedMessage() {
                return '计算过的逆序字符串：' + this.message.split('').reverse().join('');
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
                let value = parseInt(Math.random() * 1000000000000, 10) + '';
                this.message = value;
                this.computedArr2BaseOnArr = value;
            }
        }
    }
</script>

<style lang="less">

</style>

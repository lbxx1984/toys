<template>
    <div class="container">
        <h2>Bind</h2>
        <p>{{message}}<br/><input :value="message" @input="onMessageInput"/></p>
        <p v-bind:title="title">鼠标悬浮在这里，会出现提示</p>
        <p :class="textClass">绑定了class</p>
        <p :style="styleInlineText">绑定了style</p>
        <p v-bind="{class: textClass, style: styleInlineText}">绑定一个对象字面量</p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                message: '绑定到内容和输入框',
                title: '绑定到html属性',
                textClass: 'text-container',
                styleInlineText: 'color:red;'
            }
        },
        methods: {
            onMessageInput(e) {
                this.message = e.target.value;
            }
        }
    }
</script>

<style lang="less">
    .container {
        padding: 20px;
        .text-container {
            border: 1px solid;
        }
    }
</style>

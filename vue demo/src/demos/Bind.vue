<template>
    <div class="container">
        <h2>Bind</h2>
        <hr/>
        <p>{{message}}<br/><input :value="message" @input="onMessageInput"/></p>
        <p v-bind:title="title">绑定title</p>
        <p :class="textClass">绑定class</p>
        <p :style="styleInlineText">绑定style</p>
        <p v-bind="{class: textClass, style: styleInlineText}">绑定对象字面量</p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                message: '绑定到输入框',
                title: '绑定到title属性',
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

<template>
    <div class="container">
        <h2>v-bind</h2>
        <hr/>
        <p>
            {{message}}<br/>
            <input :value="message" @input="onMessageInput"/><br/>
            <input v-model="message"/><br/>
        </p>
        <p v-bind:title="title">绑定title</p>
        <p v-bind="{class: borderClass, style: inlineCssText}">用对象字面量一次绑定多个属性</p>
        <hr/>
        <p :class="borderClass">绑定class</p>
        <p :class="{'text-border': hasBorder, 'text-content': hasContent}">用对象语法绑定class</p>
        <p :class="[borderClass, contentClass]">用数组语法绑定class</p>
        <hr/>
        <p :style="inlineCssText">用字符串绑定内联style</p>
        <p :style="inlineCssObject">用对象绑定内联style</p>
        <p :style="[inlineCssObject, inlineCssObject1]">用数组将多个对象绑定到内联style</p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                message: '绑定到输入框',
                title: '绑定到title属性',
                borderClass: 'text-border',
                contentClass: 'text-content',
                inlineCssText: 'color:red;',
                inlineCssObject: {
                    fontSize: '14px',
                    padding: '10px',
                    backgroundColor: 'rgba(125,52,200,0.5)'
                },
                inlineCssObject1: {
                    fontWeight: 700
                },
                hasBorder: true,
                hasContent: false
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
        .text-border {
            background-color: rgba(54, 67, 111, 0.5)
        }
        .text-content {
            font-size: 24px;
        }
    }
</style>

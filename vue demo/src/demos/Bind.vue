<template>
    <div class="container">
        <h2>v-bind</h2>
        <hr/>
        <p>
            {{message}}<br/>
            <input :value="message" @input="onMessageInput"/><br/>
            <input v-model="message"/><br/>
        </p>
        <p v-bind:title="title">Bind data on dom property.(mouse hover here)</p>
        <p v-bind="{class: borderClass, style: inlineCssText}">Bind an object on dom properties.</p>
        <p :class="borderClass">Bind data on class.</p>
        <p :class="{'text-border': hasBorder, 'text-content': hasContent}">Bind an object on class</p>
        <p :class="[borderClass, contentClass]">Bind an array on class</p>
        <p :style="inlineCssText">Bind data on inline style.</p>
        <p :style="inlineCssObject">Bind an object on inline style.</p>
        <p :style="[inlineCssObject, inlineCssObject1]">Bind an array on inline style.</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Bind data on input box.',
                title: 'This message will be seen only when you hover the dom.',
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

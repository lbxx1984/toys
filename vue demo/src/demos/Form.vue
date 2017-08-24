<template>
    <div class="container">
        <h2>form</h2>
        <hr/>
        <div class="preview">
            <label>name:</label>{{name}}<span>{{validationName}}</span><br/>
            <label>sex:</label>{{sex}}<br/>
            <label>age:</label>{{age}}<br/>
            <label>food:</label>{{food.join(',')}}<br/>
            <label style="float:left;">address:</label>
            <p style="display:inline-block;" v-html="address.split('\n').join('<br/>')"></p><br/>
        </div>
        <form>
            <label>name:</label>
            <input type="text" v-model="name"/><br/>
            <label>sex:</label>
            <input id="sex-female"  type="radio" value="female" v-model="sex">
            <label for="sex-female" class="checkbox-label">female</label>
            <input id="sex-male"  type="radio" value="male" v-model="sex">
            <label for="sex-male" class="checkbox-label">male</label><br/>
            <label>age:</label>
            <select v-model="age">
                <option disabled value="">select</option>
                <option>{{'< 30'}}</option>
                <option>30-60</option>
                <option>{{'> 60'}}</option>
            </select><br/>
            <label>food:</label>
            <input id="food-pizza"  type="checkbox" v-model="food"  value="pizza"/>
            <label for="food-pizza" class="checkbox-label">pizza</label>
            <input id="food-cola"   type="checkbox" v-model="food"  value="cola"/>
            <label for="food-cola"  class="checkbox-label">cola</label><br/>
            <label style="float:left;">address:</label>
            <textarea v-model="address"></textarea><br/>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                age: '',
                address: 'test line 1\ntest line2',
                sex: '',
                food: []
            }
        },
        computed: {
            validationName() {
                return this.name.length ? '' : 'please input name.';
            }
        }
    }
</script>

<style lang="less">
    .container {
        .preview {
            float: right;
            width: 50%;
            span {
                padding-left: 5px;
                color: red;
            }
        }
        form {
            margin-right: 50%;
            textarea {
                margin-top: 10px;
                width: 200px;
                height: 200px;
            }
            .checkbox-label {
                display: inline;
                width: auto;
                text-align: left;
                padding: 0;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        }
        label {
            display: inline-block;
            width: 100px;
            text-align: right;
            padding-right: 10px;
        }
    }
</style>

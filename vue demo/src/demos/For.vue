<template>
    <div class="container">
        <h2>For-If</h2>
        <hr/>
        <ul>
            <button @click="pushArr1">push</button>
            <button @click="popArr1">pop</button>
            <li v-for="(item, index) in arr1" :style="{color: index % 2 === 0 ? 'green' : 'red'}">{{item}}</li>
        </ul>
        <ul>
            <li v-for="(item, index) in arr1" v-if="index % 2 === 0">{{index + 1 + '-' + item}}</li>
        </ul>
        <hr/>
        <ul>
            <button @click="addObj1">add</button>
            <button @click="deleteObj1">delete</button>
            <li v-for="(value, key) in obj1">{{key + ' : ' + value}}</li>
        </ul>
        <hr/>
        <button @click="addLeaf1">add</button>
        <button @click="deleteLeaf1">delete</button>
        <ul>
            <li v-for="(children, index) in tree1">
                <h6>{{index}}</h6>
                <ul>
                    <li v-for="value in children">
                        <h6>{{value}}</h6>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                arr1: [
                    'line1', 'line2', 'line3', 'line4', 'line5'
                ],
                obj1: {
                    key1: 'value1',
                    key2: 'value2',
                    key3: 'value3',
                    key4: 'value4',
                    key5: 'value5',
                    key6: 'value6'
                },
                tree1: {
                    leaf1: {
                        leaf11: 'leaf11',
                        leaf12: 'leaf12',
                        leaf13: 'leaf13'
                    },
                    leaf2: {
                        leaf21: 'leaf21',
                        leaf22: 'leaf22',
                        leaf23: 'leaf23'
                    },
                    leaf3: {
                        leaf31: 'leaf31',
                        leaf32: 'leaf32',
                        leaf33: 'leaf33'
                    }
                }
            }
        },
        methods: {
            pushArr1() {
                this.arr1.push('line' + (this.arr1.length + 1));
            },
            popArr1() {
                this.arr1.pop();
            },
            addObj1() {
                let keys = Object.keys(this.obj1);
                this.$set(this.obj1, 'key' + (keys.length + 1), 'value' + (keys.length + 1));
            },
            deleteObj1() {
                let keys = Object.keys(this.obj1);
                if (!keys.length) {
                    return;
                }
                this.$delete(this.obj1, 'key' + keys.length);
            },
            addLeaf1() {
                let keys = Object.keys(this.tree1.leaf1);
                this.$set(this.tree1.leaf1, 'leaf1' + (keys.length + 1), 'leaf1' + (keys.length + 1));
            },
            deleteLeaf1() {
                let keys = Object.keys(this.tree1.leaf1);
                if (!keys.length) {
                    return;
                }
                this.$delete(this.tree1.leaf1, 'leaf1' + keys.length);
            }
        }
    }
</script>

<style lang="less">

</style>

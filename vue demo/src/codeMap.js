export default {"Bind.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2>v-bind</h2>\r\n        <hr/>\r\n        <p>\r\n            {{message}}<br/>\r\n            <input :value=\"message\" @input=\"onMessageInput\"/><br/>\r\n            <input v-model=\"message\"/><br/>\r\n        </p>\r\n        <p v-bind:title=\"title\">Bind data on dom property.(mouse hover here)</p>\r\n        <p v-bind=\"{class: borderClass, style: inlineCssText}\">Bind an object on dom properties.</p>\r\n        <p :class=\"borderClass\">Bind data on class.</p>\r\n        <p :class=\"{'text-border': hasBorder, 'text-content': hasContent}\">Bind an object on class</p>\r\n        <p :class=\"[borderClass, contentClass]\">Bind an array on class</p>\r\n        <p :style=\"inlineCssText\">Bind data on inline style.</p>\r\n        <p :style=\"inlineCssObject\">Bind an object on inline style.</p>\r\n        <p :style=\"[inlineCssObject, inlineCssObject1]\">Bind an array on inline style.</p>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        data() {\r\n            return {\r\n                message: 'Bind data on input box.',\r\n                title: 'This message will be seen only when you hover the dom.',\r\n                borderClass: 'text-border',\r\n                contentClass: 'text-content',\r\n                inlineCssText: 'color:red;',\r\n                inlineCssObject: {\r\n                    fontSize: '14px',\r\n                    padding: '10px',\r\n                    backgroundColor: 'rgba(125,52,200,0.5)'\r\n                },\r\n                inlineCssObject1: {\r\n                    fontWeight: 700\r\n                },\r\n                hasBorder: true,\r\n                hasContent: false\r\n            }\r\n        },\r\n        methods: {\r\n            onMessageInput(e) {\r\n                this.message = e.target.value;\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style lang=\"less\">\r\n    .container {\r\n        padding: 20px;\r\n        .text-border {\r\n            background-color: rgba(54, 67, 111, 0.5)\r\n        }\r\n        .text-content {\r\n            font-size: 24px;\r\n        }\r\n    }\r\n</style>\r\n","Component.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2>component</h2>\r\n        <hr/>\r\n        <local-component\r\n            :parentMessage=\"msg\"\r\n            staticMessage=\"message never changed\"\r\n            :staticNumber=\"1\"\r\n            @click.native=\"clickChild\"\r\n        ></local-component>\r\n        <hr/>\r\n        <file-component :parentMessage=\"msg\" @childCallback=\"childCallback\" @click.native=\"clickChild\">\r\n        </file-component>\r\n        <hr/>\r\n        <div>{{clkmsg}}</div>\r\n        <button @click=\"changeMessage\">Change Father Component's Message</button>\r\n    </div>\r\n</template>\r\n\r\n\r\n<script>\r\n\r\n    import FileComponent from '../components/FileComponent.vue';\r\n\r\n    const LocalComponent = {\r\n        template: [\r\n            '<div style=\"background-color:#EBEBE4;margin:10px;\">',\r\n            '    <h4>local component</h4>',\r\n            '    Local Component Message: {{msg}}<br/>',\r\n            '    Father Bind Message: {{parentMessage}}<br/>',\r\n            '    Father Static Message: {{staticMessage}}<br/>',\r\n            '    Father Static Number + 1: {{staticNumber + 1}}<br/>',\r\n            '    <button v-on:click=\"changeMessage\">Change Local Component\\'s Message</button>',\r\n            '</div>'\r\n        ].join('\\n'),\r\n        props: ['parentMessage', 'staticMessage', 'staticNumber'],\r\n        data() {\r\n            return {\r\n                msg: 'it is local component!'\r\n            }\r\n        },\r\n        methods: {\r\n            changeMessage() {\r\n                this.msg = 'it is local component, update time ' + (+new Date());\r\n            }\r\n        }\r\n    };\r\n\r\n    export default {\r\n        components: {\r\n            'local-component': LocalComponent,\r\n            'file-component': FileComponent\r\n        },\r\n        data() {\r\n            return {\r\n                msg: 'it is father component!',\r\n                clkmsg: ''\r\n            }\r\n        },\r\n        methods: {\r\n            changeMessage() {\r\n                this.msg = 'it is father component, update time ' + (+new Date());\r\n            },\r\n            childCallback(timer) {\r\n                this.msg = 'it is father component, update time ' + timer;\r\n            },\r\n            clickChild(e) {\r\n                this.clkmsg = 'you have clicked child component at (' + e.layerX + ', ' + e.layerY + ')';\r\n            }\r\n        }\r\n    }\r\n\r\n</script>\r\n\r\n\r\n<style lang=\"less\">\r\n\r\n</style>\r\n","Computed.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2>computed</h2>\r\n        <hr/>\r\n        <div>{{message}}</div>\r\n        <div>{{reversedMessage}}</div>\r\n        <div>{{arr}}</div>\r\n        <div>{{computedArr}}</div>\r\n        <div>{{computedArr2BaseOnArr}}</div>\r\n        <button @click=\"changeMessage\">random</button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        data() {\r\n            return {\r\n                message: '11542158454136854638979',\r\n                arr: []\r\n            }\r\n        },\r\n        computed: {\r\n            reversedMessage() {\r\n                return 'Computed data：' + this.message.split('').reverse().join('');\r\n            },\r\n            computedArr: {\r\n                set(value) {\r\n                    this.arr = value.split('');\r\n                    // computed循环set会导致浏览器崩溃\r\n                    // this.computedArr2BaseOnArr = value;\r\n                },\r\n                get() {\r\n                    return this.arr.join('');\r\n                }\r\n            },\r\n            computedArr2BaseOnArr: {\r\n                set(value) {\r\n                    this.computedArr = value + value;\r\n                },\r\n                get() {\r\n                    return this.computedArr.split('').join('-');\r\n                }\r\n            }\r\n        },\r\n        methods: {\r\n            changeMessage() {\r\n                let value = parseInt(Math.random() * 1000000000000000000, 10) + '';\r\n                this.message = value;\r\n                this.computedArr2BaseOnArr = value;\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style lang=\"less\">\r\n\r\n</style>\r\n","Event.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2>event</h2>\r\n        <hr/>\r\n        <h6>count: {{count}}</h6>\r\n        <button v-on:click=\"count++\">Inline JavaScript</button><br/>\r\n        <button @click=\"add\">Event Handler</button><br/>\r\n        <button @click=\"add(5, $event)\">\r\n            Inline Event Handler<br/>\r\n            this button will pass a custom param to event handler.\r\n        </button><br/>\r\n        <button @click.ctrl=\"add(100)\">\r\n            Modifer Key<br/>\r\n            this button works only when you click it while 'ctrl' pressing down.\r\n        </button><br/>\r\n        <button @click.once=\"add(10)\">\r\n            Event Modifier<br/>\r\n            this button works <b style=\"color:red;\">only once</b>.\r\n        </button>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        data() {\r\n            return {\r\n                count: 0\r\n            }\r\n        },\r\n        methods: {\r\n            add(n) {\r\n                this.count += isNaN(n) ? 1 : n;\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style lang=\"less\">\r\n\r\n</style>\r\n","For.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2>v-for</h2>\r\n        <hr/>\r\n        <button @click=\"pushArr1\">push</button>\r\n        <button @click=\"popArr1\">pop</button>\r\n        <ul>\r\n            <li v-for=\"(item, index) in arr1\" :style=\"{color: index % 2 === 0 ? 'green' : 'red'}\">{{item}}</li>\r\n        </ul>\r\n        <ul>\r\n            <li v-for=\"(item, index) in arr1\">{{index + 1 + '-' + item}}</li>\r\n        </ul>\r\n        <button @click=\"addObj1\">add</button>\r\n        <button @click=\"deleteObj1\">delete</button>\r\n        <ul>\r\n            <li v-for=\"(value, key) in obj1\">{{key + ' : ' + value}}</li>\r\n        </ul>\r\n        <button @click=\"addLeaf1\">add</button>\r\n        <button @click=\"deleteLeaf1\">delete</button>\r\n        <ul>\r\n            <li v-for=\"(children, index) in tree1\">\r\n                <h6>{{index}}</h6>\r\n                <ul>\r\n                    <li v-for=\"value in children\">\r\n                        <h6>{{value}}</h6>\r\n                    </li>\r\n                </ul>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        data() {\r\n            return {\r\n                arr1: [\r\n                    'line1', 'line2', 'line3', 'line4', 'line5'\r\n                ],\r\n                obj1: {\r\n                    key1: 'value1',\r\n                    key2: 'value2',\r\n                    key3: 'value3',\r\n                    key4: 'value4',\r\n                    key5: 'value5',\r\n                    key6: 'value6'\r\n                },\r\n                tree1: {\r\n                    leaf1: {\r\n                        leaf11: 'leaf11',\r\n                        leaf12: 'leaf12',\r\n                        leaf13: 'leaf13'\r\n                    },\r\n                    leaf2: {\r\n                        leaf21: 'leaf21',\r\n                        leaf22: 'leaf22',\r\n                        leaf23: 'leaf23'\r\n                    },\r\n                    leaf3: {\r\n                        leaf31: 'leaf31',\r\n                        leaf32: 'leaf32',\r\n                        leaf33: 'leaf33'\r\n                    }\r\n                }\r\n            }\r\n        },\r\n        methods: {\r\n            pushArr1() {\r\n                this.arr1.push('line' + (this.arr1.length + 1));\r\n            },\r\n            popArr1() {\r\n                this.arr1.pop();\r\n            },\r\n            addObj1() {\r\n                let keys = Object.keys(this.obj1);\r\n                this.$set(this.obj1, 'key' + (keys.length + 1), 'value' + (keys.length + 1));\r\n            },\r\n            deleteObj1() {\r\n                let keys = Object.keys(this.obj1);\r\n                if (!keys.length) {\r\n                    return;\r\n                }\r\n                this.$delete(this.obj1, 'key' + keys.length);\r\n            },\r\n            addLeaf1() {\r\n                let keys = Object.keys(this.tree1.leaf1);\r\n                this.$set(this.tree1.leaf1, 'leaf1' + (keys.length + 1), 'leaf1' + (keys.length + 1));\r\n            },\r\n            deleteLeaf1() {\r\n                let keys = Object.keys(this.tree1.leaf1);\r\n                if (!keys.length) {\r\n                    return;\r\n                }\r\n                this.$delete(this.tree1.leaf1, 'leaf1' + keys.length);\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style lang=\"less\">\r\n\r\n</style>\r\n","Form.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2>form</h2>\r\n        <hr/>\r\n        <div class=\"preview\">\r\n            <label>name:</label>{{name}}<span>{{validationName}}</span><br/>\r\n            <label>sex:</label>{{sex}}<br/>\r\n            <label>age:</label>{{age}}<br/>\r\n            <label>food:</label>{{food.join(',')}}<br/>\r\n            <label style=\"float:left;\">address:</label>\r\n            <p style=\"display:inline-block;\" v-html=\"address.split('\\n').join('<br/>')\"></p><br/>\r\n        </div>\r\n        <form>\r\n            <label>name:</label>\r\n            <input type=\"text\" v-model=\"name\"/><br/>\r\n            <label>sex:</label>\r\n            <input id=\"sex-female\"  type=\"radio\" value=\"female\" v-model=\"sex\">\r\n            <label for=\"sex-female\" class=\"checkbox-label\">female</label>\r\n            <input id=\"sex-male\"  type=\"radio\" value=\"male\" v-model=\"sex\">\r\n            <label for=\"sex-male\" class=\"checkbox-label\">male</label><br/>\r\n            <label>age:</label>\r\n            <select v-model=\"age\">\r\n                <option disabled value=\"\">select</option>\r\n                <option>{{'< 30'}}</option>\r\n                <option>30-60</option>\r\n                <option>{{'> 60'}}</option>\r\n            </select><br/>\r\n            <label>food:</label>\r\n            <input id=\"food-pizza\"  type=\"checkbox\" v-model=\"food\"  value=\"pizza\"/>\r\n            <label for=\"food-pizza\" class=\"checkbox-label\">pizza</label>\r\n            <input id=\"food-cola\"   type=\"checkbox\" v-model=\"food\"  value=\"cola\"/>\r\n            <label for=\"food-cola\"  class=\"checkbox-label\">cola</label><br/>\r\n            <label style=\"float:left;\">address:</label>\r\n            <textarea v-model=\"address\"></textarea><br/>\r\n        </form>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        data() {\r\n            return {\r\n                name: '',\r\n                age: '',\r\n                address: 'test line 1\\ntest line2',\r\n                sex: '',\r\n                food: []\r\n            }\r\n        },\r\n        computed: {\r\n            validationName() {\r\n                return this.name.length ? '' : 'please input name.';\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style lang=\"less\">\r\n    .container {\r\n        .preview {\r\n            float: right;\r\n            width: 50%;\r\n            span {\r\n                padding-left: 5px;\r\n                color: red;\r\n            }\r\n        }\r\n        form {\r\n            margin-right: 50%;\r\n            textarea {\r\n                margin-top: 10px;\r\n                width: 200px;\r\n                height: 200px;\r\n            }\r\n            .checkbox-label {\r\n                display: inline;\r\n                width: auto;\r\n                text-align: left;\r\n                padding: 0;\r\n                -webkit-touch-callout: none;\r\n                -webkit-user-select: none;\r\n                -khtml-user-select: none;\r\n                -moz-user-select: none;\r\n                -ms-user-select: none;\r\n                user-select: none;\r\n            }\r\n        }\r\n        label {\r\n            display: inline-block;\r\n            width: 100px;\r\n            text-align: right;\r\n            padding-right: 10px;\r\n        }\r\n    }\r\n</style>\r\n","If.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2>v-if</h2>\r\n        <hr/>\r\n        <h5 v-if=\"num > 0.6\">{{num}} > 0.6</h5>\r\n        <h5 v-else-if=\"num > 0.3\">0.6 => {{num}} > 0.3</h5>\r\n        <h5 v-else>0.3 => {{num}}</h5>\r\n        <button @click=\"random\">random</button>\r\n        <h5>with out v-if</h5>\r\n        <ul>\r\n            <li v-for=\"(item, index) in arr\">{{index + ': ' + item}}</li>\r\n        </ul>\r\n        <h5>v-if=\"(index + 1) % 3 !== 0\"</h5>\r\n        <ul>\r\n            <li v-for=\"(item, index) in arr\" v-if=\"(index + 1) % 3 !== 0\">{{index}}</li>\r\n        </ul>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        data() {\r\n            return {\r\n                num: Math.random().toFixed(1),\r\n                arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\r\n            }\r\n        },\r\n        methods: {\r\n            random() {\r\n                this.num = Math.random().toFixed(1);\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style lang=\"less\">\r\n\r\n</style>\r\n","LifeCycle.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2>life cycle</h2>\r\n        <hr/>\r\n        <div v-for=\"line in msg\">{{line}}</div>\r\n        <button @click=\"addCount\">{{'count: ' + count}}</button>\r\n        <h6>See more life cycle callback actions in console.</h6>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        data() {\r\n            return {\r\n                msg: [],\r\n                count: 0\r\n            }\r\n        },\r\n        methods: {\r\n            addCount() {\r\n                this.count++;\r\n            }\r\n        },\r\n        beforeCreate() {\r\n            console.log('beforeCreate: ' + new Date().getTime());\r\n        },\r\n        created() {\r\n            this.msg.push('created: ' + new Date().getTime());\r\n        },\r\n        beforeMount() {\r\n            this.msg.push('beforeMount: ' + new Date().getTime());\r\n        },\r\n        mounted() {\r\n            this.msg.push('mounted: ' + new Date().getTime());\r\n        },\r\n        beforeUpdate() {\r\n            console.log('beforeUpdate: ' + new Date().getTime());\r\n        },\r\n        updated() {\r\n            console.log('updated: ' + new Date().getTime());\r\n        },\r\n        beforeDestroy() {\r\n            console.log('beforeDestroy: ' + new Date().getTime());\r\n        },\r\n        destroyed() {\r\n            console.log('destroyed: ' + new Date().getTime());\r\n        }\r\n    }\r\n</script>\r\n\r\n<style lang=\"less\">\r\n\r\n</style>\r\n","Test.vue":"<template>\r\n    <div class=\"container\">\r\n        <h2></h2>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        data() {\r\n            return {}\r\n        }\r\n    }\r\n</script>\r\n\r\n<style lang=\"less\">\r\n\r\n</style>\r\n"};
<template>
    <el-autocomplete
            class="inline-input"
            v-model="schema"
            :fetch-suggestions="querySearch"
            :placeholder="placeholder"
    ></el-autocomplete>
</template>

<script>
    import {getSchemaNameList, getSchemas} from '@/api/schema_info'
    export default {
        name: "SchemaSearch",
        props: {
            value: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: '请输入内容'
            }
        },
        created() {
            this.schmea = this.value
            getSchemaNameList().then(resp => {
                if(resp.code === 2000) {
                    this.schemaList = resp.data
                }
            })
        },
        watch: {
            schema(newVal, oldVal) {
                if (newVal !== this.value) {
                    this.$emit('input', newVal)
                }
            },
            value(newVal, oldVal){
                if (newVal !== this.schema) {
                    this.schema = newVal
                }
            }
        },
        data(){
            return {
                schemaList: [],
                schema: ""
            }
        },
        methods: {
            querySearch(queryString, cb) {
                let results = this.schemaList.filter(s => {
                    return queryString ? s.toLocaleLowerCase().indexOf(queryString.toLowerCase()) > -1 : true
                }).map(s => {
                    return {value: s}
                })
                cb(results)
            },
        }
    }
</script>

<style scoped>

</style>
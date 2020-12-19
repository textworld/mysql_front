<template>
    <el-autocomplete
            class="inline-input"
            v-model="schema"
            :fetch-suggestions="querySearch"
            :placeholder="placeholder"
    ></el-autocomplete>
</template>

<script>
    import {getSchemaNameList} from '@/api/schema_info'
    export default {
        name: "schema_search",
        props: {
            value: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                required: false,
                default: '请输入内容'
            }
        },
        data(){
            return {
                schema: "",
                schemaList: []
            }
        },
        watch: {
            schema(newVal, oldVal) {
                if (newVal !== this.value) {
                    this.$emit('input', newVal)
                }
            },
            value(newVal, oldVal) {
                if (newVal !== this.schema) {
                    this.schema = newVal
                }
            }
        },
        created() {
            this.schema = this.value
            getSchemaNameList().then(resp => {
                this.schemaList = resp.data
            })
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
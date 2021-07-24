<template>
  <el-autocomplete
      class="inline-input"
      v-model="schema"
      :fetch-suggestions="querySearch"
      :placeholder="placeholder"
      :size="size"
  ></el-autocomplete>
</template>

<script>
import {getSchemaNameList} from '@/api/schema_info'

export default {
  name: "SchemaSearch",
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  created() {
    this.schmea = this.value;
    getSchemaNameList().then((resp) => {
      if (resp.code === 2000) {
        this.schemaList = resp.data;
      }
    });
  },
  watch: {
    schema(newVal) {
      if (newVal !== this.value) {
        this.$emit("input", newVal); // v-model 其实是一个语法糖
      }
    },
    value(newVal) {
      if (newVal !== this.schema) {
        this.schema = newVal;
      }
    },
  },
  data() {
    return {
      schema: "",
      schemaList: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      let results = this.schemaList
          .filter((s) => {
            return queryString
                ? s.toLocaleLowerCase().indexOf(queryString.toLowerCase()) > -1
                : true;
          })
          .map((s) => {
            return {value: s};
          });
      cb(results);
    },
  },
};
</script>

<style>
</style>

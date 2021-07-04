<template>
  <div>
    <el-dialog
      title="show process list"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <div>
        <p>
          {{ schema.host_ip }}-{{ schema.port }}
          <el-button
            size="small"
            type="primary"
            @click="showProcessList(schema)"
            >刷新</el-button
          >
        </p>
        <el-table
          :data="processList"
          border
          height="250"
          style="width: 100%; margin-bottom: 10px"
        >
          <el-table-column prop="id" label="id" sortable> </el-table-column>

          <el-table-column prop="user" label="user"> </el-table-column>
          <el-table-column prop="host" label="host" sortable> </el-table-column>
          <el-table-column prop="db" label="db"> </el-table-column>
          <el-table-column prop="command" label="command"> </el-table-column>

          <el-table-column prop="time" label="time" sortable> </el-table-column>

          <el-table-column prop="state" label="state"> </el-table-column>

          <el-table-column prop="info" label="info"> </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                :loading="scope.row.loading"
                @click="killProcess(scope.row)"
                >kill</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get_process_list, kill_process_by_id } from "@/api/schema_info";

export default {
  name: "process_list",
  data() {
    return {
      dialogVisible: false,
      processList: [],
      schema: {},
    };
  },
  watch: {
    dialogVisible() {
      console.log("dialogVisible", this.dialogVisible);
    },
  },
  methods: {
    killProcess(row) {
      row.loading = true;
      console.log(row);
      kill_process_by_id(this.schema.id, row.id)
        .then((_) => {
          this.$message.info("操作成功");
        })
        .finally((_) => {
          row.loading = false;
          this.showProcessList(this.schema);
        });
    },
    showProcessList(schema) {
      this.schema = schema;

      return new Promise((resolve) => {
        get_process_list(schema.id)
          .then((resp) => {
            console.log("resp", resp);
            if (resp.code === 2000) {

              this.processList = resp.data;
              console.log(this.processList);
              _.forEach(this.processList, (v, k) => {
                this.$set(this.processList[k], "loading", false);
              });
              this.dialogVisible = true;
            }else{
              this.$message.error("无法获取process list")
            }

          })
          .catch((err) => {
            if (err) {
              this.$message.error("无法获取process list");
            }
            resolve();
          })
          .finally(() => {
            resolve();
          });
      });
    },
  },
};
</script>

<style scoped>
</style>
<template>
    <el-dialog title="安装MySQL" :visible.sync="dialogVisible" width="500px">
        <el-form :model="form" ref="install_form" :rules="rules">
            <el-form-item label="ip" :label-width="formLabelWidth" prop="host_ip">
                <el-input v-model="form.host_ip"></el-input>
            </el-form-item>
            <el-form-item label="port" :label-width="formLabelWidth" prop="port">
                <el-input v-model.number="form.port" type="number"></el-input>
            </el-form-item>
            <el-form-item label="schema" :label-width="formLabelWidth" prop="schema">
                <el-input v-model="form.schema"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {installMySQL} from '@/api/schema_info'
    import Schema from 'async-validator'
    export default {
        name: "install_mysql_modal",
        data() {
            return {
                dialogVisible: false,
                form: {
                    host_ip: "",
                    port: 3306,
                    schema: ""
                },
                formLabelWidth: "100px",
                rules: {
                    host_ip: [
                        { required: true, message: '请输入IP地址', trigger: 'blur' },
                    ],
                    port: [
                        { required: true, type: "integer", min:3305, max: 65535, message: '请输入端口', trigger: 'blur' }
                    ],
                    schema: [
                        { required: true, type: 'string', message: '请输入库名', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            show(){
                this.dialogVisible = true
            },
            hide() {
                this.dialogVisible = false
            },
            submit() {
                this.$refs['install_form'].validate((valid) => {
                    if (valid) {
                        installMySQL(this.form).then(resp => {
                            if (resp.code === 2000) {
                                this.$message.success('安装成功')
                                this.hide()
                                this.$emit('success')
                            }
                        }).catch(err => {
                            console.error('failed to make install mysql', err)
                            this.$message.error('安装失败')
                        })
                    }else {
                        this.$message.error('请正确填写表单')
                        return false;
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>
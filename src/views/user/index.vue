<template>
    <div>
        <el-tabs tab-position="left" style="">
            <el-tab-pane label="用户管理">
                <Settings></Settings>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Settings from './settings'

    export default {
        components: {
            Settings
        },
        data() {
            return {
                tabPosition: 'left'
            };
        }
    };
</script>

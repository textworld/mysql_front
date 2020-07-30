<template>
    <div>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
            <!-- 组件的传值
                冒号的作用就是将表达值作为JavaScript进行计算
               :key="k" 传入的是一个变量的值，假如k变量的值是3，那么传给组件的值就是3
               key="k"  传入的是一个字符串"k",那么传给组件的值就是字符串k
             -->
            <el-submenu v-for="(submenu, key) in menuRouts" :key="key">
                <!-- slot机制 -->
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ submenu.meta.title }}</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item v-for="(child, cKey) in submenu.children" :key="cKey">
                        <router-link :to="child.path">{{ child.meta.title }}</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
<!--            <el-submenu index="1">-->
<!--                <template slot="title">-->
<!--                    <i class="el-icon-location"></i>-->
<!--                    <span>导航一</span>-->
<!--                </template>-->
<!--                <el-menu-item-group>-->
<!--                    <template slot="title">分组一</template>-->
<!--                    <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                    <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--                <el-menu-item-group title="分组2">-->
<!--                    <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--                <el-submenu index="1-4">-->
<!--                    <template slot="title">选项4</template>-->
<!--                    <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--                </el-submenu>-->
<!--            </el-submenu>-->
<!--            <el-menu-item index="2">-->
<!--                <i class="el-icon-menu"></i>-->
<!--                <span slot="title">导航二</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="3" disabled>-->
<!--                <i class="el-icon-document"></i>-->
<!--                <span slot="title">导航三</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="4">-->
<!--                <i class="el-icon-setting"></i>-->
<!--                <span slot="title">导航四</span>-->
<!--            </el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
    import { menuRouts } from '../../../router/index'

    export default {
        name: "index",
        data(){
            return {
                menuRouts: menuRouts
            }
        }
    }
</script>

<style scoped>

</style>

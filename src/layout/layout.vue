<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside
      class="layout-aside"
      width="200px"
      style="background-color: rgb(48, 65, 86)"
    >
      <el-menu :default-active="routePath" class="el-menu-vertical-demo" router       background-color="#304156"
      text-color="#fff">
        <div v-for="(submenu, key) in menuRouts" :key="key">
          <template v-if="!submenu.children || submenu.children.length == 0">
            <el-menu-item :index="resolvePath('/', submenu.path)">
              {{ routeName(submenu) }}
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu :index="resolvePath('/', submenu.path)">
              <template slot="title">
                <i
                  :class="'iconfont icon-' + submenu.meta.icon"
                  style="color: #ffffff; font-size: 22px; margin-right: 5px"
                ></i>
                <span>{{ routeName(submenu) }}</span>
              </template>

              <el-menu-item-group>
                <el-menu-item
                  v-for="(child, cKey) in submenu.children"
                  :key="cKey"
                  :index="resolvePath(submenu.path, child.path)"
                >
                  <i
                    :class="'iconfont icon-' + child.meta.icon"
                    style="color: #ffffff; font-size: 22px; margin-right: 5px"
                  ></i>
                  {{ routeName(child) }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </div>
      </el-menu>
    </el-aside>

    <el-container style="margin-left: 200px;min-height: 800px;">
      <el-header class="layout-header" style="">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ username }}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.layout-aside {
  position: fixed;
  height: 100vh;
  overflow:hidden;
}
.el-menu-vertical-demo{
    min-height: 100%;
    border-right: none;
}
.layout-header{
    text-align: right; 
    font-size: 12px; 
    background-color: #fff;
    border-bottom: 1px solid #eee;
    -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
</style>

<script>
import path from "path";
import { menuRouts } from "@/router/index.js";
import { mapGetters } from "vuex";
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      menuRouts,
      tableData: Array(20).fill(item),
    };
  },
  computed: {
    ...mapGetters(["username"]),
    routePath() {
      return this.$route.path;
    },
    routeOpenArray() {
      return ["/", "home"];
    },
  },
  methods: {
    resolvePath(base, p) {
      return path.resolve(base, p);
    },
    routeName(route) {
      return route.meta ? route.meta.title : route.name;
    },
    handleCommand(command) {
      console.log("command", command);
      if (command == "logout") {
        console.log("logout command");
        this.$store.dispatch("logout");
      }
    },
  },
};
</script>

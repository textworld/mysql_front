<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="/home"
        class="el-menu-vertical-demo"
        background-color="rgb(48, 65, 86)"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <div v-for="(submenu, key) in menuRouts" :key="key">
             <template v-if="!submenu.children || submenu.children.length == 0">
                 <el-menu-item :index="resolvePath('/', submenu.path)">
                    {{routeName(submenu)}}
                 </el-menu-item>
             </template>

            <template v-else>
                <el-submenu
                    :index="resolvePath('/', submenu.path)"
                >
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{routeName(submenu)}}</span>
                    </template>

                    <el-menu-item-group>
                        <el-menu-item
                            v-for="(child, cKey) in submenu.children"
                            :key="cKey"
                            :index="resolvePath(submenu.path, child.path)"
                        >
                            {{routeName(child)}}
                        </el-menu-item>
                    </el-menu-item-group>
                
                </el-submenu>
            </template>
        </div>
        
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { menuRouts } from "../../../router/index";
import path from 'path'
export default {
  name: "index",
  computed: {
    routePath() {
      return this.$route.path;
    },
    routeOpenArray() {
      return ["/", "home"];
    },
  },
  created() {
    console.log(this.routePath);
  },
  data() {
    return {
      menuRouts: menuRouts,
    };
  },
  methods: {
      resolvePath(base, p) {
          return path.resolve(base, p)
      },
      routeName(route) {
          return route.meta ? route.meta.title : route.name
      }
  }
};
</script>

<style>
.sidebar-container {
  height: 100%;
  overflow: hidden;
}
.scrollbar-wrapper {
  height: 100%;
  overflow-x: hidden !important;
  background-color: rgb(48, 65, 86);
}
.el-menu-vertical-demo {
  background-color: rgb(48, 65, 86);
}
</style>

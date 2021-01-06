<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="12">
        <ul>
          <li v-for="(news, idx) in news" :key="idx">
            <h3>
              <a :href="news.url" target="_blank">{{news.title}}</a>
            </h3>
          </li>
        </ul>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { getNews } from "@/api/news";
export default {
  name: "Home",
  data() {
    return {
      news: [],
    };
  },
  created() {
    getNews().then((resp) => {
      this.news = resp.data.results;
    });
  },
  methods: {},
};
</script>

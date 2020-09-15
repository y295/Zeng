<template>
  <el-container style="height: 528px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: white">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <el-menu-item index="/user/list">用户列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">歌曲</template>
            <el-menu-item index="/music/list">音乐列表</el-menu-item>
            <el-menu-item index="/music/create">上传音乐</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">歌手</template>
            <el-menu-item index="/singer/list">歌手列表</el-menu-item>
            <el-menu-item index="/singer/create">添加歌手</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <span class="user">{{username}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a @click="logout">退出</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
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

.user {
  cursor: pointer;
}
</style>

<script>
  export default {
    data() {
      return {
        input: '',
        select: '',
        username: ''
      }
    },
    methods: {
      logout() {
        localStorage.removeItem("admin_name");
        this.$router.push("/login");
      }
    },
    created() {
      this.username = localStorage.getItem("admin_name") || "";
      if(!this.username){
        this.$router.push("/login");
      }
    },
     mounted() {
      window.onbeforeunload = function (e){
        this.username = "";
        localStorage.removeItem("admin_name");
      }
    }
  };
</script>

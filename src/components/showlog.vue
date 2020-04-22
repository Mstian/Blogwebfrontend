<template>
  <div class="showlog">
    <el-dialog class="dialogs" width="500px" :visible.sync="$store.state.isShowLogin">
      <div class="tabs">
        <div class="tab_tab">
          <div @click="changetab('login')">
            <span :class="[active == 'login' ? 'active' : '']">登录</span>
          </div>
          <div @click="changetab('register')">
            <span :class="[active == 'register' ? 'active' : '']">注册</span>
          </div>
        </div>
        <div class="tab_content">
          <login v-show='active=="login"' />
          <register v-show='active=="register"'/>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import login from "./login";
import register from "./register";
export default {
  components: {
    login,
    register
  },
  data() {
    return {
      active: "login"
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    changetab(type) {
      this.active = type;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='scss'>
.tab_tab {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab_tab > div {
  padding: 20px;
  font-size: 24px;
  cursor: pointer;
}
.el-dialog {
  height: 600px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
.active {
  color: red;
}
</style>
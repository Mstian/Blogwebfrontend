<template>
  <div class='footer'>
      ©2020 · tianleilei.cn · All Rights Reserved.  <a href="http://www.beian.miit.gov.cn">京ICP备20009765</a>   
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.footer{
    width: 100%;
    min-width: 1024px; /*no*/
    height: 90px;
    background: #fff;
    text-align: center;
    line-height: 90px;
    font-size: 18px;
    a{
      color: #333;
    }
    // box-shadow: -1px -1px #eee;
    border-top: 1px solid #eee;
}
</style>
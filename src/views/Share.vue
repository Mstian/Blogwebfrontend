<template>
  <div class="tools">
     
      <div @click="logout()" class="logout">
          share
      </div>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      //退出逻辑
      localStorage.removeItem('uid');
      this.$router.push('/')
      window.location.reload();
    }
  }
}
</script>

<style>

</style>
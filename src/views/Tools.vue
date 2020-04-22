<template>
  <div class="tools">
    <el-row :gutter="10">
      <el-col v-for="(item,index) in toolsList" :key="index" :span="8">
        <el-card shadow="hover">
          <div  @click="jump(item.link)"  class="toolItem">{{item.name}}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {gettools} from '../api/request/tools';
export default {
  data() {
    return {
      toolsList:[]
    };
  },
  methods:{
    gettools(){

    },
    jump(link){
      window.open(link)
    }
  },
  mounted(){
    gettools().then((data)=>{
      this.toolsList = data.data;
      // console.log(data);
    })
  }
};
</script>

<style lang="scss">
.tools {
  .toolItem{
    padding: 40px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }
}
.el-col-8{
  margin-bottom:10px;
}
</style>
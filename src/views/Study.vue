<template>
  <div class="study">
    <div class="study_left">
      <div
        :class="activeIndex==index ? 'study_active' : ''"
        v-for="(itema,index) in documentArr"
        :key="index"
        @click="slide(index,itema.categoryname)"
      >{{itema.categoryname}}</div>
    </div>
    <div class="study_right">
      <div v-for="(item,index) in documentArr" :key="index"  :ref='item.categoryname' class="study_right_main">
        <div :class='["study_right_title",activeIndex== index ? "study_active":""]'>{{item.categoryname}}</div>
        <div class="study_right_list">
          <el-row :gutter="10">
            <el-col :span="8" v-for="(subItem,subIndex) in item.data" :key="subIndex">
              <el-card shadow="hover">
                <div @click="jump(subItem.link)" class="studyItem">{{subItem.title}}</div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getstudycate} from '../api/request/study';
export default {
  data() {
    return {
      activeIndex: 0,
      documentArr:[]
    };
  },
  methods: {
    slide(i, type) {
      this.activeIndex = i;
      window.scrollTo(0, this.$refs[type][0].offsetTop);
    },
    jump(link){
      window.open(link)
    }
  },
  mounted(){
    getstudycate().then((data)=>{
      // console.log(data);
      if(data.err == 0){
        this.documentArr = data.data;
      }else{
        this.documentArr = []
      }
    });
  }
};
</script>

<style lang="scss">
.study {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  margin-bottom:10px;
}
.study_left {
  width: 25%;
  text-align: center;
  div {
    font-size: 20px;
    line-height: 80px;
    cursor: pointer;
    background: #f8f8f8;
    margin-bottom: 10px;
  }
  div:hover {
    color: #ff3030;
    position: relative;
    // background: #ff3030;
  }
  div:hover:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 3px;
    bottom: 0;
    left: 50%;
    margin-left: -50%;
    border-radius: 99999px;
    background: #ff3030;
  }
}
.study_right {
  width: 70%;
  padding-right: 20px;
  .study_right_main{
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .study_right_list{
    margin-top: 20px;
  }
  .study_right_title {
    font-size: 22px;
    padding: 20px 0;
  }
  .studyItem{
    cursor: pointer;
    text-align: center;
  }
  .studyItem:hover{
    color:#ff3030;
  }
}
.study_active {
  color: #ff3030;
  position: relative;
}
.study_active::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 3px;
  bottom: 0;
  left: 50%;
  margin-left: -50%;
  border-radius: 99999px;
  background: #ff3030;
}
.el-col-8{
  margin-bottom:10px;
}
</style>
<template>
  <div class="about">
    <div class="left">
      <div>一、关于我</div>
      <div>
        <p>
          我叫田雷雷，是一个北漂的前端开发工程师，也就是一名程序员。
        </p>
        <p>
          相信很多人都知道，写程序的人与人接触的时间少于与电脑接触的时间，有时候我也有很长一段时间不与人交流，除了工作的内容与时间，但实际上我很喜欢交朋友，
          很喜欢与人聊一些天南海北的话题。欢迎大家与我交朋友，一起交流，学习，成长。
        </p>
      </div>
      <div>二、关于博客</div>
      <div>
        <p>
          关于博客呢，主要是觉得有一个自己的博客是一件很酷的事情，再加上经常在网上搜索问题或者浏览知识的时候会看到别人的博客写的很酷，于是就萌生了自己写自己博客的想法，
          由于时间技术有限，博客确实很粗糙，但是还是有那么一丢丢用的哈，至少在自己做的过程中也学习到了很多东西。我会不定期在博客里分享一些我读过或学习的文章，也算是自己学习的一个记录与总结。
        </p>
         <p>
          自己去做一个博客呢，也对于自己是一个锻炼，对学习到的知识是一个拓展应用，很多时候很多东西只有去经历一下才会有不同的体会。
        </p>
        <p>
          博客的功能大概有文章阅读功能，写文章功能，分享文章功能，以及一些常用工具，还有学习工作中会使用的一些文档等。如果对博客有意见或者建议可以在下方留言，
          留言成功后，会自动以邮件的形式发给我，我会收到，并作为参考来改进博客，如果你平时有在工作学习中遇到好用的工具，也可以留言分享，如果有需要的学习资源，也可以留言或者联系我，如果方便我也可以帮忙去找。
        </p>
        <p>博客的配色如果觉得辣眼，先说声抱歉哈，毕竟直男审美，你懂的。如果你也有博客，那么你可以在留言里或者联系我我们互相友链啊。</p>
      </div>
      <div>三、联系方式</div>
      <div>
        <p>微信：T121041002087</p>
        <p>
          简书：
          <a href="https://www.jianshu.com/u/44bcdd491a44" target="_blank">zhaoHui_Ti</a>
        </p>
        <p>
          GitHub：
          <a href="https://github.com/Mstian" target="_blank">Mstian</a>
        </p>
      </div>
      <div>四、留言</div>
      <div class="textarea">
        <el-input :rows="4" type="textarea" placeholder="请输入留言" v-model="textarea"></el-input>
      </div>
      <div class="oprate">
        <el-button @click="addComments()" type="primary">留言</el-button>
        <el-button @click="clear()" type="info">清空</el-button>
      </div>
      <div class="commentList">
        <div class="list_wrap" v-for="(item,index) in commentList" :key="index">
          <div class="co_name">{{item.commentator}}：</div>
          <p class="co_content">{{item.content}}</p>
          <span class="con_date">{{formmatTime(item.commentTime)}}</span>
          <span
            v-if="$store.state.uid == item.uid"
            @click="deleteComment(item._id)"
            class="delete iconfont icon-shanchu"
          ></span>
        </div>
      </div>
    </div>
    <div class="right">
      <div>友情链接</div>
      <p v-for="(item) in friendChain" :key="item._id" >
        <a :href="item.link" target="_blank">{{item.name}}</a>
      </p>
    </div>
  </div>
</template>

<script>
import { addComment, getCommnet, deleteComment } from "../api/request/comment";
import { formmatTime ,checkLogin} from "../utils/index";
import {getFriendChain} from '../api/request/friend';
export default {
  data() {
    return {
      textarea: "",
      commentList: [],
      friendChain:[],
    };
  },
  methods: {
    formmatTime(time) {
      return formmatTime(time);
    },
    deleteComment(id) {
      this.$confirm("你真的真的想好要删除吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteComment({ id: id }).then(data => {
            // console.log(data);
            if (data.err == 0) {
              this.$message({
                type: "success",
                center: true,
                offset: 50,
                message: "该留言已删除"
              });
              this.getCommnets();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            center: true,
            offset: 50,
            message: "已取消删除"
          });
        });
    },
    addComments() {
      if(!checkLogin()){
        this.$message({
          type: "error",
          center: true,
          offset: 50,
          message: "请先登录"
        });
        return;
      }
      if (!this.textarea) {
        this.$message({
          type: "error",
          center: true,
          offset: 50,
          message: "请输入留言内容"
        });
        return;
      }
      addComment({
        commentator: this.$store.state.userName,
        content: this.textarea,
        uid: this.$store.state.uid
      }).then(data => {
        if (data.err == 0) {
          this.getCommnets();
          this.$message({
            type: "success",
            center: true,
            offset: 50,
            message: "留言成功"
          });
        }
        this.textarea = "";
      });
    },
    clear() {
      this.textarea = "";
    },
    getCommnets() {
      getCommnet().then(data => {
        // console.log(data);
        if (data.err == 0) {
          if (data.data.length >= 0) {
            this.commentList = data.data;
          } else {
            this.commentList = [];
          }
        } else {
          this.commentList = [];
        }
      });
    },
    async getFriendChain(){
      let data = await getFriendChain();
      if(data.err==0){
        this.friendChain = data.data;
      }
     
    }
  },
  mounted() {
    this.getCommnets();
    this.getFriendChain();
  }
};
</script>

<style lang = "scss">
.about {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 40px;
  color: #333;
  font-size: 24px;
  background: #fff;
  min-height: 100vh;
  margin-bottom: 10px;
  text-align: justify;
  line-height: 50px;
  
  .left {
    width: 70%;
  }
   p {
    color: #333;
    font-size: 20px;
    text-indent: 2em;
  }
 
}
.right {
  width: 20%;
  padding-left: 40px;
  p {
    text-indent: 0;
  }
  a{
    font-size: 18px;
  }
  /* background: red; */
}
.el-textarea__inner {
  font-size: 20px;
}
.textarea {
  margin-top: 20px;
}
.commentList {
  margin-top: 20px;

  /* padding: 10px; */
}
.list_wrap {
  margin-top: 5px;
  background: #fafafa;
  padding: 10px;
  padding-bottom: 45px;
  position: relative;
  border-radius:8px
}
.con_date {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 18px;
}
.oprate .el-button {
  width: 120px;
  font-size: 18px;
}
.delete {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}
.delete:hover {
  color: #666;
}
.co_name{
  font-size: 22px;
  color: #409EFF;
}
.co_content{
  color: #555;
}
.con_date{
  color:#999
}
</style>
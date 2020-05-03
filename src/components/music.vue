<template>
  <div class="music">
    <aplayer :music="music" :list="list" :mini = "mini" :float = "float" :showLrc = "showLrc" :volume = "volume" :listFolded = "listFolded" />
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
export default {
data: () => {
    return {
      listFolded:true,
      mini:false,
      float:true,
      showLrc:false,
      volume:0.2,
      music: {
        title: "最长的旅途",
        artist: "李琦",
        src: "http://music.163.com/song/media/outer/url?id=33190448.mp3",
        pic: "https://s1.ax1x.com/2020/05/03/JzkPdP.jpg"
      },
      list: [
        {
          title: "最长的旅途",
          artist: "李琦",
          src: "http://music.163.com/song/media/outer/url?id=33190448.mp3",
          pic: "https://s1.ax1x.com/2020/05/03/JzkPdP.jpg"
        },
        {
          title: "贝加尔湖畔",
          artist: "李健",
          src: "http://music.163.com/song/media/outer/url?id=31877245.mp3",
          pic: "https://s1.ax1x.com/2020/05/03/JzkMd0.jpg"
        },
        {
          title: "假如爱有天意",
          artist: "李健",
          src: "http://music.163.com/song/media/outer/url?id=31877467.mp3",
          pic: "https://s1.ax1x.com/2020/05/03/Jzk7lQ.jpg"
        }
      ]
    };
  },
  components:{
       Aplayer
  }
}
</script>

<style>
.music{
    background: #fff;
    padding: 1px 0;
    margin-bottom: 10px;
}
.aplayer-controller{
    justify-content: center;
}
.aplayer-time-inner{
    font-size: 12px;
}
.aplayer-bar-wrap{
    position: absolute;
    top:-10px;
    width: 100%;
}
</style>
<template>
  <section class="follow-section">
    <div class="border-shadow-set" style="    box-shadow: 6px 6px 2px 0px #d2d2d2;">
      <div id style="border: 2px solid rgb(16,72,131); width: 100%;padding:20px;background:#fff;">
        <div class="flex">
          <span style="font-size: 1.5em;">评论列表</span>
          <div class="up" @click="show = !show" v-bind:class="{ active: show }" ></div>
        </div>
        <transition  name="slide-fade">
              <div class="comment-list" v-if="show"> 
                  <div v-if="list.length" class v-for="comment in list" :key="comment.id" style="border:1px solid rgba(16,72,131,.5);margin-top:10px;padding:10px;">
                    <div class="name">{{comment.name}}:</div>
                    <span class="comment-content">{{comment.commentMd}}</span>
                  </div>
                  <div else style="border:1px solid rgba(16,72,131,.5);margin-top:10px;padding:10px;">
                      <span>暂无评论</span>
                  </div>
              </div>
      </transition>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "coursecomment",
  props: {
    list: {
      type: Array,
      default: []
    },
    aa: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    
  },
  created() {
  }
};
</script>
<style scoped>
.follow-section{
    
      padding:20px 50px;
      position: relative;
    
}
.name {
  font-size: 16px;
  opacity: 0.5;
}
.comment-content {
  font-size: 20px;
}
.up {
  width: 24px;
  height: 24px;
  border: 1px solid rgba(16, 72, 131, 0.5);
  position: relative;
  cursor: pointer;
}
.up:before,
.up:after {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: block;
  background: rgb(16, 72, 131);
}
.up:before {
  content: "";
  width: 2px;
  height: 18px;
}
.up:after {
  content: "";
  width: 18px;
  height: 2px;
}

.up.active::before {
 display: none;
}
.up.active::after {
 width: 14px;
 opacity: .5;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-list{
    overflow: hidden;
    

    /* transition: all .3s ease; */
}

.slide-fade-enter-active {
  height: auto;
  transition: all .3s ease;
}
.slide-fade-leave-active {
  height: 0;
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>


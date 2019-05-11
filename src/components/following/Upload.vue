<template>
  <section class="follow-section">
    <div class="border-shadow-set" style="    box-shadow: 6px 6px 2px 0px #d2d2d2;">
      <div id style="border: 2px solid rgb(16,72,131); width: 100%;padding:20px;background:#fff;">
        <div class="flex">
          <span style="font-size: 1.5em;">材料上传（请上传课程所需PPT或文档）</span>
          <div class="up" @click="show = !show" v-bind:class="{ active: show }" ></div>
        </div>

        <transition  name="slide-fade">
              <div class="comment-list" v-if="show"> 
                  <div v-if="list.length" class style="border:1px solid rgba(16,72,131,.5);margin-top:10px;padding:10px;display:flex;flex-direction: column;">
                    <div class="file-name" v-for="(item, index) in list" style="opacity:1;font-size:16px;line-height:1.5">{{index + 1}}.<a :href="item.fileUrl">{{item.fileName || '未知'}}</a></div>   
                  </div>
                  <div v-else style="border:1px solid rgba(16,72,131,.5);margin-top:10px;padding:10px;display:flex;flex-direction: column;">暂无</div>
                  <div class="enlist-div-class upload-box" style="width: 150px;height: 35px;float: right;position:relative;">
                      <p>添加文件</p>
                      <input type="file" name="" id="" :value="uploadVal" @input="uploadFile">
                  </div>      
              </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
import { config } from '@/util/config.js'
export default {
  name: "upload",
  props: {
    list: {
      type: Array,
      default: []
    },
    kcId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: true,
      uploadVal: '',
      idList: []
    };
  },
  methods: {
    inputChange() {
      console.log()
    },
    uploadFile(e) {
      var me = this;
      var file = e.target.files[0];
      var formData = new FormData();
      formData.append('uploadFile', file);
      $.ajax({
          url: config.IP + "/file/upload.do",
          type: "post",
          data: formData,
          cache: false,
          processData: false,
          contentType: false,
          success: function(data) {
              data = JSON.parse(data)
              me.uploadList(data.objectList.id);
          },
          error: function(data, message) {}
      })
    },
    uploadList(id) {
      alert('材料上传成功！')
      var me = this;
      me.idList.push(id);
      var parma = {
        courseId: me.kcId,
        fileIdList: me.idList
      }
      $.ajax({
          url: config.IP + "/course/uploadCourseFile",
          type: "post",
          contentType:'application/json',
          data: JSON.stringify(parma),
          success: function(data) {
              me.list = data.data;
          },
          error: function(data, message) {}
      })
    }
  },
  created() {
    console.log(this.list)
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
  line-height: 2;
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

   .enlist-div-class {
    margin-top: 20px;
        background: rgb(16, 72, 131);
        height: 30px;
        width: 100%;
        color: white;
        line-height: 33px;
        text-align: center;
        cursor: pointer;
    }
    
    .enlist-div-class p {
        position: relative;
        transition: 0.5s;
            line-height: 35px;
    }
    
    .enlist-div-class p:after {
        content: '>>';
        position: absolute;
        opacity: 0;
        top: 0;
        right: 20%;
        transition: 0.5s;
    }
    
    .enlist-div-class:hover p {
        padding-right: 25px;
    }
    
    .enlist-div-class:hover p:after {
        opacity: 1;
        right: 26%;
    }
.upload-box input {
   position: absolute;
   top: 0;
   left: 0;
   width: 150px;
   height: 35px;
   opacity: 0;
   font-size: 0;
   cursor: pointer;
}
</style>


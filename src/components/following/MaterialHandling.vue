<template>
  <section class="follow-section">
    <div class="border-shadow-set" style="    box-shadow: 6px 6px 2px 0px #d2d2d2;">
      <div id style="border: 2px solid rgb(16,72,131); width: 100%;padding:20px;background:#fff;">
        <div class="flex">
          <span style="font-size: 1.5em;">材料办理</span>
          <div class="up" @click="show = !show" v-bind:class="{ active: show }" ></div>
        </div>

  <transition  name="slide-fade">
    <div class="trip-container" v-if="show"   >  

              <div style="display:flex" class>
                请上传您的签证和机票信息，以便您到达当天的接待工作，谢谢！

              </div>
              
      
            
             
              <span style="display:none">{{test}}{{test2}}</span>
              <div class="flex" >
                 <div class="box-shaow flex" style="width:46%;padding:40px 20px;">
                   <div class="name">签证：<span v-if="!tripFile.visaId">未上传</span><a v-else :href="tripFile.visaUrl">已上传</a> </div>
                   <div class="buttons">
                     <div class="add link_button upload-box" @click="uploaType = 1">
                       <span>添加文件</span>
                       <input type="file" name="" id="" @input="uploadFile">
                     </div>
                     <div class="del link_button" @click="del(1)">删除</div>


                   </div>

                 </div>
                <div class="box-shaow flex" style="width:46%;padding:40px 20px;">
                   <div class="name">机票：<span v-if="!tripFile.planeTicketId">未上传</span><a v-else :href="tripFile.planeTicketUrl">已上传</a> </div>
                   <div class="buttons">
                     <div class="add link_button upload-box" @click="uploaType = 2">
                       <span>添加文件</span>
                       <input type="file" name="" id="" @input="uploadFile">
                     </div>
                     <div class="del link_button" @click="del(2)">删除</div>


                   </div>

                 </div>
              </div>
               <div
                class="enlist-div-class"
                style="width: 150px;height: 35px;margin-top:20px;    align-self: flex-end"
                @click="submitComment()"
              >
                <p>确认</p>
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
  name: "materialhandling",
  props: {
    tripFile: {
      type: Object,
      default() {
        return {}
      },
    },
    tripId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: true,
      uploaType: 1,
      test: '',
      test2: ''
    };
  },
  methods: {
        del(type) {
          var me =this;
          if(type == 1) {
              me.tripFile.visaId = '';
              me.tripFile.visaUrl = '';
              me.test = '';
          }else {
            me.tripFile.planeTicketId = '';
            me.tripFile.planeTicketUrl = '';
            me.test2 = '';
          }
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
                 if(data.flag == 1) {
                  var id = data.objectList.id;
                  var url = data.objectList.url;
                  if(me.uploaType == 1) {
                    me.tripFile.visaId = id;
                    me.tripFile.visaUrl = url;
                    me.test = 123;
                  }else {
                    me.tripFile.planeTicketId = id;
                    me.tripFile.planeTicketUrl = url;
                    me.test2 = 123;
                  }
                  alert('上传成功')
                 }else {
                   alert('上传失败')
                 }
              },
              error: function(data, message) {}
          })
        },
        submitComment() {
          var me = this;
          $.ajax({
              url: config.IP + "/trip/uploadTripFile",
              type: "post",
              contentType:'application/json',
              data: JSON.stringify({
                tripId: me.tripId,
                visaId: me.tripFile.visaId,
                planeTicketId: me.tripFile.planeTicketId
              }),
              success: function(data) {
                  alert('材料已上传！')
              },
              error: function(data, message) {}
          })
        }
  },
  created() {
    console.log(this.tripFile, 'dasdasdasd')
  }
};
</script>
<style scoped>
.trip-container{
  display: flex;
  flex-direction: column;
}
.box-shaow {
  padding: 10px;
  box-shadow: 0px 2px 10px #ccc;
  border-radius: 4px;
}
.follow-section {
  padding: 20px 50px;
  position: relative;
}
.name {
  font-size: 16px;
}
.comment-content {
  font-size: 20px;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
    margin:20px 0;
}
.container {
  overflow: hidden;
}

.slide-fade-enter-active {
  height: auto;
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  height: 0;
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

.enlist-div-class {
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
  content: ">>";
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
.link_button{
  display: inline-block;
  margin: 0 10px;
  color:#169BD5;
  cursor: pointer;
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
.upload-box {
  position: relative;
}
.upload-box input {
  position: absolute;
  top: 0;left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 0;
}

</style>


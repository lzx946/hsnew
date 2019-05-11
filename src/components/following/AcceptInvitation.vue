<template>
  <section class="follow-section">
    <div class="border-shadow-set" style="    box-shadow: 6px 6px 2px 0px #d2d2d2;" v-for="item in invitationList">
      <div id style="border: 2px solid rgb(16,72,131); width: 100%;padding:20px;background:#fff;">
        <div class="flex">
          <span style="font-size: 1.5em;">接受邀请</span>
          <div class="up" @click="show = !show" v-bind:class="{ active: show }"></div>
        </div>

        <transition name="slide-fade">
          <div class="trip-container" v-if="show">
            <div class="border-bottom" style=""> 
              <div class="box-shaow" style="display: inline-block;">课程具体地点和时间</div>

              <div class="flex" style="justify-content: start;">
                <div class="list" v-for="obj in item.inviteList" :key="obj.id">
                  <div class="box-shaow">
                    <div>城市：{{obj.city}}</div>
                    <div>地点：{{obj.place}}</div>
                    <div>时间：{{obj.startTime}} - {{obj.stopTime}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div style="display:flex" class>
                请确认是否开课：
                <input type="radio" id="one" value="1" v-model="item.agree">
                <label for="one" style>确认开课</label>

                <input type="radio" id="two" value="2" v-model="item.agree">
                <label for="two">取消开课</label>

                <input type="radio" id="three" value="3" v-model="item.agree">
                <label for="three">更改具体时间</label>
              </div>
              <div
                class="enlist-div-class"
                style="width: 150px;height: 35px;"
                @click="submitComment()"
              >
                <p>确认</p>
              </div>
            </div>
            <div v-if="item.agree == 3">
               <div v-for="obj in item.inviteList" style="height: 30px">
                 <div style="display:inline-block"><span>地点：</span><span>{{obj.place}}</span></div>
                 <span style="display:inline-block;margin-left: 10px">时间：</span>
                 <div style="display:inline-block">
                   <date-picker style="display:inline-block" field="myDate" placeholder="开课时间" v-model="obj.startTime" format="yyyy/mm/dd" :backward="false" :no-today="false" :forward="false"></date-picker> - 
                   <date-picker style="display:inline-block" field="myDate" placeholder="开课时间" v-model="obj.stopTime" format="yyyy/mm/dd" :backward="false" :no-today="false" :forward="false"></date-picker>
                 </div>
               </div>
            </div>

            <div
              class="tips"
              style="border:1px solid #666;width:50%;padding:20px;margin-top:20px;" v-if="item.message"
            >
              <span>{{item.message}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';//选择日期的组件
import { config } from '@/util/config.js'
export default {
  name: "acceptInvitation",
  props: {
     invitationList: {
        type: Array,
        default() {
          return [];
        }
     },
     tripId: {
        type: Number,
        default() {
          return 0;
        }
     }
  },
  data() {
    return {
      show: true,
      picked: "1",
      statusMap: {
        1: '接受邀请',
        2: '更改行程',
        3: '取消开课'
      },
    };
  },
  components: {
    'date-picker': myDatepicker,
  },
  methods: {
    //教授接受邀请确认
    submitComment() {
      var me = this;
      $.ajax({
          url: config.IP + "/trip/acceptInvitation",
          type: "post",
          contentType:'application/json',
          data: JSON.stringify({
             tripId: me.tripId,
             agree: me.picked,
             classList:  me.list
          }),
          success: function(data) {
              alert('已提交审核')
          },
          error: function(data, message) {}
      })
    }
  },
  created() {
    }
};
</script>
<style scoped>

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
  opacity: 0.5;
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
label {
  margin-right: 10px;
  margin-bottom: 0;
}
.list{
  margin: 20px 20px  20px 0;
  
}
.list::before{
  content: "";
  display: block;

  height: 2px;
  width: 100%;
  background: rgb(16, 72, 131);
  margin-bottom: 10px;
  }
  .border-bottom{
    border-bottom:1px solid rgb(16, 72, 131);
    margin-bottom: 10px;
    margin-top:20px;
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
</style>


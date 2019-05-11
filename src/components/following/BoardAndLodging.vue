<template>
  <section class="follow-section">
    <div class="border-shadow-set" style="    box-shadow: 6px 6px 2px 0px #d2d2d2;">
      <div id style="border: 2px solid rgb(16,72,131); width: 100%;padding:20px;background:#fff;">
        <div class="flex">
          <span style="font-size: 1.5em;">食宿确定</span>
          <div class="up" @click="show = !show" v-bind:class="{ active: show }" ></div>
        </div>

  <transition  name="slide-fade">
    <div class="trip-container" v-if="show">
      <div class="flex" >
              <div style="display:flex" class>
                请选择是否需要为您安排食宿：  
                <input type="radio" id="yes" value="1" v-model="picked">
                <label for="yes" style>是</label>

                <input type="radio" id="no" value="0" v-model="picked">
                <label for="no">否</label>

              </div>
              <div
                class="enlist-div-class"
                style="width: 150px;height: 35px;"
                @click="submitComment()"
              >
                <p>确认</p>
              </div>
            </div>
            <div class="border-bottom" style=""> 
              <div class="box-shaow" style="display: inline-block;">课程具体地点和时间</div>

              <div class="flex" style="justify-content: start;">
                <div class="list" v-for="item in boardAndLodgingList" :key="item.id">
                  <div class="box-shaow">
                    <div>城市：{{item.city}}</div>
                    <div>地点：{{item.place}}</div>
                    <div>时间：{{item.startTime}} - {{item.stopTime}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tips"
              style="border:1px solid #666;width:50%;padding:20px;margin-top:20px;" v-if="detail.boardAndLodgingMessage"
            >
              <span>{{detail.boardAndLodgingMessage}}</span>
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
  name: "boardandlodging",
  props: {
    detail: {
      type: Object,
      default() {
        return {}
      }
    },
    boardAndLodgingList: {
      type: Array,
      default() {
        return [];
      }
    },
    tripId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: true,
      picked: this.detail.needBoardAndLodging || "1", 

    };
  },
  methods: {
      submitComment() {
          var me = this;
          $.ajax({
              url: config.IP + "/trip/confirmBoardAndLodging",
              type: "post",
              contentType:'application/json',
              data: JSON.stringify({
                tripId: me.tripId,
                need: me.picked
              }),
              success: function(data) {
                  alert('已提交食宿信息')
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


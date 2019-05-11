<template>
  <!--course list-->
  <div style="margin-top: 20px;">
    <div class="row" v-for="item in list" v-if="list.length">
      <div @click="kcTrackDetail(item.id)"
        class="col-sm-12 col-md-12"
        style="background: white;height: 400px;margin-bottom: 50px;padding: 0;overflow: hidden;"
      >

      <!-- tips -->
      <div class="tips">{{statusMap[item.status || 0]}}</div>
        <!--course back-->
        <div>
          <img :src="CourseBackRightImgSrc" style="right:0;height: 400px;position: absolute;">
        </div>
        <!-- horiz -->
        <div>
          <div
            style="background: rgba(64,116,173,0.7);height: 40px;width: 100%;margin-top: 80px;position: absolute;"
          ></div>
          <div
            style="background: rgba(64,116,173,0.7);height: 80px;width: 90%;margin-top: 40px;position: absolute;left:-80px;transform: skew(-30deg, 0);"
          ></div>
          <!-- course title-->
          <div
            id
            style="text-align: center;width: 100%;position: absolute;margin-top: 40px;display: flex;align-items: center;justify-content: center;flex-direction: column;"
          >
           <span style="display: block;font-size: 2.8em;font-family: '黑体';color: black;">{{item.name}}</span>
            <!-- <router-link :to="{name:'CourseDetail',params:{id:item.id}}">
            
              <span style="display: block;font-size: 2.8em;font-family: '黑体';color: black;">组织管理智慧</span>
            </router-link> -->
            <span style="display: block;font-size: 1.1em;font-family: '微软雅黑';">欧洲华商商学院 第{{item.period}}期</span>
          </div>
        </div>

        <!--course info right-->
        <div class="right-course-div">
          <span style="font-size: 2.8em;font-family: '黑体';">{{userInfo.employer}}{{userInfo.realname}}教授</span>
          <p style="display: block;font-size: 1.2em;font-weight: 600;">开课时间：{{item.totalStartTime}}</p>
          <p style="display: block;font-size: 1.2em;font-weight: 600;">结束时间：{{item.totalStopTime}}</p>
          <div
            style="font-size: 1.5em;font-weight: 600;margin-top: 20px;position: relative;height: 1.8em;"
          >
            <span style="float: left;">课程地点及具体时间</span>
            <div style="width: 40%;height: 5px;background: rgb(16,72,131);display: inline-block;"></div>
            <div class="right-course-div-enlist">
              <div style="transform: skew(30deg, 0);position: relative;"></div>
            </div>
          </div>
          <div style="width: 100%;height: 40px;background: rgb(16,72,131);position: relative;">
            <div class="enlist-div" b-v-for="it in item.courses" v-for="obj in item.teachPointList">
              <p style="text-align: center;line-height: 40px;color: white;">{{obj.codeFlagName}}</p>
            </div>
          </div>
          <div id>
            <div v-for="obj in item.teachPointList"
              style="width: 33.3%;height: 70px;position: relative;font-size: 1.3em;font-weight: bold;float: left;padding: 10px;"
              b-v-for="it in item.courses"
            >
              <span
                style="display: block;text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                title="it.room"
              >{{obj.codeFlagName}}：{{obj.room || '--'}}</span>
              <span style="display: block;text-align: left;font-size: 1.0em;">{{obj.startTime}}-{{obj.stopTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 50px;left: 30px;">暂无行程</div>
  </div>
</template>
<script>
import CourseBackRightImgSrc from '@/assets/course_back_right.png'
import { config } from '@/util/config.js'
export default {
  name: "courselist",
  props: {
    //从父组件ExpertInfo继承了meId（课程ID）
    meId: {
      type: Number,
      default: ''
    },
    //从父组件ExpertInfo继承了用户信息，其实也可以从common里面读取
    userInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
        CourseBackRightImgSrc: CourseBackRightImgSrc,
        list: [],
        statusMap: ['待审核','待上传材料','待开课','已开课', '已结课'],
    };
  },
  created() {
    this.getKcList();
  },
  methods: {
    //获取教授开设课程列表
    getKcList() {
      let me = this;
      $.ajax({
          url: config.IP + "/course/getCoursesByTeacherId",
          type: "post",
          dataType: "json",
          contentType:'application/json',
          data: JSON.stringify({
             teacherId: me.meId
          }),
          success: function(response) {
              me.list = response.data;
          },
          error: function(data, message) {
            
          }
      })
    },
    //课程跟踪详情
    kcTrackDetail(id) {
      //子组件要触发父组件的方法，要用emit
      this.$emit('getKcTrackDetail', id)
    }
    
  }
};
</script>
<style scoped>
.row{
    margin:0;
    padding: 50px;
}
.expert-img-class-left {
  left: 0;
  height: 400px;
  position: absolute;
}

.expert-img-class-right {
  right: 0;
  height: 400px;
  position: absolute;
}

.right-course-div-enlist {
  width: 40%;
  height: 35px;
  background: rgb(16, 72, 131);
  display: inline-block;
  transform: skew(-30deg, 0);
  position: absolute;
  bottom: 0.75em;
}

.left-course-div-enlist {
  width: 40%;
  height: 35px;
  background: rgb(16, 72, 131);
  display: inline-block;
  transform: skew(30deg, 0);
  position: absolute;
  bottom: 0.75em;
  left: -25px;
  overflow: hidden;
}

.left-course-div-enlist-share {
  color: white;
  font-size: 0.7em;
  text-align: center;
  line-height: 35px;
  float: left;
  margin-left: 40%;
}

.left-course-div-enlist-line {
  height: 30px;
  width: 0px;
  margin-left: 20%;
  border-left: 1px solid white;
  float: left;
}

.left-course-div-enlist-quit {
  color: white;
  font-size: 0.7em;
  margin-left: 5%;
  line-height: 35px;
  cursor: pointer;
  float: left;
}

.right-course-div {
  margin-left: 5%;
  margin-top: 120px;
}

.left-course-div {
  margin-right: 30%;
  margin-top: 120px;
  position: relative;
  text-align: right;
}

.enlist-div {
  width: 33.3%;
  border-right: 2px solid white;
  height: 100%;
  float: left;
  cursor: pointer;
}

.enlist-div p {
  position: relative;
  transition: 0.5s;
}

.enlist-div p:after {
  content: ">>";
  position: absolute;
  opacity: 0;
  top: 0;
  right: 28%;
  transition: 0.5s;
}

.enlist-div:hover p {
  padding-right: 25px;
}

.enlist-div:hover p:after {
  opacity: 1;
  right: 32%;
}

#course_list_id {
  min-width: 993px;
}

@media only screen and (max-width: 1200px) {
  .right-course-div {
    margin-left: 35%;
  }
  .left-course-div {
    margin-right: 35%;
  }
  .right-course-div-enlist {
    width: 32%;
  }
  .left-course-div-enlist {
    width: 32%;
  }
  .left-course-div-enlist-share {
    margin-left: 30%;
  }
  .left-course-div-enlist-line {
    margin-left: 10%;
  }
  .left-course-div-enlist-quit {
    margin-left: 5%;
  }
}

@media only screen and (max-width: 992px) {
  .col-sm-12,
  .col-md-12 {
    width: 992px;
  }
}

.tips{
position: absolute;
right: 0;
top: 0;
font-size: 20px;
font-weight: 800;
color:  rgb(16, 72, 131);
    z-index: 9;
    background: #e6dc4eee;
    padding: 10px 30px;
}
</style>

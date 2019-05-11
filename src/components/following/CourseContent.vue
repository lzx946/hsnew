<template>
  <!--course detail-->
  <section class="follow-section" >
<div class="course-detail-class border-shadow-set">
    <div id="course_detail_top_part_id">
      <div id="course_detail_top_img_part_id" style="float: left;">
        <img :src="courseInfo.url" class="photo-img-size-course">
      </div>
      <div id="course_detail_top_right_part_id" class="course-detail-coursename-div-class">
        <div
          id="course_detail_top_right_coursename_part_id"
          style="background: rgb(16,72,131);height: 100px;width: 100%;"
        >
          <br>
          <span
            style="margin-left: 15%;color: white;font-size: 2em;margin-top: 50px;"
          >“ {{trackDetail.courseName}} ”</span>
          <br>
          <span style="margin-left: 18%;color: white;font-size: 1em;">欧洲华商商学院&nbsp; 第{{trackDetail.period}}期</span>
        </div>
        <div id="course_detail_top_right_courseinfo_part_id" style="margin-top: 1%;height: 200px;">
          <div>
            <span
              style="font-size: 2em;margin-left: 2%;"
            >{{trackDetail.employer}}{{trackDetail.realName}}{{trackDetail.academic}}</span>
          </div>
          <div style="margin-top: 10px;">
            <span
              style="font-size: 1.2em;margin-left: 2%;"
            >开课时间：{{trackDetail.totalBegin}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结束时间：{{trackDetail.totalEnd}}</span>
          </div>
          <div style="margin-top: 10px;">
            <span style="font-size: 1.2em;margin-left: 2%;">课程地点及具体时间</span>
          </div>
          <div id style="font-size: 1.2em;margin-top: 10px;">
            <div  style="float: left;width: 23%;height: 100px;padding-left: 2%;" v-for="item in trackDetail.teachPointList">
              <p style="border-top: 2px solid rgb(16,72,131);">
                <b>{{item.codeFlagName}}:</b>
                {{item.room}}
              </p>
              <p style="text-align: center;">2018年11月26日-11月28日{{item.time}}</p>
              <!--<div class="enlist-div-class" @click="nowEnter(item.id,item.endtime)">
                                        <p>报名{{item.codeflagname}}</p>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="course_detail_bottom_part_id"
      style="border: 4px solid rgb(16,72,131);border-top: none;padding: 1em;"
     
    >
      <span style="border-bottom: 2px solid rgb(16,72,131);font-size: 1.5em;">课程内容</span>
      <div id style="text-indent: 20px;margin-top: 20px;">
        <span v-html="trackDetail.summary"></span>
      </div>
    </div>

    <div id style="margin-top: 20px;">
      <!--<div class="enlist-div-class" style="width: 200px;float: left;margin-left: 35%;font-size: 1.2em;" @click="shareEnter()">-->
      <!--<p>分享报名</p>-->
      <!--</div>-->
      <!--<div class="enlist-div-class" style="width: 100px;margin-left: 55%;background: transparent;" @click="showBackEnterFlag=!showBackEnterFlag">-->
      <!--<span>退报名</span>-->
      <!--</div>-->
      <!--<div v-if="showBackEnterFlag" style="position: absolute;z-index: 9;left: 28%;background: white;top: 20px;">
                        <a style="font-size: 0.8em;display: block;cursor: pointer;font-weight: 100;" v-for="it in courseInfo.courses" @click="backEnter(it.id)">退报{{it.codeflagname}}</a>
      </div>-->
    </div>
  </div>
  </section>
  
</template>
<script>
import HomeImgSrc from "@/assets/itback.jpg";
import TestImgSrc from "@/assets/test.png";
import LogoBackImgSrc from "@/assets/logo400x400.png";
import { config } from "@/util/config.js";
import { common } from "@/util/common.js";
export default {
  props: {
    trackDetail: {
         type: Object,
         default: {}
    },
  },
  name: "coursecontent",
  data() {
    return {
      HomeImgSrc: HomeImgSrc,
      TestImgSrc: TestImgSrc,
      LogoBackImgSrc: LogoBackImgSrc,
      showLoadingCss: {
        in: false,
        showloading: false
      },
      courseInfo: "",
      commentInfo: [],
      showBackEnter: -1,
      showBackEnterFlag: true,
      commentMd: "",
      period: 0,
      wordNum: 300
    };
  },
  methods: {},
  created() {
  }
};
</script>

<style scoped>
.follow-section{
    
      padding:20px 50px;
      position: relative;
    
}
.course-detail-class{
    background: #fff;
}
.tsama-line {
  margin: 1.6em 0;
  height: 1px;
  border: 1px solid #ececec;
}

.comment-course-div {
  margin-top: 50px;
  height: 150px;
  border: 4px solid rgb(16, 72, 131);
}

.enlist-div-class {
  background: rgb(16, 72, 131);
  height: 35px;
  width: 80%;
  margin-left: 10%;
  color: white;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
}

.enlist-div-class p {
  position: relative;
  transition: 0.5s;
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

p {
  margin-bottom: 5px;
}

.course-detail-class {
  border: 1px solid #cccccc;
  min-height: 500px;
  margin-top: 50px;
  padding: 20px;
}

.photo-img-size-course {
  height: 350px;
}

.course-detail-coursename-div-class {
  height: 350px;
  border-right: 4px solid rgb(16, 72, 131);
}

@media screen and (max-width: 1200px) {
}

@media screen and (max-width: 992px) {
}

@media screen and (max-width: 430px) {
}

.text-overtop-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.border-shadow-set {
  border-radius: 0;
      box-shadow: 6px 6px 2px 0px #d2d2d2;
}
</style>

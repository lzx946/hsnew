<template>
    <div id="course_list_id" style="background: rgb(70,51,50);width: 100%;height: 100%;min-height: 1000px;">
        <!--====遮罩层、加载中===-->
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <!--====遮罩层、退报===-->
        <!--<div  class="modal fade bs-example-modal-lg" v-bind:class="showCourseLocalCss" >
            <div style="width: 300px;height: 240px;background: white;position: absolute;top: 50%;left: 50%;margin-left: -150px;margin-top: -100px;padding: 1em;">
                <div id="">
                	<span style="font-size: 1.2em;"><b>选择退报的课程</b></span>
                	<div style="width: 100%;height: 1px;background: #CCCCCC;"></div>
                	<ul style="list-style: none;padding: 0;">
                		<li style="cursor:pointer;padding: 0.5em;border-bottom: 1px solid #CCCCCC;" @click="selectCourseLocal(index,item.id)" :style="[selectCourseLocalColor==index?selectCourseLocalBgActiveColorClass:selectCourseLocalBgDefaultColorClass]" v-for="(item,index) in nowLocalCourse">{{item.codeflagname}}</li>
                	</ul>
                	<div id=""  @click="backEnter()" style="text-align: center;background: #19568a;height: 35px;width: 40%;position: absolute;bottom: 1em;" :style="{'cursor': backEnterOnOrOff}">
                		<span style="color: white;font-size: 1.2em;line-height: 35px;">退报</span>
                	</div>
                	<div id="" @click="hideCourseLocal()" style="text-align: center;background: #19568a;height: 35px;width: 40%;position: absolute;right: 1em;bottom: 1em;cursor: pointer;">
                        <span style="color: white;font-size: 1.2em;line-height: 35px;" >取消</span>
                    </div>
                </div>
            </div>
        </div>-->
        <!--====遮罩层、微信公众号===-->
         <div  class="modal fade bs-example-modal-lg" v-bind:class="showCourseLocalCss" >
            <div style="width: 300px;height: 240px;background: white;position: absolute;top: 50%;left: 50%;margin-left: -150px;margin-top: -100px;padding: 1em;">
                <div id="" style="text-align: center;">
                    <span style="font-size: 1.2em;"><b>请微信关注以下公众号参与报名</b></span>
                    <img src="http://www.ecebs.eu/static/img/gzcode.png" style="width: 150px;height: 150px;"/>

                    <div id="" @click="hideCourseLocal()" style="text-align: center;background: #19568a;height: 35px;width: 80%;position: absolute;left:10%;bottom: 1em;cursor: pointer;">
                        <span style="color: white;font-size: 1.2em;line-height: 35px;" >关闭</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="padding-top: 100px;">
            <!--title-->
            <div style="text-align: center;font-size: 2.5em;font-family: '幼圆';color: white"><span>学院课程</span></div>
            <!--course list-->
            <div style="margin-top: 20px;">
                <div class="row">
                    <div class="col-sm-12 col-md-12" style="background: white;height: 400px;margin-bottom: 50px;padding: 0;overflow: hidden;" v-for="(item,index) in CourseList">
                        <!--course back-->
                        <div>
                            <img v-if="index%2==0" :src="CourseBackRightImgSrc" style="right:0;height: 400px;position: absolute;" />
                            <img v-else :src="CourseBackLeftImgSrc" style="left: 0;height: 400px;position: absolute;" />
                        </div>
                        <!-- horiz -->
                        <div v-if="index%2==0">
                            <div style="background: rgba(64,116,173,0.7);height: 40px;width: 100%;margin-top: 80px;position: absolute;"></div>
                            <div style="background: rgba(64,116,173,0.7);height: 80px;width: 90%;margin-top: 40px;position: absolute;left:-80px;transform: skew(-30deg, 0);"></div>
                            <!-- course title-->
                            <div id="" style="text-align: center;width: 100%;position: absolute;margin-top: 40px;margin-left: 100px;">
                                <router-link :to="{name:'CourseDetail',params:{id:item.id}}"><span style="display: block;font-size: 2.8em;font-family: '黑体';color: black;">{{item.name}}</span></router-link>
                                <span style="display: block;font-size: 1.1em;font-family: '微软雅黑';">欧洲华商商学院 第{{item.courses[0].period}}期</span>
                            </div>
                        </div>
                        <div v-else>
                            <div style="background: rgba(64,116,173,0.7);height: 40px;width: 100%;margin-top: 80px;position: absolute;"></div>
                            <div style="background: rgba(64,116,173,0.7);height: 80px;width: 90%;margin-top: 40px;position: absolute;right:-80px;transform: skew(30deg, 0);"></div>
                            <!-- course title-->
                            <div id="" style="text-align: center;width: 100%;position: absolute;margin-top: 40px;margin-left: -100px;">
                                <router-link :to="{name:'CourseDetail',params:{id:item.id}}"><span style="display: block;font-size: 2.8em;font-family: '黑体';color: black;">{{item.name}}</span></router-link>
                                <span style="display: block;font-size: 1.1em;font-family: '微软雅黑';">欧洲华商商学院 第{{item.courses[0].period}}期</span>
                            </div>
                        </div>
                        <!--expert img-->
                        <div id="">
                            <router-link :to="{name:'ExpertDetail', params: { id: item.teacherid }}" v-if="index%2==0"><img  :src="item.url" class="expert-img-class-left" /></router-link>
                            <router-link :to="{name:'ExpertDetail', params: { id: item.teacherid }}" v-else><img  :src="item.url" class="expert-img-class-right" /></router-link>
                        </div>
                        <!--course info right-->
                        <div v-if="index%2==0" class="right-course-div">
                            <span style="font-size: 2.8em;font-family: '黑体';">{{item.employer}}{{item.realname}}{{item.academic}}</span>
                            <p style="display: block;font-size: 1.2em;font-weight: 600;">开课时间：{{item.totalbegin}}</p>
                            <p style="display: block;font-size: 1.2em;font-weight: 600;">结束时间：{{item.totalend}}</p>
                            <div style="font-size: 1.5em;font-weight: 600;margin-top: 20px;position: relative;height: 1.8em;">
                                <span style="float: left;">课程地点及具体时间</span>
                                <div style="width: 40%;height: 5px;background: rgb(16,72,131);display: inline-block;"></div>
                                <div class="right-course-div-enlist">
                                    <div style="transform: skew(30deg, 0);position: relative;">
                                        <!--<span style="color: white;font-size: 0.7em;margin-left: 15px;line-height: 35px;float: left;cursor: pointer;" @click="showBackEnterF(item.courses)">退报名</span>-->
                                        <!--<div style="height: 30px;width: 0px;margin-left: 15px;border-left: 1px solid white;float: left;"></div>-->
                                        <!--<div style="color: white;font-size: 0.7em;text-align: center;line-height: 35px;" >-->
                                            <!--<span style="cursor: pointer;line-height: 35px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                                        <!--</div>-->
                                    </div>
                                </div>
                                <!--<div v-if="showBackEnter==index" style="position: absolute;z-index: 9;left: 64%;background: white;top: 20px;text-align: left;">
                                    <a style="font-size: 0.8em;display: block;cursor: pointer;font-weight: 100;" v-for="it in item.courses" @click="backEnter(it.id)">退报{{it.codeflagname}}</a>
                                </div>-->
                            </div>
                            <div style="width: 100%;height: 40px;background: rgb(16,72,131);position: relative;">
                                <div class="enlist-div" v-for="it in item.courses">
                                    <p style="text-align: center;line-height: 40px;color: white;" @click="showBackEnterF(1)">报名{{it.codeflagname}}</p>
                                </div>
                            </div>
                            <div id="">
                                <div style="width: 33.3%;height: 70px;position: relative;font-size: 1.3em;font-weight: bold;float: left;padding: 10px;" v-for="it in item.courses">
                                    <span style="display: block;text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="it.room">{{it.codeflagname}}：{{it.room}}</span>
                                    <span style="display: block;text-align: left;font-size: 1.0em;">{{it.time}}</span>
                                </div>
                            </div>
                        </div>
                        <!--course info left-->
                        <div v-else class="left-course-div">
                            <span style="font-size: 2.8em;font-family: '黑体';">{{item.employer}}{{item.realname}}{{item.academic}}</span>
                            <p style="display: block;font-size: 1.2em;font-weight: 600;">开课时间：{{item.totalbegin}}</p>
                            <p style="display: block;font-size: 1.2em;font-weight: 600;">结束时间：{{item.totalend}}</p>
                            <div style="font-size: 1.5em;font-weight: 600;margin-top: 20px;position: relative;height: 1.8em;">
                                <span style="float: right;">课程地点及具体时间</span>
                                <div class="left-course-div-enlist">
                                    <div style="transform: skew(-30deg, 0);position: relative;">
                                        <!--<div class="left-course-div-enlist-share" >
                                            <span style="cursor: pointer;line-height: 35px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        </div>-->
                                        <!--<div class="left-course-div-enlist-line"></div>-->
                                        <!--<span class="left-course-div-enlist-quit"></span>-->
                                    </div>
                                </div>
                                <!--<div v-if="showBackEnter==index" style="position: absolute;z-index: 9;left: 28%;background: white;top: 20px;    text-align: left;">
                                    <a style="font-size: 0.8em;display: block;cursor: pointer;font-weight: 100;" v-for="it in item.courses" @click="backEnter(it.id)">退报{{it.codeflagname}}</a>
                                </div>-->
                                <div style="width: 50%;height: 5px;background: rgb(16,72,131);display: inline-block;"></div>
                            </div>
                            <div style="width: 100%;height: 40px;background: rgb(16,72,131);position: relative;">
                                <div class="enlist-div" v-for="it in item.courses">
                                    <p style="text-align: center;line-height: 40px;color: white;" @click="showBackEnterF(1)">报名{{it.codeflagname}}</p>
                                </div>
                            </div>
                            <div id="">
                                <div style="width: 33.3%;height: 70px;position: relative;font-size: 1.3em;font-weight: bold;float: left;padding: 10px;" v-for="it in item.courses">
                                    <span style="display: block;text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="it.room">{{it.codeflagname}}：{{it.room}}</span>
                                    <span style="display: block;text-align: left;font-size: 1.0em;">{{it.time}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CourseBackRightImgSrc from '@/assets/course_back_right.png'
    import CourseBackLeftImgSrc from '@/assets/course_back_left.png'
    import { config } from '@/util/config.js'
    import { common } from '@/util/common.js'
    import TestImgSrc from '@/assets/test.png'
    export default {
        name: 'Course',
        data() {
            return {
                TestImgSrc: TestImgSrc,
                CourseBackRightImgSrc: CourseBackRightImgSrc,
                CourseBackLeftImgSrc: CourseBackLeftImgSrc,
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
                showBackEnter: -1,
                showBackEnterFlag: false,
                CourseList: [],
                backEnterOnOrOff:'pointer',
                //已报名的课程地点列表
                nowLocalCourse:[],
                //是否显示选择退报课程地点div
                courseLocalFlag:false,
                showCourseLocalCss: {
                    "in": false,
                    "showloading": false
                },
                courseLocalId:-1,
                selectCourseLocalColor:-1,
                selectCourseLocalBgDefaultColorClass:{
                    'background':'white',
                    'color':'black',
                },
                selectCourseLocalBgActiveColorClass:{
                    'background':'rgb(70, 51, 50)',
                    'color':'white',
                },
                
                
            }
        },
        methods: {
            showBackEnterF: function(courseLocalArrays) {
                this.selectCourseLocalColor=-1;
                this.showCourseLocal();
            },
            isShowNowEnlist: function(times) {
                if((new Date()).getTime() - times > 0) {
                    if(((new Date()).getTime() - times) / 3600000 / 24 > 1) {
                        return false;
                    }
                }
                return true;
            },
            /**
             * 根据索引获取主体数据
             */
            getMainData: function() {
                var _self = this;
                this.showLoading();
                $.ajax({
                    url: config.IP + "/getCourse",
                    type: "get",
                    success: function(response) {
                        if((typeof response) != 'object') {
                            response = JSON.parse(response)
                        }
                        _self.CourseList = response.objectList;
                        _self.hideLoading();
                    },
                    error: function(data, message) {
                        _self.hideLoading();
                    }
                })

            },
            backEnter: function() {
                if(common.token != null) {
                    if(this.selectCourseLocalColor==-1){
                        alert('请选择退报地点!');
                        return;
                    }
                    var _self = this;
                    this.hideCourseLocal();
                    this.showLoading();
                    $.ajax({
                        //几个参数需要注意一下
                        type: "POST", //方法类型
                        url: config.IP + "/enlist/backEnlist",
                        data: {
                            uid: common.token.id,
                            cid: this.courseLocalId
                        },
                        success: function(result) {
                            result = JSON.parse(result)
                            if(result.flag == 1) {
                                _self.showBackEnter = -1;
                                alert("退报成功！");
                            }
                            _self.hideLoading();
                        },
                        error: function() {
                            _self.hideLoading();
                        }
                    });
                } else {
                    this.showBackEnter = -1;
                    this.hideCourseLocal();
                    alert("请先登录！")
                }
            },
            /**
             * 立即报名
             * @param {Object} index
             */
            nowEnter: function(index, times) {
                if(!this.isShowNowEnlist(times)) {
                    alert("报名时间已过！")
                    return;
                }
                if(common.token != null) {
                    if(common.identityFlag == "1") {
                        alert("您的身份为金牌专家，不能进行报名！");
                        return;
                    }
                    var _self = this;
                    this.showLoading();
                    $.ajax({
                        url: config.IP + "/enlist/insertEnlist",
                        data: {
                            courseid: index,
                            userid: common.token.id
                        },
                        type: "post",
                        success: function(data) {
                            data = JSON.parse(data);
                            if(data.flag == 1) {
                                alert("报名成功");
                            } else if(data.flag == -2) {
                                alert("您已经报名此课程!");
                            } else {
                                alert("报名失败");
                            }

                            _self.hideLoading();
                        },
                        error: function(data, message) {
                            console.log(message)
                            _self.hideLoading();
                        }
                    })
                } else {
                    this.$router.push("/login")
                }
            },
            shareEnter:function(){
                alert("暂未开放！")
            },
            /**
             * 隐藏加载中页面
             */
            hideLoading: function() {
                this.showLoadingCss.in = false;
                this.showLoadingCss.showloading = false;
            },
            /**
             * 显示加载中页面
             */
            showLoading: function() {
                this.showLoadingCss.in = true;
                this.showLoadingCss.showloading = true;
            },
            hideCourseLocal:function(){
                this.showCourseLocalCss.in = false;
                this.showCourseLocalCss.showloading = false;
            },
            showCourseLocal:function(){
                this.showCourseLocalCss.in = true;
                this.showCourseLocalCss.showloading = true;
            },
            selectCourseLocal:function(index,cid){
                this.courseLocalId=cid;
                this.selectCourseLocalColor=index;
            }
        },
        created() {
            this.getMainData();
        },
        mounted() {

        },
        computed: {},
    }
</script>

<style scoped>
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
        margin-left: 30%;
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
        content: '>>';
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
    
    @media only screen and (max-width:1200px) {
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
    
    @media only screen and (max-width:992px) {
        .col-sm-12,
        .col-md-12 {
            width: 992px;
        }
    }
</style>
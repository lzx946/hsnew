<template>
    <div id="swiper_id">
        <!--====遮罩层、加载中===-->
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <!--====遮罩层、退报===-->
        <!--<div class="modal fade bs-example-modal-lg" v-bind:class="showCourseLocalCss">
            <div style="width: 300px;height: 240px;background: white;position: absolute;top: 50%;left: 50%;margin-left: -150px;margin-top: -100px;padding: 1em;">
                <div id="">
                    <span style="font-size: 1.2em;"><b>选择退报的课程</b></span>
                    <div style="width: 100%;height: 1px;background: #CCCCCC;"></div>
                    <ul style="list-style: none;padding: 0;">
                        <li style="cursor:pointer;padding: 0.5em;border-bottom: 1px solid #CCCCCC;" @click="selectCourseLocal(index,item.id)" :style="[selectCourseLocalColor==index?selectCourseLocalBgActiveColorClass:selectCourseLocalBgDefaultColorClass]" v-for="(item,index) in nowLocalCourse">{{item.codeflagname}}</li>
                    </ul>
                    <div id="" @click="backEnter()" style="text-align: center;background: #19568a;height: 35px;width: 40%;position: absolute;bottom: 1em;" :style="{'cursor': backEnterOnOrOff}">
                        <span style="color: white;font-size: 1.2em;line-height: 35px;">退报</span>
                    </div>
                    <div id="" @click="hideCourseLocal()" style="text-align: center;background: #19568a;height: 35px;width: 40%;position: absolute;right: 1em;bottom: 1em;cursor: pointer;">
                        <span style="color: white;font-size: 1.2em;line-height: 35px;">取消</span>
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
        <!--swiper-->
        <div class="swiper-container swiper-v" :style="{'height':heightBrower+'px'}">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="font-div-class">
                        <b><span class="font-span-class" >欧洲华商商学院</span></b>
                        <b><span class="font-span-class">华商自己的商学院</span></b>
                    </div>
                    <img :src="HomeImgSrc" class="home-back-img-class" />
                    <div class="xiala-div-class" @click="nextSwiper()">
                        <img :src="XialaImgSrc" class="xiala-class" />
                    </div>

                </div>
                <div class="swiper-slide">
                    <div class="swiper-container swiper-h" :style="{'height':heightBrower+'px'}" style="background: rgb(70,51,50);">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in CourseList">
                                <!--<div style="background: black; height: 500px; width: 1800px;"></div>-->
                                <div class="" style="text-align: left;width: 1200px;">
                                    <!--title-->
                                    <div style="text-align: center;font-size: 2.5em;font-family: '幼圆';color: white;margin-top: -50px;"><span>学院课程</span></div>
                                    <!--course list-->
                                    <div style="margin-top: 70px;">
                                        <div class="row">
                                            <div class="col-sm-12 col-md-12" style="background: white;height: 400px;margin-bottom: 50px;padding: 0;overflow: hidden;">
                                                <!--course back-->
                                                <div>
                                                    <img :src="CourseBackImgSrc" style="opacity: 0.2;right:0;height: 400px;position: absolute;" />
                                                </div>
                                                <!-- horiz -->
                                                <div>
                                                    <div style="background: rgba(64,116,173,0.7);height: 40px;width: 100%;margin-top: 80px;position: absolute;"></div>
                                                    <div style="background: rgba(64,116,173,0.7);height: 80px;width: 90%;margin-top: 40px;position: absolute;left:-80px;transform: skew(-30deg, 0);"></div>
                                                    <!-- course title-->
                                                    <div id="" style="text-align: center;width: 100%;position: absolute;margin-top: 40px;">
                                                        <router-link :to="{name:'CourseDetail',params:{id:item.id}}"><span style="display: block;font-size: 2.8em;font-family: '黑体';color: black;">{{item.name}}</span></router-link>
                                                        <span style="display: block;font-size: 1.1em;font-family: '微软雅黑';">欧洲华商商学院 第{{item.courses[0].period}}期</span>
                                                    </div>
                                                </div>
                                                <!--expert img-->
                                                <div id="">
                                                    <img :src="item.url" class="expert-img-class-left" />
                                                </div>
                                                <!--course info right-->
                                                <div class="right-course-div">
                                                    <span style="font-size: 2.8em;font-family: '黑体';">{{item.employer}}{{item.realname}}{{item.academic}}</span>
                                                    <p style="display: block;font-size: 1.2em;font-weight: 600;">开课时间：{{item.totalbegin}}</p>
                                                    <p style="display: block;font-size: 1.2em;font-weight: 600;">结束时间：{{item.totalend}}</p>
                                                    <div style="font-size: 1.5em;font-weight: 600;margin-top: 20px;position: relative;height: 1.8em;">
                                                        <span style="float: left;">课程地点及具体时间</span>
                                                        <div style="width: 40%;height: 5px;background: rgb(16,72,131);display: inline-block;"></div>
                                                        <div class="right-course-div-enlist">
                                                            <div style="transform: skew(30deg, 0);position: relative;">
                                                                <!--<span style="color: white;font-size: 0.7em;margin-left: 15px;line-height: 35px;float: left;cursor: pointer;" @click="showBackEnterF(item.courses)">退报名</span>-->
                                                                <!--<div style="height: 30px;width: 0px;margin-left: 15px;border-left: 1px solid white;float: left;"></div>
                                                                <div style="color: white;font-size: 0.7em;text-align: center;line-height: 35px;">
                                                                    <span style="cursor: pointer;line-height: 35px;" @click="shareBack()">分享报名</span>
                                                                </div>-->
                                                            </div>
                                                        </div>
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
                        </div>
                        <div class="xiala-div-class" @click="nextSwiper()">
                            <img :src="XialaImgSrc" class="xiala-class" />
                        </div>
                        <!-- Add Arrows -->
                        <div class="swiper-button-next" :style="{'background-image':'url('+NextImgSrc+')'}"></div>
                        <div class="swiper-button-prev" :style="{'background-image':'url('+PreImgSrc+')'}"></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="container" style="text-align: left;margin: 0;">
                        <!--title-->
                        <div style="text-align: center;font-size: 2.5em;font-family: '幼圆';color: white;margin-top: 25px;"><span>名师教授</span></div>
                        <!--expert list-->
                        <div style="margin-top: 0px;">
                            <div class="row">
                                <div class="col-sm-6 col-md-4" v-for="item in ExpertList">
                                    <div class="thumbnail border-shadow-set" style="font-weight: bold;">
                                        <div style="overflow: hidden;">
                                            <router-link :to="{name:'ExpertDetail', params: { id: item.id }}"><img :src="item.url" class="photo-img-size-expert"></router-link>
                                        </div>
                                        <div class="caption">
                                            <p class="text-overtop-ellipsis">姓名：{{item.realname}}&nbsp;&nbsp;职称：{{item.academic}}&nbsp;&nbsp;单位：{{item.employer}}</p>
                                            <p>个人简介:</p>
                                            <p class="text-overtop-ellipsis">&nbsp{{item.summarys}}</p>
                                        </div>
                                        <div style="height: 10px;background: rgb(255,195,0);"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="xiala-div-class" @click="nextSwiper()">
                        <img :src="XialaImgSrc" class="xiala-class" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="container" style="text-align: left;margin: 0;">
                        <!--title-->
                        <div style="text-align: center;font-size: 2.5em;font-family: '幼圆';color: white;margin-top: -50px;"><span>热点新闻</span></div>
                        <!--news list-->
                        <div style="margin-top: 70px;">
                            <div class="row">
                                <div class="col-sm-6 col-md-4" v-for="(item,index) in NewsList">
                                    <div class="thumbnail border-shadow-set" style="overflow: hidden;border: 0;">
                                        <div style="overflow: hidden;">
                                            <router-link :to="{name:'NewsDetail',params: {id:item.id}}"><img :src="defalutNewsImg(item.url)" class="photo-img-size"></router-link>
                                        </div>
                                        <div :class="{'rotate-r9':index%2==0,'rotate-9':index%2!=0}"></div>
                                        <div style="position: absolute;height: 22%;background: #FFFFFF;width: 100%;bottom: 0;padding:5px;">
                                            <span style="font-family:'微软雅黑';margin-top:5px;display: block;font-size: 1.5em;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" :title="item.title">{{item.title}} </span>
                                            <span style="position: absolute;bottom: 2px;font-size: 1.2em;font-family: '幼圆';">发布时间:{{item.newsTime}}</span>
                                        </div>
                                        <div :class="{'skew-style-r9':index%2==0,'skew-style-9':index%2!=0}"></div>
                                    </div>
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
    import HomeImgSrc from '@/assets/back1.png'
    import XialaImgSrc from '@/assets/xiala.png'
    import PreImgSrc from '@/assets/left_flag.png'
    import NextImgSrc from '@/assets/right_flag.png'
    import CourseBackImgSrc from '@/assets/course_back_right.png'
    import NewsDefaultImgSrc from '@/assets/news_default.png'
    import TestImgSrc from '@/assets/test.png'
    import { config } from '@/util/config.js'
    import { common } from '@/util/common.js'

    export default {
        name: 'Home',
        data() {
            return {
                HomeImgSrc: HomeImgSrc,
                XialaImgSrc: XialaImgSrc,
                PreImgSrc: PreImgSrc,
                NextImgSrc: NextImgSrc,
                heightBrower: common.heightBrower,
                TestImgSrc: TestImgSrc,
                NewsDefaultImgSrc: NewsDefaultImgSrc,
                CourseBackImgSrc: CourseBackImgSrc,
                CourseList: [],
                ExpertList: [],
                NewsList: [],
                showBackEnter: -1,
                showBackEnterFlag: false,
                swiper: '',
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
                showCourseLocalCss: {
                    "in": false,
                    "showloading": false
                },
                backEnterOnOrOff: 'pointer',
                //已报名的课程地点列表
                nowLocalCourse: [],
                //是否显示选择退报课程地点div
                courseLocalFlag: false,
                courseLocalId: -1,
                selectCourseLocalColor: -1,
                selectCourseLocalBgDefaultColorClass: {
                    'background': 'white',
                    'color': 'black',
                },
                selectCourseLocalBgActiveColorClass: {
                    'background': 'rgb(70, 51, 50)',
                    'color': 'white',
                },
                swiper1: '',
            }
        },
        methods: {
            /**
             * 若图片错误，则使用默认图片
             * @param {Object} imgUrl
             */
            defalutNewsImg: function(imgUrl) {
                return(imgUrl == undefined || imgUrl == null) ? this.NewsDefaultImgSrc : imgUrl;
            },
            shareBack:function(){
              alert("暂未开放~");  
            },
            backEnter: function(index) {
                var _self = this;
                if(common.token == null) {
                    this.showCourseLocalCss.in = false;
                    this.showCourseLocalCss.showloading = false;
                    alert("请先登录.");
                    return;
                }
                this.showLoading();
                $.ajax({
                    //几个参数需要注意一下
                    type: "POST", //方法类型
                    url: config.IP + "/enlist/backEnlist",
                    data: {
                        uid: common.token.id,
                        cid: index
                    },
                    success: function(result) {
                        result = JSON.parse(result)
                        if(result.flag == 1) {
                            alert("退报成功！");
                            _self.showBackEnter = false;
                        }
                        _self.hideLoading();
                    },
                    error: function() {
                        _self.hideLoading();
                    }
                });
            },
            showCourseLocal: function() {
                this.showCourseLocalCss.in = true;
                this.showCourseLocalCss.showloading = true;
            },
            selectCourseLocal: function(index, cid) {
                this.courseLocalId = cid;
                this.selectCourseLocalColor = index;
            },
            hideCourseLocal: function() {
                this.showCourseLocalCss.in = false;
                this.showCourseLocalCss.showloading = false;
            },
            showBackEnterF: function(courseLocalArrays) {

                this.selectCourseLocalColor = -1;
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
            nextSwiper: function() {
                this.swiper.slideNext();
            },
            /**
             * 获取主体数据
             */
            getMainData: function() {
                var _self = this;
                this.showLoading();
                //              $.ajax({
                //                  url: config.IP + "/homeBackfroud",
                //                  type: "get",
                //                  success: function(response) {
                //                      if((typeof response) != 'object') {
                //                          response = JSON.parse(response)
                //                      }
                //                      
                //                      
                //                  },
                //                  error: function(data, message) {
                //                      _self.hideLoading();
                //                  }
                //              })
                $.ajax({
                    url: config.IP + "/getCourse",
                    type: "get",
                    success: function(response) {
                        if((typeof response) != 'object') {
                            response = JSON.parse(response)
                        }
                        _self.CourseList = response.objectList;
                        _self.hideLoading();
                        $.ajax({
                            url: config.IP + "/expert/getExpertlist",
                            type: "get",
                            success: function(response) {
                                if((typeof response) == 'string') {
                                    response = JSON.parse(response)
                                }
                                for(let i = 0; i < response.objectList.length; i++) {
                                    _self.ExpertList.push(response.objectList[i]);
                                    if(i == 2) {
                                        break;
                                    }
                                }
                                _self.hideLoading();
                                $.ajax({
                                    url: config.IP + "/news/getNewslist",
                                    type: "get",
                                    success: function(response) {
                                        response = JSON.parse(response);
                                        for(let i = 0; i < response.objectList.length; i++) {
                                            _self.NewsList.push(response.objectList[i]);
                                            if(i == 2) {
                                                break;
                                            }
                                        }
                                        _self.hideLoading();
                                        _self.swiper = new Swiper('.swiper-v', {
                                            direction: 'vertical',
                                            centeredSlides: true,
                                            slidesPerView: 1,
                                            mousewheel: true,
                                        });
                                        _self.swiper1 = new Swiper('.swiper-h', {
                                            centeredSlides: true,
                                            slidesPerView: 1,
                                            navigation: {
                                                nextEl: '.swiper-button-next',
                                                prevEl: '.swiper-button-prev',
                                            },
                                        });
                                    },
                                    error: function(data, message) {
                                        _self.hideLoading();
                                    }
                                })
                            },
                            error: function(data, message) {
                                _self.hideLoading();
                            }
                        })
                    },
                    error: function(data, message) {
                        _self.hideLoading();
                    }
                })

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
                    var _self = this;
                    if(common.identityFlag == "1") {
                        alert("您的身份为金牌专家，不能进行报名！");
                        return;
                    }
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
            }
        },

        mounted() {

            this.getMainData();
        }
    }
</script>

<style scoped>
    .swiper-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .font-span-class {
        font-size: 5em;
        color: white;
        display: block;
        letter-spacing: 10px;
    }
    
    .home-back-img-class {
        min-height: 768px;
        height: 100%;
        width: 100%;
    }
    
    .home-back-img-class:after {
        display: block;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        content: "";
    }
    
    @keyframes xiala {
        0% {
            bottom: 30px;
        }
        100% {
            bottom: 10px;
        }
    }
    /* Firefox */
    
    @-moz-keyframes xiala {
        0% {
            bottom: 30px;
        }
        100% {
            bottom: 10px;
        }
    }
    /* Safari 和 Chrome */
    
    @-webkit-keyframes xiala {
        0% {
            bottom: 30px;
        }
        100% {
            bottom: 10px;
        }
    }
    /* Opera */
    
    @-o-keyframes xiala {
        0% {
            bottom: 30px;
        }
        100% {
            bottom: 10px;
        }
    }
    
    .xiala-div-class {
        z-index: 1;
        animation: xiala 0.9s linear 0.7s infinite alternate;
        /* Firefox: */
        -moz-animation: xiala 0.9s linear 0.7s infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: xiala 0.9s linear 0.7s infinite alternate;
        /* Opera: */
        -o-animation: xiala 0.9s linear 0.7s infinite alternate;
        position: absolute;
        left: 50%;
        bottom: 30px;
        margin-left: -50px;
        transition: 0.3s;
        /* Firefox 4 */
        -moz-transition: 0.3s;
        /* Safari 和 Chrome */
        -webkit-transition: 0.3s;
        /* Opera */
        -o-transition: 0.3s;
    }
    
    .font-div-class {
        position: absolute;
        bottom: 40%;
        width: 100%;
        transition: 0.3s;
        /* Firefox 4 */
        -moz-transition: 0.3s;
        /* Safari 和 Chrome */
        -webkit-transition: 0.3s;
        /* Opera */
        -o-transition: 0.3s;
    }
    
    .xiala-class {
        height: 100px;
        cursor: pointer;
    }
    
    .xiala-div-class:hover {
        bottom: 20px;
    }
    
    .swiper-slide {
        width: 100%;
        text-align: center;
        font-size: 14px;
        background: rgb(70, 51, 50);
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    
    .tsama-home-img {}
    
    @media screen and (max-width:1350px) {
        .home-back-img-class {
            width: 1600px;
            margin-left: -150px;
        }
        .font-span-class {
            font-size: 3.5em;
            letter-spacing: 10px;
        }
    }
    
    @media screen and (max-width:1150px) {
        .home-back-img-class {
            margin-left: -250px;
        }
        .font-span-class {
            font-size: 3.2em;
            letter-spacing: 10px;
        }
    }
    
    @media screen and (max-width:950px) {
        .home-back-img-class {
            margin-left: -350px;
        }
        .font-span-class {
            font-size: 2.8em;
            letter-spacing: 10px;
        }
    }
    
    @media screen and (max-width:750px) {
        .home-back-img-class {
            margin-left: -450px;
        }
        .font-span-class {
            font-size: 1.6em;
            letter-spacing: 10px;
        }
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
        right: 20%;
        transition: 0.5s;
    }
    
    .enlist-div:hover p {
        padding-right: 25px;
    }
    
    .enlist-div:hover p:after {
        opacity: 1;
        right: 30%;
    }
    
    #course_list_id {
        min-width: 993px;
    }
    
    .swiper-wrapper {
        width: 100%;
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
    /*expert*/
    
    .photo-img-size-expert {
        transition: all 0.9s;
        height: 500px;
    }
    
    @media screen and (max-width: 1200px) {
        .photo-img-size-expert {
            height: 370px;
        }
    }
    
    @media screen and (max-width: 992px) {
        .photo-img-size-expert {
            height: 450px;
        }
    }
    
    @media screen and (max-width: 400px) {
        .photo-img-size-expert {
            height: 420px;
        }
    }
    
    .text-overtop-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .border-shadow-set {
        padding: 0;
        border-radius: 0;
        box-shadow: 5px 5px 30px #000;
    }
    
    .photo-img-size-expert:hover {
        cursor: pointer;
        transform: scale(1.05);
        -ms-transform: scale(1.05);
        -webkit-transform: scale(1.05);
        -o-transform: scale(1.05);
        -moz-transform: scale(1.05);
    }
    /*********************/
    /*news */
    
    .skew-style-r9 {
        position: absolute;
        bottom: 28%;
        width: 100%;
        height: 4%;
        background: rgba(27, 245, 242, 0.64);
        -webkit-transform: skew(0, -7deg);
        -moz-transform: skew(0, -7deg);
        transform: skew(0, -7deg);
    }
    
    .skew-style-9 {
        position: absolute;
        bottom: 28%;
        width: 100%;
        height: 4%;
        background: rgba(27, 245, 242, 0.64);
        -webkit-transform: skew(0, 7deg);
        -moz-transform: skew(0, 7deg);
        transform: skew(0, 7deg);
    }
    
    .rotate-r9 {
        position: absolute;
        height: 16%;
        background: white;
        width: 120%;
        bottom: 15.5%;
        transform: rotate(-7deg);
        -ms-transform: rotate(-7deg);
        /* Internet Explorer */
        -moz-transform: rotate(-7deg);
        /* Firefox */
        -webkit-transform: rotate(-7deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(-7deg);
        /* Opera */
    }
    
    .rotate-9 {
        position: absolute;
        height: 16%;
        background: white;
        width: 120%;
        left: -10px;
        bottom: 13%;
        transform: rotate(7deg);
        -ms-transform: rotate(7deg);
        /* Internet Explorer */
        -moz-transform: rotate(7deg);
        /* Firefox */
        -webkit-transform: rotate(7deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(7deg);
        /* Opera */
    }
    
    .photo-img-size {
        width: 100%;
        height: 320px;
        transition: all 0.9s;
    }
    
    .text-overtop-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .border-shadow-set {
        position: relative;
        padding: 0;
        border-radius: 0;
        box-shadow: 5px 5px 30px #000;
    }
    
    .photo-img-size:hover {
        cursor: pointer;
        transform: scale(1.05);
        -ms-transform: scale(1.05);
        -webkit-transform: scale(1.05);
        -o-transform: scale(1.05);
        -moz-transform: scale(1.05);
    }
    /*****************/
</style>
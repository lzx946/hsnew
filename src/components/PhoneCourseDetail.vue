<template>
    <div id="course_list_id" style="background: white;width: 100%;height: 100%;min-height: 1000px;">
        <!--====遮罩层、加载中===-->
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <a id="f" name="f">&nbsp;</a>
        <div class="container" style="padding-top: 50px;">
            <!--title-->
            <div style="text-align: center;font-size: 2.5em;font-family: '幼圆';color: #000"><span>学院课程</span></div>
            <!--course detail-->
            <div class="course-detail-class border-shadow-set">
                <div id="course_detail_top_part_id">
                    <div id="course_detail_top_img_part_id" style="float: left;">
                        <img :src="courseInfo.url" class="photo-img-size-course" />
                    </div>
                    <div id="course_detail_top_right_part_id" class="course-detail-coursename-div-class">
                        <div id="course_detail_top_right_coursename_part_id" style="height:70px;width: 100%;text-align: center;">
                            <br />
                            <p style="margin-left: 5%;font-size: 1.2em;margin-top: -5px;"><b>“ {{courseInfo.name}} ”</b></p><br />
                            <p style="margin-left: 25%;font-size: 1em;margin-top: -20px;">欧洲华商商学院&nbsp; 第{{period}}期</p>
                            <div style="text-align: left;margin-top: 10px;" class="text-overtop-ellipsis"><span style="font-size: 1.3em;margin-left: 10px;">{{courseInfo.employer}}<br />&nbsp;&nbsp;<router-link :to="{name:'PhoneExpertDetail', params: { id: courseInfo.teacherid }}">{{courseInfo.realname}}{{courseInfo.academic}}</router-link></span></div>
                        </div>
                    </div>
                    <div id="course_detail_top_right_courseinfo_part_id" style="height: 100%;">
                        <div style="padding-top: 10px;text-align: left;"><span style="font-size: 1.1em;">开课时间：{{courseInfo.totalbegin}}<br />结束时间：{{courseInfo.totalend}}</span></div>
                        <div style="margin-top: 10px;text-align: left;"><span style="font-size: 1.2em;border-bottom: 2px solid rgb(16,72,131);">课程地点及具体时间</span></div>
                        <div id="" style="font-size: 1.2em;margin-top: 10px;">
                            <div style="width: 100%;height: 100px;padding: 2%;margin-top: 3%;" v-for="item in courseInfo.courses">
                                <p style=""><b>{{item.codeflagname}}:</b>{{item.room}}</p>
                                <p style="text-align: left;">{{item.time}}</p>
                                <!--<div class="enlist-div-class" @click="nowEnter(item.id,item.endtime)">
                                    <p>报名{{item.codeflagname}}</p>
                                </div>-->
                                <div id="" style="width: 100%;height: 5px;margin: 5px;">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="" style="padding-top: 20px;width: 100%;height: 35px;padding-bottom: 30px;border-right: 4px solid rgb(16,72,131);">
                    <span style="border-bottom: 2px solid rgb(16,72,131);font-size: 1.2em;">课程内容</span>
                </div>
                <div id="course_detail_bottom_part_id" style="border: 4px solid rgb(16,72,131);border-top: none;padding: 1em;padding-top: 0;">
                    <div id="" style="text-indent: 20px;padding-top: 10px;">
                        <span v-html="courseInfo.summary"></span>
                    </div>
                </div>

                <div id="" style="margin-top: 20px;">
                    <!--<div class="enlist-div-class" style="width: 200px;float: left;margin-left: 35%;font-size: 1.2em;" @click="shareEnter()">
                        <p>分享报名</p>
                    </div>
                    <div class="enlist-div-class" style="width: 100px;margin-left: 55%;background: transparent;" @click="showBackEnterFlag=!showBackEnterFlag">-->
                    <!--<span>退报名</span>-->
                    <!--</div>-->
                    <!--<div v-if="showBackEnterFlag" style="position: absolute;z-index: 9;left: 28%;background: white;top: 20px;">
                        <a style="font-size: 0.8em;display: block;cursor: pointer;font-weight: 100;" v-for="it in courseInfo.courses" @click="backEnter(it.id)">退报{{it.codeflagname}}</a>
                    </div>-->
                </div>
            </div>
            <div class="border-shadow-set" style="height: 200px;margin-top: 20px;padding: 20px;">
                <div id="">
                    <span style="font-size: 1.5em;">评论课程</span>
                    <div>
                        <textarea style="border: 2px solid rgb(16,72,131); width: 100%;height: 100px;" v-model="commentMd">
                            {{commentMd}}
                	    </textarea>
                    </div>
                    <div class="enlist-div-class" style="width: 150px;height: 35px;float: right;" @click="submitComment()">
                        <p>发表评论</p>
                    </div>
                </div>
            </div>
            <div class="border-shadow-set" style="margin-top: 20px;padding: 20px;margin-bottom: 20px;">
                <div style="position: relative;">
                    <span style="font-size: 1.5em;">评论列表</span>
                    <div style="border: 2px solid rgb(16, 72, 131); padding: 20px;">
                        <div v-cloak v-for="item in commentInfo">
                            <div style="float: left;">
                                <img :src="item.imgUrl" style="height: 60px;border-radius: 50%;width: 60px" />
                            </div>
                            <div style="margin-left: 80px;">
                                <span style="font-size: 1.1em;color: #9a9a9a;"><b>{{item.commentName}}</b></span>
                                <p style="margin-top: 20px;text-indent: 2em;">{{item.content}}</p>
                                <p style="color: #9a9a9a;font-size: 0.9em;margin-top: 20px;">{{item.createTimeStr.split(" ")[0]}}</p>
                            </div>
                            <div class="tsama-line"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="" style="height: 50px;width: 100%;">
            &nbsp;
        </div>
    </div>
</template>

<script>
    import HomeImgSrc from '@/assets/itback.jpg'
    import TestImgSrc from '@/assets/test.png'
    import LogoBackImgSrc from '@/assets/logo400x400.png'
    import { config } from '@/util/config.js'
    import { common } from '@/util/common.js'
    export default {
        name: 'CourseDetail',
        data() {
            return {
                HomeImgSrc: HomeImgSrc,
                TestImgSrc: TestImgSrc,
                LogoBackImgSrc: LogoBackImgSrc,
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
                courseInfo: "",
                commentInfo: [],
                showBackEnter: -1,
                showBackEnterFlag: true,
                commentMd: "",
                period: 0,
                wordNum: 300,
            }
        },
        methods: {
            shareEnter: function() {
                alert("暂未开放！")
            },
            nowEnter: function(index, times) {
                if(!this.isShowNowEnlist(times)) {
                    alert("报名时间已过！")
                    return;
                }
                if(common.token != null) {
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
                    this.$router.push("/phone/login")
                }
            },
            /**
             * 根据索引获取主体数据
             */
            getMainData: function() {
                var _self = this;
                var cid = this.$route.params.id;
                this.showLoading();
                $.ajax({
                    url: config.IP + "/getCourseDetail?id=" + cid,
                    type: "get",
                    success: function(response) {
                        if((typeof response) != 'object') {
                            response = JSON.parse(response)
                        }

                        _self.courseInfo = response.objectList[0];
                        _self.period = _self.courseInfo.courses[0].period;
                        _self.hideLoading();
                        //请求课程评论数据
                        $.ajax({
                            url: config.IP + "/comment?cid=" + cid,
                            type: "get",
                            success: function(response) {
                                if((typeof response) != 'object') {
                                    response = JSON.parse(response)
                                }
                                _self.commentInfo = response;
                                _self.hideLoading();
                                window.location.hash = "#f";
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
            isShowNowEnlist: function(times) {
                if((new Date()).getTime() - times > 0) {
                    if(((new Date()).getTime() - times) / 3600000 / 24 > 1) {
                        return false;
                    }
                }
                return true;
            },
            submitComment: function() {
                var _self = this;
                if(common.token == null) {
                    alert("请先登录")
                    return;
                }
                if(common.identityFlag == "1") {
                    alert("您的身份为金牌专家，不能进行评论");
                    return;
                }
                if(this.commentMd.trim().length <= 0) {
                    return;
                }
                this.showLoading();
                var cid = this.$route.params.id;
                $.ajax({
                    url: config.IP + "/commentSubmit",
                    data: {
                        cid: this.courseInfo.id,
                        uid: common.token.id,
                        content: this.commentMd
                    },
                    type: "post",
                    success: function(data) {
                        if(data != 0) {
                            //请求课程评论数据
                            $.ajax({
                                url: config.IP + "/comment?cid=" + cid,
                                type: "get",
                                success: function(response) {
                                    _self.commentInfo = response;
                                    _self.hideLoading();
                                },
                                error: function(data, message) {
                                    _self.hideLoading();
                                }
                            })
                            alert("评论成功！");
                        }
                        _self.hideLoading();
                    },
                    error: function(data, message) {
                        console.log(message)
                        _self.hideLoading();
                    }
                })

            },
            wordListen: function() {
                this.wordNum = 300 - this.commentMd.length;
            },
            /**
             * 返回上一页
             */
            back: function() {
                window.history.back();
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
        created() {
            this.getMainData();
            common.isLogin();
        }
    }
</script>

<style scoped>
    .tsama-line {
        margin: 1.6em 0;
        height: 1px;
        border: 1px solid #ECECEC;
    }
    
    .comment-course-div {
        margin-top: 50px;
        height: 150px;
        border: 4px solid rgb(16, 72, 131);
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
    
    p {
        margin-bottom: 5px;
    }
    
    .course-detail-class {
        border: 1px solid #CCCCCC;
        min-height: 500px;
        margin-top: 10px;
        padding: 20px;
    }
    
    .photo-img-size-course {
        height: 150px;
        width: 110px;
    }
    
    .course-detail-coursename-div-class {
        height: 150px;
        border-right: 4px solid rgb(16, 72, 131);
        border-top: 4px solid rgb(16, 72, 131);
    }
    
    #course_detail_top_right_courseinfo_part_id {
        border-right: 4px solid rgb(16, 72, 131);
    }
    
    @media screen and (max-width: 1200px) {}
    
    @media screen and (max-width: 992px) {}
    
    @media screen and (max-width: 430px) {}
    
    .text-overtop-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .border-shadow-set {
        border-radius: 0;
        box-shadow: 0px 0px 10px dimgray;
    }
</style>
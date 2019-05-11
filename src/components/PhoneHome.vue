<template>
    <div id="swiper_id" style="background: rgb(70, 51, 50);">
        <!--====遮罩层、加载中===-->
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <div v-if="homeType != 'list'" style="padding-top: 100px;margin-bottom:20px;text-align: center;font-size: 2.5em;font-family: '幼圆';color: white"><span>学院课程</span></div>
        <!-- 课程 -->
        <Curriculum :CourseList="CourseList"></Curriculum>
        <p style="height: 40px;"></p>
    </div>
</template>

<script>
    import HomeImgSrc from '@/assets/back1.png'
    import XialaImgSrc from '@/assets/xiala.png'
    import PreImgSrc from '@/assets/left_flag.png'
    import NextImgSrc from '@/assets/right_flag.png'
    import CourseBackImgSrc from '@/assets/course_back_right.png'
    import NewsDefaultImgSrc from '@/assets/news_default.png'
    import Curriculum  from '@/components/curriculum'
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
                swiper1: '',
                homeType: this.$route.query.type || ''
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
            backEnter: function(index) {
                var _self = this;
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
            showBackEnterF: function(index) {

                if(this.showBackEnter == index) {
                    this.showBackEnter = -1;
                } else {
                    this.showBackEnter = index
                }

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
                    this.$router.push("/phone/login")
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
        components: {
            Curriculum
        },
        mounted() {
            this.getMainData()
        }
    }
</script>

<style scoped>

</style>
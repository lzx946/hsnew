<template>
    <div id="expert_list_id" style="background: white;width: 100%;height: 100%;min-height: 1000px;">
        <!--====遮罩层、加载中===-->
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <div class="container" style="padding-top: 10px;position: relative;">
            <!--title-->
            <!--news detail-->
            <div class="news-detail-div">
                <div class="pc-class" style="overflow: hidden;">
                    <span style="font-family:'微软雅黑';margin-top:5px;display: block;font-size: 1.6em;">{{newsInfo.title}}</span>
                    <span style="font-size: 1.2em;font-family: '幼圆';display: block;margin-top: 20px;">发布时间:{{newsInfo.newsTime}}</span>
                    <span id="content_news" style="display: block;text-align: left;font-size: 1.2em;margin-top: 30px;" v-html="newsInfo.content"></span>

                </div>
            </div>
            <!--<div id="" class="pc-style">
                <div style="position: absolute;top: 195px;">
                    <img :src="defalutNewsImg(newsInfo.url)" class="img-style" />
                </div>
            </div>-->

        </div>
        <p>
            </br>
            </br>
        </p>
    </div>
</template>

<script>
    import HomeImgSrc from '@/assets/itback.jpg'
    import NewsDefaultImgSrc from '@/assets/news_default.png'
    import { config } from '@/util/config.js'
    import { common } from '@/util/common.js'
    export default {
        name: 'WxNd',
        data() {
            return {
                HomeImgSrc: HomeImgSrc,
                NewsDefaultImgSrc: NewsDefaultImgSrc,
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
                newsInfo: "",
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
            /**
             * 根据索引获取主体数据
             */
            getMainData: function() {
                var _self = this;
                this.showLoading();
                $.ajax({
                    url: config.IP + "/news/appgetNewslist?id=" + this.$route.params.id,
                    type: "get",
                    success: function(response) {
                        if(typeof response != 'object')
                            response = JSON.parse(response)
                        _self.newsInfo = response.objectList[0];;
                        _self.hideLoading();
                        setTimeout(function() {
                            var a = document.getElementById("content_news").getElementsByTagName('img');
                            console.log(a);
                            for(var i = 0; i < a.length; i++) {
                                a[i].style.width = "100%";
                                a[i].style.maxWidth = "1024px";
                            }
                        }, 500);

                    },
                    error: function(data, message) {
                        _self.hideLoading();
                    }
                })

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
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .pc-style {
        display: block;
    }
    
    .pc-class {
        padding-left: 155px;
        padding-right: 15px;
        padding-bottom: 15px;
        text-align: center;
    }
    
    .phone-class {
        display: none;
    }
    
    .news-detail-div {
        min-width: 600px;
        min-height: 500px;
        margin-top: 20px;
        border-top: 25px solid rgb(76, 242, 240);
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        margin-left: 20%;
        border-radius: 5px;
        border-top-left-radius: 65px;
        box-shadow: 0px 0px 10px #CCCCCC;
        margin-bottom: 20px;
    }
    
    .photo-img-size {
        width: 100%;
        z-index: -1;
        transition: all 0.9s;
    }
    
    .img-style {
        height: 360px;
        width: 360px;
    }
    
    @media(max-width:992px) {
        .pc-style {
            display: none;
        }
        #text-style {
            padding-left: 0;
        }
        .news-detail-div {
            min-width: 0;
            margin-left: 0;
            border-top-left-radius: 5px;
        }
        .pc-class {
            padding: 10px;
        }
        .phone-class {
            display: block;
        }
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
</style>
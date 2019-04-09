<template>
    <div id="expert_list_id" style="background: rgb(70,51,50);width: 100%;height: 100%;min-height: 1000px;">
        <!--====遮罩层、加载中===-->
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <div class="container" style="padding-top: 100px;">
            <!--title-->
            <div style="text-align: center;font-size: 2.5em;font-family: '幼圆';color: white"><span>热点新闻</span></div>
            <!--news list-->
            <div style="margin-top: 20px;">
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
</template>

<script>
    import HomeImgSrc from '@/assets/itback.jpg'
    import NewsDefaultImgSrc from '@/assets/news_default.png'
    import { config } from '@/util/config.js'
    export default {
        name: 'News',
        data() {
            return {
                HomeImgSrc: HomeImgSrc,
                NewsDefaultImgSrc: NewsDefaultImgSrc,
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
                NewsList: []
            }
        },
        methods: {
            /**
             * 若图片错误，则使用默认图片
             * @param {Object} imgUrl
             */
            defalutNewsImg:function(imgUrl){
                return (imgUrl==undefined || imgUrl==null)?this.NewsDefaultImgSrc:imgUrl;
            },
            /**
             * 根据索引获取主体数据
             */
            getMainData: function() {
                var _self = this;
                this.showLoading();
                $.ajax({
                    url: config.IP + "/news/getNewslist",
                    type: "get",
                    success: function(response) {
                        response = JSON.parse(response);
                        _self.NewsList = response.objectList;
                        _self.hideLoading();
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
            },
            
        },
        created() {
            this.getMainData();
        }
    }
</script>

<style scoped>
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
        transition: all 1s;
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
        transform: scale(1.08);
        -ms-transform: scale(1.08);
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
    }
</style>
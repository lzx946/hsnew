<template>
    <div id="expert_list_id" style="background: white;width: 100%;height: 100%;min-height: 1000px;">
        <!--====遮罩层、加载中===-->
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <div class="container" style="padding-top: 100px;">
            <!--title-->
            <div style="text-align: center;font-size: 2.5em;font-family: '幼圆';color: #000"><span>名师教授</span></div>
            <!--expert detail-->
            <div class="detail-style" style="margin-top: 50px;padding:20px;border-top: 7px solid rgb(255,206,27);border-left: 7px solid rgb(255,206,27);border-bottom: 7px solid rgb(255,206,27);position: relative;min-height: 700px;">
                <div class="photo-img-div">
                    <div id="" style="box-shadow: 0px 0px 20px #000;">
                        <img :src="expertInfo.url" class="photo-img-size" />
                        <div style="height: 10px;background: rgb(255,206,27);"></div>
                    </div>

                </div>
                <div id="expert_detail_id" style="position: relative;">
                    <div class="logo-back-style">
                        <img :src="LogoBackImgSrc" style="width: 50%;" />
                    </div>
                    <p>姓名：<span>{{expertInfo.realname}}</span></p>
                    <p>职称：<span>{{expertInfo.academic}}</span></p>
                    <p>单位：<span>{{expertInfo.employer}}</span></p>
                    <p>开设课程列表：</p>
                    <p v-for="(item,index) in expertInfo.courses"> 
                        <router-link :to="{name:'CourseDetail',params:{id:item.id}}">{{index+1}}、{{item.name}}</router-link>
                    </p>
                    <p>个人详情：</p>
                    <p style="width: 60%;" v-html="expertInfo.summary"></p>
                </div>
                <div class="right-bottom-div-style"></div>
            </div>
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
        name: 'ExpertDetail',
        data() {
            return {
                HomeImgSrc: HomeImgSrc,
                TestImgSrc: TestImgSrc,
                LogoBackImgSrc: LogoBackImgSrc,
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
                expertInfo: "",
            }
        },
        methods: {
            /**
             * 根据索引获取主体数据
             */
            getMainData: function() {
                var _self = this;
                this.showLoading();
                $.ajax({
                    url: config.IP + "/expert/getExpertlist?id=" + this.$route.params.id,
                    type: "get",
                    success: function(response) {
                        if((typeof response) != 'object')
                            response = JSON.parse(response)
                        _self.expertInfo = response.objectList[0];
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
            }
        },
        created() {
            this.getMainData();
            common.isLogin();
        }
    }
</script>

<style scoped>
    .right-bottom-div-style {
        position: absolute;
        bottom: -76px;
        right: -70px;
        background: white;
        width: 150px;
        height: 150px;
        border-top: 7px solid rgb(255, 206, 27);
        transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        /* Internet Explorer */
        -moz-transform: rotate(-45deg);
        /* Firefox */
        -webkit-transform: rotate(-45deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(-45deg);
        /* Opera */
    }
    
    .logo-back-style {
        position: absolute;
        opacity: 0.2;
        filter: alpha(opacity=20);
        left: 25%;
    }
    
    .photo-img-div {
        position: absolute;
        right: -10px;
        padding: 0 0 20px 20px;
        top: -30px;
        background: #FFFFFF;
    }
    
    .photo-img-size {
        transition: all 0.9s;
        height: 400px;
        width: 300px;
    }
    
    @media screen and (max-width: 1200px) {
        .photo-img-size {
            height: 380px;
            width: 280px;
        }
    }
    
    @media screen and (max-width: 992px) {
        .photo-img-size {
            height: 360px;
            width: 260px;
        }
    }
    
    @media screen and (max-width: 430px) {
        .photo-img-size {
            width: 100%;
        }
        .photo-img-div {
            position: relative;
            padding: 20px;
            right: 0;
            top: -30px;
            background: #FFFFFF;
        }
        .logo-back-style {
            position: absolute;
            opacity: 0.2;
            filter: alpha(opacity=20);
            left: 10%;
            width: 80%;
        }
        .detail-style {
            border-right: 7px solid rgb(255, 206, 27);
        }
        .right-bottom-div-style {
            display: none;
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
        box-shadow: 0px 0px 30px #000;
    }
    /*.photo-img-size:hover {
        cursor: pointer;
        transform: scale(1.05);
        -ms-transform: scale(1.05);
        -webkit-transform: scale(1.05);
        -o-transform: scale(1.05);
        -moz-transform: scale(1.05);
    }*/
    
    #expert_detail_id p {
        font-size: 1.4em;
    }
    
    #expert_detail_id span {
        font-size: 1.2em;
    }
</style>
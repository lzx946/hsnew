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
            <div style="text-align: center;font-size: 2.5em;font-family: '幼圆';color: white"><span>名师教授</span></div>
            <!--expert list-->
            <div style="margin-top: 20px;">
                <div class="row">
                    <div class="col-sm-6 col-md-4" v-for="item in expertsLists">
                        <div class="thumbnail border-shadow-set" style="font-weight: bold;">
                            <div style="overflow: hidden;">
                                <router-link :to="{name:'ExpertDetail', params: { id: item.id }}"><img :src="item.url" class="photo-img-size"></router-link>
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
    </div>
</template>

<script>
    import { config } from '@/util/config.js'
    import { common } from '@/util/common.js'
    export default {
        name: 'Home',
        data() {
            return {
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
                expertsLists: []
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
                    url: config.IP + "/expert/getExpertlist",

                    type: "get",
                    success: function(response) {
                        if((typeof response) =='string'){
                            response = JSON.parse(response)
                        }
                        _self.expertsLists = response.objectList;
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
        }
    }
</script>

<style scoped>
    .photo-img-size {
        transition: all 1s;
        height: 500px;
    }
    
    @media screen and (max-width: 1200px) {
        .photo-img-size {
            height: 380px;
        }
    }
    
    @media screen and (max-width: 992px) {
        .photo-img-size {
            height: 450px;
        }
    }
    
    @media screen and (max-width: 400px) {
        .photo-img-size {
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
    
    .photo-img-size:hover {
        cursor: pointer;
        transform: scale(1.08);
        -ms-transform: scale(1.08);
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
    }
</style>
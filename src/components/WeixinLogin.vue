<template>
    <div id="login_id">
        <!--====遮罩层、加载中===-->
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <!--====================-->
        <div class="container" style="padding-top: 100px;min-height: 900px;color: black;">
            <form class="form-signin" novalidate>
                <p>{{showInfo}}</p>
                <transition name="fade">
                    <div v-cloak style="height: 50px;background:#fcf8e3;margin-bottom: 10px;border:1px solid #CCCCCC;border-radius: 2px;" v-if="errorFlag">
                        <div v-bind:class="{'tsama-tip-back-faild':tsamaTipBackFlag,'tsama-tip-back-success':!tsamaTipBackFlag}"></div>
                        <div style="text-align: left;line-height: 48px;margin-left: 10px;">{{errorMessage}}</div>
                    </div>
                </transition>
                <label for="inputUserName" style="margin-top: 10px;">姓名</label>
                <input type="text" id="inputUserName" class="form-control" v-model="username" placeholder="User Name" v-on:focus="inputGetFocus(1)" v-on:blur="inputLoseBlur(1)">
                <transition name="fade">
                    <p v-cloak v-if="nameErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入姓名</p>
                </transition>

                <label for="inputPhone">手机</label>
                <input type="tel" id="inputPhone" class="form-control" v-model="phone" placeholder="Phone Number" v-on:focus="inputGetFocus(5)" v-on:blur="inputLoseBlur(5)">
                <transition name="fade">
                    <p v-cloak v-if="phoneErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入手机号码</p>
                    <p v-cloak v-if="phoneErrorFormat" style="margin-top: -10px;font-size: 10px;color: red;"> * 手机号码格式不正确
                    </p>
                    <p v-cloak v-if="phoneErrorIsExist" style="margin-top: -10px;font-size: 10px;color: red;"> * 手机号码已存在</p>
                </transition>

                <label for="inputBusiness">经营职业</label>
                <input type="text" id="inputBusiness" class="form-control" v-model="business" placeholder="Business Occupation" v-on:focus="inputGetFocus(8)" v-on:blur="inputLoseBlur(8)">
                <transition name="fade">
                    <p v-cloak v-if="businessErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入您的经营职业</p>
                </transition>

                <a class="btn btn-lg btn-info" style="width: 100%;margin-top: 1em;border-radius: 0;background: rgb(16,72,131);border: none;" v-on:click="register()"><span>提交</span></a>
            </form>
        </div>
    </div>
</template>

<script>
    import { CheckObject } from '@/util/utils.js'
    import { config } from '@/util/config.js'
    import { common } from '@/util/common.js'
    export default {
        name: 'Register',
        data() {
            return {
                username: "",
                nameErrorNull: false,

                phone: "",
                phoneErrorNull: false,

                business: "",
                businessErrorNull: false,

                id: '',
                openid:'',
                showInfo:'',
                tsamaTipBackFlag: true,
                errorFlag: false,
                isSupportlocalStorage: false,
                errorMessage: "",
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
            }
        },
        created() {
            this.username = this.$route.params.realname;
            this.phone = this.$route.params.phone;
            this.business = this.$route.params.summary;
            this.id = this.$route.params.id;
             if(window.localStorage) {
                if(localStorage.getItem("openid") != null) {
                    this.openid = localStorage.getItem("openid");
                }
            } else {
                this.openid = common.getCookie("openid");
            }
            if(this.username!=null && this.username.trim().length!=0){
                this.showInfo="请核对以下信息";
            }else{
                this.showInfo="以下信息填写一次即可";
            }
            console.log(this.username);
            console.log(this.phone);
            console.log(this.business);
            console.log(this.id);
            console.log(this.openid);
        },
        methods: {
            inputGetFocus: function(index) {
                if(index == 1) {
                    this.nameErrorNull = false;
                    return;
                }
                if(index == 5) {
                    this.phoneErrorNull = false;
                    return;
                }
                if(index == 8) {
                    this.businessErrorNull = false;
                    return;
                }

            },
            inputLoseBlur: function(index) {
                var _self = this;
                /*账户*/
                if(index == 1) {
                    if(this.username == null || this.username.trim().length == 0) {
                        this.nameErrorNull = true;
                        return;
                    }
                }
                /*手机*/
                else if(index == 5) {
                    /*是否为空*/
                    if(this.phone == null || this.phone.trim().length == 0) {
                        this.phoneErrorNull = true;
                        return;
                    }
                } else if(index == 8) {
                    /*是否为空*/
                    if(this.business == null || this.business.trim().length == 0) {
                        this.businessErrorNull = true;
                        return;
                    }
                }
            },
            register: function() {
                this.inputLoseBlur(1);
                this.inputLoseBlur(5);
                this.inputLoseBlur(8);
                if(this.nameErrorNull || this.phoneErrorNull || this.businessErrorNull) {
                    return;
                }
                var _self = this;
                this.showLoading();
                $.ajax({
                    url: config.DOMIN + '/weixin/jieru/submitInfo',
                    data: {
                        phone: this.phone,
                        realname: this.username,
                        wechat: this.openid,
                        summary: this.business
                    },
                    type: "post",
                    success: function(data) {
                        _self.hideLoading();
                        if((typeof data) != 'object') {
                            data = JSON.parse(data);
                        }
                        if(data.flag == 1) {
                            $.ajax({
                                url: config.IP + '/enlist/insertEnlist',
                                data: {
                                    courseid: _self.id,
                                    userid: data.objectList.id,
                                },
                                type: "post",
                                success: function(data) {
                                    _self.hideLoading();
                                    if((typeof data) != 'object') {
                                        data = JSON.parse(data);
                                    }
                                    if(data.flag == 1) {
                                        alert("报名成功！");
                                    } else if(data.flag == -2) {
                                        alert("您已经报名过此课程~");
                                    } else {
                                        alert("服务器错误，请稍后再试！1");
                                    }

                                },
                                error: function(data, message) {
                                    _self.hideLoading();
                                }
                            })
                        } else {
                            alert("服务器错误，请稍后再试！");
                        }

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
                this.isLoadingFlag = true;
            },
            /**
             * 显示加载中页面
             */
            showLoading: function() {
                this.showLoadingCss.in = true;
                this.showLoadingCss.showloading = true;
            }
        }
    }
</script>

<style scoped>
    body,
    html,
    #login_id {
        background: white;
    }
    
    .form-signin {
        max-width: 300px;
        width: 300px;
        padding: 15px;
        margin: 0 auto;
    }
    
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }
    
    .form-signin .checkbox {
        font-weight: normal;
    }
    
    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 0;
        font-size: 16px;
    }
    
    .form-signin .form-control:focus {
        z-index: 2;
    }
    
    .form-signin input[type="text"] {
        margin-bottom: 15px;
    }
    
    .form-signin input[type="email"] {
        margin-bottom: 15px;
    }
    
    .form-signin input[type="tel"] {
        margin-bottom: 15px;
    }
    
    .form-signin input[type="password"] {
        margin-bottom: 15px;
    }
    
    .btn-info span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }
    
    
    .btn-info:hover span {
        padding-right: 25px;
    }
    
    .btn-info:hover span:after {
        opacity: 1;
        right: 0;
    }
    /*动画*/
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    
    [v-cloak] {
        display: none;
    }
    
    .tsama-tip-back-faild {
        float: left;
        height: 48px;
        background: red;
        width: 5px;
    }
    
    .tsama-tip-back-success {
        float: left;
        height: 48px;
        background: #5bc0de;
        width: 5px;
    }
    
    .tsama-type-select-left {
        width: 45%;
        height: 50px;
        line-height: 50px;
        float: left;
        text-align: center;
        border: 1px solid #19568a;
        cursor: pointer;
    }
    
    .tsama-type-select-right {
        width: 45%;
        height: 50px;
        line-height: 50px;
        float: right;
        text-align: center;
        border: 1px solid #19568a;
        cursor: pointer;
    }
    
    .tsama-type-select-left-hover {
        background: #19568a;
        color: white;
    }
</style>
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
                <a><img :src="logoImgSrc" height="80px" style="margin-left: 95px;display: block; " /></a>
                <p style="margin-bottom: 30px;text-align: center;"><b>EUROPE</b></p>
                <transition name="fade">
                    <div v-cloak style="height: 50px;background:rgb(252, 248, 227);margin-bottom: 10px;border-radius: 0px;border: 1px solid #CCCCCC;" v-if="loginError">
                        <div style="float: left;height: 48px;background: red;width: 5px;"></div>
                        <div style="text-align: left;line-height: 48px;margin-left: 10px;color: black;">{{errorMessage}}</div>
                    </div>
                </transition>
                <label>选择类别</label>
                <div style="width: 100%;padding: 0em;">
                    <div class="tsama-type-select-left" :class="{'tsama-type-select-left-hover':identity==0}" @click="selectType(0)">华商学员
                    </div>
                    <div class="tsama-type-select-right" :class="{'tsama-type-select-left-hover':identity==1}" @click="selectType(1)">金牌专家
                    </div>
                </div>
                <!--<label for="inputEmail" style="margin-top: 10px;">用户名</label>
                <input type="email" id="inputEmail" autofocus class="form-control" v-model="emailOrUsername" placeholder="Please Input User name" v-on:focus="inputGetFocus(1)" v-on:blur="inputLoseBlur(1)">
                <transition name="fade">
                    <p v-cloak v-if="nameErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入用户名</p>
                </transition>-->
                <label for="inputEmail" style="margin-top: 10px;">手机号</label>
                <input type="text" id="inputEmail" autofocus class="form-control" v-model="phone" placeholder="Please Input PhoneNumber" v-on:focus="inputGetFocus(3)" v-on:blur="inputLoseBlur(3)">
                <transition name="fade">
                    <p v-cloak v-if="phoneErrorNull" style="margin-top:-10px;font-size: 10px;color: red;"> * 请输入手机号</p>
                </transition>

                <label for="inputPassword">密码</label>
                <input type="password" id="inputPassword" v-on:keyup.enter="toLogin" class="form-control" v-model="password" placeholder="Please Input Password" v-on:focus="inputGetFocus(2)" v-on:blur="inputLoseBlur(2)">
                <transition name="fade">
                    <p v-cloak v-if="psdErrorNull" style="margin-top:-10px;font-size: 10px;color: red;"> * 请输入密码</p>
                </transition>
                <div class="checkbox" style="float: left;">
                    <label><input type="checkbox" value="remember-me"  v-bind:disabled="isSupportlocalStorage"
                              v-model="rememberMe">保存登录</label>
                </div>
                <!--<div style="margin-left: 200px;margin-top: 20px;">
					<a href="#">忘记密码?</a>
				</div>-->
                <div style="float: left;">
                    <a class="btn btn-lg btn-primary" style="width: 160px;border-radius: 0;background: rgb(16,72,131);border: none;" v-on:click="toLogin()">登录</a>
                    <router-link class="btn btn-lg btn-info" style="width: 105px; border-radius: 0;background: rgb(16,72,131);border: none;" :to="{ name: 'Register'}"><span>注册</span></router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import logoImgSrc from '@/assets/logo.png'
    import { config } from '@/util/config.js'
    export default {
        name: 'Login',
        data() {
            return {
                nameErrorNull: false,
                emailOrUsername: "",
                password: "",
                phone:"",
                phoneErrorNull:false,
                rememberMe: false,
                psdErrorNull: false,
                loginError: false,
                identity: 0,
                isSupportlocalStorage: false,
                errorMessage: "",
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
                logoImgSrc: logoImgSrc,
            }
        },
        methods: {
            selectType: function(index) {
                this.identity = index;
            },
            inputGetFocus: function(index) {
                if(index == 1) {
                    this.nameErrorNull = false;
                } else if(index==2) {
                    this.psdErrorNull = false;
                }else if(index==3){
                    this.phoneErrorNull = false;
                }
                this.loginError = false;
            },
            inputLoseBlur: function(index) {
                if(index == 1) {
                    if(this.emailOrUsername.trim().length == 0) {
                        this.nameErrorNull = true;
                    }
                } else if(index==2){
                    if(this.password.trim().length == 0) {
                        this.psdErrorNull = true;
                    }
                }else if(index==3){
                    if(this.phone.trim().length == 0) {
                        this.phoneErrorNull = true;
                    }
                    
                    
                }
            },
            toLogin: function() {

                //this.inputLoseBlur(1);
                this.inputLoseBlur(2);
                this.inputLoseBlur(3);
                if(this.nameErrorNull || this.psdErrorNull ||this.phoneErrorNull) {
                    return;
                }
                this.showLoading();
                var _self = this;
                /*请求登录*/
                //                  this.loginError = true;
                var urlend;
                if(this.identity == 0) {
                    urlend = "/loginStudent";
                } else
                    urlend = "/loginExpert";
                $.ajax({
                    url: config.IP + urlend,
                    data: {
                        phone: this.phone,
                        password: md5(this.password)
                    },
                    type: "post",
                    success: function(data) {
                        data = JSON.parse(data);
                        if(data.flag == 0) {
                            _self.loginError = true;
                            _self.errorMessage = data.message;
                        } else {
                            if(_self.rememberMe) {
                                if(window.localStorage) {
                                    localStorage.setItem("token", JSON.stringify(data.objectList));
                                    localStorage.setItem("flag", _self.identity);
                                } else {
                                    setCookie('token', JSON.stringify(data.objectList[0]), 30)
                                    setCookie('flag', _self.identity, 30)
                                }
                            } else {
                                if(window.sessionStorage) {
                                    sessionStorage.setItem("token", JSON.stringify(data.objectList));
                                    sessionStorage.setItem("flag", _self.identity);
                                } else {
                                    setCookie('token', JSON.stringify(data.objectList[0]), 30)
                                    setCookie('flag', _self.identity, 30)
                                }
                            }
                            //                          console.log(JSON.parse(data))
                            _self.$router.push('/')

                        }
                        _self.hideLoading();
                    },
                    error: function(data, message) {
                        _self.loginError = true;
                        _self.errorMessage = "请求失败，请稍后再试";
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
    
    .form-signin input[type="password"] {
        margin-bottom: 10px;
    }
    
    .btn-info span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }
    
    .btn-info span:after {
        /*content: '»';*/
        content: '>>';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
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
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
                    <div v-cloak style="height: 50px;background:#fcf8e3;margin-bottom: 10px;border:1px solid #CCCCCC;border-radius: 2px;" v-if="errorFlag">
                        <div v-bind:class="{'tsama-tip-back-faild':tsamaTipBackFlag,'tsama-tip-back-success':!tsamaTipBackFlag}"></div>
                        <div style="text-align: left;line-height: 48px;margin-left: 10px;">{{errorMessage}}</div>
                    </div>
                </transition>
                <label>选择类别</label>
                <div style="width: 100%;padding: 0em;">
                    <div class="tsama-type-select-left" :class="{'tsama-type-select-left-hover':identity==0}" @click="selectType(0)">华商学员
                    </div>
                    <div class="tsama-type-select-right" :class="{'tsama-type-select-left-hover':identity==1}" @click="selectType(1)">金牌专家
                    </div>
                </div>
                <!--<label for="inputUserName" style="margin-top: 10px;">用户名</label>
				<input type="text" id="inputUserName" class="form-control" v-model="username" placeholder="User Name" v-on:focus="inputGetFocus(1)" v-on:blur="inputLoseBlur(1)">
				<transition name="fade">
					<p v-cloak v-if="nameErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入用户名</p>
					<p v-cloak v-if="nameErrorIsExist" style="margin-top: -10px;font-size: 10px;color: red;"> * 用户名已存在</p>
				</transition>-->
                <label for="inputUserName" style="margin-top: 10px;">姓名</label>
                <input type="text" id="inputUserName" class="form-control" v-model="username" placeholder="User Name" v-on:focus="inputGetFocus(1)" v-on:blur="inputLoseBlur(1)">
                <transition name="fade">
                    <p v-cloak v-if="nameErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入姓名</p>
                    <!--<p v-cloak v-if="nameErrorIsExist" style="margin-top: -10px;font-size: 10px;color: red;"> * 用户名已存在</p>-->
                </transition>

                <!--<label for="inputEmail">邮箱</label>
				<input type="email" id="inputEmail" class="form-control" v-model="email" placeholder="Email Address" v-on:focus="inputGetFocus(2)" v-on:blur="inputLoseBlur(2)">
				<transition name="fade">
					<p v-cloak v-if="emailErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入邮箱</p>
					<p v-cloak v-if="emailErrorFormat" style="margin-top: -10px;font-size: 10px;color: red;"> * 邮箱格式不正确，请确保包含@与.
					</p>
					<p v-cloak v-if="emailErrorIsExist" style="margin-top: -10px;font-size: 10px;color: red;"> * 邮箱已存在</p>
				</transition>-->
                <label for="inputPhone">手机</label>
                <input type="tel" id="inputPhone" class="form-control" v-model="phone" placeholder="Phone Number" v-on:focus="inputGetFocus(5)" v-on:blur="inputLoseBlur(5)">
                <transition name="fade">
                    <p v-cloak v-if="phoneErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入手机号码</p>
                    <p v-cloak v-if="phoneErrorFormat" style="margin-top: -10px;font-size: 10px;color: red;"> * 手机号码格式不正确
                    </p>
                    <p v-cloak v-if="phoneErrorIsExist" style="margin-top: -10px;font-size: 10px;color: red;"> * 手机号码已存在</p>
                </transition>

                <div id="" v-if="identity==1">
                    <label for="inputTitle">职称</label>
                    <input type="text" id="inputTitle" class="form-control" v-model="academicTitle" placeholder="Academic Title" v-on:focus="inputGetFocus(6)" v-on:blur="inputLoseBlur(6)">
                    <transition name="fade">
                        <p v-cloak v-if="titleErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入职称</p>
                    </transition>
                    <label for="inputDepartment">单位</label>
                    <input type="text" id="inputDepartment" class="form-control" v-model="department" placeholder="Department" v-on:focus="inputGetFocus(7)" v-on:blur="inputLoseBlur(7)">
                    <transition name="fade">
                        <p v-cloak v-if="departmentErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入单位</p>
                    </transition>
                </div>

                <label for="inputPassword">密码（6-20位）</label>
                <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="Password" v-on:focus="inputGetFocus(3)" v-on:blur="inputLoseBlur(3)">
                <transition name="fade">
                    <p v-cloak v-if="psdErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请输入密码</p>
                    <p v-cloak v-if="psdErrorLength" style="margin-top: -10px;font-size: 10px;color: red;"> * 密码长度为6-20位</p>
                </transition>
                <label for="inputPassword1">再次输入密码</label>
                <input type="password" id="inputPassword1" class="form-control" v-model="rePassword" placeholder="Re Password" v-on:focus="inputGetFocus(4)" v-on:blur="inputLoseBlur(4)">
                <transition name="fade">
                    <p v-cloak v-if="rePsdErrorNull" style="margin-top: -10px;font-size: 10px;color: red;"> * 请再次输入密码</p>
                    <p v-cloak v-if="rePsdErrorNoEqual" style="margin-top: -10px;font-size: 10px;color: red;"> * 两次密码输入不一致
                    </p>
                </transition>


                <a class="btn btn-lg btn-info" style="width: 100%;margin-top: 1em;border-radius: 0;background: rgb(16,72,131);border: none;" v-on:click="register()"><span>注册</span></a>
                <div style="width: 50px;height:50px;text-align: left;line-height: 50px;">
                    <router-link :to="{ name: 'PhoneLogin'}" style="color: black">&lt;&lt;登录 </router-link>

                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import logoImgSrc from '@/assets/logo.png'
    import { CheckObject } from '@/util/utils.js'
    import { config } from '@/util/config.js'
    export default {
        name: 'Register',
        data() {
            return {
                username: "",
                nameErrorNull: false,
                nameErrorIsExist: false,

                email: "",
                emailErrorNull: false,
                emailErrorFormat: false,
                emailErrorIsExist: false,

                phone: "",
                phoneErrorNull: false,
                phoneErrorFormat: false,
                phoneErrorIsExist: false,

                password: "",
                psdErrorNull: false,
                psdErrorLength: false,

                rePassword: "",
                rePsdErrorNull: false,
                rePsdErrorNoEqual: false,

                academicTitle: "",
                titleErrorNull: false,

                department: "",
                departmentErrorNull: false,

                identity: -1,

                tsamaTipBackFlag: true,
                errorFlag: false,
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
                this.errorFlag = false;
            },
            inputGetFocus: function(index) {
                if(index == 1) {
                    this.nameErrorNull = false;
                    this.nameErrorIsExist = false;
                    return;
                }
                if(index == 2) {
                    this.emailErrorNull = false;
                    this.emailErrorFormat = false;
                    this.emailErrorIsExist = false;
                    return;
                }
                if(index == 3) {
                    this.psdErrorNull = false;
                    this.psdErrorLength = false;
                    return;
                }
                if(index == 4) {
                    this.rePsdErrorNull = false;
                    this.rePsdErrorNoEqual = false;
                    return;
                }
                if(index == 5) {
                    this.phoneErrorNull = false;
                    this.phoneErrorFormat = false;
                    this.phoneErrorIsExist = false;
                    return;
                }
                if(index == 6) {
                    this.titleErrorNull = false;
                    return;
                }
                if(index == 7) {
                    this.departmentErrorNull = false;
                    return;
                }

            },
            inputLoseBlur: function(index) {
                var _self = this;
                /*账户*/
                if(index == 1) {
                    if(this.username.trim().length == 0) {
                        this.nameErrorNull = true;
                        return;
                    }
                    if(this.identity == -1) {
                        _self.errorFlag = true;
                        _self.errorMessage = "请选择类别";
                        return;
                    }
//                  var urlend;
//                  if(this.identity == 0) {
//                      urlend = "/yanzhengS";
//                  } else
//                      urlend = "/yanzhengE";
//                  $.ajax({
//                      url: config.IP + urlend,
//                      data: {
//                          account: this.username
//                      },
//                      type: "get",
//                      async: false,
//                      success: function(data) {
//                          if(data) {
//                              _self.nameErrorIsExist = true;
//                          }
//                      },
//                      error: function(data, message) {
//                          _self.errorFlag = true;
//                          _self.errorMessage = "服务器异常，请稍后重试";
//                      }
//                  })
                }
                /*邮箱*/
                else if(index == 2) {
                    /*是否为空*/
                    if(this.email.trim().length == 0) {
                        this.emailErrorNull = true;
                        return;
                    }
                    /*格式是否正确*/
                    if(!CheckObject.tsamaEmailReg.test(this.email)) {
                        this.emailErrorFormat = true;
                        return;
                    }
                    if(this.identity == -1) {
                        _self.errorFlag = true;
                        _self.errorMessage = "请选择类别";
                        return;
                    }
                    var urlend;
                    if(this.identity == 0) {
                        urlend = "/yanzhengS";
                    } else
                        urlend = "/yanzhengE";
                    $.ajax({
                        url: config.IP + urlend,
                        data: {
                            email: this.email
                        },
                        type: "get",
                        async: false,
                        success: function(data) {
                            if(data) {
                                _self.emailErrorIsExist = true;
                            }
                        },
                        error: function(data, message) {
                            _self.errorFlag = true;
                            _self.errorMessage = "服务器异常，请稍后重试";
                        }
                    })
                }
                /*密码*/
                else if(index == 3) {
                    /*是否为空*/
                    if(this.password.trim().length == 0) {
                        this.psdErrorNull = true;
                        return;
                    }
                    /*格式是否正确*/
                    if(this.password.length < 6 || this.password.length > 20) {
                        this.psdErrorLength = true;
                        return;
                    }
                }
                /*重复密码*/
                else if(index == 4) {
                    /*是否为空*/
                    if(this.rePassword.trim().length == 0) {
                        this.rePsdErrorNull = true;
                        return;
                    }
                    /*两次密码不一致*/
                    if(this.password != this.rePassword) {
                        this.rePsdErrorNoEqual = true;
                        return;
                    }
                }
                /*手机*/
                else if(index == 5) {
                    /*是否为空*/
                    if(this.phone.trim().length == 0) {
                        this.phoneErrorNull = true;
                        return;
                    }
                    /*格式是否正确*/
                    //					if(!CheckObject.tsamaPhoneReg.test(this.phone)) {
                    //						this.phoneErrorFormat = true;
                    //						return;
                    //					}
                    if(this.identity == -1) {
                        _self.errorFlag = true;
                        _self.errorMessage = "请选择类别";
                        return;
                    }
                    var urlend;
                    if(this.identity == 0) {
                        urlend = "/yanzhengS";
                    } else
                        urlend = "/yanzhengE";
                    $.ajax({
                        url: config.IP + urlend,
                        data: {
                            phone: this.phone
                        },
                        type: "get",
                        async: true,
                        success: function(data) {
                            if(data) {
                                _self.phoneErrorIsExist = true;
                            }
                        },
                        error: function(data, message) {
                            _self.errorFlag = true;
                            _self.errorMessage = "服务器异常，请稍后重试";
                        }
                    })
                } else if(index == 6) {
                    /*是否为空*/
                    if(this.academicTitle.trim().length == 0) {
                        this.titleErrorNull = true;
                        return;
                    }
                } else if(index == 7) {
                    /*是否为空*/
                    if(this.department.trim().length == 0) {
                        this.departmentErrorNull = true;
                        return;
                    }
                }
            },
            register: function() {
                this.inputLoseBlur(1);
                //				this.inputLoseBlur(2);
                this.inputLoseBlur(3);
                this.inputLoseBlur(4);
                this.inputLoseBlur(5);
                

                
                if(this.identity == -1) {
                    this.errorFlag = true;
                    this.errorMessage = "请选择类别";
                    return;
                }else if (this.identity==1){
                    this.inputLoseBlur(6);
                    this.inputLoseBlur(7);
                }
                if(this.nameErrorNull || this.nameErrorIsExist || this.emailErrorNull || this.emailErrorFormat || this.emailErrorIsExist || this.phoneErrorNull || this.phoneErrorFormat || this.phoneErrorIsExist ||
                    this.psdErrorNull || this.psdErrorLength || this.rePsdErrorNull || this.rePsdErrorNoEqual || this.titleErrorNull||this.departmentErrorNull) {
                    return;
                }
                var _self = this;
                this.showLoading();
                var urlend;
                if(this.identity == 0) {
                    urlend = "/registerStudent";
                } else
                    urlend = "/registerExpert";
                $.ajax({
                    url: config.IP + urlend,
                    data: {
                        password: md5(this.password),
                        //						email: this.email,
                        phone: this.phone,
                        realname:this.username,
                        academic:this.academicTitle,
                        employer:this.department
                    },
                    type: "post",
                    success: function(data) {
                        _self.hideLoading();
                        if(!data) {
                            _self.errorFlag = true;
                            _self.errorMessage = "注册失败，请稍后重试";
                        } else {
                            _self.errorFlag = true;
                            _self.errorMessage = "注册成功";
                            _self.tsamaTipBackFlag = false;
                            setTimeout(function() {
                                _self.$router.push({
                                    name: 'PhoneLogin'
                                })
                            }, 1000)
                        }
                    },
                    error: function(data, message) {
                        _self.errorFlag = true;
                        _self.errorMessage = "注册失败，请稍后重试";
                        _self.showLoading();
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
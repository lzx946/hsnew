<template>
    <div id="">
        <div v-if="isPhoneFlag" style="position: relative;background: #CCCCCC;" :style="{'min-height':heightBrower+'px'}">
            <!-- 设置导航条组件固定在顶部 -->
            <div class="navbar-fixed-top navbar-zdy" v-if="!isWeixinFlag">
                <div class="container">
                    <!--logo-->
                    <div style="margin-top: 15px; float: left;"><img class="logo-app" src="http://www.ecebs.eu/static/img/logo.a90001e.png" /></div>
                    <!--chinese intruction-->
                    <div class="logo-app-text">
                        <span style="font-family: '方正舒体';">欧洲华商商学院</span>
                        <span class="logo-app-text-en">CHINESE ENTREPRENEUR BUSINESS COLLEGE</span>
                    </div>
                </div>
            </div>
            <router-view/>
            <footer v-if="!isWeixinFlag" class="phone-footer-class">
                <!--<ul class="pc-class">-->
                <!--<li >-->
                <div id="" style="width: 25%;float: left;text-align: center;">
                    <router-link :to="'/phone'" style="line-height: 50px;">学院课程</router-link>
                </div>
                <div id="" style="width: 25%;float: left;text-align: center;">
                    <router-link :to="'/phone/expert'" style="line-height: 50px;">名师教授</router-link>
                </div>
                <div id="" style="width: 25%;float: left;text-align: center;">
                    <router-link :to="'/phone/news'" style="line-height: 50px;">热点新闻</router-link>
                </div>
                <div id="" style="width: 25%;float: left;text-align: center;">
                    <span v-if="isLoginFlag" @click="toInfo(0)" style="line-height: 50px;">我的</span>
                    <router-link v-if="!isLoginFlag" style="line-height: 50px;" :to="{ name: 'PhoneLogin'}">我的</router-link>
                </div>
                <!--</li>
                    <li >-->

                <!--</li>
                    <li >-->

                <!--</li>
                    <li >-->

                <!--</li>-->
                <!--</ul>-->
            </footer>
        </div>
        <div v-if="!isPhoneFlag">
            <div class="navbar-fixed-top navbar-zdy">
                <div class="container">
                    <!--logo-->
                    <div style="margin-top: 15px; float: left;"><img class="logo-app" src="http://www.ecebs.eu/static/img/logo.a90001e.png" /></div>
                    <!--chinese intruction-->
                    <div class="logo-app-text">
                        <span style="font-family: '方正舒体';">欧洲华商商学院</span>
                        <span class="logo-app-text-en">CHINESE ENTREPRENEUR BUSINESS COLLEGE</span>
                    </div>
                    <div style="float: right;margin-top: 38px;">
                        <ul>
                            <li>
                                <router-link :to="'/'">主页</router-link>
                            </li>
                            <li>
                                <router-link :to="'/course'">学院课程</router-link>
                            </li>
                            <li>
                                <router-link :to="'/expert'">名师教授</router-link>
                            </li>
                            <li>
                                <router-link :to="'/news'">热点新闻</router-link>
                            </li>
                            <!--<li>
                                <router-link :to="'/about'">关于我们</router-link>
                            </li>-->
                            <li v-if="!isLoginFlag">
                                <router-link :to="{ name: 'Login'}">登录 </router-link><b>/</b>
                                <router-link :to="{ name: 'Register'}">注册</router-link>
                            </li>
                            <!--登录完成-->
                            <li v-if="isLoginFlag" style="margin-top: -25px;">
                                <div class=" my-nav-right">  
                                    <div class="wrapper" style="width: 100px;height:50px;margin-left: auto;margin-right: auto;">
                                        <img :src="tokenV.url" class="tsama-icon " style="height: 50px;width: 50px; margin-left: 25px;
                                border-radius: 50%; background: rgba(220,220,220,0.4);cursor: pointer;" />
                                        <div class="tooltipmy">
                                            <div style="width: 100px;height: auto; margin-left: -35px;margin-top: -35px;">
                                                <div class="btn-group">
                                                    <ul class="dropdown-menu" style="display: block;min-width: 100px;border: none;">
                                                        <li style="border: none;">
                                                            <a @click="toInfo(1)" style="text-align: center; border: none;cursor: pointer">个人中心</a>
                                                        </li>
                                                        <li style="border: none;width: 100%;">
                                                            <a @click="logout()" style="text-align: center;border: none;cursor:pointer;">注销</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
            <router-view/>
            <footer class="pc-footer-class">
                <span class="footer-span-style">欧洲华商商学院，华商自己的商学院</span>
            </footer>
        </div>
    </div>
</template>

<script>
    import LogoImgSrc from '@/assets/logo.png'
    import MeauPhoneImgSrc from '@/assets/meau_phone.png'
    import ClosePhoneImgSrc from '@/assets/close_phone.png'
    import { config } from '@/util/config.js'
    import { common } from '@/util/common.js'
    export default {
        name: 'App',
        data() {
            return {
                isWeixinFlag: false,
                widthBrower: common.widthBrower,
                heightBrower: common.heightBrower,
                isPhoneFlag: false,
                LogoImgSrc: LogoImgSrc,
                MeauPhoneImgSrc: MeauPhoneImgSrc,
                ClosePhoneImgSrc: ClosePhoneImgSrc,
                isLoginFlag: false
            }
        },
        beforeRouteUpdate(to, from, next) {
            next()
        },
        created() {
            if(this.$route.path.indexOf("weixin") < 0) {
                this.isWeixinFlag = false;
            } else {
                this.isWeixinFlag = true;
                 this.isPhoneFlag = true;
                if(this.$route.path.indexOf("/weixin/jieru/index") >= 0) {
                    this.$router.push({
                        path: '/weixinphone/newcourse'
                    });
                    return;
                }else{
                    this.$router.push({
                        path: this.$route.path
                    });
                    return;
                }
            }
            if(this.widthBrower <= 768 && this.widthBrower > 0) {
                this.isPhoneFlag = true;
                if(this.$route.path == "/") {
                    this.$router.push({
                        path: '/phone'
                    });
                } else {
                    this.$router.push({
                        path: this.$route.path
                    });
                }

            } else {
                this.isPhoneFlag = false;
                this.$router.push({
                    path: this.$route.path
                });
            }
            this.$router.beforeEach((to, from, next) => {
                if(to.name == 'Home' && from.name == 'Login') {
                    this.getInfo();
                }
                if(to.name == 'PhoneHome' && from.name == 'PhoneLogin') {
                    this.getInfo();
                }
                next()
            })
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            logout: function() {
                common.logout();
                this.isLoginFlag = false;
            },

            toInfo: function(flag) {
                console.log(common.identityFlag)
                if(common.identityFlag != null) {
                    if(common.identityFlag == "0")
                        //手机
                        if(flag == 0) {
                            this.$router.push({
                                name: 'PhoneStudentInfo'
                            });
                        } else {
                            this.$router.push({
                                name: 'StudentInfo'
                            });
                        }
                    else {
                        if(flag == 0) {
                            this.$router.push({
                                name: 'PhoneExpertInfo'
                            });
                        } else {
                            this.$router.push({
                                name: 'ExpertInfo'
                            });
                        }
                    }
                }
            },
            getInfo() {
                common.isLogin();
                if(common.token != null) {
                    var _self = this;
                    var str = "";
                    if(common.identityFlag == "0") {
                        str = "/student/getStudentlist";
                    } else
                        str = "/expert/getExpertlist";
                    $.ajax({
                        url: config.IP + str,
                        data: {
                            id: common.token.id
                        },
                        type: "get",
                        success: function(data) {
                            if((typeof data) != "object") {
                                data = JSON.parse(data);
                            }
                            _self.tokenV = data.objectList[0];
                            _self.isLoginFlag = true;
                        },
                        error: function(data, message) {
                            console.log(data)
                        }
                    })
                }
            },
            showOrHideMeau: function() {

            }
        }
    }
</script>

<style scoped>
    .phone-footer-class {
        position: fixed;
        height: 50px;
        bottom: 0px;
        width: 100%;
        background: #19568a;
    }
    
    .wrapper {
        position: relative;
    }
    
    .wrapper .tooltipmy {
        background: #FFFFFF;
        border-radius: 5px;
        top: 100%;
        color: #fff;
        display: block;
        z-index: 999;
        left: 3px;
        margin-top: 10px;
        opacity: 0;
        padding: 20px;
        pointer-events: none;
        position: absolute;
        width: 100%;
        -webkit-transform: translateY(10px);
        -moz-transform: translateY(10px);
        -ms-transform: translateY(10px);
        -o-transform: translateY(10px);
        transform: translateY(10px);
        -webkit-transition: all .25s ease-out;
        -moz-transition: all .25s ease-out;
        -ms-transition: all .25s ease-out;
        -o-transition: all .25s ease-out;
        transition: all .25s ease-out;
        -webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
        -moz-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
        -ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
        -o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    }
    /* This bridges the gap so you can mouse into the tooltipmy without it disappearing */
    
    .wrapper .tooltipmy:before {
        top: -20px;
        content: " ";
        display: block;
        height: 20px;
        left: 0;
        position: absolute;
        width: 100%;
    }
    /* CSS Triangles - see Trevor's post */
    
    .wrapper .tooltipmy:after {
        border-left: solid transparent 10px;
        border-right: solid transparent 10px;
        border-bottom: solid #FFFFFF 10px;
        top: -10px;
        content: " ";
        height: 0;
        left: 50%;
        margin-left: -13px;
        position: absolute;
        width: 0;
    }
    
    .wrapper:hover .tooltipmy {
        opacity: 1;
        pointer-events: auto;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        -o-transform: translateY(0px);
        transform: translateY(0px);
    }
    /* IE can just show/hide with no transition */
    
    .lte8 .wrapper .tooltipmy {
        display: none;
    }
    
    .lte8 .wrapper:hover .tooltipmy {
        display: block;
    }
    /***********************************/
    
    .navbar-zdy {
        height: 80px;
        width: 100%;
        background: #19568a;
    }
    
    .logo-app {
        height: 90px;
    }
    
    .logo-app-text {
        margin-top: 15px;
        float: left;
        font-size: 2.7em;
        margin-left: 10px;
    }
    
    .logo-app-text-en {
        font-family: 'times new roman';
        display: block;
        font-size: 0.31em;
        margin-top: -10px;
    }
    
    .phone-class {}
    
    .pc-class {
        display: block;
    }
    
    .footer-span-style {
        position: absolute;
        right: 80px;
        font-size: 1.4em;
        bottom: 8px;
    }
    
    @media screen and (max-width: 992px) {
        .phone-class {
            display: block;
        }
    }
    
    @media screen and (max-width: 769px) {
        .footer-span-style {
            right: 20px;
        }
        .phone-class {
            margin-top: -15px;
        }
        .logo-app {
            height: 50px;
        }
        .logo-app-text {
            font-size: 1.7em;
            margin-top: 20px;
        }
        .logo-app-text-en {
            display: none;
        }
        .navbar-zdy {
            height: 70px;
            width: 100%;
            background: #19568ad4;
        }
        .pc-class {
            display: block;
        }
    }
    
    .pc-footer-class {
        position: relative;
        height: 50px;
        background: #19568a;
    }
    
    span {
        color: white;
    }
    
    ul {
        list-style-type: none;
    }
    
    li {
        float: left;
        color: white;
        font-size: 1.2em;
        /*font-weight: bold;*/
        padding: 10px;
    }
    
    a,
    router-link {
        cursor: pointer;
        color: white;
    }
</style>
<template>
    <div id="sign-box" style="background: #CCCCCC;width: 100%;height: 100%;min-height: 1000px;">
        <p>请核对以下信息</p>
        <ul>
            <li>
                <p>时间</p>
                <p>{{today}}</p>
            </li>
            <li>
                <p>地点</p>
                <p>{{signMsg.room}}</p>
            </li>
            <li>
                <p>课程</p>
                <p>{{signMsg.kcName}}，第{{signMsg.period}}期</p>
                <p>{{signMsg.starttime}} - {{signMsg.stoptime}}</p>
            </li>
        </ul>
       <div style="text-align: center;"> 
            <a href="javascript:;" @click="toSign" class="signBtn">签到</a>
       </div>
    </div>
</template>


<script>
import jsSHA from "@/assets/js/sha1"
import { dateFormat }from '@/assets/js/public'
import { config } from '@/util/config.js'
import { common } from '@/util/common.js'
    export default {
        name: 'wxSign',
        props: {
          signMsg: {
              type: Object,
              default: {}
          }
        },
        data() {
            return {
                today: dateFormat(new Date, 'yyyy-MM-dd HH:mm:ss')
            }
        },
        methods: {
            toSign() {
               let me = this;
               this.getLoaction((res) => {
                    $.ajax({
                        url: config.IP + "/wechat/signIn",
                        type: "post",
                        data: {
                            studentId: common.token.id,
                            courseId: me.signMsg.id,
                            latitude: me.signMsg.latitude,
                            longitude: me.signMsg.longitude
                        },
                        success: function(data) {
                            me.$message.alert({
                                html:'签到成功!'
                            });
                        },
                        error: function(data) {
                            me.$message.alert({
                                html: data.message || '签到失败!'
                            });
                        }
                    })
               })
            },
            getLoaction() {
                $.ajax({
                    url: config.IP + "/wechat/getJsapiTicket",
                    type: "post",
                    success: function(data) {
                        let _id = 'wxf58544e27a43135f';
                        let timestamp = parseInt(new Date().getTime() / 1000) + "";
                        let noncestr = Math.random()
                            .toString(36)
                            .substr(2, 15);
                        var str = `jsapi_ticket=${data.ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${
                        location.href.split("#")[0]
                        }`;
                        let shaObj = new jsSHA('地址', "TEXT"),
                            signature = shaObj.getHash("SHA-1", "HEX");
                        //配置sdk
                        wx.config({
                        debug: false,
                        appId: _id,
                        timestamp,
                        signature,
                        nonceStr: noncestr,
                        jsApiList: [
                            "getLocation",
                            "hideAllNonBaseMenuItem"
                        ]
                        });
                        wx.ready(function () {
                            wx.getLocation({
                                success: function (res) {
                                    alert(JSON.stringify(res));
                                    console.log("纬度："+res.latitude,"经度"+ res.longitude)
                                },
                                cancel: function (res) {
                                    alert('用户拒绝授权获取地理位置');
                                }
                            });
                        });
                    },
                    error: function(data, message) {
                    }
                })
                
            }
            
        },
        created() {
            common.isLogin();
        }
    }
</script>

<style scoped>
   #sign-box {
        padding:  20px 0 0 10px;
   }
   .signBtn {
        background: rgb(16, 72, 131);
        height: 30px;
        width: 80px;
        color: white;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        display: inline-block;
        margin-top: 20px;
   }
</style>
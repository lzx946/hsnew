<template>
    <div class="js_dialog" id="iosDialog2" v-if="visible">
        <div class="mask"></div>
        <div class="dialog" :class="{'skin_android':false}">
            <header v-if="title" class="dialog__hd"><strong class="dialog__title">{{title}}</strong></header>
            <div v-if="html" v-html="html" class="dialog__bd"></div>
            <div v-else class="dialog__bd">{{message}}</div>
            <span v-if="showCloseTip" class="close_tip" @click="visible = false">x</span>
            <footer class="dialog__ft">
                <a href="javascript:;" class="dialog__btn dialog__btn_primary clipboard" @click="handleAction('confirm')">{{confirmText}}</a>
                <a v-if="showCancelButton" href="javascript:;" class="dialog__btn dialog__btn_default" @click="handleAction('cancel')">{{cancelText}}</a>
            </footer>
        </div>
    </div>
</template>

<script>
    let prop = () => {}
    export default {
        name: '',
        components: {},
        data() {
            return {
                title:'提示',
                visible:false,
                cancelText: '关闭',
                confirmText: '确定',
                message:"",
                html:"",
                notClose: '',
                showCancelButton:false,
                callback:prop,
                showCloseTip:false
            }
        },
        methods: {
            handleAction(action) {
                if(!this.notClose) {
                    this.callback(action);
                    this.visible = false;
                }else {
                    this.callback(action);
                    if(action == 'cancel'){
                        this.visible = false;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .dialog {
        position: fixed;
        z-index: 5000;
        width: 80%;
        max-width: 600px;
        font-size: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        text-align: center;
        border-radius: 3px;
        overflow: hidden;
    }
    .close_tip{
        display: inline-block;
        width:50px;
        height:50px;
        line-height:50px;
        text-align: center;
        font-size:20px;
        font-family: '微软雅黑';
        position: absolute;
        right:0;
        top:0;
    }
    .dialog__hd {
        padding: 40px 52px 16px;
    }
    .dialog__title {
        font-weight: 400;
        font-size: 20px;
    }
    .dialog__bd {
        padding: 0 52px 26px;
        min-height: 40px;
        font-size: 20px;
        line-height: 1.3;
        word-wrap: break-word;
        word-break: break-all;
        color: #999999;
    }
    .dialog__bd:first-child {
        padding: 88px 40px 56px;
        color: #353535;
    }
    .dialog__ft {
        position: relative;
        line-height: 96px;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
    }
    .dialog__ft:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #d5d5d6;
        color: #d5d5d6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .dialog__btn {
        position: relative;
        flex:1;
        color: #3cc51f;
        text-align: center;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .dialog__btn:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-left: 1px solid #D5D5D6;
        color: #D5D5D6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }
    .dialog__btn:first-child:after {
        display: none;
    }
    .dialog__btn:active {
        background-color: #eee;
    }
    .dialog__btn_default {
        color: #353535;
    }
    .dialog__btn_primary {
        color: #0bb20c;
    }
    .mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }
</style>

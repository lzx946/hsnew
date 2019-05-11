<template>
    <div>
        <div v-if="CourseList.length">
            <div id="item" class="container item-class" v-for="item in CourseList" style="background: white;">
                <router-link :to="{name:'WeixinPhoneCourseDetail',params:{id:item.courseId}, query: {enroll: 1, status: item.status}}" style="color: black;">
                    <div style="float: left;height: 80%;width: 100%;">
                        <img :src="item.photoUrl" style="height: 95%;float: left;" />
                        <div id="" style="margin-top: 10px; background: rgb(64, 116, 173);width: 100%;height: 25%;z-index:-1;" >
                            <div id="" class="sing-class">
                            </div>
                            <div id="" style="width: 100%;text-align: center;">
                                <p style="color: black;font-size: 1.2em;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
                                    <b>{{item.name}}</b>
                                </p>
                                <p style="margin-top: -10px;">第{{item.period}}期</p>
                            </div>
                            <div id="">
                                <div style="margin-bottom:5px;margin-top:5px;width: 55%;height: 1px;border: 1px solid #CCCCCC;margin-left: 40%;margin-right: auto;">
                                </div>
                                <div style="margin-left: 40%;background: #19568a;color: white;width: 55%;padding-left: 5px;">
                                    <p style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;"><b>{{item.codeFlagName}}</b>:{{item.room}}</p>
                                    <p style="margin-top: -10px;">{{item.startTime}} - {{item.stopTime}}</p>
                                </div>
                            </div>
                            <p class="status">{{statusMap[item.status]}}</p>
                        </div>
                    </div>
                </router-link>
                <div style="width: 35%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;padding-left: 3px;">
                    <p style="text-align: center;font-size: 1.2em;"><b>{{item.employer}}</b></p>
                    <p style="text-align: center;font-size: 1.1em;margin-top: -10px;"><b>{{item.realname}}{{item.academic}}</b></p>
                </div>
            </div>
        </div>
        <div v-else class="no-data"> 
            <div>
                <span>暂无课程，</span><a href="/">立即选课</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            CourseList: {
                type: Array,
                default: []
            }
        },
        name: 'Home',
        data() {
            return {
                statusMap: ['未开课','已开课','已结束','已退报']
            }
        },
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>

<style scoped>
    .item-class {
        width: 96%;
        height: 230px;
        padding: 0;
        position: relative;
        margin-bottom: 30px;
        border-bottom: 1px solid #CCCCCC;
        border-right: 1px solid #CCCCCC;
        /*border-left: 1px solid #CCCCCC;
        border-top: 1px solid #CCCCCC;*/
        box-shadow: 0px 0px 10px #000;
    }
    
    .sing-class {
        background: #000000;
        right: 0;
        width: 1px;
        height: 1px;
        border-right: 23px solid white;
        border-bottom: 23px solid white;
        border-left: 23px solid rgb(64, 116, 173);
        border-top: 23px solid rgb(64, 116, 173);
        position: absolute;
    }
    
    .swiper-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .font-span-class {
        font-size: 5em;
        color: white;
        display: block;
        letter-spacing: 10px;
    }
    
    .home-back-img-class {
        min-height: 768px;
        height: 100%;
        width: 100%;
    }
    
    .home-back-img-class:after {
        display: block;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        content: "";
    }
    
    @keyframes xiala {
        0% {
            bottom: 30px;
        }
        100% {
            bottom: 10px;
        }
    }
    /* Firefox */
    
    @-moz-keyframes xiala {
        0% {
            bottom: 30px;
        }
        100% {
            bottom: 10px;
        }
    }
    /* Safari 和 Chrome */
    
    @-webkit-keyframes xiala {
        0% {
            bottom: 30px;
        }
        100% {
            bottom: 10px;
        }
    }
    /* Opera */
    
    @-o-keyframes xiala {
        0% {
            bottom: 30px;
        }
        100% {
            bottom: 10px;
        }
    }
    
    .xiala-div-class {
        z-index: 1;
        animation: xiala 0.9s linear 0.7s infinite alternate;
        /* Firefox: */
        -moz-animation: xiala 0.9s linear 0.7s infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: xiala 0.9s linear 0.7s infinite alternate;
        /* Opera: */
        -o-animation: xiala 0.9s linear 0.7s infinite alternate;
        position: absolute;
        left: 50%;
        bottom: 30px;
        margin-left: -50px;
        transition: 0.3s;
        /* Firefox 4 */
        -moz-transition: 0.3s;
        /* Safari 和 Chrome */
        -webkit-transition: 0.3s;
        /* Opera */
        -o-transition: 0.3s;
    }
    
    .font-div-class {
        position: absolute;
        bottom: 40%;
        width: 100%;
        transition: 0.3s;
        /* Firefox 4 */
        -moz-transition: 0.3s;
        /* Safari 和 Chrome */
        -webkit-transition: 0.3s;
        /* Opera */
        -o-transition: 0.3s;
    }
    
    .xiala-class {
        height: 100px;
        cursor: pointer;
    }
    
    .xiala-div-class:hover {
        bottom: 20px;
    }
    
    .swiper-slide {
        width: 100%;
        text-align: center;
        font-size: 14px;
        background: rgb(70, 51, 50);
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    
    .tsama-home-img {}
    
    @media screen and (max-width:1350px) {
        .home-back-img-class {
            width: 1600px;
            margin-left: -150px;
        }
        .font-span-class {
            font-size: 3.5em;
            letter-spacing: 10px;
        }
    }
    
    @media screen and (max-width:1150px) {
        .home-back-img-class {
            margin-left: -250px;
        }
        .font-span-class {
            font-size: 3.2em;
            letter-spacing: 10px;
        }
    }
    
    @media screen and (max-width:950px) {
        .home-back-img-class {
            margin-left: -350px;
        }
        .font-span-class {
            font-size: 2.8em;
            letter-spacing: 10px;
        }
    }
    
    @media screen and (max-width:750px) {
        .home-back-img-class {
            margin-left: -450px;
        }
        .font-span-class {
            font-size: 1.6em;
            letter-spacing: 10px;
        }
    }
    
    .expert-img-class-left {
        left: 0;
        height: 400px;
        position: absolute;
    }
    
    .expert-img-class-right {
        right: 0;
        height: 400px;
        position: absolute;
    }
    
    .right-course-div-enlist {
        width: 40%;
        height: 35px;
        background: rgb(16, 72, 131);
        display: inline-block;
        transform: skew(-30deg, 0);
        position: absolute;
        bottom: 0.75em;
    }
    
    .left-course-div-enlist {
        width: 40%;
        height: 35px;
        background: rgb(16, 72, 131);
        display: inline-block;
        transform: skew(30deg, 0);
        position: absolute;
        bottom: 0.75em;
        left: -25px;
        overflow: hidden;
    }
    
    .left-course-div-enlist-share {
        color: white;
        font-size: 0.7em;
        text-align: center;
        line-height: 35px;
        float: left;
        margin-left: 40%;
    }
    
    .left-course-div-enlist-line {
        height: 30px;
        width: 0px;
        margin-left: 20%;
        border-left: 1px solid white;
        float: left;
    }
    
    .left-course-div-enlist-quit {
        color: white;
        font-size: 0.7em;
        margin-left: 5%;
        line-height: 35px;
        cursor: pointer;
        float: left;
    }
    
    .right-course-div {
        margin-left: 30%;
        margin-top: 120px;
    }
    
    .left-course-div {
        margin-right: 30%;
        margin-top: 120px;
        position: relative;
        text-align: right;
    }
    
    .enlist-div {
        width: 33.3%;
        border-right: 2px solid white;
        height: 100%;
        float: left;
        cursor: pointer;
    }
    
    .enlist-div p {
        position: relative;
        transition: 0.5s;
    }
    
    .enlist-div p:after {
        content: '»';
        position: absolute;
        opacity: 0;
        top: 0;
        right: 32%;
        transition: 0.5s;
    }
    
    .enlist-div:hover p {
        padding-right: 25px;
    }
    
    .enlist-div:hover p:after {
        opacity: 1;
        right: 40%;
    }
    
    #course_list_id {
        min-width: 993px;
    }
    
    .swiper-wrapper {
        width: 100%;
    }
    
    @media only screen and (max-width:1200px) {
        .right-course-div {
            margin-left: 35%;
        }
        .left-course-div {
            margin-right: 35%;
        }
        .right-course-div-enlist {
            width: 32%;
        }
        .left-course-div-enlist {
            width: 32%;
        }
        .left-course-div-enlist-share {
            margin-left: 30%;
        }
        .left-course-div-enlist-line {
            margin-left: 10%;
        }
        .left-course-div-enlist-quit {
            margin-left: 5%;
        }
    }
    
    @media only screen and (max-width:992px) {
        .col-sm-12,
        .col-md-12 {
            width: 992px;
        }
    }
    /*expert*/
    
    .photo-img-size-expert {
        transition: all 0.9s;
        height: 500px;
    }
    
    @media screen and (max-width: 1200px) {
        .photo-img-size-expert {
            height: 370px;
        }
    }
    
    @media screen and (max-width: 992px) {
        .photo-img-size-expert {
            height: 450px;
        }
    }
    
    @media screen and (max-width: 400px) {
        .photo-img-size-expert {
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
    
    .photo-img-size-expert:hover {
        cursor: pointer;
        transform: scale(1.05);
        -ms-transform: scale(1.05);
        -webkit-transform: scale(1.05);
        -o-transform: scale(1.05);
        -moz-transform: scale(1.05);
    }
    /*********************/
    /*news */
    
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
        transition: all 0.9s;
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
    .status {
        width: 60px;
        border: 2px solid rgba(25, 87, 138, 1);
        padding: 3px 5px;
        text-align: center;
        float: right;
        margin-right: 15px;
        position: relative;
    }
    .status::before {
        content: '';
        width: 30px;
        height: 30px;
        background: url('../assets/status-icon.png') no-repeat;
        display: inline-block;
        position: absolute;
        top: -5px;
        left: -30px;
        background-size: 100%;
    }
    .no-data div {
        position: absolute;
        top:50%;
        left:50%;
        width:100%;
        transform:translate(-50%,-50%);
        text-align: center;
    }
    /*****************/
</style>
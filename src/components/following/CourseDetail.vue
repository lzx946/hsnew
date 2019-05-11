<template>
    <section >
        <courseprogress :trackDetail="trackDetail" :status="trackDetail.status || 0" type="track"></courseprogress>
        <coursecontent :trackDetail="trackDetail"></coursecontent>
        <courseresult v-if="trackDetail.status >= 1" :trackDetail="trackDetail"></courseresult>
        <upload v-if="trackDetail.status >= 2" :list="trackDetail.fileList" :kcId="trackDetail.courseId"></upload>
        <coursecomment v-if="trackDetail.status >= 4" :list="trackDetail.commentList"></coursecomment>

    </section>
</template>
<script>
import courseprogress from "./CourseProgress.vue";//import引入组件，这是进度条组件
import coursecontent from "./CourseContent.vue";//课程内容
import coursecomment from "./CourseComment.vue";//评论
import courseresult from "./CourseResult.vue";//审核结果
import upload from "./UpLoad.vue";//上传材料
export default {
    props: {
        //从父组件继承课程详情
        trackDetail: {
            type: Object,
            default: {},
        }
    },
    name:"coursedetail",
    //import引入的组件要在components里面注册才可以使用
    components:{
        courseprogress,
        coursecontent,
        courseresult,
        upload,
        coursecomment,
    },
     data() {

    return {};
  },
    created() {
  }
}
</script>




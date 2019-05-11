<template>
    <section >
        <courseprogress :trackDetail="TripDetail" :status="TripDetail.tripProgress.status + ''" type="trip"></courseprogress>
        <coursecontent :trackDetail="TripDetail.courseDetail"></coursecontent>
        <acceptinvitation v-if="TripDetail.tripProgress.status >= 0" :invitationList="TripDetail.invitationList" :tripId="TripDetail.tripId"></acceptinvitation>
        <boardandlodging v-if="TripDetail.tripProgress.status >= 1" :detail="TripDetail" :tripId="TripDetail.tripId" :boardAndLodgingList="TripDetail.boardAndLodgingList"></boardandlodging>
         <materialhandling v-if="TripDetail.tripProgress.status >= 2" :tripFile="TripDetail.tripFile || {}" :tripId="TripDetail.tripId"></materialhandling>
    </section>
</template>
<script>
import courseprogress from "./CourseProgress.vue";//进度条
import coursecontent from "./CourseContent.vue";//详情内容
import acceptinvitation from "./AcceptInvitation.vue";//接受邀请
import boardandlodging from "./BoardAndLodging.vue";//食宿
import materialhandling from "./MaterialHandling.vue";//材料上传
export default {
    name:"tripdetail",
    props: {
        //继承行程详情
        TripDetail: {
            type: Object,
            default: {},
        }
    },
    //引入需注册
    components:{
        courseprogress,
        coursecontent,
        acceptinvitation,
        boardandlodging,
        materialhandling,

    },
     data() {
        return {};
    },
    created() {
        console.log(this.TripDetail)
  }
}
</script>




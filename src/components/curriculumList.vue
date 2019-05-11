<template>
    <div>
        <div class="modal fade bs-example-modal-lg" v-bind:class="showLoadingCss" v-on:dblclick="hideLoading()">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <!-- 已选择的课程列表 -->
        <CurriculumEnroll :CourseList="CourseList"></CurriculumEnroll>
    </div>
</template>

<script>
import CurriculumEnroll  from '@/components/curriculumEnroll'
import { common } from '@/util/common.js'
import { config } from '@/util/config.js'
    export default {
        name: 'curriculumList',
        data() {
            return {
                CourseList: [],
                showLoadingCss: {
                    "in": false,
                    "showloading": false
                },
            }
        },
        methods: {
            getList() {
                var _self = this;
                this.showLoading();
                common.isLogin();
                $.ajax({
                    url: config.IP + "/course/getMyCourseList",
                    type: "post",
                    dataType: "json",
                    contentType:'application/json',
                    data: JSON.stringify({
                        studentId: common.token.id
                    }),
                    success: function(response) {
                        if((typeof response) != 'object') {
                            response = JSON.parse(response)
                        }
                        _self.CourseList = response.data;
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

        mounted() {
            this.getList();
        },
        components: {
            CurriculumEnroll
        }
    }
</script>

<style scoped>

</style>
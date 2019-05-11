<template>
  <section class="follow-section">
    <div class="flex">
      <div class="item" v-for="(item, index) in config">
        <div class="title">{{item.name}}</div>

        <div class="node" :class="{'selected': index <= status}">
          <svg
            t="1556350834908"
            class="icon"
            style="vertical-align: middle;overflow: hidden;"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1261"
          >
            <path
              d="M512 0C229.233778 0 0 229.233778 0 512s229.233778 512 512 512 512-229.233778 512-512S794.766222 0 512 0z m-102.712889 719.672889L223.601778 537.244444l32.796444-48.028444 152.888889 110.222222 359.111111-295.111111 32 24.888889-391.111111 390.456889z"
              p-id="1262"
              data-spm-anchor-id="a313x.7781069.0.i0"
              class="selected"
            ></path>
          </svg>
        </div>

        <div class="time" v-html="item.time || '&nbsp;'"></div>
      </div>
    </div>
    <div class="line">
      <div class="progress-line"></div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    trackDetail: {
      type: Object,
      default() {
        return {}
      }
    },
    status: {
      type: String,
      default: 0
    },
    type: {
      type: String,
      default: 0
    }
  },
  name: "courseprogress",
  data() {
    return {
      config: [],
      config1: [
        {
           name: '申请课程',
           time: this.trackDetail.applyTime || ''
        },
        {
           name: '审核',
           time: this.trackDetail.auditSuccessTime || ''
        },
        {
           name: '材料上传',
           time: this.trackDetail.uploadTime || ''
        },
        {
           name: '开课',
           time: this.trackDetail.courseStartTime || ''
        },
        {
           name: '结课',
           time: this.trackDetail.courseStopTime || ''
        },
      ],
      config2: [
        {
          name: '等待邀请',
          time: this.trackDetail.waitInvitationTime || ''
        },
        {
          name: '接受邀请',
          time: this.trackDetail.acceptInvitationTime || ''
        },
        {
          name: '食宿确定',
          time: this.trackDetail.boardAndLodgingTime || ''
        },
        {
          name: '材料办理',
          time: this.trackDetail.uploadTime || ''
        }
      ]
    };
  },
  created() {
    //课程跟踪和行程跟踪的进度条都用了这个组件，通过props传递type值来区分具体的参数
     this.config = this.type == 'trip' ? this.config2 : this.config1;
  }
};
</script>


<style scoped>

.follow-section{
    
      padding:20px 50px;
      position: relative;
    
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}
.flex .item {
  display: inherit;
  flex-direction: column;
  align-items: center;
}

.flex .item .node {
  width: 30px;
  height: 30px;
  margin: 20px;
  box-shadow: 0px 1px 5px #0000008a;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #fff;
}
.flex .item .node svg {
  width: 100%;
  fill: #fff;
}

.line {
  width: calc(100% - 220px);
  background: #fff;
  height: 10px;
  box-shadow: inset 1px 0px 3px #00000059;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
}
.progress-line {
  background: #19568a;
  width: 100%;
  height: 100%;
}

.flex .item .node.selected svg {
  fill: #19568a;
}
</style>

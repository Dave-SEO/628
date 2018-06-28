<template>
    <div class="meetingList">
        <vheader>
            <span slot="title" class="title">例行会议</span>
        </vheader>
        <div class="cardBox">
          <!-- <div class="card">
            <router-link tag="div" to="/addMeeting/3" class="content">
              Java大牛 带你从0到上线开发企业级电商项目
            </router-link>
            <div class="bottom">
              <a href="javascript:void(0)" @click="dialogTableVisible = true">详情</a>
              <span>管理员：admin </span>
            </div>
          </div> -->

           <div class="card" v-for="(item, index) in meetingData" :key="index">
              <router-link tag="div" to="/addMeeting/1" class="content">
               {{substrFn(item.room_topic)}}
              </router-link>
            <div class="bottom" @click="detailDialog(item.details)">
              <a href="javascript:void(0)">详情</a>
              <span>管理员：{{item.admin_display_name}} </span>
            </div>
          </div>
        </div>
         <el-dialog title="详情" width='386px' top='0' :visible.sync="dialogTableVisible">
             {{desc}}
         </el-dialog>
        <div class="paging" v-show="meetingData.length > 0">
          <el-pagination  layout="prev, pager, next" :total="total" @current-change = 'currentPage'></el-pagination >
        </div>
    </div>
</template>
<script>
import vheader from 'components/vheader'
export default {
  data () {
    return {
      page: 1,
      num: 12,
      total: 10,
      desc: '',
      meetingData: [],
      dialogTableVisible: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.meetingdata()
    })
  },
  methods: {
    substrFn (item) {
      if (item.length > 40) {
        return item.substr(0, 38) + '...'
      } else {
        return item
      }
    },
    meetingdata () {
      this.$http.get('/room/getRoomsByUser', {
        params: {
          page: this.page,
          num: this.num
        }
      }).then((res) => {
        var result = res.data
        switch (result.code) {
          case 401:
            break
          case 200:
            let datas = JSON.parse(result.room)
            this.total = datas.total
            this.meetingData = datas.data
            console.log(datas.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    detailDialog (desc) {
      this.desc = desc
      this.dialogTableVisible = true
    },
    currentPage (index) {
      this.meetingData = []
      this.page = index
      this.meetingdata()
    }
  },
  components: {
    vheader
  }
}
</script>
<style lang='less' coped>
.meetingList /deep/ .el-dialog__header{
  text-align: center;
  border-bottom: 1px solid #E6E6E6;
  padding:0;
  height: 38px;
  line-height: 42px;
  box-sizing: border-box;
}
.meetingList /deep/.el-dialog__headerbtn {
  top:5px;
}
.meetingList /deep/.el-dialog__wrapper{
    justify-content: center;
    align-items: center;
    display: flex;
}
.meetingList /deep/ .el-dialog__body{
  padding:20px 40px 40px 40px;
  line-height: 18px;
}
.meetingList /deep/.el-pager li,.meetingList /deep/.el-pagination button:disabled,.el-pagination .btn-next, .meetingList /deep/.el-pagination .btn-prev{
  background:inherit
}
.meetingList /deep/.btn-prev,.meetingList /deep/.btn-next{
  width: 24px;
  height: 24px;
  border: 1px solid #D0D4E0;
  box-sizing: border-box;
  border-radius: 4px;
  }
 .meetingList /deep/ .el-pagination button, .el-pagination span:not([class*=suffix]){
    min-width: 24px;
    padding:0;
  }
.meetingList{
    .cardBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .card {
      &:hover{
        box-shadow: 0 0 8px 2px #DFD4C9;
      }
      position: relative;
      width: 220px;
      height: 138px;
      background: #fff;
      box-shadow: 2px 2px 2px 0 #e8dbce;
      border-radius: 4px;
      margin: 16px 20px 0 0;
      .content {
        color: #212121;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 0 18px;
        width: 100%;
        height: 108px;
        box-sizing: border-box;
        line-height: 22px;
        &:hover{
          cursor: pointer;
          color: #129BED;
        }
      }
      .bottom {
        display: flex;
        height: 30px;
        justify-content: space-between;
        align-items: center;
        padding: 0 9px;
        border-top: 1px solid #f5f2ef;
        box-sizing: border-box;
        a {
          color: #129bed;
        }
        span {
          color: #868686;
        }
      }
    }
  }
  .paging{
    position: fixed;
    left: 0;
    width: 100%;
    text-align: center;
    bottom: 56px;
  }
}

</style>

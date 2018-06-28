<!-- 例行会议室管理-详情 -->
<template>
  <div class="wrap">
      <vheader>
          <a href="javascript:;" slot="back" class="back" @click="back">返回</a>
      </vheader>
      <div class="content">
          <div class="info inon-star">
              <span class="left">会议室名称：</span>
              <i>会议室名称1</i>
          </div>
          <div class="info inon-star">
              <span class="left">主持人：</span>
              <i>admin</i>
          </div>
          <div class="info inon-star">
              <span class="left">参与人员：</span>
              <i>互动人员</i>
          </div>
          <div class="line"></div>
          <div class="info" style="margin-top:20px;">
              <span class="left">直播拉流地止：</span>
              <i>www.baidu.com</i>
              <el-button  size="mini" v-clipboard:copy="'www.baidu.com'" v-clipboard:success="onCopy"  v-clipboard:error="onError">复制</el-button>
          </div>
           <div class="info">
              <span class="left">观看直播密码：</span>
              <i>123456</i>
               <el-button  size="mini" v-clipboard:copy="'123456'" v-clipboard:success="onlivePwdCopy"  v-clipboard:error="onlivePwdError">复制</el-button>
          </div>
          <div class="info inon-star">
              <span class="left">会议开始条件设置：</span>
              <i>主持人进入</i>
          </div>
           <div class="line"></div>
           <div class="info" style="margin-top:20px;">
              <span class="left">详情：</span>
              <p class="eare"></p>
          </div>
           <div class="info" style="margin-top:20px;">
              <span class="left">会议统计：</span>
              <div class="download-box">
                  <ul class="download">
                      <li>
                          <span>1. 周三会议2008</span>
                          <el-button size='mini'>下载</el-button>
                      </li>
                       <li>
                          <span>1. 周三会议2008</span>
                          <el-button size='mini'>下载</el-button>
                      </li>
                       <li>
                          <span>1. 周三会议2008</span>
                          <el-button size='mini'>下载</el-button>
                      </li>
                  </ul>
                   <el-pagination  layout="prev, pager, next" :total="50"> </el-pagination>
              </div>
          </div>
      </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import vheader from 'components/vheader'
export default {
  data () {
    /* eslint-disable */
    var zNodes = [
      { id: 1, pId: 0, name: '父节点1 - 展开', open: true},
      { id: 11, pId: 1, name: '父节点11 - 折叠'},
      { id: 111, pId: 11, name: '叶子节点111'},
      { id: 112, pId: 11, name: '叶子节点112'},
      { id: 113, pId: 11, name: '叶子节点113'},
      { id: 114, pId: 11, name: '叶子节点114'},
      { id: 12, pId: 1, name: '父节点12 - 折叠'},
      { id: 121, pId: 12, name: '叶子节点121'},
      { id: 122, pId: 12, name: '叶子节点122'},
      { id: 123, pId: 12, name: '叶子节点123'},
      { id: 124, pId: 12, name: '叶子节点124'},
      { id: 13, pId: 1, name: '父节点13 - 没有子节点', isParent: true},
      { id: 2, pId: 0, name: '父节点2 - 折叠'},
      { id: 21, pId: 2, name: '父节点21 - 展开', open: true},
      { id: 211, pId: 21, name: '叶子节点211'},
      { id: 212, pId: 21, name: '叶子节点212'},
      { id: 213, pId: 21, name: '叶子节点213'},
      { id: 214, pId: 21, name: '叶子节点214'},
      { id: 22, pId: 2, name: '父节点22 - 折叠'},
      { id: 221, pId: 22, name: '叶子节点221'},
      { id: 222, pId: 22, name: '叶子节点222'},
      { id: 223, pId: 22, name: '叶子节点223'},
      { id: 224, pId: 22, name: '叶子节点224'},
      { id: 23, pId: 2, name: '父节点23 - 折叠'},
      { id: 231, pId: 23, name: '叶子节点231'},
      { id: 232, pId: 23, name: '叶子节点232'},
      { id: 233, pId: 23, name: '叶子节点233'},
      { id: 234, pId: 23, name: '叶子节点234'},
      { id: 3, pId: 0, name: '父节点3 - 没有子节点', isParent: true}
    ]
    return {
       // tree setting配置
      setting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        check: {
          enable: true
        },
      },
      zTreedata: zNodes
    }
  },
  components: {vheader},
  computed: {},
  mounted () {
    this.$nextTick(() => {
      /* eslint-disable */
        $.fn.zTree.init($('#treeDemo'), this.setting, this.zTreedata)
    })
  },
  methods: {
    groupDialog () {
        let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        // 获取当前被勾选的节点
        let sNodes = treeObj.getCheckedNodes(true);
        if (sNodes.length > 0) {
            // 获取当前被选中的节点的所有父节点 包括自己
            let node = sNodes[0].getPath()
            let str = ''
            let nodeLen = node.length -1
            node.forEach((item,index) => {
                if(nodeLen === index){
                    str += item.name
                }else{
                     str += item.name + ' / '
                }
            });
            this.groupName = str
            this.groupDialogVisible = false
        }
    },
    back () {
      this.$router.back('-1')
    },
     // 直播拉流复制成功
    onCopy(e){
      console.log('zz',e.text)
    },
    // 直播拉流复制失败
    onError(e){
      alert("失败")
    },
      // 观看直播复制成功
    onlivePwdCopy(e){
      console.log('zb',e.text)
    },
    // 观看直播复制失败
    onlivePwdError(e){
      alert("失败")
    }
  }
}
</script>
<style lang='less' scoped>
.wrap .download/deep/.el-button{
    background: #AB1D29;
    border-radius: 2px;
    border:1px solid #AB1D29;
    color: #fff;
}
.inon-star::before{
   content: '*';
    display: block;
    position: absolute;
    top: 1px;
    font-size: 20px;
    color: #E61616; 
    left: -10px;
}
.wrap{
    .content{
        padding-top:26px;
        font-size: 14px;
        color: #212121;
        .info{
            position: relative;
            margin-bottom: 33px;
            .left{
                display: inline-block;
                width:126px;
            }
            i{
                display: inline-block;
                width: 200px;
                margin-right: 22px;
            }
            .eare{
                width: 300px;
                height: 177px;
                overflow-y: scroll;
                border: 1px solid #DADDE6;
                border-radius: 2px;
                display: inline-block;
                vertical-align: top;
            }
            .download-box{
                display: inline-block;
                width: 500px;
                height: 134px;
                vertical-align: top;
                .download{
                    width: 500px;
                    height: 134px;
                    background: #FFF5F6;
                    border: 1px solid #E4CED0;
                    margin-bottom: 10px;
                    list-style: none;
                    li{
                        list-style: none;
                        padding-left: 12px;
                        padding-right: 20px;
                        height: 44px;
                        line-height: 44px;
                        border-bottom: 1px solid #E4CED0;
                        span{
                            display: inline-block;
                            width: 373px;
                            margin-right: 30px;
                        }
                    }
                }
            }
        }
        .line{
            width: 100%;
            height: 1px;
            background: #dddddd;
        }
    }
}
</style>

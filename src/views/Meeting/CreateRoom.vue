<!-- 例行会议室管理-编辑 -->
<template>
  <div class="wrap">
      <vheader>
          <a href="javascript:;" slot="back" class="back" @click="back">返回</a>
      </vheader>
      <div class="content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="会议室名称" prop="user">
                <el-input v-model="ruleForm.user"></el-input>
            </el-form-item>
            <el-form-item label="主持人" prop="zhuchi">
                 <el-input placeholder="请输入关键字" v-model="ruleForm.zhuchi" class="input-with-select">
                    <el-select v-model="ruleForm.zhuchi" slot="append" placeholder="请选择" >
                       <el-option label="admin" value="admin"></el-option>
                        <el-option label="管理员" value="管理员"></el-option>
                    </el-select>
                 </el-input>
            </el-form-item>
             <div class="select-group">
               <span>参会人员</span>
               <i>互动成员</i>
               <ul id="treeDemo" class="ztree"></ul>
            </div>
            <div class="select-group">
               <span>直播拉流地址</span>
               <i>{{sysAppIds}}</i>
               <el-button  size="mini" v-clipboard:copy="sysAppIds" v-clipboard:success="onCopy"  v-clipboard:error="onError">复制</el-button>
            </div>
            <div class="select-group">
               <el-checkbox v-model="liveChecked"></el-checkbox>
               <span> 观看直播密码</span>
               <div style="width:200px;display:inline-block">
                   <el-input onpaste="return false" oncontextmenu="return false" oncopy="return false"  oncut="return false"  size="mini" :placeholder="liveChecked?'请输入1-20位数字密码': ''" :disabled="liveChecked? false: true"></el-input>
               </div>
               <el-button  size="mini" v-clipboard:copy="livePwd" v-clipboard:success="onlivePwdCopy"  v-clipboard:error="onlivePwdError">复制</el-button>
            </div>
            <div class="select-group">
               <span>会议开始条件设置</span>
               <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options"  :key="item.value"  :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <el-form-item label="详情" prop="detail">
                <el-input type="textarea" v-model="ruleForm.note"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" size="medium" @click="submitForm('ruleForm')">确定</el-button>
                <el-button size="medium" @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
      </div>
      <el-dialog title="" :visible.sync="failed" width="352px" top='45vh' center>
        <span>修改失败，当前会议室正在开会中</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="failed = false">确 定</el-button>
        </span>
      </el-dialog>
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
      ruleForm: {
        zhuchi: 'admin',
        idCard: '',
        user: '',
        pwd: '',
        detail: ''
      },
      rules: {
        zhuchi: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        idCard: [
          {required: true,
            pattern: /^[0-9A-Za-z]{5,20}$/g,
            message: '请输入字母或数字，长度为5-20位',
            trigger: 'blur'}
        ],
        user: [{required: true, min: 1, max: 50, message: '只可输入1-50个字符以内', trigger: 'blur'}],
        pwd: [
          {required: true,
            pattern: /^\d{1,20}$/g,
            message: '请输入数字，长度为1-20位',
            trigger: 'blur' }],
        detail: [{max: 200, message: '最多为200个字符'}]
      },
    //   组名
      groupName: '',
      sysAppIds: 'https://www.baidu.com',
    //   观看直播复选框
      liveChecked: false,
      livePwd: 123,
      options: [{
          value: '选项1',
          label: '主持人进入'
        }],
        value: '主持人进入',
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
      zTreedata: zNodes,
    //   弹框
    failed: false
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.failed = true
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$router.push('/MeetingManagement')
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
 .wrap /deep/.el-select .el-input {
    width: 130px;
  }
  .wrap /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
 .wrap /deep/.el-button--danger{
    background: #AB1D29;
    border:1px solid #AB1D29;
  }
  .wrap .zubie/deep/.el-dialog{
    height: 354px;
    overflow-y: auto;
  }
  .wrap .el-dialog__body{
      text-align: center;
  }
.wrap{
    width: 100%;
    height: 100%;;
    background:#fff;
    .content{
        width: 445px;
        padding-top:20px;
    }
}
.select-group{
    padding-left:46px;
    font-size:14px;
    margin-bottom: 22px;
    span{
        margin-right: 22px;
    }
    a{
        color:#129BED;
    }
}
.tree_wrap{
    min-height: 200px;
}
</style>

<!-- 添加用户 -->
<template>
  <div class="wrap">
      <vheader>
          <a href="javascript:;" slot="back" class="back" @click="back">返回</a>
      </vheader>
      <div class="content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="类型" prop="type">
                 <el-input placeholder="请输入关键字" v-model="ruleForm.type" class="input-with-select">
                    <el-select v-model="ruleForm.type" slot="append" placeholder="请选择" >
                       <el-option label="与会者" value="与会者"></el-option>
                        <el-option label="管理员" value="管理员"></el-option>
                    </el-select>
                 </el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="显示名" prop="display_name">
                <el-input v-model="ruleForm.display_name"></el-input>
            </el-form-item>
            <div class="select-group">
               <span>组别</span>
               <a href="javascript:;" @click="groupDialogVisible = true">{{groupName?groupName:'选择组别'}} </a>
            </div>
             <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" onpaste="return false"
                    oncontextmenu="return false" oncopy="return false"  oncut="return false"></el-input>
            </el-form-item>
             <el-form-item label="手机" prop="phone">
                <el-input v-model="ruleForm.phone" onkeyup="this.value=this.value.replace(/[^\d]/g,'');" oncopy="return false"  oncut="return false"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" size="medium" @click="submitForm('ruleForm')">确定</el-button>
                <el-button size="medium" @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- 组别弹框 -->
        <el-dialog title="" :visible.sync="groupDialogVisible" width="460px" top='30vh' center>
            <div class="tree_wrap">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" size='small' @click="groupDialog">确 定</el-button>
                <el-button size='small' @click="groupDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
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
      ruleForm: {
        type: '与会者',
        name: '',
        display_name: '',
        password: '123456',
        phone: '',
        remark: ''
      },
      rules: {
        type: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name: [
          {required: true,
            pattern: /^[0-9A-Za-z]{5,20}$/g,
            message: '请输入字母或数字，长度为5-20位',
            trigger: 'blur'}
        ],
        display_name: [{required: true, min: 1, max: 50, message: '只可输入1-50个字符以内', trigger: 'blur'}],
        password: [
          {required: true,
            pattern: /^\d{1,20}$/g,
            message: '请输入数字，长度为1-20位',
            trigger: 'blur' }],
        remark: [{max: 200, message: '最多为200个字符'}]
      },
      groupName: '',
      // 组别弹窗
      groupDialogVisible: false,
      // tree setting配置
      setting: {
        data: {
          simpleData: {
            enable: true
          }
        },
        check: {
          enable: true,
          chkStyle: "radio",
          radioType: "all",
          chkboxType: { "Y" : "p", "N" : "ps" }
        },
      },
      zTreedata: zNodes
    }
  },
  components: {vheader},
  computed: {},
  mounted () {
  },
  updated() {
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
    AddPeopleData () {
      let user_type = this.ruleForm.type === '与会者'? 2 : 1
      // console.log(this.ruleForm.type)
      // console.log(this.ruleForm.name)
      // console.log(this.ruleForm.display_name)
      // console.log(this.ruleForm.password)
      // console.log(this.ruleForm.phone)
      // console.log(this.ruleForm.remark)
      let postData = {
        name: this.ruleForm.name,
        display_name: this.ruleForm.display_name,
        password: this.ruleForm.password,
        user_type: user_type,
        phone: this.ruleForm.phone,
        group_id: 1,
        remark: this.ruleForm.remark
      }
      this.$http({
        method: 'post',
        url: '/room/user',
        data: postData
      }).then((res) => {
        if(res.data.code === 200){
           this.$message({
              message: '保存成功',
              type: 'success',
              onClose: () => {
                  this.$router.push('/PeopleManagement')
              }
            })
            
        }else {
          this.$message({
              message: res.data.message,
              type: 'error'
          })
        }
        console.log('qq',res.data.code)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.AddPeopleData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$router.push('/PeopleManagement')
    }
  }
}
</script>
<style lang='less' scoped>
input[type=number] {  
    -moz-appearance:textfield;  
}  
input[type=number]::-webkit-inner-spin-button,  
input[type=number]::-webkit-outer-spin-button {  
    -webkit-appearance: none;  
    margin: 0;  
}  
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
  .wrap /deep/.el-dialog{
    height: 354px;
    overflow-y: auto;
  }
.wrap{
    width: 100%;
    height: 100%;;
    background:#fff;
    .content{
        width: 400px;
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

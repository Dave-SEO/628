<!-- 组管理 -->
<template>
  <div class="group-wrap">
      <vheader>
           <span slot="title" class="title">组管理</span>
       </vheader>
       <div class="tree_btnbox" v-show="actionTree">
         <el-button plain size="small" :disabled ='add' @click="handleAdd = true">添加子集组</el-button>
         <el-button plain size="small" :disabled ='del' @click="handleDelete = true">删除</el-button>
         <el-button plain size="small" :disabled ='editor' @click="handleEdit = true">编辑组名称</el-button>
         <el-button plain size="small" :disabled ='reset' @click="ztreeReset">重置</el-button>
       </div>

      <el-dialog title="" :visible.sync="handleAdd" width="340px" top='40vh'  center class="dialog-box">
          <el-form :model="form" :rules="rules2" ref="ruleForm">
            <el-form-item label="组名称:" prop="ztreeName" label-width="80px">
              <el-input v-model="form.ztreeName" auto-complete="off" style="width:160px;" ref="el-input"></el-input>
            </el-form-item>
            <el-form-item class="btn">
                  <el-button @click="handleCancel()">取 消</el-button>
                  <el-button type="primary" @click="ztreeAdd('ruleForm')">确 定</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>

       <el-dialog title="" :visible.sync="handleEdit" width="340px" top='40vh'  center class="dialog-box">
          <el-form :model="form" :rules="rules2" ref="EditForm">
            <el-form-item label="组名称:" prop="ztreeName" label-width="80px">
              <el-input v-model="form.ztreeName" auto-complete="off" style="width:160px;" ref="el-input"></el-input>
            </el-form-item>
            <el-form-item class="btn">
                  <el-button @click="handleCancelEdit()">取 消</el-button>
                  <el-button type="primary" @click="ztreeEdit('EditForm')">确 定</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
      <el-dialog title="" :visible.sync="handleDelete" width="340px" top='40vh'  center class="dialog-box" >
            <div style="text-align:center">确定删除所选组别？</div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="ztreeDelete()">确 定</el-button>
              <el-button @click="handleDelete = false">取 消</el-button>
            </span>
      </el-dialog>
       <div class="tree_wrap">
          <ul id="treeDemo" class="ztree"></ul>
       </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import vheader from 'components/vheader'
export default {
  data () {
    /* eslint-disable */
    var zNodes = [
      { id: 1, pId: 0, name: '根节点组', open: true},
      { id: 11, pId: 1, name: '默认组'},
      { id: 111, pId: 11, name: '叶子节点111'},
      { id: 112, pId: 11, name: '叶子节点112'},
      { id: 113, pId: 11, name: '叶子节点113'},
      { id: 114, pId: 11, name: '叶子节点114'},
      { id: 12, pId: 1, name: '父节点12 - 折叠'},
      { id: 121, pId: 12, name: '叶子节点121'},
      { id: 122, pId: 12, name: '叶子节点122'},
      { id: 123, pId: 12, name: '叶子节点123'},
      { id: 124, pId: 12, name: '叶子节点124'},
      { id: 13, pId: 1, name: '父节点13 - 没有子节点'}
    ]
    return {
      zTreedata: zNodes,
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
        edit: {
          enable: false,
          showRemoveBtn: false,
          showRenameBtn: false
			  },
        callback: {
		      onCheck: this.zTreeOnCheck,
          beforeCheck: this.zTreeBeforeCheck,
          beforeClick: this.zTreeBeforeClick
	      }
      },
      actionTree:false,
      add: false,
      del: false,
      editor: false,
      reset: false,
      handleAdd: false,
      handleEdit: false,
      handleDelete: false,
      form: {
          ztreeName: ''
      },
      rules2: {
        ztreeName: [{required: true, message: '不为空',}]
      }
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
    zTreeBeforeCheck(treeId, treeNode) {
      // 每次勾选前，先初始化
        this.actionTree = false
        this.add = false
        this.del = false
        this.editor = false
        this.reset = false

    },
     zTreeOnCheck (event, treeId, treeNode) {
       let treeObj = $.fn.zTree.getZTreeObj("treeDemo")
      //  if(treeNode.checked){
      //    treeObj.selectNode(treeNode)
      //  }else{
      //    treeObj.cancelSelectedNode(treeNode)
      //  }   
      //  获取选中节点
       let sNodes = treeObj.getCheckedNodes(true)
        var checkedArr = []
       if(sNodes.length>0){
        //  获取完全选中状态
         sNodes.forEach((list,i) => {
           if(!list.getCheckStatus().half){
             checkedArr.push(list)
           }
         })
       }
      console.log(checkedArr)
       if(checkedArr.length >1){
          this.editor = true
          this.add = true
       }
       if(checkedArr.length > 0){
         checkedArr.forEach((item, index) => {
           // 跟节点
           if (item.pId === null) {
             console.log(1)
              this.editor = true
              this.del = true
           }else if (item.id === 11 || item.pId === 11) {
              console.log(2)
             // 默认组
             this.editor = true
             this.del = true
             this.add = true
           }
         });
         this.actionTree = true
       }else{
       }
      
     },
     zTreeBeforeClick (treeId, treeNode, clickFlag) {
      //  return false
      //  var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      //  console.log(treeNode)
			//  zTree.checkNode(treeNode, !treeNode.checked, null, true);
     },
     handleCancel () {
       this.$refs['ruleForm'].resetFields()
       this.handleAdd = false
     },
     ztreeAdd (formName) {
       this.$refs[formName].validate(valid => {
        if (valid) {
           console.log('ztreeAdd',this.form.ztreeName)
          var zTree = $.fn.zTree.getZTreeObj("treeDemo")
          //  var nodes = zTree.getSelectedNodes()
          var nodes = zTree.getCheckedNodes(true)
          var treeNode = nodes[0]
            if (treeNode) {
              treeNode = zTree.addNodes(treeNode, {id:(100 + 3), pId:treeNode.id, name:this.form.ztreeName});
            } else {
              treeNode = zTree.addNodes(null, {id:(100), pId:0, name: this.form.ztreeName});
            }
            if (treeNode) {
              zTree.editName(treeNode[0]);
            } else {
              alert("叶子节点被锁定，无法增加子节点");
            }
          this.handleAdd = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
     },
     ztreeEdit (formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
         	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
          nodes = zTree.getCheckedNodes(true),
          treeNode = nodes[0];
          console.log(treeNode)
          if (nodes.length == 0) {
            alert("请先选择一个节点");
            return;
          }
          zTree.editName(treeNode);
        } else {
          console.log('error submit!!')
          return false
        }
      })
     },
     handleCancelEdit () {
       this.$refs['EditForm'].resetFields()
       this.handleEdit = false
     },
     ztreeDelete () {
       // 获取ztree
       var treeObj = $.fn.zTree.getZTreeObj("treeDemo")
       // 获取选中的CheckBox，包括半选
       var nodes = treeObj.getCheckedNodes(true)
      // 获取全部选中的CheckBox
      var checkAlls = []
      nodes.forEach((ite, ind)=>{
        if(!ite.getCheckStatus().half){
          checkAlls.push(ite)
        }
      })
      // 判断选中的CheckBox里是否包含子节点
       var checkIsParent = checkAlls.some((item) => {
         console.log(item.isParent)
          return item.isParent === true
        })
      // 如果CheckBox没有子级
       if(!checkIsParent){
         for (var i=0, l=checkAlls.length; i < l; i++) {
            treeObj.removeNode(checkAlls[i])
         }
       }else{
         //如果有子级
         alert('有子级')
       }
     },
     ztreeReset() {
        this.add = false
        this.del = false
        this.editor = false
        this.reset = false
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo")
        treeObj.checkAllNodes(false)
     }
  }
}
</script>
<style lang='less' scoped>
 .group-wrap .tree_btnbox /deep/ .el-button+.el-button{
   margin:0;
}
.group-wrap /deep/ input{
  height: 30px;
}
  .group-wrap{
    .tree_wrap{
      margin-top:15px;
    }
    .el-dialog{
      height: 142px;
    }
    .tree_btnbox{
        font-size: 0;
        display: inline-block;
        position: absolute;
        right: 15px;
        top:15px;
      }
      .btn{
        display: flex;
        justify-content: center;
      }
  }
</style>

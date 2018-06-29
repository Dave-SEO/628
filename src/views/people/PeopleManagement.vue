<template>
    <div class="peopleList" style="overflow-x: auto;padding-left:30px;background:#fff">
        <vheader>
            <span slot="title" class="title">人员管理</span>
        </vheader>
        <router-link to="/AddPeople">
          <el-button type="danger" icon="el-icon-plus" class="addpeople" size='mini'>添加用户</el-button>
        </router-link>
        <div class="table-box">
          <div class="top">
            <div class="action">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list='false'
                :on-success = 'onSuccess' :on-error = 'onError' :before-upload='beforeUpload' :on-progress = 'onProgress'
                  multiple :limit="3">
                <a href="javascript:;"><i class="icon import_normal"></i>导入用户</a>
              </el-upload>
              <a href="javascript:;"><i class="icon template_normal"></i>模板下载</a>
            </div>
            <div class="search">
             <el-input placeholder="请输入关键字" v-model="input5" class="input-with-select">
                 <el-select v-model="select" slot="prepend" placeholder="请选择" id="select">
                  <el-option label="显示名" value="1"></el-option>
                  <el-option label="组别" value="2"></el-option>
                  </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </div>
          <div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="用户名" width='100px'></el-table-column>
              <el-table-column  prop="display_name" label="显示名" ></el-table-column>
              <el-table-column prop="group_name" label="组别"></el-table-column>
              <el-table-column prop="created_at" label="创建时间"></el-table-column>
              <el-table-column prop="user_type" label="类型"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <a  href="javascript:;" @click="handleEdit(scope.$index, scope.row)" class="btn-edit">编辑</a>
                  <a href="javascript:;" @click="handleDelete(scope.$index, scope.row,scope)" class="btn-del">删除</a>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="" :visible.sync="dialogFormVisible" center width='350px'  top='40vh'>
                <span>确定要删除吗？</span>
                <div slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="dialogDel" size='medium'>完成</el-button>
                  <el-button @click="delCancel" size='medium'>取 消</el-button>
                </div>
            </el-dialog>
          </div>
        </div>
        <div class="paging" v-show="tableData.length > 0">
          <el-pagination  layout="prev, pager, next"  :total="total" @current-change = 'currentPage'></el-pagination>
        </div>
        <el-dialog title="详情" width='386px' top='0' :visible.sync="dialogTableVisible">
            Java大牛带你从0到上线开发企业级电商项目Java大牛带你从0到上线开发企业级电商项目Java大牛带你从0到上线开发企业级电商项目
        </el-dialog>

        <div class="daoru" style="font-size: 14px;border-width: 1px;border-style: solid;position: absolute;left: 0;right: 0;top: 0;margin: auto;z-index: 9999;width:240px;height:50px;line-height:50px;text-align:center;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;"
          :style="{background: bg,color: bgColor,borderColor:borderColor}">
            导入中{{daoru}}
        </div>
    </div>
</template>
<script>
import vheader from 'components/vheader'
export default {
  data () {
    return {
      bg: '#f0f9eb',
      bgColor: '#67c23a',
      borderColor: '#e1f3d8',
      daoru: '0%',
      dialogTableVisible: false,
      dialogFormVisible: false,
      input5: '',
      tableData: [],
      select: '显示名',
      type: 0,
      total: 0,
      page: 1,
      num: 12,
      // 删除的id
      del: '',
      // 上传进度
      rate: 0
      // tableData: [{
      //   date: 'admin',
      //   name: 'admin',
      //   address: '杭州小组',
      //   time: '2018.05.31',
      //   type: '管理员',
      //   note: '备注内容',
      //   operation: '操作'
      // }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.select)
      this.mangementData()
    })
  },
  methods: {
    mangementData () {
      if (this.select === '显示名') {
        this.type = 1
      } else if (this.select === '组别') {
        this.type = 2
      }
      this.$http.get('/room/showUsers', {
        params: {
          page: this.page,
          num: this.num,
          type: this.type,
          key: this.input5
        }
      }).then((res) => {
        switch (res.data.code) {
          case 200:
            this.tableData = res.data.data.data
            this.total = res.data.data.total
            console.log(res.data)
            break
        }
      })
    },
    currentPage (index) {
      this.tableData = []
      this.page = index
      this.mangementData()
    },
    search () {
      this.mangementData()
    },
    handleEdit (index, row) {
      this.$router.push('/edit/' + row.id)
    },
    handleDelete (index, row, a) {
      this.dialogFormVisible = true
      this.del = row.id
    },
    dialogDel () {
      this.$http.delete('room/user/' + this.del).then((res) => {
        let result = res.data
        switch (result.code) {
          case 200:
            this.dialogFormVisible = false
            this.mangementData()
            break
        }
        console.log('del', res)
      })
      this.del = ''
    },
    delCancel () {
      this.dialogFormVisible = false
      this.del = ''
    },
    // 文件上传
    onSuccess (response, file, fileList) {
      console.log('------------ddd----------')
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    onError (errs, file, fileList) {
    },
    beforeUpload (file) {
      console.log(this.rate)
    },
    onProgress (event, file, fileList) {
      this.daoru = Math.floor(event.percent) + '%'

      // console.log('event', Math.floor(event.percent) + '%')
      // console.log(file)
      // console.log('fileList', fileList)
    }
  },
  components: {
    vheader
  }
}
</script>
<style lang='less' scoped>
.search /deep/ input,.search /deep/ .el-input__icon{
  height: 32px;
  line-height: 32px;
}
.search /deep/ .el-button--mini{
  padding: 8px 15px;
}
.search /deep/ .el-button{
  padding: 8px 20px;
}
.peopleList /deep/ .el-button--danger{
  background: #AB1D29;
  border:1px solid #AB1D29;
}
.peopleList /deep/.el-input-group__prepend .el-input {
    width: 90px;
  }
 .peopleList .search /deep/ .el-input__inner{
   width: 130px;
 }
  .peopleList .search/deep/ .el-select .el-input__inner{
   width: 91px;
 }
.peopleList /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .peopleList /deep/ .search .el-button--default{
    background: #AB1D29;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: #fff;
    border:1px solid #AB1D29;
    margin-top: -13px;
  }
  .peopleList /deep/.el-table th {
        background-color: #F5F2EF;
  }
 .peopleList /deep/ .el-dialog__body{
   font-size: 16px;
   text-align: center;
 }
 .btn-edit:hover,.btn-del:hover{
   text-decoration: underline
 }
 .btn-edit{
   width: 36px;
   display: inline-block;
   color: #37ABF0;
 }
 .btn-del{
    width: 36px;
    display: inline-block;
   color: #E03838;
 }

.peopleList{
  .upload-demo{
    display: inline-block;
  }
  .addpeople{
    position: absolute;
    top:15px;
    right: 15px;
  }
  .table-box{
    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      .action{
        a{
          color: #282828;
          margin-right: 20px;
        }
      }
      .icon{
        font-size: 14px;
        display: inline-block;
        width: 19px;
        height: 19px;
        vertical-align: middle;
        margin-right: 8px;
        &.import_normal{
          background: url('../../assets/images/import_normal.png')
        }
        &.template_normal{
           background: url('../../assets/images/template_normal.png')
        }
      }
      .search{

        margin-right: 15px;
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

<template>
    <div class="peopleList" style="overflow-x: auto">
        <vheader>
             <a href="javascript:;" slot="back" class="back" @click="back">返回</a>
        </vheader>
          <el-button type="danger" icon="el-icon-plus" class="addpeople" size='mini' @click="addMember = true">添加组员</el-button>
        <div class="table-box">
          <div class="top">
            <div class="action">
              <a href="javascript:;"><i class="icon import_normal"></i>导入组员</a>
              <a href="javascript:;"><i class="icon template_normal"></i>模板下载</a>
            </div>
            <div class="search">
             <el-input placeholder="请输入关键字" v-model="input5" class="input-with-select">
                 <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="显示名" value="1"></el-option>
                  <el-option label="组别" value="2"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
          <div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="序号" ></el-table-column>
              <el-table-column  prop="account" label="用户名" ></el-table-column>
              <el-table-column  prop="showName" label="显示名" ></el-table-column>
              <el-table-column prop="address" label="组别"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handledelete(scope.$index, scope.row)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="" :visible.sync="dialogFormVisible" center width='370px'  top='40vh'>
                <span>确认移除该组员，该组员将添加到默认组？</span>
                <div slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="dialogFormVisible = false" size='medium'>确定</el-button>
                  <el-button @click="dialogFormVisible = false" size='medium'>取 消</el-button>
                </div>
              </el-dialog>
          </div>
        </div>
        <!--  添加成员弹框 -->
        <el-dialog :visible.sync="addMember" width='484px' center>
              <div class="search" style="width: 277px;margin: 0 auto;">
                <el-input placeholder="请输入关键字" v-model="addMemberInput" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="显示名" value="1"></el-option>
                    <el-option label="组别" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <el-table  ref="multipleTable" :data="addMemberData" tooltip-effect="dark" style="width: 100%;margin-top:20px;">
                <el-table-column type="selection"></el-table-column>
                <el-table-column  prop="showName" label="用户显示名" width="120"> </el-table-column>
                <el-table-column label="组别" width="220"><template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" placement="right" >
                      <div slot="content">{{scope.row.group}}</div>
                      <span>{{ group(scope.row.group).item }}</span>
                  </el-tooltip>
                  </template></el-table-column>
            </el-table>
             <div slot="footer" class="dialog-footer">
                <div class="" style="margin-bottom:18px;">
                    <el-pagination  layout="prev, pager, next" :current-page="currentPage" :pageSize='3' :total="50" @current-change="changeCurPage"></el-pagination>
                </div>
                  <el-button type="danger" @click="addMember = false" size='medium'>确定</el-button>
                  <el-button @click="addMember = false" size='medium'>取 消</el-button>
             </div>
        </el-dialog>
        <div class="paging">
          <el-pagination layout="prev, pager, next"  :total="10"></el-pagination>
        </div>
        <el-dialog title="详情" width='386px' top='0' :visible.sync="dialogTableVisible">
            Java大牛带你从0到上线开发企业级电商项目Java大牛带你从0到上线开发企业级电商项目Java大牛带你从0到上线开发企业级电商项目
        </el-dialog>
    </div>
</template>
<script>
import vheader from 'components/vheader'
export default {
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      addMember: false,
      addMemberInput: '',
      currentPage: 1,
      addMemberData: [
        {
          showName: 'admin',
          group: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎'
        },
        {
          showName: 'admin',
          group: '杭州'
        },
        {
          showName: 'admin',
          group: '苏州'
        },
        {
          showName: 'admin',
          group: '王小虎'
        },
        {
          showName: 'admin',
          group: '杭州'
        },
        {
          showName: 'admin',
          group: '苏州'
        }
      ],
      input5: '',
      select: '显示名',
      tableData: [{
        id: 'admin',
        account: '1',
        showName: 'admin',
        address: '杭州小组'
      }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$route.params.id)
    })
  },
  methods: {
    group (items) {
      if (items.length > 13) {
        return {
          item: items.substring(0, 13) + '...',
          showTips: false
        }
      } else {
        return {
          item: items,
          showTips: true
        }
      }
    },
    handleEdit (index, row) {
      this.$router.push('/edit/' + index)
      console.log(index, row)
    },
    handledelete (index, row) {
      this.dialogFormVisible = true
      console.log(index, row)
    },
    back () {
      this.$router.back('-1')
    },
    changeCurPage (a) {
      console.log(a)
    }
  },
  components: {
    vheader
  }
}
</script>
<style lang='less' scoped>
.peopleList /deep/ .el-button--danger{
  background: #AB1D29;
  border:1px solid #AB1D29;
}
.peopleList /deep/.el-input-group__prepend .el-input {
    width: 90px;
  }
 .peopleList /deep/ .el-input__inner{
   width: 130px;
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
  }
  .peopleList /deep/.el-table th {
        background-color: #F5F2EF;
  }
 .peopleList /deep/ .el-dialog__body{
   font-size: 16px;
   text-align: center;
 }
.peopleList{
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

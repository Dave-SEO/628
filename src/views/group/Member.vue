<!-- 组成员管理 -->
<template>
  <div>
    <vheader>
        <span slot="title" class="title">组成员管理</span>
      </vheader>
      <ul id="treeDemo" class="ztree"></ul>
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
          enable: false
        },
        edit: {
          enable: false,
          showRemoveBtn: false,
          showRenameBtn: false
			  },
        callback: {
		      onCheck: this.zTreeOnCheck,
          beforeCheck: this.zTreeBeforeCheck,
          beforeClick: this.zTreeBeforeClick,
          onClick: this.zTreeOnClick
	      }
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
    zTreeOnClick (event, treeId, treeNode) {
      this.$router.push('/PeopleList/'+ treeNode.name)
    }
  }
}
</script>
<style lang='less' scoped>
</style>

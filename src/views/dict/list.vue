<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <a href="http://localhost:8202/admin/cmn/dict/exportData" target="_blank">
          <el-button type="text"><i class="fa fa-plus"/> 导出</el-button>
        </a>
        <el-button type="text" @click="importData"><i class="fa fa-plus"/> 导入</el-button>
      </div>
    </div>

    <el-table
      :data="list"
      :load="getChildrens"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%"
      row-key="id"
      border
      lazy>
      <el-table-column label="名称" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220">
        <template slot-scope="{row}">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogImportVisible" title="导入" width="480px">
      <el-form label-position="right" label-width="170px">

        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/cmn/dict/importData'"
            class="upload-demo">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import dict from '@/api/dict'
export default {
  data() {
    return {
      list: [],
      dialogImportVisible: false// 弹窗是否可见
    }
  },
  created() {
    this.getDictList(1)
  },
  methods: {
    onUploadSuccess() {
      // 上传成功调的方法
      // 关闭弹窗，刷新页面
      this.dialogImportVisible = false
      this.getDictList(1)
    },
    importData() {
      this.dialogImportVisible = true
    },
    exportData() {
      // 调用导出方法
      window.location.href = 'http://localhost:8202/admin/cmn/dict/exportData'
    },
    getDictList(id) {
      dict.dictList(id).then(response => {
        // 接口获取数据字典列表
        this.list = response.data
      }).catch()
    },
    getChildrens(tree, treeNode, resolve) {
      dict.dictList(tree.id).then(response => {
        resolve(response.data)
      })
    }

  }
}
</script>

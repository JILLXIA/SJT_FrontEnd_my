<template>
  <div class="app-container">
    医院设置列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>

    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="id" width="50" label="序号"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)">删除</el-button>
          <el-button
            v-if="scope.row.status===1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospSet(scope.row.id, scope.row.status)">锁定</el-button>
          <el-button
            v-if="scope.row.status===0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospSet(scope.row.id, scope.row.status)">取消锁定</el-button>
          <router-link :to="'/hospSet/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"/>
          </router-link>

        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>

<script>
import hospSet from '@/api/hospSet'

export default{
  data() {
    // 定义变量和初始值
    return {
      current: 1,
      limit: 1,
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据
      total: 0,
      multipleSelection: [] // 批量删除id记录
    }
  },
  created() {
    // 页面渲染之前执行
    // 调用methods定义的方法
    this.getList()
  },
  methods: {
    // 锁定/取消锁定
    lockHospSet(id, status) {
      const nextStatus = status === 1 ? 0 : 1
      hospSet.lockHospSet(id, nextStatus).then(
        response => {
          this.getList(this.current)
        }
      ).catch()
    },
    // 选择复选框的绑定函数
    handleSelectionChange(selection) {
      // 这个参数是选择的复选框里面的内容
      // alert(JSON.stringify(selection))
      this.multipleSelection = selection
    },
    // 批量删除
    removeRows() {
      this.$confirm('此操作将永久删除该医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = this.multipleSelection.map((item) => { return item.id })
        hospSet.batchHospSet(id).then(
          response => {
            // 点击确定执行这个
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList(1)
          }
        ).catch(error => console.log(error))
      }).catch(() => {
        // 点击取消执行这个
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getList(page = 1) {
      this.current = page
      hospSet.getHospSetList(this.current, this.limit, this.searchObj)
        .then(response => {
          // 接口返回的数据
          this.list = response.data.records
          this.total = response.data.total
          console.log(response)
        })
        .catch(error => console.log(error))
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospSet.deleteHospSet(id).then(
          response => {
            // 点击确定执行这个
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList(1)
          }
        ).catch(error => console.log(error))
      }).catch(() => {
        // 点击取消执行这个
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}
</script>

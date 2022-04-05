<template>
  <div class="app-container">
    医院设置列表
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="50" label="序号"/>
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
      total: 0
    }
  },
  created() {
    // 页面渲染之前执行
    // 调用methods定义的方法
    this.getList()
  },
  methods: {
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
    }

  }
}
</script>

<template>
  <div class="app-container">
    医院设置添加
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospSetObj.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospSetObj.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospSetObj.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospSetObj.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospSetObj.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospSet from '@/api/hospSet'
export default{
  data() {
    return {
      hospSetObj: {}
    }
  },
  created() {
    // 组建重用，这个created不会执行多次，得每次让路由重新加载
    // 页面渲染之前执行
    // 获取路由id，调用接口
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getHospSet(id)
    } else {
      this.hospSetObj = {}
    }
  },
  methods: {
    getHospSet(id) {
      hospSet.getHospSet(id).then(response => {
        this.hospSetObj = response.data
      }).catch()
    },
    save() {
      hospSet.saveHospSet(this.hospSetObj).then(
        response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 路由跳转
          this.$router.push({ path: '/hospSet/list' })
        }
      ).catch()
    },
    edit() {
      hospSet.updateHospSet(this.hospSetObj).then(
        response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 路由跳转
          this.$router.push({ path: '/hospSet/list' })
        }
      ).catch()
    },
    // 添加
    saveOrUpdate() {
      // 判断是田间还是修改
      if (this.hospSetObj.id) {
        this.edit()
      } else {
        this.save()
      }
    }

  }
}
</script>

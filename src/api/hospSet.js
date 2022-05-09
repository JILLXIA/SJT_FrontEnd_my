import request from '@/utils/request'
// export default 被 import 进来的时候可以任意取名

export default{
  getHospSetList(current, limit, searchObj) {
    return request({
      url: `admin/hosp/hospitalSet/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj // 使用json传递，否则就不是json传递
    })
  },
  deleteHospSet(id) {
    return request({
      url: `admin/hosp/hospitalSet/${id}`,
      method: 'delete'
    })
  },
  // 批量删除
  batchHospSet(idList) {
    return request({
      url: `admin/hosp/hospitalSet/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  lockHospSet(id, status) {
    return request({
      url: `admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  },
  saveHospSet(hospSet) {
    alert(JSON.stringify(hospSet))
    return request({
      url: `admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospSet
    })
  },
  getHospSet(id) {
    // 根据id查询hospSet
    return request({
      url: `admin/hosp/hospitalSet/getHospitalSet/${id}`,
      method: 'get'
    })
  },
  updateHospSet(updateObj) {
    // 修改医院设置
    return request({
      url: `admin/hosp/hospitalSet/updateHospitalSet`,
      method: 'post',
      data: updateObj
    })
  }
}

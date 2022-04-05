import request from '@/utils/request'
// export default 被 import 进来的时候可以任意取名

export default{
  getHospSetList(current, limit, searchObj) {
    return request({
      url: `admin/hosp/hospitalSet/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj // 使用json传递，否则就不是json传递
    })
  }
}

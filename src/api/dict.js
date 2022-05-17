import request from '@/utils/request'
// export default 被 import 进来的时候可以任意取名

export default{
  // 数据字典列表
  dictList(id) {
    return request({
      url: `admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  }
}

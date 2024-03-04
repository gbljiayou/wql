const Mock = require('mockjs')
// 拓展mockjs
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
})
const List = []
const count = 1

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    // storeName: '@province@ctitle(2, 4)酒店',
    // storeRegion: '@region',
    // storeAddress: '@county(true)',
    // storePhone: +Mock.Random.phone(),
    storeName: '奥利阳酒店',
    storeRegion: '东北',
    storeAddress: '大连市花园口经济区银杏路西街6号',
    storePhone: '0411-89123333',
    createBy: '@cname',
    createTime: '2024-01-' + Mock.Random.natural(10, 28) + ' ' + Mock.Random.time()
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/storePrice/list',
    type: 'get',
    response: config => {
      const {importance, type, title, page = 1, limit = 20, sort} = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/storePrice/detail',
    type: 'get',
    response: config => {
      const {id} = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/storePrice/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            {key: 'PC', pv: 1024},
            {key: 'mobile', pv: 1024},
            {key: 'ios', pv: 1024},
            {key: 'android', pv: 1024}
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/storePrice/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/storePrice/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]


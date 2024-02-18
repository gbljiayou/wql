const Mock = require('mockjs')
// 拓展mockjs
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
})
const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    orderNo: 'O@integer(5)',
    // storeName: '@province@ctitle(2, 4)酒店',
    storeName: '如家酒店',
    'orderStatus|1': ['已下单', '居住中', '已完成'],
    orderTime: +Mock.Random.date('T'),
    customerName: '@cname',
    customerPhone: +Mock.Random.phone(),
    'status|1': ['未入住', '入住中', '已离店'],
    inTime: +Mock.Random.date('T'),
    outTime: +Mock.Random.date('T')
    // timestamp: +Mock.Random.date('T'),
    // author: '@cname',
    // reviewer: '@first',
    // title: '@title(5, 10)',
    // content_short: 'mock data',
    // content: baseContent,
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft'],
    // display_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // image_uri,
    // platforms: ['a-platform']
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/order/list',
    type: 'get',
    response: config => {
      const {orderNo, storeName,customerName,inTime, page = 1, limit = 20, sort} = config.query

      let mockList = List.filter(item => {
        if (orderNo && item.orderNo.indexOf(orderNo) < 0) return false
        if (storeName && item.storeName.indexOf(storeName) < 0) return false
        if (customerName && item.customerName.indexOf(customerName) < 0) return false
        if (inTime && item.inTime.indexOf(inTime) < 0) return false
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
    url: '/vue-element-admin/order/detail',
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
    url: '/vue-element-admin/order/pv',
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
    url: '/vue-element-admin/order/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/order/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]


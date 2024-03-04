const Mock = require('mockjs')
const {deepClone} = require('../utils')
const {asyncRoutes, constantRoutes} = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: '1',
    name: '系统管理员',
    description: '全系统权限角色',
    createBy: '@cname',
    createTime: '2024-01-' + Mock.Random.natural(10, 28) + ' ' + Mock.Random.time(),
    routes: routes
  },
  {
    key: '2',
    name: '财务部',
    description: '会员管理及订单管理权限角色',
    createBy: '@cname',
    createTime: '2024-01-' + Mock.Random.natural(10, 28) + ' ' + Mock.Random.time(),
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: '3',
    name: '客房部',
    description: '门店及价格管理权限角色',
    createBy: '@cname',
    createTime: '2024-01-' + Mock.Random.natural(10, 28) + ' ' + Mock.Random.time(),
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {title: 'dashboard', icon: 'dashboard'}
        }
      ]
    }]
  }
]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]

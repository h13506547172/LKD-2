import Layout from '@/layout'
export default {
  path: '/goodsOrder',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/goodsOrder'),
    meta: { title: '订单管理', icon: 'dingdan' }
  }]
}
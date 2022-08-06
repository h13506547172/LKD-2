import Layout from '@/layout'
export default {
  path: '/bill',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/bill/index'),
    meta: { title: '对账统计', icon: 'qian' }
  }]
}
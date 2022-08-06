import Layout from '@/layout'
export default {
  path: '/place',
  component: Layout,
  meta: { title: '点位管理', icon: 'dingwei' },
  children: [
    {
      path: 'region',
      component: () => import('@/views/place/region'),
      meta: { title: '区域管理' },
    },
    {
      path: 'node',
      component: () => import('@/views/place/node'),
      meta: { title: '点位管理' },
    },
    {
      path: 'partner',
      component: () => import('@/views/place/partner'),
      meta: { title: '合作商管理' },
    }
  ],
}



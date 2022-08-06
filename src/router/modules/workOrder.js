import Layout from '@/layout'
export default {
  path: '/workorder',
  component: Layout,
  meta: { title: '工单管理', icon: 'dingdan2' },
  children: [
    {
      path: 'operat',
      component: () => import('@/views/workOrder/operat'),
      meta: { title: '运营工单' },
    },
    {
      path: 'operations',
      component: () => import('@/views/workOrder/operations'),
      meta: { title: '运维工单' },
    },
  ],
}

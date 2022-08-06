// personnel

import Layout from '@/layout'
export default {
  path: '/personnel',
  component: Layout,
  meta: { title: '人员管理', icon: 'renyuan' },
  children: [
    {
      path: 'index',
      component: () => import('@/views/personnel/index'),
      meta: { title: '人员列表' },
    },
    {
      path: 'user-task-stats',
      component: () => import('@/views/personnel/user-task-stats'),
      meta: { title: '人效统计' },
    },
    {
      path: 'user-work',
      component: () => import('@/views/personnel/user-work'),
      meta: { title: '工作量统计' },
    }
  ],
}

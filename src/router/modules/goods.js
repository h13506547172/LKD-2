import Layout from '@/layout'
export default {
  path: '/goods',
  component: Layout,
  meta: { title: '商品管理', icon: 'pingtu' },
  children: [
    {
      path: 'sku-class',
      component: () => import('@/views/goods/sku-class'),
      meta: { title: '商品类型' },
    },
    {
      path: 'sku',
      component: () => import('@/views/goods/sku'),
      meta: { title: '商品管理' },
    }
  ]
}
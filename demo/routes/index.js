import active from './actTemplete'
import spider from './spider'
import test from './test'

export default app => {
  // 活动接口
  app.use('/active', active)
  // 测试接口
  app.use('/test', test)
  // 爬虫接口
  app.use('/spider', spider)
}
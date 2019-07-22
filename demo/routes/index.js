import temp from './temp/index'

export default app => {
  app.use('/temp', temp);
}
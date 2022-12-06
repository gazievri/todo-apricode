const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const auth = require('json-server-auth')

server.db = router.db

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(req.body)
  }
  // Continue to JSON Server router
  next()
})

server.use(auth)
// Use default router
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
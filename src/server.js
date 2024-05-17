import Koa from 'koa'
import Router from 'koa-router'
import {renderToString} from 'react-dom/server'
import {createServer} from 'vite'

const app = new Koa()
const router = new Router()

const vite = await createServer({
  server: {middlewareMode: true},
  appType: 'custom',
  base: '/',
})
app.use(vite.middlewares)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

router.get('/api/blogs', async (ctx, next) => {
  await sleep(3000)
  ctx.body = [...new Array(20)].map((_, i) => {
    return {
      name: `Blog ${i + 1}`,
      description: `This is my ${i + 1} blog.`,
      content: 'This is the content.',
    }
  })
})

router.get('/api/profile', async (ctx, next) => {
  await sleep(1000)
  ctx.body = {
    name: 'ayou',
    gender: 'male',
    avatar: 'https://avatars.githubusercontent.com/u/10891388?v=4',
  }
})

router.get('/', async (ctx, next) => {
  const url = ctx.req.url.replace('/', '')
  let template = await fs.readFile('./index.html', 'utf-8')
  template = await vite.transformIndexHtml(url, template)
  render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
  const rendered = await render(url, ssrManifest)
  const html = template
    .replace(`<!--app-head-->`, rendered.head ?? '')
    .replace(`<!--app-html-->`, rendered.html ?? '')

  ctx.body = html
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

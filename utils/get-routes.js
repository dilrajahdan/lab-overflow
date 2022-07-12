export default async () => {
  const { $content } = require('@nuxt/content')
  const files = await $content('blog', { deep: true }).only(['path']).fetch()

  const routes = files.map((file) => (file.path === '/index' ? '/' : file.path))

  console.log('routes', routes)
  return routes

  // return files.map((file) => (file.path === '/index' ? '/' : file.path))
}

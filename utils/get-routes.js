export default async () => {
  const { $content } = require('@nuxt/content')

  const blog = await $content('blog', { deep: true }).only(['path']).fetch()
  const blogRoutes = blog.map((file) =>
    file.path === '/index' ? '/' : file.path
  )

  // TODO: Maps jobs to a location.
  // Once you know this you can generate the correct
  // dynamic routes

  // const jobs = await $content('jobs', { deep: true })
  //   .only(['path', 'slug'])
  //   .fetch()
  // const jobRoutes = jobs.map((file) => {
  //   console.log('file', file)
  //   return file.path === '/index' ? '/' : file.path
  // })

  // const labs = await $content('labs', { deep: true })
  //   .only(['path', 'slug'])
  //   .fetch()
  // const labRoutes = labs.map((file) =>
  //   file.path === '/index' ? '/' : file.path
  // )

  // console.log('blogRoutes', blogRoutes)
  // console.log('jobRoutes', jobRoutes)
  // console.log('labRoutes', labRoutes)
  // return [...blogRoutes, ...jobRoutes, ...labRoutes]
  return blogRoutes

  // return files.map((file) => (file.path === '/index' ? '/' : file.path))
}

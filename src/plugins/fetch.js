export function $fetch(url, opts = {}) {
  try {
    const res = fetch(url, opts)
    if (!res.ok) {
      throw new Error('API를 가져올 수 없습니다')
    }
    return res.then(res => res.json())
  } catch (e) {
    console.error(e.message)
  }
}
export default {
  install(app, options = {}) {
    app.config.globalProperties[options.pluginName || '$fetch'] = $fetch
  },
}

export function $fetch(url, opts = {}) {
	return fetch(url, opts).then(res => res.json())
}
export default {
	install(app, options = {}) {
		app.config.globalProperties[options.pluginName || '$fetch'] = $fetch
	},
}

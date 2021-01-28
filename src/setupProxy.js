const proxy = require("http-proxy-middleware")l

module.exports = function(app){
	app.use(
		proxy("/slim/api/users", {
			target: "http://slimreactjs.iworkone.com",
			changeOrigin: true
		})
	);
}
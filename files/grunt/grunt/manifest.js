module.exports = {
	generate: {
		options: {
			// basePath: "/",
			// network: ["http://*", "https://*", "ws://*", "wss://*"],
			// fallback: ["/ /offline.html"],
			exclude: [""],
			// preferOnline: true,
			verbose: false,
			timestamp: true,
			// hash: true,
			headcomment: " <%= package.name %> ",
		},
		src: [
          "!assets/**/_src/*",
          "assets/js/**/*.*",
          "assets/css/**/*.*",
          "assets/img/**/*.*",
          "assets/fonts/**/*.*",
          "*.{html,txt,ico,png}",
		],
		dest: "manifest.appcache"
	}
};

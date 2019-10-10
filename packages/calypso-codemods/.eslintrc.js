module.exports = {
	rules: {
		'import/no-nodejs-modules': 0,
		'import/no-extraneous-dependencies': [ 'error', { packageDir: __dirname } ],
	},
};

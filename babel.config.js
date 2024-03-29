module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env',
				blacklist: null,
				whitelist: null,
				safe: true,
				allowUndefined: true,
			},
		],
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				cwd: 'babelrc',
				extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
				alias: {
					src: './src',
				},
			},
		],
		'jest-hoist',
	],
};

'use strict';

var marble = require('marble');

module.exports = {
	metalComponents: ['electric-marble-components'],
	sassOptions: {
		includePaths: ['node_modules', marble.src],
		outputStyle: 'compressed'
	},
	codeMirrorLanguages: ['xml', 'css', 'javascript', 'clike', 'swift', 'groovy'],
	deployOptions: { branch: 'ui' },
	vendorSrc: ['node_modules/marble/build/fonts/**']
};

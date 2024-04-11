'use strict';
module.exports = {
	create(context) {
		return {
			CallExpression(node) {
				if (node.callee.name === 'alert') {
					context.report(node, 'testing custom rules.');
				}
			}
		};
	}
};

'use strict';
module.exports = function (context) {
	return {
		CallExpression(node) {
			if (node.callee.name === 'alert') {
				context.report(node, 'testing custom rules.');
			}
		}
	};
};

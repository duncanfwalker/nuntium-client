module.exports = NuntiumError;

function NuntiumError(message) {
		this.name = 'NuntiumError';
		this.message = message || 'Default Message';
		this.stack = (new Error()).stack;
}
NuntiumError.prototype = Object.create(TypeError.prototype);
NuntiumError.prototype.constructor = NuntiumError;
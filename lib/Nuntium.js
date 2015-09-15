var rest = require('restler');

module.exports = Nuntium;

function Nuntium(account,application,password) {

}

Nuntium.prototype = {
		getCountries: function(callback) {
				rest.get('/api/countries.json').on('complete', function (data) {
						callback(data);
				});
		}
};
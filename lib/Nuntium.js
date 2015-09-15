var rest = require('restler');
var url = require('url');

module.exports = Nuntium;

function Nuntium(account, application, password) {
}

Nuntium.prototype = {
		getCountries: function (callback) {
				this._getJSON('/api/countries.json', callback);
		},
		/**
			* @param {string} country_id
			* @param {function} callback(data)
			*/
		getCountry:   function (country_id, callback) {
				if (typeof country_id === undefined) throw new Error("country_id is required");
				this._getJSON('/api/countries/' + country_id + '.json', callback);
		},
		/**
			* @param {string} [country_id]
			* @param {function} callback(data)
			*/
		getCarriers:  function (country_id, callback) {
				if (arguments.length == 2) {
						this._getCarriers(arguments[0], arguments[1]);
				} else {
						this._getCarriers(null, arguments[0])
				}
		},
		/**
			* @param {string} carrier_id
			* @param {function} callback(data)
			*/
		getCarrier:   function (carrier_id, callback) {
				if (typeof code === undefined) throw new Error("carrier_id is required");
				this._getJSON('/api/carriers/' + carrier_id + '.json', callback);
		},
		getChannels:  function (callback) {
				this._getJSON('/api/channels.json', callback);
		},
		getChannel:   function (name, callback) {
				this._getJSON('/api/channels/' + name + '.json', callback);
		},
		_getCarriers: function (country_id, callback) {
				var uri = {"pathname": '/api/carriers.json'};
				if (country_id !== null) {
						uri["query"] = {"country_id": country_id};
				}
				this._getJSON(url.format(uri), callback);
		},
		_getJSON:     function (url, callback) {
				rest.get(url).on('complete', callback);
		}
};
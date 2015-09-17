var rest = require('restler');
var url = require('url');

module.exports = Nuntium;

function Nuntium(account, application, password) {
		this.account= account;
		this.application = application;
		this.password = password;

}

Nuntium.prototype = {
		/**
			*
			* @param callback
			*/
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
				if (arguments.length > 1)
						this._getCarriers(arguments[0], arguments[1]);
				else
						this._getCarriers(null, arguments[0])
		},
		/**
			* @param {string} carrier_id
			* @param {function} callback(data)
			*/
		getCarrier:   function (carrier_id, callback) {
				if (typeof code === undefined) throw new Error("carrier_id is required");
				this._getJSON('/api/carriers/' + carrier_id + '.json', callback);
		},
		/**
			* @param {function} callback(data)
			*/
		getChannels:  function (callback) {
				this._getJSON('/api/channels.json', callback);
		},
		/**
			* @param {string} name
			* @param {function} callback(data)
			*/
		getChannel:   function (name, callback) {
				this._getJSON('/api/channels/' + name + '.json', callback);
		},
		/**
			* @param {string} token
			* @param {function} callback(data)
			*/
		getAO: function(token,callback) {
				var uri = {"pathname": '/'+this.account+'/' + this.application +'/'+'get_ao.json', 'query': {'token':token}};
				this._getJSON(url.format(uri), callback);
		},
		/**
			*
			* @param {Object} args
			* @param {string} args.from
			* @param {string} args.body
			* @param callback
			*/
		sendAO: function(args,callback) {
				var uri = {
						"pathname": '/'+this.account+'/' + this.application +'/'+'send_ao.json',
						"query": args
				};

				this._getJSON(url.format(uri),function(data,response) {
						// TODO: deal with missing headers
						var nuntiumHeaders= {
								'id': response.headers.x_nuntium_id,
								'guid': response.headers.x_nuntium_guid,
								'token': response.headers.x_nuntium_token
						};
						callback(nuntiumHeaders);
				});
		},
		/**
			* @param {Object} args eg {'from':'sms://1234','body':'Hello'},
			* @param {string} args.from sender (include sms:// prefix)
			* @param {string} args.body
			* @param {function} callback(data)
			*/
		getCandidateChannelsForAO: function(args, callback) {
				var uri = {
						"pathname": '/api/candidate/channels.json',
						"query": args
				};
				this._getJSON(url.format(uri), callback);
		},
		/**
			*
			* @param attributeName
			* @param callback
			*/
		getCustomAttributes: function(attributeName, callback) {
				// TODO: check for required params
				var uri = {
						"pathname": '/api/custom_attributes',
						"query": {'address': attributeName}
				};
				this._getJSON(url.format(uri), callback);
		},
		/**
			*
			* @param {Object} args
			* @param {string} args.channel
			* @param {string} args.user
			* @param {bool} args.follow
			*/
		createTwitterFriendship: function(args) {
				// TODO: check for required params
				var pathname = '/api/channels/' + args.channel + '/twitter/friendships/create';
				delete args.channel;
				var uri = {
						"pathname": pathname,
						"query": args
				};
				rest.get(url.format(uri))
		},
		/**
			*
			* @param {Object} args
			* @param {string} args.callback
			* @param callback
			*/
		twitterAuthorize: function(args,callback) {
				// TODO: check for required params
				var pathname = '/api/channels/' + args.channel + '/twitter/authorize';
				delete args.channel;
				var uri = {
						"pathname": pathname,
						"query": args
				};
				this._getJSON(url.format(uri), callback);
		},

		xmppAddContact: function(args) {
				// TODO: check for required params
				var pathname = '/api/channels/' + args.channel + '/xmpp/add_contact';
				delete args.channel;
				var uri = {
						"pathname": pathname,
						"query": args
				};
				rest.get(url.format(uri))
		},
		_getCarriers: function (country_id, callback) {
				var uri = {"pathname": '/api/carriers.json'};
				if (country_id !== null) {
						uri["query"] = {"country_id": country_id};
				}
				this._getJSON(url.format(uri), callback);
		},
		_getJSON:     function (uri, callback) {
				rest.get(uri).on('complete', callback);
		}
};
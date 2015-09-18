var rest = require('restler');
var url = require('url');
var NuntiumError = require('../lib/nuntiumerror');

module.exports = Nuntium;


/**
	* Represents the Nuntium API.
	* @constructor
	* @param {string} account - Your Nuntium account name
	* @param {string} application - Name of your Nuntium application
	* @param {string} password - Password for the application.
	*/
function Nuntium(account, application, password) {
		this.account= account;
		this.application = application;
		this.password = password;

}

Nuntium.prototype = {
		/**
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
			 if (country_id == null) throw new NuntiumError("country_id is required");
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
				if (carrier_id == null) throw new NuntiumError("carrier_id is required");
				this._getJSON('/api/carriers/' + carrier_id + '.json', callback);
		},
		/**
			* @param {string} name of the channel to update
			* @param {Object} properties to update
			* @param {function} callback(data)
			*/
		updateChannel:  function (name,properties,callback) {
				if (name == null) throw new NuntiumError("name of the channel is required");
				if(typeof properties.configuration === 'object' &&  properties.configuration  != null )
						properties.configuration = this._toNameValuePairs(properties.configuration);

				var clientContext = this;
				rest.put('/api/channels.json', properties).on('complete',  function(data,response) {
						if( data.configuration != null && typeof data.configuration == 'object')
							data.configuration= clientContext._fromNameValuePairs(data.configuration);
						callback(data);
				});
		},
		/**
			* @param {Object} properties of the new channel
			* @param {function} callback(data)
			*/
		createChannel:  function (properties,callback) {
				if(typeof properties.configuration === 'object' &&  properties.configuration  != null )
					properties.configuration = this._toNameValuePairs(properties.configuration);

				var clientContext = this;
				rest.postJson('/api/channels.json', properties).on('complete',  function(data,response) {
						if( data.configuration != null && typeof data.configuration == 'object')
							data.configuration= clientContext._fromNameValuePairs(data.configuration);
						callback(data);
				});
		},
		/**
			* @param {function} callback(data)
			*/
		getChannels:  function (callback) {
				this._getJSON('/api/channels.json', callback);
		},
		/**
			* @param {string} name of the channel to get
			* @param {function} callback(data)
			*/
		getChannel:   function (name, callback) {
				if (name == null) throw new NuntiumError("name of the channel is required");
				this._getJSON('/api/channels/' + name + '.json', callback);
		},
		/**
			*
			* @param name
			*/
		deleteChannel: function(name) {
				if (name == null) throw new NuntiumError("name of the channel is required");
				rest.del('/api/channels/'+name);
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
			* @param {Object|Array} message
			* @param {string} message.from
			* @param {string} message.body
			* @param callback
			*/
		sendAO: function(message,callback) {
				if (Array.isArray(message))
						this._sendManyAOs(message, callback);
				else
						this._sendOneAO(message,callback);
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
			* @param address
			* @param callback
			*/
		getCustomAttributes: function(address, callback) {
				// TODO: check for required params
				var uri = {
						"pathname": '/api/custom_attributes',
						"query": {'address': address}
				};
				this._getJSON(url.format(uri), callback);
		},
		/**
			*
			* @param address
			* @param attributes
			* @param callback
			*/
		setCustomAttributes: function(address, attributes,callback) {
				// TODO: check for required params
				var uri = {
						"pathname": '/api/custom_attributes',
						"query": {'address': address}
				};

				rest.postJson(url.format(uri),attributes).on('complete', callback);
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
		},
		_sendOneAO: function(args,callback) {
				var uri = {
						"pathname": '/'+this.account+'/' + this.application +'/'+'send_ao.json',
						"query": args
				};

				this._getJSON(url.format(uri),function(data,response) {
						// TODO: deal with missing headers
						// TODO: DRY this
						var nuntiumHeaders= {
								'id': response.headers.x_nuntium_id,
								'guid': response.headers.x_nuntium_guid,
								'token': response.headers.x_nuntium_token
						};
						callback(nuntiumHeaders);
				});
		},
		_sendManyAOs: function(args,callback) {
				rest.postJson('/'+this.account+'/' + this.application +'/'+'send_ao.json',args).on('complete', function(data,response) {
						callback({'token':  response.headers.x_nuntium_token});
				});
		},
		_toNameValuePairs: function(map) {
				return Object.keys(map).reduce(function (array, name) {
						array.push({ 'name':  name,  'value': map[name] });
						return array;
				}, []);
		},
		_fromNameValuePairs: function(array) {
				return array.reduce(function (map, pair) {
						map[pair.name] = pair.value;
						return map;
				}, {});
		},
};
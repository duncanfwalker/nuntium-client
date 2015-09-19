var rest = require('restler');
var url = require('url');
var NuntiumError = require('../lib/nuntium-error');

module.exports = Client;

/**
	* This callback is displayed as part of the Requester class.
	* If the response was an error
	* @callback Nuntium~requestCallback
	* @param {Object|Error} result
	* @param {Object} response
	*/

/**
	* Represents the Nuntium API.
	* @constructor
	* @param {string} account - Your Nuntium account name
	* @param {string} application - Name of your Nuntium application
	* @param {string} password - Password for the application.
	*/
function Client(account, application, password) {
		this.account= account;
		this.application = application;
		this.password = password;

		this.defaultOptions = {
				"username": account+'/'+application,
				"password": password
		};
}

Client.prototype = {
		/**
			* @param {Nuntium~requestCallback} callback
			*/
		getCountries: function (callback) {
				this._getJson('/api/countries.json', callback);
		},
		/**
			* @param {string} country_id
			* @param {Nuntium~requestCallback} callback
			* @throws {NuntiumError} On bad arguments
			*/
		getCountry:   function (country_id, callback) {
			 if (country_id == null) throw new NuntiumError("country_id is required");
				this._getJson('/api/countries/' + country_id + '.json', callback);
		},
		/**
			* @param {string} [country_id]
			* @param {Nuntium~requestCallback} callback
			*/
		getCarriers:  function (country_id, callback) {
				if (arguments.length > 1)
						this._getCarriers(arguments[0], arguments[1]);
				else
						this._getCarriers(null, arguments[0])
		},
		/**
			* @param {string} carrier_id
			* @param {Nuntium~requestCallback} callback
			* @throws {NuntiumError} On bad arguments
			*/
		getCarrier:   function (carrier_id, callback) {
				if (carrier_id == null) throw new NuntiumError("carrier_id is required");
				this._getJson('/api/carriers/' + carrier_id + '.json', callback);
		},
		/**
			* @param {string} name of the channel to update
			* @param {Object} properties to update
			* @param {Nuntium~requestCallback} callback
			* @throws {NuntiumError} On bad arguments
			*/
		updateChannel:  function (name,properties,callback) {
				if (name == null) throw new NuntiumError("name of the channel is required");
				if(typeof properties.configuration === 'object' &&  properties.configuration  != null )
						properties.configuration = this._toNameValuePairs(properties.configuration);

				var clientContext = this;
				this._put('/api/channels.json', properties,function(data,response) {
						if( data.configuration != null && typeof data.configuration == 'object')
							data.configuration= clientContext._fromNameValuePairs(data.configuration);
						callback(data, response);
				});
		},
		/**
			* @param {Object} properties of the new channel
			* @param {Nuntium~requestCallback} callback
			*/
		createChannel:  function (properties,callback) {
				if(typeof properties.configuration === 'object' &&  properties.configuration  != null )
					properties.configuration = this._toNameValuePairs(properties.configuration);

				var clientContext = this;
				this._postJson('/api/channels.json', properties, null, function(data,response) {
						if( data.configuration != null && typeof data.configuration == 'object')
							data.configuration= clientContext._fromNameValuePairs(data.configuration);
						callback(data);
				});
		},
		/**
			* @param {Nuntium~requestCallback} callback
			*/
		getChannels:  function (callback) {
				this._getJson('/api/channels.json', callback);
		},
		/**
			* @param {string} name of the channel to get
			* @param {Nuntium~requestCallback} callback
			* @throws {NuntiumError} On bad arguments
			*/
		getChannel:   function (name, callback) {
				if (name == null) throw new NuntiumError("name of the channel is required");
				this._getJson('/api/channels/' + name + '.json', callback);
		},
		/**
			*
			* @param name
			* @param {Nuntium~requestCallback} callback
			* @throws {NuntiumError} On bad arguments
			*/
		deleteChannel: function(name, callback) {
				if (name == null) throw new NuntiumError("name of the channel is required");
				this._del('/api/channels/'+name, callback);
		},
		/**
			* @param {string} token
			* @param {Nuntium~requestCallback} callback
			*/
		getAO: function(token,callback) {
				var uri = {"pathname": '/'+this.account+'/' + this.application +'/'+'get_ao.json', 'query': {'token':token}};
				this._getJson(url.format(uri), callback);
		},
		/**
			*
			* @param {Object|Array} message
			* @param {string} message.from
			* @param {string} message.body
			* @param {Nuntium~requestCallback} callback
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
			* @param {Nuntium~requestCallback} callback
			*/
		getCandidateChannelsForAO: function(args, callback) {
				var uri = {
						"pathname": '/api/candidate/channels.json',
						"query": args
				};
				this._getJson(url.format(uri), callback);
		},
		/**
			*
			* @param {string} address
			* @param {Nuntium~requestCallback} callback
			*/
		getCustomAttributes: function(address, callback) {
				var uri = {
						"pathname": '/api/custom_attributes',
						"query": {'address': address}
				};
				this._getJson(url.format(uri), callback);
		},
		/**
			*
			* @param {string} address
			* @param {Object} attributes
			* @param {Nuntium~requestCallback} callback
			*/
		setCustomAttributes: function(address, attributes,callback) {
				var uri = {
						"pathname": '/api/custom_attributes',
						"query": {'address': address}
				};
				this._postJson(url.format(uri),attributes, null, callback);
		},
		/**
			*
			* @param {Object} args
			* @param {string} args.channel
			* @param {string} args.user
			* @param {bool} args.follow
			*/
		createTwitterFriendship: function(args) {
				var pathname = '/api/channels/' + args.channel + '/twitter/friendships/create';
				delete args.channel;
				var uri = {
						"pathname": pathname,
						"query": args
				};
				this._getJson(url.format(uri), function() {
						// TODO: something with the response?
				});
		},
		/**
			*
			* @param {Object} args
			* @param {string} args.channel
			* @param {Nuntium~requestCallback} callback
			*/
		twitterAuthorize: function(args,callback) {
				// TODO: check for required params
				var pathname = '/api/channels/' + args.channel + '/twitter/authorize';
				delete args.channel;
				var uri = {
						"pathname": pathname,
						"query": args
				};
				this._getJson(url.format(uri), callback);
		},
		/**
			*
			* @param {Object} args
			* @param {string} args.channel
			*/
		xmppAddContact: function(args) {
				var pathname = '/api/channels/' + args.channel + '/xmpp/add_contact';
				delete args.channel;
				var uri = {
						"pathname": pathname,
						"query": args
				};
				this._getJson(url.format(uri), function() {
						// TODO: add a callback for the response?
				});
		},
		_getCarriers: function (country_id, callback) {
				var uri = {"pathname": '/api/carriers.json'};
				if (country_id !== null) {
						uri["query"] = {"country_id": country_id};
				}
				this._getJson(url.format(uri), callback);
		},
		_getJson:     function (uri, callback) {
				rest.get(uri,this.defaultOptions).on('complete', callback);
		},
		_postJson:     function (uri, attributes, options, callback) {
				rest.postJson(url.format(uri),attributes,this.defaultOptions).on('complete', callback);
		},
		_put:     function (uri, attributes, callback) {
				rest.putJson(url.format(uri),attributes,this.defaultOptions).on('complete', callback);
		},
		_del:   function (uri, callback) {
				rest.del(url.format(uri),this.defaultOptions).on('complete', callback);
		},
		_sendOneAO: function(args,callback) {
				var uri = {
						"pathname": '/'+this.account+'/' + this.application +'/'+'send_ao.json',
						"query": args
				};

				this._getJson(url.format(uri),function(data,response) {
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
				this._postJson('/'+this.account+'/' + this.application +'/'+'send_ao.json',args, null,function(data,response) {
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
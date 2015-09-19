var assert = require('assert');
var sinon = require("sinon");
var rest = require('restler');
var Request = require('restler').Request;
var Nuntium = require('../index').Client;
var NuntiumError = require('../lib/nuntium-error');

describe('API', function () {
		var callback, api, server;
		before(function () {
				api = new Nuntium("host","account_name", "application_name", "SomePW");
		});

		beforeEach(function () {
				server = sinon.mock(rest);
				callback = sinon.spy();
		});
		afterEach(function () {
				// TODO: this fails on callbacks that throw exceptions	assert(callback.calledOnce);
				callback.reset();
				server.restore();
		});
		describe('Countries', function () {
				it('handles request and response', function () {
						expectGet('host/api/countries.json', [{"name": "Argentina", "iso2": "ar"}]);
						api.getCountries(callback);
						sinon.assert.calledWith(callback, [{"name": "Argentina", "iso2": "ar"}]);
				});
				it('gets country', function () {
						expectGet('host/api/countries/ar.json', {"name": "Argentina", "iso2": "ar"});
						api.getCountry('ar', callback);
						sinon.assert.calledWith(callback, {"name": "Argentina", "iso2": "ar"});
				});
				it('requires an id', function () {
			 		assert.throws( function() { api.getCountry(null, callback) }, NuntiumError );
				});
		});

		describe('Carriers', function () {
				it('gets carriers', function () {
						expectGet('host/api/carriers.json', [{"name": "Argentina", "iso2": "ar"}]);
						api.getCarriers(callback);
						sinon.assert.calledWith(callback, [{"name": "Argentina", "iso2": "ar"}]);
				});
				it('gets carriers for a country', function () {
						expectGet('host/api/carriers.json?country_id=ar', [{"name": "Argentina", "iso2": "ar"}]);
						api.getCarriers('ar', callback);
						sinon.assert.calledWith(callback, [{"name": "Argentina", "iso2": "ar"}]);
				});
				it('gets carrier', function () {
						expectGet('host/api/carriers/ar.json', {"name": "Argentina", "iso2": "ar"});
						api.getCarrier('ar', callback);
						sinon.assert.calledWith(callback, {"name": "Argentina", "iso2": "ar"});
				});
				it('requires and id to get a carrier', function () {
						assert.throws(					function() {
								api.getCarrier(null, callback)
						},NuntiumError);
				});
		});

		describe('Channel', function () {
				it('gets channels', function () {
						expectGet('host/api/channels.json', [{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}]);
						api.getChannels(callback);
						sinon.assert.calledWith(callback, [{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}]);
				});
				it('gets channel', function () {
						expectGet('host/api/channels/Argentina.json', {
								"name":          "Argentina",
								"configuration": [{"name": "foo", "value": "bar"}]
						});
						api.getChannel('Argentina', callback);
						sinon.assert.calledWith(callback, {"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]});
				});
				it('requires a name to get channel', function () {
						assert.throws( function() { api.getChannel(null, callback) }, NuntiumError );
				});
				it('creates channel (name-value config pairs)', function () {
						expectPost(
								'host/api/channels.json',
								{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]},
								{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}
						);
						api.createChannel({"name": "Argentina", "configuration": {"foo": "bar"}}, callback);
						sinon.assert.calledWith(callback, {"name": "Argentina", "configuration": {"foo": "bar"}});
				});
				it('can create with an empty config', function () {
						expectPost(
								'host/api/channels.json',
								{"name": "Argentina"},
								{"name": "Argentina"}
						);
						api.createChannel({"name": "Argentina"}, callback);
						sinon.assert.calledWith(callback, {"name": "Argentina"});
				});
				it('updates channel (name-value config pairs)', function () {
						expectPut(
								'host/api/channels.json',
								{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}
						);

						api.updateChannel('Argentina', {'name': 'Argentina', 'configuration': [{"foo": "bar"}]}, callback);
						sinon.assert.calledWith(callback, {'name': 'Argentina', 'configuration': {'foo': 'bar'}});
				});
				it('can update with an empty config', function () {
						expectPut(
								'host/api/channels.json',
								{"name": "Argentina"},
								{"name": "Argentina"}
						);
						api.updateChannel("Argentina",{"name": "Argentina"}, callback);
						sinon.assert.calledWith(callback, {"name": "Argentina"});
				});
				it('requires a channel name to update', function () {
						assert.throws(
								function() {
										api.updateChannel(null,{'name': 'Argentina', 'configuration': [{"foo": "bar"}]}, callback);
								},
								NuntiumError
						);
				});
				it('deletes channel', function () {
						expectDelete('host/api/channels/Argentina');
						api.deleteChannel('Argentina', function() {});
				});
				it('requires a channel name to delete', function () {
						assert.throws(
								function() {
										api.deleteChannel();
								},
								NuntiumError
						);
				});
		});

		describe('Application Originated Messages', function () {
				// TODO: check application auth
				it('gets candidate channels for ao', function () {
						expectGet(
								'host/api/candidate/channels.json?from=sms%3A%2F%2F1234&body=Hello',
								[{"name": "Argentina", "configuration": [{"value": "bar", "name": "foo"}]}]
						);

						api.getCandidateChannelsForAO({'from': 'sms://1234', 'body': 'Hello'}, callback);
						sinon.assert.calledWith(callback, [{"name": "Argentina", "configuration": [{"value": "bar", "name": "foo"}]}]);
						assert(callback.calledOnce);
				});

				it('sends single ao', function () {
						expectGet(
								'host/account_name/application_name/send_ao?from=sms%3A%2F%2F1234&body=Hello',
								[{"name": "Argentina", "configuration": [{"value": "bar", "name": "foo"}]}],
								{'x_nuntium_id': '1', 'x_nuntium_guid': '2', 'x_nuntium_token': '3'}
						);
						api.sendAO({'from': 'sms://1234', 'body': 'Hello'}, callback);
						sinon.assert.calledWith(callback, {'id': '1', 'guid': '2', 'token': '3'});
				});


				it('sends many aos', function () {
						expectPost(
								'host/account_name/application_name/send_ao.json',
								[{"from": "sms://1234", "body": "Hello1"}, {"from": "sms://1234", "body": "Hello2"}],
								null,
								{'x_nuntium_token': '3'}
						);

						api.sendAO([{"from": "sms://1234", "body": "Hello1"}, {"from": "sms://1234", "body": "Hello2"}], callback);
						sinon.assert.calledWith(callback, {'token': '3'});
				});


				it('gets ao', function () {
						expectGet('host/account_name/application_name/get_ao.json?token=foo', [{"name": "Argentina", "iso2": "ar"}]);
						api.getAO('foo', callback);
						sinon.assert.calledWith(callback, [{"name": "Argentina", "iso2": "ar"}]);
						assert(callback.calledOnce);
				});

		});

		describe('Custom Attributes', function () {
				it('gets custom attributes', function () {
						expectGet('host/api/custom_attributes?address=foo', [{"name": "Argentina", "iso2": "ar"}]);

						api.getCustomAttributes('foo', callback);
						sinon.assert.calledWith(callback, [{"name": "Argentina", "iso2": "ar"}]);
						assert(callback.calledOnce);
				});
				it('sets custom attributes', function () {
						expectPost('host/api/custom_attributes?address=foo', {"application": "bar"}, {"application": "bar"});
						api.setCustomAttributes('foo', {"application": "bar"}, callback);
						sinon.assert.calledWith(callback, {"application": "bar"});
						assert(callback.calledOnce);
				});
		});

		describe('Twitter', function () {
				it('creates twitter friendship', function () {
						expectGet('host/api/channels/twit/twitter/friendships/create?user=foo&follow=true');
						api.createTwitterFriendship({'channel': 'twit', 'user': 'foo', 'follow': true});
				});
				// TODO application auth
				it('authorizes twitter channel', function () {
						expectGet('host/api/channels/twit/twitter/authorize?callback=foo', 'http://bar');

						api.twitterAuthorize({'channel': 'twit', 'callback': 'foo'}, callback);
						sinon.assert.calledWith(callback, 'http://bar');
						assert(callback.calledOnce);
				});
				it('adds xmpp contact', function () {
						expectGet('host/api/channels/chan/xmpp/add_contact?id=foo%40bar.com');
						api.xmppAddContact({'channel': 'chan', 'id': 'foo@bar.com'});
				});
		});

		function expectGet(url, responseData, responseHeaders) {
				var response = {"headers": responseHeaders};
				var request = new Request('', {});
				sinon.stub(request, "on")
						.withArgs("complete")
						.callsArgWith(1, responseData, response);

				server = sinon.mock(rest, "get");
				server
						.expects("get").withArgs(url).returns(request);
		}

		function expectPut(url, responseData, responseHeaders) {
				var response = {"headers": responseHeaders};
				var request = new Request('', {});
				sinon.stub(request, "on")
						.withArgs("complete")
						.callsArgWith(1, responseData, response);

				server = sinon.mock(rest, "putJson");
				server
						.expects("putJson").withArgs(url).returns(request);
		}

		function expectPost(url, requestBody, responseBody, responseHeaders) {
				var response = {"headers": responseHeaders};
				var request = new Request('', {});
				sinon.stub(request, "on")
						.withArgs("complete")
						.callsArgWith(1, responseBody, response);

				server = sinon.mock(rest, "postJson");
				server
						.expects("postJson").withArgs(url, requestBody).returns(request);
		}

		function expectDelete(url, responseData, responseHeaders) {
				var response = {"headers": responseHeaders};
				var request = new Request('', {});
				sinon.stub(request, "on")
						.withArgs("complete")
						.callsArgWith(1, responseData, response);

				server = sinon.mock(rest, "del");
				server
						.expects("del").withArgs(url).returns(request);
		}
});

describe('Authentication', function () {
		var api, stubGet, stubPost,callback;
		before(function () {
				api = new Nuntium("host", "account_name", "application_name", "SomePW");
		});

		beforeEach(function () {
				stubGet = sinon.stub(rest, "get");
				stubGet.returns(new Request('', ''));

				stubPost = sinon.stub(rest, "postJson");
				stubPost.returns(new Request('', ''));

				callback = function() {}
		});
		afterEach(function () {
				stubGet.restore();
				stubPost.restore();
		});
		it('sends ao request has application authentication', function () {
				api.sendAO(null, callback);
				assert.deepEqual({'password': "SomePW", "username": "account_name/application_name"}, stubGet.args[0][1]);
		});
		it('gets ao request has application authentication', function () {
				api.getAO('foo', callback);
				assert.deepEqual({'password': "SomePW", "username": "account_name/application_name"}, stubGet.args[0][1]);
		});
		it('sends many aos request has application authentication', function () {
				api.sendAO([{"body": "hello1"}, {"body": "hello2"}], callback);
				assert.deepEqual({'password': "SomePW", "username": "account_name/application_name"}, stubPost.args[0][2]);
		});
});
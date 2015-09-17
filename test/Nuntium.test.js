var assert = require('assert');
var sinon = require("sinon");
var rest = require('restler');
var Request = require('restler').Request;
var Nuntium = require('../index').Nuntium;

describe('Nuntium', function() {
		describe('api', function () {
				var callback, api, server;
				before(function() {
						api = new Nuntium("account_name","application_name","password");
				});
				beforeEach(function() {
						server = sinon.mock(rest);
						callback = sinon.spy();
				});
				afterEach(function() {
					// TODO: this fails on callbacks that throw exceptions	assert(callback.calledOnce);
						callback.reset();
						server.restore();
				});
				it('gets countries', function () {
						expectGet('/api/countries.json',[{"name": "Argentina", "iso2": "ar"}]);
						api.getCountries(callback);
						sinon.assert.calledWith(callback,[{"name": "Argentina", "iso2": "ar"}]);
				});
				it('gets country', function () {
						expectGet('/api/countries/ar.json',{"name": "Argentina", "iso2": "ar"});
						api.getCountry('ar',callback);
						sinon.assert.calledWith(callback,{"name": "Argentina", "iso2": "ar"});
				});
				it('requires and id to get a country',function() {
						assert.throws(api.getCountry(null,callback));
				});
				it('gets carriers', function () {
						expectGet('/api/carriers.json',[{"name": "Argentina", "iso2": "ar"}]);
						api.getCarriers(callback);
						sinon.assert.calledWith(callback,[{"name": "Argentina", "iso2": "ar"}]);
				});
				it('gets carriers for a country',function() {
						expectGet('/api/carriers.json?country_id=ar',[{"name": "Argentina", "iso2": "ar"}]);
						api.getCarriers('ar',callback);
						sinon.assert.calledWith(callback,[{"name": "Argentina", "iso2": "ar"}]);
				});
				it('gets carrier',function() {
						expectGet('/api/carriers/ar.json',{"name": "Argentina", "iso2": "ar"});
						api.getCarrier('ar',callback);
						sinon.assert.calledWith(callback,{"name": "Argentina", "iso2": "ar"});
				});
				it('requires and id to get a carrier',function() {
						assert.throws(api.getCarrier(null,callback));
				});
				it('gets channels',function() {
						expectGet('/api/channels.json',[{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}]);
						api.getChannels(callback);
						sinon.assert.calledWith(callback,[{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}]);
				});
				it('gets channel',function() {
						expectGet('/api/channels/Argentina.json',{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]});
						api.getChannel('Argentina',callback);
						sinon.assert.calledWith(callback,{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]});
				});
				it('updates channel');
				it('deletes channel');
				it('gets candidate channels for ao', function() {
						expectGet('/api/candidate/channels.json?from=sms%3A%2F%2F1234&body=Hello',[{"name":"Argentina","configuration":[{"value":"bar","name":"foo"}]}]);

						api.getCandidateChannelsForAO({'from':'sms://1234','body':'Hello'},callback);
						sinon.assert.calledWith(callback,[{"name":"Argentina","configuration":[{"value":"bar","name":"foo"}]}]);
						assert(callback.calledOnce);
				});
				it('sends single ao', function () {
						expectGetWithHeaders(
								'/account_name/application_name/send_ao.json?from=sms%3A%2F%2F1234&body=Hello',
								[{"name": "Argentina", "configuration": [{"value": "bar", "name": "foo"}]}],
								{'x_nuntium_id': '1', 'x_nuntium_guid':'2', 'x_nuntium_token': '3'}
						);
						api.sendAO({ 'from': 'sms://1234',  'body': 'Hello'}, callback);
						sinon.assert.calledWith(callback, {'id': '1', 'guid': '2', 'token': '3'});
				});
				it('sends many aos');
				it('gets ao',function() {
						expectGet('/account_name/application_name/get_ao.json?token=foo',[{"name": "Argentina", "iso2": "ar"}]);
						api.getAO('foo',callback);
						sinon.assert.calledWith(callback,[{"name": "Argentina", "iso2": "ar"}]);
						assert(callback.calledOnce);
				});
				it('gets custom attributes',function() {
						expectGet('/api/custom_attributes?address=foo',[{"name": "Argentina", "iso2": "ar"}]);

						api.getCustomAttributes('foo',callback);
						sinon.assert.calledWith(callback,[{"name": "Argentina", "iso2": "ar"}]);
						assert(callback.calledOnce);
				});
				it('sets custom attributes');
				it('creates twitter friendship',function() {
						expectGet('/api/channels/twit/twitter/friendships/create?user=foo&follow=true');
						api.createTwitterFriendship({'channel':'twit','user':'foo','follow':true});
				});
				it('authorizes twitter channel',function() {
						expectGet('/api/channels/twit/twitter/authorize?callback=foo','http://bar');

						api.twitterAuthorize({'channel':'twit','callback':'foo'},callback);
						sinon.assert.calledWith(callback,'http://bar');
						assert(callback.calledOnce);
				});
				it('adds xmpp contact',function() {
						expectGet('/api/channels/chan/xmpp/add_contact?id=foo%40bar.com');
						api.xmppAddContact({'channel':'chan','id':'foo@bar.com'});
				});

				function expectGet(url,data) {
						var request = new Request('', {});
						sinon.stub(request, "on")
								.withArgs("complete")
								.callsArgWith(1, data, {"code": 200});

						server = sinon.mock(rest, "get");
						server
								.expects("get").withArgs(url).returns(request);
				}
				function expectGetWithHeaders(url,responseData, responseHeaders) {
						var request = new Request('', {});
						sinon.stub(request, "on")
								.withArgs("complete")
								.callsArgWith(1, responseData, {"headers": responseHeaders});

						server = sinon.mock(rest, "get");
						server
								.expects("get").withArgs(url).returns(request);
				}
		});
});
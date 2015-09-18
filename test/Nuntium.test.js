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
				it('creates channel',function() {
						expectPost(
								'/api/channels.json',
								{"name":"Argentina","configuration":[{"name":"foo","value":"bar"}]},
								{"name":"Argentina","configuration":[{"name":"foo","value":"bar"}]}
						);

						api.createChannel({"name":"Argentina","configuration":{"foo":"bar"}},callback);
						sinon.assert.calledWith(callback, {"name":"Argentina","configuration":{"foo":"bar"}});
				});
				it('updates channel', function () {
						expectPut(
								'/api/channels/Argentina.json',
								{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}
						);

						api.updateChannel('Argentina',{'name': 'Argentina', 'configuration': [{"foo":"bar"}]}, callback);
						sinon.assert.calledWith(callback, {'name': 'Argentina', 'configuration': {'foo': 'bar'}});
				});
				it('deletes channel',function() {
							expectDelete('/api/channels/Argentina');
							api.deleteChannel('Argentina');
				});
				it('gets candidate channels for ao', function() {
						expectGet(
								'/api/candidate/channels.json?from=sms%3A%2F%2F1234&body=Hello',
								[{"name":"Argentina","configuration":[{"value":"bar","name":"foo"}]}]
						);

						api.getCandidateChannelsForAO({'from':'sms://1234','body':'Hello'},callback);
						sinon.assert.calledWith(callback,[{"name":"Argentina","configuration":[{"value":"bar","name":"foo"}]}]);
						assert(callback.calledOnce);
				});
				it('sends single ao', function () {
						expectGet(
								'/account_name/application_name/send_ao.json?from=sms%3A%2F%2F1234&body=Hello',
								[{"name": "Argentina", "configuration": [{"value": "bar", "name": "foo"}]}],
								{'x_nuntium_id': '1', 'x_nuntium_guid':'2', 'x_nuntium_token': '3'}
						);
						api.sendAO({ 'from': 'sms://1234',  'body': 'Hello'}, callback);
						sinon.assert.calledWith(callback, {'id': '1', 'guid': '2', 'token': '3'});
				});
				it('sends many aos', function() {
						expectPost(
								'/account_name/application_name/send_ao.json',
								[{"from":"sms://1234","body":"Hello1"},{"from":"sms://1234","body":"Hello2"}],
								null,
								{'x_nuntium_token':'3'}
						);

						api.sendAO([{"from":"sms://1234","body":"Hello1"},{"from":"sms://1234","body":"Hello2"}],callback);
						sinon.assert.calledWith(callback, {'token': '3'});
						/*
							should_receive_http_post_with_headers "/account/application/send_ao.json", post_body, :x_nuntium_token => '3'
							response = api.send_ao [{:from => 'sms://1234', :body => 'Hello'}]
							response.should eq(:token => '3')
						 */
				});
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
				it('sets custom attributes',function() {
						expectPost('/api/custom_attributes?address=foo',{"application":"bar"},{"application":"bar"});
						api.setCustomAttributes('foo',{"application":"bar"},callback);
						sinon.assert.calledWith(callback,{"application":"bar"});
						assert(callback.calledOnce);
				});
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

				function expectGet(url,responseData, responseHeaders) {
						var response = {"headers": responseHeaders};
						var request = new Request('', {});
						sinon.stub(request, "on")
								.withArgs("complete")
								.callsArgWith(1, responseData, response);

						server = sinon.mock(rest, "get");
						server
								.expects("get").withArgs(url).returns(request);
				}
				function expectPut(url,responseData, responseHeaders) {
						var response = {"headers": responseHeaders};
						var request = new Request('', {});
						sinon.stub(request, "on")
								.withArgs("complete")
								.callsArgWith(1, responseData, response);

						server = sinon.mock(rest, "put");
						server
								.expects("put").withArgs(url).returns(request);
				}

				function expectPost(url,requestBody,responseBody, responseHeaders) {
						var response = {"headers": responseHeaders};
						var request = new Request('', {});
						sinon.stub(request, "on")
								.withArgs("complete")
								.callsArgWith(1, responseBody, response);

						server = sinon.mock(rest, "postJson");
						server
								.expects("postJson").withArgs(url,requestBody).returns(request);
				}
				function expectDelete(url,responseData, responseHeaders) {
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
});
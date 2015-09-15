var assert = require('assert');
var sinon = require("sinon");
var rest = require('restler');
var Request = require('restler').Request;
var Nuntium = require('../index').Nuntium;

describe('Nuntium', function() {
		describe('api', function () {
				var callback, api, server;
				before(function() {
						api = new Nuntium("account","application","password");
				});
				beforeEach(function() {
						server = sinon.mock(rest);
						callback = sinon.spy();
				});
				afterEach(function() {
						server.restore();
						callback.reset();
				});
				it('gets countries', function () {
						expectGet('/api/countries.json',[{"name": "Argentina", "iso2": "ar"}]);
						api.getCountries(callback);
						assert(callback.withArgs([{"name": "Argentina", "iso2": "ar"}]).calledOnce);
				});
				it('gets country', function () {
						expectGet('/api/countries/ar.json',{"name": "Argentina", "iso2": "ar"});
						api.getCountry('ar',callback);
						assert(callback.withArgs({"name": "Argentina", "iso2": "ar"}).calledOnce);
				});
				it('requires and id to get a country',function() {
						assert.throws(api.getCountry(null,callback));
				});
				it('gets carriers', function () {
						expectGet('/api/carriers.json',[{"name": "Argentina", "iso2": "ar"}]);
						api.getCarriers(callback);
						assert(callback.withArgs([{"name": "Argentina", "iso2": "ar"}]).calledOnce);
				});
				it('gets carriers for a country',function() {
						expectGet('/api/carriers.json?country_id=ar',[{"name": "Argentina", "iso2": "ar"}]);
						api.getCarriers('ar',callback);
						assert(callback.withArgs([{"name": "Argentina", "iso2": "ar"}]).calledOnce);
				});
				it('gets carrier',function() {
						expectGet('/api/carriers/ar.json',{"name": "Argentina", "iso2": "ar"});
						api.getCarrier('ar',callback);
						assert(callback.withArgs({"name": "Argentina", "iso2": "ar"}).calledOnce);
				});
				it('requires and id to get a carrier',function() {
						assert.throws(api.getCarrier(null,callback));
				});
				it('gets channels',function() {
						expectGet('/api/channels.json',[{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}]);
						api.getChannels(callback);
						assert(callback.withArgs([{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}]).calledOnce);
				});
				it('gets channel',function() {
						expectGet('/api/channels/Argentina.json',{"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]});
						api.getChannel('Argentina',callback);
						assert(callback.withArgs({"name": "Argentina", "configuration": [{"name": "foo", "value": "bar"}]}).calledOnce);
				});
				it('updates channel');
				it('deletes channel');
				it('gets candidate channels for ao');
				it('sends single ao');
				it('sends many aos');
				it('gets ao');
				it('gets custom attributes');
				it('sets custom attributes');
				it('creates twitter friendship');
				it('authorizes twitter channel');
				it('adds xmpp contact');

				function expectGet(url,data) {
						var request = new Request('', {});
						sinon.stub(request, "on")
								.withArgs("complete")
								.callsArgWith(1, data, {"code": 200});

						server = sinon.mock(rest, "get");
						server
								.expects("get").withArgs(url).returns(request);
				}
		});
});
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
						expectGet('/api/countries.json',[{"name": "Argentina", "iso2": "ar"}], {"code": 200});
						api.getCountries(callback);
						assert(callback.withArgs([{"name": "Argentina", "iso2": "ar"}]).calledOnce);
				});

				it('gets country');
				it('gets carriers');
				it('gets carriers for a country');
				it('gets carrier');
				it('gets channels');
				it('gets channel');
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

				function expectGet(url,data, response) {
						var request = new Request('', {});
						sinon.stub(request, "on")
								.withArgs("complete")
								.callsArgWith(1, data, response);

						server = sinon.mock(rest, "get");
						server
								.expects("get").withArgs(url).returns(request);
				}
		});
});
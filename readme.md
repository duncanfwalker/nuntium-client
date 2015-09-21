Nuntium NodeJS Client
=====================
(C) Duncan Walker (@duncanfwalker) 2015, Licensed under the MIT-LICENSE

Client library for using the Nuntium API from NodeJS. Direct port of the [nuntium_api Ruby gem](https://bitbucket.org/instedd/nuntium-api-ruby/)

[Nuntium](http://instedd.org/technologies/nuntium/) is an application for integrating with message platforms like SMS.

To use this client you will need to set up an account at <http://nuntium.instedd.org> or host the Nuntium Ruby 
application <https://github.com/instedd/nuntium> on your own server.

Installing
----------
```
npm install nuntium-client
```

Getting Started
---------------

Here\'s a minimal example of creating a client, sending a Hello World to the number 1234 and logging the GUID that 
Nuntium uses for tracking that message to the console.

```javascript
var nuntium = require('nuntium')

var client = new nuntium('https://nuntium.instedd.org','your_account', 'your_application', 'your_password');
client.sendAO({'body':'Hello World','to':'sms://1234'}, function(data) {
    console.log(data.guid);
});
```


[Full API documentation](docs/api-generated.md)

Contributing
------------
Regenerate API markdown from JSDoc:

```
npm run docs
```

Run tests:

```
npm test
```

TODO
----
* Get someone else to try the client out
* Add Nuntium Application to handle the AT and AO-delivery HTTP callbacks -  separate module? Need to decide how this 
relates to multiple applications feature.
* Add support for multiple applications 
* Add account authentication
* Maybe make callback's optional
* Support for connection pooling
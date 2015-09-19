Nuntium NodeJS Client
=====================
(C) Duncan Walker (@duncanfwalker) 2015, Licensed under the MIT-LICENSE

Client library for using the Nuntium API from NodeJS. Direct port of the [nuntium_api Ruby gem](https://bitbucket.org/instedd/nuntium-api-ruby/)

Installing
----------
```
npm install nuntium
```

Getting Started
---------------

Here\'s a minimal example of creating a client, sending a Hello World to the number 1234 and logging the GUID that 
Nuntium uses for tracking that message to the console.

```javascript
var nuntium = require('nuntium')

var client = new nuntium('your_account', 'your_application', 'your_password');
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
* Publish to NPM
* Add account authentication
* Maybe make callback's optional
* Add support for multiple applications 
* Add Nuntium Application to handle the AT and AO-delivery HTTP callbacks -  separate module?
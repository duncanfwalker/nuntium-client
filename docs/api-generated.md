<a name="Client"></a>
## Client
**Kind**: global class  

* [Client](#Client)
  * [new Client(service, account, application, password)](#new_Client_new)
  * [.getCountries(callback)](#Client+getCountries)
  * [.getCountry(country_id, callback)](#Client+getCountry)
  * [.getCarriers([country_id], callback)](#Client+getCarriers)
  * [.getCarrier(carrier_id, callback)](#Client+getCarrier)
  * [.updateChannel(name, properties, callback)](#Client+updateChannel)
  * [.createChannel(properties, callback)](#Client+createChannel)
  * [.getChannels(callback)](#Client+getChannels)
  * [.getChannel(name, callback)](#Client+getChannel)
  * [.deleteChannel(name, callback)](#Client+deleteChannel)
  * [.getAO(token, callback)](#Client+getAO)
  * [.sendAO(message, callback)](#Client+sendAO)
  * [.getCandidateChannelsForAO(args, callback)](#Client+getCandidateChannelsForAO)
  * [.getCustomAttributes(address, callback)](#Client+getCustomAttributes)
  * [.setCustomAttributes(address, attributes, callback)](#Client+setCustomAttributes)
  * [.createTwitterFriendship(args)](#Client+createTwitterFriendship)
  * [.twitterAuthorize(args, callback)](#Client+twitterAuthorize)
  * [.xmppAddContact(args)](#Client+xmppAddContact)

<a name="new_Client_new"></a>
### new Client(service, account, application, password)
Represents the Nuntium API.


| Param | Type | Description |
| --- | --- | --- |
| service | <code>string</code> | service url eg 'https://nuntium.instedd.org' |
| account | <code>string</code> | Your Nuntium account name |
| application | <code>string</code> | Name of your Nuntium application |
| password | <code>string</code> | Password for the application. |

<a name="Client+getCountries"></a>
### client.getCountries(callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+getCountry"></a>
### client.getCountry(country_id, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  
**Throws**:

- <code>NuntiumError</code> On bad arguments


| Param | Type |
| --- | --- |
| country_id | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+getCarriers"></a>
### client.getCarriers([country_id], callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| [country_id] | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+getCarrier"></a>
### client.getCarrier(carrier_id, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  
**Throws**:

- <code>NuntiumError</code> On bad arguments


| Param | Type |
| --- | --- |
| carrier_id | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+updateChannel"></a>
### client.updateChannel(name, properties, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  
**Throws**:

- <code>NuntiumError</code> On bad arguments


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | of the channel to update |
| properties | <code>Object</code> | to update |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> |  |

<a name="Client+createChannel"></a>
### client.createChannel(properties, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | of the new channel |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> |  |

<a name="Client+getChannels"></a>
### client.getChannels(callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+getChannel"></a>
### client.getChannel(name, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  
**Throws**:

- <code>NuntiumError</code> On bad arguments


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | of the channel to get |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> |  |

<a name="Client+deleteChannel"></a>
### client.deleteChannel(name, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  
**Throws**:

- <code>NuntiumError</code> On bad arguments


| Param | Type |
| --- | --- |
| name |  | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+getAO"></a>
### client.getAO(token, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| token | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+sendAO"></a>
### client.sendAO(message, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| message | <code>Object</code> &#124; <code>Array</code> | 
| message.from | <code>string</code> | 
| message.body | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+getCandidateChannelsForAO"></a>
### client.getCandidateChannelsForAO(args, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | eg {'from':'sms://1234','body':'Hello'}, |
| args.from | <code>string</code> | sender (include sms:// prefix) |
| args.body | <code>string</code> |  |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> |  |

<a name="Client+getCustomAttributes"></a>
### client.getCustomAttributes(address, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+setCustomAttributes"></a>
### client.setCustomAttributes(address, attributes, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 
| attributes | <code>Object</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+createTwitterFriendship"></a>
### client.createTwitterFriendship(args)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| args | <code>Object</code> | 
| args.channel | <code>string</code> | 
| args.user | <code>string</code> | 
| args.follow | <code>bool</code> | 

<a name="Client+twitterAuthorize"></a>
### client.twitterAuthorize(args, callback)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| args | <code>Object</code> | 
| args.channel | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Client+xmppAddContact"></a>
### client.xmppAddContact(args)
**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Type |
| --- | --- |
| args | <code>Object</code> | 
| args.channel | <code>string</code> | 


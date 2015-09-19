<a name="Nuntium"></a>
## Nuntium
**Kind**: global class  

* [Nuntium](#Nuntium)
  * [new Nuntium(account, application, password)](#new_Nuntium_new)
  * _instance_
    * [.getCountries(callback)](#Nuntium+getCountries)
    * [.getCountry(country_id, callback)](#Nuntium+getCountry)
    * [.getCarriers([country_id], callback)](#Nuntium+getCarriers)
    * [.getCarrier(carrier_id, callback)](#Nuntium+getCarrier)
    * [.updateChannel(name, properties, callback)](#Nuntium+updateChannel)
    * [.createChannel(properties, callback)](#Nuntium+createChannel)
    * [.getChannels(callback)](#Nuntium+getChannels)
    * [.getChannel(name, callback)](#Nuntium+getChannel)
    * [.deleteChannel(name, callback)](#Nuntium+deleteChannel)
    * [.getAO(token, callback)](#Nuntium+getAO)
    * [.sendAO(message, callback)](#Nuntium+sendAO)
    * [.getCandidateChannelsForAO(args, callback)](#Nuntium+getCandidateChannelsForAO)
    * [.getCustomAttributes(address, callback)](#Nuntium+getCustomAttributes)
    * [.setCustomAttributes(address, attributes, callback)](#Nuntium+setCustomAttributes)
    * [.createTwitterFriendship(args)](#Nuntium+createTwitterFriendship)
    * [.twitterAuthorize(args, callback)](#Nuntium+twitterAuthorize)
    * [.xmppAddContact(args)](#Nuntium+xmppAddContact)
  * _inner_
    * [~requestCallback](#Nuntium..requestCallback) : <code>function</code>

<a name="new_Nuntium_new"></a>
### new Nuntium(account, application, password)
Represents the Nuntium API.


| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | Your Nuntium account name |
| application | <code>string</code> | Name of your Nuntium application |
| password | <code>string</code> | Password for the application. |

<a name="Nuntium+getCountries"></a>
### nuntium.getCountries(callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+getCountry"></a>
### nuntium.getCountry(country_id, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| country_id | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+getCarriers"></a>
### nuntium.getCarriers([country_id], callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| [country_id] | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+getCarrier"></a>
### nuntium.getCarrier(carrier_id, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| carrier_id | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+updateChannel"></a>
### nuntium.updateChannel(name, properties, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | of the channel to update |
| properties | <code>Object</code> | to update |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> |  |

<a name="Nuntium+createChannel"></a>
### nuntium.createChannel(properties, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | of the new channel |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> |  |

<a name="Nuntium+getChannels"></a>
### nuntium.getChannels(callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+getChannel"></a>
### nuntium.getChannel(name, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | of the channel to get |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> |  |

<a name="Nuntium+deleteChannel"></a>
### nuntium.deleteChannel(name, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| name |  | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+getAO"></a>
### nuntium.getAO(token, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| token | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+sendAO"></a>
### nuntium.sendAO(message, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| message | <code>Object</code> &#124; <code>Array</code> | 
| message.from | <code>string</code> | 
| message.body | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+getCandidateChannelsForAO"></a>
### nuntium.getCandidateChannelsForAO(args, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | eg {'from':'sms://1234','body':'Hello'}, |
| args.from | <code>string</code> | sender (include sms:// prefix) |
| args.body | <code>string</code> |  |
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> |  |

<a name="Nuntium+getCustomAttributes"></a>
### nuntium.getCustomAttributes(address, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+setCustomAttributes"></a>
### nuntium.setCustomAttributes(address, attributes, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 
| attributes | <code>Object</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+createTwitterFriendship"></a>
### nuntium.createTwitterFriendship(args)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| args | <code>Object</code> | 
| args.channel | <code>string</code> | 
| args.user | <code>string</code> | 
| args.follow | <code>bool</code> | 

<a name="Nuntium+twitterAuthorize"></a>
### nuntium.twitterAuthorize(args, callback)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| args | <code>Object</code> | 
| args.channel | <code>string</code> | 
| callback | <code>[requestCallback](#Nuntium..requestCallback)</code> | 

<a name="Nuntium+xmppAddContact"></a>
### nuntium.xmppAddContact(args)
**Kind**: instance method of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| args | <code>Object</code> | 
| args.channel | <code>string</code> | 

<a name="Nuntium..requestCallback"></a>
### Nuntium~requestCallback : <code>function</code>
This callback is displayed as part of the Requester class.
If the response was an error

**Kind**: inner typedef of <code>[Nuntium](#Nuntium)</code>  

| Param | Type |
| --- | --- |
| result | <code>Object</code> &#124; <code>Error</code> | 
| response | <code>Object</code> | 


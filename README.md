[![Build Status](https://travis-ci.org/mateu-aguilo-bosch/message-center.png?branch=master)](https://travis-ci.org/mateu-aguilo-bosch/message-center)

# Message center service

This will allow you to add flash messages to your AngularJS app.

This service will expose a little API to allow you to display user messages on your site that can be closed and configured.

## Service
The service is in charge to expose to the developer an API to create and delete messages from the *Message Center*.

### Message types
There are four types of messages, these types are used for severity and presentation purposes:

  * `info`: no severity meaning inferred from this message type.
  * `warning`: warn the user about something.
  * `danger`: an error has happened or a dangerous situation has been detected.
  * `success`: everything went as expected.

If you use an invalid message type the *Message Center* will throw an error.

### Message status
There are four status a message can be in. Depending on the status of the message it will be displayed or not to the screen, or even deleted from the message center. It's the developer's task to set the correct initial status and understand the implications of that.

  * `unseen`: this means that the message has not yet been seen by the user. This will be changed to `shown` automatically in the next route change. This is the default status if anything else is specified.
  * `shown`: this means that the message has been already shown to the user. This message will be deleted from the *Message Center* in the next route change.
  * `next`: this one is a bit special. Odds are that you will show a message and right after that change your route. If that happens your message will only be seen for a fraction of a second. To avoid that use the `next` status, that will make the message available to the next page.
  * `permanent`: use this status to leave the message there until the **$rootScope** is reset or the user intentionally closes the message.

### Creating new messages
To create a new message you need to follow 3 simple steps:

  1. Inject the `MessageCenterModule` module in your current module. For instance in your *app.js* file you may add:

    ```js
    angular.module('myApp', [
      'ngRoute',
      'myApp.filters',
      'myApp.services',
      'myApp.directives',
      'myApp.controllers',
      'MessageCenterModule', // <---
    ]);
    ```
  1. Inject the `messageCenterService` service in your controller where you want to insert the message. For instance:

    ```js
    angular.module('myApp.controllers', []). // Since you injected globally in app.js you don't need to do it here.
    controller('fooController', ['messageCenterService', function (messageCenterService) { … }]);
    ```
  1. Use the service methods. Feel free to explore the code for more available methods. For instance to add a message:

    ```js
    messageCenterService.add('success', 'Your action has been completed!', { status: messageCenterService.status.permanent });
    ```

#### HTML
If you need to add HTML to a message you can do so by passing in the `html` option. HTML is disabled by default.

```js
messageCenterService.add('success', '<strong>HTML</strong> <em>is</em> <span>allowed</span>.', { html: true });
```

### Timer
You can add a timer to the alert so it auto dismisses. To do so, just add a timeout option in miliseconds.

```js
messageCenterService.add('success', 'Bye bye in 3s!', { timeout: 3000 });
```

## Directive
The directive `mcMessages` will allow you to place the messages wherever you want in your layout. Just drop `<mc-messages></mc-messages>` or `<div mc-messages></div>` somewhere in your partials and if there are any messages to be shown they will be shown there. Since it's a regular directive you can perform the common alterations and modifications to it to suit your needs.

## Bootstrap
This messages integrate seamlessly with the alerts from Twitter bootstrap.

## Installation

```
bower install message-center --save
```

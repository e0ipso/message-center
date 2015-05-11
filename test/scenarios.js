describe('Message Center with single directive', function() {

  beforeEach(module('MessageCenterModule'));

  beforeEach(function() { browser().navigateTo('/index.html'); });

  it('renders an empty ordered list on its initial state', function() {
    expect(element('div#mc-messages-wrapper').count()).toBe(1);
    expect(element('div#mc-messages-wrapper .alert').count()).toBe(0);
  });

  describe('when on the same view', function(){
    beforeEach(function() { element('#goEdit').click(); });

    it('renders a message with the default "success" level', function() {
      element('#saveSuccess').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('Saved successfully!');
    });

    it('renders a message with the level and text provided', function() {
      element('#saveFailure').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-danger fade in');
      expect(messages.text()).toMatch('Something went wrong!');
    });

    it('renders multiple messages with the default "success" level and text', function() {
      element('#saveMultipleSuccess').click();
      var yay = element('div#mc-messages-wrapper .alert:first');
      expect(yay.prop('className')).toEqual('alert alert-success fade in');
      expect(yay.text()).toMatch('Yay!');
      var saved = element('div#mc-messages-wrapper .alert:nth-of-type(2)');
      expect(saved.prop('className')).toEqual('alert alert-success fade in');
      expect(saved.text()).toMatch('Saved successfully!');
    });

    it('renders multiple messages with the level and text provided', function() {
      element('#saveMultipleTypes').click();
      var yay = element('div#mc-messages-wrapper .alert:first');
      expect(yay.prop('className')).toEqual('alert alert-success fade in');
      expect(yay.text()).toMatch('Yay!');
      var somethingWrong = element('div#mc-messages-wrapper .alert:nth-of-type(2)');
      expect(somethingWrong.prop('className')).toEqual('alert alert-danger fade in');
      expect(somethingWrong.text()).toMatch('Something went wrong!');
    });
  });

  describe('when navigating to another view', function() {

    it('renders a message with the default "success" level', function() {
      element('#goEditSuccess').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('You have reached the edit page!');
    });

    it('renders a message with the level and text provided', function() {
      element('#goEditFailure').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-danger fade in');
      expect(messages.text()).toMatch('Something went wrong!');
    });

    it('renders multiple messages with the default "success" level and text', function() {
      element('#goEditMultipleSuccess').click();
      var yay = element('div#mc-messages-wrapper .alert:first');
      expect(yay.prop('className')).toEqual('alert alert-success fade in');
      expect(yay.text()).toMatch('Yay!');
      var youveReached = element('div#mc-messages-wrapper .alert:nth-of-type(2)');
      expect(youveReached.prop('className')).toEqual('alert alert-success fade in');
      expect(youveReached.text()).toMatch('You have reached the edit page!');
    });

    it('renders multiple messages with the level and text provided', function() {
      element('#goEditMultipleTypes').click();
      var yay = element('div#mc-messages-wrapper .alert:first');
      expect(yay.prop('className')).toEqual('alert alert-success fade in');
      expect(yay.text()).toMatch('Yay!');
      var somethingWrong = element('div#mc-messages-wrapper .alert:nth-of-type(2)');
      expect(somethingWrong.prop('className')).toEqual('alert alert-danger fade in');
      expect(somethingWrong.text()).toMatch('Something went wrong!');
    });
  });
  
  describe('after navigating to multiple different views with permanent message', function () {
    beforeEach(function () {
      element('#goPermanent').click();
    });
    it('still renders a permanent message', function () {
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('Showing permanent message!');
      element('#goIndex').click();
      element('#goPermanent').click();
      element('#goIndex').click();
      messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(2);
      var message = element('div#mc-messages-wrapper .alert:first');
      expect(message.prop('className')).toEqual('alert alert-success fade in');
      expect(message.text()).toMatch('Showing permanent message!');
      messages = element('div#mc-messages-wrapper .alert');
      message = element('div#mc-messages-wrapper .alert:nth-of-type(2)');
      expect(messages.count()).toBe(2);
      expect(message.prop('className')).toEqual('alert alert-success fade in');
      expect(message.text()).toMatch('Showing permanent message!');
    });
    it('renders a permanent message and then closes it', function () {
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('Showing permanent message!');
      element('#goIndex').click();
      messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('Showing permanent message!');
      element('div#mc-messages-wrapper .alert .close').click();
      messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(0);
      element('#goIndex').click();
      messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(0);
    });
  });

  describe('after navigating to multiple different views with next message', function () {
    it('clears the next message', function () {
      element('#goEditSuccess').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('You have reached the edit page!');
      element('#saveSuccessGoHome').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('Saved successfully and went home!');
    });
  });

  describe('when going to the allowed HTML page', function(){
    beforeEach(function() { element('#goHTML').click(); });

    it('renders a message with HTML enabled', function() {
      element('#allowedHTML').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('HTML is allowed.');
    });

    it('renders a message with HTML disabled', function() {
      element('#plainText').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-warning fade in');
      expect(messages.text()).toMatch('<strong>HTML</strong> <em>is</em> NOT <span>allowed</span>.');
    });

  });

});

describe('Message Center', function() {

  beforeEach(module('MessageCenterModule'));

  beforeEach(function() { browser().navigateTo('/index2.html'); });

  it('renders an empty ordered list on its initial state', function() {
    expect(element('div#mc-messages-wrapper').count()).toBe(1);
    expect(element('div#mc-messages-wrapper .alert').count()).toBe(0);
  });

  describe('when on the same view without routing', function(){

    it('renders a message with the default "success" level', function() {
      element('#saveSuccess').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('Saved successfully!');
    });

    it('renders a message with the level and text provided', function() {
      element('#saveFailure').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-danger fade in');
      expect(messages.text()).toMatch('Something went wrong!');
    });

    it('renders multiple messages with the default "success" level and text', function() {
      element('#saveMultipleSuccess').click();
      var yay = element('div#mc-messages-wrapper .alert:first');
      expect(yay.prop('className')).toEqual('alert alert-success fade in');
      expect(yay.text()).toMatch('Yay!');
      var saved = element('div#mc-messages-wrapper .alert:nth-of-type(2)');
      expect(saved.prop('className')).toEqual('alert alert-success fade in');
      expect(saved.text()).toMatch('Saved successfully!');
    });

    it('renders multiple messages with the level and text provided', function() {
      element('#saveMultipleTypes').click();
      var yay = element('div#mc-messages-wrapper .alert:first');
      expect(yay.prop('className')).toEqual('alert alert-success fade in');
      expect(yay.text()).toMatch('Yay!');
      var somethingWrong = element('div#mc-messages-wrapper .alert:nth-of-type(2)');
      expect(somethingWrong.prop('className')).toEqual('alert alert-danger fade in');
      expect(somethingWrong.text()).toMatch('Something went wrong!');
    });
  });
});

describe('Message Center with multiple directives', function() {

  beforeEach(module('MessageCenterModule'));

  beforeEach(function() { browser().navigateTo('/index3.html'); });

  it('renders an empty ordered list on its initial state', function() {
    expect(element('div#mc-messages-wrapper').count()).toBe(1);
    expect(element('div#mc-messages-wrapper .alert').count()).toBe(0);
  });

  describe('when navigating through two views', function() {

    it('renders a message with the default "success" level', function() {
      element('#goEditSuccess').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('You have reached the edit page!');
      element('#saveSuccessGoHome').click();
      messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(1);
      expect(messages.prop('className')).toEqual('alert alert-success fade in');
      expect(messages.text()).toMatch('Saved successfully and went home!');
    });
  });
});


describe('Message Center with global configurations', function() {

  beforeEach(module('MessageCenterModule'));

  beforeEach(function() { browser().navigateTo('/index4.html'); });

  it('renders an empty ordered list on its initial state', function() {
    expect(element('div#mc-messages-wrapper').count()).toBe(1);
    expect(element('div#mc-messages-wrapper .alert').count()).toBe(0);
  });

  describe('when navigating through two views', function() {

    it('renders a message with the default "success" level', function() {
      element('#goEditSuccess').click();
      var messages = element('div#mc-messages-wrapper .alert');
      expect(messages.count()).toBe(0);
  
    });
  });
});

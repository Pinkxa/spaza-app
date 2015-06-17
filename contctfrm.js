process.env.NODE_ENV = 'test';
var app = require('../../server');
var assert = require('assert');
var Browser = require('zombie');
 
describe('contact page', function() {
 
  before(function() {
    this.server = http.createServer(app).listen(3000);
    this.browser = new Browser({ site: 'http://localhost:3000' });
  });
 
  // load the contact page before each test
  beforeEach(function(done) {
    this.browser.visit('/contact', done);
  });
 
  it('should show contact a form', function() {
    assert.ok(this.browser.success);
    assert.equal(this.browser.text('h1'), 'Contact');
    assert.equal(this.browser.text('form label'), 'First NameLast NameEmailMessage');
  });
 
  it('should refuse empty submissions', function(done) {
    var browser = this.browser;
    browser.pressButton('Send').then(function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Contact');
      assert.equal(browser.text('div.alert'), 'Please fill in all the fields');
    }).then(done, done);
  });
 
  it('should refuse partial submissions', function(done) {
    var browser = this.browser;
    browser.fill('first_name', 'John');
    browser.pressButton('Send').then(function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Contact');
      assert.equal(browser.text('div.alert'), 'Please fill in all the fields');
    }).then(done, done);
  });
 
  it('should keep values on partial submissions', function(done) {
    var browser = this.browser;
    browser.fill('first_name', 'John');
    browser.pressButton('Send').then(function() {
      assert.equal(browser.field('first_name').value, 'John');
    }).then(done, done);
  });
 
  it('should refuse invalid emails', function(done) {
    var browser = this.browser;
    browser.fill('first_name', 'John');
    browser.fill('last_name', 'Doe');
    browser.fill('email', 'incorrect email');
    browser.fill('message', 'Lorem ipsum');
    browser.pressButton('Send').then(function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Contact');
      assert.equal(browser.text('div.alert'), 'Please check the email address format');
    }).then(done, done);
  });
 
  it('should accept complete submissions', function(done) {
    var browser = this.browser;
    browser.fill('first_name', 'John');
    browser.fill('last_name', 'Doe');
    browser.fill('email', 'test@example.com');
    browser.fill('message', 'Lorem ipsum');
    browser.pressButton('Send').then(function() {
      assert.ok(browser.success);
      assert.equal(browser.text('h1'), 'Message Sent');
      assert.equal(browser.text('p'), 'Thank you for your message. We\'ll answer you shortly.');
    }).then(done, done);
  });
 
  after(function(done) {
    this.server.close(done);
  });
 
});

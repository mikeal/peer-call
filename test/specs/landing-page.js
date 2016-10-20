var assert = require('assert');
describe('landing page', function() {
    it('has the roll call title and basic buttons', function () {
        browser.url('http://127.0.0.1:9966');
        var title = browser.getTitle();
        assert.equal(title, 'Roll Call');
        var partyButton = browser.element("button#join-party")
        var createRoomButton = browser.element("button#create-room")
        partyButton.waitForExist(2500);
        createRoomButton.waitForExist(2500);
    });

    it('has a link to the party room', function () {
        browser.url('http://127.0.0.1:9966');
        var partyButton = browser.element("button#join-party")
        partyButton.waitForExist(2500);
        partyButton.click()
        assert.equal(browser.getUrl(), 'http://127.0.0.1:9966/?room=room')
    });

     it('has a link to a new room', function () {
        browser.url('http://127.0.0.1:9966');
        var title = browser.getTitle();
        var createRoomButton = browser.element("button#create-room")
        createRoomButton.waitForExist(2500);
        createRoomButton.click()
        assert(browser.getUrl().match(/http:\/\/127.0.0.1:9966\/\?room=\w{20}/))
    });
});
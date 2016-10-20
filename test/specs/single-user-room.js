var assert = require('assert');
describe('single-user-page', function() {

    it('shows a message container telling the user to wait', function () {
        browser.url('http://127.0.0.1:9966/?room=single-user2');
        var message = browser.element("#message-text")
        message.waitForExist(500);
        assert.equal(browser.getText('#message-text'), 'We are establishing a connection to your room, please be patient...')
    })

    it('has the roll call title', function () {
        browser.url('http://127.0.0.1:9966/?room=single-user');
        var title = browser.getTitle();
        assert.equal(title, 'Roll Call');
    })

    it('has a settings button', function () {
        browser.url('http://127.0.0.1:9966/?room=single-user');
        var settingsButton = browser.element("button#settings")
        settingsButton.waitForExist(2500);
        assert(settingsButton.isExisting())
    })

    it('has a share button', function () {
        browser.url('http://127.0.0.1:9966/?room=single-user');
        var shareButton = browser.element("button#share")
        shareButton.waitForExist(2500);
        assert(shareButton.isExisting())
    })

    it('has a record button', function () {
        browser.url('http://127.0.0.1:9966/?room=single-user');
        var recordButton = browser.element("button#record")
        recordButton.waitForExist(2500);
        assert(recordButton.isExisting())
    })

    it('has an audio card and it designated elements', function () {
        browser.url('http://127.0.0.1:9966/?room=single-user');
        var audioCard = browser.element("div#card-me")
        audioCard.waitForExist(2500);
        var editableName = browser.element('div#card-me .person-name')
        assert(audioCard.isExisting())
        assert(editableName.isExisting())
        assert.equal(editableName.getText(), 'Me')
        assert(browser.element('div#card-me .mute-checkbox').isExisting())
    })


    it('can change it username by the editable', function () {
        browser.url('http://127.0.0.1:9966/?room=single-user');
        var audioCard = browser.element("div#card-me")
        audioCard.waitForExist(2500);
        var editableName = browser.element('div#card-me .person-name')
        assert(editableName.isExisting())
        editableName.setValue('Matthew')
        assert.equal(editableName.getText(), 'Matthew')
    })


    it('can change it username by the settings', function () {
        //TODO this test fails because we don't update the editable.
        browser.url('http://127.0.0.1:9966/?room=single-user');
        var settingsButton = browser.element("button#settings")
        settingsButton.waitForExist(2500);
        assert(settingsButton.isExisting())
        browser.click("button#settings")
        var settingsForm = browser.element("#settings")
        settingsForm.waitForExist(2500);
        assert(settingsForm.isExisting())
        browser.element("#settings input[name='username'").setValue('John Smith')
        browser.element("#settings .approve").click()
        var editableName = browser.element('div#card-me .person-name')
        browser.waitUntil(function () {
          return browser.getText('div#card-me .person-name') === 'John Smith'
        }, 500, 'expected name to update in card');
    })


});
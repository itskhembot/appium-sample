const webdriverio = require("webdriverio");
const assert = require('chai').assert;

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "8",
    deviceName: "AppiumEmu",
    app: "C:/Users/Acer/Documents/work/flutter.app/build/app/outputs/apk/debug/app-debug.apk",
    appWaitActivity: "*",
    automationName: "UiAutomator2"
  }
};

describe('Check Appium Test App', function () {
  let client;

  before(async function () {
    client = await webdriverio.remote(opts);
  });

  it('should create session', async function () {
    const res = await client.status();
    assert.isObject(res.build);
    const current_package = await client.getCurrentPackage();
    assert.equal(current_package, 'com.app.pos_system_app');

  });

  it('should have Input field with Input Text', async function () {
    const field = await client.$("android.widget.EditText");
    const value = await field.getText();
    assert.equal(value, 'Test Input');
  });

  it('should destroy session', async function () {
    const delete_session = await client.deleteSession();
    assert.isNull(delete_session);
  });
});

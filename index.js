const wdio = require("webdriverio");
const assert = require("assert");

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

async function main() {
  const client = await wdio.remote(opts);

  const field = await client.$("android.widget.EditText");
  const value = await field.getText();
  assert.strictEqual(value, "Test Input");

  await client.deleteSession();
}

main();

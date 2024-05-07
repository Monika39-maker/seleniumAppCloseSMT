const { Builder, By, Key, until } = require("selenium-webdriver");
const url = "https://vanguardadmin.fnz.net/Issues/LogIssue.aspx"
const driver = new Builder().forBrowser("chrome").build()
driver.get(url);
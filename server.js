
const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors());

app.use(express.json());

const { Builder, By } = require("selenium-webdriver");

async function closeSMT(requestType, issueId, vgNumber) {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:8000");

    const requestTypeDropdown = await driver.findElement(By.id("requestType"));
    await requestTypeDropdown.sendKeys(requestType);

    const vgNumberInput = await driver.findElement(By.id("vgNumber"));
    await vgNumberInput.sendKeys(vgNumber);

    const issueIdInput = await driver.findElement(By.id("issueId"));
    await issueIdInput.sendKeys(issueId);

    const submitButton = await driver.findElement(
      By.css('input[type="submit"]')
    );
    await submitButton.click();

    await driver.sleep(3000);

    await requestTypeDropdown.clear();
    await vgNumberInput.clear();
    await issueIdInput.clear();
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
}



app.post("/closeSMT", (req, res) => {
  const { requestType, issueId, vgNumber } = req.body;

  // Call the closeSMT function with the received parameters
  closeSMT(requestType, issueId, vgNumber)
    .then(() => {
      res.sendStatus(200); // Send success response
    })
    .catch((error) => {
      console.error("Error executing closeSMT:", error);
      res.sendStatus(500); // Send error response
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server is running in port ${PORT}`));

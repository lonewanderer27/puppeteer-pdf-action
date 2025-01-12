import puppeteer, { LaunchOptions, PDFOptions } from "puppeteer";

async function createPDF(
  url: string,
  launchArgs: LaunchOptions = {},
  pdfOptions: PDFOptions = {},
) {
  try {
    const browser = await puppeteer.launch({ headless: true, ...launchArgs });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", ...pdfOptions });
    await browser.close();
    return pdf;
  } catch (err) {
    console.log(err);
  }
}

export default createPDF;

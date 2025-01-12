"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
async function createPDF(url, launchArgs = {}, pdfOptions = {}) {
    try {
        const browser = await puppeteer_1.default.launch({ headless: true, ...launchArgs });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        const pdf = await page.pdf({ format: "A4", ...pdfOptions });
        await browser.close();
        return pdf;
    }
    catch (err) {
        console.log(err);
    }
}
exports.default = createPDF;
//# sourceMappingURL=createPDF.js.map
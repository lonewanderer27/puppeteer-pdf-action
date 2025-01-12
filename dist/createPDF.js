var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from "puppeteer";
function createPDF(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, launchArgs = {}, pdfOptions = {}) {
        try {
            const browser = yield puppeteer.launch(Object.assign({ headless: true }, launchArgs));
            const page = yield browser.newPage();
            yield page.goto(url, { waitUntil: "networkidle0" });
            const pdf = yield page.pdf(Object.assign({ format: "A4" }, pdfOptions));
            yield browser.close();
            return pdf;
        }
        catch (err) {
            console.log(err);
        }
    });
}
export default createPDF;
//# sourceMappingURL=createPDF.js.map
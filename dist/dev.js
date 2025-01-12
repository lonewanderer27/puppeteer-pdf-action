var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import createPDF from "./createPDF";
import fs from "fs/promises";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const pdf = yield createPDF("https://lonewanderer27.github.io/resume", {}, {
            format: "A4",
            pageRanges: "1",
            margin: {
                top: "10mm",
                right: "10mm",
                bottom: "10mm",
                left: "10mm",
            },
        });
        yield fs.writeFile("output.pdf", pdf);
        return pdf;
    });
}
/* ignore next */
if (require.main === module) {
    run();
}
//# sourceMappingURL=dev.js.map
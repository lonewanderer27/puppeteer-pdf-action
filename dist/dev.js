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
import * as fs from "fs/promises";
import * as path from "path";
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
/* Check if this module is the entry point */
if (path.basename(import.meta.url) === path.basename(process.argv[1])) {
    run();
}
//# sourceMappingURL=dev.js.map
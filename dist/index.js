var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as core from "@actions/core";
import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";
import createPDF from "./createPDF";
function getChromePath() {
    let browserPath = "";
    if (os.type() === "Windows_NT") {
        // Chrome is usually installed as a 32-bit application, on 64-bit systems it will have a different installation path.
        const programFiles = os.arch() === "x64"
            ? process.env["PROGRAMFILES(X86)"]
            : process.env.PROGRAMFILES;
        browserPath = path.join(programFiles, "Google/Chrome/Application/chrome.exe");
    }
    else if (os.type() === "Linux") {
        browserPath = "/usr/bin/google-chrome";
    }
    else if (os.type() === "Darwin") {
        browserPath =
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    }
    if (browserPath && browserPath.length > 0) {
        return path.normalize(browserPath);
    }
    throw new TypeError(`Cannot run action. ${os.type} is not supported.`);
}
export function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chromePath = getChromePath();
            // Get inputs
            const url = core.getInput("url");
            const outputFilePath = core.getInput("output-file-path");
            const pageRanges = core.getInput("page-ranges", { required: false });
            const format = core.getInput("format", { required: false });
            const margin = core.getInput("margin", { required: false });
            let topMargin = core.getInput("top-margin", { required: false });
            let bottomMargin = core.getInput("bottom-margin", { required: false });
            let rightMargin = core.getInput("left-margin", { required: false });
            let leftMargin = core.getInput("right-margin", { required: false });
            // if margin is set, override the values of all sides margin
            if (margin !== "") {
                topMargin = margin;
                bottomMargin = margin;
                rightMargin = margin;
                leftMargin = margin;
            }
            const pdf = yield createPDF(url, {
                executablePath: chromePath,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            }, {
                pageRanges: pageRanges,
                format: format,
                margin: {
                    top: topMargin,
                    bottom: bottomMargin,
                    left: leftMargin,
                    right: rightMargin
                }
            });
            yield fs.writeFile(outputFilePath, pdf);
        }
        catch (err) {
            console.log(err);
        }
    });
}
/* Check if this module is the entry point */
if (path.basename(import.meta.url) === path.basename(process.argv[1])) {
    run();
}
//# sourceMappingURL=index.js.map
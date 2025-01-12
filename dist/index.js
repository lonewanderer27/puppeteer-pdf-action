"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs/promises"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const createPDF_1 = __importDefault(require("./createPDF"));
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
async function run() {
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
        const pdf = await (0, createPDF_1.default)(url, {
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
        await fs.writeFile(outputFilePath, pdf);
    }
    catch (err) {
        console.log(err);
    }
}
// @ts-ignore
if (path.basename(import.meta.url) === path.basename(process.argv[1])) {
    run();
}
//# sourceMappingURL=index.js.map
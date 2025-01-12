import core from "@actions/core";
import fs from "fs/promises";
import os from "os";
import path from "path";
import createPDF from "./createPDF";
import { PaperFormat, PDFMargin } from "puppeteer";

function getChromePath() {
  let browserPath = "";

  if (os.type() === "Windows_NT") {
    // Chrome is usually installed as a 32-bit application, on 64-bit systems it will have a different installation path.
    const programFiles =
      os.arch() === "x64"
        ? process.env["PROGRAMFILES(X86)"]
        : process.env.PROGRAMFILES;
    browserPath = path.join(
      programFiles!,
      "Google/Chrome/Application/chrome.exe"
    );
  } else if (os.type() === "Linux") {
    browserPath = "/usr/bin/google-chrome";
  } else if (os.type() === "Darwin") {
    browserPath =
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }

  if (browserPath && browserPath.length > 0) {
    return path.normalize(browserPath);
  }

  throw new TypeError(`Cannot run action. ${os.type} is not supported.`);
}

export async function run() {
  try {
    const chromePath = getChromePath();

    // Get inputs
    const url = core.getInput("url");
    const outputFilePath = core.getInput("output-file-path");
    const pageRanges = core.getInput("page-ranges", { required: false });
    const format = core.getInput("format", { required: false }) as PaperFormat;
    const margin = core.getInput("margin", { required: false });

    let topMargin = core.getInput("top-margin", { required: false })
    let bottomMargin = core.getInput("bottom-margin", { required: false })
    let rightMargin = core.getInput("left-margin", { required: false })
    let leftMargin = core.getInput("right-margin", { required: false })

    // if margin is set, override the values of all sides margin
    if (margin !== "") {
      topMargin = margin;
      bottomMargin = margin;
      rightMargin = margin;
      leftMargin = margin;
    }

    const pdf = await createPDF(
      url,
      {
        executablePath: chromePath,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
      {
        pageRanges: pageRanges,
        format: format,
        margin: {
          top: topMargin,
          bottom: bottomMargin,
          left: leftMargin,
          right: rightMargin
        }
      }
    );
    await fs.writeFile(outputFilePath, pdf);
  } catch (err) {
    console.log(err);
  }
}

/* ignore next */
if (require.main === module) {
  run();
}

import { createPDF } from ".";
import * as fs from "fs/promises";
import * as path from "path";

async function run() {
  const pdf = await createPDF(
    "https://lonewanderer27.github.io/resume",
    {},
    {
      format: "A4",
      pageRanges: "1",
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    },
  );
  await fs.writeFile("output.pdf", pdf!);
  return pdf;
}

// @ts-ignore
if (path.basename(import.meta.url) === path.basename(process.argv[1])) {
  run();
}
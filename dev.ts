import createPDF from "./createPDF";
import fs from "fs/promises";

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
  await fs.writeFile("output.pdf", pdf);
  return pdf;
}

/* ignore next */
if (require.main === module) {
  run();
}

import { PDFDocument } from "pdf-lib";
import fetch from "node-fetch";
import fs from "fs";

async function fillForm() {
  console.log("fillForm");

  const formUrl =
    "https://www.bafa.de/SharedDocs/Downloads/DE/Energie/beg_formular_beg_vm.pdf?__blob=publicationFile&v=2";
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);
  console.log("pdfDoc:", pdfDoc);

  const form = pdfDoc.getForm();
  console.log("form:", form);

  const fields = form.getFields();
  console.log("fields:", fields);
  console.log(
    "fields.name:",
    fields.map((field) => field.getName())
  );

  const addressField = form.getTextField("Straße und Hausnummer1");
  addressField.setText("Musterstraße 1, 12345 Musterstadt");

  const pdfBytes = await pdfDoc.save();
  fs.createWriteStream("output.pdf").write(pdfBytes);
}

fillForm();

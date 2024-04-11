  const express = require("express");
  const { compileTemplateToHtml, generateHtmlToPdf } = require("./helper");
  const app = express();
  const port = 3000;

  app.get("/generate-certificate", async (req, res) => {
    try {
      const { name = "", certificateFor = "", organization = "" } = req.query;
      const html = await compileTemplateToHtml("certificate", {
        name,
        certificateFor,
        organization,
      });
      const pdf = await generateHtmlToPdf(html);
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      });
      res.send(pdf);
    } catch (error) {
      throw error;
    }
  });

  app.listen(port, () => {
    console.log("Server is running on ", port);
  });

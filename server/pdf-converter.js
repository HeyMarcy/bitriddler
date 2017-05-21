const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');

const getHostUrl = (req) => req.protocol + '://' + req.get('host');
const getTmpPath = (filename) => path.join(__dirname, 'tmp', filename);

const setupPdfConverter = (app) => {

  app.get('/api/pdf-download/:filename', (req, res, next) => {
    const filename = req.params.filename;
    const pdfFile = fs.createReadStream(getTmpPath(filename));
    const pdfStat = fs.statSync('./public/modules/datacollectors/output.pdf');
    res.setHeader('Content-Length', pdfStat.size);
    res.setHeader('Content-disposition', 'attachment; filename=kareem_resume.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    pdfFile.pipe(res);
  });

  app.post('/api/pdf-converter', (req, res, next) => {
    const html = `
<!DOCTYPE html>
<html>
  <style>
    ${req.body.css}
  </style>
  <body>
    ${req.body.html}
  </body>
</html>
    `;

    const options = req.body.options || {};
    const filename = req.body.filename;

    pdf.create(html, options).toFile(getTmpPath(filename), (err, result) => {
      if (err) {
        console.log('PDF CONVERTING ERROR:::', err);
        return res.status(500).send(err);
      }

      res.send({
        fileLocation: `${getHostUrl(req)}/api/pdf-download/${filename}`,
      });
    });
  });
}

module.exports = setupPdfConverter;

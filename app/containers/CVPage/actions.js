export const DOWNLOAD_PDF = 'containers/CVPage/DOWNLOAD_PDF';

export const downloadPDF = ({ html, css }) => ({
  type: DOWNLOAD_PDF,
  html,
  css,
});

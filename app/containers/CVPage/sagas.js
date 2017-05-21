import { takeLatest, call } from 'redux-saga/effects';
import { DOWNLOAD_PDF } from './actions';
import * as pdfApi from 'apis/pdf';

function* downloadPDF({ html, css }) {
  try {
    const { fileLocation } = yield call(pdfApi.convert, { html, css });
    // window.location = fileLocation;
  } catch(err) {
    console.log('error', err);
  }
}

function* watchDownloadPDF() {
  yield takeLatest(DOWNLOAD_PDF, downloadPDF);
}

export default [
  watchDownloadPDF,
];

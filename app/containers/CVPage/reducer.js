import { DOWNLOAD_PDF } from './actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  downloadingPDF: false,
});

export default (state = initialState, { type, html, css }) => {
  switch(type) {
    case DOWNLOAD_PDF:
      return state.set('downloadingPDF', true);
    default:
      return state;
  }
}

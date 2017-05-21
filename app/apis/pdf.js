import request from 'superagent';

const A4_RATIO = (297 / 210);
const A4_WIDTH = 1115;
const A4_HEIGHT = A4_RATIO * A4_WIDTH;

export const convert = ({ html, css }) => new Promise((resolve, reject) => {
  request
    .post('/api/pdf-converter')
    .set('Accept', 'application/pdf')
    .send({
      html,
      css,
      filename: 'kareem1.pdf',
      options: {
        // width: `${A4_WIDTH}px`,
        // height: `${A4_HEIGHT}px`,
        format: 'A4',
      },
    })
    .end((err, res) => {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
});

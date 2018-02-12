/* jshint ignore:start */

const loadImage = require('blueimp-load-image');

// File | Blob | URLString -> LoadImageOptions -> Promise<DataURLString>
//
// Documentation for `options` (`LoadImageOptions`):
// https://github.com/blueimp/JavaScript-Load-Image/tree/v2.18.0#options
exports.autoOrientImage = (fileOrBlobOrURL, options = {}) => {
  const {quality} = options;
  if (typeof quality !== 'undefined' && typeof quality !== 'number') {
    throw new TypeError(`\`options.quality\` must be a number; got ${typeof quality}`);
  }

  const optionsWithDefaults = Object.assign(
    {
      type: 'image/jpeg',
      quality: 0.8,
    },
    options,
    {
      canvas: true,
      orientation: true,
    }
  );

  return new Promise((resolve, reject) => {
    loadImage(fileOrBlobOrURL, canvasOrError => {
      if (canvasOrError.type === 'error') {
        const error = canvasOrError;
        reject(error);
        return;
      }

      const canvas = canvasOrError;
      const dataURL = canvas.toDataURL(
        optionsWithDefaults.type,
        optionsWithDefaults.quality
      );

      resolve(dataURL);
    }, optionsWithDefaults);
  });
};
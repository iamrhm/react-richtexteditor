import urlMetadata from 'url-metadata';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { url } = req.query;
    urlMetadata(url).then(
    function (metadata) { // success handler
      res.send(metadata);
    },
    function (error) { // failure handler
      console.log(error);
    });
  }
}
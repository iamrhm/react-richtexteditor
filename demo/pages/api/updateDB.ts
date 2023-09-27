import { NextApiRequest, NextApiResponse } from 'next';
import { writeToFile } from '../../utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      writeToFile(req.body.data);
      res.statusCode = 200;
      res.send('success');
    } catch (e) {
      res.statusCode = 400;
      res.send({
        error: e,
      });
    }
  }
}
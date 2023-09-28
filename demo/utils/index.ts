import fs from 'fs';
import path from 'path';

import data from '../data/data.json';
import { IParsedRichData } from '@mittirorg/react-richtext';


export const writeToFile = (newData: IParsedRichData): void => {
  const updatedData: IParsedRichData[] = data;
  updatedData.push(newData);
  /*fs.writeFileSync(
    path.resolve(''),
    JSON.stringify(updatedData, null, 2)
  );*/
};
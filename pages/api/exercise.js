import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // The path to your json file in the public directory
  const jsonFilePath = path.join(process.cwd(), 'public', 'fitvision.json');

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      // If there's an error reading the file, return a 500 error
      res.status(500).json({ message: 'Error reading the json file' });
    } else {
      // If the file is read successfully, return the JSON data
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end(data);
    }
  });
}

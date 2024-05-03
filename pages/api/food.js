import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Constructing the file path to the JSON file
  const jsonFilePath = path.join(process.cwd(), 'public', 'food.json');
  // Reading the JSON file asynchronously
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) { // Handling errors, if any
      res.status(500).json({ message: 'Error reading the json file' });
    } else {
      let foods = JSON.parse(data).foods; // Parsing JSON data and extracting foods
      // Adding imageUrl properties to each food object
      foods = foods.map(food => ({
        ...food,
        imageUrl: `/media/${food.imageUrl}`  // Assuming media directory has these images
      }));

      // Setting response header to indicate JSON content
      res.setHeader('Content-Type', 'application/json');
      // Sending a 200 response with the processed foods data
      res.status(200).json({ foods });
    }
  });
}

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Constructing the file path to the JSON file
  const jsonFilePath = path.join(process.cwd(), 'public', 'fitvision.json');
  // Reading the JSON file asynchronously
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading the json file' });
    } else {
      let exercises = JSON.parse(data).exercises; // Parsing JSON data and extracting exercises
      // Adding imageUrl and videoUrl properties to each exercise object
      exercises = exercises.map(exercise => ({
        ...exercise,
        imageUrl: `/media/${exercise.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        videoUrl: `/media/${exercise.name.toLowerCase().replace(/\s+/g, '-')}.mp4`
      }));

      // Setting response header to indicate JSON content
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ exercises });
    }
  });
}

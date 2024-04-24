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
      // Parse the JSON data
      const exercises = JSON.parse(data);

      // Update the image URLs to point to the local media directory
      exercises.forEach(exercise => {
        exercise.imageUrl = `/media/${exercise.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      });

      // Stringify the modified JSON data
      const updatedData = JSON.stringify(exercises);

      // Set the appropriate headers and send the updated JSON data
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end(updatedData);
    }
  });
}

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const jsonFilePath = path.join(process.cwd(), 'public', 'fitvision.json');

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading the json file' });
    } else {
      let exercises = JSON.parse(data).exercises;
      exercises = exercises.map(exercise => ({
        ...exercise,
        imageUrl: `/media/${exercise.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        videoUrl: `/media/${exercise.name.toLowerCase().replace(/\s+/g, '-')}.mp4`  // Assuming videos are stored similarly to images
      }));

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ exercises });
    }
  });
}

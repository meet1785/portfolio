import fs from 'fs'
import https from 'https'
const file = fs.createWriteStream("ferrari.glb");
https.get("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/ferrari.glb", function(response) {
  response.pipe(file);
});

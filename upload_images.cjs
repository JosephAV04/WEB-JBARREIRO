const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'didhygevw',
  api_key: '322895966366773',
  api_secret: 'GEwdDYK2nxVf_TpzcSgx3kWDvUY'
});

const folderPath = 'C:\\Users\\Josep\\Desktop\\FOTOS PARA LA WEB\\ARREGLADA'; 

async function uploadFiles() {
  const files = fs.readdirSync(folderPath);
  
  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const fileName = path.parse(file).name; // Toma el nombre sin extensión

    try {
      const result = await cloudinary.uploader.upload(fullPath, {
        public_id: fileName,
        folder: 'catalogo_productos',
        overwrite: true
      });
      console.log(`✅ Subido: ${fileName} -> ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Error en ${file}:`, err);
    }
  }
}

uploadFiles();
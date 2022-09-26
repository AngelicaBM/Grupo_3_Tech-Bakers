const multer = require('multer');
const path = require('path')

const multerMiddleware = (folder, entity) => {
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        const folderPath = path.join(__dirname,`../../public/images/${folder}`);
        cb(null, folderPath);
    },
    filename : function(req,file,cb){
        const fileName = `img${entity}_${Date.now()}hola${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

return multer({storage});

}

module.exports = multerMiddleware;
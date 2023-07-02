import multer from "multer";
const storage=multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image/')
    },
    filename: function (req, file, cb) {
      
      
      cb(null,file.originalname)
    }   
})
export default storage;
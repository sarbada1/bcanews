import multer from 'multer';

class uploadMiddleware{
  upload(destination){
    this.storage=multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, `public/${destination}`);
        },
        filename: function (req,file,cb){
            let filename = file.originalname.trim();
            let imageName= Date.now()+'-'+ Math.round(Math.random() * 1E9) + "-" + filename;
            cb(null, imageName)
        }
    });
    return multer ({storage:this.storage});
  }
}

export default uploadMiddleware

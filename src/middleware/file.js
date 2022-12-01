const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: '1buy1',
        allowedFormats: ["jpg", "png", "jpeg", "gif"]
    }
});

const upload = multer({ storage });

const deleteFile = (imgUrl) => {
    const imgSplited = imgUrl.split("/");
   
    const nameSplited = imgSplited[imgSplited.length - 1].split(".")[0];
   
    const folderSplited = imgSplited[imgSplited.length - 2];
   
    const public_id =`${folderSplited}/${nameSplited}`;

    cloudinary.uploader.destroy(public_id, () => {

        console.log("The file has been deleted");

    })

};

module.exports = {upload, deleteFile};
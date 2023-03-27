export default class UploadController{

    constructor () {}

    static async uncompressedImageUpload(req, res, next){
        
        return res.status(200).json({message: "api is not configred yet"});
    }
}
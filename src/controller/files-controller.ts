import multer from 'multer';
import UserService from "../service/user-service";
import { NextFunction, Request, Response } from "express";
import fs from 'fs';
import { IResetPassword, IUser, ResponseDTO, statusCode } from "../types";

const getMainDir = function () {
    let newpath = __dirname;
    if (process.env.NODE_ENV == "production") {
        newpath = newpath.replace("/src", "").replace("/dist", "").replace("/controller", "") + "/client/files/";
    }
    else {
        newpath = newpath.replace("\src", "").replace("\controller", "") + "client\\files\\";
    }
    return newpath;
}
export default class FileController {
    private _user: UserService;
    constructor() {
        this._user = new UserService();
        this.upload = this.upload.bind(this);
        this.load = this.load.bind(this);
        this.filesFolder = this.filesFolder.bind(this);
    }

    async filesFolder(req: Request<FileSystem>,
        res: Response<ResponseDTO<string>>,
        next: NextFunction): Promise<Response<ResponseDTO<string>> | void> {
        const responseDTO = new ResponseDTO<string>(
            statusCode.CREATED,
            true,
            getMainDir(),
            null
        );
        res.status(200).json(responseDTO);
    }
    async upload(
        req: Request<FileSystem>,
        res: Response<ResponseDTO<string>>,
        next: NextFunction
    ): Promise<Response<ResponseDTO<string>> | void> {
        try {
            if (req.files && Object.entries(req.files).length > 0) {
                const allowedExt = ["png", "jpg", "jpeg"]
                let errors = [];
                let messages = [];
                let validUplodateFiles = [];
                let file = Object.entries(req.files)[0][1];
                const filename = file.name || "";
                const ext = filename.split(".").pop().toLowerCase();
                let id = filename.replace(".png", "").replace(".jpg", "").replace(".jpeg", "");
                if (allowedExt.indexOf(ext) != -1 && file.size <= 1000000) {
                    let updated = this._user.updatePhoto(id, file.data);
                    const responseDTO = new ResponseDTO<string>(
                        statusCode.CREATED,
                        true,
                        "File uploaded successfully",
                        null
                    );
                    return res.status(statusCode.CREATED).json(responseDTO);
                }
                else {
                    const responseDTO = new ResponseDTO<string>(
                        statusCode.CREATED,
                        false,
                        "Invalid File",
                        null
                    );
                    return res.status(statusCode.CREATED).json(responseDTO);
                }
                // console.log(file.data);
                // // const file = Object.entries(req.files)[0][1];
                // // const filePath = file.path;

                // // console.log("+++++++++++++++++++++");
                // // const buffer = await new Promise<Buffer>((resolve, reject) => {
                // //     fs.readFile(file.path, (err, data) => {
                // //         if (err) {
                // //             console.log("===================");
                // //             console.log(err);
                // //             console.log("===================");
                // //             reject(err);
                // //         } else {
                // //             resolve(data);
                // //         }
                // //     });
                // // });


                // for (const fileKey of Object.entries(req.files)) {
                //     let file: any = fileKey[1];
                //     const filename = file.name || "";
                //     const ext = filename.split(".").pop().toLowerCase();
                //     if (allowedExt.indexOf(ext) != -1 && file.size <= 1000000) {
                //         try {
                //             console.log("+++++++++++++++++++++");
                //             const buffer = await new Promise<Buffer>((resolve, reject) => {
                //                 fs.readFile(file.path, (err, data) => {
                //                     if (err) {
                //                         reject(err);
                //                     } else {
                //                         resolve(data);
                //                     }
                //                 });
                //             });

                //             let id = filename.replace(".png", "").replace(".jpg", "").replace(".jpeg", "");
                //             console.log(id);
                //             let updated = this._user.updatePhoto(id, buffer);
                //             if (updated == null) {
                //                 errors.push({
                //                     filename: filename,
                //                     error: "Failed to upload"
                //                 });
                //             }
                //         }
                //         catch (err) {
                //             messages.push(filename + " upload is failed");
                //             errors.push({
                //                 filename: filename,
                //                 error: err
                //             });
                //         }
                //     }
                //     else {
                //         messages.push(filename + " is not valid file");
                //         errors.push({
                //             filename: filename,
                //             error: filename + " is not valid file"
                //         });
                //     }
                // }
                // if (errors.length == 0) {
                //     const responseDTO = new ResponseDTO<string>(
                //         statusCode.CREATED,
                //         true,
                //         "File uploaded successfully",
                //         null
                //     );
                //     return res.status(statusCode.CREATED).json(responseDTO);
                // }
                // else {
                //     const responseDTO = new ResponseDTO<string>(
                //         statusCode.CREATED,
                //         true,
                //         messages.join(", "),
                //         null
                //     );
                //     return res.status(statusCode.CREATED).json(responseDTO);
                // }
            }
            else {
                const responseDTO = new ResponseDTO<string>(
                    statusCode.CREATED,
                    true,
                    "No files found",
                    null
                );
                return res.status(statusCode.CREATED).json(responseDTO);
            }
        } catch (error) {
            return next(error);
        }
    }
    async load(
        req: Request,
        res: Response<any>,
        next: NextFunction
    ): Promise<Response<any> | void> {
        try {
            const { filename } = req.query;
            const userData: IUser = await this._user.getById(filename as string);
            if (userData == null || userData.photo == null) {
                return res.sendFile(getMainDir() + "404.png");
            }
            else{
                res.set('Content-Type', 'application/octet-stream');
                res.set('Content-Disposition', `attachment; filename=profilephoto.png`);
                return res.send(userData.photo);
            }            
        } catch (error) {
            return next(error);
        }
    }
}

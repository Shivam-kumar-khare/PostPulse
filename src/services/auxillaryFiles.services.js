import { Databases, Client,  ID, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";


export class FileServices {
    client = new Client();
    
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID)

        this.bucket = new Storage(this.client);
     
    }


    //files services
    async uploadFile(file) {
        try {
            const files = await this.bucket.createFile(
                conf.BUCKET_ID,
                ID.unique(),
                file
            )

            return files;

        } catch (error) {
            console.log("upload file failed :: ", error)
        }
    }
    async deleteFile(fileId) {
        try {
            const deletedFile = await this.bucket.deleteFile(
                conf.BUCKET_ID,
                fileId
            )
            return {
                status:true,
                deletedFile
            };

        } catch (error) {
            console.log("upload file failed :: ", error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.BUCKET_ID,fileId);

    }
}

const fileServices=new FileServices();
export default fileServices;
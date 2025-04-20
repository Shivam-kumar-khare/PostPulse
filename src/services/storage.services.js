import { Databases, Client,  ID, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";


export class DataBasesServices {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID)

        this.bucket = new Storage(this.client);
        this.database = new Databases(this.client);
    }



    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                },

            )

        } catch (error) {
            throw Error("create post failed::", error);

        }
    }



    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            throw Error("update post failed::", error);

        }
    }



    async deletePost(slug) {
        try {
            const deletedPost = await this.database.deleteDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug
            )
            //return the deleted document

            return {
                status: 200,
                deletedPost: { ...deletedPost }
            }
        } catch (error) {
            throw Error("delete post failed::", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug
            )

        } catch (error) {
            throw Error("get post failed::", error);
        }
        return false;

    }
    async getALLPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                queries,
            )

        } catch (error) {
            throw Error("List document failed::", error);
            return false;
        }
        

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

const datbaseServices=new DataBasesServices();
export default datbaseServices;
import React, { useCallback, useEffect } from 'react';
import { CustomBtn, Input, Select, RTE } from "../index.js";
import dbServices from '../../services/storage.services.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


function Postform({ post }) {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || 'active'
        },
    })

    const userData = useSelector(state => state.auth.userData);
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await dbServices.uploadFile(data.image[0]) : null;
            if (file) {
                await dbServices.deleteFile(post.featuredImage);
            }
            const dbPost = await dbServices.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        // } else {
        //     const file = data.image[0] ? await dbServices.uploadFile(data.image[0]) : null;
        //     if (file) {
        //         await dbServices.createPost({
        //             ...data,
        //             userId:userData.$id,
        //             featuredImage:file.$id
        //         })
        //     }
        // }
        else {
            const file = data.image[0] ? await dbServices.uploadFile(data.image[0]) : null;
            if (file) {
                const fileid = file.$id;
                data.featuredImage = fileid
                // console.log("data\n",data,"\nuser data=",userData)
                const dbpost = await dbServices.createPost({
                    ...data,
                    userId: userData.$id,

                })
             
                if (dbpost) {
                     console.log("\n\n\n\n\n\n\npost created successfully \npost=\t",post);
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);




    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap' >
            {/*LEFT PORTION*/}
            <div className='w-full m-3 flex flex-wrap justify-center'>
            <div className='order-1  w-full sm:w-2/3 px-2'>
                <Input
                    label="Title:  "
                    placeholder="Title"
                    className='mb-4'
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:  "
                    placeholder="Enter Slug"
                    className='mb-4'
                    {...register("slug", { required: true })}
                    onInput={
                        (e) => {
                            setValue(
                                "slug",
                                slugTransform(e.currentTarget.value),
                                { shouldValidate: true }
                            )
                        }
                    }
                />
                <RTE
                    label="Content"
                    control={control}
                    name="content"
                    defaultValue={getValues("content")}
                />

            </div>
            {/*RIGHT PORTION*/}
            <div className='order-2 w-full sm:w-1/3 px-2 '>
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dbServices.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <CustomBtn
                    type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </CustomBtn>
            </div>
            </div>
        </form>
    )
}

export default Postform
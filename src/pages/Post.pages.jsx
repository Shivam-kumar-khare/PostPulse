import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbServices from "../services/storage.services";
import { CustomBtn, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    console.log("slug found ?in post.pages.jsx==", slug)
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log("isAuthur==", isAuthor);

    useEffect(() => {
        if (slug) {
            dbServices.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {

        dbServices.deletePost(post.$id).then((status) => {
            if (status) {
                dbServices.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbServices.getFileView(post.featuredImage)}
                        alt={post.title.trim()}
                        className="rounded-xl h-48 w-full object-contain"
                    />

                    {isAuthor && (
                        <div className="absolute right-3 bottom-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <CustomBtn bgColor="bg-green-500" className="mr-1 ">
                                    <span className="hidden sm:inline">Edit</span>
                                    <span className="inline sm:hidden">✎</span>
                                </CustomBtn>
                            </Link>
                            <CustomBtn bgColor="bg-red-500" onClick={deletePost}>
                                <span className="hidden sm:inline">Delete</span>
                                <span className="inline sm:hidden">🗑</span>
                            </CustomBtn>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
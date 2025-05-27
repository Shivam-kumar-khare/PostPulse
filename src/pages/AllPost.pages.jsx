import React, { useEffect, useState } from 'react';
import dbServices from '../services/storage.services.js';
import { Container, PostCard } from '../components/index.js';

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const post = await dbServices.getALLPosts([]);
                if (post) setPosts(post.documents);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className='py-8 w-full '>
            <Container className='w-1/4 flex  flex-wrap justify-center'>
                {loading ? (
                    <p className='text-7xl  text-green-800 text-center'>Loading posts...</p>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4 min-w-[250px]'>
                            <PostCard {...post} />
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </Container>
        </div>
    );
}

export default AllPost;

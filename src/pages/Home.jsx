import React, { useState, useEffect } from 'react';
import dbServices from '../services/storage.services';
import { Container, PostCard } from '../components/index.js';
import { useSelector } from 'react-redux';

function Home({isAuthenticatedUser}) {
    const [posts, setPosts] = useState([]);
    const LoggedIn = !!isAuthenticatedUser
    const [loading, setLoading] = useState(LoggedIn);

    useEffect(() => {
        if (!LoggedIn) return;
        
        dbServices.getALLPosts()
            .then((posts) => {
                if (posts) setPosts(posts.documents);
            })
            .catch((err) => {
                console.error("Failed to load posts:", err);
            })
            .finally(() => setLoading(false));
    }, [LoggedIn]);

    if (LoggedIn && loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-4xl font-bold text-green-700"> Fetching Posts...</h1>
                </Container>
            </div>
        );
    }
    if(!LoggedIn) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-3xl font-semibold text-gray-500">Login to read Post...</h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0 && !loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-3xl font-semibold text-gray-500">No Blog Found...</h1>
                </Container>
            </div>
        );
    }

    


    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap justify-center">
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4 min-w-[200px]'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}



export default Home;

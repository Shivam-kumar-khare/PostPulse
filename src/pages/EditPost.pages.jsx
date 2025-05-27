import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dbServices from '../services/storage.services';
import { Container, Postform } from '../components/index.js';

function EditPost() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            dbServices.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return (
        <div className="py-8">
            <Container>
                {post ? <Postform post={post} /> : <p>No Post To Edit</p>}
            </Container>
        </div>
    );
}

export default EditPost;

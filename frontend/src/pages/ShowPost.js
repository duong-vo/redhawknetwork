import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/post/Post';
import CommentSection from '../components/post/CommentSection';

const ShowPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null); 


  useEffect(() => {
    axios({
      url: 'http://localhost:8000/api/posts/' + id,
      method: 'GET',
    }).then((response) => {
      console.log(response);
      setPost(response.data);
    });
  }, []);

  return (
    <>
      {post && (
        <>
          <Post post={post} />
          <CommentSection post={post}/>
        </>
      )}
    </>
  );
}

export default ShowPost;

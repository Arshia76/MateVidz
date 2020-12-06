import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const searchPosts = useSelector((state) => state.search.posts);

  return (
    <Container className='p-4'>
      <Row>
        {searchPosts
          ? searchPosts.map((post) => <Post key={post._id} post={post} />)
          : posts.map((post) => <Post key={post._id} post={post} />)}
      </Row>
    </Container>
  );
};

export default Posts;

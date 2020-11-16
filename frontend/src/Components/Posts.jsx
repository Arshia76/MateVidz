import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <Container>
      <Row>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Row>
    </Container>
  );
};

export default Posts;

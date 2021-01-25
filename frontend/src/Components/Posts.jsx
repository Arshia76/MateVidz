import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <Container className='py-3' fluid>
      <Row className='text-center'>
        {posts !== null ? (
          posts.length === 0 ? (
            <div className='w-100 text-center'>
              <h1>پستی وجود ندارد</h1>
            </div>
          ) : (
            posts.map((post) => <Post key={post._id} post={post} />)
          )
        ) : (
          <div className='w-100 text-center'>
            <h1>پستی وجود ندارد</h1>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Posts;

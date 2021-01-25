import React from 'react';
import { Container, Row } from 'react-bootstrap';

import UserPost from './UserPost';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = ({ title }) => {
  const posts = useSelector((state) => state.posts.userPosts);
  const favorites = useSelector((state) => state.users.user.favorites);

  return (
    <Container className='pb-4' fluid>
      <hr className='bg-secondary' />
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>{title}</h1>
      <Row>
        {title === 'پست های من' ? (
          posts.length === 0 ? (
            <div className='w-100 text-center'>
              <h1>پستی وجود ندارد</h1>
            </div>
          ) : (
            posts.map((post) => <Post key={post._id} post={post} />)
          )
        ) : favorites.length === 0 ? (
          <div className='w-100 text-center'>
            <h1>پستی وجود ندارد</h1>
          </div>
        ) : (
          favorites.map((post) => <UserPost key={post._id} post={post} />)
        )}
      </Row>
    </Container>
  );
};

export default Posts;

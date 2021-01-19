import React, { useState, Fragment } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updatePost, createPost } from '../Actions/Posts';
import { useDispatch, useSelector } from 'react-redux';

const Changer = ({ post, show, handleClose, type }) => {
  const owner = useSelector((state) => state.auth.creator);
  const username = useSelector((state) => state.auth.user);
  const userimage = useSelector((state) => state.auth.image);

  const [state, setState] = useState({
    title: type === 'بروز رسانی' ? post.title : '',
    message: type === 'بروز رسانی' ? post.message : '',
    postImage: type === 'بروز رسانی' ? post.image : '',
    creator: owner,
    user: type !== 'بروز رسانی' && {
      username: type !== 'بروز رسانی' && username,
      userimage: type !== 'بروز رسانی' && userimage,
    },
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('postImage', state.postImage);
    form.append('title', state.title);
    form.append('message', state.message);
    form.append('creator', state.creator);
    form.append('user', state.user);

    type === 'بروز رسانی'
      ? dispatch(updatePost(post._id, form))
      : dispatch(createPost(form));

    setState({ ...state, title: '', message: '', postImage: '' });
    handleClose();
  };
  return (
    <Fragment>
      <Modal style={{ direction: 'rtl' }} show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType='multipart/form-data'>
            <Form.Group className='text-right' controlId='formBasicEmail'>
              <Form.Label>عنوان</Form.Label>
              <Form.Control
                name='title'
                onChange={onChange}
                type='text'
                value={state.title}
                placeholder='عنوان پست را وارد کنید'
              />
            </Form.Group>

            <Form.Group className='text-right' controlId='formBasicPassword'>
              <Form.Label>متن </Form.Label>
              <Form.Control
                name='message'
                onChange={onChange}
                type='text'
                value={state.message}
                placeholder='پیام پست را وارد کنید'
              />
            </Form.Group>
            <Form.Group className='text-right' controlId='formBasicPassword'>
              <Form.Label>عکس </Form.Label>
              <Form.Control
                onChange={(e) =>
                  setState({ ...state, postImage: e.target.files[0] })
                }
                type='file'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            خروج
          </Button>
          <Button variant='primary' type='submit' onClick={submit}>
            ذخیره
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Changer;

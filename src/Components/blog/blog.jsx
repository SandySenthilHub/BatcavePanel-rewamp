import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import './blog.css';
import { BASE_URL } from '../../utils/ApplicationURL';

function BlogForm() {

  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const contentEditableRef = useRef(null);

  // Function to handle image upload
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      // const response = await axios.post('http://localhost:5000/upload', formData, {
      const response = await axios.post(`${BASE_URL}/upload`, formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading the image', error);
      setError('Error uploading the image');
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
      imageUrl,
      description,
      keywords,
    };

    console.log('Submitting blog:', newBlog);

    try {
      // const response = await axios.post('http://localhost:5000/blogs', newBlog);
      const response = await axios.post(`${BASE_URL}/blogs`, newBlog);

      setBlogs([...blogs, response.data]);
      setTitle('');
      setContent('');
      setImageUrl('');
      setKeywords('');
      setDescription('');
      setImage(null);
      setError('');
    } catch (error) {
      console.error('Error creating the blog', error);
      setError('Error creating the blog');
    }
  };

  // Function to handle file change (image selection)
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const navigateEditBlog = () =>{
    navigate('/edit-blog')
  }



  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'header': '4' }, { 'header': '5' }, { 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];
    
  return (
    <div className="Blog">
      <form onSubmit={handleSubmit}>
        <div style={{ alignSelf: 'flex-end' }}>
          <button type="submit">Create Blog</button>
          <button style={{marginLeft:"20px"}} onClick={navigateEditBlog}>View Blogs</button>
        </div>

        <input className='title' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
        <div className='imgUpload'>
          <input type="file" onChange={handleImageChange} />
          <button className="uploadImg" type="button" onClick={handleImageUpload}>Upload Image</button><br />
        </div>
        {/* {imageUrl && <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />} */}
        {imageUrl && <img src={`${BASE_URL}${imageUrl}`} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        <input className='description' type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />
        <input className='keywords' type="text" placeholder="Keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} required /><br />
        {/* <textarea className='content' type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required style={{ height: '2000px' }} /><br /> */}
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          modules={modules}
          formats={formats}
          style={{ height: '400px' }} 
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

     </div>
  );
}

export default BlogForm;

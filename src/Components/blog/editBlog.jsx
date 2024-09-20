import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './blog.css';
import { BASE_URL } from '../../utils/ApplicationURL';

function EditBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/blogs/${blogId}`);
        const response = await axios.get(`${BASE_URL}/blogs/${blogId}`);

        const blog = response.data;
        setTitle(blog.title);
        setContent(blog.content);
        setImageUrl(blog.imageUrl);
        setKeywords(blog.keywords);
        setDescription(blog.description);
      } catch (error) {
        console.error('Error fetching blog', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlog = {
      title,
      content,
      imageUrl,
      description,
      keywords,
    };

    try {
      // await axios.put(`http://localhost:5000/blogs/${blogId}`, updatedBlog);
      await axios.put(`${BASE_URL}/blogs/${blogId}`, updatedBlog);

      navigate(`/blogs/${blogId}`);
    } catch (error) {
      console.error('Error updating the blog', error);
      setError('Error updating the blog');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'header': '4' },{ 'header': '5' }, { 'font': [] }],
      [{ size: [] }],
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
        <input className='title' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
        <input className='description' type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />
        <input className='keywords' type="text" placeholder="Keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} required /><br />
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          modules={modules}
          formats={formats}
          style={{ height: '400px' }} // Adjust the height as needed
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;

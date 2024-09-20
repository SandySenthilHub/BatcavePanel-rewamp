import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Icon from './Icon wrap.svg';
import AL from './arrow-left.svg';
import AR from './arrow-right.svg';
import './blog.css';
import { BASE_URL } from "../../utils/ApplicationURL";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(6);
    const pageLimit = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // const response = await axios.get('http://localhost:5000/blogs');
                const response = await axios.get(`${BASE_URL}/blogs`);

                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs', error);
            }
        };
        fetchBlogs();
    }, []);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1).filter(page => page <= totalPages);
    };

    const handleDelete = async (id) => {
        try {
            // await axios.delete(`http://localhost:5000/blogs/${id}`);
            await axios.delete(`${BASE_URL}/blogs/${id}`);

            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="adminBlog">
            <h3 className="blogHeading">Our Blogs</h3>

            <div className="Blogs">
                {currentBlogs.map((blog) => (
                    <div className="blogContainer" key={blog._id}>
                        <Link to={`/blogs/${blog._id}`} className="blogLink">
                            {/* {blog.imageUrl && <img src={`http://localhost:5000${blog.imageUrl}`} alt="Batcave car club" />} */}
                            {blog.imageUrl && <img src={`${BASE_URL}${blog.imageUrl.startsWith('/') ? '' : '/'}${blog.imageUrl}`} alt="Batcave car club" />}

                            <h6 className="blogdate">{new Date(blog.createdAt).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h6>
                            <div className="titlehead">
                                <h1 className="title">{blog.title}</h1>
                            </div>
                        </Link>
                        <div className="blogActions">
                            {/* <button onClick={() => handleEdit(blog._id)}>Edit</button> */}
                            <button  className="blogDeleteBtn" onClick={() => handleDelete(blog._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="Blogline" />

            <div className="pagination" style={{ paddingBottom: "20px" }}>
                <div className={`pageControl ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => currentPage > 1 && paginate(currentPage - 1)}>
                    <img className="al" src={AL} alt="Car club Tamil Nadu" />
                    <div>Previous</div>
                </div>
                <div>
                    {getPaginationGroup().map(number => (
                        <div key={number} onClick={() => paginate(number)} className={`pageNumber ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </div>
                    ))}
                </div>
                <div className={`pageControl ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => currentPage < totalPages && paginate(currentPage + 1)}>
                    <div>Next</div>
                    <img className="al" src={AR} alt="Car shows" />
                </div>
            </div>
        </div>
    );
}

export default Blog;

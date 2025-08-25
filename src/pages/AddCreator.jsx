import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = ({ refreshCreators }) => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createCreator = async (event) => {
    event.preventDefault();
    
    if (!creator.name || !creator.url || !creator.description) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('creators')
        .insert({
          name: creator.name.trim(),
          url: creator.url.trim(),
          description: creator.description.trim(),
          imageURL: creator.imageURL.trim() || null
        })
        .select();

      if (error) {
        console.error('Error adding creator:', error);
        alert('Error adding creator. Please try again.');
      } else {
        console.log('Creator added:', data);
        alert('Creator added successfully!');
        // Refresh the creators list
        if (refreshCreators) {
          await refreshCreators();
        }
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding creator. Please try again.');
    }
  };

  return (
    <div className="add-creator">
      <div className="navigation">
        <Link to="/" className="btn btn-back">← Back to All Creators</Link>
      </div>

      <div className="form-container">
        <h1>Add New Creator</h1>
        
        <form onSubmit={createCreator} className="creator-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter creator's name"
              value={creator.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Channel/Page URL *</label>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://..."
              value={creator.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Describe what makes this creator special..."
              value={creator.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageURL">Image URL (optional)</label>
            <input
              id="imageURL"
              name="imageURL"
              type="url"
              placeholder="https://... (link to creator's image)"
              value={creator.imageURL}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Creator
            </button>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreator;
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = ({ refreshCreators }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching creator:', error);
        } else if (data) {
          setCreator({
            name: data.name || '',
            url: data.url || '',
            description: data.description || '',
            imageURL: data.imageURL || ''
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateCreator = async (event) => {
    event.preventDefault();
    
    if (!creator.name || !creator.url || !creator.description) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      const { error } = await supabase
        .from('creators')
        .update({
          name: creator.name.trim(),
          url: creator.url.trim(),
          description: creator.description.trim(),
          imageURL: creator.imageURL.trim() || null
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating creator:', error);
        alert('Error updating creator. Please try again.');
      } else {
        alert('Creator updated successfully!');
        // Refresh the creators list
        if (refreshCreators) {
          await refreshCreators();
        }
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating creator. Please try again.');
    }
  };

  const deleteCreator = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${creator.name}? This action cannot be undone.`
    );
    
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting creator:', error);
          alert('Error deleting creator. Please try again.');
        } else {
          alert('Creator deleted successfully!');
          // Refresh the creators list
          if (refreshCreators) {
            await refreshCreators();
          }
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting creator. Please try again.');
      }
    }
  };

  return (
    <div className="edit-creator">
      <div className="navigation">
        <Link to="/" className="btn btn-back">← Back to All Creators</Link>
      </div>

      <div className="form-container">
        <h1>Edit Creator</h1>
        
        <form onSubmit={updateCreator} className="creator-form">
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
              Update Creator
            </button>
            <button 
              type="button" 
              onClick={deleteCreator} 
              className="btn btn-danger"
            >
              Delete Creator
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

export default EditCreator;
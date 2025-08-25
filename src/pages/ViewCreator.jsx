import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState({});

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      
      setCreator(data);
    };

    fetchCreator();
  }, [id]);

  return (
    <div className="view-creator">
      <div className="navigation">
        <Link to="/" className="btn btn-back">← Back to All Creators</Link>
      </div>

      {creator && (
        <div className="creator-details">
          {creator.imageURL && (
            <div className="creator-image-container">
              <img 
                src={creator.imageURL} 
                alt={`${creator.name} profile`}
                className="creator-image-large"
                onError={(e) => {e.target.style.display = 'none'}}
              />
            </div>
          )}
          
          <div className="creator-info">
            <h1>{creator.name}</h1>
            <p className="creator-description-large">{creator.description}</p>
            
            <div className="creator-actions">
              <a 
                href={creator.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-visit"
              >
                Visit Channel
              </a>
              <Link to={`/edit/${creator.id}`} className="btn btn-edit">
                Edit Creator
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCreator;
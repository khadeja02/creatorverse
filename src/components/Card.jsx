import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <div className="card">
      {props.imageURL && (
        <img 
          className="card-image" 
          src={props.imageURL} 
          alt={`${props.name} profile`}
          onError={(e) => {e.target.style.display = 'none'}}
        />
      )}
      
      <div className="card-content">
        <h3 className="card-title">{props.name}</h3>
        <p className="card-description">{props.description}</p>
        
        <div className="card-links">
          <a 
            href={props.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="visit-link"
          >
            Visit Channel
          </a>
        </div>

        <div className="card-actions">
          <Link to={`/view/${props.id}`} className="btn btn-info">
            View Details
          </Link>
          <Link to={`/edit/${props.id}`} className="btn btn-edit">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
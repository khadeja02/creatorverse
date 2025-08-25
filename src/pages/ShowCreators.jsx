import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const ShowCreators = ({ creators, refreshCreators }) => {
  return (
    <div className="show-creators">
      <div className="header">
        <h1>✨ Creatorverse</h1>
        <p>Discover amazing content creators!</p>
        <Link to="/add" className="btn btn-primary">
          Add Creator
        </Link>
      </div>

      {creators && creators.length > 0 ? (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
              refreshCreators={refreshCreators}
            />
          ))}
        </div>
      ) : (
        <div className="no-creators">
          <h2>No creators yet!</h2>
          <p>Be the first to add a creator to the Creatorverse.</p>
          <Link to="/add" className="btn btn-primary">
            Add Your First Creator
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
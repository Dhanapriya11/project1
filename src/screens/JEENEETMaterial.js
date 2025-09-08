import React from 'react';
import './JEENEETMaterial.css';

const mockMaterials = [
  {
    id: 1,
    title: 'Physics - Kinematics Notes',
    type: 'PDF',
    description: 'Comprehensive notes on 1D and 2D kinematics.',
    url: '#'
  },
  {
    id: 2,
    title: 'Chemistry - Organic Chemistry Basics',
    type: 'Video',
    description: 'A video lecture covering the fundamentals of organic chemistry.',
    url: '#'
  },
  {
    id: 3,
    title: 'Mathematics - Calculus Practice Problems',
    type: 'PDF',
    description: 'A set of practice problems for differential and integral calculus.',
    url: '#'
  },
  {
    id: 4,
    title: 'Biology - Human Physiology',
    type: 'PDF',
    description: 'Detailed notes on the human circulatory and respiratory systems.',
    url: '#'
  },
  {
    id: 5,
    title: 'Physics - Electromagnetism Explained',
    type: 'Video',
    description: 'Visual explanation of Maxwell\'s equations and their applications.',
    url: '#'
  }
];

const JEENEETMaterial = () => {
  return (
    <div className="jee-neet-container">
      <h1 className="jee-neet-header">JEE/NEET Study Material</h1>
      <div className="materials-grid">
        {mockMaterials.map(material => (
          <div key={material.id} className="material-card">
            <div className={`material-icon ${material.type.toLowerCase()}`}>
              {material.type === 'PDF' ? '📄' : '▶️'}
            </div>
            <h2 className="material-title">{material.title}</h2>
            <p className="material-description">{material.description}</p>
            <a href={material.url} className="material-link" target="_blank" rel="noopener noreferrer">
              View Material
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JEENEETMaterial;

import React, { useState } from 'react';
import './ContentLibrary.css';

const mockContent = [
  { id: 1, title: 'Introduction to Algebra', type: 'video', subject: 'Math', description: 'A 15-minute video covering the basics of algebraic expressions.' },
  { id: 2, title: 'The Cell Structure', type: 'notes', subject: 'Biology', description: 'Downloadable PDF notes on prokaryotic and eukaryotic cells.' },
  { id: 3, title: 'History of Ancient Rome', type: 'quiz', subject: 'History', description: 'An interactive quiz with 20 questions on the Roman Empire.' },
  { id: 4, title: 'Newton\'s Laws of Motion', type: 'video', subject: 'Physics', description: 'Explainer video with real-world examples of Newton\'s laws.' },
  { id: 5, title: 'Chemical Bonding', type: 'notes', subject: 'Chemistry', description: 'In-depth notes on ionic, covalent, and metallic bonds.' },
  { id: 6, title: 'World War II Key Events', type: 'quiz', subject: 'History', description: 'Test your knowledge on the major events of WWII.' },
];

const ContentLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredContent = activeTab === 'all'
    ? mockContent
    : mockContent.filter(item => item.type === activeTab);

  return (
    <div className="content-library-container">
      <h1 className="library-header">Content Library</h1>
      
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          Videos
        </button>
        <button 
          className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
        <button 
          className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quizzes
        </button>
      </div>

      <div className="content-grid">
        {filteredContent.map(item => (
          <div key={item.id} className="content-card">
            <h2 className="content-title">{item.title}</h2>
            <p className="content-description">{item.description}</p>
            <div className="content-footer">
              <span className="content-subject">{item.subject}</span>
              <span className="content-type">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentLibrary;

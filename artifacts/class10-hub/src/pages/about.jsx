import React from 'react';

export default function About() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ color: '#2563eb', fontSize: '2rem' }}>About Class 10 Hub</h1>
      
      <p style={{ fontSize: '1.1rem' }}>
        Hi! I am <strong>Priyanshu Taraori</strong>, the creator of Class 10 Hub. 
        I am a student from Taraori, Haryana, and I built this platform to help my fellow 
        <strong> CBSE Class 10</strong> students get the best study resources for free.
      </p>

      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#eff6ff', borderRadius: '15px', border: '1px solid #dbeafe' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1d4ed8' }}>Our Mission 🎯</h3>
          <p>To provide 100% free <strong>Class 10 CBSE Important Questions</strong> and Handwritten Notes to every student.</p>
        </div>
      </div>

      <button 
        onClick={() => window.location.href='/recommended-books'}
        style={{ 
          marginTop: '30px', 
          backgroundColor: '#f97316', 
          color: 'white', 
          padding: '12px 25px', 
          border: 'none', 
          borderRadius: '25px', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}
      >
        Check My Recommended Books 📚
      </button>
    </div>
  );
}

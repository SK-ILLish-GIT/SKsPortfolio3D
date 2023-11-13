import React, { useState } from 'react';

function ActionButton({ top, left, onClick, label }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: top,
        left: left,
        background: 'rgba(220, 220, 220, 0.6)',
        color: 'black',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        width: '100px',
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)',
      }}
      onClick={loading ? null : handleClick}
      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
    >
      {loading ? 'Loading...' : label}
    </div>
  );
}

export default ActionButton;

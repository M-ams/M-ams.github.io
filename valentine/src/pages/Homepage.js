function HomePage() {
  return (
    <div style={{
      backgroundColor: '#FFD6E8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '40px'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '48px',
        textAlign: 'center',
        margin: '0'
      }}>
        Veux-tu être ma Valentine ?
      </h1>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <button style={{
          padding: '15px 50px',
          fontSize: '24px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'
        }}>
          OUI
        </button>
        
        <button style={{
          padding: '15px 50px',
          fontSize: '24px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'
        }}>
          NON
        </button>
      </div>
    </div>
  );
}

export default HomePage;
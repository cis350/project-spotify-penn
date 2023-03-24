/* eslint-disable react/button-has-type */
import { AppBar } from '@mui/material';
import React from 'react';

const styles = {
  buttonStyle: {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '16px',
    position: 'relative',
  },
  buttonGroupStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default function NavBar() {
  return (
    <AppBar position="static" style={{ background: '#000000' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '40px' }} />
          <div style={styles.buttonGroupStyle}>
            <button className="pageOptions" style={styles.buttonStyle}> Leaderboard</button>
            <div style={{ width: '40px' }} />
            <button className="pageOptions" style={styles.buttonStyle}> PennMix</button>
            <div style={{ width: '40px' }} />
            <button className="pageOptions" style={styles.buttonStyle}> Community</button>
            <div style={{ width: '40px' }} />
            <button className="pageOptions" style={styles.buttonStyle}> Chat</button>
            <div style={{ width: '40px' }} />
            <button className="pageOptions" style={styles.buttonStyle}> Vibe</button>
            <div style={{ width: '40px' }} />
            <button className="pageOptions" style={styles.buttonStyle}> New Artists</button>
            <div style={{ width: '40px' }} />
            <button
              className="pageOptions"
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '10px 20px',
                border: '2px solid white',
                borderRadius: '50px',
                fontSize: '16px',
                position: 'relative',
              }}
            >
              {' '}
              Log out

            </button>
          </div>
          <div style={{ height: '30px' }} />
        </div>
      </div>
    </AppBar>
  );
}

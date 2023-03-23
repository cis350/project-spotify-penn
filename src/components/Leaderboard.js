import { useState } from 'react';
import { Container, Divider, Select, FormControl, MenuItem, FormHelperText} from '@mui/material'; //Link

import LazyTable from '../components/LazyTable';
//const timeframe = useRef('');

export default function HomePage() {
  const [content, setContent] = useState('Song');
  const songColumns = [
    {
      field: 'rank',
      headerName: 'Rank',
    },
    {
      field: 'title',
      headerName: 'Title',
    },
    {
      field: 'album',
      headerName: 'Album',
    },
    {
      field: 'jammies',
      headerName: 'Number of Penn Jammers'
    },
    {
      field: 'likes',
      headerName: 'Like'
    }

  ];

  const artistColumns = [
    {
      field: 'rank',
      headerName: 'Rank',
    },
    {
      field: 'artist',
      headerName: 'Artist',
    },
    {
      field: 'genre',
      headerName: 'Genre',
    },
    {
      field: 'jammies',
      headerName: 'Number of Penn Jammers'
    },
  ];

  const styles = {
    selector: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    }
  }
  function handleChange() {

  }

  function setContent1() {
    setContent('Song');
  }

  function setContent2() {
    setContent('Artist');
  }

  const buttons = {
    backgroundColor: 'grey',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '16px',
    left: '100px',
    
  };
  let comp;
  if (content === 'Song') {
    comp = <LazyTable route={`http://localhost:8000/songs`} columns = {songColumns}/>;
  } else {
    comp = <LazyTable route={`http://localhost:8000/artists`} columns = {artistColumns}/>
  }

  return (
    <Container style={{backgroundColor: 'black'}} >
      <h2 style={{color: 'white', fontSize: '50px'}}>Penn Relays, Music Edition
      </h2>
      <div style = {styles.selector}>
        <div style ={{display:'flex', flexDirection: 'column'}}>
          <div style = {{height: 40}}></div>
          <div style = {styles.selector}> 
            <button className="lbOptions" style={buttons} onClick={setContent1}> Song Leaderboard</button>
            <div style = {{width: 150}}></div>
            <button className="lbOptions" style={buttons} onClick={setContent2}> Artist Leaderboard</button>
          </div>
          <div style = {{height: 40}}></div>
        </div>
        <FormControl className = "lbOptions" sx={{ m: 1, minWidth: 300, borderRadius: 2, p: 2}}>
          <FormHelperText sx={{color: 'white'}}>Select timeframe</FormHelperText>
          <Select sx={{backgroundColor: 'white', color: 'gray'}}
            defaultValue='7 days'
            label="Timeframe"
            onChange={handleChange}
          >
            <MenuItem value={7}>7 days</MenuItem>
            <MenuItem value={14}>14 days</MenuItem>
            <MenuItem value={30}>30 days</MenuItem>
            <MenuItem value={180}>6 months</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Divider />
      {comp}
      <Divider />
      <p> Created by Spotify@Penn </p>
    </Container>
  );
};
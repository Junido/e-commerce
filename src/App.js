import './App.css';
import Navbar from './component/Navbar';
import Char from './component/Char';
import {Container, Box, Grid } from '@mui/material';

function App() {

  const style = {
    boxShadow: 0,
    border: '1px solid rgba(153,153,153,0.2)', 
    borderRadius:'6px',
    backgroundColor:'rgb(255 255 255)', 
    padding:'15px'
  }

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={style}>
          <Char />
        </Box>
      </Container>
    </div>
  );
}

export default App;

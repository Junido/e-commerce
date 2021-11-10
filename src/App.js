import './App.css';
import Navbar from './component/Navbar';
import Char from './component/Char';
import {Container, Box } from '@mui/material';
import { border } from '@mui/system';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ boxShadow: 0,border: '1px solid rgba(153,153,153,0.2)', borderRadius:'6px',backgroundColor:'rgb(255 255 255)', padding:'20px' }}>
          <Char />
        </Box>
      </Container>
    </div>
  );
}

export default App;

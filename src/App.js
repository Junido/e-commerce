import './App.css';
import Navbar from './component/Navbar';
import Char from './component/Char';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="bandeau"></div>
      <div style={{backgroundColor:'#fff',width:'700px'}}>
      {/* <iframe src="https://open.spotify.com/embed/playlist/0u8dARhWkHIg2XVpdrNxIx" width="100%" height="380" 
      frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
      </iframe> */}
        <Char />
      </div>
    </div>
  );
}

export default App;

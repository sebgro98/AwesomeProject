import Nice from './Nice.jpg'
import './App.css';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={Nice} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              title="Very cool, very good" // This is the hover description
          >
            Learn React
          </a>
        </header>
      </div>
  );
}


export default App;

import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Dropdown from './Dropdown';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Dropdown name='From'/>

        <Dropdown name='To'/>

      </header>
    </div>
  );
}

export default App;

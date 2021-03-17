import logo from './logo.svg';
import './App.css';
import Header from './Header';
import DropdownComponent from './Dropdown';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <DropdownComponent name='From'/>

        <DropdownComponent name='To'/>



      </header>
    </div>
  );
}

export default App;

import './App.css';
import HeaderComponent from './components/HeaderComponent';
import DropdownComponent from './components/Dropdown';
import { Grid } from 'semantic-ui-react'


function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <div>
        <Grid columns='equal' padded divided stretched>
          <Grid.Row>
            <Grid.Column>
              <DropdownComponent name='From'/>
            </Grid.Column>
            <Grid.Column>
              <DropdownComponent name='To'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>        
      </div>

    </div>
  );
}

export default App;

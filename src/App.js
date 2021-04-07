import React, { createRef, useState } from 'react'
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import DropdownComponent from './components/DropdownComponent';
import FileUploadComponent from './components/FileUploadComponent';
import { Form, Button, Ref } from 'semantic-ui-react';


function App() {
  const [newInfo, setNewInfo] = useState({
    images: []
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const updateUploadFiles = (files) => {
    setNewInfo({...newInfo, images: files});
  };
  // const componentDidMount = () => {
  //   const node = this.wrapper.current;
  //   /* Uses DOM node  */ 
  //  }
  const wrapperFrom = createRef();
  const wrapperTo = createRef();
  const wrapperFile = createRef();
  // const wrapperTranslation = createRef();
  return (
    <div className="App">
      <HeaderComponent />
      <Form
        size='small'
        onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Ref innerRef={wrapperFrom}>
          <DropdownComponent
            name='From'/>
          </Ref>
          <Ref innerRef={wrapperTo}>
          <DropdownComponent
            name='To'/>
          </Ref>
        </Form.Group>
        <Ref innerRef={wrapperFile}>
        <FileUploadComponent
          label='Upload File Here'
          accept=".jpg,.png,.jpeg"
          updateFilesCb={updateUploadFiles}
        />
        </Ref>      
        <Button 
          basic 
          id='submit' 
          type='submit' 
          content='Submit'/>
        {/* <Ref innerRef={wrapperTranslation}>
        <Form.TextArea 
          id='bio'
          label=''
          placeholder='Translation result'
          onChange={(e) => this.handleChange(e.target)}
        />
        </Ref> */}
      </Form>
    </div>
  );
}

export default App;

import React from "react";
import { Form } from "semantic-ui-react";
import PropTypes from 'prop-types';

const friendOptions = [
  {
    key: "English",
    text: "English",
    value: "English"
  },
  {
    key: "French",
    text: "French",
    value: "French"
  },
  {
    key: "Chinese",
    text: "Chinese",
    value: "Chinese"
  }
];

function DropdownComponent(props) {
  const {name} = props;
  // const [state, setState] = useState({});
  // const handleChange = (target) => {
  //   setState({
  //     [target.id]: target.value
  //   })
  // }
  return (
    <Form.Dropdown
      id="language"
      label={name}
      placeholder="Select Language"
      fluid
      search
      selection
      labeled
      options={friendOptions}
      // onChange = {(e, data) => handleChange(data)}
    />
  );
}
DropdownComponent.propTypes = {
  name: PropTypes.string.isRequired
};

export default DropdownComponent;
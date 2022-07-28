import autobind from "autobind-decorator";
import * as React from "react";
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Form, Modal, Row } from "react-bootstrap";
import styles from './AtlasNavigationConnect.module.scss';

import './LanguageModal.css';
// import  Button  from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal"
// import * as bootstrap from "bootstrap";
// require('../../../node_modules/bootstrap/dist/css/bootstrap.css');
// require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');

export class LanguageModal extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // this.state = {
    //   dropDownValue: this.props.userLanguage != "" && this.props.userLanguage!=null ? this.props.userLanguage : "English"
    // }
    this.state = {
      dropDownValue: this.props.userLanguage == "newuser" ? "English" : this.props.userLanguage,
      dropDownOptions: [

        'Chinese',
        'English',
        'French',
        'German',
        'Japanese',
        'Polish',
        'Portuguese',
        'Russian',
        'Spanish',
      ],
      dropDownValue1: this.props.userBrandView == "newuser" ? "Modern View" : this.props.userBrandView,
      dropDownOptions1: [

        'Modern View',
        'Classic View'
      ]

    }
    console.log(this.props.userLanguage)
    console.log(this.props.userBrandView)
    

  }

  // componentDidMount(): void {
  //   console.log(this.props.userLanguage)
  //     this.setState({
  //       dropDownValue: this.props.userLanguage != "" && this.props.userLanguage!=null ? this.props.userLanguage : "English"
  //     })
  // }

  @autobind
  changeValue(event) {
    // console.log(text.target.value)
    this.setState({ dropDownValue: event.target.value })
  }

  @autobind
  changeValue1(event) {
    // console.log(text.target.value)
    this.setState({ dropDownValue1: event.target.value })
  }


  render() {
    console.log(this.props.uniqueLanguages)
    console.log(this.props.uniqueBrandViews)

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName={styles.languageModal}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Row>
            <Col className="text-center">
              {/* <div>
                  <DropdownButton id="dropdown-item-button" title={this.state.dropDownValue} className="format">
                    <Dropdown.Item as="button"><div onClick={() => this.changeValue(this.textContent)}>Item #1</div></Dropdown.Item>
                    <Dropdown.Item as="button"><div onClick={() => this.changeValue(this.textContent)}>Item #2</div></Dropdown.Item>
                    <Dropdown.Item as="button"><div onClick={() => this.changeValue(this.textContent)}>Item #3</div></Dropdown.Item>
                  </DropdownButton>
                </div> */}
              <Form.Group>
                <Form.Control as="select" aria-label="Default select example"
                  onChange={this.changeValue}
                  value={this.state.dropDownValue} name="programScope" placeholder="Select My Scope" required>

                  {this.state.dropDownOptions.map((element, index) => (
                    <option> {element} </option>
                  ))}
                </Form.Control>
                <Form.Text text="muted" style={{ color: '#fff', fontSize: '18px' }}>Select Your Language</Form.Text>
                <br></br>

                <Form.Control as="select" aria-label="Default select example"
                  onChange={this.changeValue1}
                  value={this.state.dropDownValue1} name="programScope" placeholder="Select My Scope" required>


                  {this.state.dropDownOptions1.map((element, index) => (
                    <option> {element} </option>
                  ))}
                </Form.Control>
                <Form.Text text="muted" style={{ color: '#fff', fontSize: '18px' }}>Select Brand View</Form.Text>

              </Form.Group>

              {/* <DropdownButton
                as={Dropdown}
                key={1}
                id="languageDropdown"
                variant="danger"
                title={this.state.dropDownValue}
              >
                {this.state.dropDownOptions.map((element, index) => (
                  <Dropdown.Item eventKey={index} onClick={() => this.changeValue(element)}>{element}</Dropdown.Item>)
                )
                }

              </DropdownButton> */}
            </Col>
            <Col className="text-center">
              <Button
                style={{ backgroundColor: '#CC0A0A', borderColor: '#fff' }}
                // onClick={this.props.onSubmit}
                onClick={() => this.props.onSubmit(this.state.dropDownValue, this.state.dropDownValue1)}
              >Set Preference</Button>
            </Col>
          </Row>

          <Row>
            <Col className="text-center"></Col>
            <Col className="text-center">
              <Button
                style={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgb(255, 255, 255,0)', boxShadow: "0px 0px 10px 2px #fff" }}
                onClick={this.props.onHide}>Close</Button>
            </Col>
          </Row>
          {/* <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal >
    );
  }
}
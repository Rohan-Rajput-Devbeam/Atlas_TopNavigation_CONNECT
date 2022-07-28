import autobind from "autobind-decorator";
import * as React from "react";
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Form, Modal, Row } from "react-bootstrap";
import styles from './AtlasNavigationConnect.module.scss';

import './NoPermissionModal.css';
// import './LanguageModal.css';



export class NoPermissionModal extends React.Component<any, any> {
  constructor(props) {
    super(props);
   
  }

 



  render() {
    

    return (
      <Modal 
      style={{MaxWidth: "100%", MaxHeight: "100%", backgroundColor: "#fff"}}
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName={styles.NoPermissionModal}

      >
        

        <Modal.Body style={{borderRadius:"0px"}}>
          <h4>Oops!! You don't have access to this page!</h4>
         
        
        </Modal.Body>    
      </Modal >
    );
  }
}
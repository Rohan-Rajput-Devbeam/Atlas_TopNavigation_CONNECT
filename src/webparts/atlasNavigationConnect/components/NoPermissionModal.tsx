import autobind from "autobind-decorator";
import * as React from "react";
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Form, Modal, Row } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import styles from './AtlasNavigationConnect.module.scss';

import './NoPermissionModal.css';
// import './LanguageModal.css';

import { FaGlassCheers, FaHome } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";



export class NoPermissionModal extends React.Component<any, any> {
  constructor(props) {
    super(props);

  }





  render() {


    return (
      // <Modal 
      // style={{MaxWidth: "100%", MaxHeight: "100%", backgroundColor: "#fff", border: #aaaaaa double 1px;}}
      //   {...this.props}
      //   size="lg"
      //   aria-labelledby="contained-modal-title-vcenter"
      //   centered
      //   dialogClassName={styles.NoPermissionModal}

      // >

      //   <ModalHeader>
      //   <FaGlassCheers size={100}  color={"#CC0A0A"} style={{flex:"auto"}}/>
      //   </ModalHeader>


      //   <Modal.Body style={{borderRadius:"0px"}}>
      //     <h4>Oops!! Looks like you don't have access to this page! Please contact Support at IT-ConnectSupport@BeamSuntory.com" for further assistance</h4>


      //   </Modal.Body>    
      // </Modal >

      <Modal
        style={{ MaxWidth: "100%", MaxHeight: "100%", backgroundColor: "#fff" }}
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName={styles.NoPermissionModal}

      >
        <ModalHeader>
        <a href="https://bgsw1.sharepoint.com/sites/CONNECTII">
          <FaHome  size={50} color={"#CC0A0A"} style={{ cursor: "pointer" }} />
          </a>

        </ModalHeader>
        <div className="polaroid" style={{
          // width: "250px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          textAlign: "center"
        }
        }>
          <FaGlassCheers size={100} color={"#CC0A0A"} style={{ flex: "auto", cursor: "pointer" }} />

          <div className="container" style={{ padding: "10px" }}>
            <h4>Oops!! Looks like you don't have access to this page!</h4>
            <br></br>
            <h6>Please contact Support at "IT-ConnectSupport@BeamSuntory.com" for further assistance</h6>
            
            <a href="mailto:IT-ConnectSupport@BeamSuntory.com?subject=Support&nbsp;Request&body=Message">
            <IoIosMail  size={50} color={"#CC0A0A"} style={{ flex: "auto", cursor: "pointer" }} />
            </a>

          </div>
        </div >
      </Modal>

    );
  }
}
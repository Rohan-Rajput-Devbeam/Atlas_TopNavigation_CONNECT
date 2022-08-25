import * as React from 'react';
import styles from './AtlasNavigationConnect.module.scss';
import { IAtlasNavigationConnectProps } from './IAtlasNavigationConnectProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Accordion, Alert, Button, Card, Col, Container, Form, InputGroup, Nav, Navbar, NavDropdown, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { SPService } from '../services/SPServices';
import autobind from 'autobind-decorator';

import 'bootstrap/dist/css/bootstrap.css';
import { includes } from 'lodash';
import { FaUser } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { LanguageModal } from './LanguageModal'
import { NoPermissionModal } from './NoPermissionModal'

import { sp } from '@pnp/sp/presets/all';



export interface IAtlasNavigationConnectState {
  listName: string;
  user: any;
  userLanguage: string;
  userBrandView: string;
  uniqueLanguages: any;
  uniqueBrandViews: any;
  isNewUser: boolean;
  toolboxItems: any;

  modalShow: boolean;
  user1: any;
  userLanguage1: string;
  userBrandView1: string;
  uniqueLanguages1: any;
  uniqueBrandViews1: any;
  isNewUser1: boolean;

  displayFlag: boolean;
  currUserGroups: any;
  currentUserEmail: string;
  cuurentUserID: any;
  currentUserName: string;
  currUserInitials: string;
  modalShow1: boolean;
  rootOwnerGroups: any;
  displaySiteContent: boolean;



}



export default class AtlasNavigationConnect extends React.Component<IAtlasNavigationConnectProps, IAtlasNavigationConnectState> {


  private SPService: SPService = null;
  constructor(props) {
    super(props);
    this.SPService = new SPService(this.props.context);
    this.state = {
      listName: "Preference",
      displayFlag: true,

      user: [],
      userLanguage: "",
      userBrandView: "",
      uniqueLanguages: [],
      uniqueBrandViews: [],
      isNewUser: true,
      toolboxItems: [],

      modalShow: false,
      user1: [],
      userLanguage1: "",
      userBrandView1: "",
      uniqueLanguages1: [],
      uniqueBrandViews1: [],
      isNewUser1: true,

      currUserGroups: [],
      currentUserEmail: "",
      cuurentUserID: "",
      currentUserName: "",
      currUserInitials: "",
      modalShow1: false,
      rootOwnerGroups: [],
      displaySiteContent: false





    }
    // this.getCurrentUser = this.getCurrentUser.bind(this);

    this.getCurrentUser();
    this.getUserGroups2();
    this.getRootOwners();

    // this.getUserLanguage();
    // this.getUniqueLanguages();
    this.getUniqueBrandView();
  }

  // componentDidUpdate() {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.people !== this.props.people) {
  //     this.getUserGroups2();
  //   }
  // }

  @autobind
  public componentDidMount() {


  }

  @autobind
  public async getCurrentUser() {
    let user = await this.SPService.getCurrentUser();
    let curuser = user
    let cur = curuser.LoginName.split('|')
    const fullName = curuser.Title.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);


    // console.log(curuser)
    // console.log(cur, cur[cur.length - 1])
    this.setState({
      currentUserEmail: cur[cur.length - 1],
      cuurentUserID: curuser.Id,
      currentUserName: curuser.Title,
      currUserInitials: initials.toUpperCase()
    })

    this.setState({
      ...this.state,
      user: user
    })

    this.setState({ user: user }, () => {
      //callback
      this.getUserLanguage(); // myname
      this.getUserBrandView();
      this.getToolboxItems();

    });
    // console.log(this.state.user)
  }

  @autobind
  public async categorizeGroups() {
    // this.setState({
    //   displayFlag: false
    // })
    if (this.props.people.length == 0 || this.props.people == null || this.props.people == undefined) {
      this.setState({
        displayFlag: true
      })
    }
    else {
      this.setState({
        displayFlag: false
      })
    }

    let response = this.state.currUserGroups;
    var finalArray1 = response.value.map(function (obj: { Title: any; }) {
      return obj.Title;
    });  //get user groups...
    var finalArray = response.value.map(function (obj: { displayName: any; }) {
      return obj.displayName;
    });


    // const GroupArray = this.props.people.map((obj: { fullName: any; }) => {
    //   return obj.fullName;
    // });

    // const GroupArray = this.props.people.map((obj: { email: any; }) => {
    //   return obj.email;
    // });
    var tempPeopleArray = this.props.people
    // console.log(tempPeopleArray)
    const GroupArray = tempPeopleArray.map(element => element.description);

    // var usrFullname = this.context.pageContext.user.displayName;
    // var usrFullname = "Rohan Rajput";
    let usrFullname = await (await sp.web.currentUser()).Email;
    // console.log(usrFullname)
    // console.log(finalArray)
    // console.log(GroupArray)



    var Groupintersections = finalArray.filter(e => GroupArray.indexOf(e) !== -1);

    // console.log(finalArray);
    // console.log(this.props.people);
    for (let i = 0; i < this.props.people.length; i++) {
      // console.log(this.props.people[i].fullName);
      //finalArray.includes(this.props.people[i].fullName) ||
      if (GroupArray.includes(usrFullname) || Groupintersections.length > 0) {
        // console.log("User Can view this section...!!");
        this.setState({
          displayFlag: true
        })
      }
    }

  }

  @autobind
  public async getUserGroups2() {

    let usrGroups = await this.SPService.getUserGroups();
    // console.log(usrGroups);
    this.setState({
      currUserGroups: usrGroups,

    });
    // console.log(this.state.currUserGroups);
    // console.log(this.state.user)

    this.categorizeGroups();
  }

  @autobind
  public async getRootOwners() {

    let rootOwnerGroups = await this.SPService.getRootOwners();
    // console.log(rootOwnerGroups)
    this.setState({
      rootOwnerGroups: rootOwnerGroups

    });
    // console.log(this.state.rootOwnerGroups)

    let response = this.state.rootOwnerGroups;
    var finalArray1 = response.value.map(function (obj: { Title: any; }) {
      return obj.Title;
    });  //get user groups...
    // console.log(finalArray1)

    const GroupArray = ["Root Owners"] //...Hardcode Root Owners group...
    // console.log(GroupArray)
    var Groupintersections = finalArray1.filter(e => GroupArray.indexOf(e) !== -1);
    // console.log(Groupintersections)
    if (Groupintersections.length > 0) {
      this.setState({
        displaySiteContent: true
      })
    }

  }



  @autobind
  async handleSubmit(selectedLang: string, selectedBrandView: string) {
    // console.log(selectedLang)
    // console.log(selectedBrandView)

    let tempMail = "@beamsuntory.com";
    let result = this.state.user.LoginName.includes(tempMail);
    let currUserEmailId = result ? this.state.user.LoginName.split('|')[2] : this.state.user.Email.toLowerCase();



    this.setState({
      modalShow: false
    })
    let response;
    if (this.state.isNewUser == true) {
      // selectedLang ="English"
      // response = await this.SPService.addListItem(this.state.listName, this.state.user.LoginName.split('|')[2], selectedLang);   
      // console.log(this.state.user)
      response = await this.SPService.addListItem(this.state.listName, currUserEmailId, selectedLang, selectedBrandView);    //For new user language is set to English by default.


    }
    else {
      response = await this.SPService.updateListItem(this.state.listName, selectedLang, selectedBrandView);
    }
    // console.log(response)
    window.location.reload();
  }

  @autobind
  public setModalShow() {
    this.setState({
      modalShow: !this.state.modalShow
    })
  }

  @autobind
  public setModalShow1() {
    this.setState({
      modalShow1: true
    })
  }

  @autobind
  public async getToolboxItems() {
    let toolTitle = await this.SPService.getToolboxItems();
    // console.log(toolTitle)
    this.setState({
      toolboxItems: toolTitle
    })

  }

  @autobind
  public async getUserBrandView() {
    let tempMail = "@beamsuntory.com";
    let result = this.state.user.LoginName.includes(tempMail);
    let currUserEmailId = result ? this.state.user.LoginName.split('|')[2] : this.state.user.Email.toLowerCase();


    let userBrandView = await this.SPService.getUserBrandView(this.state.listName, currUserEmailId)

    this.setState({
      userBrandView: userBrandView.length > 0 ? userBrandView[0] : "Classic View",
      isNewUser: userBrandView.length > 0 ? false : true
    })



  }

  @autobind
  public async getUniqueBrandView() {
    let uniqueBrandViews = await this.SPService.getUniqueBrandView(this.state.listName);
    this.setState({
      uniqueBrandViews: uniqueBrandViews
    })
  }

  @autobind
  public async getUserLanguage() {
    let tempMail = "@beamsuntory.com";
    let result = this.state.user.LoginName.includes(tempMail);
    let currUserEmailId = result ? this.state.user.LoginName.split('|')[2] : this.state.user.Email.toLowerCase();

    // console.log(this.state.user)
    let userLanguage = await this.SPService.getUserLanguage(this.state.listName, currUserEmailId);
    let browserLanguage = navigator.language;
    // console.log(this.state.user)




    this.setState({
      userLanguage: userLanguage.length > 0 ? userLanguage[0] : "newuser",
      isNewUser: userLanguage.length > 0 ? false : true
    })
    // console.log(userLanguage[0])


    let availableLanguages = ['Chinese', 'English', 'French', 'German', 'Japanese', 'Polish', 'Portuguese', 'Russian', 'Spanish',
    ]

    let matchedChinese = browserLanguage.match(/zh/gi);
    let matchedEnglish = browserLanguage.match(/en/gi);
    let matchedFrench = browserLanguage.match(/fr/gi);
    let matchedGerman = browserLanguage.match(/de/gi);
    let matchedJapanese = browserLanguage.match(/ja/gi);
    let matchedPolish = browserLanguage.match(/pl/gi);
    let matchedPortuguese = browserLanguage.match(/pt/gi);
    let matchedRussian = browserLanguage.match(/ru/gi);
    let matchedSpanish = browserLanguage.match(/es/gi);

    let matchedLanguage;

    if (matchedChinese ? matchedChinese.length > 0 : false) { matchedLanguage = 'Chinese' };
    if (matchedEnglish ? matchedEnglish.length > 0 : false) { matchedLanguage = 'English' };
    if (matchedFrench ? matchedFrench.length > 0 : false) { matchedLanguage = 'French' };
    if (matchedGerman ? matchedGerman.length > 0 : false) { matchedLanguage = 'German' };
    if (matchedJapanese ? matchedJapanese.length > 0 : false) { matchedLanguage = 'Japanese' };
    if (matchedPolish ? matchedPolish.length > 0 : false) { matchedLanguage = 'Polish' };
    if (matchedPortuguese ? matchedPortuguese.length > 0 : false) { matchedLanguage = 'Portuguese' };
    if (matchedRussian ? matchedRussian.length > 0 : false) { matchedLanguage = 'Russian' };
    if (matchedSpanish ? matchedSpanish.length > 0 : false) { matchedLanguage = 'Spanish' };


    // console.log(matchedLanguage)



    if (this.state.isNewUser == true) {
      this.setState({
        // modalShow: true Modal will not popup by default
        modalShow: false

      });

      this.handleSubmit(matchedLanguage, "Modern View")  ///For new user language is set to English by default..
    }
  }

  @autobind
  public async getUniqueLanguages() {
    let uniqueLanguages = await this.SPService.getUniqueLanguages(this.state.listName);
    this.setState({
      uniqueLanguages: uniqueLanguages
    })
  }

  @autobind
  public render(): React.ReactElement<IAtlasNavigationConnectProps> {
    var lang = navigator.language;
    var langs = navigator.languages;
    // console.log(lang)
    // console.log(langs)

    let navText = [
      "English,Our Brands,Rackhouse,Tools",
      "Chinese,我们的品牌,机架,工具",
      "German,Unsere Marken,Lagerhaus,Werkzeug",
      "Russian,Наши бренды,стеллажи,инструменты",
      "Portuguese,Nossas Marcas,Rackhouse,Ferramentas",
      "Japanese,私たちのブランド,ラックハウス,ツール",
      "French,Nos marques,Rackhouse, Outils",
      "Polish,Nasze marki,Regał, Narzędzia",
      "Spanish,Nuestras Marcas,Rackhouse, Herramientas"
    ]


    // console.log(this.state.user)

    // console.log(this.state.userLanguage)
    let tempLanguage = this.state.userLanguage
    // console.log(navText[0].English)
    // console.log(tempLanguage)
    const testBody = navText.map(e => (e))
    // console.log(testBody)

    let myArray = testBody[0].split(",");


    switch (tempLanguage) {

      case "English":
        myArray = testBody[0].split(",");
        break;
      case "Chinese":
        myArray = testBody[1].split(",");
        break;
      case "German":
        myArray = testBody[2].split(",");
        break;
      case "Russian":
        myArray = testBody[3].split(",");
        break;
      case "Portuguese":
        myArray = testBody[4].split(",");
        break;
      case "Japanese":
        myArray = testBody[5].split(",");
        break;
      case "French":
        myArray = testBody[6].split(",");
        break;
      case "Polish":
        myArray = testBody[7].split(",");
        break;
      case "Spanish":
        myArray = testBody[8].split(",");
        break;

    }



    return (
      <>
        {this.state.userLanguage == null || this.state.userLanguage == '' ?
          null
          :
          <>

            {this.state.displayFlag || this.state.displayFlag == true || this.state.displayFlag == undefined || this.state.displayFlag == null ?
              <div className={styles.atlasNavigationConnect}>
                <Navbar style={{ backgroundColor: "#fff", whiteSpace: "nowrap" }} expand="lg">


                  <Container className={styles.container}>
                    <Navbar.Brand href="https://bgsw1.sharepoint.com/sites/CONNECTII">
                      <img className={styles.navLogo} src='https://bgsw1.sharepoint.com/sites/CONNECTII/SiteAssets/Logo/connectLogo.gif'></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      {/* <Nav className="me-auto"> */}
                      <Nav fill variant="tabs" defaultActiveKey="">

                        {this.state.userBrandView && this.state.userBrandView == "Classic View" ?
                          <Nav.Link className={styles.navLink} style={{ marginLeft: "50px", marginRight: "20px" }} href="https://bgsw1.sharepoint.com/sites/CONNECTII/SitePages/Our%20Brands.aspx">{myArray[1]}</Nav.Link>
                          :
                          <Nav.Link className={styles.navLink} style={{ marginLeft: "50px", marginRight: "20px" }} href="https://bgsw1.sharepoint.com/sites/CONNECTII/SitePages/Our%20Brands%20Modern.aspx">{myArray[1]}</Nav.Link>
                        }

                        <Nav.Link className={styles.navLink} style={{ marginLeft: "50px", marginRight: "20px" }} href="https://bgsw1.sharepoint.com/sites/CONNECTII/SitePages/Rackhouse.aspx#loadAll">{myArray[2]}</Nav.Link>



                        <NavDropdown className={styles.navLink} style={{ marginLeft: "50px", marginRight: "20px" }} title={myArray[3]} >
                          {this.state.toolboxItems.map((toolboxDetails, i) => (


                            <NavDropdown.Item className={styles.navDropDown} target="_blank" href={toolboxDetails.ToolLink.Url}>{toolboxDetails.Title}</NavDropdown.Item>


                          ))}

                        </NavDropdown>


                        {/* <Col style={{paddingLeft:"25%", paddingRight:"0%"}}> */}

                        <a style={{ borderLeft: "#ccc solid 1px" }} className={styles.settingBtn} onClick={() => this.setModalShow()}>
                          <FaUser className={styles.settingBtn} style={{ cursor: "pointer", width: "2em", height: "1em" }} />

                        </a>


                        {this.state.displaySiteContent ?
                          <a className={styles.settingBtn} href='https://bgsw1.sharepoint.com/sites/CONNECTII/_layouts/15/viewlsts.aspx'>
                            <IoMdSettings className={styles.settingBtn} style={{ cursor: "pointer", width: "2em", height: "1.2em" }} />
                          </a>
                          : null}

                        <Nav.Link style={{ marginLeft: "50px", color: "#cc0a0a", fontSize: "0.75em", paddingTop: "14px" }} href="">Hello,</Nav.Link>
                        <Nav.Link style={{ color: "#00c5d9", fontSize: "0.75em", paddingTop: "14px" }} href="">{this.state.currentUserName}</Nav.Link>
                        <Nav.Link style={{ paddingTop: "5px" }} data-letters={this.state.currUserInitials} href=""></Nav.Link>

                        {/* <h3>Hi, {this.state.currentUserName}</h3> */}

                      </Nav>
                    </Navbar.Collapse>


                  </Container>


                </Navbar>
                {this.state.userLanguage && this.state.userBrandView &&
                  <LanguageModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow()}
                    uniqueLanguages={this.state.uniqueLanguages}
                    uniqueBrandViews={this.state.uniqueBrandViews}
                    userLanguage={this.state.userLanguage}
                    userBrandView={this.state.userBrandView}
                    onSubmit={(selectedValue, selectedValue1) => this.handleSubmit(selectedValue, selectedValue1)}
                  />
                }


              </div>
              :
              <>
                {this.state.displayFlag == false ?
                  <div>
                    <NoPermissionModal show={true} />
                  </div>
                  : null}
              </>

            }

          </>

        }
      </>
    );
  }
}

import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="elegant-color" className="font-small pt-4 mt-4 elegant-color" style={{'zIndex':'1'}}>
      <MDBContainer fluid className="text-center text-md-left container" color="elegant-color">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">About Us</h5>
            <p>
            Help small and limited businesses to grow by
            providing them a platform they can use to show
            their products and handle delivery by connecting
            to one of service owners
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: Wasaly
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;
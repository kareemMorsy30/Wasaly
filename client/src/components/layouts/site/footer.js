import React from "react";
import {Link} from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { isLoggedIn } from '../../../services/authServices'

const FooterPage = () => {
  return (
    <MDBFooter color="elegant-color" className="font-small pt-4 mt-4 elegant-color" style={{ 'zIndex': '1' }}>
      <MDBContainer fluid className="text-center text-md-left container" color="elegant-color">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">MY ACCOUNT </h5>
            <br></br>
            <ul>
              <Link style={{marginBottom:'2px'}} to={'/orders'}>
                My Orders
              </Link>
              <br></br>
              <br></br>
              <Link style={{marginBottom:'2px'}} to={'/cart'}>
                My Cart
              </Link>
              <br></br>
              <br></br>
              {
                !isLoggedIn() &&
                <>
                  <Link style={{marginBottom:'2px'}} to={'/login'}>
                    Login
                   </Link>

                   <br></br>
                   <br></br>
                  <Link to={'/login'}>
                    Register
                   </Link>
                </>
              }


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
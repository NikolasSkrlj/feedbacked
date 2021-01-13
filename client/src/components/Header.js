import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    //this.props.auth je instanca usera koja se pri renderu odmah fetcha
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href="/auth/google">Login with google</a>
          </li>
        );
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li>
              <a className="btn disabled">
                <b>Credits: {this.props.auth.credits}</b>
              </a>
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        );
    }
  }
  render() {
    //console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper" style={{ paddingLeft: "15px" }}>
          {/* Ako je user logged in link ide na dashboard, ako nije ide na landing */}
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Feedbacked.
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

//state je globalni redux state, iz njega izvlacimo auth dio i mapiramo ga u props da ga header komponenta moze koristit
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);

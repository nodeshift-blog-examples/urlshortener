import React from 'react';
import {
  Brand,
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants
} from '@patternfly/react-core';
import Link from "./Link";
import imgBrand from "../images/logo.png";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    let activeItem = 0;
    if (window.location.pathname.indexOf("/add") > -1) activeItem = 1;
    if (window.location.pathname.indexOf("/about") > -1) activeItem = 2;
    
    this.state = {
      activeItem
    };
  }

  render() {
    const { activeItem } = this.state;

    const PageNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav" variant="horizontal">
        <NavList>
        <Link to="/">
            <NavItem itemId={0} isActive={activeItem === 0} to="/">
              Current Shorties
            </NavItem>
          </Link>
          <Link to="/add">
            <NavItem itemId={1} isActive={activeItem === 1} to="/add">
              Add New
            </NavItem>
          </Link>
          <Link to="/about">
            <NavItem itemId={2} isActive={activeItem === 2} to="/about">
              About
            </NavItem>
          </Link>
        </NavList>
      </Nav>
    );
    const Header = (
      <PageHeader logo={<Brand src={imgBrand} alt="URL Shorties Logo" />} topNav={PageNav} />
    );

    const pageId = 'main-content-page-layout-horizontal-nav';

    return (
      <React.Fragment>
        <Page header={Header} mainContainerId={pageId}>
          <PageSection variant={PageSectionVariants.light}>
            {this.props.children}
          </PageSection>
        </Page>
      </React.Fragment>
    );
  }
}
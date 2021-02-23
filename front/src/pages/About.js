import { Alert, PageSection, Title } from "@patternfly/react-core";
import React from "react";
import Layout from "../components/Layout";
import Api from "../utils/api";
import Config from "../config.json";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      status: {
        server: false,
        database: false,
        redirector: false
      }
    }
  }

  async componentDidMount() {
    Api.getServerStatus()
      .then(status => {
        if (status) {
          this.setState({status})
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({status: {server: false, database: false}})
      });
    fetch(`${Config.REDIRECTOR_URL}/health`)
      .then(resp => resp.json())
      .then(_ => {
        this.setState((state) => {
          state.status.redirector = true;
          return state;
        })
      })
      .catch(e => {
        console.log(e);
        this.setState(state => {
          state.status.redirector = false;
          return state;
        });
      });
  }

  render() {
    const { status } = this.state;
    return (
      <Layout>
        <PageSection>
          <Title headingLevel="h1">Server Status</Title>
        </PageSection>
        <PageSection>
          <Alert variant="info" isInline title="Hostname">
            <React.Fragment>{Config.HOSTNAME}</React.Fragment>
          </Alert>
        </PageSection>
        <PageSection>
          <Alert variant={status.server ? "success" : "danger"} isInline title="Server Status">
          { status.server && 
            <React.Fragment>Up and running</React.Fragment>
          }
          { !status.server && 
            <React.Fragment>Unreachable</React.Fragment>
          }
          </Alert>
        </PageSection>
        <PageSection>
          <Alert variant={status.database ? "success" : "danger"} isInline title="Database Status">
          { status.database && 
            <React.Fragment>Up and running</React.Fragment>
          }
          { !status.database && 
            <React.Fragment>Unreachable</React.Fragment>
          }
          </Alert>
        </PageSection>
        <PageSection>
          <Alert variant={status.redirector ? "success" : "danger"} isInline title="Redirection Server Status">
          { status.redirector && 
            <React.Fragment>Up and running</React.Fragment>
          }
          { !status.redirector && 
            <React.Fragment>Unreachable</React.Fragment>
          }
          </Alert>
        </PageSection>
      </Layout>
    )
  }
}
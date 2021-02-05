import React from "react";
import Layout from "../components/Layout";
import { Alert, Form, FormGroup, TextInput, ActionGroup, Button, PageSection, Title } from "@patternfly/react-core";
import api from "../utils/api";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "",
      url: "",
      created: false
    }

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleTextInputChange(newValue, e) {
    let field = e.target.id;
    let newState = {};
    newState[field] = newValue;
    this.setState(newState);
  }

  async handleSubmit() {
    let newUrl = {
      route: this.state.route,
      url: this.state.url
    }
    await api.addUrl(newUrl);
    this.setState({
      route: "",
      url: "",
      created: true
    });

    setTimeout(() => this.setState({created: false}), 5000);
  }

  render() {
    const { created } = this.state;
    return (
      <Layout>
        <PageSection>
          <Title headingLevel="h1">Add a new redirection</Title>
        </PageSection>
        {created && 
        <PageSection>
          <Alert variant="success" isInline title="New redirection successfully created" />
        </PageSection>
        }
        <PageSection>
          <Form isHorizontal>
            <FormGroup label="Route" isRequired fieldId="route" helperText="Route in the redirector service (/shorturl)">
              <TextInput
                  value={this.state.route}
                  isRequired
                  type="text"
                  id="route"
                  aria-describedby="Route"
                  name="route"
                  onChange={this.handleTextInputChange}
                />
            </FormGroup>
            <FormGroup label="Url" isRequired fieldId="url" helperText="URL to redirect to (http://longurl.com/service?option=1">
              <TextInput
                  value={this.state.url}
                  isRequired
                  type="text"
                  id="url"
                  aria-describedby="url"
                  name="url"
                  onChange={this.handleTextInputChange}
                />
            </FormGroup>
            <ActionGroup>
              <Button variant="primary" onClick={this.handleSubmit}>Create Redirection</Button>
              <Button variant="link">Cancel</Button>
            </ActionGroup>
          </Form>
        </PageSection>
      </Layout>
    )
  }
}
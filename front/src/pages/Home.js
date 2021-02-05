import React from "react";
import Layout from "../components/Layout";
import Api from "../utils/api";
import { Alert } from "@patternfly/react-core";
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import Link from "../components/Link";
import Config from "../config.json";
import LinkIcon from "@patternfly/react-icons/dist/js/icons/link-icon";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urls: []
    }
  }

  async componentDidMount() {
    let urls = await Api.getUrls();
    this.setState({ urls });
  }

  render() {
    const { urls } = this.state;
    const columns = ["Short Url", "Redirects To", "Link"];
    const rows = urls.map(u => {
      return [
        u.route, {
          title: <Link to={u.url} external>{u.url}</Link>
        }, {
          title: <Link to={`${Config.REDIRECTOR_URL}${u.route}`} external><LinkIcon /></Link>
        }
      ];
    });
    return (
      <Layout>
        {urls.length === 0 && 
          <Alert variant="warning" isInline title="No routes defined.">
            You can use the "Add New" link in the top navigation to add your first route."
          </Alert>
        }
        <Table
          aria-label="List of URLs"
          variant="compact"
          borders="compactBorderless"
          cells={columns}
          rows={rows}
        >
          <TableHeader />
          <TableBody />
        </Table>
      </Layout>
    )
  }
}
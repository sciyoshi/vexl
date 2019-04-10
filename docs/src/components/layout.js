import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className="flex flex-col font-sans min-h-screen text-grey-darkest">
        <Header siteTitle={data.site.siteMetadata.title} />

        <div className="container mx-auto px-4 py-8 md:p-8 w-full">
          {children}
        </div>
      </div>
    )}
  />
);

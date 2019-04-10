import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default () => (
  <Layout>
    <SEO title="Home" keywords={["expression language"]} />

    <p>
      <strong className="font-mono">vexl</strong> is a versatile expression
      language. Read more about <Link to="/">why you might want to use it</Link>{" "}
      or <Link to="/">try a live demo</Link>.
    </p>
  </Layout>
);

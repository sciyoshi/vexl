import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";

function Header({ siteTitle }) {
  const [isExpanded, toggleExpansion] = useState(false);

  return (
    <nav>
      <div className="container mx-auto p-4 md:p-8">
        <Link
          to="/"
          className="no-underline font-bold font-mono text-xl tracking-tight"
        >
          {siteTitle}
        </Link>
      </div>
    </nav>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;

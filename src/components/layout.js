import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const { addScript } = require('../utils/addScript.js');

import 'normalize.css';
import '../rocketbelt/rocketbelt.scss';
import '../styles/site.scss';

import SEO from './seo';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, pageContext }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const hasScripts =
    pageContext &&
    pageContext.frontmatter &&
    pageContext.frontmatter.scriptTags &&
    pageContext.frontmatter.scriptTags.length > 0;

  return (
    <>
      {/* Pass in title, description, OG data, etc. */}
      <SEO pageContext={pageContext} />

      <div className="rbio-content-wrap">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main className="rbio-content">{children}</main>
        <Footer />
      </div>

      {hasScripts &&
        pageContext.frontmatter.scriptTags.forEach((script) => {
          addScript(script);
        })}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

// export const query = graphql`
//   query ScriptTagQuery($mdxId: String) {
//     mdx(id: {eq: $mdxId}) {
//       frontmatter {
//         scriptTags
//       }
//     }
//   }
// `;

export default Layout;

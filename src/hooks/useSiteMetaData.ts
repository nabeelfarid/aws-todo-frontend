import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            subtitle
            description
            slogan
            author
            repo
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

export default useSiteMetadata;

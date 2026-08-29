import React, { Fragment, useContext } from "react";
import { Helmet } from "react-helmet-async";
import config from "../config";
import { isThemeDarkish } from "../helpers/utils";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/ThemeContext";

const MetaTags = (props) => {
  const [theme] = useContext(ThemeContext);

  const siteUrl =
    config.social?.website || `https://${config.github.username}.github.io`;
  const metaDescription = props.profile
    ? [config.hero?.headline, config.hero?.tagline, props.profile.location]
        .filter(Boolean)
        .join(" · ") || props.profile.bio
    : "";

  return (
    <Fragment>
      {props.profile && (
        <Helmet>
          {config.googleAnalytics?.id && (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics.id}`}
            ></script>
          )}
          {config.googleAnalytics?.id && (
            <script>
              {`
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());

                                        gtag('config', '${config.googleAnalytics.id}');
                                        `}
            </script>
          )}
          <title>{`${props.profile.name} — ${config.hero?.headline || "Portfolio"}`}</title>
          <meta
            name="theme-color"
            content={isThemeDarkish(theme) ? "#000000" : "#ffffff"}
          />

          <meta name="description" content={metaDescription} />

          <meta
            itemprop="name"
            content={`Portfolio of ${props.profile.name}`}
          />
          <meta itemprop="description" content={metaDescription} />
          <meta itemprop="image" content={props.profile.avatar} />

          <meta property="og:url" content={siteUrl} />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={`Portfolio of ${props.profile.name}`}
          />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content={props.profile.avatar} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`Portfolio of ${props.profile.name}`}
          />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:image" content={props.profile.avatar} />
        </Helmet>
      )}
    </Fragment>
  );
};

MetaTags.propTypes = {
  profile: PropTypes.object,
};

export default MetaTags;

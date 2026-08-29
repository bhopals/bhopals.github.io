import { Fragment, useContext, useEffect } from "react";
import AvatarCard from "./components/AvatarCard";
import ThemeChanger from "./components/ThemeChanger";
import config from "./config";
import Details from "./components/Details";
import Skill from "./components/Skill";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Project from "./components/Project";
import Blog from "./components/Blog";
import MetaTags from "./components/MetaTags";
import { LoadingContext } from "./contexts/LoadingContext";
import { ThemeContext } from "./contexts/ThemeContext";
import githubData from "./data/github-data.json";
/**
 *
 * Credit - https://github.com/arifszn/ezprofile
 *
 * Profile and repo data are baked in at build time by
 * scripts/fetch-github-data.js (refreshed weekly by the CI workflow),
 * so the site makes no GitHub API calls at runtime.
 */
function App() {
  const [theme] = useContext(ThemeContext);
  const [, setLoading] = useContext(LoadingContext);
  const profile = githubData.profile;
  const repo = githubData.repos;

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <Fragment>
      <MetaTags profile={profile} />
      <div className="fade-in h-screen">
        <Fragment>
          <div className="p-4 lg:p-10 min-h-full bg-base-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
              <div className="col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  {!config.themeConfig.disableSwitch && <ThemeChanger />}
                  <AvatarCard profile={profile} />
                  <Details profile={profile} />
                  <Skill />
                  <Experience />
                  <Education />
                </div>
              </div>
              <div className="lg:col-span-2 col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  <Project repo={repo} />
                  <Blog />
                </div>
              </div>
            </div>
          </div>
          {/* DO NOT REMOVE/MODIFY THE FOOTER */}
          {/* <footer className="p-4 footer bg-base-200 text-base-content footer-center">
            <div>
              <p className="font-mono text-sm">
                Made with{" "}
                <a
                  className="text-primary"
                  href="https://github.com/arifszn/ezprofile"
                  target="_blank"
                  rel="noreferrer"
                >
                  ezProfile
                </a>{" "}
                and ❤️
              </p>
            </div>
          </footer> */}
        </Fragment>
      </div>
    </Fragment>
  );
}

export default App;

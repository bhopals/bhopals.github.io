import { Fragment, useContext, useState } from "react";
import { ga, languageColor, skeleton } from "../helpers/utils";
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai";
import config from "../config";
import PropTypes from "prop-types";
import { LoadingContext } from "../contexts/LoadingContext";

const ALL_TAB = "All";
const FALLBACK_CATEGORY = "Web Apps";

const categoryOf = (repoName) => {
  const categories = config.projectCategories || {};
  const match = Object.keys(categories).find((category) =>
    categories[category].includes(repoName)
  );
  return match || FALLBACK_CATEGORY;
};

const Project = (props) => {
  const [loading] = useContext(LoadingContext);
  const [activeTab, setActiveTab] = useState(ALL_TAB);

  const repos = props.repo || [];
  const tabs = [
    ALL_TAB,
    ...[...Object.keys(config.projectCategories || {}), FALLBACK_CATEGORY].filter(
      (category) => repos.some((r) => categoryOf(r.name) === category)
    ),
  ];
  const visibleRepos =
    activeTab === ALL_TAB
      ? repos
      : repos.filter((r) => categoryOf(r.name) === activeTab);

  const renderTabs = () => (
    <div className="mx-4 mt-2 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full cursor-pointer border-0 ${
            activeTab === tab
              ? "badge-primary bg-opacity-90"
              : "bg-base-300 text-base-content text-opacity-60 hover:text-opacity-100"
          }`}
        >
          {tab}
          <span className="ml-1 opacity-60">
            {tab === ALL_TAB
              ? repos.length
              : repos.filter((r) => categoryOf(r.name) === tab).length}
          </span>
        </button>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    let array = [];
    for (let index = 0; index < config.github.limit; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="flex justify-between flex-col p-8 h-full w-full">
            <div>
              <div className="flex items-center">
                <span>
                  <h5 className="card-title text-lg">
                    {skeleton({ width: "w-32", height: "h-8" })}
                  </h5>
                </span>
              </div>
              <div className="mb-5 mt-1">
                {skeleton({
                  width: "w-full",
                  height: "h-4",
                  className: "mb-2",
                })}
                {skeleton({ width: "w-full", height: "h-4" })}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-grow">
                <span className="mr-3 flex items-center">
                  {skeleton({ width: "w-12", height: "h-4" })}
                </span>
                <span className="flex items-center">
                  {skeleton({ width: "w-12", height: "h-4" })}
                </span>
              </div>
              <div>
                <span className="flex items-center">
                  {skeleton({ width: "w-12", height: "h-4" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return array;
  };

  const renderProjects = () => {
    return visibleRepos.map((item, index) => (
      <div
        className="card shadow-lg compact bg-base-100 cursor-pointer"
        key={item.name}
        onClick={() => {
          try {
            if (config.googleAnalytics && config.googleAnalytics.id) {
              ga.event({
                action: "Click project",
                params: {
                  project: item.repo,
                },
              });
            }
          } catch (error) {
            console.error(error);
          }
          window.open(item.html_url, "_blank");
        }}
      >
        <div className="flex justify-between flex-col p-8 h-full w-full">
          <div>
            <div className="flex items-center opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              <span>
                <h5 className="card-title text-lg">{item.name}</h5>
              </span>
            </div>
            <p className="mb-5 mt-1 text-base-content text-opacity-60 text-sm">
              {item.description}
            </p>
          </div>
          <div>
            <div className="flex items-center opacity-60">
              <span>
                {item.homepage && (
                  <h5 className="card-title text-lg">
                    <b>Demo -</b>&nbsp;&nbsp;
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={item.homepage}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.homepage}
                    </a>
                  </h5>
                )}
                <h5 className="card-title text-lg">
                  {(item.topics || []).map((skill, index) => (
                    <div
                      key={index}
                      className="m-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 badge-primary bg-opacity-75 rounded-full"
                    >
                      {skill}
                    </div>
                  ))}
                </h5>
              </span>
            </div>
          </div>
          <div className="flex justify-between text-sm text-base-content text-opacity-60">
            <div className="flex flex-grow">
              <span className="mr-3 flex items-center">
                <AiOutlineStar className="mr-0.5" />
                <span>{item.stargazers_count}</span>
              </span>
              <span className="flex items-center">
                <AiOutlineFork className="mr-0.5" />
                <span>{item.forks}</span>
              </span>
            </div>
            <div>
              <span className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1 opacity-60"
                  style={{ backgroundColor: languageColor(item.language) }}
                />
                <span>{item.language}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="card compact bg-base-100 shadow-sm">
              <div className="card-body">
                <ul className="menu row-span-3 bg-base-100 text-base-content">
                  <li>
                    <div className="pb-0-important mx-4 flex items-center justify-between">
                      <h5 className="card-title">
                        {loading ? (
                          skeleton({ width: "w-28", height: "h-8" })
                        ) : (
                          <span className="opacity-70">My Projects</span>
                        )}
                      </h5>
                      {loading ? (
                        skeleton({ width: "w-10", height: "h-5" })
                      ) : (
                        <a
                          href={`https://github.com/${config.github.username}?tab=repositories`}
                          target="_blank"
                          rel="noreferrer"
                          className="opacity-50"
                        >
                          See All
                        </a>
                      )}
                    </div>
                  </li>
                </ul>
                {!loading && tabs.length > 2 && renderTabs()}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading || !props.repo ? renderSkeleton() : renderProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Project.propTypes = {
  repo: PropTypes.array,
};

export default Project;

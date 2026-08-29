import { useContext } from "react";
import PropTypes from "prop-types";
import { AiOutlineStar } from "react-icons/ai";
import { FiBriefcase, FiFolder, FiClock } from "react-icons/fi";
import { LoadingContext } from "../contexts/LoadingContext";
import { skeleton } from "../helpers/utils";
import config from "../config";

const GithubStats = (props) => {
  const [loading] = useContext(LoadingContext);
  const stats = props.stats;

  if (!loading && !stats) {
    return null;
  }

  const items = stats
    ? [
        {
          icon: <AiOutlineStar className="text-2xl" />,
          value: stats.totalStars,
          label: "GitHub Stars",
        },
        {
          icon: <FiFolder className="text-2xl" />,
          value: stats.publicRepos,
          label: "Public Repos",
        },
        ...(config.hero?.careerStart
          ? [
              {
                icon: <FiBriefcase className="text-2xl" />,
                value: `${new Date().getFullYear() - config.hero.careerStart}+ yrs`,
                label: "Experience",
              },
            ]
          : []),
        {
          icon: <FiClock className="text-2xl" />,
          value: `${new Date().getFullYear() - stats.since}+ yrs`,
          label: `On GitHub since ${stats.since}`,
        },
      ]
    : [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {loading
        ? [0, 1, 2, 3].map((index) => (
            <div className="card shadow-lg compact bg-base-100" key={index}>
              <div className="grid place-items-center p-6">
                {skeleton({ width: "w-12", height: "h-8", className: "mb-2" })}
                {skeleton({ width: "w-20", height: "h-4" })}
              </div>
            </div>
          ))
        : items.map((item, index) => (
            <div className="card shadow-lg compact bg-base-100" key={index}>
              <div className="grid place-items-center p-6 text-center">
                <div className="text-primary opacity-80 mb-1">{item.icon}</div>
                <div className="font-bold text-2xl opacity-70">{item.value}</div>
                <div className="text-xs opacity-50 uppercase font-semibold tracking-wide">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

GithubStats.propTypes = {
  stats: PropTypes.object,
};

export default GithubStats;

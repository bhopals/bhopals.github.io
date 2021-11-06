// config.js
module.exports = {
  github: {
    username: "bhopals", // Your GitHub org/user name. (Required)
    sortBy: "stars", // stars | updated
    limit: 10, // How many projects to display.
    exclude: {
      forks: false, // Forked projects will not be displayed if set to true.
      projects: [], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
    include: ["social-app", "budgetry-app", "uber-app", "analog-clock"], // The Repos you want to add/include along with Pinned Repos
  },
  social: {
    linkedin: "bhopal-singh",
    twitter: "@BhopalSingh_",
    facebook: "",
    dribbble: "",
    behance: "",
    medium: "",
    devto: "",
    website: "",
    phone: "",
    email: "bhopalsinghsis@gmail.com",
  },
  skills: [
    "Node.js",
    "Java",
    "Spring Boot",
    "Microservices",
    "API Developer",
    "Restful Web Services",
    "AWS Cloud",
    "AWS Serverless",
    "JavaScript",
    "React.js",
    "JavaScript Functional Programming",
    "JavaScript Preformance",
    "Jquery",
    "MySQL",
    "Git",
    "Docker",
    "CSS",
    "Responsive Web Design",
    "Tailwind",
    "Bootstrap",
  ],
  experiences: [
    {
      company: "Liberty Mutual",
      position: "Senior Full Stack Developer - AWS Serverless",
      from: "September 2021",
      to: " Present",
    },
    {
      company: "360Insights",
      position: "Senior Full Stack Developer",
      from: "September 2021",
      to: " December 2019",
    },
    {
      company: "Emirates",
      position: "Senior Full Stack Developer ",
      from: "March 2015",
      to: " October 2019",
    },
    {
      company: "A3logics",
      position: "Senior Full Stack Developer ",
      from: "January 2010",
      to: " February 2015",
    },
  ],
  education: [
    {
      institution: "Compucom Institute of Information Technology & Management",
      degree: "Master of Computer Applications (MCA)",
      from: "2008",
      to: "2011",
    },
    {
      institution: "Compucom Institute of Information Technology & Management",
      degree: "Bachelor of Computer Applications",
      from: "2005",
      to: "2008",
    },
  ],
  //   blog: {
  //     // Display blog posts from your medium or dev.to account. (Optional)
  //     source: "dev.to", // medium | dev.to
  //     username: "bhopals",
  //     limit: 2, // How many posts to display. Max is 10.
  //   },
  //   googleAnalytics: {
  //     // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  //     id: "XXXXXX", // Please remove this and use your own tag id
  //   },
  //   hotjar: {
  //     id: "XXXXXX", //  Please remove this and use your own id
  //     snippetVersion: 6,
  //   },
  themeConfig: {
    default: "light",

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should we use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded default
    respectPrefersColorScheme: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
    ],
  },
};

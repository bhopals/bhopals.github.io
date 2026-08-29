/**
 * Build-time GitHub data fetcher.
 *
 * Fetches the profile, pinned repos (GraphQL, needs GITHUB_TOKEN) and the
 * repos listed in config.github.include, then writes everything the UI needs
 * to src/data/github-data.json so the site ships fully static — no runtime
 * API calls, no rate limits, no error pages.
 *
 * Runs in CI with GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }}. Without a token
 * it still works (REST only, pinned repos skipped) within the anonymous
 * rate limit. If fetching fails and a previous github-data.json exists, the
 * old data is kept and the build continues.
 */
const fs = require("fs");
const path = require("path");
const config = require("../src/config");

const OUT_FILE = path.join(__dirname, "..", "src", "data", "github-data.json");
const USERNAME = config.github.username;
const TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${USERNAME}-portfolio-build`,
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function fetchJson(url, options = {}) {
  const res = await fetch(url, { headers, ...options });
  if (!res.ok) {
    throw new Error(`${options.method || "GET"} ${url} -> ${res.status}`);
  }
  return res.json();
}

async function fetchPinnedRepoNames() {
  if (!TOKEN) {
    console.warn("No GITHUB_TOKEN — skipping pinned repos (GraphQL requires auth).");
    return [];
  }
  try {
    const query = `query {
      user(login: "${USERNAME}") {
        pinnedItems(first: 10, types: REPOSITORY) {
          nodes { ... on Repository { name isPrivate } }
        }
      }
    }`;
    const data = await fetchJson("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const nodes = (data.data && data.data.user && data.data.user.pinnedItems.nodes) || [];
    return nodes.filter((n) => n && !n.isPrivate).map((n) => n.name);
  } catch (error) {
    console.warn(`Pinned repos fetch failed (${error.message}) — continuing without them.`);
    return [];
  }
}

async function fetchRepo(name) {
  try {
    const r = await fetchJson(`https://api.github.com/repos/${USERNAME}/${name}`);
    if (config.github.exclude.forks && r.fork) {
      console.warn(`Skipping ${name}: fork (exclude.forks is on).`);
      return null;
    }
    return {
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      topics: r.topics || [],
      stargazers_count: r.stargazers_count,
      forks: r.forks,
      language: r.language,
    };
  } catch (error) {
    console.warn(`Skipping ${name}: ${error.message}`);
    return null;
  }
}

async function main() {
  const pinned = await fetchPinnedRepoNames();
  const excluded = config.github.exclude.projects || [];
  const names = Array.from(new Set([...pinned, ...config.github.include])).filter(
    (n) => !excluded.includes(n)
  );

  const repos = (await Promise.all(names.map(fetchRepo))).filter(Boolean);

  let profile = null;
  let stats = null;
  try {
    const u = await fetchJson(`https://api.github.com/users/${USERNAME}`);
    profile = {
      avatar: u.avatar_url,
      name: u.name || "",
      bio: u.bio || "",
      location: u.location || "",
      company: u.company || "",
    };

    // Aggregate stars across every public repo (paginated listing)
    let totalStars = 0;
    for (let page = 1; page <= 5; page++) {
      const list = await fetchJson(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}`
      );
      totalStars += list.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      if (list.length < 100) break;
    }
    stats = {
      totalStars,
      publicRepos: u.public_repos,
      followers: u.followers,
      since: new Date(u.created_at).getFullYear(),
    };
  } catch (error) {
    console.warn(`Profile/stats fetch failed: ${error.message}`);
  }

  if (!profile || repos.length === 0) {
    if (fs.existsSync(OUT_FILE)) {
      console.warn("Fetch incomplete — keeping existing github-data.json.");
      return;
    }
    throw new Error("Fetch failed and no existing github-data.json to fall back to.");
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(
    OUT_FILE,
    JSON.stringify({ generated_at: new Date().toISOString(), profile, stats, repos }, null, 2)
  );
  console.log(`Wrote ${repos.length} repos (${pinned.length} pinned) to ${OUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

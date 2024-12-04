// targeting profile info
const overview = document.querySelector(".overview");
const username = "jesteffes";
const repoList = document.querySelector(".repo-list");

const gitProfileInfo = async function () {
    const profileInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await profileInfo.json();
    //console.log(data);
    displayProfileInfo(data);
};

gitProfileInfo();

const displayProfileInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    overview.append(div);
    gitHubRepos();
};

const gitHubRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoInfo = await fetchRepos.json();
    displayRepos(repoInfo);
    //console.log(repoInfo);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoFeature = document.createElement("li");
        repoFeature.classList.add("repo");
        repoFeature.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoFeature);
    }
};
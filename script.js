const github_data = {
  "token": "token",
  "username": "Okeibunor"
}

// GraphQL Query 
const body = {
  "query": `
    query{
      user(login: "Okeibunor") {
        avatarUrl,
        login,
        name,
        bio,
        repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name,
            url,
            description,
            updatedAt,
            forkCount,
            stargazerCount,
            primaryLanguage {
              name,
              color
            }
          }
        }
      }
    }`
}

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + github_data.token
}

// Make Fetch Request with Native Javascript Fetch API
fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body)
}).then(response => response.json()).then(data => {
  let repoArray = data.data.user.repositories.nodes;
  let output = '';
  repoArray.forEach(element => {
    let date = new Date(element.updatedAt)
    let language = element.primaryLanguage
    output += `
            <div
                class="card"
                :class="{
                'light-background': !getDarkMode,
                'dark-background': getDarkMode,
                }"
            >
                <div class="card-text">
                  <a href=${element.url}>${element.name}</a>
                  <p>${(element.description ? element.description : '')}</p>
                  <div class="f6"><span><span class="circle" style="background-color: ${language ? language.color : ''}"></span>${language ? language.name : ''}</span><span><svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg> ${element.stargazerCount}</span><span><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> ${element.forkCount}</span> Updated on ${new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)}</div>
                </div>
               <div class="card-graph">
                <button class="btn">
                  <svg data-v-36ff174c="" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" class="octicon octicon-star mr-1"><path data-v-36ff174c="" fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                  Star
                </button>
              </div>
            </div>
            `
  });
  document.getElementById('repo').innerHTML = output

  document.querySelector('.profile_sum').innerHTML = `
    <div class="user-details">
      <div class="name">${data.data.user.name}</div>
      <p class="login">${data.data.user.login}</p>
      <div class="bio">${data.data.user.bio}</div>
    </div>

    `
  document.querySelector('.avatar-container').innerHTML = `
      <img class="avatar" src=${data.data.user.avatarUrl} alt="avatar" />
      <span><svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"></path></svg></span>
`
}).catch(err => (err))

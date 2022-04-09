const GithubProfilles = function(){
    const API_URL = 'https://api.github.com/users/'
    async function getUser(username) {
        try {
            let res = await fetch(API_URL + username);
            if (res.status >= 200 && res.status <= 299) {
                return await res.json();;
            } else {
                return undefined
            }
        } catch (error) {
            console.log(error);
        }
    }
    const searchBtn = document.querySelector('#search')
    searchBtn.addEventListener('click',renderUsers)
    //event Listener handler
    async function renderUsers() {
        const username = document.querySelector('#username').value
        const githubUser = document.querySelector('#github-user')
        //call api
        let user = await getUser(username);
        console.log(user)
        githubUser.innerHTML ='';
        let userCard='';
        if (user === undefined){
            userCard = `
                    <div class="card">
                        <h4>No user with username @${username} was found!</h4>
                    </div>
                `
        } else{
            userCard = `
                <div class="card">
                    <div id="profile-image">
                        <img src="${user.avatar_url}" alt="${user.name}'s Github Profile Avatar">
                    </div>
                    <div class="user-data">
                        <div class="profile-name">
                            <h2>${user.name}</h2>
                            <h3>@${user.login}</h3>
                        </div>
                        <div class="profile-details">
                            <div class="stars">${user.public_repos}<span>Stars</span></div>
                            <div class="followers">${user.followers}<span>Followers</span></div>
                            <div class="following">${user.following}<span>Following</span></div>
                        </div>
                    </div>
                </div>
            `
        }
        
        const cardFragment = document.createRange().createContextualFragment(userCard);
        githubUser.appendChild(cardFragment);
    }

}()
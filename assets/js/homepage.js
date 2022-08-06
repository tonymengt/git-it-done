var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTermEl = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
    event.preventDefault();
    var username = nameInputEl.value.trim()

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("please enter a Github username");
    }
    // console.log(event);
};

var displayRepos = function (repos,searchTerms){
    repoContainerEl.textContent="";
    repoSearchTermEl.textContent=searchTerms;
    console.log(repoSearchTermEl.textContent);

    if(repos.length ===0){
        repoContainerEl.textContent="No repositories found.";
        return;
    }

    for (var i = 0; i<repos.length; i++ ){
        // format repo name
        var repoName = repos[i].owner.login+"/"+repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList="list-item flex-row justify-space-between align-center";
        
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent=repoName;

        // append to contianer
        repoEl.appendChild(titleEl);

        var statusEl = document.createElement("span")
        statusEl.classList="flex-row align-center"

        // check if current repo has issues or not
        if (repos[i].open_issues_count>0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);
        // append container to the dom
        repoContainerEl.appendChild(repoEl);


    }
    // console.log(repos);
    // console.log(searchTerms);
}


userFormEl.addEventListener("submit",formSubmitHandler);

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/"+user+"/repos";

    //  make a request to the url
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                return response.json().then(function(data){
                    displayRepos(data,user)
                    // console.log(data);
                });
            }else {
                alert("Error: Github User Not Found");
            }
        })
    };

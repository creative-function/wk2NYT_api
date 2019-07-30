"use strict";

//NYTapi
//myKey: aCzqpe8z4mtAFyQ1e1fJbxXrJUJuq8zD
//xample call: https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey
;

(function () {
  // ;( <-- starting it with ; seperates it from other code
  console.log('test2');
  var API_URL_BASE = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  var searchEl = document.querySelector('[name="key"]');
  var resultBox = document.querySelector('.resultBox');
  var getBtn = document.querySelector('[name="get"]');
  var myKey = "aCzqpe8z4mtAFyQ1e1fJbxXrJUJuq8zD";
  var statusLbl = document.querySelector('[name="status"]'); /////////////GET REQUEST

  function makeGetRequest(event) {
    //changes value and calls getData function 
    //presents the browser from doing default behavior like refreshing/loading/ etc
    event.preventDefault();
    var searchValue = searchEl.value;
    console.log('value of key: ', searchValue);
    getData(searchValue);
  } //when user clicks button, run this function 


  getBtn.addEventListener('click', makeGetRequest);

  function handleGetResponse(response) {
    //updates and displays new values in Value input
    console.log('response!', response); //response = variable name for overall object
    //go into response>.data>>response(thier object name)>>docs

    var articles = response.data.response.docs;

    for (var i = 0; i < articles.length; i++) {
      var searchResult = document.createElement("div");
      var searchText = document.createElement("p"); //give it content

      var searchData = articles[i].headline.main;
      searchText.textContent = searchData;
      searchResult.appendChild(searchText);
      document.body.appendChild(searchResult);
      console.log("articles added");
    }
  }

  function getData(key) {
    console.log('fetching with GET:' + key);
    console.log('fetching:' + API_URL_BASE); //axios go to this url, fetch this value, then call this function 

    axios.get(API_URL_BASE + "?q=" + key + '&api-key=' + myKey).then(handleGetResponse);
    console.log(API_URL_BASE);
  }
})();
//# sourceMappingURL=NYTapi.js.map

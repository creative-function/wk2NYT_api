"use strict";

console.log("hello chello");
var getBtn = document.querySelector('[name="get_timeline"]');
var qkSrchBtn = document.querySelector('[name="qk_srch"]');
var cstmSrchBtn = document.querySelector('[name="cstm_srch"]');
var qkSrchInput = document.querySelector('[name="qkSrchInputField"]');
var cstmSrchInput = document.querySelector('[name="cstmSrchInputField"]');
var cstmSrchLimit = document.querySelector('[name="count"]');
var cstmSrchType = document.querySelector('[name="result_type"]');

(function () {
  // ;( <-- starting it with ; seperates it from other code
  console.log('twitter-test2A,2B');
  var API_URL_BASE = '/twitter-proxy.php';
  var searchHandle = document.querySelector('[name="screen_name"]'); //const qkSrchInput = document.querySelector('[name="qkSrchInputField]')
  //const valueEl = document.querySelector('[name="value"]')
  //const getBtn = document.querySelector('[name="get_timeline"]')
  // const qkSrchBtn = document.querySelector('[name="qk_srch"]')
  // const cstmSrchBtn = document.querySelector('[name="cstm_srch"]')
  /////////////GET REQUEST SCREENNAME

  function makeTimelineRequest(event) {
    //changes value/calls getUserData()
    //presents the browser from doing default behavior like refreshing/loading/ etc
    event.preventDefault();
    var screenName = searchHandle.value;
    console.log('value of screenName: ', screenName);
    getUserData(screenName);
  } /////////////GET REQUEST quick search


  function makeQkSrchRequest(event) {
    //changes value/calls getUserData()
    //presents the browser from doing default behavior like refreshing/loading/ etc
    event.preventDefault();
    var quickSearch = qkSrchInput.value;
    console.log('value of quick query: ', quickSearch);
    getQueryData(quickSearch);
  } /////////////GET REQUEST custom search


  function makeCstmSrchRequest(event) {
    //changes value/calls getUserData()
    //presents the browser from doing default behavior like refreshing/loading/ etc
    event.preventDefault();
    var customSearch = cstmSrchInput.value;
    var customLimit = cstmSrchLimit.value;
    var customSortBy = cstmSrchType.value;
    console.log('value of custom query: ', customSearch, customLimit, customSortBy);
    getCustomSrchData(customSearch, customLimit, customSortBy);
  } //when user clicks button, run this function 


  getBtn.addEventListener('click', makeTimelineRequest);
  qkSrchBtn.addEventListener("click", makeQkSrchRequest);
  cstmSrchBtn.addEventListener("click", makeCstmSrchRequest);

  function handleTimelineResponse(screenNameResult) {
    //updates and displays new values in Value input
    console.log('response!', screenNameResult); //the tree to get to the value is inside response, inside data, inside another data, and there is the value. i.e  
    // response:
    //     data[
    //         data{
    //            value: "hello"
    //            id: "example"
    //         }
    //     ]
    // const value = response.data.data.value
    // //upatdae valueEl's value to = value variable 
    // valueEl.value = value
    //create a variable to access the specific object we are looking for
    //submissions = all of the data objects from the screenNameResult response/get

    var submissions = screenNameResult.data; //loop through all the screenNameResult.data arrays

    for (var i = 0; i < submissions.length; i++) {
      //create div
      var searchResult = document.createElement("div"); // create element for div to hold

      var searchText = document.createElement("p"); //define a variable for each screenNameResult.data.text object 

      var searchData = submissions[i].text; // the <p> text content = an individual text object from array 

      searchText.textContent = searchData; //add the <p> to the <div>

      searchResult.appendChild(searchText); //add the <div> to the body
      //document.body.appendChild(searchResult);

      console.log("submissions added"); //add div to particular section

      var resultDisplay = document.querySelector("#search-results");
      resultDisplay.appendChild(searchResult);
    } //update H1 with info


    var resultTitle = document.querySelector(".result-message");
    var searchTerm = document.querySelector(".search-term");
    resultTitle.innerText = "Timeline For: " + " ";
    searchTerm.innerText = searchHandle.value; //searchTerm.style.color ="blue";
  }

  function handleQueryResponse(SrchResult) {
    //updates and displays new values in Value input
    var qkSrchEntries = SrchResult.data.statuses;
    console.log('qkSrchResponse!', SrchResult); //loop through all the SrchResult.data arrays

    for (var i = 0; i < qkSrchEntries.length; i++) {
      //create div
      var entryResult = document.createElement("div"); // create element for div to hold

      var entryText = document.createElement("p"); //define a variable for each qkSrchResult.data.text object 

      var entryData = qkSrchEntries[i].text; // the <p> text content = an individual text object from array 

      entryText.textContent = entryData; //add the <p> to the <div>

      entryResult.appendChild(entryText); //add the <div> to the body
      //document.body.appendChild(searchResult);

      console.log("entries added"); //add div to particular section

      var resultDisplay = document.querySelector("#search-results");
      resultDisplay.appendChild(entryResult);
    } //update H1 with info


    var resultTitle = document.querySelector(".result-message");
    var searchTerm = document.querySelector(".search-term");
    resultTitle.innerText = "Search Results For: " + " ";
    searchTerm.innerText = qkSrchInput.value;
    searchTerm.style.color = "blue";
  }

  function handleCstmQueryResponse(cstmSrchResult) {
    //updates and displays new values in Value input
    console.log('cstmSrchResponse!', cstmSrchResult);
    var cstmSrchEntries = cstmSearchResult.data;

    for (var i = 0; i < cstmSrchEntries.length; i++) {
      //create div
      var cstmEntryResult = document.createElement("div"); // create element for div to hold

      var cstmEntryText = document.createElement("p"); //define a variable for each cstmSrchResult.data.text object 

      var cstmEntryData = cstmSrchEntries[i].name; // the <p> text content = an individual text object from array 

      cstmEntryText.textContent = cstmEntryData; //add the <p> to the <div>

      cstmEntryResult.appendChild(cstmEntryText); //add the <div> to the body
      //document.body.appendChild(searchResult);

      console.log("custom entries added"); //add div to particular section

      var resultDisplay = document.querySelector("#search-results");
      resultDisplay.appendChild(cstmEntryResult);
    }
  }

  function getUserData(screenName) {
    console.log('fetching with GET:' + screenName); //axios go to this url, lok at the paramets, match the one I want, then call this function 

    axios.get(API_URL_BASE, {
      params: {
        //twitter_variables: my variables 
        op: 'user_timeline',
        screen_name: screenName //my variable (key, seach-term, etc) 

      }
    }).then(handleTimelineResponse);
  }

  function getQueryData(queryInput) {
    console.log('fetching with GET:' + queryInput); //axios go to this url, lok at the paramets, match the one I want, then call this function 

    axios.get(API_URL_BASE, {
      params: {
        //twitter_variables: my variables 
        op: 'search_tweets',
        q: queryInput //my variable (key, seach-term, etc) 

      }
    }).then(handleQueryResponse);
  }

  function getCustomSrchData(customInput, customLimit, customSortBy) {
    console.log('fetching with GET:' + customInput, customLimit, customSortBy); //axios go to this url, lok at the paramets, match the one I want, then call this function 

    axios.get(API_URL_BASE, {
      params: {
        //twitter_variables: my variables 
        op: 'user_search',
        q: customInput,
        //my variable (key, seach-term, etc) 
        result_type: customSortBy,
        count: customLimit
      }
    }).then(handleCstmQueryResponse);
  }
})();
//# sourceMappingURL=main.js.map

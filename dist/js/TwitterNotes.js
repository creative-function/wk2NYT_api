"use strict";

console.log("hello chello");
;

(function () {
  // ;( <-- starting it with ; seperates it from other code
  console.log('twitter-notes');
  var API_URL_BASE = '/twitter-proxy.php'; //you can query by <form> and target its children elements

  var timelinelineFormEl = document.querySelector('form[name="timeline]');
  var quickSearchFormEl = document.querySelector('form[name="timeline]'); //for cleanliness, its time to start declaring local variables where they belong
  // all elements that have an event listener can go in here (all buttons)

  function setupEventListeners() {
    var timelineBtnEl = timelineformEl.querySelector('button');
    timelineBtnEl.addEventListener('click', handleTimelinesearch); // do the same for each bytton
  } //needs 3 handle"Timelinesearch"functions for the 3 different types of forms:


  function handleTimelinesearch(event) {
    //changes value and calls getData function 
    //presents the browser from doing default behavior like refreshing/loading/ etc
    event.preventDefault();
    var screenName = timelinelineFormEl.querySelector("[name=screenname]");
    console.log('fetching with GET:' + screenName); //axios go to this url, lok at the paramets, match the one I want, then call this function 

    axios.get(API_URL_BASE, {
      params: {
        //twitter_variables: my variables 
        op: 'user_timeline',
        screen_name: screenName //my variable (key, seach-term, etc) 

      }
    }).then(handleTimelineSearchResults);
  } //needs only 2 event listener response handlers for the 2 different types of api calls 
  //the 3rd api call will get same data from the results/params of the other 2, doesn't need its own handler, nest it inside the proper one


  function handleTimelineSearchResults(timelineResult) {
    //updates and displays new values 
    console.log('timeline search results', timelineResult); //call function and pass these two items as its parameters

    displayTweets(response.data, timelineformEl.querySelector('.results ul')); //const tweetArray = response.data
    //const resultsEl - timelineFormEl.querySelector('.results ul'))
    //aka displayTweets(tweetarray, resultsel)
  } //only need one of these to handle all results


  function displayTweets(tweetArray, resultsEl) {
    //parameters(which array / which results <div>) 
    //are defined in the handler function that calls this one. 
    console.log("showing tweets,", tweetArray, resultsEl);
    resultsEl.innerHTML = " "; //hacky shortcut to clear results div 

    for (var i = 0; i < tweetArray.lentgh; i++) {
      var li = document.createElement('li');
      var p = document.createElement('p');
      var tweet = tweetArray[i];
      p.textContent = tweet.text;
      li.appendChild(p);
      resultsEl.appendChild(li);
    }
  }

  setupEventListeners();
})(); // reg expresisons help parse and normalize data 
// reg ex linking:
//create a reg expression that finds patterns (i.e all handles have @)
//define the strings as urls and make them live
//enable highlighting of keyword in results. (keyword.style.color = "")
//types of reg ex
// /abc/.test('abc')
// abc.match(/abc/)
//# sourceMappingURL=TwitterNotes.js.map

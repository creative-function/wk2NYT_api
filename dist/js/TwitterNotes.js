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
})(); //hint: regEXP goes in display tweets only 
// reg expresisons help parse and normalize data 
// reg ex linking:
//create a reg expression that finds patterns (i.e all handles have @)
//define the strings as urls and make them live
//enable highlighting of keyword in results. (keyword.style.color = "")
//types of reg ex [order matters!]
// /abc/.test('abc')
// abc.match(/abc/)
// data.match(/ABC/i)  the /i ignores case spelling 
// data.match(/abc/g) the /g returns all instances in an array
// data.match(/test/ig)  returns all any-case instances of "test" in an array
// data.match(/(test group)/ig) returns (test group) in a group   
// data.match(/(test)(group)/ig) returns all seperate any-case instances of ("test") and ("group") in an respective group array 
//LOOKING FOR A TWEET HANDLE 
// /@-symbol,\s= whitespace [\S= no-whitespace]
//tweet.match(/@\s/) >> show me any @symbol followed by whitespace
//OR
//tweet.match(/\s@/) >> show me any whitepsace followed by @ symbol
//OR [\S= no-whitespace]
//tweet.match(/\S@/) >> show me any non-whitepsace that is followed by @ symbol
//BETTER
//tweet.match(/@\S/) >> show me any @ symbol that is followed by a non-whitepsace
//EVEN BETTER [+ = match one or more characters of the previous expression ]
//tweet.match(/@\S+/) >> show me any @ symbol that is followed by [+ (one or more)] non-whitepsace
//ALTERNATE [* = match 0 or more characters of the previous expression ]
//tweet.match(/@\S*/) >> show me any @ symbol that is followed by [* (0 or more)] non-whitepsace
///COMBOS
//\d=any number, {3} amount of #s looking for in this group, \D= non number, *= any (if any) 
// (\(d{3}\D*(\d{3})\D*(\d{4})/ >> show me a group of 3#'s, any non numberical thing (if any) [x2] abd a group of four numbers >> i.e 404-444-4444 
//(\(d{3}\D*(\d{3})\D*(\d{4})/ >> i.e 404-444-4444 
///RANGES
// brackets are serach parameters
//tweet.match(/@[a-z0-9]+/i) >> show me @ [followed by any *single* character found in this range] +[or more]/i = ignoring case spelling 
// \w = word
//tweet.match(/@\w+/g) >> show me @ followed by any word and group those words into an array 
//HASTAGS
//tweet.match(/#\w+)>>>> show me # followed by any word 
//VARIABLES
// var handleRegex =/@\w+/g
//tweet.match(handleRegex)  
//PASSING STRINGS (hint: keyword highlighting)
//written in strings, use \ to escape "" and include following character as special character
// var handleRegex2 = new RegExp("@\\w+","g") >>[is equal to var handleRegex = /@\w+/g]
//tweet.match(handleRegex2)  
//LINKING/HIGHLIGHTING RESULTS
//REPLACE PRINTS RESULTS AS $VARs
//tweet.replace ('a'[with],'b')
//replace a regEX expresion result with a string or something else: 
//tweet.replace ('/breaking news/,'BREAKING NEWS')
//replace ALL regEX expresion results with a string: 
//tweet.replace ('/breaking news/g,'BREAKING NEWS')
//REPLACE WIH URLS: 
//i.e: tweet.replace ('/(@\w+)/g,'$3 $1') 
//finds groups of [at symbols and words]/put in array 
//i.e results = (3) 1: APPLE 2:ORANGE 3: GRAPE
//tweet.replace ('/(@\w+)/g,'$3 $1') >>  //i.e results = (3) 1: GRAPE 2:ORANGE 3: APPLE
// ADD ELEMENTS..
//tweet.replace ('/(@\w+)/g,<span>$3</span>) //i.e results = ((3) 1: APPLE 2:ORANGE 3: <span> GRAPE </span>

/* function displayTweets(tweetArray, resultsEl){ 
    console.log("showing tweets,", tweetArray, resultsEl)
    resultsEl.innerHTML = " "; //hacky shortcut to clear results div 
    for(let i=0; i<tweetArray.lentgh; i++){
        const li = document.createElement('li')
        const p = document.createElement('p')
        const tweet = tweetArray[i]

  **NEW**>>>  let highlightedTweet = tweet.text//use regex to highlight the user's keyword and make               any urls, handles, or hashtags into linkas using highlightedTweet.replace()

        p.textContent = tweet.text
        li.appendChild(p)
        resultsEl.appendChild(li)
    }
}*/
//# sourceMappingURL=TwitterNotes.js.map

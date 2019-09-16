console.log("hello chello");
const getBtn = document.querySelector('[name="get_timeline"]')
const qkSrchBtn = document.querySelector('[name="qk_srch"]')
const cstmSrchBtn = document.querySelector('[name="cstm_srch"]')

const qkSrchInput = document.querySelector('[name="qkSrchInputField"]')

const cstmSrchInput = document.querySelector('[name="cstmSrchInputField"]')
const cstmSrchLimit = document.querySelector('[name="count"]')
const cstmSrchType = document.querySelector('[name="result_type"]')


;(function(){ // ;( <-- starting it with ; seperates it from other code34
    console.log ('twitter-test2A,2B');
    const API_URL_BASE= '/twitter-proxy.php'
    const searchHandle = document.querySelector('[name="screen_name"]')
    //const qkSrchInput = document.querySelector('[name="qkSrchInputField]')

    
    //const valueEl = document.querySelector('[name="value"]')
    //const getBtn = document.querySelector('[name="get_timeline"]')
    // const qkSrchBtn = document.querySelector('[name="qk_srch"]')
    // const cstmSrchBtn = document.querySelector('[name="cstm_srch"]')
    
    /////////////GET REQUEST SCREENNAME

    function makeTimelineRequest(event){ //changes value/calls getUserData()
        //presents the browser from doing default behavior like refreshing/loading/ etc
        event.preventDefault()
        const screenName = searchHandle.value
        console.log('value of screenName: ', screenName)
       getUserData(screenName)
    }
   
    /////////////GET REQUEST quick search


    function makeQkSrchRequest(event){ //changes value/calls getUserData()
        //presents the browser from doing default behavior like refreshing/loading/ etc
        event.preventDefault()
        const quickSearch = qkSrchInput.value
        console.log('value of quick query: ', quickSearch)
        getQueryData(quickSearch)
    }
    
    /////////////GET REQUEST custom search

    function makeCstmSrchRequest(event){ //changes value/calls getUserData()
        //presents the browser from doing default behavior like refreshing/loading/ etc
        event.preventDefault()
        const customSearch = cstmSrchInput.value
        const customLimit = cstmSrchLimit.value
        const customSortBy =  cstmSrchType.value
        console.log('value of custom query: ', customSearch, customLimit, customSortBy)
        getCustomSrchData(customSearch, customLimit, customSortBy)
    }

    //when user clicks button, run this function 
    getBtn.addEventListener('click', makeTimelineRequest);
    qkSrchBtn.addEventListener("click", makeQkSrchRequest);cstmSrchBtn.addEventListener("click", makeCstmSrchRequest) ;

    function handleTimelineResponse(screenNameResult){ //updates and displays new values in Value input
        console.log('response!', screenNameResult)
                    //the tree to get to the value is inside response, inside data, inside another data, and there is the value. i.e  
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
        var submissions =  screenNameResult.data;
        //loop through all the screenNameResult.data arrays
        for (var i= 0; i < submissions.length; i++){
            //create div
            let searchResult = document.createElement("div");
            // create element for div to hold
            let searchText = document.createElement("p");
            //define a variable for each screenNameResult.data.text object 
            let searchData = submissions[i].text;
            // the <p> text content = an individual text object from array 
            searchText.textContent = searchData;
            //add the <p> to the <div>
            searchResult.appendChild(searchText);
            //add the <div> to the body
                //document.body.appendChild(searchResult);
            console.log("submissions added")
            //add div to particular section
            let resultDisplay = document.querySelector("#search-results");
            resultDisplay.appendChild(searchResult);
        }
        //update H1 with info
        let resultTitle = document.querySelector(".result-message");
        let searchTerm = document.querySelector(".search-term");
        resultTitle.innerText = "Timeline For: " + " ";
        searchTerm.innerText = searchHandle.value;
        //searchTerm.style.color ="blue";
    }

    function handleQueryResponse(SrchResult){ //updates and displays new values in Value input
        var qkSrchEntries =  SrchResult.data.statuses;
        console.log('qkSrchResponse!', SrchResult)
        //loop through all the SrchResult.data arrays
        for (var i= 0; i < qkSrchEntries.length; i++){
            //create div
            let entryResult = document.createElement("div");
            // create element for div to hold
            let srchEntryText = document.createElement("p");
            let srchEntryText1 = document.createElement("p");
            //define a variable for each qkSrchResult.data.text object 
            let entryData = qkSrchEntries[i].text;
            let entryUser = qkSrchEntries[i].user.name;
            //create labels for each info 
            let TextLabelA = document.createElement("label");
            let TextLabelB = document.createElement("label");
            // add class names for CSS styling
            entryResult.classList.add("srchResultBox");
            TextLabelA.classList.add("resultTitle");
            TextLabelB.classList.add("resultTitle");
       
            srchEntryText.classList.add("srchResult");
            srchEntryText1.classList.add("srchResult");
            //add label names to label
            TextLabelA.textContent = "Status: ";
            TextLabelB.textContent = "Tweeted by: ";
            // the <p> text content = an individual text object from array 
            srchEntryText.textContent = entryData;
            srchEntryText1.textContent = entryUser;
            //add the <p> to the <div>
            entryResult.appendChild(TextLabelA);
            entryResult.appendChild(srchEntryText);
            entryResult.appendChild(TextLabelB);
            entryResult.appendChild(srchEntryText1);
            //add the <div> to the body
                //document.body.appendChild(searchResult);
            console.log("entries added")
            //add div to particular section
            let resultDisplay = document.querySelector("#search-results");
            resultDisplay.appendChild(entryResult);
        }
        //update H1 with info
        let resultTitle = document.querySelector(".result-message");
        let searchTerm = document.querySelector(".search-term");
        resultTitle.innerText = "Search Results For: " + " ";
        searchTerm.innerText = qkSrchInput.value;
        searchTerm.style.color ="blue";
    
    }

    function handleCstmQueryResponse(cstmSrchResult){ //updates and displays new values in Value input
        
        console.log('cstmSrchResponse!', cstmSrchResult)
        var cstmSrchEntries = cstmSrchResult.data;
        let resultDisplay = document.querySelector("#search-results");
        resultDisplay.innerHTML=" ";
        for (var i= 0; i < cstmSrchEntries.length; i++){
        
            //create div
            let cstmEntryResult = document.createElement("div");
            // create elements for div to hold
            let cstmEntryText1 = document.createElement("p");
            let cstmEntryText2 = document.createElement("p");
            let cstmEntryText3 = document.createElement("p");
            //and thier H1 lables
            let TextLabel1 = document.createElement("label");
            let TextLabel2 = document.createElement("label");
            let TextLabel3 = document.createElement("label");
            //define a variable for each cstmSrchResult.data.text object 
            let cstmEntryName = cstmSrchEntries[i].name;
            let cstmEntryUserName = cstmSrchEntries[i].screen_name;
            let cstmEntryDesc = cstmSrchEntries[i].description;
            // add class names for CSS styling
            cstmEntryResult.classList.add("srchResultBox");
            TextLabel1.classList.add("resultTitle");
            TextLabel2.classList.add("resultTitle");
            TextLabel3.classList.add("resultTitle");
            cstmEntryText1.classList.add("srchResult");
            cstmEntryText2.classList.add("srchResult");
            cstmEntryText3.classList.add("srchResult");
            // define labels
            TextLabel1.textContent = "Name: ";
            TextLabel2.textContent = "User Name: ";
            TextLabel3.textContent = "Status: ";
            // the <p> text content = an individual text object from array 
            cstmEntryText1.textContent = cstmEntryName;
            cstmEntryText2.textContent = cstmEntryUserName;
            cstmEntryText3.textContent = cstmEntryDesc;
            //add the <p> to the <div>
            cstmEntryResult.appendChild(TextLabel1);
            cstmEntryResult.appendChild(cstmEntryText1);
            cstmEntryResult.appendChild(TextLabel2);
            cstmEntryResult.appendChild(cstmEntryText2);
            cstmEntryResult.appendChild(TextLabel3);
            cstmEntryResult.appendChild(cstmEntryText3);
            //add the <div> to the body
                //document.body.appendChild(searchResult);
            console.log("custom entries added")
            //add div to particular section
            resultDisplay.appendChild(cstmEntryResult);
        }
        //update H1 with info
        let resultTitle = document.querySelector(".result-message");
        let cstmSearchTerm = document.querySelector(".search-term");
        resultTitle.innerText = "Search Results For: " + " ";
        cstmSearchTerm.innerText = cstmSrchInput.value;
        cstmSearchTerm.style.color ="green"; 
    }
  

    function getUserData(screenName){ 
        console.log('fetching with GET:' + screenName)
        //axios go to this url, lok at the paramets, match the one I want, then call this function 
        axios.get(API_URL_BASE,{
            params: { 
                //twitter_variables: my variables 
                op: 'user_timeline',
                screen_name: screenName //my variable (key, seach-term, etc) 
            }
        }).then(handleTimelineResponse)
    }

    function getQueryData(queryInput){ 
        console.log('fetching with GET:' + queryInput)
        //axios go to this url, lok at the paramets, match the one I want, then call this function 
        axios.get(API_URL_BASE,{
            params: { 
                //twitter_variables: my variables 
                op: 'search_tweets',
                q: queryInput//my variable (key, seach-term, etc) 
            }
        }).then(handleQueryResponse)
    }

    function getCustomSrchData(customInput, customLimit, customSortBy){ 
        console.log('fetching with GET:' + customInput, customLimit, customSortBy)
        //axios go to this url, lok at the paramets, match the one I want, then call this function 
        axios.get(API_URL_BASE,{
            params: { 
                //twitter_variables: my variables 
                op: 'user_search',
                q: customInput,//my variable (key, seach-term, etc) 
                result_type:customSortBy,
                count:customLimit, 
            }
        }).then(handleCstmQueryResponse)
    }

})()


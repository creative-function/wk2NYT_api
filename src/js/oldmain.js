console.log("hello chello");
const getBtn = document.querySelector('[name="get_timeline"]')
const qkSrchBtn = document.querySelector('[name="qk_srch"]')
const cstmSrchBtn = document.querySelector('[name="cstm_srch"]')

;(function(){ // ;( <-- starting it with ; seperates it from other code
    console.log ('twitter-test1');
    const API_URL_BASE= '/twitter-proxy.php'
    const searchHandle = document.querySelector('[name="screen_name"]')
    //const valueEl = document.querySelector('[name="value"]')
    //const getBtn = document.querySelector('[name="get_timeline"]')
    // const qkSrchBtn = document.querySelector('[name="qk_srch"]')
    // const cstmSrchBtn = document.querySelector('[name="cstm_srch"]')

     /////////////GET REQUEST

     function makeGetRequest(event){ //changes value and calls getData function 
        //presents the browser from doing default behavior like refreshing/loading/ etc
        event.preventDefault()
        const screenName = searchHandle.value
        console.log('value of screenName: ', screenName)
       getData(screenName)
    }
   
    //when user clicks button, run this function 
    getBtn.addEventListener('click', makeGetRequest)


    function handleGetResponse(screenNameResult){ //updates and displays new values in Value input
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

    function getData(screenName){ 
        console.log('fetching with GET:' + screenName)
        //axios go to this url, lok at the paramets, match the one I want, then call this function 
        axios.get(API_URL_BASE,{
            params: { 
                //twitter_variables: my variables 
                op: 'user_timeline',
                screen_name: screenName //my variable (key, seach-term, etc) 
            }
        }).then(handleGetResponse)
    }


})()
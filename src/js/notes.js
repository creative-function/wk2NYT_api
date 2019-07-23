//myKey: aCzqpe8z4mtAFyQ1e1fJbxXrJUJuq8zD

//xample call: https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey

;(function(){ // ;( <-- starting it with ; seperates it from other code
    console.log ('test2')
    const API_URL_BASE= 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=[key]&api-key=[aCzqpe8z4mtAFyQ1e1fJbxXrJUJuq8zD'
    const searchEl = document.querySelector('[name="key"]')
    //const valueEl = document.querySelector('[name="value"]')
    const getBtn = document.querySelector('[name="get"]')
    const postBtn = document.querySelector('[name="post"]')
    const statusLbl = document.querySelector('[name="status"]')

    /////////////GET REQUEST

    function makeGetRequest(event){ //changes value and calls getData function 
        //presents the browser from doing default behavior like refreshing/loading/ etc
        event.preventDefault()
        const searchValue = searchEl.value
        console.log('value of key: ', searchValue)
        getData(searchValue)
    }

        
    //when user clicks button, run this function 
    getBtn.addEventListener('click', makeGetRequest)

    function handleGetResponse(response){ //updates and displays new values in Value input
        console.log('response!', response)
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
    }

    function getData(key){ 
        console.log('fetching with GET:' + key)
        //axios go to this url, fetch this value, then call this function 
        axios.get(API_URL_BASE).then(handleGetResponse)
    }
})()



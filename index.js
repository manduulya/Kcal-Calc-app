const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/food-database/parser';
const apiKey = 'ac0e75934fa1cfb2f8753a18b9962b46';
const apiID = '6fb1f813';
let STORE = [
]

//welcome screen displaying 
$('#welcome-screen').on('click', '.welcome-button', function(){
    $('#welcome-screen').addClass('hide');
    $('.main-function').removeClass('hide');
})

//watching form submit with user's input
function watchForm(){
    $('#user-input-form').submit(event =>{
        event.preventDefault();
        const userList = $('#user-list').val();
        const quantity = $('#quantity').val();
        $('#user-list').val('');
        getItem(userList, quantity);
    });

}

//get request 
function getItem(query, quantity, energy1){
    const params = {
        app_id: apiID,
        app_key: apiKey,
        ingr: query
    };
    const queryString = formatQueryParams(params)
    const url = apiURL + '?' + queryString;

    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResult( query, responseJson, quantity))
        .catch(err => {
            $('#result-screen').addClass('hide');
            $('#js-error-message').removeClass('hide');
            $('#js-error-message').text(`We couldn't find any results for that. Try something else.`);
        })        
}

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

//displaying results to DOM
function displayResult(userList, responseJson, quantity, measure){

    // for(let i = 0; i<responseJson.hints.length; i++){        
        const energy1 = responseJson.hints[0].food.nutrients.ENERC_KCAL * quantity;
        
        STORE.push({ingredient: userList, quantity: quantity, energy: energy1});
        $('.result-screen-divdiv').append(
            `<div>
                <ul class="result-list">
                    <li><p class="result-header">${responseJson.hints[0].food.label}</p></li>
                    <li><p>${quantity}</p></li>
                    
                    <li><p>${responseJson.hints[0].food.nutrients.ENERC_KCAL * quantity} kcal</p></li>
                </ul>
            </div>`
        )
}
//function to display measurement type 


$('#user-input-form').on('click', '.add-to-list', function(){
    $('#result-screen').removeClass('hide');
    $('#js-error-message').addClass('hide');
})
    
//calculation of result 
function calculateResults(){
    $('#result-screen').on('click', '.calculate-button', function (){
        let totalCalorie = 0;

        STORE.forEach(function(STORE) {
        totalCalorie += STORE.energy;
    });
        $('.main-function').addClass('hide');
        $('#result-screen').addClass('hide');
        $('#calc-screen').removeClass('hide');
        $('#calc-screen').append(
            `<div>
                <h2>Your total calorie consumption is:</h2>
                <h1>${totalCalorie}</h1>
                <button class='refresh-page-button' onClick="window.location.reload();">Refresh Page</button>
            </div>`
        );
    })
}


$(calculateResults);
$(watchForm);
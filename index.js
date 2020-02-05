// 'use strict';

const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/food-database/parser';
const apiKey = 'ac0e75934fa1cfb2f8753a18b9962b46';
const apiID = '6fb1f813';
// let energy1 = '';
let STORE = [
]

function watchForm(){
    $('#user-input-form').submit(event =>{
        event.preventDefault();
        const userList = $('#user-list').val();
        // STORE.ingredient = userList;
        const quantity = $('#quantity').val();
        // STORE.quantity = quantity;
        // const energy1 = responseJson.parsed[i].food.nutrients.ENERC_KCAL * quantity;
        STORE.push({ingredient: userList, quantity: quantity});
        // STORE.energy = energy1;
        $('#user-list').val('');
        getItem(userList, quantity);
        console.log(STORE);
    });
}

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
        .then(responseJson => displayResult(responseJson, quantity, energy1))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong ${err.message}`);
        })
        console.log(url);
}

// function addItemToStore(ingredient, quantity, energy){
//     STORE.push({
//         ingredient: userList, quantity:quantity, energy: energy
//     })
// }

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResult(responseJson, quantity){

    for(let i = 0; i<responseJson.parsed.length; i++){

        const energy1 = responseJson.parsed[i].food.nutrients.ENERC_KCAL * quantity;
        STORE.push({energy: energy1});
        $('#result-screen').append(
            `<div>
                <ul class="result-list">
                    <li><p class="result-header">${responseJson.parsed[i].food.label}</p></li>
                    <li><p>${quantity}</p></li>
                    <li><p>${responseJson.parsed[i].food.nutrients.ENERC_KCAL * quantity} kcal</p></li>
                </ul>
            </div>`
        )
    }
    $('#result-screen').removeClass('hide');
    console.log('working');
}


function calculateResults(){
    $('.calculate-button').click(event => {
        var val = STORE.reduce(function(previousValue, currentValue) {
            return {
              energy: previousValue.energy + currentValue.energy,
            }
          });
          console.log(val);
        })
    }

$(calculateResults)
$(watchForm);
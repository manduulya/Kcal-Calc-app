'use strict';

const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/food-database/parser';
const apiKey = 'ac0e75934fa1cfb2f8753a18b9962b46';
const apiID = '6fb1f813';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResult(responseJson){

    $('#result-screen').empty();

    for(let i = 0; i<responseJson.parsed.length; i++){
        $('#result-screen').append(
            `<div>
                <ul class="result-list">
                    <li><p class="result-header">${responseJson.parsed[i].food.label}</p></li>
                    <li><h3>Energy: </h3><p>${responseJson.parsed[i].food.nutrients.ENERC_KCAL} kcal</p></li>
                </ul>
            </div>`
        )
    }
    $('.main-function').addClass('hide');
    $('#result-screen').removeClass('hide');
    console.log('working');
}

function calcTotalKcal(query){
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
        .then(responseJson => displayResult(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong ${err.message}`);
        })
        console.log(url);
}

function watchForm(){
    $('form').submit(event =>{
        event.preventDefault();
        const userList = $('#user-list').val();
        calcTotalKcal(userList);
    });
}

$(watchForm);
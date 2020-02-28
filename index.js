const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/food-database/parser';
const apiKey = 'ac0e75934fa1cfb2f8753a18b9962b46';
const apiID = '6fb1f813';
let STORE = [
]

//welcome screen switching to main page
$('#welcome-screen').on('click', '.welcome-button', function () {
    //click on start button to display mainfunction page and hide welcome screen
  $('#welcome-screen').addClass('hide');
  $('.main-function').removeClass('hide');
})

//watching form submit with user's input
function watchForm() {
  $('#user-input-form').submit(event => {
      //preventing to submit a form
    event.preventDefault();
    //declaring variable from user ingredient input
    const userList = $('#user-list').val();
    //declaring variable from user quantity input
    const quantity = $('#quantity').val();
    $('#user-list').val('');
    getItem(userList, quantity);
    //displaying progress bar
    $('.progress-bar').removeClass('hide');
  });
}

//get request 
function getItem(query, quantity, energy1) {
  const params = {
    app_id: apiID,
    app_key: apiKey,
    ingr: query
  };
  const queryString = formatQueryParams(params)
  const url = apiURL + '?' + queryString;

  //get request
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    //display response from API 
    .then(responseJson => displayResult(query, responseJson, quantity))
    //if error occurs, hide result screen and display error message
    .catch(err => {
        //if error hide result screen and display error message
      $('#result-screen').addClass('hide');
      $('#js-error-message').removeClass('hide');
      $('#js-error-message').text(`We couldn't find any results for that. Try something else.`);
    })
}
//encoding a URI by replacing each instance of certain characters
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//displaying results to DOM
function displayResult(userList, responseJson, quantity) {
    //hiding progress bar
    $('.progress-bar').addClass('hide');
    //declaring variable of each lists calorie
  const energy1 = responseJson.hints[0].food.nutrients.ENERC_KCAL * quantity;
    //declaring varaible of total calories 
  let totalCalorie = 0;
    //adding items to STORE array
  STORE.push({ ingredient: userList, quantity: quantity, energy: energy1 });
    //manipulating DOM
  $('.result-screen-divdiv').append(
    `<tr class="result-list">
        <td><p>${responseJson.hints[0].food.label}</p></li>
        <td><p>${quantity}</p></li>
        <td><p>${responseJson.hints[0].food.nutrients.ENERC_KCAL * quantity} kcal</p></li>
    </tr>`
  )
    //for each loop through the energy calorie of each lists
  STORE.forEach(function (STORE) {
    totalCalorie += STORE.energy;
  });
  $('.js-total-calories').text(`${totalCalorie}`);
}
//adding item to the list
$('#user-input-form').on('click', '.add-to-list', function () {
    //displaying result screen
  $('#result-screen').removeClass('hide');
    //hiding error message if it was displayed
  $('#js-error-message').addClass('hide');
})

//Reset the listing 
function resetList() {
  $('#result-screen').on('click', '.reset-button', function () {
      //resetting total number of calorie in the DOM
    $('.js-total-calories').text(0);
        //removing elements from DOM
    $('.result-screen-divdiv').empty();
        //refreshing STORE array
    STORE = [];
    //hiding result screen
    $('#result-screen').addClass('hide');
  });
};

$(resetList);
$(watchForm);
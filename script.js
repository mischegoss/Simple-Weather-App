let currentLocation;
let temperature;
let forecast;
let humidity;

//This uses IP-API to find  user's current location
function findLocation () {
    $.ajax('http://ip-api.com/json')
    .then(
        function success(response) {
            currentLocation = response.city;
            $(".current-location").text(currentLocation);
            cardData(currentLocation);

           
  },
  
        function fail(data, status) {
            console.log('Request failed.  Returned status of',
                        status);
            currentLocation = "Jerusalem";
            $(".current-location").text("We couldn't find your current city.");
            cardData(currentLocation);
        }

    );
  }

// End IP-API

// Weather API Call


function cardData() {
    const appId = "da9ee3ddb46b386ecd69f797bbede23b";
    const cityName = currentLocation;
    console.log(cityName)
    const weather = "http://api.openweathermap.org/data/2.5/weather?q=" + currentLocation + "&APPID=" + appId;

    $.getJSON(weather,function(json){
        console.log(json)
        temperature = Math.round((parseInt(json.main.temp) * 9/5) - 459.67);
        forecast = json.weather[0].description;
        humidity = json.main.humidity;

       console.log(temperature, forecast, humidity)
    });
    

}
//Creates a Weather Card

class WeatherDisplay {

    constructor(name, temperature, forecast, humidity) {
        this.name = name;
        this.temperature = temperature;
        this.forecast = forecast;
        this.humidity = humidity;
        
      }
    

//This creates the card
makeCard()  {
let newCard = $(".sample-card");
let myCard= $("<div/>")
myCard.addClass("card");

myCard.html("<img class='card-img-top' src='#' alt='Card image cap'>")

let cardBody = $("<div/>");
console.log(cardBody)
cardBody.addClass("card-body");
cardBody.html("<li class='list-group-item'>one</li> <li class='list-group-item'>two</li>  <li class='list-group-item'>three</li> ");
myCard.append(cardBody);

$(".sample-card").append(myCard);


}}

let s = new WeatherDisplay(currentLocation);

findLocation()

s.makeCard()


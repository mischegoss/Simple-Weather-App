
$( document ).ready(function() {

let currentLocation;
let temperature;
let forecast;
let humidity;


function setPopup() {
    $(".container").hide();

}

//This uses IP-API to find  user's current location
function findLocation () {
    $.ajax('http://ip-api.com/json')
    .then(
        function success(response) {
            currentLocation = response.city;
           
            let message = "It looks like it is a good day in " + currentLocation
             
            consoleText( [message, message, message], "text")
            $(".location-prompt").text(currentLocation);
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
    const cityName = (currentLocation).replace(/\s+/g, '');
    
    const weather = "http://api.openweathermap.org/data/2.5/weather?q=" + currentLocation + "&APPID=" + appId;

    

    $.getJSON(weather,function(json){
        console.log(json)
        temperature = Math.round((parseInt(json.main.temp) * 9/5) - 459.67);
        forecast = (json.weather[0].description)
        humidity = json.main.humidity;

       console.log(temperature, forecast, humidity);
       let forecastAsString = forecast.replace(/\s+/g, '');
       let myImage = "https://source.unsplash.com/200x200/?"+ cityName + ",forecast," + forecastAsString;
       console.log(myImage)
       $(".card-img-top").attr('src', myImage);
       $("#lmage-pic").attr('src', myImage);
$("#" + cityName + "-temperature" ).text(temperature);
$("#" + cityName + "-forecast" ).text(forecast);
$("#" + cityName + "-humidity" ).text(humidity);

 
    });
    let s = new WeatherDisplay(currentLocation, temperature, forecast, humidity);  
s.makeCard()
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
let cityName= (this.name).replace(/\s+/g, '');
let newCard = $(".sample-card");
let myCard= $("<div/>")
myCard.addClass("card");

myCard.html("<img class='card-img-top' src='#' alt='Card image cap'>")
$(".card-image-top").attr("id", cityName+ "card-image-top")

let cardBody = $("<div/>");
console.log(cardBody)
cardBody.addClass("card-body");
cardBody.html("<li class='list-group-item temperature'>one</li> <li class='list-group-item forecast'>two</li>  <li class='list-group-item humidity'>three</li> ");


myCard.append(cardBody);

newCard.append(myCard);

$(".temperature").attr("id", cityName + "-temperature");
$(".forecast").attr("id", cityName + "-forecast");
$(".humidity").attr("id", cityName + "-humidity");


}
}
/*You can add this to any text block with ID */
consoleText(["fancy butt", "smiley"], "header", "green")

/*This is the fancy way to type */
function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 100000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}
/*End of the fancy code going on */
findLocation()
setPopup()
}); //Document Ready End 
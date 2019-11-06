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







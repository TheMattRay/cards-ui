var breadcrumbs = [];
var backCardMemory;

$().ready(init);

$(document).keydown(function(e){
    switch(e.keyCode) { 
    	case 37:
       		//left
       		prevCard();
       		break;

       	case 39:
       		//right
       		nextCard();
       		break;

       	case 38:
       		//up
       		break;

       	case 40:
       		//down
       		break;
    }
});

function wireClickEvent(card) {
	console.log("wireClickEvent");
	$(card).click(function() {
		var code = $(this).attr("action");
		console.log("evaluating: " + code);
		eval(code);
	});
}

function init() {
	loadDefaultCard();
}

function sweepStage() {
	$(".content.stage").children().remove();
}

function nextCard() {
	var thisCard = $(".content.library [cardName='" + $(".content.stage .card:visible").attr("cardName") + "']").next();
	if(thisCard.length != 0) {
		loadCard(thisCard)
	}
	else {
		if($(".content.stage .card:visible").attr("cardName") == "backCard") {
			var thisCard = $(".content.library [cardName='" + backCardMemory + "']");
			loadCard(thisCard);
		}
		else {
			// do nothing
		}
	}
}

function prevCard() {
	var thisCard = $(".content.library [cardName='" + $(".content.stage .card:visible").attr("cardName") + "']").prev();
	if(thisCard.length != 0) {
		loadCard(thisCard);
	}
	else {
		if($(".content.stage .card:visible").attr("cardName") == "backCard") {
			// do nothing - we are already on the back card
		}
		else {
			showBackCard();
		}
	}
}

function goBack() {
	var lastCard = breadcrumbs.pop();
	var thisCard = $(".content.library [cardName='" + lastCard + "']");
	loadCard(thisCard);
}

function showBackCard() {
	backCardMemory = $(".content.stage .card:visible").attr("cardName");
	var thisCard = $(".content.system [cardName='backCard']");
	loadCard(thisCard);
}

function loadCard(card, setBreadcrumb) {
	sweepStage();
	var newCard = $(card).clone();
	wireClickEvent(newCard);
	newCard.show();
	newCard.appendTo($(".content.stage"));
	if(setBreadcrumb == true) {
		breadcrumbs[breadcrumbs.length] = $(card).attr("cardName");
	}
}

function loadDynamicCard(text) {
	//backCardMemory = $(".content.stage .card:visible").attr("cardName");
	var thisCard = $(".content.system [cardName='blankCard']");
	var thisCard = thisCard.clone();
	thisCard.find("h1").text(text);
	loadCard(thisCard);
}

function loadCardSetByName(cardSetName, setBreadcrumb) {
	var cardSet = $("[cardSetName='" + cardSetName + "']");
	loadCardSet(cardSet, setBreadcrumb);
}

function loadCardSet(cardSet, setBreadcrumb) {
	var thisCard = $(".content.library [cardName='" + $(".content.stage .card:visible").attr("cardName") + "']")
	sweepStage();
	console.log("cardSet:");
	console.log(cardSet);
	var newCard = $($(cardSet).find("[cardName]")[0]).clone();
	wireClickEvent(newCard);
	newCard.show();
	newCard.appendTo($(".content.stage"));
	console.log(newCard);
	//if(setBreadcrumb == true) {
		breadcrumbs[breadcrumbs.length] = $(thisCard).attr("cardName");
	//}
}

function loadDefaultCard() {
	var firstCardSet = $(".content.library .cardSet[cardSetName='home']");
	var firstCard = firstCardSet.children().first();
	firstCard = $(firstCard).clone();
	wireClickEvent(firstCard);
	firstCard.show();
	firstCard.appendTo($(".content.stage"));
}
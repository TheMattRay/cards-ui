var breadcrumbs = [];
var backCardMemory;

$().ready(init);

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
	$(card).clone().appendTo($(".content.stage"));
	if(setBreadcrumb == true) {
		breadcrumbs[breadcrumbs.length] = $(card).attr("cardName");
	}
}

function loadDefaultCard() {
	var firstCard = $(".content.library").children()[0];
	$(firstCard).clone().appendTo($(".content.stage"));
}
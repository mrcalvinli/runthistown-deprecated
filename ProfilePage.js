$(document).ready(function() {
	// Backend Stuff
	$("#name").html("Myname Mcgee");

	// Styling Javascript
	$("html").height($(window).height());
	setTimeout(function() {$(".rightSection").height($(".leftSection").height()) ;}, 200);

	$(window).resize(function() {
		$("html").height($(window).height());
	});

	// Functional JavaScript

	$("#totalDistIcon").tooltip({"placement": "right"});
	$("#totalCalIcon").tooltip({"placement": "right"});

	$("#goalsPlus").on("click", function() {
		var buttonHeight = parseInt($("#newGoalBtn").css("height")) + parseInt($("#newGoalContainer").css("padding")) + parseInt($("#newGoalContainer").css("padding"));
		$("#newGoalContainer").css("border-top", "1px solid grey");
		$("#newGoalContainer").animate({"height": buttonHeight, "padding-bottom": "5px"}, 300);
	});

	// Route entry template

	$(".routeEntry").on("click", function() {
		if ( $(this).css("height") == "40px" ) {
			$(this).css("height", "auto");
		} else {
			$(this).css("height", "40px");
		}
	});
});
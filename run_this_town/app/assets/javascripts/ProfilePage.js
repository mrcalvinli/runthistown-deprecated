$(document).ready(function() {
	// Backend Stuff
	$("#name").html("Myname Mcgee");

	// Styling Javascript
	/*$("html").height($(window).height());*/
	window.onload = function() {
		if ($(".rightSection").height() < $(".leftSection").height()) {
			$(".rightSection").height($(".leftSection").height()); 
		}
		
		// $("html").css("height", "auto");
	}

	/*$(window).resize(function() {
		$("html").height($(window).height());
	});*/

	// Functional JavaScript

	$("#totalDistIcon").tooltip({"placement": "right"});
	$("#totalCalIcon").tooltip({"placement": "right"});

	$("#goalsPlus").on("click", function() {
		var buttonHeight = parseInt($("#newGoalBtn").css("height")) + parseInt($("#newGoalContainer").css("padding")) + parseInt($("#newGoalContainer").css("padding"));
		$("#newGoalContainer").css("border-top", "1px solid grey");
		$("#newGoalContainer").animate({"height": buttonHeight, "padding-bottom": "5px"}, 300);
	});

	// Route entry template

	$(".profRouteEntry").on("click", function() {
		if ( $(this).css("height") == "40px" ) {
			$(this).css("height", "auto");
		} else {
			$(this).css("height", "40px");
		}
	});
});
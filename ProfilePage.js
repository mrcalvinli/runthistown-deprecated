$(document).ready(function() {
	$("html").height($(window).height());
	$(window).resize(function() {
		$("html").height($(window).height());
	});

	$("#totalDistIcon").tooltip({"placement": "right"});
	$("#totalCalIcon").tooltip({"placement": "right"});

	$("#goalsPlus").on("click", function() {
		var buttonHeight = parseInt($("#newGoalBtn").css("height")) + parseInt($("#newGoalContainer").css("padding")) + parseInt($("#newGoalContainer").css("padding"));
		$("#newGoalContainer").css("border-top", "1px solid grey");
		$("#newGoalContainer").animate({"height": buttonHeight, "padding-bottom": "5px"}, 300);
	});
});
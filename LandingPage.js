$(document).ready(function() {
	// Styling javascrip
	$(".jumbotron").css("height", $(window).height() - 100 -60);
	$("#moreInfo").height($(window).height() - 60);

	// Chevron animation
	function animateChevron() {
		console.log("called");
		$("#learnMoreChevron").animate({"margin-top": "10px"}, 750, function() {
			$("#learnMoreChevron").animate({"margin-top": "0px"}, 750);
		});
	}
	animateChevron();
	var chevronInterval = setInterval(animateChevron, 1500);

	// User Login Modal
	$("#getStarted").on("click", function() {
		$("#myModal").modal();
	});

	// Chevron Scroll click
	var container = $("body"),
		scrollTo = $("#moreInfo");
	$("#learnMoreChevron").on("click", function() {
		container.animate({scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 60}, 1500, "easeInOutQuint")    
	});
});
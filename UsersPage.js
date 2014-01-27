$(document).ready(function() {
	var containerHeight = $(window).height() - 80;
	$(window).resize(function(){
		$("#userListContainer").height($(window).height() - 80)
	});
	setTimeout(function() {
			$("#userListContainer").animate({"width": "100%"}, 500, "easeOutExpo");
			
			$("#userListContainer").animate({"height": containerHeight}, 1000, "easeOutBounce");
			/*setTimeout(function() {
				var containerHeight = $(window).height() - 55
				$("#userListContainer").animate({"height": containerHeight}, 800, "easeOutBounce");
			},
				100
			);*/
		}, 300
	);	
});
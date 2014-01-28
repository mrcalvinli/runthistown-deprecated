function aRoutesPageLoad() {
	if (document.getElementById("routeSearchContainer") != null) {
		var containerHeight = $(window).height() - 80;
		$(window).resize(function(){
			$("#routeSearchContainer").height($(window).height() - 80)
		});
		setTimeout(function() {
			$("#routeSearchContainer").animate({"width": "100%", "padding": "10px"}, 500, "easeOutExpo");
			
			$("#routeSearchContainer").animate({"height": containerHeight}, 1000, "easeOutBounce", function() {
				$("#routeSearchContainer").css("overflow", "auto");
			});
			/*setTimeout(function() {
				var containerHeight = $(window).height() - 55
				$("#routeListContainer").animate({"height": containerHeight}, 800, "easeOutBounce");
			},
				100
				);*/
		}, 300);	
	}
}

$(document).on("page:load", aRoutesPageLoad);
$(document).ready(aRoutesPageLoad);


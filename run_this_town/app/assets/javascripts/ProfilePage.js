function pageLoad() {
	// Backend Stuff
	// $("#name").html("Myname Mcgee");

	// Styling Javascript
	/*$("html").height($(window).height());*/

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

	if ($("#routesRunContainer").html() == "") {
		$("#routesRunContainer").append($("<div style = 'height: 100%; text-align: center; '>You have no routes yet.  Click the button above to get started!</div>"));
	}
	

	// Backend Stuff
	// New Stat template
		// $(".statContainer").append('<div class = "stat"><p class = "statVal">Stat goes here</p><span class = "glyphicon glyphicon-search"></span></div>');
	// New Route Template
		/*$(".routesRunContainer").append(
			'<div class = "profRouteEntry well well-sm">
						<div style = "display: inline-block; width: 49%; ">
							<p>Date: </p>
							<p>Distance Traveled: </p>
							<p>Start: </p>
							<p>End: </p>
						</div>
						<div style = "display: inline-block; width: 49%; height: 100%; position: absolute; top: 0; ">
							<legend><h4 style = "text-align: center; font-family: Sanchez Regular">Waypoints Visited:</h4></legend>
							<div class = "wptsList">
								<ol>
									<li>Place</li>
									<li>Place</li>
									<li>Place</li>
									<li>Place</li>
									<li>Place</li>
									<li>Place</li>
									<li>Place</li>
									<li>Place</li>
								</ol>
							</div>
						</div>
					</div>'
		)*/

/*	function successClick(current) {
		var startAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteStart").children("span").html();
		var endAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteEnd").children("span").html();
		var wptAddresses = [];
		current.parent().parent().children(".profWaypointsContainer").children(".wptsList").children("ol").children("li").each(function() {
			wptAddresses.push(current.html());
		});
		console.log(startAddress, endAddress, wptAddresses);
		
		var currentRoute = current.parent().parent();
		current.remove();
		currentRoute.children(".profConfirmOrDeny").children(".profDeleteRoute").attr("id", "profRemoveRoute");
		
		currentRoute.remove();
		$("#routesRunContainer").append(currentRoute);

		$(".profRouteEntry").on("click", function() {
			if ( $(this).css("height") == "40px" ) {
				$(this).css("height", "auto");
			} else {
				$(this).css("height", "40px");
			}
		});

		$("#profRemoveRoute").on("click", function() {
			removeClick($(this));
		});

		// backend stuff goes here, use startAddress, endAddress, and wptAddresses
	}*/

	function deleteClick(current) {
		var startAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteStart").children("span").html();
		var endAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteEnd").children("span").html();
		var wptAddresses = [];
		current.parent().parent().children(".profWaypointsContainer").children(".wptsList").children("ol").children("li").each(function() {
			wptAddresses.push(current.html());
		});
		console.log(startAddress, endAddress, wptAddresses);
		var currentRoute = current.parent().parent();

		currentRoute.remove();

		/*$(".profRouteEntry").on("click", function(route) {
			if ( route.css("height") == "40px" ) {
				route.css("height", "auto");
			} else {
				route.css("height", "40px");
			}
		});*/

		// backend stuff goes here, use startAddress, endAddress, and wptAddresses
		$.ajax({
			beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
			url: '/homepage_post',
			type: 'POST',
			data: {
				"start": startAddress,
				"end": endAddress,
				"wptAddress": wptAddresses
			},
			dataType: "json",
			success: function(data, textStatus){
				console.log("deletion twerked")
			},
			error: function(){
				console.log("did not delete...");
			}
		});

	}

/*	function removeClick(current) {
		var startAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteStart").children("span").html();
		var endAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteEnd").children("span").html();
		var wptAddresses = [];
		current.parent().parent().children(".profWaypointsContainer").children(".wptsList").children("ol").children("li").each(function() {
			wptAddresses.push(current.html());
		});
		console.log(startAddress, endAddress, wptAddresses);
		var currentRoute = current.parent().parent();
		currentRoute.children(".profConfirmOrDeny").html('<span id = "profSuccessRoute" style = "color: #2eba3e; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-ok profConfirmRoute"></span><span id = "profDeleteRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-remove profDeleteRoute"></span>');
		currentRoute.remove();
		$("#routesToRunContainer").append(currentRoute);

		$(".profRouteEntry").on("click", function() {
			if ( $(this).css("height") == "40px" ) {
				$(this).css("height", "auto");
			} else {
				$(this).css("height", "40px");
			}
		});

		$("#profSuccessRoute").on("click", function() {
			successClick($(this));
		});

		$("#profDeleteRoute").on("click", function() {
			deleteClick($(this));
		});

		// backend stuff goes here, use startAddress, endAddress, and wptAddresses
	}*/
/*	$("#profSuccessRoute").on("click", function() {
		successClick($(this));
	});*/

	$("#profDeleteRoute").on("click", function() {
		deleteClick($(this));
	});

/*	$("#profRemoveRoute").on("click", function() {
		removeClick($(this));
	});*/
}

$(document).on("page:load", pageLoad);
$(document).ready(pageLoad);
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
	$("#profSuccessRoute").on("click", function() {
		console.log("le click");
		var startAddress = $(this).parent().parent().children(".profRouteStart").html();
		var endAddress = $(this).parent().parent().children(".profRouteEnd").html();
		var wptAddresses = [];
		$(this).parent().parent().children(".wptsList li").each(function() {
			wptAddresses.push($(this).html());
		});
		console.log(startAddress, endAddress, wptAddresses);
	});
}

$(document).on("page:load", pageLoad);
$(document).ready(pageLoad);
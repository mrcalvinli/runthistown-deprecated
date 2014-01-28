function pageLoad1() {
	if (document.getElementById('profileContainer') != null) {
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
		$("#longestRunIcon").tooltip({"placement": "right"});

		//confirmRouteLink
		$(".confirmRouteLink").append($('<span id = "profSuccessRoute" style = "color: #2eba3e; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-ok profConfirmRoute"></span>'));
		$(".deleteRouteLink").append($('<span id = "profDeleteRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-remove profDeleteRoute"></span>'));
		$(".removeRouteLink").append($('<span id = "profRemoveRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-arrow-up profRemoveRoute"></span>'));
		
		$(".profDeleteRoute").on("mouseenter", function() {
			$(this).css("opacity", 1);
		});

		$(".profDeleteRoute").on("mouseleave", function() {
			$(this).css("opacity", 0.5);
		});

		function parseDateShort(rubyDate) {
			// 2014-01-28 08:25:48 UTC
			var yearMonthDay = rubyDate.substring(0, 10);
			var year = yearMonthDay.substring(0, 4);
			var month = yearMonthDay.substring(5, 7);
			var day = yearMonthDay.substring(8, 10);
			return month + "/" + day + "/" + year;
		}


		$("#goalsPlus").on("click", function() {
			var buttonHeight = parseInt($("#newGoalBtn").css("height")) + parseInt($("#newGoalContainer").css("padding")) + parseInt($("#newGoalContainer").css("padding"));
			$("#newGoalContainer").css("border-top", "1px solid grey");
			$("#newGoalContainer").animate({"height": buttonHeight, "padding-bottom": "5px"}, 300);
		});


		var totalDistanceTraveled = 0;
		$("#routesToRunContainer .profRouteEntry .profRouteDistanceVal").each(function(i) {
			if ($(this).html() != "") {
				console.log($(this).html());
				totalDistanceTraveled += parseFloat($(this).html());
			}
			console.log(totalDistanceTraveled);
			
		});
		totalDistanceTraveled = Math.round(totalDistanceTraveled * 100) / 100;
		$("#totalDistanceStat").html(totalDistanceTraveled.toString() + " mi");
		visualizationData = [[]];
		longestRun = 0;
		$("#routesToRunContainer .profRouteEntry .profRouteDistanceVal").each(function(i) {
			var date = $(this).parent().parent().parent().children(".profWaypointsContainer").children(".profRouteDate").children(".profRouteDateVal").html();
			var shortDate = parseDateShort(date);
			if ($(this).html() != "") {
				console.log($(this).html());
				thisDistance = parseFloat($(this).html());
				if (thisDistance > longestRun) {
					longestRun = thisDistance;
				}
				visualizationData[0].push({"y": thisDistance, "x": shortDate});
			}
			
		});
		if (visualizationData[0].length < 1) {

			$("#visualizationData").css("display", "none"); 
		}
		longestRun = Math.round(longestRun * 100) / 100;
		$("#longestRunStat").html(longestRun.toString() + " mi");

		// Route entry template


		$(".profRouteEntry").on("click", function() {
			if ( $(this).css("height") == "40px" ) {
				$(this).css("height", "auto");
			} else {
				$(this).css("height", "40px");
			}
		});


		


		$("#profPicCont").on("mouseenter", function() {
			$("#profPicCover").css("opacity", 1);
		});
		$("#profPicCont").on("mouseleave", function() {
			$("#profPicCover").css("opacity", 0);
		});

		if ($("#routesRunContainer").html() == "") {
			$("#routesRunContainer").append($("<div style = 'font-size: 14pt; height: 100%; text-align: center; '>You have not run a route yet.  Click the check mark on any routes above that you've completed</div>"));
		}

		if ($("#routesToRunContainer").html() == "") {
			$("#routesToRunContainer").append($("<div style = 'font-size: 14pt; height: 100%; text-align: center; '>You have no pending routes.  Click the button above to create a new route!</div>"));
		}

		//deleteRouteLink
		// $(".deleteRouteLink").append($('<span id = "profDeleteRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-remove profDeleteRoute"></span>'))
		
		$(".profDeleteRoute").on("mouseenter", function() {
			$(this).css("opacity", 1);
		});


		$(".profDeleteRoute").on("mouseleave", function() {
			$(this).css("opacity", 0.5);
		});

		$("#toggleRouteVisualization").on("click", function() {
			var routeVisualizationContainer = $("#routeVisualizationContainer");
			if (routeVisualizationContainer.height() == 0) {
				routeVisualizationContainer.animate({"height": "500px"}, 500);
			} else {
				routeVisualizationContainer.animate({"height": "0px"}, 500);
			}
		});



		if (visualizationData[0].length < 1) {
			console.log("here: ", visualizationData);
			var outerWidth = $("#routeVisualizationContainer").width();
			var outerHeight = 500;
			
			var margin = {top: 40, right: 20, bottom: 80, left: 80};
			
			var chartWidth = outerWidth - margin.left - margin.right;
			var chartHeight = outerHeight - margin.top - margin.bottom;
			
			var stack = d3.layout.stack();
			//var stack = d3.layout.partition(); //left it as stack for simplicity
			var stackedData = stack(visualizationData);
			
			var yStackMax = d3.max(stackedData, function(layer){return d3.max(layer, function(d){return d.y + d.y0;});});
			
			var yGroupMax = d3.max(stackedData, function(layer){return d3.max(layer, function(d){return d.y;});});
			
			var xScale = d3.scale.ordinal().domain(d3.range(visualizationData[0].length)).rangeBands([0, chartWidth]);
			var yScale = d3.scale.linear().domain([0, yStackMax]).range([chartHeight, 0]);
			
			
			var grouped = false;

			var topIndex = 3;


			var chart = d3
			.select("#routeVisualizationContainer") // equivalent to jQuery $("") selector
			.append("svg") // Here we are appending divs to what we selected
			.attr("class", "chart").attr("height", outerHeight).attr("width",outerWidth)
			.append("g") // group element
			.attr("transform", "translate(" + margin.left + "," + margin.top +")")
			//.on("click", function(){ grouped ? shrinkWindow() : expandWindow();});
			 // Same as jQuery

			// adds lines
			chart.selectAll("line").data(yScale.ticks(10)).enter().append("line")
			.attr("x1", 0).attr("x2", chartWidth).attr("y1", yScale).attr("y2", yScale);

			// adds labels to y axis

			chart.selectAll("text").data([visualizationData[0][0]["x"], visualizationData[0][visualizationData[0].length - 1]["x"]]).enter().append("text")
			.attr("class", "xScaleLabel")
			.attr("x", function(d, i){console.log("i: " + i); if (i == 0) {return 101; } else {return 675; }})
			.attr("y", 460)
			.attr("dx", "0.3em")
			.attr("dy", -margin.bottom/visualizationData[0].length)
			.attr("text-anchor", "end")
			.text(String);

			chart.selectAll("text").data(yScale.ticks(10)).enter().append("text")
			.attr("class", "yScaleLabel")
			.attr("x", 0)
			.attr("y", yScale)
			.attr("dx", -margin.left/8)
			.attr("dy", "0.3em")
			.attr("text-anchor", "end")
			.text(String);



			var layerGroups = chart.selectAll(".layer").data(stackedData).enter()
			.append("g")
			.attr("class", "layer");

			chart.append("g")
			  .attr("class", "y axis")
			  .call(yScale)
			.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", "-55px")
			  .attr("dx", "-150px")
			  .style("text-anchor", "end")
			  .text("Miles Run");

			for (var i; i<=3; i++){
				chart.selectAll(".layer").attr("class", "layer" + i);
			}

			var rects = layerGroups.selectAll("rect").data(function(d){ return d;}).enter().append("rect")
			.attr("x", function(d, i) {return xScale(i);})
			.attr("y", function(d) {return yScale(d.y0+d.y);})
			.attr("width", xScale.rangeBand)
			.attr("height", function(d){return yScale(d.y0) - yScale(d.y0 + d.y);})
			.attr("class", "rect");
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

			
	// 		var currentRoute = current.parent().parent();
	// 		current.remove();
	// 		currentRoute.children(".profConfirmOrDeny").children(".profDeleteRoute").attr("id", "profRemoveRoute");
			
	// 		currentRoute.remove();
	// 		$("#routesRunContainer").append(currentRoute);

	// 		$(".profRouteEntry").on("click", function() {
	// 			if ( $(this).css("height") == "40px" ) {
	// 				$(this).css("height", "auto");
	// 			} else {
	// 				$(this).css("height", "40px");
	// 			}
	// 		});

	// 		$("#profRemoveRoute").on("click", function() {
	// 			removeClick($(this));
	// 		});

	// 		// backend stuff goes here, use startAddress, endAddress, and wptAddresses //
	// 	}*/

		
	// 	/*function deleteClick(current) {
	// 		var startAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteStart").children("span").html();
	// 		var endAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteEnd").children("span").html();
	// 		var wptAddresses = [];
	// 		current.parent().parent().children(".profWaypointsContainer").children(".wptsList").children("ol").children("li").each(function() {
	// 			wptAddresses.push($(this).html());
	// 		});
	// 		console.log(wptAddresses);
	// 		var currentRoute = current.parent().parent();

	// 		currentRoute.remove();

	// 		$("#profDeleteRoute").on("click", function() {
	// 			deleteClick($(this));
	// 		}); */

	// 		/*$(".profRouteEntry").on("click", function(route) {
	// 			if ( route.css("height") == "40px" ) {
	// 				route.css("height", "auto");
	// 			} else {
	// 				route.css("height", "40px");
	// 			}
	// 		});*/

	// 		// backend stuff goes here, use startAddress, endAddress, and wptAddresses
	// 		/*$.ajax({
	// 			beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
	// 			url: '/homepage_post',
	// 			type: 'POST',
	// 			data: {
	// 				"start": startAddress,
	// 				"end": endAddress,
	// 				"wptAddress": wptAddresses
	// 			},
	// 			dataType: "json",
	// 			success: function(data, textStatus){
	// 				console.log("deletion twerked")
	// 			},
	// 			error: function(){
	// 				console.log("did not delete...");
	// 			}
	// 		}); 

	// 	} */

	// /*	function removeClick(current) {
	// 		var startAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteStart").children("span").html();
	// 		var endAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteEnd").children("span").html();
	// 		var wptAddresses = [];
	// 		current.parent().parent().children(".profWaypointsContainer").children(".wptsList").children("ol").children("li").each(function() {
	// 			wptAddresses.push(current.html());
	// 		});
	// 		console.log(startAddress, endAddress, wptAddresses);
	// 		var currentRoute = current.parent().parent();
	// 		currentRoute.children(".profConfirmOrDeny").html('<span id = "profSuccessRoute" style = "color: #2eba3e; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-ok profConfirmRoute"></span><span id = "profDeleteRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-remove profDeleteRoute"></span>');
	// 		currentRoute.remove();
	// 		$("#routesToRunContainer").append(currentRoute);

	// 		$(".profRouteEntry").on("click", function() {
	// 			if ( $(this).css("height") == "40px" ) {
	// 				$(this).css("height", "auto");
	// 			} else {
	// 				$(this).css("height", "40px");
	// 			}
	// 		});

	// 		$("#profSuccessRoute").on("click", function() {
	// 			successClick($(this));
	// 		});

	// 		$("#profDeleteRoute").on("click", function() {
	// 			deleteClick($(this));
	// 		});

	// 		// backend stuff goes here, use startAddress, endAddress, and wptAddresses
	// 	}*/
	// /*	$("#profSuccessRoute").on("click", function() {
	// 		successClick($(this));
	// 	});*/

	// 	/*$("#profDeleteRoute").on("click", function() {
	// 		deleteClick($(this));
	// 	});*/

	// /*	$("#profRemoveRoute").on("click", function() {
	// 		removeClick($(this));
	// 	});*/
	}
}

$(document).on("page:load", pageLoad1);
$(document).ready(pageLoad1);
	


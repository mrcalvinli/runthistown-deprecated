$(document).ready(function() {
	/**** Styling JavaScript ***/
	$("#map").css("height", ($(window).height() - $(".navbar").height));
	$("#locList").css("height", ($(window).height() - $(".navbar").height));

	$("#map").height($(window).height() - $(".navbar").height);
	$("#locList").height($(window).height() - $(".navbar").height);

	var map = null;
	var rendererOptions = {map: map};

	directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(51.505, -0.09),
			zoom: 15
		};
		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		if (navigator.geolocation) {
		     navigator.geolocation.getCurrentPosition(function (position) {
		         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		         map.setCenter(initialLocation);
		     });
		 }

	}

	function createUrlAddress(location) {
		var address = location.toString();
		// Address ex: 1600 Amphitheatre Parkway, Mountain View, CA
		var addressArray = address.split(" ");
		var urlAddress = "";
		for (var i = 0; i < addressArray.length; i++){
			if (i != addressArray.length - 1) {
				urlAddress += addressArray[i] + "+";
			} else {
				urlAddress += addressArray[i];
			}
		}
		return urlAddress;
	}

	initialize();

	// Order buttons
	// $("#orderBtnDropdown").css("width", $("#orderBtnDropdown").width() + 28);
	customOrder = true;
	autoOrder = false;
	shortestPathOrder = false;


	$("#customOrderBtn").on("click", function() {
		customOrder = true;
		autoOrder = false;
		shortestPathOrder = false;
		$("#orderBtnDropdown").html('Order: Custon <span class="caret" style = "border-top: 4px solid white"></span>');
	})
	$("#autoOrderBtn").on("click", function() {
		customOrder = false;
		autoOrder = true;
		shortestPathOrder = false;
		$("#orderBtnDropdown").html('Order: Auto <span class="caret" style = "border-top: 4px solid white"></span>');
	})
	$("#shortestPathOrderBtn").on("click", function() {
		customOrder = false;
		autoOrder = false;
		shortestPathOrder = true;
		$("#orderBtnDropdown").html('Order: Shortest Path <span class="caret" style = "border-top: 4px solid white"></span>');
	});


	// Add autocomplete
	var input = document.getElementById('input'); 
	var buttons = document.getElementById('buttonContainer');
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(buttons);
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);
	var infowindow = new google.maps.InfoWindow();
	
	marker = new google.maps.Marker({
		map:map
	});

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
	    infowindow.close();
	    if (marker != null) {
	    	marker.setVisible(false);
	    }
	    marker = new google.maps.Marker({
			map:map
		});
	    
	    var place = autocomplete.getPlace();
	    if (!place.geometry) {
	      return;
	    }

	    // If the place has a geometry, then present it on a map.
	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(17);  // Why 17? Because it looks good.
	    }
	    var pinColor = "e6463d";  // red
		if (Object.keys(markerDict).length == 0) {
			pinColor = "2eba3e"; // green
		}
	    marker.setIcon(/** @type {google.maps.Icon} */({
	      url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
	      size: new google.maps.Size(21, 34),
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(10, 34)
	    }));
	    marker.setPosition(place.geometry.location);
	    marker.setVisible(true);

	    var address = '';
	    if (place.address_components) {
	      address = [
	        (place.address_components[0] && place.address_components[0].short_name || ''),
	        (place.address_components[1] && place.address_components[1].short_name || ''),
	        (place.address_components[2] && place.address_components[2].short_name || '')
	      ].join(' ');
	    }

	    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
	    infowindow.open(map, marker);
  	});

	var existingMarker = null;
	google.maps.event.addListener(map, 'click', function(e) {
		addLocation(e.latLng);
	});

	markerDict = {};
	function addLocation(location) {
		var urlAddress = createUrlAddress(location);
		$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){

			var address = json_data.results[0].formatted_address;

			$("#input").val(address.toString());
			if (marker != null) {
				marker.setMap(null);
				marker = null;
			}			

			var pinColor = "e6463d";  // red
			if (Object.keys(markerDict).length == 0) {
				pinColor = "2eba3e"; // green
			}

			var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));

			marker = new google.maps.Marker({
				position: location,
				map: map,
				icon: pinImage,
			});
		});	
	}

	pathArray = [];
	var letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	letterIndex = 0;
	$("#addPointBtn").on("click", function() {
		var address = $("#input").val();
		var urlAddress = createUrlAddress(address);
		if (marker != null) {
			for (var i = 0; i < Object.keys(markerDict).length; i++) {
				var keysArray = Object.keys(markerDict);
				// var pinColor = "5B84EF"; // blue marker;
				var pinColor = "2eba3e"; // green marker;
				var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
			        new google.maps.Size(21, 34),
			        new google.maps.Point(0,0),
			        new google.maps.Point(10, 34));
			    if (keysArray[i] != "A") {
			    	console.log("creating blue marker");
			    	markerDict[keysArray[i]].setIcon(pinImage);
			    }
			}
			markerDict[letterArray[letterIndex]] = marker;
			for (var i = 0; i < Object.keys(markerDict).length; i++) {
				var keysArray = Object.keys(markerDict);
				var thisMarker = markerDict[keysArray[i]];
				// thisMarker.setMap(map);
			}

			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){
				var latLong = json_data.results[0].geometry.location;
				var lat = latLong.lat;
				var lng = latLong.lng;
				var entryClass = "";
				var letterClass = "";
				if (letterArray[letterIndex] == "A") {
					letterClass = "orgEntryLetter";
					entryClass = "orgEntry"
				} else {
					letterClass = "destEntryLetter";
					entryClass = "destEntry"
				}

				var center = new google.maps.LatLng(lat, lng);
			    map.panTo(center);

				pathArray.push([lat, lng]);
				if (pathArray.length >= 2) {
					document.getElementById("clearRoute").disabled = false;
					document.getElementById("pathCreator").disabled = false;
				}

				$(".destEntryLetter").each(function() {
					$(this).attr("class", "entryLetter wptsEntryLetter")
				});
				$(".destEntry").each(function() {
					$(this).attr("class", "routeEntry wptsEntry")
				})

				var marginTop = letterIndex * 45;
				var marginTopString = marginTop.toString() + "px";

				$("#routeList").append("<div style = 'margin-top: " + marginTopString + "' class = 'routeEntry " + entryClass + "' id = 'routeEntry-" + letterArray[letterIndex] + "'></div>");
				$("#routeEntry-" + letterArray[letterIndex]).append("<div class = 'entryLetter " + letterClass + "'>" + "<span class = 'entrySpan' id = 'entrySpan-" + letterArray[letterIndex] + "' style = 'margin-top: 3px; display: block'>" + "&bull;" /*letterArray[letterIndex] */ + "</span></div>");
				entryClass = "orgEntry"
				$("#routeEntry-" + letterArray[letterIndex]).append("<input class = 'controls routeInput'>");
				$("#routeEntry-" + letterArray[letterIndex]).append("<button type = 'button' class = 'close deleteRouteEntry' style = 'margin-top: 5px; padding-left; 5px'>&times;</button>")
				
				// Delete Button
				$("#routeEntry-" + letterArray[letterIndex] + " .close").on("click", function() {
					var thisLetter = $(this).parent().attr("id").toString()[11];
					console.log(thisLetter);
					markerDict[thisLetter].setMap(null);
					markerDict[thisLetter] = null;
					delete markerDict[thisLetter];
					var index = letterArray.indexOf(thisLetter);
					pathArray.pop(index);

					// replace old info with info from new letters
					var thisLetterIndex = letterArray.indexOf(thisLetter);
					var markerKeys = Object.keys(markerDict);
					for (var i = 0; i < markerKeys.length; i++) {
						var currentLetterIndex = letterArray.indexOf(markerKeys[i]);
						var currentLetter = letterArray[currentLetterIndex];
						var prevLetter = letterArray[currentLetterIndex - 1];
						if (currentLetterIndex > thisLetterIndex) {
							markerDict[prevLetter] = markerDict[currentLetter];
							delete markerDict[currentLetter];
						}
					}
					// console.log(JSON.stringify(markerDict));

					// remove animation
					$("#routeEntry-" + thisLetter).animate({"opacity": 0}, 300, function() {
						$("#routeEntry-" + thisLetter).first().remove();
					});
					

					function animateEntriesUp() {
						var index = letterArray.indexOf(thisLetter) + 1;
						var i = index;                     //  set your counter to 1

						function myLoop () {           //  create a loop function
						   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
						      	var currentLetter = letterArray[i];
								$("#routeEntry-" + currentLetter).animate(
									{"margin-top": parseInt($("#routeEntry-" + currentLetter).css("margin-top")) - 45},
									300
								);

								console.log(i);        //  your code here
								i++;                     //  increment the counter
								if (i < letterIndex) {            //  if the counter < 10, call the loop function
								 myLoop();             //  ..  again which will trigger another 
								} else {
									var newIndex = letterArray.indexOf(thisLetter) + 1;
									for (var j = newIndex; j < letterIndex; j++) {
										var currentLetter = letterArray[j];
										$("#routeEntry-" + currentLetter).attr("id", "routeEntry-" + letterArray[j-1]);
									}
									letterIndex--;
								}                     //  ..  setTimeout()
						   }, 150)
						}

						myLoop();  
					}

					setTimeout(animateEntriesUp(), 150);


				});
				
				$("#routeEntry-" + letterArray[letterIndex] + " .routeInput").val(address.toString());
				letterIndex++;

				// Remember that when deleting an element, you should also change the id of all the elements in front of it
				
			});		
			marker = null;
		} else {
			alert("Invalid Point");
		}
		


		

		
	});

	routeInfoArray = [];
	distance = 0;
	$("#pathCreator").on("click", function() {
		// get rid of markers on map (replaced by )

		var org = null;
		var dest = null;
		var wpts = [];
		var newPathArray = [];
		var rendererOptions = { 
			map: map,
		};
		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

		for (var i = 0; i < Object.keys(markerDict).length; i++) {
			var keysArray = Object.keys(markerDict);
		    markerDict[keysArray[i]].setMap(null);
		}

		$(".entrySpan").each(function() {
			$(this).html("");
		});

		$(".orgEntryLetter .entrySpan").html("A");
		$(".destEntryLetter .entrySpan").html(letterArray[letterIndex - 1]);

		$(".routeInput").each(function(i) {
			(function(i) {
				console.log("i first: " + i);
				var address = $("#routeEntry-" + letterArray[i] + " .routeInput").val();
				var urlAddress = createUrlAddress(address);
				$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){
					console.log("i second: " + i);
					var latLong = json_data.results[0].geometry.location;
					var lat = latLong.lat;
					var lng = latLong.lng;

					if (i == 0) {
						org = new google.maps.LatLng(lat, lng);
					} else if (i == pathArray.length - 1) {
						dest = new google.maps.LatLng(lat, lng);
					} else {
						wpts.push({
							location: new google.maps.LatLng(lat, lng),
							stopover: true
						});
					}

					console.log("dest: " + dest);
					if (shortestPathOrder == true) {
						if (dest != null) {
							var request = {
								origin: org,
								destination: dest,
								waypoints: wpts,
								optimizeWaypoints: true,
								travelMode: google.maps.DirectionsTravelMode.WALKING
							};
							directionsService = new google.maps.DirectionsService();
							directionsService.route(request, function(response, status) {
								if (status == google.maps.DirectionsStatus.OK) {
									console.log("success");
									directionsDisplay.setDirections(response);

									var wptsOrder = response["routes"][0]["waypoint_order"];
									var legsArray = response["routes"][0]["legs"];
									var distanceInMeters = 0;
									for (var i in legsArray){
										var legDistance = parseFloat(legsArray[i]["distance"]["value"]);
										distanceInMeters += legDistance;
									}
									distance = Math.round(distanceInMeters * 0.000621371 * 100) / 100;
									$("#routeLength").html(distance.toString() + " mi");
									
									// create routeInfoArray
									var routeInfoEntry = [$("#routeEntry-A input").val(), pathArray[0][0], pathArray[0][1]];
									routeInfoArray.push(routeInfoEntry);
									for (var i in wptsOrder) {
										var currentLetter = letterArray[wptsOrder[i]];
										var address = $("#routeEntry-" + currentLetter + " input").val();
										var thisLat = response["Vb"]["waypoints"][i]["location"]["d"];
										var thisLng = response["Vb"]["waypoints"][i]["location"]["e"];
										var routeInfoEntry = [address, thisLat, thisLng];
										routeInfoArray.push(routeInfoEntry);
									}
									var lastLetter = letterArray[letterIndex - 1];
									var routeInfoEntry = [$("#routeEntry-" + lastLetter +" input").val(), pathArray[pathArray.length - 1][0], pathArray[pathArray.length - 1][1]];
									console.log("routeInfoArray: " + routeInfoArray);
									// insert animation here
									for (var j = 0; j < wptsOrder.length; j++) {
										// [1, 2, 0]
										var thisLetterIndex = j + 1;
										var wptIndex = wptsOrder[j];
										var letterToChangeIndex = wptsOrder[j] + 1;
										var thisLetter = letterArray[thisLetterIndex];

										var letterToChange = letterArray[letterToChangeIndex];

										var newMarginTop = thisLetterIndex * 45;
										var newMarginTopString = newMarginTop.toString();
										var newMarginTopPxString = newMarginTopString + "px";

										console.log(newMarginTopPxString);
										$("#routeEntry-" + letterToChange).animate({"margin-top": newMarginTopPxString}, 500);
										$("#routeEntry-" + letterToChange + " .entrySpan").html(thisLetter);
										$("#routeEntry-" + letterToChange).attr("id", "#routeEntry-" + thisLetter);

									}
									document.getElementById("createRouteBtn").disabled = false;
									$(".deleteRouteEntry").css("display", "none");
									marker.setMap(null);
									marker = null;
								} else {
									alert('failed to get directions');
								}
							});
						}
					} else if (customOrder == true) {
						if (dest != null) {
							var request = {
								origin: org,
								destination: dest,
								waypoints: wpts,
								optimizeWaypoints: false,
								travelMode: google.maps.DirectionsTravelMode.WALKING
							};
							directionsService = new google.maps.DirectionsService();
							directionsService.route(request, function(response, status) {
								if (status == google.maps.DirectionsStatus.OK) {
									console.log("success");
									directionsDisplay.setDirections(response);

									var legsArray = response["routes"][0]["legs"];
									var distanceInMeters = 0;
									for (var i in legsArray){
										var legDistance = parseFloat(legsArray[i]["distance"]["value"]);
										distanceInMeters += legDistance;
									}
									distance = Math.round(distanceInMeters * 0.000621371 * 100) / 100;
									$("#routeLength").html(distance.toString() + " mi");
									for (var i = 1; i < letterIndex - 1; i++) {
										$("#routeEntry-" + letterArray[i] + " .entrySpan").html(letterArray[i]);
									}
								document.getElementById("createRouteBtn").disabled = false;
								$(".deleteRouteEntry").css("display", "none");
								} else {
									alert('failed to get directions');
								}
							});
						}
					}
				});
			})(i);
		});
	});

	$("#clearRoute").on("click", function() {
		$("#routeList").html("");
		// Set markers to null and remove them
		pathArray = [];

		var markerKeys = Object.keys(markerDict);
		for (var i in markerKeys) {
			var key = markerKeys[i];
			markerDict[key].setMap(null);
			markerDict[key] = null;
		}
		markerDict = {};
		
		document.getElementById("clearRoute").disabled = true;
		document.getElementById("pathCreator").disabled = true;
		document.getElementById("createRouteBtn").disabled = true;

		$(".deleteRouteEntry").css("display", "block");

		directionsDisplay.setMap(null);
		letterIndex = 0;
	});

	$("#confirmRouteBtn").on("click", function() {
		// insert backend stuff here
		// send route data to server
		// go to profile page and highlight their new route
		console.log("bleahhh");
		$.ajax({
			beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
			url: '/routeplanner_post',
			type: 'POST',
			data: {
				"user_id": 1,
				"name": "Dis Route Doh"
			},
			success: function(){
				console.log("it twerked!");
			},
			error: function(){
				console.log("it no twerked...");
			}
		});
	});
});
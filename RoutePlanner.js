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
		$("#orderBtnDropdown").html('Custom <span class="caret" style = "border-top: 4px solid white"></span>');
	})
	$("#autoOrderBtn").on("click", function() {
		customOrder = false;
		autoOrder = true;
		shortestPathOrder = false;
		$("#orderBtnDropdown").html('Auto <span class="caret"style = "border-top: 4px solid white"></span>');
	})
	$("#shortestPathOrderBtn").on("click", function() {
		customOrder = false;
		autoOrder = false;
		shortestPathOrder = true;
		$("#orderBtnDropdown").html('Shortest Path <span class="caret" style = "border-top: 4px solid white"></span>');
	})

	// Add autocomplete
	var input = document.getElementById('input'); 
	var buttons = document.getElementById('buttonContainer');
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(buttons);
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);
	var infowindow = new google.maps.InfoWindow();
	var marker = new google.maps.Marker({
		map:map
	});

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
	    infowindow.close();
	    marker.setVisible(false);
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
	    marker.setIcon(/** @type {google.maps.Icon} */({
	      url: place.icon,
	      size: new google.maps.Size(71, 71),
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(17, 34),
	      scaledSize: new google.maps.Size(35, 35)
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

	var marker = null;
	var existingMarker = null;
	google.maps.event.addListener(map, 'click', function(e) {
		addLocation(e.latLng);
	});

	var markerDict = {};
	function addLocation(location) {
		var urlAddress = createUrlAddress(location);
		$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){

			var address = json_data.results[0].formatted_address;

			$("#input").val(address.toString());
			if (marker != null) {
				marker.setMap(null);
				marker = null;
			}			

			var pinColor = "ef5b5b";
			if (Object.keys(markerDict).length == 0) {
				pinColor = "41d355";
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

	var pathArray = [];
	var letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	letterIndex = 0;
	$("#submit").on("click", function() {
		var address = $("#input").val();
		var urlAddress = createUrlAddress(address);
		if (marker != null) {
			for (var i = 0; i < Object.keys(markerDict).length; i++) {
				var keysArray = Object.keys(markerDict);
				var pinColor = "5B84EF";
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
				thisMarker.setMap(map);
			}

			console.log(markerDict.toString());
		} else {

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
			console.log(pathArray);

			$(".destEntryLetter").each(function() {
				$(this).attr("class", "entryLetter wptsEntryLetter")
			});
			$(".destEntry").each(function() {
				$(this).attr("class", "routeEntry wptsEntry")
			})

			var marginTop = letterIndex * 45;
			var marginTopString = marginTop.toString() + "px";

			$("#routeList").append("<div style = 'margin-top: " + marginTopString + "' class = 'routeEntry " + entryClass + "' id = 'routeEntry-" + letterArray[letterIndex] + "'></div>");
			$("#routeEntry-" + letterArray[letterIndex]).append("<div class = 'entryLetter " + letterClass + "'>" + "<span class = 'entrySpan' id = 'entrySpan-" + letterArray[letterIndex] + "' style = 'margin-top: 6px; display: block'>" + "&bull;" /*letterArray[letterIndex] */ + "</span></div>");
			entryClass = "orgEntry"
			$("#routeEntry-" + letterArray[letterIndex]).append("<input class = 'controls routeInput'>");

			
			
			$("#routeEntry-" + letterArray[letterIndex] + " .routeInput").val(address.toString());
			letterIndex++;

			// Remember that when deleting an element, you should also change the id of all the elements in front of it
			
		});		
		marker = null;
	});

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
									for (var i = 1; i < letterIndex - 1; i++) {
										$("#routeEntry-" + letterArray[i] + " .entrySpan").html(letterArray[i]);
									}
								} else {
									alert('failed to get directions');
								}
							});
						}
					}
				});

				/*var orgString = "";
				var destString = "";
				var wptsString = "";

				var orgArray = org.toString().split(" ");
				var destArray = dest.toString().split(" ");
				var wptsArray = [];
				for (var i = 0; i < wpts.length; i++) {
					var subWptsArray = wpts[i].split(" ");
					for (var j = 0; j < subWptsArray.length; j++) {
						wptsArray.push(subWptsArray[j]);
					}
					if (i != wpts.length - 1) {
						wptsArray.push("|");
					}
				}

				for (var i = 0; i < orgArray.length; i++) {
					orgString += orgArray[i];
				}
				for (var i = 0; i < destArray.length; i++) {
					destString += destArray[i];
				}
				for (var i = 0; i < wptsArray.length; i++) {
					wptsString += wptsArray[i];
				}
				$.getJSON('http://maps.googleapis.com/maps/api/directions/json?origin=' + orgString + '&destination=' + destString + '&waypoints=' + wptsString + '&sensor=false', function(data) {
					console.log(JSON.stringify(data));
					var wptsOrder = data["routes"][0]["waypoint_order"];
					console.log("wptsOrder: " + wptsOrder.toString());
				});*/
			})(i);
		});
	});
});
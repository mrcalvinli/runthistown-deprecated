function toolbarLoad() {
	var extraInfohtml = '<ul class="dropdown-menu" role="menu" style = "display: block; position: relative; border: none; box-shadow: none; margin-top: -8px;">'
		+ '<li role="presentation"><a role="menuitem" tabindex="-1" style = "cursor: pointer;" data-toggle="modal" data-target=".helpModal">Help</a></li>'
		+ '<li role="presentation" class="divider"></li>'
	    + '<li role="presentation"><a role="menuitem" tabindex="-1" style = "cursor: pointer;" >My Profile</a></li>'
	    + '<li role="presentation"><a role="menuitem" tabindex="-1" style = "cursor: pointer;" >Account Settings</a></li>'
	    + '<li role="presentation"><a role="menuitem" tabindex="-1" style = "cursor: pointer;" >Log Out</a></li>'
	    + '<li role="presentation" class="divider"></li>'
	    + '<li role="presentation"><a id = "creditsBtn" role="menuitem" tabindex="-1" style = "cursor: pointer;"  data-toggle="modal" data-target="#creditsModal">Credits</a></li>'
	+ '</ul>';
	/*$("#extraInfo").popover({'placement': 'bottom', 'html': true, 'content': extraInfohtml});
	$("#extraInfo").on("click", function() {
		console.log("swag");
		var popoverRight = $(".popover").offset().left + $(".popover").width();
		if ( popoverRight > $(window).width() ) {
			var difference = popoverRight - $(window).width();
			$(".popover").css("left",  parseInt($(".popover").css("left")) - difference - 10 );
			$(".arrow").css("left", parseInt($(".arrow").css("left")) + difference + 10);
		}
	});*/
	$("#searchContainer").width($(window).width() 
						- parseInt($(".navbar-brand").css("width"))
						- parseInt($(".navbar .navbar-right").css("width")));

	$("#inputContainer").width($("#searchContainer").width()
							- parseInt($(".navbar .navbar-right").css("width")) - 3);
	$(window).resize(function() {
		$("#searchContainer").width($(window).width() 
						- parseInt($(".navbar-brand").css("width"))
						- parseInt($(".navbar .navbar-right").css("width")));

		$("#inputContainer").width($("#searchContainer").width()
							- parseInt($(".navbar .navbar-right").css("width")) - 3);
	});



	

	findPeople = false;
	findRoutes = true;
	var input = document.getElementById('routeAndFriendFinder');
	autocomplete = new google.maps.places.Autocomplete(input);

	$("#findPeopleBtn").on("click", function() {
		var input = document.getElementById('routeAndFriendFinder');
		findPeople = true;
		findRoutes = false;
		$("#routePeopleDropdown").html('People <span class="caret"></span>');
		$("#routeAndFriendFinder").attr("placeholder", "Find People");
		input.parentNode.replaceChild(input.cloneNode(true),input);
	});

	$("#findRoutesBtn").on("click", function() {
		var input = document.getElementById('routeAndFriendFinder');
		findPeople = false;
		findRoutes = true;
		$("#routePeopleDropdown").html('Routes <span class="caret"></span>');
		$("#routeAndFriendFinder").attr("placeholder", "Find Routes");
		autocomplete = new google.maps.places.Autocomplete(input);
	});

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

	lat = 0;
	lng = 0;
	$("#navSearchBtn").on("click", function() {
		if (findRoutes) {
			var location = $("#routeAndFriendFinder").val();
			var urlAddress = createUrlAddress(location);
			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){

				var address = json_data.results[0].formatted_address;

				var latLong = json_data.results[0].geometry.location;
				lat = latLong.lat;
				lng = latLong.lng;
				console.log("lat: " + lat);
				console.log("lng: " + lng);
			});
		}
	});
}

$(document).ready(toolbarLoad);
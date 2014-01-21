var Navbar = (function () {
	var exports = {};
	var setupNav = function(div) {
		var navbarhtml = $(''
			+ '<div class = "navbar-header>'
				+ '<button class = "navbar-toggle" type = "button" data-toggle="collapse" data-target = "#bs-navbar-collapse">'
					+ '<span class = "sr-only">Toggle navigation</span>'
					+ '<span class = "icon-bar"></span>'
					+ '<span class = "icon-bar"></span>'
					+ '<span class = "icon-bar"></span>'
				+ '</button>'
				+ '<a class = "navbar-brand" href="LandingPage.html" style = "padding: 6px 20px 6px; float: left; margin: 0"><img style = "height: 48px" src="../images/RunThisTownLogo1.png"></a>'
			+ '</div>'
			+ '<div class="collapse navbar-collapse" id="bs-navbar-collapse">'

				+ '<form id = "searchContainer" class="navbar-form navbar-left" role="search">'
					+ '<div id = "inputContainer" class="form-group" style = "margin-top: 10px;">'
	        			+ '<input type="text" id = "routeFinder" class="form-control" placeholder="Find Route" >'
	      			+ '</div>'
	      			+ '<button type="submit" class="btn btn-warning" style = "margin-top: 10px; margin-left: 3px">Search</button>'
	    		+ '</form>'

			
				+ '<ul class = "nav navbar-nav navbar-right" style = "margin-right: 0">'
					+ '<li><a href="#" data-toggle="modal" data-target="#loginModal">Sign Up</a></li>'
					+ '<li><span id = "extraInfo" class = "glyphicon glyphicon-cog" data-toggle="popover"></span></li>'
				+ '</ul>'
			+ '</div>'
		);

		$(div).append(navbarhtml);
	}
	exports.setupNav = setupNav;
	return exports;

})();

$(document).ready(function() {
	$('.navbar').each(function() {
		Navbar.setupNav(this);
	});

	var extraInfohtml = '<ul class="dropdown-menu" role="menu" style = "display: block; position: relative; border: none; box-shadow: none; margin-top: -8px;">'
		+ '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Help</a></li>'
		+ '<li role="presentation" class="divider"></li>'
	    + '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">My Profile</a></li>'
	    + '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Account Settings</a></li>'
	    + '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Log Out</a></li>'
	    + '<li role="presentation" class="divider"></li>'
	    + '<li role="presentation"><a id = "creditsBtn" role="menuitem" tabindex="-1" href="#" data-toggle="modal" data-target="#creditsModal">Credits</a></li>'
	+ '</ul>';
	$("#extraInfo").popover({'placement': 'bottom', 'html': true, 'content': extraInfohtml});
	$("#extraInfo").on("click", function() {
		var popoverRight = $(".popover").offset().left + $(".popover").width();
		if ( popoverRight > $(window).width() ) {
			var difference = popoverRight - $(window).width();
			$(".popover").css("left",  parseInt($(".popover").css("left")) - difference - 10 );
			$(".arrow").css("left", parseInt($(".arrow").css("left")) + difference + 10);
		}
	});

	/*Credits Modal*/	
	var creditshtml = $(''
		+ '<div class="modal fade" id = "creditsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style = "font-family: Sanchez Regular">'
		  + '<div class="modal-dialog modal-dialog-center">'
		    + '<div class="modal-content" style = "background-color: beige">'
		      + '<div class="modal-header">'
		        + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
		        + '<h3 class="modal-title" style = "font-family: Sanchez Regular">Credits</h3>'
		      + '</div>'
		      + '<div class="modal-body">'
		        + '<p>Thanks to all these awesome sources for helping make this website possible!</p><br>'
		        + '<ul>'
		        	+ '<li><p><a href = "http://glyphicons.com">Glyphicons</a></p></li>'
		        	+ '<li><p><a href = "http://getbootstrap.com">Bootstrap</a></p></li>'
		        	+ '<li><p>Sarah Liu for her amazing photography!</p></li>'
		        + '</ul>'
		      + '</div>'
		      + '<div class="modal-footer">'
		        + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
		      + '</div>'
		    + '</div>'
		  + '</div>'
		+ '</div>'
	);

	$("body").append(creditshtml);
	$("#creditsBtn").modal();
});

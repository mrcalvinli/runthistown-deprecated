if ($('#landingPage').length) {
	function pageLoad() {
		// Styling javascript

		var mainHeight = $(window).height() - 60;
		$(".jumbotron").css("height", mainHeight - 100);
		$("#infoSection1").height(mainHeight);
		$("#infoSection2").height(mainHeight);
		$("#infoSection3").height(mainHeight);
		$("#navigator").css("margin-top", (mainHeight/2) - $("#navigator").height()/2 + 60 - 20);
		$("#infoSection1 p").css("font-size", Math.ceil(mainHeight * $(window).width() / 40000));

		$(window).resize(function() {
			var mainHeight = $(window).height() - 60;
			$(".jumbotron").css("height", $(window).height() - 60 - 100);
			$("#infoSection1").height($(window).height() - 60);
			$("#infoSection2").height($(window).height() - 60);
			$("#infoSection3").height($(window).height() - 60);
			$("#navigator").css("margin-top", (($(window).height() - 60)/2) - $("#navigator").height()/2 + 60 - 20);
			$("#infoSection1 p").css("font-size", Math.ceil(mainHeight * $(window).width() / 40000));
			if ( $(window).width() < 1440 ){
				$('.jumbotron').css("min-height", '793px');
			} else {
				$('.jumbotron').css('min-height', '500px');
			}
		});

		// Chevron animation
		function animateChevron() {
			console.log("called");
			$("#learnMoreChevron").animate({"margin-top": "10px"}, 750, 'linear', function() {
				$("#learnMoreChevron").animate({"margin-top": "0px"}, 750, 'linear');
			});
		}
		animateChevron();
		var chevronInterval = setInterval(animateChevron, 1500);

		// Bullet Hover
		$("#homeBullet").tooltip({placement: 'left'});
		$("#navBullet1").tooltip({placement: 'left'});
		$("#navBullet2").tooltip({placement: 'left'});
		$("#navBullet3").tooltip({placement: 'left'});

		$(".navBullet").on("mouseenter", function() {
			$(this).animate({"opacity": 1}, 200);
		});
		$(".navBullet").on("mouseleave", function() {
			$(this).animate({"opacity": 0.5}, 200);
			// $(this).tooltip('hide');
		});

		// Bullet Click
		$("#homeBullet").on("click", function() {
			var container = $("body"), scrollTo = 60;
			container.animate({scrollTop: scrollTo - 60}, 1500, "easeInOutQuint");
			$("#homeBullet").css("opacity", 1);
			$("#navBullet1").css("opacity", 0.5);
			$("#navBullet2").css("opacity", 0.5);
			$("#navBullet3").css("opacity", 0.5);
		})
		$("#navBullet1").on("click", function() {
			var container = $("body"), scrollTo = $("#infoSection1");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint");
			$("#homeBullet").css("opacity", 0.5);
			$("#navBullet1").css("opacity", 1);
			$("#navBullet2").css("opacity", 0.5);
			$("#navBullet3").css("opacity", 0.5);
		})
		$("#navBullet2").on("click", function() {
			var container = $("body"), scrollTo = $("#infoSection2");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint");
			$("#homeBullet").css("opacity", 0.5);
			$("#navBullet1").css("opacity", 0.5);
			$("#navBullet2").css("opacity", 1);
			$("#navBullet3").css("opacity", 0.5);
		})
		$("#navBullet3").on("click", function() {
			var container = $("body"), scrollTo = $("#infoSection3");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint");
			$("#homeBullet").css("opacity", 0.5);
			$("#navBullet1").css("opacity", 0.5);
			$("#navBullet2").css("opacity", 0.5);
			$("#navBullet3").css("opacity", 1);
		})
		
		
		// User Login Modal
		$("#getStarted").on("click", function() {
			$("#myModal").modal();
		});

		// Chevron Scroll click
		$("#learnMoreChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection1");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")    
		});
		$("#toHomeChevron").on("click", function() {
			var container = $("body");
			container.animate({scrollTop: 0}, 1500, "easeInOutQuint") 
		})
		$("#toSection2DownChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection2");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")
		})
		$("#toSection1UpChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection1");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")
		})
		$("#toSection3DownChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection3");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")
		})
		$("#toSection2UpChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection2");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")
		})
	}
}

$(document).ready(pageLoad);
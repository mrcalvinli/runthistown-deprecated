function pageLoad() {
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

	$(".userDelFriendLink").append('<button id = "userDelFriendBtn" class = "btn btn-warning" style = "float: right; margin-top: 36px; margin-right: 10px; ">Delete Friend</button>')
	$(".userAddFriendLink").append('<button id = "userAddFriendBtn" class = "btn btn-warning" style = "float: right; margin-top: 36px; margin-right: 10px; ">Add Friend</button>')
}

$(document).on("page:load", pageLoad);
$(document).ready(pageLoad);
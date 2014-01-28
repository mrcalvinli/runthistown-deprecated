// function friendListLoad() {
// 	var containerHeight = $(window).height() - 80;
// 	$(window).resize(function(){
// 		$("#userListContainer").height($(window).height() - 80)
// 	});
// 	setTimeout(function() {
// 			$("#userListContainer").animate({"width": "100%"}, 500, "easeOutExpo");
			
// 			$("#userListContainer").animate({"height": containerHeight}, 1000, "easeOutBounce", function() {
// 				$("#userListContainer").css("overflow", "auto");
// 			});
// 			/*setTimeout(function() {
// 				var containerHeight = $(window).height() - 55
// 				$("#userListContainer").animate({"height": containerHeight}, 800, "easeOutBounce");
// 			},
// 				100
// 			);*/
// 		}, 300
// 	);

// 	$(".userDelFriendLink").append('<button id = "userDelFriendBtn" class = "btn btn-warning" style = "float: right; margin-top: 36px; margin-right: 10px; ">Delete Friend</button>')
// 	$(".userAddFriendLink").append('<button id = "userAddFriendBtn" class = "btn btn-warning" style = "float: right; margin-top: 36px; margin-right: 10px; ">Add Friend</button>')

// 	var col1html = $("#userCol1").val();
// 	var col2html = $("#userCol2").val();

// 	if (col1html == "" && col2html == "") {
// 		console.log("yes");
// 		$("#userListContainer").append($("<div style = 'position: absolute; height: 100%; width: 100%; text-align: center; '><h2 style = 'margin-top: 30%; '>You have no friends :( <br> ...yet. Click the search bar above to look for people you know</h2></div>"));
// 	}
// }

// $(document).on("page:load", friendListLoad);
// $(document).ready(friendListLoad);


function pageLoad() {
    console.log("YO");
    if ($("#currentPasswordEdit").val() == "") {
      document.getElementById("updateProfBtn").disabled = true;
    }
    $("#currentPasswordEdit").bind("propertychange keyup input paste", function() {
      console.log("change");
      if ($("#currentPasswordEdit").val() == "") {
        document.getElementById("updateProfBtn").disabled = true;
      } else {
        document.getElementById("updateProfBtn").disabled = false;
      }
    });

  }
  $(document).on("page:load", pageLoad);
  $(document).ready(pageLoad);
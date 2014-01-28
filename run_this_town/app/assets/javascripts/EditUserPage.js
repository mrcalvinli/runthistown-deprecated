function editUserPageLoad() {
    if ($("#currentPasswordEdit").val() == "") {
      document.getElementById("updateProfBtn").disabled = true;
    }
    $("#currentPasswordEdit").bind("propertychange keyup input paste", function() {
      if ($("#currentPasswordEdit").val() == "") {
        document.getElementById("updateProfBtn").disabled = true;
      } else {
        document.getElementById("updateProfBtn").disabled = false;
      }
    });

  }

  $(document).ready(editUserPageLoad);
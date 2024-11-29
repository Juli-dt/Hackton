document.querySelectorAll('input[name="formSelector"]').forEach((elem) => {
  elem.addEventListener("change", function(event) {
      var value = event.target.value;
      document.getElementById("formFoundations").style.display = value === "form1" ? "block" : "none";
      document.getElementById("formDonors").style.display = value === "form2" ? "block" : "none";
  });
});
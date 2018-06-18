$(document).ready(function() {

  var travels = [
    "paris", "barcelona", "florence", "seoul", "beijing",
    "tokyo", "rome", "istanbul", "prague", "dubai",
    "hong kong", "mexico city", "sydney", "berlin", "bangkok",
    "ubud", "oaxaca", "lisbon", "geneva", "vancouver", "taipei", 
    "ibiza", "yvoire", "antwerp", "venice", "zermatt", "london",
    "budapest"
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".travel-button", function() {
    $("#travels").empty();
    $(".travel-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var travelDiv = $("<div class=\"travel-item\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var travelImage = $("<img>");
        travelImage.attr("src", still);
        travelImage.attr("data-still", still);
        travelImage.attr("data-animate", animated);
        travelImage.attr("data-state", "still");
        travelImage.addClass("travel-image");

        travelDiv.append(p);
        travelDiv.append(travelImage);

        $("#travels").append(travelDiv);
      }
    });
  });

  $(document).on("click", ".travel-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-travel").on("click", function(event) {
    event.preventDefault();
    var newTravel = $("input").eq(0).val();

    if (newTravel.length > 2) {
      travels.push(newTravel);
    }

    populateButtons(travels, "travel-button", "#travel-buttons");

  });

  populateButtons(travels, "travel-button", "#travel-buttons");
});




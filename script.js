//********* BUILDING MODALS JAVASCRIPT FUNCTIONALITY! ***********//

//get all the building links in an array
var buildingLinks = [document.getElementById("g"), 
                    document.getElementById("h"), 
                    document.getElementById("m"), 
                    document.getElementById("c")];

//gets all the close buttons
var exit = document.getElementsByClassName("close");

//function to make building modals appear when clicked; takes specified modal & building svg
function dropModal(modal, building) {
    //series of if statements to change body bg color depending on modal selected
    if (modal === 'gmodal') {
        bgColor("#b5c7da");
    }
    if (modal === 'hmodal') {
        bgColor("#c4b7aa");
    }
    if (modal === 'mmodal') {
        bgColor("#517764");
    }
    if (modal === 'cmodal') {
        bgColor("#ac614e");
    }
    //hides all the building name links by iterating through the array defined earlier
    for (var i = 0; i < buildingLinks.length; i++) {
        buildingLinks[i].style.visibility = "hidden";
    }
    //display modal & enlarge specified building svg
    document.getElementById(modal).style.display = "block";


      function myFunction(x) {
        if (x.matches) { // If media query matches
            document.getElementById(building).style.transform = "scale(1.2) translate(0px, -10px)";
        } else {
            document.getElementById(building).style.transform = "scale(1.2) translate(0px, -30px)";
        }
      }
      
      var x = window.matchMedia("(max-width: 500px)");
      myFunction(x); // Call listener function at run time
      x.addListener(myFunction); // Attach listener function on state changes

    
    //closing the modal using the exit var (which stores all the close buttons by class name)
    for (var i = 0; i < exit.length; i++) {
        //following function restores bg color to white, shows building links, hides modal, & scales building svg back down
        exit[i].onclick = function() {
            bgColor("white");
            for (var i = 0; i < buildingLinks.length; i++) {
                buildingLinks[i].style.visibility = "visible";
            }
            document.getElementById(modal).style.display = "none";
            document.getElementById(building).style.transform = "scale(1) translate(0px, 0px)";
        }
    }
}

function bgColor(color) {
    document.body.style.backgroundColor = color;
}

//hamburger style navbar toggle
function openNav() {
    document.getElementById("mySidebar").style.width = "30%";
    document.getElementById("darkLayer").style.visibility = "visible";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("darkLayer").style.visibility = "hidden";
  }


/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function() {
  var height = $(window).scrollTop();
  if (height > 30) {
      $('#back2Top').fadeIn();
  } else {
      $('#back2Top').fadeOut(100);
  }
});
$(document).ready(function() {
  $("#back2Top").click(function(event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
  });

});
/*Scroll to top when arrow up clicked END*/

//toggle duty and desk info
function show(item) {
    var reveal = document.getElementById(item);
    if (reveal.style.display === "block") {
        reveal.style.display = "none";
    }
    else {
        reveal.style.display = "block";
    }
}
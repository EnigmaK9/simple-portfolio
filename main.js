// hide all sections on page load
document.addEventListener("DOMContentLoaded", function() {
    var sections = document.querySelectorAll("main section");
    for (var i = 0; i < sections.length; i++) {
      sections[i].style.display = "none";
    }
  });
  
  // show the selected section and hide the others
  function showSection(id) {
    var sections = document.querySelectorAll("main section");
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].id === id) {
        sections[i].style.display = "block";
      } else {
        sections[i].style.display = "none";
      }
    }
  }
  
  // add active class to selected nav link and remove from others
  function setActiveNavLink(id) {
    var links = document.querySelectorAll("nav a");
    for (var i = 0; i < links.length; i++) {
      if (links[i].id === id) {
        links[i].classList.add("active");
      } else {
        links[i].classList.remove("active");
      }
    }
  }
  
  // handle nav link clicks
  var navLinks = document.querySelectorAll("nav a");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function(event) {
      event.preventDefault();
      showSection(event.target.href.split("#")[1]);
      setActiveNavLink(event.target.id);
    });
  }
  

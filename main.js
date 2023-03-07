// hide all sections on page load
document.addEventListener("DOMContentLoaded", function() {
  var sections = document.querySelectorAll("main section");
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
});

// show the selected section and hide the others
document.addEventListener("DOMContentLoaded", function() {
  var sections = document.querySelectorAll("main section");
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.remove("show");
  }
});

function showSection(id) {
  var sections = document.querySelectorAll("main section");
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].id === id) {
      sections[i].classList.add("show");
    } else {
      sections[i].classList.remove("show");
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
    var id = event.target.href.split("#")[1];
    if (id === "contact") {
      // if the contact section is clicked, show a confirmation message
      var confirmation = confirm("Are you sure you want to go to the contact section?");
      if (confirmation) {
        showSection(id);
        setActiveNavLink(event.target.id);
      }
    } else {
      showSection(id);
      setActiveNavLink(event.target.id);
    }
  });
}

// handle form submit
var form = document.getElementById("contact-form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  // validate form fields
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var message = document.getElementById("message");
  if (name.value === "" || email.value === "" || message.value === "") {
    alert("Please fill out all fields.");
    return;
  }
  // if form fields are valid, submit the form
  alert("Form submitted successfully!");
  form.reset();
});

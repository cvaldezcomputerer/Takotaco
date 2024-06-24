var goingTop = false;
var btnImg = $("#myBtnImg"); // Use jQuery for selecting elements

// Note, in future add animation flying to the top
$(window).scroll(function () {
  if (
    ($(document).scrollTop() > 0 || $("html").scrollTop() > 0) &&
    goingTop == false
  ) {
    btnImg.attr("src", "./images/catScroll.png"); // Change the image when scrolling
  } else if (goingTop) {
    // Specific case that we're going to the top
    // Set a delay of 800 milliseconds before changing the image back
    setTimeout(function () {
      btnImg.attr("src", "./images/catTop.png");
      goingTop = false;
    }, 800);
  } else {
    // If we're at the top
    btnImg.attr("src", "./images/catTop.png");
  }
});

function topFunction() {
  // Immediately change the image when the button is clicked
  var btnImg = $("#myBtnImg");
  btnImg.attr("src", "./images/catClicked.png");

  // Check if the page is already at the top
  if ($(document).scrollTop() === 0 && $("html").scrollTop() === 0) {
    return; // Exit if already at the top
  }

  // Smooth scroll to the top
  $("html, body").animate({ scrollTop: 0 }, 80);

  goingTop = true;
}

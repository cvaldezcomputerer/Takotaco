var goingTop = false;
var btnImg = document.getElementById("myBtnImg");

//note, in future add animiaton flying to the top
window.onscroll = function () {
  if (
    (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) &&
    goingTop == false
  ) {
    btnImg.src = "./images/catScroll.png"; // Change the image when scrolling
  } else if (goingTop) {
    //specifc case that we're going to the top
    // Set a delay of 3 seconds (3000 milliseconds) before changing the image back
    setTimeout(function () {
      btnImg.src = "./images/catTop.png";
      goingTop = false;
    }, 800);
  } else {
    //if we're at the top
    btnImg.src = "./images/catTop.png";
  }
};

function topFunction() {
  // Check if the page is already at the top
  if (
    document.body.scrollTop === 0 &&
    document.documentElement.scrollTop === 0
  ) {
    // If it is, return without doing anything
    return;
  }

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  btnImg = document.getElementById("myBtnImg");
  btnImg.src = "./images/catClicked.png"; // Change the image when the button is clicked
  goingTop = true;
}

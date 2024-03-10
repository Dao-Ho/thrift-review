console.log("Script loaded successfully.");

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("#titlescroll button");
    buttons.forEach(button => {
      button.addEventListener("click", function () {
        showReviewContent(this);
      });
    });
  });
  
//use index from button, since index is client side,
// we fetch for the review content from the server using the index
function showReviewContent(button) {
  const index = button.dataset.index;
  console.log("index: ", index);

  fetch(`/getReviewContent?index=${index}`)
    .then((response) => response.json())
    .then((data) => {
      const reviewContent = data.reviewContent ? data.reviewContent : " "; // Default value if review content is not available
      console.log("Button clicked. Review content:", reviewContent);

      // Update the content div with the review content
      document.getElementById("content").innerText = reviewContent;
    });
}

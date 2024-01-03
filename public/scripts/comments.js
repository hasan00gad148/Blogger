const addCommentForm  = document.querySelector(".add-comment");
const loadCommentBtn = document.querySelector(".load-comments-btn");
const moreCommentBtn = document.querySelector(".more-comments-btn");
const commentslist = document.querySelector(".comments-list");

var commentsCount = 0;




function loadComments(){

    const postid = loadCommentBtn.dataset.postid; 
    fetch(`/posts/${postid}/comments?skip=${commentsCount} `)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        if (!data.success) {
            commentslist.children[0].innerHTML = "no comments found yet";
            alert("An error occurred")
           
            return false;
        }
        if (data.comments && data.comments.length>0){
           // console.log("hi there !!!! comments",commentsCount);
            commentsCount+=data.comments.length;
            data.comments.forEach(comment=>{
                commentslist.children[1].innerHTML += `
                <li>
                <h3>${comment.title}</h3>
                <p>${comment.content}</p>
                </li>`;
            })
        }else{
            if (commentsCount==0)
            commentslist.children[0].innerHTML = "no comments found yet";
             else alert("no more comments found");
        }
      })
      .catch(error => {
        // Handle the error
        alert("An error occurred")
        console.error(error);
      });




}
loadCommentBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log("hi there !!!!, i'm loadCommentBtn click"); 
    loadCommentBtn.style.display="none";
    commentslist.style.display="grid";


    loadComments()

});

moreCommentBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log("hi there !!!!, i'm moreCommentBtn click"); 
    loadComments()

});






addCommentForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const postid = addCommentForm.dataset.postid; 
    const formdata = new FormData(addCommentForm);
    fetch(`/posts/${postid}/comment`, {
        method: "POST",
        body: formdata,

      })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        if(data.success)
            alert("comment added successfully")
        else
            alert("An error occurred");
      })
      .catch(error => {
        // Handle the error
        alert("An error occurred")
        console.error(error);
      });
});
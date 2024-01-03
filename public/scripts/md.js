const previewBtn = document.querySelector("form a");
const mdBlocks = document.querySelector("md-block");
const content = document.getElementById("content");

console.log("hi there!",mdBlocks); 

var toggle = true;

previewBtn.addEventListener("click",e=>{
    e.preventDefault();
    if(toggle){
        previewBtn.textContent = "edit";
        content.style.display = "none";
        mdBlocks.style.display = "block";
       
        mdBlocks.mdContent=content.value;
        toggle = false;
    }else{
        content.style.display = "block";
        mdBlocks.style.display = "none";
        toggle = true;
    }
    console.log(mdBlocks.mdContent,content.value);
}); 
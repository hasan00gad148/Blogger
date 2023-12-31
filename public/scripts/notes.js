const del_btns = document.querySelectorAll(".del-btn");
const no_btns= document.querySelectorAll('aside ul > li:nth-of-type(2) a');
const aside = document.querySelector('aside');

const yes_btn= document.querySelector('aside ul > li:nth-of-type(1) a');

del_btns.forEach((btn) => {
    btn.addEventListener('click',(e) => {
        e.preventDefault();
        console.log('del_btn clicked');
        console.log(btn.getAttribute('href'));
        aside.style.display="block";
        yes_btn.href=btn.getAttribute('href');
    });

});
yes_btn.addEventListener('click',(e) => {
    e.preventDefault();

    
    fetch(yes_btn.getAttribute('href'), {
        method: "POST",
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        if(data.success){
            alert("note deleted successfully")
            window.location.reload();
        }
        else
            alert("An error occurred");
        console.log(data.success);
      })
      .catch(error => {
        // Handle the error
        alert("An error occurred");
        console.error(error);
      });

});

no_btns.forEach((btn)=>{
    btn.addEventListener('click',(e) => {
        e.preventDefault();
        console.log('no_btn clicked');
        aside.style.display="none";
    });
});
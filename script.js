
  let slideIndex = 0;
  showSlides();
  
  var modal = document.getElementById('id01');
  
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  const sql = require("mssql/msnodesqlv8");
var config = {
    server : "DESKTOP-2TC9IM9\\SQLEXPRESS",
    database : "duplicate",
    driver : "msnodesqlv8",
    option:{
        trustedConnection:true
    }
}
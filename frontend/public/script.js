const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; 
var fileobj;


button.onclick = ()=>{
  input.click(); 
  file_browse();
}

input.addEventListener("change", function(){
  
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); 
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); 
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); 
  file = event.dataTransfer.files[0];
  showFile(); 
});

function showFile(){
  let fileType = file.type; 
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 
  if(validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; 
      let imgTag = `<img src="${fileURL}" alt="">`; 
      dropArea.innerHTML = imgTag; 
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}


function upload_file(e) {
    e.preventDefault();
    fileobj = e.dataTransfer.files[0];
    js_file_upload(fileobj);
}

function file_browse() {
  document.getElementById('file').onchange = function() {
      fileobj = document.getElementById('file').files[0];
      js_file_upload(fileobj);
  };
}


function js_file_upload(file_obj) {
    if(file_obj != undefined) {
        var form_data = new FormData();                  
        form_data.append('file', file_obj);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "upload.php", true);
        xhttp.onload = function(event) {
           
            if (xhttp.status == 200) {
                console.log("Uploaded!");
            } else {
               alert(xhttp.status);
            }
        }
 
        xhttp.send(form_data);
    }
}
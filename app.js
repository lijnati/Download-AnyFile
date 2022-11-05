const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e  => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);

});

function fetchFile(url){
   //fetch file & returning response as blob
  fetch(url).then(res => res.blob()).then(file => {
    let tempUrl = URL.createObjectURL(file);
    let aTag = document.createElement("a");
    aTag.href = tempUrl;// passing tempUrl as href value of <a> tag
    aTag.download = url.replace(/^.*[\\\/]/, ``);// passing file last name & extension a download value of <a> tag
    document.body.appendChild(aTag);// adding <a> tag inside body
    aTag.click(); //clickng <a> tag so the file download
    aTag.remove(); // removing <a> tag once file downloaded
    URL.revokeObjectURL(tempUrl);//removing tempUrl from the document
    downloadBtn.innerText = "Download file...";
  }).catch(() => {
    // catch method will call if any error comes during downloading
    downloadBtn.innerText = "Download file...";
    alert("Failed to downoload file!")
  })
}
function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function handleSuccess(stream) {
    const video = document.getElementById("videoScreen");
    video.srcObject = stream;
}

function handleError(error) {
    console.error("Error: ", error);
}

function getStream(){
    if (hasGetUserMedia()) {
        const constraints = {
            video: true,
        };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(handleSuccess)
            .catch(handleError);

    } else {
        alert("Erreur lors de la récupération du flux vidéo");
    }

}
function screenshot() {
    const img = document.getElementById("imgResult");
    const video = document.getElementById("videoScreen");
    const canvas = document.getElementById("canvas");
    video.setAttribute("style","display: none");
    canvas.setAttribute("style","display: none");
    img.setAttribute("src","#");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0); // Récupération de la capture et l'envoyer dans un canvas, cela permet d'avoir une adresse pour l'image
    img.setAttribute("src",canvas.toDataURL("image/png"));
    img.setAttribute("style","display: inline-block");
    printData();

}
function saveIMG(){
    const save = document.getElementById("saveButton");
    const img = document.getElementById("imgResult");
    const date = new Date();
    save.setAttribute("href",img.src);
    save.setAttribute("download","IMG_"+date.getDate()+""+date.getMonth()+""+date.getFullYear()+"-"+date.getHours()+""+date.getMinutes()+""+date.getSeconds()+".jpg");
}

function geolocalize (){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showGeoPositions); //callback si tout se passe bien, réussi à récupérer la position
    }else{
        document.getElementById("Latitude").innerHTML = "Information non disponible";
        document.getElementById("Longitude").innerHTML = "Information non disponible";
    }
}

function showGeoPositions (position) {
    document.getElementById("Latitude").innerHTML= "Latitude : "+position.coords.latitude;
    document.getElementById("Longitude").innerHTML = "Longitude : "+ position.coords.longitude ;
}

function printData(){
    geolocalize();
    const date = new Date();
    const dateTime = document.getElementById("DateTime");
    dateTime.textContent = "Date/Time : "+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

function drawViewfinder(){
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    let width = ctx.canvas.clientWidth;
    let height = ctx.canvas.clientHeight;
    let rayon = width/8;
    ctx.strokeStyle = 'red';
    c.setAttribute('style', 'background-color : rgba(0,0,0,0)');
    //cercle central
    ctx.beginPath();
    ctx.arc(width/2, height/2, rayon, 0, 2 * Math.PI);
    ctx.stroke()
    //trait haut
    ctx.moveTo(width/2 , height/2 - 2*rayon);
    ctx.lineTo(width/2, height/2 - rayon);
    ctx.stroke();
    //trait droit
    ctx.moveTo(width/2 + 2*rayon, height/2);
    ctx.lineTo(width/2 + rayon, height/2);
    ctx.stroke();
    //trait bas
    ctx.moveTo(width/2 , height/2 + 2*rayon);
    ctx.lineTo(width/2, height/2 + rayon);
    ctx.stroke();
    //trait gauche
    ctx.moveTo(width/2 - 2*rayon, height/2);
    ctx.lineTo(width/2 - rayon, height/2);
    ctx.stroke();
}






function main(){
    getStream();
    drawViewfinder();
    const shootButton = document.getElementById("shootButton");
    shootButton.addEventListener("click", ()=>{
        screenshot();
    });
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", ()=>{
        location.reload();
    });
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", ()=>{
        saveIMG();
    });
}

main();
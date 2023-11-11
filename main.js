Webcam.set({
    width: 380,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='snap' src='" + data_uri + "'>";
    });
    document.getElementById("result").style.height = "300px";
    document.getElementById("result").style.width = "380px";
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HAQXgTWZA/model.json", modelLoaded);

function modelLoaded(){
    console.log("model is ready");
}

function check() {
    img = document.getElementById('snap');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}
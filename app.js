const express=require("express");

const https=require("https");

const bodyparser=require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
     res.sendFile(__dirname + "/index.html");
})

app.post("/",function(request,respond){
    const query=request.body.cityname;
const apikey="dbfcb76bb7d7cbab134dfcb26191cb73";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit + " ";
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const weather=weatherData.weather[0].main;
        const icon=weatherData.weather[0].icon;
        const imgurl="https://openweathermap.org/img/wn/" + icon + "@2x.png";
       respond.write("<p>The weather is currently " + weather + "<p>");
       respond.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
       respond.write("<img src=" + imgurl + ">");
       respond.send();
    })
   })
})




app.listen(3000||6000||process.env,function(){
    console.log("app is running at port 6000");
})

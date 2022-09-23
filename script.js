const button = document.querySelector(".btn");
const locationref = document.querySelector(".location-input");
const tempref = document.querySelector(".temp");
const weatherref =document.querySelector(".weather");
const main = document.querySelector(".main"); //Reference to container that aska the user for location input
const dayNightImage = document.querySelector(".day-night-img"); //Reference to img tag for day or night time representation
const locationNameRef = document.querySelector(".location-name");
const errorUnavailable = document.querySelector(".error-unavailable");
var locationEnglishName;



const apikey = "oBLwMOIxskp8o0Qt93hnT2GMRcKb2JsS";
const locationkeyurl = "http://dataservice.accuweather.com/locations/v1/search?q="
const currentconditionsurl = "http://dataservice.accuweather.com/currentconditions/v1/"
const amp = "&";
const qm = "?";
button.addEventListener("click",(e)=>{
    e.preventDefault();
    let location_value = locationref.value;
    if(location_value === ""){
        alert("Please enter a location");
        locationref.style.border = "1px solid red";
    }
    else{
    errorUnavailable.innerText = "";
    locationref.style.border = "1px solid #767676";
    let resource = locationkeyurl+location_value+amp+"apikey="+apikey;
    console.log(resource);
    get_location_key(resource).then((data)=>{
        console.log(data);
        let temp = data[0].Temperature.Metric.Value;
        let weather = data[0].WeatherText;
        let isDayTime = data[0].IsDayTime;
        tempref.innerHTML = temp+" &deg;"+"C";
        weatherref.innerText = weather;
        locationNameRef.innerText = locationEnglishName;
        if(isDayTime){
            dayNightImage.src = "images/daytime.jpg"
        }
        else{
            dayNightImage.src = "images/nighttime.jpg"
        }
        // main.style.display = "none"
        
        
        
    }).catch((err)=>{
        console.log(err.message);
        if(err.message == "Location not found in weather Database"){
            errorUnavailable.innerText = "No weather information found for " + `"${location_value}"`;
            tempref.innerHTML = "";
            weatherref.innerText= "";
            locationNameRef.innerText="";
            dayNightImage.src="";
        }
        
    })


    }
})

let get_location_key = async(resource)=>{
    const responseOne = await fetch(resource);
    if(responseOne.status !== 200){
        throw new Error("Could not load resource");
    }
    const data = await responseOne.json();
    console.log(data);
    if(data[0] === undefined){
        throw new Error("Location not found in weather Database");
    }
    locationEnglishName = data[0].EnglishName;
    console.log(locationEnglishName);
    let locationkey = data[0].Key;

    let currentconditionresource = currentconditionsurl+locationkey+qm+"apikey="+apikey;
    const responseTwo = await fetch(currentconditionresource);
    if(responseTwo.status !== 200){
        throw new Error("Could not load resource");
    }
    const dataTwo = await responseTwo.json();
    
   return dataTwo;
}

let offline_test = async()=>{
  const responseObject = await fetch("file.json");
  const data = responseObject.json();

  return data;
}

    // offline_test().then((data)=>{
    //     console.log(data);
    //     let city = data[0].City
    //     let temp = data[0].Temperature.Metric.value
    //     console.log(city,temp);
    // })

  let test_array = [];
    console.log(Array.isArray(test_array));
   
// if(test_array[0] === undefined){
//     console.log("it is undefined");
// }else console.log(test_array[0]);
  


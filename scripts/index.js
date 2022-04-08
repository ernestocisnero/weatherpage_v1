async function getWeatherLocation(location){
    let apiKey = config.KEY;


    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`);
        let data = await response.json();
        if(!response.ok) throw {HttpResponse: response.status,ErrorCode:data.error.code, ErrorMessage:data.error.message}

        let name = data.location.name;
        let region = data.location.region;
        let country = data.location.country;
        let temp_c = data.current.temp_c;
        let temp_f = data.current.temp_f;
        let condition = data.current.condition;
        let humidity = data.current.humidity;
        let feelslike_c = data.current.feelslike_c;
        let feelslike_f = data.current.feelslike_f;

        return {
            name,
            region,
            country,
            temp_c,
            temp_f,
            condition,
            humidity,
            feelslike_c,
            feelslike_f
        }
        
    } catch (error) {
        console.log(`ERROR: Server response: ${error.HttpResponse},Error code:${error.ErrorCode}, Error Message:${error.ErrorMessage}`);
        
    }   
}


window.addEventListener("load", e =>{
    let $submitButton = document.querySelector("#submit-button");
    $submitButton.preven

    $submitButton.addEventListener("click", async e=>{
        e.preventDefault();
        let $location = document.querySelector("#country-input").value;
        let $cards = document.querySelector(".cards");
        let $name = document.querySelector("#name");
        let $region = document.querySelector("#region");
        let $country = document.querySelector("#country");
        let $temp_c = document.querySelector("#temp_c");
        let $temp_f = document.querySelector("#temp_f");
        let $humidity = document.querySelector("#humidity");
        let $feelslike_c = document.querySelector("#feelslike_c");
        let $feelslike_f = document.querySelector("#feelslike_f");

        if(!$location){
            alert("Enter a valid location");
            //Create a function to display a pesonalized window 
        }

        let dataObjectResponse = await getWeatherLocation($location);
        console.log(dataObjectResponse);

        $name.textContent = `Name: ${dataObjectResponse.name}`;
        $temp_c.textContent = `Temp (C): ${dataObjectResponse.temp_c}`;
        $temp_f.textContent = `Temp (F): ${dataObjectResponse.temp_f}`;
        $humidity.textContent = `Humidity (%):${dataObjectResponse.humidity}`;


        // $region.textContent = `Region: ${dataObjectResponse.region}`;
        // $country.textContent = `Country: ${dataObjectResponse.country}`;
        // $feelslike_c.textContent = `Feels Like (C):${dataObjectResponse.feelslike_c}`;
        // $feelslike_f.textContent = `Feels Like (F):${dataObjectResponse.feelslike_f}`;
        

    
       


        
        
        


        


        
    });
    
    







});
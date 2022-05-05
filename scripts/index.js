async function getWeatherLocation(location) {
    let apiKey = config.KEY;
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`);
        let data = await response.json();
        if (!response.ok) throw { HttpResponse: response.status, ErrorCode: data.error.code, ErrorMessage: data.error.message }

        let name = data.location.name;
        let temp_c = data.current.temp_c;
        let temp_f = data.current.temp_f;
        let condition = data.current.condition;
        let humidity = data.current.humidity;
        let feelslike_c = data.current.feelslike_c;
        let feelslike_f = data.current.feelslike_f;

        return {
            ok: true,
            name,
            temp_c,
            temp_f,
            condition,
            humidity,
            feelslike_c,
            feelslike_f
        }

    } catch (error) {
        console.log(`ERROR: Server response: ${error.HttpResponse},Error code:${error.ErrorCode}, Error Message:${error.ErrorMessage}`);
        return {
            ok: false,
            errorResponse: error.HttpResponse,
            errorCode: error.ErrorCode,
            errorMessage: error.ErrorMessage
        }
    }
}

async function getPhotoLocation(photoLocation){

    const API_KEY = config.API_KEY;
    const SECRET_KEY = config.SECRET_KEY;
    try{
        /* Converting the API_KEY and SECRET_KEY to base64. */
        let auth = btoa(`${API_KEY}:${SECRET_KEY}`);

        /* This is a fetch request to the API. */
        let responsePhoto = await fetch(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${photoLocation}`,{
            method:'GET',headers:{'Authorization': `Basic ${auth}`}
        }); 
        
        if (!responsePhoto.ok) throw { HttpResponse: responsePhoto.status, ErrorMessage: responsePhoto.statusText }

        let dataResponse = await responsePhoto.json();
        let photoURL = dataResponse.included[0].attributes.image.medium;  
        return {
            URL:photoURL,
            ok:true
        }; 
        
    }
    catch(error){
        console.log(`ERROR: Server response: ${error.HttpResponse}, Error Message:${error.ErrorMessage}`);
        return {
            URL: '',
            ok: false,
            Error: error.HttpResponse,
            ErrorMsg: error.errorMessage
        }; 

    }

}

window.addEventListener("load", e => {
    let $submitButton = document.querySelector("#submit-button");
    let $form = document.querySelector("#form");
    let $cards = document.querySelector(".cards");
    let $name = document.querySelector("#name");
    let $temp_c = document.querySelector("#temp_c");
    let $temp_f = document.querySelector("#temp_f");
    let $humidity = document.querySelector("#humidity");
    // let $feelslike_c = document.querySelector("#feelslike_c");
    // let $feelslike_f = document.querySelector("#feelslike_f");
    let $conditon = document.querySelector("#weather-condition");
    let $location = document.querySelector("#country-input");
    let $image = document.querySelector(".city-name");

    $submitButton.addEventListener("click", async e => {
        e.preventDefault();

        if (!$location.value) {
            alert("Sorry! Location not provided.");
            $cards.classList.add("hide");
        } else {

            let dataObjectResponse = await getWeatherLocation($location.value);
            let locationPhoto = await getPhotoLocation($location.value);
            $image.setAttribute('src',locationPhoto.URL);

            if (dataObjectResponse.ok && locationPhoto.ok) {
                $name.textContent = `  ${dataObjectResponse.name}`;
                $temp_c.textContent = ` (C):${dataObjectResponse.temp_c}`;
                $temp_f.textContent = ` (F):${dataObjectResponse.temp_f}`;
                $humidity.textContent = ` (%):${dataObjectResponse.humidity}`;
                $conditon.textContent = ` ${dataObjectResponse.condition.text}`;
                // $feelslike_c.textContent = `Feels Like (C):${dataObjectResponse.feelslike_c}`;
                // $feelslike_f.textContent = `Feels Like (F):${dataObjectResponse.feelslike_f}`;
                $cards.classList.remove("hide");
                $form.reset();
            } else {
                alert(`Error! Server response: ${dataObjectResponse.errorResponse},Error code:${dataObjectResponse.errorCode}, Error Message:${dataObjectResponse.errorMessage}`)
                alert(`Error! Server response: ${locationPhoto.Error}, Error Message:${locationPhoto.ErrorMsg}`)
                $cards.classList.add("hide");
                $form.reset();
            }

        }
    });









});
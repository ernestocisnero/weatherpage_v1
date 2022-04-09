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


window.addEventListener("load", e => {
    let $submitButton = document.querySelector("#submit-button");
    let $form = document.querySelector("#form");
    let $cards = document.querySelector(".cards");
    let $name = document.querySelector("#name");
    let $temp_c = document.querySelector("#temp_c");
    let $temp_f = document.querySelector("#temp_f");
    let $humidity = document.querySelector("#humidity");
    let $feelslike_c = document.querySelector("#feelslike_c");
    let $feelslike_f = document.querySelector("#feelslike_f");
    let $conditon = document.querySelector("#condition");
    let $location = document.querySelector("#country-input");

    $submitButton.addEventListener("click", async e => {
        e.preventDefault();

        if (!$location.value) {
            alert("Sorry! Location not provided.");
            $cards.classList.add("hide");
        } else {

            let dataObjectResponse = await getWeatherLocation($location.value);

            if (dataObjectResponse.ok) {
                $name.textContent = `Name:${dataObjectResponse.name}`;
                $temp_c.textContent = `Temp (C):${dataObjectResponse.temp_c}`;
                $temp_f.textContent = `Temp (F):${dataObjectResponse.temp_f}`;
                $humidity.textContent = `Humidity (%):${dataObjectResponse.humidity}`;
                $conditon.textContent = `Weather condition:${dataObjectResponse.condition.text}`;
                $feelslike_c.textContent = `Feels Like (C):${dataObjectResponse.feelslike_c}`;
                $feelslike_f.textContent = `Feels Like (F):${dataObjectResponse.feelslike_f}`;
                $cards.classList.remove("hide");
                $form.reset();
            } else {
                alert(`Error! Server response: ${dataObjectResponse.errorResponse},Error code:${dataObjectResponse.errorCode}, Error Message:${dataObjectResponse.errorMessage}`)
                $cards.classList.add("hide");
                $form.reset();
            }

        }














    });









});
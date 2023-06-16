if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

async function requestAPI(lat, lon) {
  try {
    const reponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=54e94c17fdab44f4beb132817231506&q=${
        lat + "," + lon
      }&lang=pt&days=1&aqi=no&alerts=no`
    );
    const infoClima = await reponse.json();

    const infoUtil = {
      name: infoClima.location.name,
      temperatura: infoClima.current.temp_c,
      max: infoClima.forecast.forecastday[0].day.maxtemp_c,
      min: infoClima.forecast.forecastday[0].day.mintemp_c,
      chuva: infoClima.current.precip_mm,
      condition: infoClima.current.condition.text,
      sensation: infoClima.current.feelslike_c,
    };

    console.log(infoClima);
    console.log(infoUtil);


    return infoUtil;
  } catch (error) {
    alert("Erro na chamada API");
  }
}

function errorCallback(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert(
        "Ao negar sua localização, a aplicação pode não funcionar corretamente."
      );
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Localização informada não é valida.");
      break;
    case error.TIMEOUT:
      alert("A requisição de localização expirou.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Aconteceu um erro inesperado.");
      break;
  }
}

async function successCallback(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  const retornoAPI = await requestAPI(latitude, longitude);

  let name = retornoAPI.name;
  let temp = retornoAPI.temperatura;
  let max = retornoAPI.max;
  let min = retornoAPI.min;
  let chuva = retornoAPI.chuva + "%";
  let condic = retornoAPI.condition;
  let sens = retornoAPI.sensation;

  let pCity = document.getElementById("nomeCity");
  let pTemp = document.getElementById("tempAtual");
  let pmaxTemp = document.getElementById("tempMax");
  let pminTemp = document.getElementById("tempMin");
  let pChuva = document.getElementById("percRain");
  let pSensi = document.getElementById("sensTemp");
  let pCondic = document.getElementById("condicTemp");

  pCity.innerText = name;
  pTemp.innerText = temp;
  pmaxTemp.innerText = max;
  pminTemp.innerText = min;
  pChuva.innerText = chuva;
  pSensi.innerText = sens;
  pCondic.innerText = condic;
}

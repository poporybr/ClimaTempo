if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

async function successCallback(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  const retornoAPI = await requestAPI(latitude, longitude);

  let name = retornoAPI.name;
  let temp = retornoAPI.temperatura;
  let chuva = retornoAPI.chuva * 100 + '%';
  let condic = retornoAPI.condition;
  let sens = retornoAPI.sensation;

  let pCity = document.getElementById("nomeCity");
  let pTemp = document.getElementById("tempAtual");
  let pChuva = document.getElementById("percRain");
  let pSensi = document.getElementById("sensTemp");
  let pCondic = document.getElementById("condicTemp");

  pCity.innerText = name;
  pTemp.innerText = temp;
  pChuva.innerText= chuva
  pSensi.innerText = sens;
  pCondic.innerText = condic;
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

async function requestAPI(lat, lon) {
  try {
    const reponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=54e94c17fdab44f4beb132817231506&q=${
        lat + "," + lon
      }&lang=pt`
    );
    const infoClima = await reponse.json();

    const infoUtil = {
      name: infoClima.location.name,
      temperatura: infoClima.current.temp_c,
      chuva: infoClima.current.precip_mm,
      condition: infoClima.current.condition.text,
      sensation: infoClima.current.feelslike_c,
    };
    console.log(infoClima);
    console.log(infoUtil);
    return infoUtil;
  } catch (error) {
    console.log("Erro na execução");
  }
}

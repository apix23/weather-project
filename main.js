
const cities = [];
cities.push({
    name : "Baardheere",
    longitude: 41.38,
    latitude: 2.15
})

cities.push({
    name: "Otlukbeli",
    latitude: 59.4,
    longitude :9.22
})

cities.push({
    name :"Gvarv",
    latitude: 40,
    longitude : 40
})
cities.push({
    name :"Adré",
    latitude: 4,
    longitude : 40
})
cities.push({
    name :"Moyale",
    latitude: 13,
    longitude : 22
})
cities.push({
    name :"Gvarv",
    latitude: 4,
    longitude : 15
})


const get = (latitude, longitude, onSuccess,onFail) => {
    fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=94732983488740c7ac18361880e08e1d`)
    .then((response) =>response.json())
    .then((myJson) => {
        onSuccess(myJson)
        
    })
    .catch((error)=>{
        onFail(error);
    });

}

const render = (error,cityName, temp,weatherDescription,icon) => {
    const containerCard = document.createElement("div");
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const article = document.createElement('article');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    
    const containerBox = document.querySelector(".container");
    const articleElementArry = [ img,h3,h4];
    let containerCardArray = [h2,article];
    containerCard.className ="container-card";
    h2.textContent = cityName;
    h3.textContent = temp;
    h4.textContent = weatherDescription;

    
    
    img.src = `icons/${icon}.png`;

    if (error) {
        const failMessage = document.createElement('h2');
        failMessage.textContent = 'something was wrong';
        img.className = "failMessage";
        failMessage.className = "failMessage";
        containerCardArray = [failMessage,article]

    }

    articleElementArry.forEach(element => {
        article.appendChild(element);
    });

    containerCardArray.forEach(element => {
        containerCard.appendChild(element);
    });

    containerBox.appendChild(containerCard);

}
const onSuccess = (myJson) => {

    render(false, myJson.data[0].city_name , myJson.data[0].temp+'º' , myJson.data[0].weather.description , myJson.data[0].weather.icon);
}

const onFail = (error)=> {
    render(true,"Unknow","-º","-","unknowWeather");
    console.log(error);
    
}

cities.forEach(element => {
    get(element.latitude,element.longitude,onSuccess,onFail);
});


const submitBtn = document.querySelector("button");

const evaluate = (event) =>{
    const containerBox = document.querySelector(".container");
    
    const inputUser = document.querySelector("input");
    console.log("hola, estas presionando el boton correcto y el valor de input user es ", inputUser.value);
    
    event.preventDefault();
    const citiesSearch = cities.filter((element)=>{
        
        
        console.log(`Hola aqui tienes element.name ${element.name} y ademas tines el valor del input ${inputUser.value}`);
        console.log(element.name.includes(inputUser.value));
        
        return element.name.includes(inputUser.value);
        
    })
    console.log(citiesSearch);
    
    citiesSearch.forEach(element =>{
        get(element.latitude,element.longitude,onSuccess,onFail);
    });
}

submitBtn.addEventListener("click",evaluate);



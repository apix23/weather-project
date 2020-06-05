const get = (latitude, longitude , onSucces, onFail) => {
    fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=94732983488740c7ac18361880e08e1d`)
    .then((response) =>response.json())
    .then((myJson) => {
    onSucces(myJson)
    })
    .catch((error)=>{
        onFail(error);
    });

}

const onSucces = (myJson) => {
    console.log(myJson);
    console.log(myJson.data[0].temp);
    render(myJson);
    
    
}

const render = (myJson) => {
    const containerCard = document.createElement("div");
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const article = document.createElement('article');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    

    const containerBox = document.querySelector(".container");
    const articleElementArry = [ img,h3,h4];
    const containerCardArray = [h2,article];
    containerCard.className ="container-card";
    h2.textContent = myJson.data[0].city_name;
    h3.textContent = myJson.data[0].temp+'º';
    h4.textContent = myJson.data[0].weather.description;
    
    const icon = myJson.data[0].weather.icon;
    img.src = `icons/${icon}.png`;

    articleElementArry.forEach(element => {
        article.appendChild(element);
    });

    containerCardArray.forEach(element => {
        containerCard.appendChild(element);
    });

    containerBox.appendChild(containerCard);

}

const onFail = (error)=> {
    console.log(error);
    
}
get("41.41","2.19",onSucces,onFail);

get("48.41","12.19",onSucces,onFail);
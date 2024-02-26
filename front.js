const api = "https://striveschool-api.herokuapp.com/api/product/";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2MGE4YmEzM2ZjOTAwMTk2NTgzZGMiLCJpYXQiOjE3MDg1MjYyMjAsImV4cCI6MTcwOTczNTgyMH0.8UUHiReckxRRbuAbQu9QVI1F-RaL03XPSwXyupsgb5U";
let containerProducts = document.getElementById('containerProducts');


window.onload = getProducts();

async function getProducts(){
    try{
        const response =  await fetch(api, {
            headers:{
                'Authorization': `Bearer ${key}`
            }  
        })
        const data = await response.json();

        data.forEach(element => {
            getProduct(element);
        });
    }catch (err){
        console.log(err);
    }

}

//CICLO DI PRODOTTI -- PER OGNI PRODOTTO CREATO VENGONO SALVATI I PARAMETRI
function getProduct({name, brand, price, imageUrl, _id}){
    let colProduct = document.createElement('div');
    colProduct.classList.add('col-10', 'col-sm-5', 'col-md-3', 'mb-3');

    let productBox = document.createElement('div');
    productBox.classList.add('card', 'text-center');

    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = imageUrl;

    let bodyCard = document.createElement('div');
    bodyCard.classList.add('card-body');

    let productTitle = document.createElement('h6');
    productTitle.innerText = name;
    console.log(name);

    let productBrand = document.createElement('p');
    productBrand.innerText = brand;
    console.log(brand);

    let productPrice = document.createElement('p');
    productPrice.innerText = price+'€';

    let infoButton = document.createElement('a');
    infoButton.classList.add('btn', 'btn-primary', 'm-2');
    infoButton.innerText = 'Get Informations';

    infoButton.addEventListener('click', () =>{
        infoButton.href = "infoProduct.html?id=" + _id;
    })

    bodyCard.append(productTitle, productBrand, productPrice, infoButton);
    productBox.append(img, bodyCard);
    colProduct.appendChild(productBox);
    containerProducts.appendChild(colProduct);
}

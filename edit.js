const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const api = "https://striveschool-api.herokuapp.com/api/product/";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2MGE4YmEzM2ZjOTAwMTk2NTgzZGMiLCJpYXQiOjE3MDg1MjYyMjAsImV4cCI6MTcwOTczNTgyMH0.8UUHiReckxRRbuAbQu9QVI1F-RaL03XPSwXyupsgb5U";

window.onload = showProduct();

let updateAlert = document.getElementById('update-alert');
let nameP = document.getElementById('name');
let descriptionP = document.getElementById('description');
let price = document.getElementById('price');
let brand = document.getElementById('brand');
let image = document.getElementById('image');

async function showProduct(){
    try{
        const res = await fetch(api + productId,{
            headers:{
                'Authorization': `Bearer ${key}`
            }  
        })
        const data = await res.json();

        nameP.value = data.name;
        descriptionP.value = data.description;
        price.value = data.price;
        brand.value = data.brand;
        image.value = data.imageUrl;
    }catch (err){
            console.log(err);
    }
}
    

async function editProduct(){
    if(!(nameP.value && descriptionP.value && price.value && brand.value && image.value)){
        alert("Please fill all fields");
        return
    }

    try{
        let product = {"name": nameP.value, "description": descriptionP.value, "price": price.value, "brand": brand.value, "image": image.value};

        await fetch(api + productId,{
        method: "PUT",
        headers:{
            "Authorization": `Bearer ${key}`,
            'Content-Type':'application/json',
        },
        body: JSON.stringify(product),
        
    });
    window.location.href = "database.html";
    }catch (error) {
        console.log(error);
    }
    

}
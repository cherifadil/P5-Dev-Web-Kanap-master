/*const URL = "http://localhost:3000/api/products"
fetch(URL)
.then((response) => response.json)
.then((data)=>listProducts(data))
.catch((error)=>console.log(error))

function listProducts(data) {

}*/

ArticlesSection();

// Récupération des articles de l'API
function getArticles() {
    var articlesAPI = fetch("http://localhost:3000/api/products")
    /*return articlesAPI.json();*/
}

// Remplissage des données de l'API dans le DOM
function ArticlesSection() {
        fetch("http://localhost:3000/api/products")
        .then(function (data) {
            return data.json()
            console.log(data)
        }) 
        .then(function (resultatAPI){
        const articles = resultatAPI

        for (let article in articles) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;
            document.querySelector(".items").appendChild(productLink);

            // Insertion de l "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;

            // Insertion du paragraphe "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    .catch (function(error){
        return error;
    });
}
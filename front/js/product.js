var url = new URL(window.location.href);
var idProduct = url.searchParams.get("id");
let article = "";

const couleurChoisie = document.querySelector("#colors");
const quantiteChoisie = document.querySelector("#quantity");


getArticle();

// Recherche des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((data) => {
        return data.json();
    })

    // Remplissage des données de l'API dans le DOM
    .then(function (resultatAPI) {
        article = resultatAPI;
        if (article){
            getArticleDatas(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    
function getArticleDatas(article){

    // Importation de l'adresse de l'image et insertion
    let ImageProduit = document.createElement("img");
    document.querySelector(".item__img").appendChild(ImageProduit);
    ImageProduit.src = article.imageUrl;
    ImageProduit.alt = article.altTxt;

    // Importation du titre "h1"
    let titreProduit = document.getElementById('title');
    titreProduit.innerHTML = article.name;

    // Importation du prix
    let PrixProduit = document.getElementById('price');
    PrixProduit.innerHTML = article.price;

    // Importation de la description
    let descriptionProduit = document.getElementById('description');
    descriptionProduit.innerHTML = article.description;

    // Importation des couleurs
    for (let colors of article.colors){
        let coulourProduit = document.createElement("option");
        document.querySelector("#colors").appendChild(coulourProduit);
        coulourProduit.value = colors;
        coulourProduit.innerHTML = colors;
    }
    ajoutAuPanier(article);
}

//Gestion du panier
function ajoutAuPanier(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ajout d'un Listener avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantiteChoisie.value > 0 && quantiteChoisie.value <=100 && couleurChoisie.value != ""){

    //Recupération du choix de la couleur
    let choixCouleur = couleurChoisie.value;
                
    //Recupération du choix de la quantité
    let choixQuantite = quantiteChoisie.value;

    //Récupération des options de l'article à ajouter au panier
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    //Initialisation du local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
    console.log(localStorage);
    
    //fenêtre pop-up
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} et de couleur ${choixCouleur} a été ajoutée au panier
        Pour voir votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        popupConfirmation();
    }}
    else
      alert("Quantite negative ou supérieure à 100 ou couleur non définie")
    });
}
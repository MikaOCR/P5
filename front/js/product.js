const produit = window.location.search.split("?name=").join("");       // pour trouver l'id et couper à partir du ?
console.log(produit);

let produitData = [];

const fetchProduit = async () => {
    await fetch(`http://localhost:3000/api/products/${produit}`)        // ajout de l'url avec l'id correspondant
    .then((res) => res.json())
    .then((promise) => {
        produitData = promise

    });
};

let select = document.getElementById("colors");     // tableau des couleurs du produit


const produitDisplay = async () => {
    await fetchProduit();

    document.getElementsByClassName('item__img')[0].innerHTML = `
    <img src="${produitData.imageUrl}" alt="${produitData.altTxt}"/>
    `,

// [0] afin de selectionner la première box item__img afin de faire fonctionner le innerhtml avec une class

    document.getElementById("title").innerHTML = `
    <h1 id="title">${produitData.name.toUpperCase()}</h1>
    `,

    document.getElementById("price").innerHTML = `
    <span id="price">${produitData.price}</span>
    `,

    document.getElementById("description").innerHTML = `
    <p id="description">${produitData.description}</p>
    `

    console.log(produitData.colors); // tableau des couleurs du produit

    produitData.colors.forEach(colors => {
        console.log(colors);
        let tagOption = document.createElement("option");

        tagOption.innerHTML = `${colors}`;
        tagOption.value = `${colors}`;

        select.appendChild(tagOption);
    })
};


//-------------------- Gestion Panier -------------------------
//La récupération des données sélectionnées par l'utilisateur


const idForm = document.querySelector("#colors");                       //Sélection de l'id du formulraire


const btn_ajouterPanier = document.querySelector("#addToCart");             //Sélection du bouton Ajouter au panier


btn_ajouterPanier.addEventListener("click", (event)=>{          //Ecouter le bouton et envoyer le panier

const choixForm = idForm.value;                                 //Mettre la valeur du formulaire dans une variable
const quantityProduit = quantity.value;

let optionsProduit = {                                          //Récupération des valeurs du formulaire
    idProduit: produit,
    nomProduit: produitData.name.toUpperCase(),
    couleurProduit: choixForm,
    quantiteProduit: quantityProduit,
    imgProduit: produitData.imageUrl,
    imgDescription: produitData.altTxt,
    prixProduit: produitData.price
}

console.log(optionsProduit);


const ajoutProduitLocalStorage = () => {                                                            // fonction ajouter un produit sélectionné dans le localstorage
    produitEnregistreDansLocalStorage.push(optionsProduit);
    localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
}



let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));                // JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet js

if(produitEnregistreDansLocalStorage){                                                              // s'il y a déjà des produits enregistré dans le LocalStorage
    ajoutProduitLocalStorage();
}

else{                                                                                               // s'il n'y a pas de produit enregistré dans le LocalStorage
    produitEnregistreDansLocalStorage = [];
    ajoutProduitLocalStorage();
}


event.preventDefault();


});










produitDisplay();
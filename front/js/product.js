const produit = window.location.search.split("?name=").join(""); // pour trouver l'id et couper à partir du ?
console.log(produit);

let produitData = [];

const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${produit}`) // ajout de l'url avec l'id correspondant
    .then((res) => res.json())
    .then((promise) => {
      produitData = promise;
    });
};

let select = document.getElementById("colors"); // tableau des couleurs du produit

const produitDisplay = async () => {
  await fetchProduit();

  (document.getElementsByClassName("item__img")[0].innerHTML = `
    <img src="${produitData.imageUrl}" alt="${produitData.altTxt}"/>
    `),
    // [0] afin de selectionner la première box item__img afin de faire fonctionner le innerhtml avec une class

    (document.getElementById("title").innerHTML = `
    <h1 id="title">${produitData.name.toUpperCase()}</h1>
    `),
    (document.getElementById("price").innerHTML = `
    <span id="price">${produitData.price}</span>
    `),
    (document.getElementById("description").innerHTML = `
    <p id="description">${produitData.description}</p>
    `);

  produitData.colors.forEach((colors) => {
    let tagOption = document.createElement("option");

    tagOption.innerHTML = `${colors}`;
    tagOption.value = `${colors}`;

    select.appendChild(tagOption);
  });
};

//-------------------- Gestion Panier -------------------------
//La récupération des données sélectionnées par l'utilisateur

const idForm = document.querySelector("#colors"); //Sélection de l'id du formulraire

const btn_ajouterPanier = document.querySelector("#addToCart"); //Sélection du bouton Ajouter au panier

let produitEnregistreDansLocalStorage = [];

let choixForm; //Mettre la valeur du formulaire dans une variable
let quantityProduit;

const fournirProduitParId = (produitRecherche) => {
  // On va chercher dans l'array les id et voir si elles sont déjà connues
  return produitRecherche.idProduit == produit;
};

const fournirProduitParIdEtCouleur = (produitRecherche) => {
  return (
    produitRecherche.idProduit == produit &&
    produitRecherche.couleurProduit == choixForm
  );
};

const incrementProduit = () => {
  let produitRecherche =
    produitEnregistreDansLocalStorage.find(fournirProduitParId); // On verifie que l'id soit présent
  produitRecherche.quantiteProduit = quantityProduit; // On change la valeur de quantité
  localStorage.setItem(
    "produit",
    JSON.stringify(produitEnregistreDansLocalStorage)
  ); // on met a jour l'array dans le Local Storage
};

const ajouterProduitLocalStorage = () => {
  let optionsProduit = {
    //Récupération des valeurs des produits

    idProduit: produit,
    nomProduit: produitData.name.toUpperCase(),
    couleurProduit: choixForm,
    quantiteProduit: quantityProduit,
    imgProduit: produitData.imageUrl,
    imgDescription: produitData.altTxt,
    prixProduit: produitData.price,
  };

  if (produitEnregistreDansLocalStorage == null) {
    // Si l'array est null alors on créer un array vide
    produitEnregistreDansLocalStorage = [];
  }
  produitEnregistreDansLocalStorage.push(optionsProduit); // On push le produit dans l'array
  localStorage.setItem(
    "produit",
    JSON.stringify(produitEnregistreDansLocalStorage)
  ); // on met a jour l'array dans le Local Storage
};

btn_ajouterPanier.addEventListener("click", (event) => {
  //Ecouter le bouton et envoyer le panier

  event.preventDefault();
  choixForm = idForm.value; // valeur du formulaire dans une variable
  quantityProduit = quantity.value;

  produitEnregistreDansLocalStorage = JSON.parse(
    localStorage.getItem("produit")
  ); //On récupère les données de l'array pour y vérifier des conditions

  if (
    produitEnregistreDansLocalStorage != null &&
    produitEnregistreDansLocalStorage.find(fournirProduitParIdEtCouleur) !=
      undefined
  ) {
    // s'il y a déjà des produits avec le même Id alors on incrémente
    incrementProduit();
  } else {
    // sinon on push un nouvelle objet dans l'array
    ajouterProduitLocalStorage();
    console.log(produitEnregistreDansLocalStorage);
  }
});

produitDisplay();

let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));                // JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet js
produitEnregistreDansLocalStorage;
console.log(produitEnregistreDansLocalStorage);


//------------ Affichage des produits du Panier -------------//

const positionPanier = document.getElementById("cart__items");


let structureProduitPanier = [];


for(i = 0; i < produitEnregistreDansLocalStorage.length; i++ ){

    let calculePrix = produitEnregistreDansLocalStorage[i].prixProduit * produitEnregistreDansLocalStorage[i].quantiteProduit;

    structureProduitPanier = structureProduitPanier +`
    <article class="cart__item" data-id="${produitEnregistreDansLocalStorage[i].idProduit}" data-color="${produitEnregistreDansLocalStorage[i].couleurProduit}">
                <div class="cart__item__img">
                <img src="${produitEnregistreDansLocalStorage[i].imgProduit}" alt="${produitEnregistreDansLocalStorage[i].imgDescription}"/>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitEnregistreDansLocalStorage[i].nomProduit}</h2>
                    <p>${produitEnregistreDansLocalStorage[i].couleurProduit}</p>
                    <p>${calculePrix}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistreDansLocalStorage[i].quantiteProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
    </article>
    `;
}
    if(i == produitEnregistreDansLocalStorage.length){
    positionPanier.innerHTML = structureProduitPanier;

}

//----- Bouton Supprimer -----//
const removeItem = document.querySelectorAll(".deleteItem");

const fournirProduitParIdEtCouleur = (produitRecherche) =>{
  return produitRecherche.idProduit == dataId && produitRecherche.couleurProduit == dataColor;
}

let dataId;                        // on déclare la variable en dehors et on la valorise 
let dataColor;

function produitDelete() {

    for ( let i = 0; i < removeItem.length; i++) {
        let button = removeItem[i];
        button.addEventListener("click", (event) => {
            event.preventDefault();
//être capable de retrouver un parent *type, class ect* puis chercher une valeur custom dans ce parent

            let sender = event.target;                          // pour savoir qui à appellé l'élément
            let parent = sender.closest("article");             // pour connaitre le parent avec le type "article" le plus proche
            dataId = parent.getAttribute("data-id");            // pour trouver l'attribut contenant l'id du produit
            dataColor = parent.getAttribute("data-color");      //

            let produit = produitEnregistreDansLocalStorage.find(fournirProduitParIdEtCouleur);       // on utilise find pour prendre l'id et la couleur du produit
            let produitIndex = produitEnregistreDansLocalStorage.indexOf(produit);                    // on utilise indexOf pour connaitre le positionnement dans l'array
            produitEnregistreDansLocalStorage.splice(produitIndex,1);                     // on utilise splice et la variable contenant les infos et le nombre d'élément à supprimer

            localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
            parent.remove();            //on retire le parent ciblé du DOM avec remove
        })
    }
}

produitDelete();




//----- Bouton Quantité -----//

const btnQuantity = document.querySelectorAll("input");
console.log(btnQuantity);

let inputValue;

const fournirProduitQuantity = (produitRechercheQuantity) =>{
  return produitRechercheQuantity.quantiteProduit == inputValue;
}

const incrementProduit = () =>{

  let rechercheQuantity = produitEnregistreDansLocalStorage.find(fournirProduitQuantity);       // On verifie que l'id soit présent
  rechercheQuantity.quantiteProduit = inputValue;                                                // On change la valeur de quantité
  localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));                 // on met a jour l'array dans le Local Storage

}

function changeQuantity() {

  for (let i = 0; i < btnQuantity.length; i++){
    let button = btnQuantity[i];
    button.addEventListener("input", (event) =>{
      event.preventDefault();
      let sender = event.target;
      let parent = sender.closest("input");
      inputValue = parent.getAttribute("value");
      incrementProduit();
    })

  }}

changeQuantity();

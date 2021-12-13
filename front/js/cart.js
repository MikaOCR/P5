let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));                // JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet js
console.log(produitEnregistreDansLocalStorage);

let produitData = [];



//------------ Affichage des produits du Panier -------------//

const positionPanier = document.getElementById("cart__items");


let structureProduitPanier = [];

for(k = 0; k < produitEnregistreDansLocalStorage.length; k++ ){

    let calculePrix = produitEnregistreDansLocalStorage[k].prixProduit * produitEnregistreDansLocalStorage[k].quantiteProduit;

    structureProduitPanier = structureProduitPanier +`
    <article class="cart__item" data-id="${produitEnregistreDansLocalStorage[k].idProduit}" data-color="${produitEnregistreDansLocalStorage[k].couleurProduit}">
                <div class="cart__item__img">
                <img src="${produitEnregistreDansLocalStorage[k].imgProduit}" alt="${produitEnregistreDansLocalStorage[k].imgDescription}"/>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitEnregistreDansLocalStorage[k].nomProduit}</h2>
                    <p>${produitEnregistreDansLocalStorage[k].couleurProduit}</p>
                    <p>${calculePrix}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistreDansLocalStorage[k].quantiteProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
    </article>
    `;
}
    if(k == produitEnregistreDansLocalStorage.length){
    positionPanier.innerHTML = structureProduitPanier;

}


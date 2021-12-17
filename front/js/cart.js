let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));                // JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet js
console.log(produitEnregistreDansLocalStorage);

let produitData = [];



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

function produitDelete() {
    let removeCartItemButtons = document.querySelectorAll(".deleteItem")                            //selection des btn supprimer
    console.log(removeCartItemButtons);

    for ( let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener("click", (event) => {
            event.preventDefault();

            let idItemDelete = produitEnregistreDansLocalStorage[i].idProduit;
            produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter( element => element.idProduit !== idItemDelete);
            localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));


        })
        
    }
}

//----- Bouton Quantité -----//


/*     const btnQuantity = document.getElementsByClassName(".itemQuantity");
    btnQuantity.addEventListener("change", (event) => {
        const result = document.getElementsByClassName(".itemQuantity");
        result.value = produitEnregistreDansLocalStorage.quantiteProduit++
    }) */





    

    

produitDelete()
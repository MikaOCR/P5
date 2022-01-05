const classBoutonCommander = "cart__order__form__submit";
let blocBoutonCommander = document.getElementsByClassName(
  "cart__order__form__submit"
)[0];
let chargementEnCours = false;

let produitEnregistreDansLocalStorage = JSON.parse(
  localStorage.getItem("products")
); // JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet js

produitEnregistreDansLocalStorage;
console.log(produitEnregistreDansLocalStorage);

//------------ Affichage des produits du Panier -------------//

function createCartCard(element) {
  let sectionCart = document.getElementById("cart__items");
  let articleCart = document.createElement("article");

  let divImgCart = document.createElement("div");
  let imgCart = document.createElement("img");

  let divCartContent = document.createElement("div");
  let divCartContentDescription = document.createElement("div");
  let nameCart = document.createElement("h2");
  let colorCart = document.createElement("p");
  let priceCart = document.createElement("p");

  let divCartContentSettings = document.createElement("div");
  let divCartQuantity = document.createElement("div");
  let quantityCart = document.createElement("p");
  let inputQuantityCart = document.createElement("input");

  let divCartDelete = document.createElement("div");
  let deleteBtnCart = document.createElement("p");

  sectionCart.append(articleCart);

  articleCart.append(divImgCart);
  divImgCart.append(imgCart);

  articleCart.append(divCartContent);

  divCartContent.append(divCartContentDescription);
  divCartContentDescription.append(nameCart);
  divCartContentDescription.append(colorCart);
  divCartContentDescription.append(priceCart);

  divCartContent.append(divCartContentSettings);
  divCartContentSettings.append(divCartQuantity);
  divCartQuantity.append(quantityCart);
  divCartQuantity.append(inputQuantityCart);

  divCartContentSettings.append(divCartDelete);
  divCartDelete.append(deleteBtnCart);

  articleCart.classList = "cart__item";
  articleCart.dataset.id = `${element.idProduit}`;
  articleCart.dataset.color = `${element.couleurProduit}`;

  divImgCart.classList = "cart__item__img";
  imgCart.src = `${element.imgProduit}`;
  imgCart.alt = `${element.imgDescription}`;

  divCartContent.classList = "cart__item__content";
  divCartContentDescription.classList = "cart__item__content__description";
  nameCart.textContent = `${element.nomProduit}`;
  colorCart.textContent = `${element.couleurProduit}`;
  priceCart.textContent = `${element.prixProduit}`;

  divCartContentSettings.classList = "cart__item__content__settings";
  divCartQuantity.classList = "cart__item__content__settings__quantity";
  quantityCart.textContent = "Qté :";

  inputQuantityCart.classList = "itemQuantity";
  inputQuantityCart.setAttribute("type", "number");
  inputQuantityCart.setAttribute("name", "itemQuantity");
  inputQuantityCart.setAttribute("min", "1");
  inputQuantityCart.setAttribute("max", "100");
  inputQuantityCart.setAttribute("value", `${element.quantiteProduit}`);

  divCartDelete.classList = "cart__item__content__settings__delete";
  deleteBtnCart.classList = "deleteItem";
  deleteBtnCart.textContent = "Supprimer";
}

function cardCart() {
  sectionCart = produitEnregistreDansLocalStorage.map((item) => {
    createCartCard(item);
  });
}

if (produitEnregistreDansLocalStorage == null) {
  // Si l'array est null alors on créer un array vide
  produitEnregistreDansLocalStorage = [];
}

onload = cardCart();

//----- Bouton Supprimer -----//
const removeItem = document.querySelectorAll(".deleteItem");

const fournirProduitParIdEtCouleur = (produitRecherche) => {
  return (
    produitRecherche.idProduit == dataId &&
    produitRecherche.couleurProduit == dataColor
  );
};

let dataId;                                         // on déclare la variable en dehors et on la valorise
let dataColor;

function produitDelete() {
  for (let i = 0; i < removeItem.length; i++) {
    let button = removeItem[i];
    button.addEventListener("click", (event) => {
      event.preventDefault();

      //être capable de retrouver un parent *type, class ect* puis chercher une valeur custom dans ce parent

      let sender = event.target;                            // pour savoir qui à appellé l'élément
      let parent = sender.closest("article");               // pour connaitre le parent avec le type "article" le plus proche
      dataId = parent.getAttribute("data-id");              // pour trouver l'attribut contenant l'id du produit
      dataColor = parent.getAttribute("data-color");         //

      let produit = produitEnregistreDansLocalStorage.find(
        fournirProduitParIdEtCouleur
      ); // on utilise find pour prendre l'id et la couleur du produit
      let produitIndex = produitEnregistreDansLocalStorage.indexOf(produit);            // on utilise indexOf pour connaitre le positionnement dans l'array
      produitEnregistreDansLocalStorage.splice(produitIndex, 1);                        // on utilise splice et la variable contenant les infos et le nombre d'élément à supprimer

      localStorage.setItem(
        "produit",
        JSON.stringify(produitEnregistreDansLocalStorage)
      );
      parent.remove(); //on retire le parent ciblé du DOM avec remove
    });
  }
}

produitDelete();

//----- Bouton Quantité -----//

const btnQuantity = document.querySelectorAll(".itemQuantity");

let inputValue;

const fournirProduitParIdAndColor = (produitRecherche) => {
  // On va chercher dans l'array les id et voir si elles sont déjà connues
  return (
    produitRecherche.idProduit == dataId &&
    produitRecherche.couleurProduit == dataColor
  );
};

const incrementProduit = () => {
  let produitRecherche = produitEnregistreDansLocalStorage.find(
    fournirProduitParIdAndColor
  ); // On verifie que l'id soit présent
  produitRecherche.quantiteProduit = inputValue; // On change la valeur de quantité
  localStorage.setItem(
    "products",
    JSON.stringify(produitEnregistreDansLocalStorage)
  ); // on met a jour l'array dans le Local Storage
};

function changeQuantity() {
  for (let i = 0; i < btnQuantity.length; i++) {
    let button = btnQuantity[i];
    button.addEventListener("change", (event) => {
      event.preventDefault();
      let sender = event.target;
      let parent = sender.closest("article");
      inputValue = event.currentTarget.value; // penser à regarder dans l'event - voir si il y a la bonne value
      dataId = parent.getAttribute("data-id"); // pour trouver l'attribut contenant l'id du produit
      dataColor = parent.getAttribute("data-color"); //
      incrementProduit();
    });
  }
}

onload = changeQuantity();

//----- Total -----//

const totalPrice = produitEnregistreDansLocalStorage.reduce((total, item) => {
  return total + item.prixProduit * item.quantiteProduit;
}, 0);

const totalQuantity = produitEnregistreDansLocalStorage.reduce(
  (total, item) => {
    return total + item.quantiteProduit * 1;
  },
  0
);

document.getElementById("totalPrice").textContent = totalPrice;
document.getElementById("totalQuantity").textContent = totalQuantity;

//----- Formulaire -----//

let orderIdArray = [];
let orderId;

function redirectionLink() {
  document.location.href = `./confirmation.html?order=${orderId}`;
}

const ajoutInfoFormulaire = () => {
  let contactInfo = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  // tableau de produit (uniquement des id pas d'objet)
  const productId = produitEnregistreDansLocalStorage.map((item) => {
    return item.idProduit;
  });

  //un objet englobant
  let jsonAEnvoyer = {
    contact: contactInfo,
    products: productId,
  };

  (async () => {
    const rawResponse = await fetch(
      "http://localhost:3000/api/products/order",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonAEnvoyer),
      }
    );
    const result = await rawResponse.json();
    console.log(result);

    orderIdArray.push(result);

    orderId = orderIdArray.map((item) => {
      return item.orderId;
    });
    console.log(orderId);
  })();
};

function verifieChamp(enumChampAVerifier) {
  let regexNomPrenomVille = /^[A-Za-z-']{3,20}$/;
  let regexAddress = /[a-zA-Z0-9_ -',]{3,20}$/;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let contactInfo = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  switch (enumChampAVerifier) {
    case "prenom":
      let txtPrenom = document.getElementById("firstNameErrorMsg");

      if (!contactInfo.firstName.match(regexNomPrenomVille)) {
        txtPrenom.classList.add("erreur");
        AjouterErreurSiNecessaire(txtPrenom, "Prénom invalide !");
      } else {
        txtPrenom.classList.remove("erreur");
        txtPrenom.textContent = "";
      }
      break;
    case "nom":
      let txtNom = document.getElementById("lastNameErrorMsg");
      if (!contactInfo.lastName.match(regexNomPrenomVille)) {
        txtNom.classList.add("erreur");
        AjouterErreurSiNecessaire(txtNom, "Nom invalide !");
      } else {
        txtNom.classList.remove("erreur");
        txtNom.textContent = "";
      }

      break;
    case "ville":
      let txtVille = document.getElementById("cityErrorMsg");
      if (!contactInfo.city.match(regexNomPrenomVille)) {
        txtVille.classList.add("erreur");
        AjouterErreurSiNecessaire(txtVille, "Ville invalide !");
      } else {
        txtVille.classList.remove("erreur");
        txtVille.textContent = "";
      }
      break;
    case "adresse":
      let txtAdresse = document.getElementById("addressErrorMsg");
      if (!contactInfo.address.match(regexAddress)) {
        AjouterErreurSiNecessaire(txtAdresse, "Adresse invalide !");
        txtAdresse.classList.add("erreur");
      } else {
        txtAdresse.classList.remove("erreur");
        txtAdresse.textContent = "";
      }
      break;
    case "email":
      let txtEmail = document.getElementById("emailErrorMsg");
      /*   ! inverse l'ordre d'un booleen */
      if (!contactInfo.email.match(regexEmail)) {
        txtEmail.classList.add("erreur");
        AjouterErreurSiNecessaire(txtEmail, "Email invalide !");
      } else {
        txtEmail.classList.remove("erreur");
        txtEmail.textContent = "";
      }
      break;
  }

  GriserBoutonSiNecessaire();
}

function AjouterErreurSiNecessaire(champ, message) {
  if (!chargementEnCours) {
    champ.textContent = message;
    champ.style.color = "white";
  }
}

function GriserBoutonSiNecessaire() {
  let formulaireContientErreur =
    document.getElementsByClassName("erreur").length > 0;

  if (formulaireContientErreur) {
    blocBoutonCommander.classList.remove(classBoutonCommander);
  } else {
    blocBoutonCommander.classList.add(classBoutonCommander);
  }

  document.getElementById("order").disabled = formulaireContientErreur;
}

document.querySelector("#city").addEventListener("keydown", function (e) {
  verifieChamp("ville");
});

document.querySelector("#city").addEventListener("click", function (e) {
  verifieChamp("ville");
});

document.querySelector("#city").addEventListener("focusout", function (e) {
  verifieChamp("ville");
});

document.querySelector("#address").addEventListener("keydown", function (e) {
  verifieChamp("adresse");
});

document.querySelector("#address").addEventListener("click", function (e) {
  verifieChamp("adresse");
});

document.querySelector("#address").addEventListener("focusout", function (e) {
  verifieChamp("adresse");
});

document.querySelector("#lastName").addEventListener("keydown", function (e) {
  verifieChamp("nom");
});

document.querySelector("#lastName").addEventListener("click", function (e) {
  verifieChamp("nom");
});

document.querySelector("#lastName").addEventListener("focusout", function (e) {
  verifieChamp("nom");
});

document.querySelector("#firstName").addEventListener("keydown", function (e) {
  verifieChamp("prenom");
});

document.querySelector("#firstName").addEventListener("click", function (e) {
  verifieChamp("prenom");
});

document.querySelector("#firstName").addEventListener("focusout", function (e) {
  verifieChamp("prenom");
});

document.querySelector("#email").addEventListener("keydown", function (e) {
  verifieChamp("email");
});

document.querySelector("#email").addEventListener("click", function (e) {
  verifieChamp("email");
});

document.querySelector("#email").addEventListener("focusout", function (e) {
  verifieChamp("email");
});


document.getElementById("order").addEventListener("click", async function (e) {
  e.preventDefault();
  ajoutInfoFormulaire();
  setTimeout(() => {
    redirectionLink();
  }, 3000);
});

document.addEventListener("DOMContentLoaded", function (event) {
  chargementEnCours = true;
  verifieChamp("ville");
  verifieChamp("adresse");
  verifieChamp("nom");
  verifieChamp("prenom");
  verifieChamp("email");
  chargementEnCours = false;
});

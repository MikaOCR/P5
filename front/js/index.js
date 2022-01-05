let productData = [];

const fetchProduct = async () => {                            //requête GET de l'API avec Fetch pour récupérer la liste de produit
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(productData);
    });
};

function createCard(element) {
  let sectionProduct = document.getElementById("items");
  let productLink = document.createElement("a");
  let articleProduct = document.createElement("article");
  let imgProduct = document.createElement("img");
  let titleProduct = document.createElement("h3");
  let textProduct = document.createElement("p");

  articleProduct.id = "items";
  articleProduct.classList = "items";
  titleProduct.classList = "productName";
  textProduct.classList = "productDescription";

  sectionProduct.append(productLink);
  productLink.append(articleProduct);
  articleProduct.append(imgProduct);
  articleProduct.append(titleProduct);
  articleProduct.append(textProduct);

  productLink.setAttribute("href", `./product.html?name=${element._id}`);
  imgProduct.src = `${element.imageUrl}`;
  imgProduct.alt = `${element.altTxt}`;
  titleProduct.textContent = `${element.name.toUpperCase()}`;
  textProduct.textContent = `${element.description}`;
}

const productCard = async () => {                               // on attend la requête puis on insert les infos des produits dans les éléments
  await fetchProduct();

  sectionProduct = productData.map((item) => {
    createCard(item);
  });
};

onload = productCard();                   // au chargement de la page on éxecute la fonction

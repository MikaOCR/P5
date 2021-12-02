let productData = [];

const fetchProduct = async () => {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
        productData = promise
        console.log(productData);
    });
};

const productCard = async () => {        /* Carte des produits Index.html */
    await fetchProduct();

    document.getElementById("items").innerHTML = productData.map((items) => `
    <a href="./product.html?name=${items._id}">

    <article id="items${items._id}" class="items">
        <img src="${items.imageUrl}" alt="${items.altTxt}"/>
        <h3 class="productName">${items.name.toUpperCase()}</h3>
        <p class="productDescription">${items.description}</p>
    </article>

    </a>
    `,
      )
      .join("")  /* Pour enlever les virgules */
    
};


productCard();   /* On appel la fonction */

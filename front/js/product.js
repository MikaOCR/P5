const produit = window.location.search.split("?name=").join("");       // pour trouver l'id et couper à partir du ?
console.log(produit);

let produitData = [];

const fetchProduit = async () => {
    await fetch(`http://localhost:3000/api/products/${produit}`)        // ajout de l'url avec l'id correspondant
    .then((res) => res.json())
    .then((promise) => {
        produitData = promise
        console.log(produitData);

    });
};

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
    `,

    document.getElementById("colors").innerHTML = `
    
    `
};

produitDisplay();
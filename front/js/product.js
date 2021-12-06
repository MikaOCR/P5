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

let select = document.getElementById("colors");
console.log(select);


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
        console.log(tagOption);
    })
};

produitDisplay();
// récupération de la chaine de requête dans l'url

const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//méthode - pour extraire l'id

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id= urlSearchParams.get("name");
console.log(id);

// affichage du produit (de l'objet) qui a été sélectionné par l'id


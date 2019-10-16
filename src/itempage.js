console.log("items.js loaded");

function setup(){
    const x = window.location;
    console.log(x);
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    const cost = urlParams.get("cost");
    const src = urlParams.get("src");
    console.log(title, cost, src);
    //alert(`Title: ${title} cost: ${cost} path: ${src}`)


    const container = document.createElement("div");
    container.className = "itemContainer";

    const image = document.createElement("img");
    image.src = src;
    image.className = "item__image";

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    titleElement.className = "item__title";

    const description = "Lorem Ipsum...lisan"
    const textElement = document.createElement("p");
    textElement.textContent = description;
    textElement.className = "item__description";

    const costElement = document.createElement("div");
    costElement.textContent = cost;
    costElement.className = "item__price";

    container.append(titleElement);
    container.append(image);
    container.append(textElement);
    container.append(costElement);

    const app = document.getElementById("item-body");
    app.append(container);
}

module.exports = {
    setup,
};

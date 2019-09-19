// alert("Hello World, item page!");
const x = window.location;
console.log(x);
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const cost = urlParams.get("cost");
const src = urlParams.get("src");
console.log(title, cost, src);
//alert(`Title: ${title} cost: ${cost} path: ${src}`)


const container = document.createElement(tagName:"div");
container.className = "itemContainer";

const image = document.createElement(tagName: "img");
image.src = src;
image.className = "item__image";

const titleElement = document.createElement(tagName:"h2");
titleElement.textContent = title;
titleElement.className = "item__title";

const description = "Lorem Ipsum...lisan"
const textElement = document.createElement(tagName:"p");
textElement.textContent = description;
textElement.className = "item__description";

const costElement = document.createElement(tagnName:"div");
costElement.textContent = cost;
costElement.className = "item__price";

container.append(titleElement);
container.append(image);
container.append(textElement);
container.append(costElement);

window.addEventListener(type:"load", listener:() =>{
    const app = document.getElementById(elemendid:"item-body");
    app.append(container);
});
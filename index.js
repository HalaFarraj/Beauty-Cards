const CSS_COLOR_NAMES = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
];

const selectedCardsMap = new Map();
let selectedCardsCounter = 0;
let titles = [];

const bodyContainer = document.getElementById("body-container");
var numberOfSelectedCards;

async function createTitlesArray() {
  let response = await fetch("https://jsonplaceholder.typicode.com/photos");
  let data = await response.json();
  for (let i = 0; i < 100; i++) {
    //   console.log(data[index].title);
    titles.push(data[i].title);
    // console.log(data[i].title)
  }
  return titles;
}

async function getTitle(index) {
  const temp = await createTitlesArray();
  return temp[index];
}

function createHeader() {
  var header = document.createElement("div");
  header.className = "header";

  bodyContainer.appendChild(header);

  const h3 = document.createElement("h3");
  const textt = document.createTextNode("Beauty Cards");
  h3.appendChild(textt);
  header.appendChild(h3);

  // ---header container 1 ------------------------
  var headerContainer1 = document.createElement("div");
  headerContainer1.className = "header-container";
  header.appendChild(headerContainer1);

  var selectedCards = document.createElement("h5");
  selectedCards.className = "inline";
  const selectedCardsText = document.createTextNode(
    "Count of selected cards: "
  );
  selectedCards.appendChild(selectedCardsText);
  headerContainer1.appendChild(selectedCards);

  numberOfSelectedCards = document.createElement("h5");
  numberOfSelectedCards.id = "counter";
  const counter = document.createTextNode("0");
  numberOfSelectedCards.appendChild(counter);
  headerContainer1.appendChild(numberOfSelectedCards);

  var headerContainer2 = document.createElement("div");
  headerContainer2.className = "header-container";
  header.appendChild(headerContainer2);

  var selectedColors = document.createElement("h5");
  const selectedColorsText = document.createTextNode("Selected Colors: ");
  selectedColors.appendChild(selectedColorsText);
  headerContainer2.appendChild(selectedColors);

  var color = document.createElement("h5");
  color.id = "color";
  var colorName = document.createTextNode("");
  color.appendChild(colorName);
  headerContainer2.appendChild(color);
}

async function createCards() {
  var cardsContainer = document.createElement("div");
  cardsContainer.id = "cards-container";

  bodyContainer.appendChild(cardsContainer);

  for (let i = 0; i < 100; i++) {
    let card = document.createElement("div");
    card.className = "card";
    card.id = "card" + i;
    cardsContainer.appendChild(card);

    let cardColorDiv = document.createElement("div");
    cardColorDiv.className = "color";
    const randomColor = Math.floor(Math.random() * 100);

    cardColorDiv.style.backgroundColor = CSS_COLOR_NAMES[randomColor];
    card.appendChild(cardColorDiv);

    let cardTextDiv = document.createElement("div");
    cardTextDiv.className = "text";
    card.appendChild(cardTextDiv);

    let cardTitle = document.createElement("h4");

    let cardTitleText = document.createTextNode(await getTitle(i));
    cardTitle.appendChild(cardTitleText);

    cardTextDiv.appendChild(cardTitle);

    let cardcontent = document.createElement("p");
    cardcontent.className = "content";
    let contentText = document.createTextNode(await getTitle(i));
    cardcontent.appendChild(contentText);
    cardTextDiv.appendChild(cardcontent);

    //----create button-----
    let cardButton = document.createElement("button");
    cardButton.onclick = function () {
      let selectedColorr = document.getElementById("color");

      console.log(selectedCardsMap);
      if (selectedCardsMap.has(card.id)) {
        //it was selected, hence unselect it
        selectedCardsMap.delete(card.id);
        selectedCardsCounter--;
        cardButton.style.backgroundColor = "#d2d5d9";
        document.getElementById("card" + i).style.transform = "scale(1,1)";
        card.style.boxShadow = "rgba(99, 99, 99, 0.2) 2px 2px 8px 0px";
      } else {
        selectedCardsMap.set(card.id, CSS_COLOR_NAMES[randomColor]);
        selectedCardsCounter++;
        cardButton.style.backgroundColor = "#BFD7ED";
        card.style.transform = "scale(1.02,1.02)";
        card.style.boxShadow = "#BFD7ED 0px 4px 20px";
      }
      numberOfSelectedCards.innerHTML = selectedCardsCounter;
      console.log(selectedCardsCounter);

      const values = Array.from(selectedCardsMap.values());
      console.log(values);
      selectedColorr.innerHTML = values;
    };
    let cardButtonIcon = document.createElement("i");
    cardButtonIcon.className = "fa fa-solid fa-check";
    cardButton.appendChild(cardButtonIcon);
    cardTextDiv.appendChild(cardButton);
  }
}

function createBody() {
  createHeader();
  createCards();
}

createBody();

const CSS_COLOR_NAMES = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenRod',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'Gray',
  'Grey',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RebeccaPurple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen',
];

const selectedCardsMap = new Map();
let selectedCardsCounter = 0;
let titles = [];
const bodyContainer = document.getElementById('body-container');
let numberOfSelectedCards;

async function createTitlesArray() {
  try {
    let response = await fetch(
      'https://jsonplaceholder.typicode.com/photos'
    );
    let data = await response.json();
    for (let i = 0; i < 100; i++) {
      titles.push(data[i].title);
    }
    return titles;
  } catch (error) {
    bodyContainer.style.display = 'none';
    let errorDiv = document.createElement('div');
    errorDiv.id = 'errorDiv';

    let errorText = document.createElement('h1');
    errorText.innerText = `Slow or no internet connection.
      Please check your internet settings`;

    let noInternetImg = document.createElement('img');
    noInternetImg.src = './nowifi.png';
    noInternetImg.style.height = '200px';
    noInternetImg.style.width = '200px';
    errorDiv.appendChild(noInternetImg);
    errorDiv.appendChild(errorText);

    document.body.appendChild(errorDiv);
    console.log('error');
  }
}

class Header {
  constructor() {
    this.header = document.createElement('div');
    this.header.className = 'header';

    const h3 = document.createElement('h3');
    h3.innerHTML = 'Beauty Cards';
    this.header.appendChild(h3);

    let headerContainer1 = document.createElement('div');
    headerContainer1.className = 'header-container';

    let selectedCards = document.createElement('h4');
    selectedCards.className = 'inline';
    selectedCards.innerHTML = 'Count of selected cards: ';
    headerContainer1.appendChild(selectedCards);

    numberOfSelectedCards = document.createElement('h4');
    numberOfSelectedCards.id = 'counter';
    numberOfSelectedCards.innerHTML = '0';
    headerContainer1.appendChild(numberOfSelectedCards);

    let headerContainer2 = document.createElement('div');
    headerContainer2.className = 'header-container';

    let selectedColors = document.createElement('h4');
    selectedColors.innerHTML = 'Selected Colors: ';
    headerContainer2.appendChild(selectedColors);

    let color = document.createElement('h4');
    color.id = 'color';
    color.innerHTML = '';
    headerContainer2.appendChild(color);

    this.header.appendChild(headerContainer1);
    this.header.appendChild(headerContainer2);
  }

  get Header() {
    return this.header;
  }
}

class Card {
  constructor(color, title, i) {
    this.flipCard = document.createElement('div');
    this.flipCard.className = 'flip-card';
    this.flipCard.id = 'flipCard' + i;

    let cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    cardInner.id = 'innerCard' + i;
    this.flipCard.appendChild(cardInner);

    let card = document.createElement('div');
    card.className = 'card';
    card.id = 'card' + i;

    cardInner.appendChild(card);

    let cardColorDiv = document.createElement('div');
    cardColorDiv.className = 'color';
    cardColorDiv.style.backgroundColor = color;
    card.appendChild(cardColorDiv);

    let cardTextDiv = document.createElement('div');
    cardTextDiv.className = 'text';
    card.appendChild(cardTextDiv);

    let cardTitle = document.createElement('h4');
    cardTitle.innerHTML = title;
    cardTextDiv.appendChild(cardTitle);

    let cardcontent = document.createElement('p');
    cardcontent.className = 'content';
    let contentText = document.createTextNode(title);
    cardcontent.appendChild(contentText);
    cardTextDiv.appendChild(cardcontent);

    const id = card.id;

    let cardButton = document.createElement('button');
    cardButton.innerText = 'Select';
    cardButton.onclick = function () {
      let selectedColorr = document.getElementById('color');
      if (selectedCardsMap.has(id)) {
        //it was selected, hence unselect it
        selectedCardsMap.delete(id);
        selectedCardsCounter--;
        this.style.backgroundColor = '#d2d5d9';
        document.getElementById(`flipCard${i}`).style.transform =
          'scale(1,1)';
        document.getElementById(`flipCard${i}`).style.boxShadow =
          'rgba(99, 99, 99, 0.2) 2px 2px 8px 0px';
      } else {
        selectedCardsMap.set(id, color);
        selectedCardsCounter++;
        cardButton.style.backgroundColor = '#BFD7ED';
        document.getElementById(`flipCard${i}`).style.transform =
          'scale(1.02,1.02)';
        document.getElementById(`flipCard${i}`).style.boxShadow =
          '#BFD7ED 0px 4px 20px';
      }
      numberOfSelectedCards.innerHTML = selectedCardsCounter;
      const values = Array.from(selectedCardsMap.values());
      selectedColorr.innerHTML = values;
    };

    let buttonDiv = document.createElement('div');
    buttonDiv.className = 'buttonDiv';
    buttonDiv.appendChild(cardButton);
    card.appendChild(buttonDiv);

    let content = document.createElement('div');
    content.className = 'text-button';
    content.appendChild(cardTextDiv);
    content.appendChild(buttonDiv);
    card.appendChild(content);
  }

  get Card() {
    return this.flipCard;
  }
}

async function createBody() {
  bodyContainer.appendChild(new Header().Header);
  let cardsContainer = document.createElement('div');
  cardsContainer.id = 'cards-container';
  const titles = await createTitlesArray();

  for (let i = 0; i < 100; i++) {
    const randomColor = Math.floor(Math.random() * 100);
    const card = new Card(CSS_COLOR_NAMES[randomColor], titles[i], i);
    cardsContainer.appendChild(card.Card);
  }
  bodyContainer.appendChild(cardsContainer);
}

createBody();

function rotateCard(i) {
  let cardoffsetTop = document.getElementById(
    `flipCard${i}`
  ).offsetTop;

  let scrollingHeight = window.pageYOffset;
  if (cardoffsetTop <= scrollingHeight) {
    let difference = scrollingHeight - 20 - cardoffsetTop;
    console.log(difference);
    if (difference <= 70) {
      document.getElementById(
        `innerCard${i}`
      ).style.transform = `rotateY(${difference}deg)`;
    } else {
      document.getElementById(
        `innerCard${i}`
      ).style.transform = `rotateY(70deg)`;
    }
  } else {
    document.getElementById(`innerCard${i}`).style.transform =
      'rotateY(0deg)';
  }
}

window.onscroll = function () {
  for (let i = 0; i < 100; i++) {
    rotateCard(i);
  }
};

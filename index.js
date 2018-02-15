const playerCards = {
  'probe': {
    'click': function () {
      playerIncome += 1;
    },
    'cost': 0,
    'description': 'A disgruntled worker. Used to gather minerals.',
    'image': 'https://vignette.wikia.nocookie.net/starcraft/images/3/30/Probe_SC2_Rend1.jpg/revision/latest?cb=20090129003200',
    'carbot-image': 'http://i.imgur.com/MOW3CJy.png',
    'name': 'Probe',
  },
  'stalker': {
    'click': function() {
      enemyHealth -= allCards['stalker'].damage;
    },
    'cost': 50,
    'damage': 1,
    'description': 'Good for all-ins.',
    'image': 'http://media.blizzard.com/sc2/game/units/protoss/science/stalker.jpg',
    'carbot-image': 'https://78.media.tumblr.com/93f9fa649b277e0f35dddf1bd6743c8f/tumblr_mlgikbQ3AA1s1pua7o1_500.jpg',
    'name': 'Stalker',
  },
  'blink': {
    'click': function() {
      allCards['stalker'].damage *= 2;
    },
    'cost': 50,
    'description': 'Research blink for stalkers. Double their damage.',
    'image': 'https://vignette.wikia.nocookie.net/starcraft/images/3/3d/Stalker_SC2_Game1.jpg/revision/latest?cb=20080721021458',
    'name': 'Blink research',
  },
  'kswz': {
    'click': function () {
      new Audio('resources/kswz.mp3').play()
    },
    'cost': 50,
    'description': 'KSWZ comes to your aid. He enters the battlefield and sacrifices himself for dramatic effect, accomplishing nothing.',
    'image': 'resources/kswz.png',
    'name': 'KSWZ',
  },
  'kreutzer': {
    'click': function () {
      for (let cardDetails of Object.values(allCards)) {
        if (cardDetails.hasOwnProperty('damage')) {
          cardDetails['damage'] += 2;
        }
      }
    },
    'cost': 50,
    'description': 'Play the Kreutzer on the violin. Your units become more inspired, gaining +2 damage.',
    'image': 'https://cdn-asset-stl-1.airsquare.com/sjmusic/managed/image/product/FA0B8C87-700B-11E5-827D251F39FEEE55-zoom.jpg',
    'name': 'Kreutzer',
  },
  'starcrafts': {
    'click': function () {
      for (let [cardName, cardDetails] of Object.entries(allCards)) {
        if (cardDetails.hasOwnProperty('carbot-image')) {
          cardDetails['image'] = cardDetails['carbot-image'];
        }
      }
    },
    'cost': 50,
    'description': 'Gives your starcraft units a nice rebrand.',
    'image': 'resources/starcrafts.png',
    'name': 'Dropbox Starcraft Logo.',
  },
  'climbing': {
    'click': function() {
      allCards['stalker'].damage *= 2;
    },
    'cost': 50,
    'description': 'Teach your stalkers to climb rocks. They grow more muscles.',
    'image': 'https://hoodwork-production.s3.amazonaws.com/uploads/story/image/22453/IMG_9148.jpg',
    'name': 'Rock Climbing',
  },
  'creeper': {
    'click': function () {
      enemyHealth -= allCards['creeper'].damage;
    },
    'cost': 50,
    'damage': 5,
    'description': '\u{1F41B} In the dungeon I go deeper \u{1F41B}',
    'image': 'https://d1u5p3l4wpay3k.cloudfront.net/hearthstone_gamepedia/thumb/d/d2/Corridor_Creeper_full.jpg/400px-Corridor_Creeper_full.jpg?version=cbff6e98c3cafc6e15952abeeac7c218',
    'name': 'Corridor Creeper',
  },
  'jeans': {
    'click': function () {
      enemyHealth -= allCards['jeans'].damage;
    },
    'cost': 50,
    'damage': 5,
    'description': 'Minicat finally finds her perfect fit. Brutalise opponent via good looks.',
    'image': 'https://riverisland.scene7.com/is/image/RiverIsland/293654_main?wid=1200',
    'name': 'Size 10 low-rise regular short jeans',
  },
  'fabric': {
    'click': function () {
      playerHealth = 30;
    },
    'cost': 50,
    'description': 'Minicat enters a fabric shop and comes out rejuvenated. Restore health.',
    'image': 'http://1.bp.blogspot.com/-d8DyAskdY3k/TimzY7xiASI/AAAAAAAAsok/2X59E8g1ijk/s1600/a2.jpg',
    'name': 'Fabric shop',
  },
  'futon': {
    'click': function () {
      const oldEnemyTurn = enemyTurn;
      let turnsPassed = 0;
      enemyTurn = function () {
        turnsPassed++;
        if (turnsPassed == 2) {
          enemyTurn = oldEnemyTurn;
        }
        playerStartTurn();
      }
    },
    'cost': 50,
    'description': 'Minicat can\'t get out of her futon. Opponent takes pity and does nothing for two turns',
    'image': 'https://i.ytimg.com/vi/Yv6shy_9KVM/maxresdefault.jpg',
    'name': 'Futon',
  },
};

const enemyCards = {
  'fakepocket': {
    'click': function () {
      playerHealth -= 2;
    },
    'cost': 1000,
    'description': 'Fake pockets on jeans. Minicat loses 2 health out of frustration.',
    'image': 'https://meanmaureen.files.wordpress.com/2014/09/fake-pocket.jpg',
    'name': 'Fake pockets',
  },
  'machinery': {
    'click': function () {
      document.querySelectorAll('.card').forEach(e => e.remove())
    },
    'cost': 1000,
    'description': 'I demand you exchange all cards in your hand with the highest card in my hand!',
    'image': 'https://innovation.isotropic.org/static-075838b9/icons/leaf.png',
    'name': 'Machinery',
  },
  'wreckage': {
    'click': function () {
      document.querySelectorAll('.card-stalker, .card-creeper, .card-jeans').forEach(e => e.remove())
    },
    'cost': 1000,
    'description': 'Exile all attacking creatures target player commands.',
    'image': 'https://cdnb.artstation.com/p/assets/images/images/007/221/125/large/dimitar-marinski-dimitar-marinski-settle-the-wreckage.jpg?1504566005',
    'name': 'Settle the Wreckage',
  },
};

const allCards = Object.assign({}, playerCards, enemyCards);
let playerHealth;
let playerIncome;
let playerMinerals;
let enemyHealth;

window.onload = function () {
  enemyHealth = 30;
  playerHealth = 30;
  playerIncome = 0;
  playerMinerals = 0;

  loadInitialHand();
  updateBoard();

  document.getElementById("pass").addEventListener('click', enemyTurn);
};

function loadInitialHand() {
  addToHand('probe');
}

function updateBoard() {
  document.getElementById('enemy-health').textContent = enemyHealth;
  document.getElementById('player-health').textContent = playerHealth;
  document.getElementById('player-minerals').textContent = playerMinerals;
  document.getElementById('player-income').textContent = playerIncome;

  for (let [cardName, cardDetails] of Object.entries(allCards)) {
    if (cardDetails.hasOwnProperty('damage')) {
      for (let damage of document.querySelectorAll(`.card-${cardName} > .card-damage`)) {
        damage.textContent = 'Damage: ' + cardDetails['damage'];
      }
    }

    if (cardDetails['carbot-image'] == cardDetails['image']) {
      for (let cardImage of document.querySelectorAll(`.card-${cardName} > .card-picture`)) {
        cardImage.setAttribute('src', cardDetails['carbot-image']);
      }
      delete cardDetails['carbot-image']
    }
  }

  if (enemyHealth <= 0) {
    const promotionContainer = document.createElement('div');
    promotionContainer.className = 'promotion-container';

    const promotionScreen = document.createElement('img');
    promotionScreen.setAttribute('src', 'https://i.ytimg.com/vi/enKOaFb6H18/maxresdefault.jpg');
    promotionScreen.className = 'promotion-screen';
    promotionContainer.appendChild(promotionScreen);

    document.querySelectorAll('.main > *').forEach(element => {
      element.remove();
    });
    document.querySelector('.main').appendChild(promotionContainer);

    const message = document.createElement('div');
    message.textContent = 'Happy Valentine\'s Day, Emma!';
    message.className = 'victory-message';
    document.querySelector('.main').appendChild(message);

  }

  if (playerHealth <= 0) {
    alert('You have died, sorry. Refresh the game to restart.');
    document.querySelector('.main').remove();
  }
}

function addToHand(cardName) {
  const cardCount = document.querySelectorAll('#hand > .card').length;
  if (cardCount >= 3) {
    return;
  }
  const card = renderCard(cardName);
  document.getElementById('hand').appendChild(card);
}

let enemyTurn = function() {
  playerStartTurn();

  let enemyCardName;
  if (Math.random() < 0.1) {
    enemyCardName = 'machinery';
  } else if (Math.random() < 0.2) {
    enemyCardName = 'wreckage';
  } else {
    enemyCardName = 'fakepocket';
  }

  const enemyCard = renderCard(enemyCardName);
  enemyCards[enemyCardName].click();

  const enemyCardContainer = document.createElement('div');
  enemyCardContainer.className = 'enemy-card-container';
  enemyCardContainer.appendChild(enemyCard);
  document.body.appendChild(enemyCardContainer);
  setTimeout(enemyCardContainer.remove.bind(enemyCardContainer), 1500);

  updateBoard();
};

function playerStartTurn() {
  if (Math.random() < 0.35) {
    addToHand('probe');
  } else if (Math.random() < 0.1) {
    addToHand('stalker')
  } else if (Math.random() < 0.1) {
    addToHand('jeans')
  } else if (Math.random() < 0.1) {
    addToHand('creeper')
  } else {
    const keys = Object.keys(playerCards);
    addToHand(keys[keys.length * Math.random() << 0]);
  }
  playerMinerals += playerIncome * 5;
  updateBoard();
}

function renderCard(cardName) {
  const card = document.createElement('div');
  card.className = 'card card-' + cardName;

  const name = document.createElement('span');
  name.textContent = allCards[cardName].name;
  name.className = 'card-name';
  card.appendChild(name);

  const cost = document.createElement('span');
  cost.textContent = allCards[cardName].cost + ' ';
  cost.className = 'card-cost';
  card.appendChild(cost);

  const costImage = document.createElement('img');
  costImage.setAttribute('src', 'https://www.sc2bm.com/images/buildItems/bm_minerals.png');
  costImage.className = 'cost-image';
  cost.appendChild(costImage);

  const picture = document.createElement('img');
  picture.setAttribute('src', allCards[cardName].image);
  picture.className = 'card-picture';
  card.appendChild(picture);

  const description = document.createElement('span');
  description.className = 'card-description';
  description.textContent = allCards[cardName].description;
  card.appendChild(description);

  const damage = document.createElement('span');
  damage.className = 'card-damage';
  if (allCards[cardName].damage != undefined) {
    damage.textContent = 'Damage: ' + allCards[cardName].damage;
  }
  card.appendChild(damage);

  card.addEventListener('click', function () {
    if (playerMinerals < allCards[cardName].cost) {
      alert('Not enough minerals!');
      return;
    }

    playerMinerals -= allCards[cardName].cost;
    allCards[cardName].click();
    updateBoard();
    card.remove();
    enemyTurn();
  });

  return card;
}
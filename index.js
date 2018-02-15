const playerCards = {
  'probe': {
    'click': function () {
      playerIncome += 1;
    },
    'description': 'A disgruntled worker. Used to gather minerals.',
    'image': 'http://i.imgur.com/MOW3CJy.png',
    'name': 'Probe',
  },
  'stalker': {
    'click': function() {
      enemyHealth -= allCards['stalker'].damage;
    },
    'damage': 1,
    'description': 'Good for all-ins.',
    'image': 'https://78.media.tumblr.com/93f9fa649b277e0f35dddf1bd6743c8f/tumblr_mlgikbQ3AA1s1pua7o1_500.jpg',
    'name': 'Stalker',
  },
  'blink': {
    'click': function() {
      allCards['stalker'].damage *= 2;
    },
    'description': 'Research blink for stalkers. Double their damage.',
    'image': 'https://vignette.wikia.nocookie.net/starcraft/images/3/3d/Stalker_SC2_Game1.jpg/revision/latest?cb=20080721021458',
    'name': 'Blink research',
  },
  'kswz': {
    'click': function () {
      new Audio('resources/kswz.mp3').play();
    },
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
    'description': 'Play the Kreutzer on the violin. Your units become more inspired, gaining +2 damage.',
    'image': 'https://cdn-asset-stl-1.airsquare.com/sjmusic/managed/image/product/FA0B8C87-700B-11E5-827D251F39FEEE55-zoom.jpg',
    'name': 'Kreutzer',
  },
  'starcrafts': {
    'description': 'Gives your starcraft units a nice brand.',
    'image': 'resources/starcrafts.png',
    'name': 'Dropbox Starcraft Logo.',
  },
  'climbing': {
    'click': function() {
      allCards['stalker'].damage *= 2;
    },
    'description': 'Teach your stalkers to climb rocks. They grow more muscles.',
    'image': 'https://hoodwork-production.s3.amazonaws.com/uploads/story/image/22453/IMG_9148.jpg',
    'name': 'Rock Climbing',
  },
  'creeper': {
    'click': function () {
      enemyHealth -= allCards['creeper'].damage;
    },
    'damage': 5,
    'description': '\u{1F41B} In the dungeon I go deeper \u{1F41B}',
    'image': 'https://d1u5p3l4wpay3k.cloudfront.net/hearthstone_gamepedia/thumb/d/d2/Corridor_Creeper_full.jpg/400px-Corridor_Creeper_full.jpg?version=cbff6e98c3cafc6e15952abeeac7c218',
    'name': 'Corridor Creeper',
  },
  'jeans': {
    'click': function () {
      enemyHealth -= allCards['jeans'].damage;
    },
    'damage': 5,
    'description': 'Minicat finally finds her perfect fit. Brutalise opponent by force of good looks.',
    'image': 'https://riverisland.scene7.com/is/image/RiverIsland/293654_main?wid=1200',
    'name': 'Size 10 low-rise regular short jeans',
  },
  'fabric': {
    'click': function () {
      playerHealth += 10;
    },
    'description': 'Minicat enters a fabric shop and comes out rejuvenated. Gain 10 health.',
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
        const keys = Object.keys(playerCards);
        addToHand(keys[keys.length * Math.random() << 0]);
      }
    },
    'description': 'Minicat can\'t get out of her futon. Opponent takes pity and does nothing for two turns',
    'image': 'https://i.ytimg.com/vi/Yv6shy_9KVM/maxresdefault.jpg',
    'name': 'Futon',
  },
};

const enemyCards = {
  'fakepocket': {
    'description': 'Fake pockets on jeans. Minicat loses 5 health out of frustration.',
    'image': 'https://meanmaureen.files.wordpress.com/2014/09/fake-pocket.jpg',
    'name': 'Fake pockets',
  },
  'machinery': {
    'description': 'I demand you exchange all cards in your hand with the highest card in my hand!',
    'image': 'https://innovation.isotropic.org/static-075838b9/icons/leaf.png',
    'name': 'Machinery',
  },
  'wreckage': {
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
};

function loadInitialHand() {
  for (let i = 0; i < 3; i++) {
    addToHand('probe');
  }
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
  }
}

function addToHand(cardName) {
  const card = renderCard(cardName);
  document.getElementById('hand').appendChild(card);
}

let enemyTurn = function() {
  const keys = Object.keys(playerCards);
  addToHand(keys[keys.length * Math.random() << 0]);
};

function renderCard(cardName) {
  const card = document.createElement('div');
  card.className = 'card card-' + cardName;

  const name = document.createElement('span');
  name.textContent = allCards[cardName].name;
  name.className = 'card-name';
  card.appendChild(name);

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

  card.addEventListener('click', allCards[cardName].click);
  card.addEventListener('click', function () {
    updateBoard();
    card.remove();
    enemyTurn();
  });

  return card;
}
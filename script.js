const rules = document.querySelector('.rules');
const mode = document.querySelector('.switch');
const modal = document.querySelector('.modal');
const closeBtn = document.getElementById('close');
const list = document.querySelector('.mode');

let triangle = document.querySelector('.shape');
let triangleBtns = triangle.querySelectorAll('button');
const triangleScore = document.querySelector('.score');
const reset = document.getElementById('reset');

const results = document.querySelector('.result-container');
const resultText = document.querySelector('.result-text');
const triangleReplay = resultText.querySelector('button');

let you;
let house;

triangleScore.textContent = getScore();

const properties = [
    {
        img: "images/icon-scissors.svg",
        color: "var(--scissors-gradient)",
        side: "var(--scissors-side-result)"
    },
    {
        img: "images/icon-paper.svg",
        color: "var(--paper-gradient)",
        side: "var(--paper-side-result)"
    },
    {
        img: "images/icon-rock.svg",
        color: "var(--rock-gradient)",
        side: "var(--rock-side-result)"
    },
    {
        img: "images/icon-lizard.svg",
        color: "var(--lizard-gradient)",
        side: "var(--lizard-side-result)"
    },
    {
        img: "images/icon-spock.svg",
        color: "var(--spock-gradient)",
        side: "var(--spock-side-result)"
    },
];

reset.onclick = () => {
    setScore(0);
    triangleScore.textContent = 0;
}

rules.onclick = () => {
    if (document.body.clientWidth >= 800) {
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'all';
        modal.style.transform = 'scale(1)';
        return;
    }
    modal.style.transform = 'unset';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';
}

closeBtn.onclick = () => {
    if (document.body.clientWidth < 800) {
        modal.style.transform = 'translateY(100%)'
    } else {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        modal.style.transform = 'scale(1.2)';
    }
}

// triangleBtns.forEach(btn => {
//     btn.onclick = () => {
//         you = btn.dataset.rank;
//         house = Math.floor(Math.random() * 3);
//         displayResult(parseInt(you), parseInt(house));
//     }
// });

function displayResult(player, ai) {
    mode.style.display = 'none';
    let result;
    let score = parseInt(getScore());
    if (triangle.classList.contains('five')) {
      ai = Math.floor(Math.random() * 5);

        if ((player + 1) % 5 === ai || (player + 3) % 5 === ai) {
            result = 'you win';
            score++;
        } else if (player === ai) {
            result = 'draw';
        } else {
            result = 'you lose';
            score--;
        }
    } else {

        if ((player + 2) % 3 === ai) {
            result = 'you lose';
            score--;
        } else if (player === ai) {
            result = 'draw';
        } else {
            result = 'you win';
            score++;
        }

    }
    setScore(score);
    triangle.style.display = 'none';
    results.style.display = 'flex';
    const you = results.querySelector('.you .chosen');
    const house = results.querySelector('.house .chosen');

    you.style.background = properties[player].color;
    you.style.boxShadow = properties[player].side;
    you.querySelector('img').setAttribute('src', properties[player].img);

    house.style.background = properties[ai].color;
    house.style.boxShadow = properties[ai].side;
    house.querySelector('img').setAttribute('src', properties[ai].img);

    resultText.querySelector('h2').textContent = result;
    triangleReplay.onclick = () => {
        results.style.display = 'none';
        triangle.style.display = 'block';
        house.classList.remove('shown');
        resultText.style.opacity = '0';
        house.closest('.result').style.transform = 'unset';
        you.closest('.result').style.transform = 'unset';
        you.parentElement.classList.remove('win');
        house.parentElement.classList.remove('win');
        mode.style.display = 'block';
    }

    setTimeout(() => {
        house.classList.add('shown');

        house.ontransitionend = () => {
            if (result === 'you win') {
                you.parentElement.classList.add('win');
            } else if (result === 'you lose') {
                house.parentElement.classList.add('win');
            }
            setTimeout(() => {
                if (document.body.clientWidth >= 800) {
                    house.closest('.result').style.transform = 'translateX(120px)';
                    you.closest('.result').style.transform = 'translateX(-120px)';
                }
                triangleScore.textContent = getScore();
                resultText.style.opacity = '1';
                resultText.style.pointerEvents = 'all';
            }, 500);
        }
    }, 1000)
}

function getScore() {
    return localStorage.getItem('score') || 0;
}

function setScore(score) {
    if (score > 0) {
        localStorage.setItem('score', score);
    } else {
        localStorage.setItem('score', 0);
    }
}

window.onresize = () => {
    if (document.body.clientWidth < 800) {
        results.querySelectorAll('.result').forEach(result => {
            result.style.transform = 'unset';
        });
    }
}

mode.onclick = () => {
    triangle.classList.toggle('five');
    changeMode();

}

changeMode();

function changeMode() {
    if (triangle.classList.contains('five')) {


        modal.querySelector('.wrapper>img').setAttribute('src', 'images/image-rules-bonus.svg');
        list.innerHTML = `<li>
        <p>rock</p>
      </li>
      <li>
        <p>paper</p>
      </li>
      <li>
        <p>scissors</p>
      </li>
      <li>
        <p>lizard</p>
      </li>
      <li>
        <p>spock</p>
      </li>`;

        triangle.innerHTML = `
        <img src="images/bg-pentagon.svg" alt="pentagon background">
  
        <div class="scissors-container-b container">
          <button aria-label="scissors button" data-rank="0">
            <div class="inner">
              <img src="images/icon-scissors.svg" alt="paper">
            </div>
          </button>
        </div>
        <div class="paper-container-b container">
          <button aria-label="paper button" data-rank="1">
            <div class="inner">
              <img src="images/icon-paper.svg" alt="paper">
            </div>
          </button>
        </div>
        <div class="rock-container-b container">
          <button aria-label="rock button" data-rank="2">
            <div class="inner">
              <img src="images/icon-rock.svg" alt="paper">
            </div>
          </button>
        </div>
        <div class="lizard-container-b container">
          <button aria-label="lizard button" data-rank="3">
            <div class="inner">
              <img src="images/icon-lizard.svg" alt="scissors">
            </div>
          </button>
        </div>
        <div class="spock-container-b container">
          <button aria-label="spock button" data-rank="4">
            <div class="inner">
              <img src="images/icon-spock.svg" alt="rock">
            </div>
          </button>
        </div>`;
        list.querySelectorAll('p').forEach(p => {
            p.style.fontSize = '1.5rem';
        })

    } else {

        modal.querySelector('.wrapper>img').setAttribute('src', 'images/image-rules.svg');
        list.innerHTML = `<li>
        <p>rock</p>
      </li>
      <li>
        <p>paper</p>
      </li>
      <li>
        <p>scissors</p>
      </li>`
        triangle.innerHTML = `
        <img src="images/bg-triangle.svg" alt="triangle background">
  
        <div class="paper-container container">
          <button aria-label="paper button" data-rank="1">
            <div class="inner">
              <img src="images/icon-paper.svg" alt="paper">
            </div>
          </button>
        </div>
        <div class="scissors-container container">
          <button aria-label="scissors button" data-rank="0">
            <div class="inner">
              <img src="images/icon-scissors.svg" alt="scissors">
            </div>
          </button>
        </div>
        <div class="rock-container container">
          <button aria-label="rock button" data-rank="2">
            <div class="inner">
              <img src="images/icon-rock.svg" alt="rock">
            </div>
          </button>
        </div>`;

    }
    triangle = document.querySelector('.shape');
    triangleBtns = triangle.querySelectorAll('button');

    triangleBtns.forEach(btn => {
        btn.onclick = () => {
            you = btn.dataset.rank;
            house = Math.floor(Math.random() * 3);
            displayResult(parseInt(you), parseInt(house));
        }
    });
}
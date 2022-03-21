const rules = document.querySelector('.rules');
const modal = document.querySelector('.modal');
const closeBtn = document.getElementById('close');

const triangle = document.querySelector('.triangle');
const triangleBtns = triangle.querySelectorAll('button');
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
        img: "images/icon-paper.svg",
        color: "var(--paper-gradient)",
        side: "var(--paper-side-result)"
    },
    {
        img: "images/icon-scissors.svg",
        color: "var(--scissors-gradient)",
        side: "var(--scissors-side-result)"
    },
    {
        img: "images/icon-rock.svg",
        color: "var(--rock-gradient)",
        side: "var(--rock-side-result)"
    }
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

triangleBtns.forEach(btn => {
    btn.onclick = () => {
        you = btn.dataset.rank;
        house = Math.floor(Math.random() * 3);
        displayTriangleResult(parseInt(you), parseInt(house));
    }
});

function displayTriangleResult(player, ai) {
    let result;
    let score = parseInt(getScore());
    if ((player + 1) % 3 === ai) {
        result = 'you lose';
        score--;
    } else if (player === ai) {
        result = 'draw';
    } else {
        result = 'you win';
        score++;
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
    }

    setTimeout(() => {
        house.classList.add('shown');

        house.ontransitionend = () => {
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
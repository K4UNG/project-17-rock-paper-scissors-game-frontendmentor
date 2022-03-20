const rules = document.querySelector('.rules');
const modal = document.querySelector('.modal');
const closeBtn = document.getElementById('close');

rules.onclick = () => {
    modal.style.transform = 'unset';
}

closeBtn.onclick = () => {
    modal.style.transform = 'translateY(100%)'
}
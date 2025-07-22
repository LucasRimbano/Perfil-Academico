const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');
const form = document.getElementById('form');
const sidebar = document.getElementById('sidebar');
const signin = document.getElementById('sign-in');
const signup = document.getElementById('sign-up');
const container = document.getElementById('container');
const LinkSignin = document.getElementById('link-sign-in');
const LinkSignUp = document.getElementById('link-sign-up');

LinkSignUp.addEventListener('click', () => {
    changeSignin();
});

LinkSignin.addEventListener('click', () => {
    changeSignup();
});

btnSignIn.addEventListener('click', () => {
    changeSignin();
});

btnSignUp.addEventListener('click', () => {
    changeSignup();
});


function changeSignin() {
    form.classList.remove('active');
    sidebar.classList.remove('active');
    container.style.animation = 'none';
    container.style.animation = 'bounce-up 1s ease';
    transition(signin)
}

function changeSignup() {
    form.classList.add('active');
    sidebar.classList.add('active');
    container.style.animation = 'none';
    container.style.animation = 'bounce-down 1s ease';
    transition(signup)
}

function transition(parent){
    const children = parent.children;

    Array.from(children).forEach((child)=>{
        child.style.opacity = '0'
        child.style.animation = 'none'
    })

    setTimeout(() => {
        Array.from(children).forEach((child, index) => {
            child.style.animation = 'slidein 0.4s ease forwards'; 
            let delay = (index * 0.05) + 's'; 
            child.style.animationDelay = delay;     
        });
    }, 300);
}
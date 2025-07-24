// Botones del sidebar y enlaces
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');
const form = document.getElementById('form');
const sidebar = document.getElementById('sidebar');
const signin = document.getElementById('sign-in');
const signup = document.getElementById('sign-up');
const container = document.getElementById('container');

// Botón para ir al perfil
const btnRegistrarPerfil = document.getElementById('btn-registar-perfil');

// Enlaces de navegación
const LinkSignin = document.getElementById('link-sign-in');
const LinkSignUp = document.getElementById('link-sign-up');

// Campos del perfil (para mostrar en la misma vista)
const perfilNombre = document.getElementById('perfil-nombre');
const perfilDni = document.getElementById('perfil-dni');
const perfilEmail = document.getElementById('perfil-email');
const perfilCarrera = document.getElementById('perfil-carrera');

// Formularios
const formSignUp = document.getElementById('sign-up');
const formSignIn = document.getElementById('sign-in');

// Inputs de registro
const inputNameSignUp = document.getElementById('name-signup');
const inputDniSignUp = document.getElementById('dni-signup');
const inputEmailSignUp = document.getElementById('email-signup');
const inputCarreraSignUp = document.getElementById('carrera-signup');

// Inputs del perfil (lectura)
const inputNameSignIn = document.getElementById('name-signin');
const inputDniSignIn = document.getElementById('dni-signin');
const inputEmailSignIn = document.getElementById('email-signin');
const inputCarreraSignIn = document.getElementById('carrera-signin');

// Enlaces entre vistas
if (LinkSignUp) {
  LinkSignUp.addEventListener('click', () => {
    changeSignin();
  });
}
if (LinkSignin) {
  LinkSignin.addEventListener('click', () => {
    changeSignup();
  });
}

btnSignIn.addEventListener('click', () => {
  changeSignin();
});

btnSignUp.addEventListener('click', () => {
  changeSignup();
});

btnRegistrarPerfil.addEventListener('click', () => {
  changeSignup();
});

// Animaciones
function changeSignin() {
  form.classList.remove('active');
  sidebar.classList.remove('active');
  container.style.animation = 'none';
  container.style.animation = 'bounce-up 1s ease';
  transition(signin);
}

function changeSignup() {
  form.classList.add('active');
  sidebar.classList.add('active');
  container.style.animation = 'none';
  container.style.animation = 'bounce-down 1s ease';
  transition(signup);
}

function transition(parent) {
  const children = parent.children;
  Array.from(children).forEach((child) => {
    child.style.opacity = '0';
    child.style.animation = 'none';
  });

  setTimeout(() => {
    Array.from(children).forEach((child, index) => {
      child.style.animation = 'slidein 0.4s ease forwards';
      child.style.animationDelay = (index * 0.05) + 's';
    });
  }, 300);
}

// 🔁 Cuando se envía el formulario de REGISTRO
formSignUp.addEventListener('submit', function (e) {
  e.preventDefault();

  // Copiar a los inputs de perfil
  inputNameSignIn.value = inputNameSignUp.value.trim();
  inputDniSignIn.value = inputDniSignUp.value.trim();
  inputEmailSignIn.value = inputEmailSignUp.value.trim();
  inputCarreraSignIn.value = inputCarreraSignUp.value.trim();

  // Mostrar en elementos visibles de perfil
  perfilNombre.textContent = inputNameSignUp.value.trim();
  perfilDni.textContent = inputDniSignUp.value.trim();
  perfilEmail.textContent = inputEmailSignUp.value.trim();
  perfilCarrera.textContent = inputCarreraSignUp.value.trim();

  // Guardar perfil en localStorage
  const userProfile = {
    name: inputNameSignUp.value.trim(),
    dni: inputDniSignUp.value.trim(),
    email: inputEmailSignUp.value.trim(),
    career: inputCarreraSignUp.value.trim()
  };
  localStorage.setItem('userProfile', JSON.stringify(userProfile));

  // Redirigir a plan-de-estudio.html
  window.location.href = 'plan-de-estudio.html';
});

// 🧠 Código específico de plan-de-estudio.html
document.addEventListener('DOMContentLoaded', () => {
  const profileJSON = localStorage.getItem('userProfile');
  if (!profileJSON) return;

  const { name, dni, email, career } = JSON.parse(profileJSON);

  const perfilNombreDOM = document.getElementById('perfil-nombre');
  const perfilDniDOM = document.getElementById('perfil-dni');
  const perfilEmailDOM = document.getElementById('perfil-email');
  const perfilCarreraDOM = document.getElementById('perfil-carrera');

  if (perfilNombreDOM) perfilNombreDOM.textContent = name;
  if (perfilDniDOM) perfilDniDOM.textContent = dni;
  if (perfilEmailDOM) perfilEmailDOM.textContent = email;
  if (perfilCarreraDOM) perfilCarreraDOM.textContent = career;
});

// 🔒 Botón Cerrar sesión
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('userProfile');
    window.location.href = 'index.html';
  });
}
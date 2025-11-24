// ===============================
// BOTONES DEL SIDEBAR Y ENLACES
// ===============================
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');
const form = document.getElementById('form');
const sidebar = document.getElementById('sidebar');
const signin = document.getElementById('sign-in');
const signup = document.getElementById('sign-up');
const container = document.getElementById('container');

// Botón para ir al perfil (desde el formulario de registro)
const btnRegistrarPerfil = document.getElementById('btn-registrar-perfil');

// Enlaces de navegación (si existen)
const LinkSignin = document.getElementById('link-sign-in');
const LinkSignUp = document.getElementById('link-sign-up');

// Campos del perfil (para mostrar en alguna vista de perfil, si existen)
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

// Inputs del perfil / login
const inputNameSignIn = document.getElementById('name-signin');
const inputDniSignIn = document.getElementById('dni-signin');
const inputEmailSignIn = document.getElementById('email-signin');
const inputCarreraSignIn = document.getElementById('carrera-signin');

// ===============================
// ENLACES ENTRE VISTAS
// ===============================

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

if (btnSignIn) {
  btnSignIn.addEventListener('click', () => {
    changeSignin();
  });
}

if (btnSignUp) {
  btnSignUp.addEventListener('click', () => {
    changeSignup();
  });
}

if (btnRegistrarPerfil) {
  btnRegistrarPerfil.addEventListener('click', () => {
    changeSignup();
  });
}

// ===============================
// ANIMACIONES
// ===============================

function changeSignin() {
  if (!form || !sidebar || !container || !signin) return;

  form.classList.remove('active');
  sidebar.classList.remove('active');
  container.style.animation = 'none';
  container.style.animation = 'bounce-up 1s ease';
  transition(signin);
}

function changeSignup() {
  if (!form || !sidebar || !container || !signup) return;

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

// ===============================
// REGISTRO DE PERFIL (SIGN-UP)
// ===============================

if (formSignUp) {
  formSignUp.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = (inputNameSignUp?.value || '').trim();
    const dni = (inputDniSignUp?.value || '').trim();
    const email = (inputEmailSignUp?.value || '').trim();
    const carrera = (inputCarreraSignUp?.value || '').trim();

    // Copiar a los inputs de perfil / login
    if (inputNameSignIn) inputNameSignIn.value = nombre;
    if (inputDniSignIn) inputDniSignIn.value = dni;
    if (inputEmailSignIn) inputEmailSignIn.value = email;
    if (inputCarreraSignIn) inputCarreraSignIn.value = carrera;

    // Mostrar en elementos visibles de perfil (si existen)
    if (perfilNombre) perfilNombre.textContent = nombre;
    if (perfilDni) perfilDni.textContent = dni;
    if (perfilEmail) perfilEmail.textContent = email;
    if (perfilCarrera) perfilCarrera.textContent = carrera;

    // Guardar perfil en localStorage
    const userProfile = { name: nombre, dni, email, carrera };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // 👉 Flujo actual: ir directo al plan de estudios
    //    (si querés pasar el DNI por querystring:)
    // window.location.href = 'Plan-estudios-carrera.html?dni=' + encodeURIComponent(dni);
    window.location.href = 'Plan-estudios-carrera.html';
  });
}

// ===============================
// CARGA DE PERFIL (POR SI USÁS ESTE JS EN OTRAS PÁGINAS)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const profileJSON = localStorage.getItem("userProfile");
  if (!profileJSON) return;

  const { name, dni, email, carrera } = JSON.parse(profileJSON);

  const perfilNombreDOM = document.getElementById("perfil-nombre");
  const perfilDniDOM = document.getElementById("perfil-dni");
  const perfilEmailDOM = document.getElementById("perfil-email");
  const perfilCarreraDOM = document.getElementById("perfil-carrera");

  if (perfilNombreDOM) perfilNombreDOM.textContent = name;
  if (perfilDniDOM) perfilDniDOM.textContent = dni;
  if (perfilEmailDOM) perfilEmailDOM.textContent = email;
  if (perfilCarreraDOM) perfilCarreraDOM.textContent = carrera;

  // Botón Cerrar sesión (solo si existe en esa página)
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("userProfile");
      window.location.href = "index.html";
    });
  }
});

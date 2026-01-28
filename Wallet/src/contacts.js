const CONTACTOS_INICIALES = [
  {
    nombre: "Alex Rivera",
    tipo: "Favorito",
    avatar: "https://i.pravatar.cc/56?img=12",
  },
  {
    nombre: "Sarah Chen",
    tipo: "Reciente",
    avatar: "https://i.pravatar.cc/56?img=32",
  },
  {
    nombre: "Marcus Wright",
    tipo: "Reciente",
    avatar: "https://i.pravatar.cc/56?img=45",
  },
  {
    nombre: "Elena Gomez",
    tipo: "Favorito",
    avatar: "https://i.pravatar.cc/56?img=47",
  },
];

// Inicializar contactos localstorage
if (!localStorage.getItem("contactos")) {
  localStorage.setItem("contactos", JSON.stringify(CONTACTOS_INICIALES));
}
let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderContacts(contactos);
});
//Buscador de contactos
const contactsContainer = document.getElementById("contactsContainer");
const inputBuscar = document.getElementById("buscador");

inputBuscar.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase().trim();

  if (texto === "") {
    renderContacts(contactos);
    return;
  }

  const filtrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(texto),
  );

  renderContacts(filtrados);
});

// Render de contactos -> recibe una lista de contactos sean filtrados o todos
function renderContacts(listaContactos) {
  if (!contactsContainer) return;

  contactsContainer.innerHTML = "";

  if (listaContactos.length === 0) {
    contactsContainer.innerHTML = `
      <div class="text-danger small">No se encontraron contactos</div>
    `;
    return;
  }

  listaContactos.forEach((contacto, index) => {
    contactsContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="text-center col-sm-6 d-flex align-items-center mb-2">
        <label class="contact-card me-2">
          <input
            type="radio"
            name="contacto"
            value="${contacto.nombre}"
            required
          />
        </label>
        <div class="fw-semibold small text-muted">${contacto.nombre}</div>
      </div>
      `,
    );
  });
}

// AÑADIR CONTACTO

const addContactForm = document.getElementById("addContactForm");
const nameInput = document.getElementById("contactName");
const errorAddContact = document.getElementById("errorAddContact");

if (addContactForm) {
  addContactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = nameInput.value.trim();
    if (!nombre) return;

    contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    const existe = contactos.some(
      (c) => c.nombre.toLowerCase() === nombre.toLowerCase(),
    );

    if (existe) {
      errorAddContact.classList.remove("d-none");
      nameInput.classList.add("is-invalid");
      return;
    }

    errorAddContact.classList.add("d-none");
    nameInput.classList.remove("is-invalid");

    contactos.push({
      nombre,
      tipo: "Nuevo",
      avatar: "https://i.pravatar.cc/56?img=2",
    });

    localStorage.setItem("contactos", JSON.stringify(contactos));
    contactos = JSON.parse(localStorage.getItem("contactos"));
    renderContacts(contactos);
    const toastLiveExample = document.getElementById("usuarioAgregadoAlerta");
    const textoToast = document.getElementById("nombreNuevoUsuarioAñadido");
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
    textoToast.innerHTML = `
      <p>
        Ahora <strong>${nombre}</strong> es tu contacto.
      </p>
    `;

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addContactModal"),
    );
    modal.hide();

    addContactForm.reset();
  });
}

document.addEventListener("resetContactsView", () => {
  inputBuscar.value = "";
  contactos = JSON.parse(localStorage.getItem("contactos")) || [];
  renderContacts(contactos);
});

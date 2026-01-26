// CONTACTOS - STORAGE

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

// Inicializar contactos
if (!localStorage.getItem("contactos")) {
  localStorage.setItem("contactos", JSON.stringify(CONTACTOS_INICIALES));
}

// RENDER CONTACTOS

const contactsContainer = document.getElementById("contactsContainer");

function renderContacts() {
  if (!contactsContainer) return;

  const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
  contactsContainer.innerHTML = "";

  contactos.forEach((contacto, index) => {
    contactsContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="text-center">
        <label class="contact-card">
          <input
            type="radio"
            name="contacto"
            value="${contacto.nombre}"
            ${index === 0 ? "required" : ""}
          />
          <img
            src="${contacto.avatar}"
            class="rounded-circle mb-1"
            alt="${contacto.nombre}"
          />
        </label>
        <div class="fw-semibold small text-muted">${contacto.nombre}</div>
        <div class="text-muted small">${contacto.tipo}</div>
      </div>
    `,
    );
  });
}

document.addEventListener("DOMContentLoaded", renderContacts);

// AÑADIR CONTACTO

const addContactForm = document.getElementById("addContactForm");
const nameInput = document.getElementById("contactName");
const addBtn = document.getElementById("addContactBtn");
const errorAddContact = document.getElementById("errorAddContact");

if (addContactForm) {
  addContactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = nameInput.value.trim();
    if (!nombre) return;

    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

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

    renderContacts();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addContactModal"),
    );
    modal.hide();

    addContactForm.reset();
  });
}

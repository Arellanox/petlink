document.addEventListener("DOMContentLoaded", () => {

  const config = window.PETLINK_CONFIG || {};

  const deviceId = config.deviceId || "PL-PENDIENTE";
  const whatsappNumber = config.whatsapp || "529932243652";

  const currentYear = new Date().getFullYear();
  const today = new Date().toISOString().split("T")[0];

  const birthDateInput = document.getElementById("birthDate");
  const birthYearInput = document.getElementById("birthYear");

  // Identificador del dispositivo
  document.getElementById("deviceId").textContent = deviceId;
  document.getElementById("formDeviceId").textContent = deviceId;

  // Limitar fechas futuras
  birthDateInput.max = today;
  birthYearInput.max = currentYear;

  // Mostrar formulario
  const activationSection = document.getElementById("activationSection");
  const hero = document.querySelector(".hero");

  document.getElementById("openForm").addEventListener("click", () => {
    activationSection.hidden = false;

    activationSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // Regresar a la página provisional
  document.getElementById("backToHome").addEventListener("click", () => {
    activationSection.hidden = true;

    hero.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // Evitar capturar fecha completa y año al mismo tiempo
  birthDateInput.addEventListener("change", () => {
    if (birthDateInput.value) {
      birthYearInput.value = "";
    }
  });

  birthYearInput.addEventListener("input", () => {
    if (birthYearInput.value) {
      birthDateInput.value = "";
    }
  });

  // Obtener valor de un campo
  function value(id) {
    return document.getElementById(id).value.trim();
  }

  // Envío del formulario
  const form = document.getElementById("activationForm");

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    // Validar fecha o año
    const birthDate = value("birthDate");
    const birthYear = value("birthYear");

    if (!birthDate && !birthYear) {
      alert("Indica la fecha de nacimiento o al menos el año.");
      birthDateInput.focus();
      return;
    }

    if (birthDate && birthYear) {
      alert("Selecciona la fecha completa o solamente el año, no ambos.");
      return;
    }

    if (birthDate && birthDate > today) {
      alert("La fecha de nacimiento no puede ser futura.");
      birthDateInput.focus();
      return;
    }

    if (birthYear) {
      const year = Number(birthYear);

      if (!Number.isInteger(year) || year < 1990 || year > currentYear) {
        alert(`Indica un año válido entre 1990 y ${currentYear}.`);
        birthYearInput.focus();
        return;
      }
    }

    // Validar WhatsApp del responsable
    const phone = value("contactWhatsapp");

    if (phone && !/^\d{10}$/.test(phone)) {
      alert("El WhatsApp de contacto debe tener exactamente 10 dígitos.");
      document.getElementById("contactWhatsapp").focus();
      return;
    }

    // Datos del formulario
    const fields = [
      ["Nombre de la mascota", value("petName")],
      ["Raza", value("breed")],
      ["Sexo", value("sex")],
      [
        "Fecha de nacimiento",
        birthDate
          ? birthDate
          : `Año aproximado: ${birthYear}`
      ],
      ["Mensaje de la mascota", value("message")],
      ["Mensaje de su familia", value("familyMessage")],
      ["Alergias", value("allergies")],
      ["Medicamentos y tratamientos", value("medication")],
      ["Vacunación", value("vaccination")],
      ["Esterilización", value("sterilized")],
      ["Responsable", value("contactName")],
      ["Nota de contacto", value("contactNote")],
      ["WhatsApp del responsable", phone]
    ];

    // Construir mensaje
    let message = "🐾 SOLICITUD DE ACTIVACIÓN PETLINK\n\n";

    message += `IDENTIFICADOR: ${deviceId}\n`;
    message += "--------------------------------\n\n";

    fields.forEach(([label, fieldValue]) => {
      message += `${label}:\n${fieldValue || "No especificado"}\n\n`;
    });

    message += "--------------------------------\n";
    message += "📷 FOTOGRAFÍA PENDIENTE\n";
    message += "El cliente enviará la fotografía de su mascota en este chat.\n\n";

    message += `Preparar la ficha digital correspondiente al identificador ${deviceId}.`;

    // Abrir WhatsApp
    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  });

});
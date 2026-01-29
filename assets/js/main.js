(function () {
  const body = document.body;
  const menu = document.getElementById("site-menu");
  const burger = document.querySelector(".burger");

  if (!menu || !burger) return;

  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  }

  window.toggleMenu = function () {
    setMenu(!body.classList.contains("menu-open"));
  };

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && body.classList.contains("menu-open")) {
      setMenu(false);
    }
  });

  document.addEventListener("click", function (event) {
    if (!body.classList.contains("menu-open")) return;
    const target = event.target;
    const clickedInsideMenu = menu.contains(target);
    const clickedBurger = burger.contains(target);
    if (!clickedInsideMenu && !clickedBurger) {
      setMenu(false);
    }
  });
})();

(function () {
  const triggers = document.querySelectorAll("[data-modal-target]");
  if (!triggers.length) return;

  function openModal(modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const id = trigger.getAttribute("data-modal-target");
      const modal = document.getElementById(id);
      if (modal) openModal(modal);
    });
  });

  document.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-modal-close]");
    if (closeTarget) {
      const modal = closeTarget.closest(".modal");
      if (modal) closeModal(modal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const modal = document.querySelector(".modal.is-open");
    if (modal) closeModal(modal);
  });
})();

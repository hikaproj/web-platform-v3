document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".site-menu");
  const siteNav = document.querySelector(".site-nav");

  function setMenuOpen(isOpen) {
    siteNav?.classList.toggle("is-open", isOpen);
    menuButton?.setAttribute("aria-expanded", String(isOpen));
    menuButton?.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニュー");
    if (menuButton) {
      menuButton.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
    }
  }

  menuButton?.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });
  siteNav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  const componentRange = document.querySelector("#example-range");
  const componentRangeValue = document.querySelector("#component-range-value");
  componentRange?.addEventListener("input", () => {
    if (componentRangeValue) componentRangeValue.value = componentRange.value;
  });

  const tabs = [...document.querySelectorAll('[role="tab"][aria-controls]')];
  function activateTab(tab) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(item.getAttribute("aria-controls"));
      if (panel) panel.hidden = !active;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) || !tabs.length) return;
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0
        : event.key === "End" ? tabs.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);
    });
  });

  const dialog = document.querySelector("#sample-dialog");
  document.querySelector("#open-dialog")?.addEventListener("click", () => dialog?.showModal());
  dialog?.querySelectorAll(".dialog-close").forEach((button) => button.addEventListener("click", () => dialog.close()));
});

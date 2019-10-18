const openingButtons = Array.from(
  document.querySelectorAll("[data-action='open-drawer']")
);

const drawerContainer = document.getElementById("drawer-container");
const drawerContent = document.getElementById("drawer-content");
const dragButton = document.getElementById("drawer-drag");

const openDrawer = () => {
  document.body.classList.add("drawer-visible");
};

const closeDrawer = () => {
  drawerContainer.addEventListener("transitionend", hideDrawer);
  drawerContainer.classList.add("closing");
};

const hideDrawer = () => {
  drawerContainer.removeEventListener("transitionend", hideDrawer);
  document.body.classList.remove("drawer-visible");
  drawerContainer.classList.remove("closing");
};

openingButtons.map(openingButton => {
  openingButton.addEventListener("click", openDrawer);
});

drawerContainer.addEventListener("click", closeDrawer);
drawerContent.addEventListener("click", e => e.stopImmediatePropagation());

let dragStartY;

dragButton.addEventListener("touchstart", e => {
  dragStartY = e.touches[0].screenY;
});

dragButton.addEventListener("touchmove", e => {
  const deltaY = e.touches[0].screenY - dragStartY;
  console.log({ deltaY });
  if (deltaY <= 0) {
    return;
  }

  drawerContent.style.transform = `translateY(${deltaY}px)`;
});

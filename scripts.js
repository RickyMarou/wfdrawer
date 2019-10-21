const openingButtons = Array.from(
  document.querySelectorAll("[data-action='open-drawer']")
);

const drawerContainer = document.getElementById("drawer-container");
const drawerContent = document.getElementById("drawer-content");
const dragButton = document.getElementById("drawer-drag");
const drawerScrollContent = document.getElementById("drawer-content-inner");

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
let deltaY;
dragButton.addEventListener("touchstart", e => {
  dragStartY = e.touches[0].screenY;
});

dragButton.addEventListener("touchmove", e => {
  drawerContent.style.transition = "none";
  deltaY = e.touches[0].screenY - dragStartY;
  console.log({ deltaY });
  if (deltaY <= 0) {
    return;
  }

  window.requestAnimationFrame(() => {
    drawerContent.style.transform = `translateY(${deltaY}px)`;
  });
});

dragButton.addEventListener("touchend", e => {
  drawerContent.style.transition = "";
  drawerContent.style.transform = "";

  const drawerHalfHeight = drawerContent.getBoundingClientRect().height / 2;
  console.log("touchend", { deltaY, drawerHalfHeight });
  if (deltaY > drawerHalfHeight) {
    closeDrawer();
  }
});

let swipeStartY;
let swipeStartT;
drawerContainer.addEventListener("touchstart", e => {
  swipeStartY = e.touches[0].screenY;
  swipeStartT = new Date();
});

drawerContainer.addEventListener("touchmove", e => {
  if (!e.touches.length) {
    return;
  }
  const swipeDeltaY = e.touches[0].screenY - swipeStartY;
  const swipteDeltaT = new Date() - swipeStartT;
  const velocity = swipeDeltaY / swipteDeltaT;
  if (velocity >= 0.8) {
    closeDrawer();
  }
});

drawerScrollContent.addEventListener("touchmove", e => {
  e.stopImmediatePropagation();
});

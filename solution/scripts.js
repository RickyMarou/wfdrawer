const drawerContainer = document.getElementById("drawer-container");
const drawerContent = document.getElementById("drawer-content");
const buttonOpen = document.getElementById("open-drawer");
const buttonDragDrawer = document.getElementById("drawer-drag");

const openDrawer = () => {
  drawerContainer.classList.remove("drawer-closing");
  drawerContainer.removeEventListener("transitionend", hideDrawer);
  document.body.classList.add("drawer-visible");
};

const closeDrawer = e => {
  drawerContainer.addEventListener("transitionend", hideDrawer);
  drawerContainer.classList.add("drawer-closing");
};

const hideDrawer = () => {
  document.body.classList.remove("drawer-visible");
};

drawerContainer.addEventListener("click", closeDrawer);
buttonOpen.addEventListener("click", openDrawer);
drawerContent.addEventListener("click", e => e.stopImmediatePropagation());

let dragStartY = 0;
let dragDeltaY = 0;
buttonDragDrawer.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  dragStartY = touch.screenY;
});

buttonDragDrawer.addEventListener("touchmove", e => {
  const touch = e.touches[0];
  dragDeltaY = dragStartY - e.touches[0].screenY;
  if (dragDeltaY > 0) {
    return;
  }

  //window.requestAnimationFrame(() => {
  drawerContent.style.transform = `translateY(${-dragDeltaY}px)`;
  // });
});

buttonDragDrawer.addEventListener("touchend", e => {
  const drawerContentHeight = drawerContent.getBoundingClientRect().height;
  if (Math.abs(dragDeltaY) > drawerContentHeight / 2) {
    drawerContent.style.transform = "";
    closeDrawer();
  } else {
    drawerContent.style.transform = "";
  }
});

const closeDrawerElements = Array.from(
  document.querySelectorAll("[data-action='close-drawer']")
);
closeDrawerElements.map(closeDrawerElement => {
  closeDrawerElement.addEventListener("click", closeDrawer);
});

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
  if (drawerContainer.classList.contains("drawer-closing")) {
    return;
  }
  drawerContainer.addEventListener("transitionend", hideDrawer);
  drawerContainer.classList.add("drawer-closing");
};

const hideDrawer = () => {
  document.body.classList.remove("drawer-visible");
  drawerContainer.classList.remove("drawer-closing");
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
  e.stopImmediatePropagation();
  const touch = e.touches[0];
  dragDeltaY = dragStartY - e.touches[0].screenY;
  if (dragDeltaY > 0) {
    return;
  }

  window.requestAnimationFrame(() => {
    drawerContent.style.transition = "none";
    drawerContent.style.transform = `translateY(${-dragDeltaY}px)`;
  });
});

buttonDragDrawer.addEventListener("touchend", e => {
  drawerContent.style.transition = "";
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

/* velocity calc */
let touchStartY;
let touchStartTime;

// TODO: prevent propagation on scroll container, but only if the touche started
// inside it and it has scrolling content

drawerContainer.addEventListener("touchstart", e => {
  if (!document.body.classList.contains("drawer-visible")) {
    return;
  }
  touchStartTime = new Date();
  touchStartY = e.touches[0].screenY;
});

drawerContainer.addEventListener("touchmove", e => {
  if (!document.body.classList.contains("drawer-visible")) {
    return;
  }

  const distance = touchStartY - e.touches[0].screenY;
  if (distance >= 0) {
    return;
  }

  const elapsedTime = new Date() - touchStartTime;
  const velocity = Math.abs(distance / elapsedTime); // px / ms
  console.log({ velocity });
  if (velocity >= 0.5) {
    console.log("swipe close");
    closeDrawer();
  }
});

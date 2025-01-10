function toggleOtherServiceInput() {
  const serviceSelect = document.getElementById("service");
  const otherServiceContainer = document.getElementById(
    "other-service-container"
  );
  if (serviceSelect.value === "others") {
    otherServiceContainer.style.display = "block";
  } else {
    otherServiceContainer.style.display = "none";
  }
}

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

document.getElementById("resume").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 5) {
      alert("O arquivo deve ter no máximo 5MB.");
      this.value = ""; // Limpa o campo
    }
  }
});

const form = document.querySelector("form");
const fileInput = document.querySelector(`#upload-file`);
const submit = document.querySelector(`#submit`);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("upload-file", fileInput.files[0]);

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "post",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Upload failed");
    }

    console.log("✅", data.message); // or display to the user
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    alert(error.message); // Show error in UI
  }

  submit.setAttribute("disabled", true);
  fileInput.value = "";
  fileInput.removeAttribute("disabled");
});

fileInput.addEventListener("change", (event) => {
  fileInput.setAttribute("disabled", true);
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const { name } = file;

    console.log(`File selected: ${name}`);
    submit.removeAttribute("disabled");
  } else {
    console.error("Error uploading file");
    submit.setAttribute("disabled", true);
  }
});

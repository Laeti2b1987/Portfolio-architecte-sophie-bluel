const loginApi = "http://localhost:5678/api/users/login"; 

document.getElementById("loginform").addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch(loginApi, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (document.querySelector(".error-login")) {
      document.querySelector(".error-login").remove();
    }

    if (!response.ok) {
      const errorBox = document.createElement("div");
      errorBox.className = "error-login";
      errorBox.innerHTML = "Veuillez vérifier votre email ou votre mot de passe";
      document.querySelector("form").prepend(errorBox);
    } else {
      const result = await response.json();
      const token = result.token;
      localStorage.setItem("authToken", token);
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    const errorBox = document.createElement("div");
    errorBox.className = "error-login";
    errorBox.innerHTML = "Une erreur est survenue. Veuillez réessayer plus tard.";
    document.querySelector("form").prepend(errorBox);
  }
}

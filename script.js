document.addEventListener("DOMContentLoaded", function () {
  // ---------------- SIGNUP ----------------
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

      let errors = [];

      if (fullName.length < 3)
        errors.push("Full Name must be at least 3 characters.");

      if (!email.includes("@")) errors.push("Enter a valid email.");

      if (password.length < 6)
        errors.push("Password must be at least 6 characters.");

      if (password !== confirmPassword) errors.push("Passwords do not match.");

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      const account = { fullName, email, password };
      localStorage.setItem("account", JSON.stringify(account));

      alert("Account created successfully! ✅");

      signupForm.reset();
      window.location.href = "login.html";
    });
  }

  // ---------------- LOGIN ----------------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      let errors = [];

      if (!email) errors.push("Email is required.");
      else if (!email.includes("@")) errors.push("Enter a valid email.");

      if (!password) errors.push("Password is required.");
      else if (password.length < 6)
        errors.push("Password must be at least 6 characters.");

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      const storedAccount = JSON.parse(localStorage.getItem("account"));

      if (!storedAccount) {
        alert("No account found. Please sign up first.");
        return;
      }

      if (
        storedAccount.email !== email ||
        storedAccount.password !== password
      ) {
        alert("Incorrect email or password.");
        return;
      }

      // ADMIN LOGIN CHECK
      if (email === "admin@gmail.com") {
        alert("Admin login successful 👑");
        window.location.href = "admin.html";
        return;
      }

      alert(`Welcome back, ${storedAccount.fullName}! 🎉`);

      loginForm.reset();
      window.location.href = "profile.html";
    });
  }

  // ---------------- SETTINGS ----------------
  const settingsForm = document.getElementById("settingsForm");
  if (settingsForm) {
    settingsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("settingsEmail").value.trim();
      const password = document.getElementById("settingsPassword").value.trim();
      const address = document.getElementById("settingsAddress").value.trim();

      let errors = [];

      if (email && !email.includes("@")) errors.push("Enter a valid email.");

      if (password && password.length < 6)
        errors.push("Password must be at least 6 characters.");

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      let account = JSON.parse(localStorage.getItem("account")) || {};

      if (email) account.email = email;
      if (password) account.password = password;
      if (address) account.address = address;

      localStorage.setItem("account", JSON.stringify(account));

      alert("Settings saved successfully! ✅");

      settingsForm.reset();
    });
  }

  // ---------------- ADMIN ADD USER ----------------
  const addUserForm = document.getElementById("addUserForm");

  if (addUserForm) {
    addUserForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      if (!name || !email) {
        alert("Please fill out all fields.");
        return;
      }

      const table = document.getElementById("userTable");

      const newRow = table.insertRow();

      const id = table.rows.length;

      newRow.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
      `;

      alert("User added successfully! ✅");

      addUserForm.reset();
    });
  }
});

// ---------------- DELETE USER ----------------
function deleteRow(button) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");

  if (confirmDelete) {
    const row = button.parentElement.parentElement;
    row.remove();

    alert("User deleted successfully.");
  }
}

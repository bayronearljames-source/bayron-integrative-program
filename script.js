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

      // Validation rules
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

      // Save account in localStorage
      const account = { fullName, email, password };
      localStorage.setItem("account", JSON.stringify(account));

      alert("Account created successfully! ✅");
      signupForm.reset();
      window.location.href = "login.html"; // redirect to login
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

      // Validation rules
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

      alert(`Welcome back, ${storedAccount.fullName}! 🎉`);
      loginForm.reset();
      window.location.href = "profile.html"; // redirect to profile
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

      // Validation rules (optional fields)
      if (email && !email.includes("@")) errors.push("Enter a valid email.");
      if (password && password.length < 6)
        errors.push("Password must be at least 6 characters.");

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      // Update localStorage
      let account = JSON.parse(localStorage.getItem("account")) || {};
      if (email) account.email = email;
      if (password) account.password = password;
      if (address) account.address = address;

      localStorage.setItem("account", JSON.stringify(account));
      alert("Settings saved successfully! ✅");
      settingsForm.reset();
    });
  }
});

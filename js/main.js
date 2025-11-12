document.addEventListener("DOMContentLoaded", () => {
  fetch('components/navbar.html')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(data => {
      document.getElementById('navbar').innerHTML = data;


      const toggle = document.querySelector(".mobile-menu-toggle");
      const nav = document.querySelector(".nav");
      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          nav.classList.toggle("active");
        });
      }


      const dropdownLink = document.querySelector(".dropdown > a");
      if (dropdownLink) {
        dropdownLink.addEventListener("click", (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            const menu = dropdownLink.nextElementSibling;
            menu.style.display = menu.style.display === "block" ? "none" : "block";
          }
        });
      }

      initModal();
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      document.getElementById('navbar').innerHTML = `
        <nav>
          <ul class="nav">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="groups.html">Groups</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      `;
    });

  fetch('components/footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
      document.getElementById('footer').innerHTML = `
        <div class="container footer-inner">
          <small>© 2025 StudyBuddy. All rights reserved.</small>
          <ul class="social">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">X</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      `;
    });

  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => (themeToggle.style.transform = 'scale(1)'), 150);
  });

  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
});

function initModal() {
  const modal = document.getElementById("infoModal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".close");
  const learnMoreButtons = document.querySelectorAll(".btn, .learn-more");

  learnMoreButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (btn.textContent.toLowerCase().includes("learn more")) {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };
}
// =====================
// Uzdevums 1: Formas validācija
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");
  const successMsg = document.getElementById("formSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    clearErrors();

    // Validate name
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Lūdzu ievadi savu vārdu");
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Lūdzu ievadi savu e-pastu");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "E-pasta formāts nav derīgs");
      isValid = false;
    }

    // Validate message
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Lūdzu ievadi ziņojumu");
      isValid = false;
    }

    // Success message
    if (isValid) {
      successMsg.textContent = "Forma veiksmīgi iesniegta! ✅";
      successMsg.classList.add("show");
      form.reset();
      setTimeout(() => {
        successMsg.classList.remove("show");
        successMsg.textContent = "";
      }, 3000);
    }
  });

  function showError(input, message) {
    const group = input.closest(".form-group");
    const error = group.querySelector(".error-message");
    group.classList.add("invalid");
    error.textContent = message;
    error.style.opacity = "1";
  }

  function clearErrors() {
    form.querySelectorAll(".form-group").forEach(group => {
      group.classList.remove("invalid");
      const error = group.querySelector(".error-message");
      error.textContent = "";
      error.style.opacity = "0";
    });
  }
});

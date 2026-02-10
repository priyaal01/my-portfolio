// Add background color to body when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = '#1A1F2C';
});

window.addEventListener("load", function() {
    setTimeout(function() { 
        document.getElementById("preloader").style.animation = "slideOut 1s ease-in-out forwards";
        setTimeout(() => {
            document.getElementById("preloader").style.display = "none";
        }, 1000); 
    }, 3000); 
})

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu
  const hamburgerMenu = document.getElementById('hamburger-menu');
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function() {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.toggle('open');
    });
  }
  const closeIcon = document.getElementById('close-icon');
  if (closeIcon) {
    closeIcon.addEventListener('click', function() {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('open');
    });
  }

  // EmailJS init
  if (window.emailjs) {
    try {
      emailjs.init('5-s-fSccdgk3fgheQ'); 
    } catch (err) {
      console.warn('EmailJS init error', err);
    }
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent page refresh!
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }
      if (window.emailjs && typeof emailjs.send === 'function') {
        emailjs.send('service_kjjgbdl', 'template_bozw049', {
          from_name: name,
          from_email: email,
          message: message
        })
        .then(() => {
          alert('Email sent successfully!');
          document.getElementById('successMessage').style.display = 'block';
          contactForm.reset();
          contactForm.style.display = 'none';
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          alert('Failed to send message. Please try again later.\n' + (error.text || JSON.stringify(error)));
        });
      } else {
        alert('EmailJS is not available.');
      }
    });
  }
});
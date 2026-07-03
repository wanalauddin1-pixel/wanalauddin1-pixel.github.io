document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successMsg = document.getElementById('successMessage');

  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    if (input) input.classList.add('error');
    if (error) {
      error.textContent = message;
      error.classList.add('show');
    }
  }

  function clearError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    if (input) input.classList.remove('error');
    if (error) {
      error.textContent = '';
      error.classList.remove('show');
    }
  }

  function clearAllErrors() {
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(function (el) {
      el.classList.remove('error');
    });
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(function (el) {
      el.textContent = '';
      el.classList.remove('show');
    });
  }

  function validateName() {
    const name = document.getElementById('fullName').value.trim();
    if (!name) {
      showError('fullName', 'Full name is required.');
      return false;
    }
    if (name.length < 3) {
      showError('fullName', 'Name must be at least 3 characters.');
      return false;
    }
    clearError('fullName');
    return true;
  }

  function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError('email', 'Email is required.');
      return false;
    }
    if (!re.test(email)) {
      showError('email', 'Please enter a valid email.');
      return false;
    }
    clearError('email');
    return true;
  }

  function validatePassword() {
    const password = document.getElementById('password').value;
    if (!password) {
      showError('password', 'Password is required.');
      return false;
    }
    if (password.length < 6) {
      showError('password', 'Password must be at least 6 characters.');
      return false;
    }
    clearError('password');
    return true;
  }

  function validateDob() {
    const dob = document.getElementById('dob').value;
    if (!dob) {
      showError('dob', 'Date of birth is required.');
      return false;
    }
    const dateObj = new Date(dob);
    const today = new Date();
    if (isNaN(dateObj.getTime()) || dateObj >= today) {
      showError('dob', 'Please enter a valid date of birth.');
      return false;
    }
    clearError('dob');
    return true;
  }

  function validateGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) {
      showError('gender', 'Please select a gender.');
      return false;
    }
    clearError('gender');
    return true;
  }

  function validatePhoto() {
    const file = document.getElementById('photo').files[0];
    if (!file) {
      showError('photo', 'Please upload a profile photo.');
      return false;
    }
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowed.includes(file.type)) {
      showError('photo', 'Only JPEG, PNG, GIF, or WEBP formats are allowed.');
      return false;
    }
    clearError('photo');
    return true;
  }

  function validateTerms() {
    const checked = document.getElementById('terms').checked;
    if (!checked) {
      showError('terms', 'Please accept the terms and conditions.');
      return false;
    }
    clearError('terms');
    return true;
  }

  document.getElementById('fullName').addEventListener('input', validateName);
  document.getElementById('email').addEventListener('input', validateEmail);
  document.getElementById('password').addEventListener('input', validatePassword);
  document.getElementById('dob').addEventListener('change', validateDob);
  document.querySelectorAll('input[name="gender"]').forEach(function (el) {
    el.addEventListener('change', validateGender);
  });
  document.getElementById('photo').addEventListener('change', validatePhoto);
  document.getElementById('terms').addEventListener('change', validateTerms);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    const isValid =
      validateName() &
      validateEmail() &
      validatePassword() &
      validateDob() &
      validateGender() &
      validatePhoto() &
      validateTerms();

    if (isValid) {
      var records = JSON.parse(localStorage.getItem('contactRecords') || '[]');
      records.push({
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        dob: document.getElementById('dob').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        photoName: document.getElementById('photo').files[0].name,
        submittedAt: new Date().toLocaleString()
      });
      localStorage.setItem('contactRecords', JSON.stringify(records));

      form.reset();
      successMsg.classList.add('show');
      setTimeout(function () {
        successMsg.classList.remove('show');
      }, 5000);
    }
  });
});

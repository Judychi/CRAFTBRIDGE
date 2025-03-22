const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');

// Function to validate email and password inputs
function validateInputs() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
  if (!email.value.trim()) {
    error.innerHTML = 'Email is required.';
    return false;
  }
  if (!emailRegex.test(email.value.trim())) {
    error.innerHTML = 'Please enter a valid email address.';
    return false;
  }
  if (!password.value.trim()) {
    error.innerHTML = 'Password is required.';
    return false;
  }
  if (password.value.trim().length < 6) {
    error.innerHTML = 'Password must be at least 6 characters long.';
    return false;
  }
  error.innerHTML = ''; // Clear error message if inputs are valid
  return true;
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  console.log("submitted")

  // Validate inputs before sending the request
  if (!validateInputs()) {
    return;
  }

  const data = {
    email: email.value,
    password: password.value
  };
  console.log(data);

  
  try {
    
    axios.post("http://api/user/login", JSON.stringify(data))
      .then((res) => {
        // console.log("Parsed Data:", res);
        const data = res.data;


        if (data.status == 1) {
          alert(data.message);
          sessionStorage.setItem("craftbridge-user", JSON.stringify(data));
          location.href = "../../public/clientdashboard.html";
        } else {
          alert("non: " + data.message);
          // location.reload();
        }

      })
      .catch((err) => {
        console.error("Error is on: ", err);
        alert("An error occurred: " + err.message);
        // location.reload();
      });
  }
  catch (err) {
  console.error("An error occurred: " + err);
    alert("Error: " + err + " or Check your Internet connection");
    // location.reload();
  }
});
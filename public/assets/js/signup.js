document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById("email");
    const fullnameInput = document.getElementById("fullName");
    const countryInput = document.getElementById("country");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const form = document.getElementById("signupForm");


    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError("emailError", "Enter a valid email.");
            return false;
        } else {
            hideError("emailError");
            return true;
        }
    }


    function validatePassword() {
        const password = passwordInput.value;
        if (password.length < 6) {
            showError("passwordError", "Password must be at least 6 characters.");
            return false;
        } else {
            hideError("passwordError");
            return true;
        }
    }


    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword !== password) {
            showError("confirmPasswordError", "Password do not match.");
            return false;
        } else {
            hideError("confirmPasswordError");
            return true;
        }
    }

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function hideError(id) {
        document.getElementById(id).textContent = "";
    }


     // Real-time validation
     emailInput.addEventListener("input", validateEmail);
     passwordInput.addEventListener("input", validatePassword);
     confirmPasswordInput.addEventListener("input", validateConfirmPassword);


     // Handle form submission with Axios
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission
        
        if (validateEmail() && validatePassword() && validateConfirmPassword()) {
            //const saltRounds = 10; // Higher value = more secure but slower

            //const password = passwordInput.value;

            /* Hash the password using bcrypt
            bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
                if (err) {
                    alert("Error hashing password. Please try again.");
                    return;
                }*/

                const userData = {
                    email: emailInput.value,
                    password: passwordInput.value,
                    fullname: fullnameInput.value,
                    country: countryInput.value,
                    phone: phoneInput.value 
                    //password: hashedPassword // Send hashed password
                };
                console.log(userData);


                try {

                    axios.post("http://api/user/signup", JSON.stringify(userData)) 
                        //headers: {
                            //"Content-Type": "application/json"
                        //}
                        .then((res) => {
                            const data = res.userData;
                            console.log(data);

                            alert("Signup successful!");
                            form.reset(); // Clear the form after successful signup
                        })
                        .catch((err) => {
                            console.error("Error is on: ", err);
                            alert("An error occurred: " + err.message);
                            // location.reload();
                          });
                    
                } /*catch (error) {
                    if (error.response) {
                        alert(`Error: ${error.response.data.message || "Signup failed"}`);
                    } else {
                        alert("An error occurred. Please try again later.");
                    }*/
                        catch (err) {
                            console.error("An error occurred: " + err);
                              alert("Error: " + err + " or Check your Internet connection");
                              
                            }
                            
                }
                
            });

        });
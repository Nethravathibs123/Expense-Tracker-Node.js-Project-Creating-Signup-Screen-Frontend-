const signUpForm = document.getElementById("sign-up-form");
const errorMsg = document.getElementById('error');
let users = [];
const port = 3450;

signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Use fetch to send a POST request
        const response = await fetch(`http://localhost:${port}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })  // Convert data to JSON
        });

        if (!response.ok) {
            // Handle non-200 responses (e.g., 409 or 404)
            const errorData = await response.json();
            if (response.status === 409 || response.status === 404) {
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                errorMsg.textContent = `Error: ${errorData.message}`;
            } else {
                throw new Error('Something went wrong');
            }
        } else {
            const data = await response.json();
            users.push(data);  // Add the new user to the users array

            // Clear the form inputs
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";

            // Clear any error messages
            errorMsg.textContent = '';
        }
    } catch (error) {
        console.log('Error adding user: ', error);
        errorMsg.textContent = 'An error occurred. Please try again.';
    }
});

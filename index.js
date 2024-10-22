document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('user-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        // Clear previous error messages
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';

        let hasError = false;

        // Validate name
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Name is required.';
            hasError = true;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required.';
            hasError = true;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            hasError = true;
        }

        // Validate password
        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Password is required.';
            hasError = true;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            hasError = true;
        }

        if (hasError) {
            return; // Exit the function if there are errors
        }

        // Prepare data for submission
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
        };

        try {
            const response = await fetch('http://localhost:3000/your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server Error:', errorData);
                alert('Server error occurred. Please try again later.');
                return;
            }

            const data = await response.json();
            console.log('Form submitted successfully!', data);
            alert('Signup successful!'); // Notify user
        } catch (error) {
            console.error('Fetch operation failed:', error);
            alert('There was a problem submitting the form. Please try again later.');
        }
    });
});

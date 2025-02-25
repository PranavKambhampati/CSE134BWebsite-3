document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    const fields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        organization: document.getElementById("organization"),
        message: document.getElementById("message"),
        career: document.querySelectorAll("input[name='career']")
    };

    const errors = {
        name: document.getElementById("nameError"),
        email: document.getElementById("emailError"),
        organization: document.getElementById("orgError"),
        message: document.getElementById("messageError"),
        career: document.getElementById("careerError")
    };

    // Custom validation messages and flashing logic
    function validateField(field, errorElement) {
        field.setCustomValidity(""); // Reset custom message
        let isValid = true;

        if (!field.value.trim()) {
            field.setCustomValidity("This field is required.");
            isValid = false;
        } else if (field.validity.patternMismatch) {
            field.setCustomValidity("Invalid format. Please follow the guidelines.");
            isValid = false;
        } else if (field.validity.tooShort) {
            field.setCustomValidity(`Must be at least ${field.minLength} characters.`);
            isValid = false;
        } else if (field.validity.tooLong) {
            field.setCustomValidity(`Must be at most ${field.maxLength} characters.`);
            isValid = false;
        }

        // Show error message and apply visual feedback if not valid
        if (!isValid) {
            errorElement.textContent = field.validationMessage;
            field.classList.add("flash");
            errorElement.classList.add("show");
        } else {
            errorElement.textContent = "";
            field.classList.remove("flash");
            errorElement.classList.remove("show");
        }

        // Remove the flash and error after a short time
        // if (!isValid) {
        //     setTimeout(() => {
        //         errorElement.classList.remove("show");
        //     }, 2000);

        //     setTimeout(() => {
        //         field.classList.remove("flash");
        //     }, 500); // Flash duration
        // }

        return isValid;
    }

    function handleInvalidEmail(field, errorElement) {
        const pattern = new RegExp(field.pattern);
        const value = field.value;

        if (value && !pattern.test(value)) {
            errorElement.textContent = "Invalid email format.";
            field.classList.add("flash");
            errorElement.classList.add("show");
        } else {
            errorElement.textContent = "";
            field.classList.remove("flash");
            errorElement.classList.remove("show");
        }
    }

    // Validate career selection
    function validateCareer() {
        const isSelected = [...fields.career].some(radio => radio.checked);
        errors.career.textContent = isSelected ? "" : "Please select a career type.";
        return isSelected;
    }

    // Add event listeners for real-time validation
    Object.keys(fields).forEach(key => {
        if (key === "career") {
            fields.career.forEach(radio => radio.addEventListener("change", validateCareer));
        } else if (key === "email") {
            fields[key].addEventListener("input", () => handleInvalidEmail(fields[key], errors[key]));
        } else {
            fields[key].addEventListener("input", () => validateField(fields[key], errors[key]));
        }
    });

    // Final validation on form submission
    form.addEventListener("submit", (event) => {
        let isValid = form.checkValidity() && validateCareer();
        if (!isValid) {
            event.preventDefault(); // Stop submission if invalid
        }
    });
});

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

    // Custom validation messages
    function validateField(field, errorElement) {
        field.setCustomValidity(""); // Reset custom message

        if (!field.value.trim()) {
            field.setCustomValidity("This field is required.");
        } else if (field.validity.patternMismatch) {
            field.setCustomValidity("Invalid format. Please follow the guidelines.");
        } else if (field.validity.tooShort) {
            field.setCustomValidity(`Must be at least ${field.minLength} characters.`);
        } else if (field.validity.tooLong) {
            field.setCustomValidity(`Must be at most ${field.maxLength} characters.`);
        }

        errorElement.textContent = field.validationMessage; // Show error message
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

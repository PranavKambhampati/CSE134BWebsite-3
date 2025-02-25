document.addEventListener("DOMContentLoaded", () => {
    const messageField = document.getElementById("message"); // The <textarea> for comments
    const messageInfo = document.getElementById("messageInfo"); // The info message area

    // Update the character count and change styles
    function updateCharacterCount() {
        const maxLength = messageField.maxLength;
        const remaining = maxLength - messageField.value.length;

        // Update the info message with remaining characters
        messageInfo.textContent = `${remaining} characters remaining`;

        // Change styles based on remaining characters
        if (remaining <= 10) {
            messageInfo.style.color = "red"; // Error style
        } else if (remaining <= 20) {
            messageInfo.style.color = "orange"; // Warning style
        } else {
            messageInfo.style.color = "green"; // Normal style
        }
    }

    // Add event listener for real-time character countdown
    messageField.addEventListener("input", updateCharacterCount);

    // Initial update when the page loads and constantly on input
    updateCharacterCount();
});
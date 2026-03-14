let form = document.getElementById('feedback-form');
let feedbackDisplay = document.getElementById('feedback-display');
let tooltip = document.getElementById('tooltip');
let errorMsg = document.getElementById('error-message');

// Count characters in real-time
form.addEventListener('input', (e) => {
    if (e.target.matches('input, textarea')) {
        const countSpan = e.target.nextElementSibling;
        if (countSpan && countSpan.classList.contains('char-count')) {
            countSpan.textContent = `${e.target.value.length} / ${e.target.maxLength}`;
        }
    }
});

//mouseover
form.addEventListener('mouseover', (e) => {
    const tipText = e.target.getAttribute('data-tooltip');
    if (tipText) {
        tooltip.textContent = tipText;
        tooltip.classList.remove('hidden');
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    }
});
form.addEventListener('mouseout', () => {
    tooltip.classList.add('hidden');
});

//click
document.body.addEventListener('click', () => {
    console.log("Background clicked!");
});

// Prevent click events from bubbling up to the body when clicking inside the form
form.addEventListener('click', (e) => {
    // Prevents the "Background clicked" log when clicking inside the form
    e.stopPropagation();
});

//error handling
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const comments = document.getElementById('comments').value.trim();

    if (!name || !email || !comments) {
        errorMsg.textContent = "All fields are required!";
        errorMsg.style.color = "red";
        return;
    }

    errorMsg.textContent = ""; // Clear errors
    appendFeedback(name, email, comments);
    form.reset();
    
    // Reset char counts
    document.querySelectorAll('.char-count').forEach(s => s.textContent = "0 characters");
});

function appendFeedback(name, email, comments) {
    const entry = document.createElement('div');
    entry.className = 'feedback-entry';
    entry.innerHTML = `
        <strong>${name}</strong> (${email})<br>
        <p>${comments}</p>
        <hr>
    `;
    feedbackDisplay.appendChild(entry);
}
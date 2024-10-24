// Accordion functionality
document.querySelectorAll('.accordion-title').forEach(item => {
    item.addEventListener('click', () => {
        const content = item.nextElementSibling;

        // Toggle display of the accordion content
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

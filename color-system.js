document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Copy to clipboard logic and Toast
    const swatches = document.querySelectorAll('.interactive-swatch');
    const toast = document.getElementById('toast');
    let toastTimeout;

    swatches.forEach(swatch => {
        swatch.addEventListener('click', async () => {
            const hex = swatch.getAttribute('data-hex');
            
            if (hex) {
                try {
                    await navigator.clipboard.writeText(hex);
                    showToast(`HEX copied: ${hex}`);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    showToast('Failed to copy');
                }
            }
        });
    });

    function showToast(message) {
        // Reset timeout if toast is already showing
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toast.textContent = message;
        toast.classList.add('show');
        toast.classList.remove('hidden');

        // Hide after ~1.4 seconds
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
            // Wait for transition to finish before hiding it from screen readers if needed
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 1400);
    }
});

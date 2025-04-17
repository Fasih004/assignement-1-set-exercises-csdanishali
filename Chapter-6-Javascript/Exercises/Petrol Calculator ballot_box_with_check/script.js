document.addEventListener('DOMContentLoaded', function() {
    const priceInput = document.getElementById('price');
    const litresInput = document.getElementById('litres');
    const calculateBtn = document.getElementById('calculate');
    const totalDisplay = document.getElementById('total');
    
    function calculateTotal() {
        const price = parseFloat(priceInput.value);
        const litres = parseFloat(litresInput.value);
        
        if (isNaN(price) || isNaN(litres) || price < 0 || litres < 0) {
            totalDisplay.textContent = 'Invalid input';
            totalDisplay.style.color = '#e74c3c';
            return;
        }
        
        const total = price * litres;
        totalDisplay.textContent = `$${total.toFixed(2)}`;
        totalDisplay.style.color = '#27ae60';
        totalDisplay.parentElement.style.animation = 'none';
        void totalDisplay.parentElement.offsetWidth;
        totalDisplay.parentElement.style.animation = 'fadeIn 0.3s ease-out';
    }
    
    calculateBtn.addEventListener('click', calculateTotal);
    
    [priceInput, litresInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateTotal();
            }
        });
    });
    
    calculateTotal();
});
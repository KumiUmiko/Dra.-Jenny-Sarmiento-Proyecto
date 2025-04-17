document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');
    
    // Validación de campos
    function validateField(field, errorId, condition, message) {
        const errorElement = document.getElementById(errorId);
        if (!condition) {
            errorElement.style.display = 'block';
            errorElement.textContent = message;
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    // Validar email con expresión regular
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validar teléfono (opcional pero si está presente debe tener formato correcto)
    function validatePhone(phone) {
        if (!phone) return true; // Es opcional
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(phone);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores de los campos
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validar todos los campos
        const isNombreValid = validateField('nombre', 'nombre-error', nombre.trim() !== '', 'Por favor ingrese su nombre');
        const isApellidoValid = validateField('apellido', 'apellido-error', apellido.trim() !== '', 'Por favor ingrese su apellido');
        const isEmailValid = validateField('email', 'email-error', validateEmail(email), 'Por favor ingrese un correo electrónico válido');
        const isTelefonoValid = validateField('telefono', 'telefono-error', validatePhone(telefono), 'Por favor ingrese un número de teléfono válido');
        const isMensajeValid = validateField('mensaje', 'mensaje-error', mensaje.trim() !== '', 'Por favor ingrese su mensaje');
        
        // Si todos los campos son válidos, enviar el formulario
        if (isNombreValid && isApellidoValid && isEmailValid && isTelefonoValid && isMensajeValid) {
            // En un entorno real, aquí iría el código para enviar los datos a un servidor
            // Por ejemplo, utilizando fetch() o XMLHttpRequest
            
            // Simulamos el envío exitoso
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'block';
                
                // Ocultamos el mensaje de éxito después de 5 segundos
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1000);
        }
    });
});
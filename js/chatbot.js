/**
 * Casa Aura - Concierge Virtual / Chatbot
 * Asistente inteligente para atender consultas de huéspedes 24/7
 */

(function () {
    'use strict';

    // --- Base de Conocimientos de Casa Aura ---
    const KNOWLEDGE_BASE = [
        {
            keywords: ['hola', 'buenas', 'buenos dias', 'buenas noches', 'buenas tardes', 'saludos', 'hey', 'start'],
            answer: `¡Hola! 👋 Bienvenido a **Casa Aura**. Soy tu Concierge Virtual. ¿En qué puedo ayudarte hoy? Puedes hacer clic en cualquiera de las sugerencias rápidas abajo o escribirme tu pregunta.`
        },
        {
            keywords: ['precio', 'precios', 'tarifa', 'tarifas', 'cuanto cuesta', 'costo', 'valor', 'noche', 'descuento', 'promocion'],
            answer: `💰 **Tarifas de Casa Aura**:\n\n• **Tarifa estándar**: $85 / noche (incluye hasta 2 huéspedes).\n• **Huésped adicional**: $15 / noche por persona extra (capacidad máxima: 4 personas).\n• **Descuento por estancia larga**: 10% de descuento automático para reservas de 7 noches o más.\n• **Tarifas corporativas/mensuales**: Disponibles para estancias de 30+ días.\n\n💡 *Tip: Si reservas directamente con nosotros vía WhatsApp, obtienes la mejor tarifa garantizada sin comisiones de plataformas.*`,
            actions: [{ text: '📲 Reservar por WhatsApp', url: 'https://wa.me/50496405085?text=Hola%20Andrea,%20me%20gustaria%20consultar%20disponibilidad%20y%20tarifas%20para%20Casa%20Aura' }]
        },
        {
            keywords: ['checkin', 'check in', 'checkout', 'check out', 'hora de entrada', 'hora de salida', 'horarios', 'llegada', 'salida'],
            answer: `⏰ **Horarios de Estancia**:\n\n• **Check-in**: A partir de las **3:00 PM**.\n• **Check-out**: Hasta las **11:00 AM**.\n\n🔑 El ingreso es autónomo y seguro mediante código de acceso y portón eléctrico. Si necesitas ingresar antes o salir más tarde, por favor consúltalo con Andrea previamente.`
        },
        {
            keywords: ['wifi', 'wi-fi', 'internet', 'starlink', 'velocidad', 'trabajar', 'conexion'],
            answer: `📶 **Conexión a Internet**:\n\nContamos con **Wi-Fi Starlink de Alta Velocidad** de cobertura total en la propiedad, ideal para trabajar de forma remota, llamadas en HD y streaming 4K sin interrupciones.`
        },
        {
            keywords: ['capacidad', 'personas', 'cuantos', 'huespedes', 'cuartos', 'habitaciones', 'camas', 'baños'],
            answer: `🏡 **Distribución y Capacidad**:\n\n• **Capacidad Máxima**: 4 huéspedes.\n• **Dormitorios**: 2 amplias habitaciones con aire acondicionado y ropa de cama premium.\n• **Baños**: 2 baños completos con agua caliente.\n• **Otras áreas**: Sala elegante, cocina totalmente equipada, comedor, área de lavandería y patio privado.`
        },
        {
            keywords: ['parqueo', 'estacionamiento', 'carro', 'cochera', 'vehiculo', 'garaje', 'seguridad', 'porton'],
            answer: `🚗 **Estacionamiento y Seguridad**:\n\nDisponemos de **estacionamiento privado y techado dentro de la propiedad** con portón eléctrico a control remoto y sistema de seguridad 24/7 en residencial privada (Residencial El Llano).`
        },
        {
            keywords: ['cocina', 'equipada', 'refrigeradora', 'estufa', 'cafe', 'cafetera', 'microondas', 'utensilios', 'cocinar'],
            answer: `🍳 **Cocina Totalmente Equipada**:\n\nLa cocina cuenta con refrigeradora moderna, estufa, horno microondas, cafetera, licuadora, vajilla completa, sartenes y utensilios de cocina para que te sientas como en casa.`
        },
        {
            keywords: ['regla', 'reglas', 'mascota', 'mascotas', 'perro', 'gato', 'fiesta', 'fiestas', 'evento', 'fumar', 'cigarrillo', 'fuma', 'ruido'],
            answer: `📜 **Reglas Principales de la Casa**:\n\n1. 🚭 **No Fumar** en áreas interiores (permitido únicamente en el patio exterior).\n2. 🎉 **No Fiestas ni Eventos**: Residencial tranquila; horario de silencio de 10:00 PM a 7:00 AM.\n3. 🐾 **Mascotas**: Se permiten solo previa autorización del anfitrión.\n4. 👥 **Máximo 4 personas**: Pernoctación exclusiva para huéspedes registrados.`
        },
        {
            keywords: ['donde queda', 'ubicacion', 'direccion', 'llegar', 'mapa', 'donde esta', 'direccion fisica', 'catacamas', 'olancho', 'barrio', 'residencial'],
            answer: `📍 **Ubicación de Casa Aura**:\n\nNos encontramos en: **Residencial El Llano 2da etapa, calle 4, primera casa a mano derecha, Catacamas, Olancho, Honduras**.\n\nUbicación estratégica y segura, a pocos minutos del centro de la ciudad y de atractivos turísticos.`,
            actions: [{ text: '🗺️ Ver en Google Maps', url: 'https://maps.google.com/?q=Casa+Aura+Catacamas' }]
        },
        {
            keywords: ['restaurante', 'comer', 'comida', 'guia', 'turismo', 'que hacer', 'visitar', 'cuevas', 'talgua', 'atracciones', 'lugares'],
            answer: `🍷 **Guía Local de Catacamas**:\n\n• 🏞️ **Atracción Principal**: Cuevas de Talgua (a 15 mins).\n• ☕ **Cafés & Desayunos**: Espresso Americano, Bistro Catacamas.\n• 🥩 **Restaurantes Recomendados**: El Ganadero, Rancho Talgua.\n\nRevisa nuestra pestaña [Guía Local](guia-local.html) en la web para ver nuestro mapa gastronómico detallado.`
        },
        {
            keywords: ['contacto', 'telefono', 'whatsapp', 'anfitrion', 'andrea', 'llamar', 'correo', 'email', 'reservar', 'reserva'],
            answer: `📲 **Contacto Directo con la Anfitriona**:\n\n• **Anfitriona**: Andrea Fiallos (Superanfitriona Airbnb)\n• **Teléfono / WhatsApp**: +504 9640 5085\n• **Correo**: reservas@casaaura.com\n\n¿Deseas enviar un mensaje directo por WhatsApp ahora mismo?`,
            actions: [{ text: '💬 Abrir WhatsApp de Andrea', url: 'https://wa.me/50496405085?text=Hola%20Andrea,%20estoy%20visitando%20el%20sitio%20web%20de%20Casa%20Aura%20y%20tengo%20una%20consulta.' }]
        },
        {
            keywords: ['gracias', 'muchas gracias', 'excelente', 'perfecto', 'ok', 'listo', 'entendido'],
            answer: `¡Con mucho gusto! 😊 Si tienes cualquier otra inquietud, estoy aquí para ayudarte. ¡Esperamos tenerte pronto en Casa Aura!`
        }
    ];

    // --- Definición de Preguntas Rápidas (Quick Chips) ---
    const QUICK_CHIPS = [
        { label: '💰 Tarifas y Precios', query: 'tarifas y precios' },
        { label: '⏰ Check-in / Out', query: 'horario checkin checkout' },
        { label: '📶 Wi-Fi Starlink', query: 'wifi internet' },
        { label: '🏡 Capacidad y Cuartos', query: 'capacidad y cuartos' },
        { label: '🚗 Parqueo y Seguridad', query: 'parqueo y seguridad' },
        { label: '📜 Reglas de la Casa', query: 'reglas de la casa' },
        { label: '📍 Dirección y Ubicación', query: 'ubicacion y mapa' },
        { label: '💬 Hablar con Andrea', query: 'contacto whatsapp' }
    ];

    // --- Construcción de la Interfaz UI ---
    function initChatbotUI() {
        if (document.getElementById('aura-chatbot-root')) return;

        const container = document.createElement('div');
        container.id = 'aura-chatbot-root';
        container.innerHTML = `
            <!-- Botón Flotante (Launcher) -->
            <button id="aura-chat-launcher" class="aura-chat-launcher" aria-label="Abrir asistente virtual Casa Aura">
                <div class="launcher-pulse"></div>
                <div class="launcher-icon icon-chat">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                </div>
                <div class="launcher-icon icon-close" style="display: none;">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <span class="launcher-badge">1</span>
                <div class="launcher-tooltip">¿Dudas? Habla con nuestro Concierge 🌟</div>
            </button>

            <!-- Ventana de Chat (Widget) -->
            <div id="aura-chat-window" class="aura-chat-window" style="display: none;">
                <!-- Header -->
                <div class="aura-chat-header">
                    <div class="header-info">
                        <div class="avatar-container">
                            <img src="assets/logo.svg" alt="Casa Aura" class="header-logo">
                            <span class="online-status"></span>
                        </div>
                        <div class="header-titles">
                            <h3>Concierge Casa Aura</h3>
                            <p>Asistente Virtual 24/7 • Catacamas</p>
                        </div>
                    </div>
                    <button id="aura-chat-close" class="header-close-btn" aria-label="Cerrar chat">&times;</button>
                </div>

                <!-- Lista de Mensajes -->
                <div id="aura-chat-messages" class="aura-chat-messages">
                    <!-- Mensaje de bienvenida inicial -->
                </div>

                <!-- Chips Sugerencias Rápidas -->
                <div class="aura-chat-chips" id="aura-chat-chips"></div>

                <!-- Input y Envío -->
                <form id="aura-chat-form" class="aura-chat-form">
                    <input type="text" id="aura-chat-input" placeholder="Escribe tu mensaje aquí..." autocomplete="off">
                    <button type="submit" id="aura-chat-send" aria-label="Enviar mensaje">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(container);

        // Referencias a Elementos DOM
        const launcherBtn = document.getElementById('aura-chat-launcher');
        const chatWindow = document.getElementById('aura-chat-window');
        const closeBtn = document.getElementById('aura-chat-close');
        const messagesContainer = document.getElementById('aura-chat-messages');
        const chipsContainer = document.getElementById('aura-chat-chips');
        const chatForm = document.getElementById('aura-chat-form');
        const chatInput = document.getElementById('aura-chat-input');
        const iconChat = launcherBtn.querySelector('.icon-chat');
        const iconClose = launcherBtn.querySelector('.icon-close');
        const badge = launcherBtn.querySelector('.launcher-badge');
        const tooltip = launcherBtn.querySelector('.launcher-tooltip');

        let isChatOpen = false;
        let hasInitializedMessages = false;

        // Alternar Estado Abierto / Cerrado
        function toggleChat() {
            isChatOpen = !isChatOpen;
            if (isChatOpen) {
                chatWindow.style.display = 'flex';
                setTimeout(() => chatWindow.classList.add('open'), 10);
                iconChat.style.display = 'none';
                iconClose.style.display = 'block';
                badge.style.display = 'none';
                tooltip.style.display = 'none';

                if (!hasInitializedMessages) {
                    renderWelcomeSequence();
                    hasInitializedMessages = true;
                }
                chatInput.focus();
            } else {
                chatWindow.classList.remove('open');
                setTimeout(() => chatWindow.style.display = 'none', 300);
                iconChat.style.display = 'block';
                iconClose.style.display = 'none';
            }
        }

        launcherBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        // Renderizar Chips Rápidos
        QUICK_CHIPS.forEach(chip => {
            const chipBtn = document.createElement('button');
            chipBtn.className = 'chip-btn';
            chipBtn.textContent = chip.label;
            chipBtn.addEventListener('click', () => {
                handleUserQuery(chip.label, chip.query);
            });
            chipsContainer.appendChild(chipBtn);
        });

        // Enviar por Formulario
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                handleUserQuery(text, text);
                chatInput.value = '';
            }
        });

        // Secuencia Inicial de Bienvenida
        function renderWelcomeSequence() {
            appendMessage('bot', `¡Hola! ✨ Bienvenido a **Casa Aura**.\nSoy tu Concierge Virtual. ¿En qué te puedo ayudar hoy?`, [
                { text: '📲 Hablar por WhatsApp', url: 'https://wa.me/50496405085?text=Hola%20Andrea,%20tengo%20una%20consulta%20sobre%20Casa%20Aura' }
            ]);
        }

        // Manejar Consulta del Usuario
        function handleUserQuery(displayText, searchQuery) {
            appendMessage('user', displayText);
            showTypingIndicator();

            setTimeout(() => {
                removeTypingIndicator();
                const response = searchKnowledgeBase(searchQuery);
                appendMessage('bot', response.answer, response.actions);
            }, 750);
        }

        // Buscar en la Base de Conocimiento
        function searchKnowledgeBase(query) {
            const cleanQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            for (const item of KNOWLEDGE_BASE) {
                for (const kw of item.keywords) {
                    const cleanKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    if (cleanQuery.includes(cleanKw)) {
                        return item;
                    }
                }
            }

            // Respuesta por defecto / Fallback
            const encodedQuery = encodeURIComponent(query);
            return {
                answer: `Disculpa, no encontré una respuesta exacta para esa consulta 🤔. \n\nPero puedes comunicarte directamente con **Andrea Fiallos**, nuestra anfitriona, quien te responderá de inmediato vía WhatsApp.`,
                actions: [
                    { text: '💬 Preguntar a Andrea en WhatsApp', url: `https://wa.me/50496405085?text=Hola%20Andrea,%20tengo%20una%20consulta:%20${encodedQuery}` }
                ]
            };
        }

        // Añadir Mensaje a la Pantalla
        function appendMessage(sender, text, actions = null) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `aura-msg aura-msg-${sender}`;

            // Formatear Markdown básico (**bold**, \n)
            let formattedText = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
                .replace(/\n/g, '<br>');

            let contentHTML = `<div class="msg-bubble">${formattedText}</div>`;

            if (actions && actions.length > 0) {
                contentHTML += `<div class="msg-actions">`;
                actions.forEach(act => {
                    contentHTML += `<a href="${act.url}" target="_blank" rel="noopener" class="msg-action-btn">${act.text}</a>`;
                });
                contentHTML += `</div>`;
            }

            msgDiv.innerHTML = contentHTML;
            messagesContainer.appendChild(msgDiv);
            scrollToBottom();
        }

        // Indicador de Tipeo
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.id = 'aura-typing-indicator';
            typingDiv.className = 'aura-msg aura-msg-bot typing';
            typingDiv.innerHTML = `
                <div class="msg-bubble">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;
            messagesContainer.appendChild(typingDiv);
            scrollToBottom();
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('aura-typing-indicator');
            if (indicator) indicator.remove();
        }

        function scrollToBottom() {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbotUI);
    } else {
        initChatbotUI();
    }
})();

// ===== CONFIGURAÇÕES AVANÇADAS DO WHATSAPP =====

const WhatsAppConfig = {
  // COLOQUE SEU NÚMERO AQUI (formato: 5511999999999)
  phoneNumber: "5583981438544",

  // Mensagens personalizadas por plano
  planMessages: {
    Start: {
      greeting: "🚀 Olá! Tenho interesse no plano START",
      details: `
📋 *Detalhes do meu interesse:*
• Plano: Start (R$ 79,99/mês)
• Setup: R$ 149,99
• Ideal para: Autônomo/MEI

❓ *Gostaria de saber:*
• Como funciona o processo de criação
• Prazo para o site ficar pronto
• Formas de pagamento disponíveis
• Posso ver exemplos de sites criados?

Aguardo retorno! 😊`,
      emoji: "🚀",
    },

    Profissional: {
      greeting: "💼 Olá! Tenho interesse no plano PROFISSIONAL",
      details: `
📋 *Detalhes do meu interesse:*
• Plano: Profissional (R$ 99,99/mês) ⭐ MAIS POPULAR
• Setup: R$ 189,99
• Ideal para: Pequena empresa

❓ *Gostaria de saber:*
• Diferenças entre o plano Start e Profissional
• Como funciona o formulário de contato
• Posso ter quantas alterações por mês?
• Vocês fazem integração com redes sociais?

Aguardo retorno! 😊`,
      emoji: "💼",
    },

    Catálogo: {
      greeting: "🛍️ Olá! Tenho interesse no plano CATÁLOGO",
      details: `
📋 *Detalhes do meu interesse:*
• Plano: Catálogo (R$ 129,99/mês)
• Setup: R$ 229,99
• Ideal para: Loja com produtos

❓ *Gostaria de saber:*
• Como funciona o catálogo de produtos
• Posso adicionar mais de 20 produtos depois?
• Como os clientes fazem pedidos pelo WhatsApp?
• Vocês ajudam com fotos dos produtos?

Aguardo retorno! 😊`,
      emoji: "🛍️",
    },

    "Loja Virtual": {
      greeting: "🏪 Olá! Tenho interesse no plano LOJA VIRTUAL",
      details: `
📋 *Detalhes do meu interesse:*
• Plano: Loja Virtual (R$ 169,99/mês)
• Setup: R$ 449,99
• Ideal para: E-commerce completo

❓ *Gostaria de saber:*
• Como funciona a integração com pagamentos
• Qual a taxa do Pix e cartão de crédito?
• Como gerencio os pedidos?
• Vocês fazem integração com correios?
• Posso vender produtos digitais também?

Aguardo retorno! 😊`,
      emoji: "🏪",
    },
  },

  // Horários de funcionamento
  businessHours: {
    start: 8, // 8h
    end: 18, // 18h
    timezone: "America/Sao_Paulo",
  },

  // Mensagens automáticas baseadas no horário
  timeBasedMessages: {
    morning: "🌅 Bom dia!",
    afternoon: "☀️ Boa tarde!",
    evening: "🌙 Boa noite!",
    weekend: "🎉 Ótimo final de semana para planejar seu site!",
  },
}

// ===== FUNÇÕES AVANÇADAS =====

// Detectar horário e ajustar saudação
function getTimeBasedGreeting() {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay() // 0 = domingo, 6 = sábado

  // Final de semana
  if (day === 0 || day === 6) {
    return WhatsAppConfig.timeBasedMessages.weekend
  }

  // Horários do dia
  if (hour >= 5 && hour < 12) {
    return WhatsAppConfig.timeBasedMessages.morning
  } else if (hour >= 12 && hour < 18) {
    return WhatsAppConfig.timeBasedMessages.afternoon
  } else {
    return WhatsAppConfig.timeBasedMessages.evening
  }
}

// Verificar se está no horário comercial
function isBusinessHours() {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()

  // Weekend
  if (day === 0 || day === 6) return false

  return hour >= WhatsAppConfig.businessHours.start && hour <= WhatsAppConfig.businessHours.end
}

// Coletar informações do usuário (opcional)
function collectUserInfo() {
  const userAgent = navigator.userAgent
  const screenSize = `${screen.width}x${screen.height}`
  const timestamp = new Date().toLocaleString("pt-BR")

  return {
    timestamp,
    device: /Mobile|Android|iPhone|iPad/.test(userAgent) ? "📱 Mobile" : "💻 Desktop",
    screenSize,
    page: window.location.href,
  }
}

// Função principal melhorada
function selectPlan(planName, price) {
  // Animação do botão
  const button = event.target
  button.style.transform = "scale(0.95)"
  button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Redirecionando...`

  // Buscar configuração do plano
  const planConfig = WhatsAppConfig.planMessages[planName]
  if (!planConfig) {
    console.error("Plano não encontrado:", planName)
    return
  }

  // Montar mensagem personalizada
  const greeting = getTimeBasedGreeting()
  const userInfo = collectUserInfo()

  let message = `${greeting} ${planConfig.greeting}\n\n`
  message += planConfig.details

  // Adicionar informações técnicas (opcional)
  if (!isBusinessHours()) {
    message += `\n\n⏰ *Observação:* Estou entrando em contato fora do horário comercial (8h às 18h), mas aguardo retorno assim que possível!`
  }

  message += `\n\n📊 *Informações técnicas:*`
  message += `\n• Horário: ${userInfo.timestamp}`
  message += `\n• Dispositivo: ${userInfo.device}`
  message += `\n• Origem: Site code.bble`

  // Delay para animação e abrir WhatsApp
  setTimeout(() => {
    button.style.transform = "scale(1)"
    button.innerHTML = "Escolher Plano"
    openWhatsAppAdvanced(message, planName)
  }, 1000)
}

// Função avançada do WhatsApp
function openWhatsAppAdvanced(message, planName) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappURL = `https://wa.me/${WhatsAppConfig.phoneNumber}?text=${encodedMessage}`

  // Analytics/Tracking
  trackPlanSelection(planName)

  // Feedback visual
  showSuccessMessage(`Redirecionando para WhatsApp... ${WhatsAppConfig.planMessages[planName].emoji}`)

  // Abrir WhatsApp
  window.open(whatsappURL, "_blank")

  // Salvar no localStorage para remarketing
  saveUserInterest(planName)
}

// Tracking de conversões
function trackPlanSelection(planName) {
  // Google Analytics (se instalado)
  const gtag = window.gtag // Declare gtag variable
  if (typeof gtag !== "undefined") {
    gtag("event", "plan_selected", {
      event_category: "conversion",
      event_label: planName,
      value: 1,
    })
  }

  // Facebook Pixel (se instalado)
  const fbq = window.fbq // Declare fbq variable
  if (typeof fbq !== "undefined") {
    fbq("track", "Lead", {
      content_name: planName,
      content_category: "plan_selection",
    })
  }

  console.log(`📊 Plano selecionado: ${planName}`)
}

// Salvar interesse do usuário
function saveUserInterest(planName) {
  const userInterests = JSON.parse(localStorage.getItem("userInterests") || "[]")
  userInterests.push({
    plan: planName,
    timestamp: new Date().toISOString(),
    page: window.location.href,
  })
  localStorage.setItem("userInterests", JSON.stringify(userInterests))
}

// Feedback visual de sucesso
function showSuccessMessage(message) {
  const feedback = document.createElement("div")
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, #10b981, #059669);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
    animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 3s forwards;
  `
  feedback.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`
  document.body.appendChild(feedback)

  setTimeout(() => feedback.remove(), 4000)
}

// ===== MANTENDO AS ANIMAÇÕES ORIGINAIS =====

// Custom Cursor Movement
const cursor = document.querySelector(".custom-cursor")
const cursorFollower = document.querySelector(".cursor-follower")

document.addEventListener("mousemove", (e) => {
  if (cursor && cursorFollower) {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  }
})

// Cursor Hover Effects
document.addEventListener("mouseenter", (e) => {
  if (e.target.matches("button, a, .plan-card") && cursor) {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
    cursor.style.borderColor = "#8b5cf6"
  }
})

document.addEventListener("mouseleave", (e) => {
  if (e.target.matches("button, a, .plan-card") && cursor) {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursor.style.borderColor = "#06b6d4"
  }
})

// Button Ripple Effect
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-hover-effect")) {
    const button = e.target
    const ripple = button.querySelector(".btn-ripple")

    if (ripple) {
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"

      ripple.style.animation = "none"
      ripple.offsetHeight // Trigger reflow
      ripple.style.animation = "ripple 0.6s linear"
    }
  }
})

// Smooth Scroll with Easing
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Enhanced Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  const scrolled = window.scrollY

  if (header) {
    if (scrolled > 100) {
      header.style.background = "rgba(0, 0, 0, 0.95)"
      header.style.backdropFilter = "blur(20px)"
    } else {
      header.style.background = "rgba(0, 0, 0, 0.2)"
      header.style.backdropFilter = "blur(10px)"
    }
  }

  updateScrollProgress()
})

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollProgress = document.querySelector(".scroll-progress")
  if (scrollProgress) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercent = (scrollTop / scrollHeight) * 100
    scrollProgress.style.width = scrollPercent + "%"
  }
}

// Enhanced Animation on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".plan-card, .benefit-item, .step")

  elements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 100) // Stagger animation
    }
  })
}

// Floating Elements Movement
function animateFloatingElements() {
  const floatingElements = document.querySelectorAll(".floating-element")

  floatingElements.forEach((element, index) => {
    const speed = element.dataset.speed || 1
    const offset = Math.sin(Date.now() * 0.001 + index) * 10 * speed
    element.style.transform = `translateY(${offset}px)`
  })

  requestAnimationFrame(animateFloatingElements)
}

// Add Scroll Progress Bar
function addScrollProgressBar() {
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  document.body.appendChild(progressBar)
}

// CSS para animações de feedback
const feedbackStyles = document.createElement("style")
feedbackStyles.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`
document.head.appendChild(feedbackStyles)

// ===== FUNCIONALIDADES EXTRAS =====

// Botão de WhatsApp flutuante com contador
function updateWhatsAppCounter() {
  const interests = JSON.parse(localStorage.getItem("userInterests") || "[]")
  const whatsappButton = document.getElementById("whatsappFloat")

  if (interests.length > 0 && whatsappButton) {
    // Remove contador existente
    const existingCounter = whatsappButton.querySelector(".interest-counter")
    if (existingCounter) {
      existingCounter.remove()
    }

    const counter = document.createElement("div")
    counter.className = "interest-counter"
    counter.style.cssText = `
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ef4444;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    `
    counter.textContent = interests.length
    whatsappButton.appendChild(counter)
  }
}

// Remarketing - mostrar planos visitados
function showRemarketingMessage() {
  const interests = JSON.parse(localStorage.getItem("userInterests") || "[]")

  if (interests.length > 0) {
    const lastInterest = interests[interests.length - 1]
    const timeDiff = Date.now() - new Date(lastInterest.timestamp).getTime()
    const hoursDiff = timeDiff / (1000 * 60 * 60)

    // Se visitou há menos de 24h
    if (hoursDiff < 24) {
      setTimeout(() => {
        const remarketing = document.createElement("div")
        remarketing.style.cssText = `
          position: fixed;
          bottom: 100px;
          right: 20px;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 15px;
          border-radius: 10px;
          max-width: 250px;
          font-size: 14px;
          z-index: 999;
          animation: fadeInUp 0.5s ease;
        `
        remarketing.innerHTML = `
          <div style="margin-bottom: 10px;">
            <strong>👋 Olá novamente!</strong>
          </div>
          <div style="margin-bottom: 10px;">
            Você demonstrou interesse no plano <strong>${lastInterest.plan}</strong>
          </div>
          <button onclick="openWhatsAppAdvanced('Olá! Gostaria de continuar nossa conversa sobre o plano ${lastInterest.plan}', '${lastInterest.plan}'); this.parentElement.remove()" style="
            background: #25d366;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
          ">
            💬 Continuar conversa
          </button>
        `
        document.body.appendChild(remarketing)

        setTimeout(() => remarketing.remove(), 10000)
      }, 3000)
    }
  }
}

// Função para WhatsApp geral (botão flutuante)
function openWhatsApp(message = "") {
  const phoneNumber = WhatsAppConfig.phoneNumber
  const greeting = getTimeBasedGreeting()
  const fullMessage = `${greeting} ${message}`
  const encodedMessage = encodeURIComponent(fullMessage)
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  window.open(whatsappURL, "_blank")
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  // Add scroll progress bar
  addScrollProgressBar()

  // Initialize animations
  const elements = document.querySelectorAll(".plan-card, .benefit-item, .step")
  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`
  })

  // Start floating animation
  animateFloatingElements()

  // WhatsApp Float Button Click
  const whatsappFloat = document.getElementById("whatsappFloat")
  if (whatsappFloat) {
    whatsappFloat.addEventListener("click", () => {
      openWhatsApp("Gostaria de saber mais sobre os planos de sites profissionais.")
    })
  }

  // Scroll events
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load

  // Initialize WhatsApp features
  updateWhatsAppCounter()
  showRemarketingMessage()
})

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".plan-card, .benefit-item, .step").forEach((el) => {
    observer.observe(el)
  })
})

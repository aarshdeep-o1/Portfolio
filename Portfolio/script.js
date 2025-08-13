// Portfolio JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Navigation functionality
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const navbar = document.getElementById("navbar")

  // Create scroll indicator
  const scrollIndicator = document.createElement("div")
  scrollIndicator.className = "scroll-indicator"
  document.body.appendChild(scrollIndicator)

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
    mobileMenu.classList.toggle("show")
  })

  // Close mobile menu when clicking on links
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      mobileMenu.classList.remove("show")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Scroll event handler
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    // Update scroll indicator
    scrollIndicator.style.width = scrollPercent + "%"

    // Update navbar background
    if (scrollTop > 50) {
      navbar.classList.add("bg-purple-900/95")
      navbar.classList.remove("bg-purple-900/80")
    } else {
      navbar.classList.add("bg-purple-900/80")
      navbar.classList.remove("bg-purple-900/95")
    }

    // Update active navigation link
    const sections = document.querySelectorAll("section[id]")
    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-section") === currentSection || link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active")
      }
    })
  })

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll(".skill-bar")
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target
          const targetWidth = skillBar.getAttribute("data-width")
          skillBar.style.setProperty("--target-width", targetWidth + "%")
          skillBar.classList.add("animate")
          skillBar.style.width = targetWidth + "%"
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })

  // Animate cards when they come into view
  const cards = document.querySelectorAll(".card, .project-card")
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = Math.random() * 0.5 + "s"
          entry.target.classList.add("fade-in-up")
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => {
    cardObserver.observe(card)
  })

  // Add typing effect to hero subtitle
  const typewriterText = document.querySelector(".typewriter")
  if (typewriterText) {
    const text = typewriterText.textContent
    typewriterText.textContent = ""
    typewriterText.style.borderRight = "3px solid #ff6b35"

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        typewriterText.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      } else {
        // Blinking cursor effect
        setInterval(() => {
          typewriterText.style.borderRight =
            typewriterText.style.borderRight === "3px solid transparent" ? "3px solid #ff6b35" : "3px solid transparent"
        }, 750)
      }
    }

    setTimeout(typeWriter, 2000)
  }

  // Add parallax effect to background elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-element, .floating-element-delayed")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = translateY(${scrolled * speed}px)
    })
  })

  // Add click ripple effect to buttons
  const buttons = document.querySelectorAll("button, .btn-primary, .btn-secondary")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add CSS for ripple effect
  const style = document.createElement("style")
  style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  // Add smooth reveal animation for sections
  const sections = document.querySelectorAll("section")
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    sectionObserver.observe(section)
  })

  // Add dynamic particle generation
  const particleContainer = document.querySelector(".particles")
  if (particleContainer) {
    setInterval(() => {
      if (document.querySelectorAll(".particle").length < 10) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animationDuration = Math.random() * 10 + 10 + "s"
        particle.style.animationDelay = Math.random() * 2 + "s"
        particleContainer.appendChild(particle)

        setTimeout(() => {
          particle.remove()
        }, 20000)
      }
    }, 3000)
  }

  // Add loading animation for images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    if (img.complete) {
      img.style.opacity = "1"
    }
  })
})

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add cursor trail effect
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 768) {
    // Only on desktop
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.left = e.clientX + "px"
    trail.style.top = e.clientY + "px"
    document.body.appendChild(trail)

    setTimeout(() => {
      trail.remove()
    }, 1000)
  }
})

// Add CSS for cursor trail
const cursorStyle = document.createElement("style")
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #ff6b35, #ff1744);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trail-fade 1s ease-out forwards;
    }
    
    @keyframes trail-fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`
document.head.appendChild(cursorStyle)
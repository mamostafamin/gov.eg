window.onload = () => {
    const forms = document.getElementsByClassName('formd')
    const animations = document.getElementsByClassName('animate')
    const contactUs = document.getElementById('contactus')
    const preventLink = document.getElementsByClassName('prevent-link')

    for (let i=0; i<forms.length; i++) {
        const form = forms[i]
        form.addEventListener('submit', (e) => {
            e.preventDefault()
        })
    }

    for (let i=0; i<preventLink.length; i++) {
        const link = preventLink[i]
        link.addEventListener('click', (e) => {
            e.preventDefault()
        })
    }

    for (let i=0; i<animations.length; i++) {
        const ani = animations[i]
        const animationClass = ani.getAttribute('animation') || 'fadeIn'
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) ani.classList.add(animationClass)
            })
        }, {threshold: 0.1})
        observer.observe(ani)
    }

    if (contactUs) {
        contactUs.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo(0, document.body.scrollHeight);
        })
    }

    try {loadServices()} catch {}
    try {loadOGD()} catch {}
}
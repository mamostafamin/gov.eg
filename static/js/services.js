const services = [
    {
        name: 'education',
        title: 'خدمات تعليمية',
        image: 'static/media/education.jpg',
        description: `
        الخدمات التعلمية هي خدمات ....
        `
    },
    {
        name: 'housing',
        title: 'خدمات الاسكان الاجتماعي',
        image: 'static/media/housing.png',
        description: `
        وصف الخدمات الاسكان
        `
    },
    {
        name: 'judicial',
        title: 'خدمات قضائية',
        image: 'static/media/judge.jpg',
        description: `
        وصف الخدمات القضائية
        `
    },
]

const featured = ['housing', 'education']

const getQueryParams = (search) => {
    let queryParams = {}
    const params = search.replace('?', '').split('&')
    params.forEach(param => {
        const values = param.split('=')
        queryParams[values[0]] = values[1]
    })
    return queryParams
}

const loadFeatured = () => {
    const container = document.getElementById('featured_services')
    const template = document.getElementById('featued_service_template')
    let content = ''

    featured.forEach(f => {
        const service = services.find(s => s.name === f)

        if (service) {
            content += template.innerHTML
            .replaceAll('{service_name}', service.name)
            .replaceAll('{service_title}', service.title)
            .replace('{service_description}', service.description)
            .replace('{service_image}', service.image)
        }
    })

    container.innerHTML = content
    container.classList.add('slideRight')
}

const loadServices = () => {
    loadFeatured()
    const params = getQueryParams(window.location.search)
    const container = document.getElementById('all_services')
    const allTemplate = document.getElementById('all_services_template')
    const service = services.find(s => s.name === params.service)

    if (service) {
        const detailTemplate = document.getElementById('service_detail_template')
        const allHeader = document.getElementById('all_header')
        let content  = ''
        let newServices = [...services]
        newServices.splice(services.indexOf(service), 1)

        content += detailTemplate.innerHTML
        .replaceAll('{service_name}', service.name)
        .replaceAll('{service_title}', service.title)
        .replace('{service_description}', (service.description.substring(0, 50) + '...'))
        .replace('{service_image}', service.image)
        allHeader.remove()

        newServices.forEach(service => {
            content += allTemplate.innerHTML
            .replaceAll('{service_name}', service.name)
            .replaceAll('{service_title}', service.title)
            .replace('{service_description}', service.description)
            .replace('{service_image}', service.image)
        })
        document.title = service.title + ' - بوابة الحكومة المصرية'
        container.innerHTML = content
    }
    else {
        if (params.service) window.history.replaceState(null, null, 'services.html')
        let content  = ''

        services.forEach(service => {
            content += allTemplate.innerHTML
            .replaceAll('{service_name}', service.name)
            .replaceAll('{service_title}', service.title)
            .replace('{service_description}', service.description)
            .replace('{service_image}', service.image)
        })
        document.title = 'الخدمات - بوابة الحكومة المصرية'
        container.innerHTML = content
    }
}
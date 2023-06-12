export default {
    install(app, options) {
        app.config.globalProperties.$dateFilter = function(format, locale){

            const options = {}
            const nowDate = new Date()

            if(format.includes('date')) {
                options.day = '2-digit'
                options.month = 'long'
                options.year = 'numeric'
            }
            if(format.includes('time')) {
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second = '2-digit'
            }
            if(format.includes('short')) {
                options.day = '2-digit'
                options.month = '2-digit'
                options.year = '2-digit'
            }
            return new Intl.DateTimeFormat(locale,options).format(nowDate)
        }

    }
}
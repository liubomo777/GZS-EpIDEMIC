import Vue from 'vue'
import inputFilter from './inputFilter'
import scrollFilter from './scroll'

export default {
    init () {
        const Directive = {
            fixHeight: {
                update: (el, binding) => {
                    const HIDDEN_STYLE = `
            height:0 !important;
            visibility:hidden !important;
            overflow:hidden !important;
            position:absolute !important;
            z-index:-1000 !important;
            top:0 !important;
            right:0 !important
          `
                    let contentStyle = ''
                    const textarea = el.querySelector('textarea')
                    if (textarea) {
                        contentStyle = `width:${textarea.clientWidth}px;font-size:16px;}`
                    }
                    let hiddenTextarea = document.querySelector('#hiddenTextarea')
                    if (!hiddenTextarea) {
                        hiddenTextarea = document.createElement('textarea')
                        hiddenTextarea.id = 'hiddenTextarea'
                        document.body.appendChild(hiddenTextarea)
                    }
                    hiddenTextarea.setAttribute('style', `${contentStyle};${HIDDEN_STYLE}`)
                    hiddenTextarea.value = binding.value
                    const height = hiddenTextarea.scrollHeight + 4
                    textarea.style.height = `${height}px`
                },
                unbind: () => {
                    const hiddenTextarea = document.querySelector('#hiddenTextarea')
                    hiddenTextarea && hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea)
                }
            },
            inputFilter: inputFilter,
            scrollFilter: scrollFilter
        }
        Object.keys(Directive).forEach(key => {
            Vue.directive(key, Directive[key])
        })
    }
}

/**
 *  实现功能
 *  1、默认情况下只禁止空格输入
 *  2、限制只能输入整数
 *  3、限制只能输入整数和小数（价格类）
 *  4、限制只能输入手机号
 *  5、限制最大值和最小值(抛出错误给回调函数)
 *  6、限制为1开头的11位纯数字 或者 0760开头开头的12位纯数字 或者不是0和1开头的 8位纯数字
 *
 *  使用示例:
 *  <el-input v-input-filter v-model="inputSpaceFilter" placeholder="空格无法输入"></el-input>
 *  <el-input v-input-filter:int v-model="inputIntFilter" placeholder="只能输入整数"></el-input>
 *  <el-input v-input-filter:number v-model="inputIntFilter" placeholder="只能输入数字"></el-input>
 *  <el-input v-input-filter:price v-model="inputPriceFilter" placeholder="只能输入价格"></el-input>
 *  <el-input v-input-filter:special v-model="inputSpecialFilter" placeholder="过滤特殊字符"></el-input>
 *  <el-input v-input-filter:phone v-model="inputPhoneFilter" placeholder="只能输入手机号"></el-input>
 *  <el-input v-input-filter:url v-model="inputUrlFilter" placeholder="只能输入网址"></el-input>
 *  <el-input v-input-filter:contactFilter v-model="inputUrlFilter" placeholder="只能输入联系电话"></el-input>

    校验参考:
    https://www.cnblogs.com/huangf714/p/6252567.html
 */
const addListener = function(el, type, fn) {
    el.addEventListener(type, fn, false)
}
const spaceFilter = function(el) {
    addListener(el, 'keyup', () => {
        el.value = el.value.replace(/\s+/, '')
    })
}
const intFilter = function(el) {
    addListener(el, 'keyup', () => {
        el.value = el.value.replace(/\D/g, '')
    })
}

const numberFilter = function(el) {
  addListener(el, 'keyup', () => {
    const reg =/^\d+$/
    if(el.value){
      const len = el.value.length
      const res = reg.test(el.value.charAt(len - 1))
      if(len > 11 ){
        el.value = el.value.substring(0,10)
      }else if(!reg.test(el.value.charAt(len - 1))){
        if(len ==1){
          el.value = ''
        }else{
          el.value = el.value.substring(0,len-1)
        }

      }
    }

  })
}
const idCardFilter = function(el) {
  addListener(el, 'keyup', () => {
    const reg =/^[0-9a-zA-Z]+$/

    if(el.value){
      const len = el.value.length
      const res = reg.test(el.value.charAt(len - 1))
      if(len > 18 ){
        el.value = el.value.substring(0,10)
      }else if(!reg.test(el.value.charAt(len - 1))){
        if(len ==1){
          el.value = ''
        }else{
          el.value = el.value.substring(0,len-1)
        }

      }
    }

  })
}
const priceFilter = function(el) {
    addListener(el, 'keyup', () => {
        el.value = el.value.replace(/[^\d.]*/g, '')
        if (isNaN(el.value)) {
            el.value = ''
        }
    })
}

const specialFilter = function(el,_this) {
    addListener(el, 'keyup', () => {
        el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
    })
}
const phoneFilter = function(el,_this) {
    addListener(el, 'blur', () => {
        if (!el.value) {
            return
        }
        const phoneReg = new RegExp('^(13|14|15|16|17|18|19)[0-9]{9}$')
        if (!phoneReg.test(el.value)) {
            /*alert('手机号输入错误')*/
            _this.$message({message:"手机号输入格式不正确",type: 'warning'})
            el.value = ''
        }
    })
}

const contactFilter = function(el,_this) {
    addListener(el, 'blur', () => {
        const contact = el.value

        if (!contact) {
            return
        }

        const start = contact.slice(0,1)
        const len = contact.length
        let test = true
        if(start=='1'){
            //1开头的11位纯数字
            test = new RegExp('^(13|14|15|16|17|18|19)[0-9]{9}$').test(contact)
        }else if(start=='0'){
            if(len==12){
                //0760开头的12位纯数字
                test = new RegExp('^(0760)[0-9]{8}$').test(contact)
            }else if(len==8){
                //0开头的8位纯数字
                test = new RegExp('^0[0-9]{7}$').test(contact)
            }else{
                test = false
            }
        }else{
            //非0,1开头的8位纯数字
            test = new RegExp('^[2-9]{8}$').test(contact)
        }

        if (!test) {
            _this.$message({message:"请输入正确的联系电话",type: 'warning'})
            el.value = ''
        }
    })
}

const focusFilter = function(el) {
    addListener(el, 'inserted', () => {
        el.focus()
    })
}

const urlFilter = function(el,_this) {
    addListener(el, 'blur', () => {
        if (!el.value) {
            return
        }
        const urlReg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/
        if (!urlReg.test(el.value)) {
            _this.$message({message:"url输入格式不正确",type: 'warning'})
            el.value = ''
        }
    })
}



export default {
    bind(el, binding,vnode) {//context
        if (el.tagName.toLowerCase() !== 'input') {
            el = el.getElementsByTagName('input')[0]
        }
        spaceFilter(el)
        switch (binding.arg) {
            case 'int':
                intFilter(el)
                break
            case 'price':
                priceFilter(el)
                break
            case 'special':
                specialFilter(el)
                break
            case 'phone':
                phoneFilter(el,vnode.context)
                break
            case 'contact':
                contactFilter(el,vnode.context)
                break
            case 'url':
                urlFilter(el,vnode.context)
                break
            case 'focus':
                focusFilter(el,vnode.context)
                break
            case 'number':
              numberFilter(el)
                break
            default:
                break
        }
    }
}



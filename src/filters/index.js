
import { encrypt, decrypt } from '@/utils'
export function fenFilter(val) {
  return val ? (val / 100).toFixed(2) : 0.00;
}
export function fenFilter0(val) {
  return val ? (val / 100).toFixed(0) : 0;
}
export function encryptFilter(val) {
  return val ? decrypt(val) : ''
}


export function modeName(mode) {//
  let val=''
  switch (mode){
    case 1:
      val='上门服务'
      break
    case 2:
      val='到店服务'
      break
    case 3:
      val='配送'
      break
    case 4:
      val='自提'
      break
  }
  return val

}
export function isRetailFilter(isRetail) {//分销设置
  let val=''
  isRetail==1?val='自营和分销':isRetail==2?val='仅分销':isRetail==0?val='仅自营':''
  return val

}

export function noSubsidyFilter(data) {//仅限服务券购买
  let val=''
  data===1?val='是':data===0?val='否':''
  return val

}

export function homeRestrictFilter(data) {//上门服务限制
  let val=''
  data===1?val='是':data===0?val='否':''
  return val

}

export function ReSex (val) {
  let txt
  switch (val) {
    case 1: txt = '男'
      break
    case 2: txt = '女'
      break
    default: txt = ''
  }
  return txt
}

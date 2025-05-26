export default{
    directives:{
        scroll:{
            inserted:(el)=>{
                el.focus()
            }
        }
    }
}
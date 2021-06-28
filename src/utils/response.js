import vue from 'vue'
export function messageError(resp){
    vue.$message.error(resp.message)
}
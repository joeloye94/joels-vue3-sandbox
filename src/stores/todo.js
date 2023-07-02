import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const toDoStore = defineStore('todoList', () => {
  const toDoList = ref({
    list:[]
  })
  
  function addItem(item){
    return new Promise((res,rej)=>{
        try{
            if(!item) {
                res({
                    status:0,
                    msg:"Please fill in to do"
                })
                return
            }
            toDoList.value.list.push(item)
            res({
                status:1,
                msg:"Todo added"
            })

        }catch(err){
            rej({
                status:0,
                msg:"Error adding",
                error:err
            })
        }
    
    })
    
  }
  function editItem(item){
    return new Promise((res,rej)=>{
        try{
            // console.log(item)
            if(isNaN(item.index)) {
                res({
                    status:0,
                    msg:"No index defined"
                })
                return
            }
            toDoList.value.list[item.index] = item.value

            res({
                status:1,
                msg:`Todo updated`
            })

        }catch(err){
            rej({
                status:0,
                msg:"Error removing",
                error:err
            })
        }
    
    })
  }
  function removeItem(item){
    return new Promise((res,rej)=>{
        try{
            // console.log(item)
            if(isNaN(item.index)) {
                res({
                    status:0,
                    msg:"No index defined"
                })
                return
            }
            toDoList.value.list.splice(item.index,1)
            res({
                status:1,
                msg:`Todo "${item.val}" removed`
            })

        }catch(err){
            rej({
                status:0,
                msg:"Error removing",
                error:err
            })
        }
    
    })
  }

  return { toDoList, addItem, editItem, removeItem }
})

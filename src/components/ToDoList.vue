
<script setup>

import { ref, toRef, computed, watch, nextTick, onMounted } from "vue";
import ToDoItem from "@/components/ToDoItem.vue"
import {toDoStore} from "@/stores/todo"

const store = toDoStore()
let inputVal = ref("")

// console.log(store.toDoList)

async function appendItem(ev){
    if(!inputVal.value) return

    store.addItem(inputVal.value).then((res)=>{
        if(res.status === 0) {alert(res.msg);return;}
        inputVal.value = ""
    }).catch(err=>{
        alert(err.msg)
    })
    
    await nextTick()
}

function deleteItem(val){
    store.removeItem(val).then((res)=>{
        if(res.status === 0) {alert(res.msg);return;}
    }).catch(err=>{
        // console.log(err)
        alert(err.msg)
    })
}

function editItem(val){
    // console.log(val, toDoArray.value)
    // toDoArray.value.find(val.index)
    store.editItem(val).then((res)=>{
        if(res.status === 0) {alert(res.msg);return;}
    }).catch(err=>{
        // console.log(err)
        alert(err.msg)
    })
}
</script>

    
<template>
    <section>
        <form @submit.prevent="appendItem($event)">
            <input type="text" v-model="inputVal" @input="(event)=>{inputVal = event.target.value}" />
            <button type="submit">Add</button>
        </form>

        <div id="todoContainer">
            <div v-for="(v,k) in store.toDoList.list" :key="k">
                <ToDoItem 
                    :toDoValue="v"
                    :toDoIndex="k"
                    @ToDoItem:Edit="($value)=> editItem($value)"
                    @ToDoItem:Delete="($value)=> deleteItem($value)"
                ></ToDoItem>
            </div>
        </div>
    </section>

</template>
<style scoped>



</style>
    
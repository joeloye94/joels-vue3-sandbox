

<script setup>
import { ref, toRef, computed, watch, nextTick } from "vue";

const props = defineProps({
    toDoValue : String,
    toDoIndex : Number
})
const emit = defineEmits(["ToDoItem:Edit","ToDoItem:Delete"])

const itemVal = ref("")
const isEdit = ref(false)

function editItem(){
    emit("ToDoItem:Edit", {value:itemVal.value,index:props.toDoIndex})
}
function deleteItem(){
    emit("ToDoItem:Delete", {value:props.toDoValue,index:props.toDoIndex})
}
function goEdit(){
    itemVal.value = props.toDoValue
    isEdit.value = true
}
function goBack(){
    itemVal.value = ""
    isEdit.value = false
}
function updateItem(event){
    isEdit.value = false
}
</script>
    
<template>
    <div class="todoBox">
        <div v-if="!isEdit">
            <div>{{toDoValue}}</div>
            <button type="button" @click="goEdit()">Edit</button>
            <button type="button" @click="deleteItem()">Delete</button>
        </div>
        <div v-else>
            <form @submit.prevent="updateItem($event)">
                <input type="text" v-model="itemVal" @input="(event)=>{itemVal = event.target.value}" />
                <button type="reset" @click="goBack()">Back</button>
                <button type="submit" @click="editItem()">Update</button>
            </form>
            
        </div>
    </div>

</template>
<style scoped>

.todoBox{
    border:1px solid black;
    background-color: transparent;
    width:100%;
    /* height:50px; */
    color:black;
    padding:2rem;
    font-size:1.5rem;
}

</style>
    
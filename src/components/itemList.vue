<template>
    <div class="item-list">
        <h2>Item List</h2>
        <ul>
            <li v-for="item in items" :key="item.id">{{ item.name }}</li>
        </ul>
        <button @click="addItem">Add Item</button>
    </div>
</template>
<template>
  <ul class="list-group book-grid">
    <li
      class="list-group-item"
      v-for="(book, index) in books"
      :key="book._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <div class="book-info">
        <img :src="'http://localhost:3000/uploads/' + book.thumbnail" alt="Book Thumbnail" class="book-list-thumbnail" />
        <div class="book-details">
          <span>{{ book.bookTitle }}</span>
          <div class="quantity">
            Số lượng: {{ book.quantity }}
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    }
  }
};
</script>

<style>
.book-list-thumbnail {
  width: 80%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.book-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.2s ease;
}

.book-info:hover {
  transform: translateY(-5px);
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
}

.book-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quantity {
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

.active {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
}

.list-group-item {
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
}

.list-group-item:hover {
  background-color: #f5f5f5;
}

</style>

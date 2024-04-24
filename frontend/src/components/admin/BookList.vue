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
          <span class="badge bg-primary rounded-pill ml-auto">{{ book.quantity }}</span>
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
    },
  }
};
</script>

<style>
.book-list-thumbnail {
  width: 50px;
  height: auto;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.book-info {
  display: flex;
  align-items: center;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.book-details {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
}

.active {
  background-color: #e9ecef;
}

.list-group-item {
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}
</style>
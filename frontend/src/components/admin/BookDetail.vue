<template>
  <div class="book-details-container">

    <div class="book-thumbnail-container">
      <img :src="'http://localhost:3000/uploads/' + book.thumbnail" alt="Book Thumbnail" class="book-thumbnail" />
    </div>

    <div class="book-info-container">
      <div class="p-1">
        <strong>Tên:</strong>
        {{ book.bookTitle }}
      </div>
      <div class="p-1">
        <strong>Giá: </strong>
        {{ book.price }}
      </div>
      <div class="p-1">
        <strong>Số lượng: </strong>
        {{ book.quantity }}
      </div>
      <div class="p-1">
        <strong>Tác giả:</strong>
        {{ book.author }}
      </div>
      <hr>
      <div class="p-1">
        <strong>Tên nhà xuất bản:</strong>
        {{ book.publisherName }}
      </div>
      <div class="p-1">
        <strong>Năm xuất bản:</strong>
        {{ book.publishYear }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>

<style>
.book-details-container {
  display: flex;
  align-items: flex-start;
}

.book-thumbnail-container {
  margin-right: 20px;
}

.book-thumbnail {
  width: 200px;
  margin-bottom: 10px;
}

</style>

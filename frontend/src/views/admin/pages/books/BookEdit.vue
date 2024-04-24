<template>
  <div>
    <AppHeader />
    <div class="container mt-3">
      <div class="add-new">Chỉnh sửa sách</div>
      <div class="form">
        <form @submit.prevent="updateBook()">
          <div class="form-item">
            <label class="label" for="bookTitle">Tên sách</label><br />
            <input
              class="input"
              type="text"
              id="bookTitle"
              v-model="formData.bookTitle"
            />
          </div>

          <div class="form-item">
            <label class="label" for="thumbnail">Ảnh sách</label><br />
            <input
              class="input"
              type="file"
              id="thumbnail"
              accept="image/*"
              @change="handleImageUpload"
            />
          </div>

          <div class="form-item">
            <label class="label" for="price">Đơn giá</label><br />
            <input
              class="input"
              type="number"
              id="price"
              v-model="formData.price"
            />
          </div>

          <div class="form-item">
            <label class="label" for="quantity">Số lượng</label><br />
            <input
              class="input"
              type="number"
              id="quantity"
              v-model="formData.quantity"
            />
          </div>

          <div class="form-item">
            <label class="label" for="author">Tác giả</label><br />
            <input
              class="input"
              type="text"
              id="author"
              v-model="formData.author"
            />
          </div>

          <div class="form-item">
            <label class="label" for="publisherName">Tên nhà xuất bản</label
            ><br />
            <input
              class="input"
              type="text"
              id="publisherName"
              v-model="formData.publisherName"
            />
          </div>

          <div class="form-item">
            <label class="label" for="publishYear">Năm xuất bản</label><br />
            <input
              class="input"
              type="text"
              id="publishYear"
              v-model="formData.publishYear"
            />
          </div>

          <button type="submit" class="btn btn-primary">Cập nhật</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import BookService from "@/services/admin/book.service";
import "vue3-toastify/dist/index.css";

export default {
  components: {
  },
  data() {
    return {
      formData: {
        bookTitle: "",
        thumbnail: null,
        price: 0,
        quantity: 0,
        publishYear: "",
        publisherName: "",
        author: "",
      },
    };
  },
  mounted() {
    this.retrieve(this.$route.params.id);
  },

  methods: {

    handleImageUpload(event) {
      const file = event.target.files[0];
      this.formData.thumbnail = file;
    },

    async retrieve(bookId) {
      try {
        const book = await BookService.get(bookId);
        if (book) {
          this.formData.bookTitle = book.bookTitle;
          this.formData.thumbnail = book.thumbnail;
          this.formData.price = book.price;
          this.formData.quantity = book.quantity;
          this.formData.publishYear = book.publishYear;
          this.formData.publisherName = book.publisherName;
          this.formData.author = book.author;
        } else {
          console.log("Không tìm thấy sách.");
        }
        console.log(book);
      } catch (error) {
        console.log(error);
      }
    },

    async updateBook() {
      try {
        if (
          !this.formData.bookTitle ||
          !this.formData.price ||
          !this.formData.quantity ||
          !this.formData.author ||
          !this.formData.thumbnail
        ) {
          toast.error("Vui lòng nhập đủ thông tin.", {
            autoClose: 1000,
          });
          return;
        }

        const formData = new FormData();
        formData.append("bookTitle", this.formData.bookTitle);
        formData.append("thumbnail", this.formData.thumbnail);
        formData.append("price", this.formData.price);
        formData.append("quantity", this.formData.quantity);
        formData.append("publishYear", this.formData.publishYear);
        formData.append("publisherName", this.formData.publisherName);
        formData.append("author", this.formData.author);
        const response = await BookService.update(
          this.$route.params.id,
          this.formData
        );
        console.log(response);

        toast.success("Cập nhật sách thành công.", {
          autoClose: 500,
        });
        setTimeout(() => {
          this.$router.push({ name: "book" });
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 40%;
  height: auto;
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-new {
  font-size: 30px;
  margin-top: 10px;
}

.form-item {
  text-align: left;
  padding: 10px;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

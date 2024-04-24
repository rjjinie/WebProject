<template>
  <div>
    <ClientAppHeader />

    <div class="container mt-3 mb-3">
      <div class="add-new">Đăng ký</div>
      <div class="form">
        <form @submit.prevent="add" action="">
          <div class="form-item name">
            <label class="label" for="firstName">Tên</label><br />
            <input
              class="input"
              type="text"
              id="firstName"
              v-model="formData.firstName"
            />
          </div>
          <div class="form-item name">
            <label class="label" for="lastName">Họ</label><br />
            <input
              class="input"
              type="text"
              id="lastName"
              v-model="formData.lastName"
            />
          </div>
          <div class="form-item">
            <label class="label" for="birthDate">Ngày sinh</label>
            <input
              class="input"
              type="date"
              id="birthDate"
              v-model="formData.birthDate"
            />
          </div>
          <div class="form-item gender">
            <label class="label">Giới tính</label><br />
            <input 
              type="radio" 
              id="male" 
              value="true" 
              v-model="formData.gender" 
            />
            <label for="male">Nam</label>
            <input 
              type="radio" 
              id="female" 
              value="false" 
              v-model="formData.gender" 
            />
            <label for="female">Nữ</label>
          </div>
          <div class="form-item">
            <label class="label" for="email">Email</label><br />
            <input
              class="input"
              type="email"
              id="email"
              v-model="formData.email"
            />
          </div>
          <div class="form-item">
            <label class="label" for="password">Mật khẩu</label><br />
            <input
              class="input"
              type="password"
              id="password"
              v-model="formData.password"
            />
          </div>
          <div class="form-item">
            <label class="label" for="phone">Số điện thoại</label><br />
            <input
              class="input"
              type="text"
              id="phone"
              v-model="formData.phone"
            />
          </div>

          <button type="submit" class="btn btn-primary">Đăng ký</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import ReaderService from "@/services/client/reader.service";

export default {
  components: {
    ClientAppHeader,
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        email: '',
        password: '',
        phone: ''
      },
    };
  },

  computed: {},

  methods: {
    async add() {
      try {
        if (
          !this.formData.firstName ||
          !this.formData.lastName ||
          !this.formData.birthDate ||
          !this.formData.gender ||
          !this.formData.email ||
          !this.formData.password ||      
          !this.formData.phone
        ) {
          toast.error("Vui lòng nhập đầy đủ thông tin.", {
            autoClose: 1000,
          });
          return;
        }

        const formData = new FormData();
        formData.append("firstName", this.formData.firstName);
        formData.append("lastName", this.formData.lastName);
        formData.append("birthDate", this.formData.birthDate);
        formData.append("gender", this.formData.gender);
        formData.append("email", this.formData.email);
        formData.append("password", this.formData.password);
        formData.append("phone", this.formData.phone);

        const response = await ReaderService.create(this.formData);
        toast.success("Đăng ký thành công.", {
          autoClose: 500,
        });

        setTimeout(() => {
          this.$router.push({ name: "login-client" });
        }, 1000);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Lỗi!";
        toast.error(errorMessage, { autoClose: 1000 });
      }
    },
  },
};
</script>
  
<style scoped>
.container {
  width: 80%;
  width: 500px;
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
  margin-bottom: 20px;
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

.name {
  display: inline-block;
}

.gender label {
  margin: 10px 10px 0 0;
  cursor: pointer;
}

</style>
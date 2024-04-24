<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-brand-container">
      <div class="mr-auto navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'book-client' }" class="nav-link">
            <h6><b>Sách</b></h6>
            <i class="fa-solid fa-book"></i>
          </router-link>
        </li>
      </div>
    </div>
    <div class="login-logout-register-container">
      <div v-if="isLoggedIn">
        <button class="btn btn-danger button-logout" @click="logout">
          Đăng xuất
        </button>
      </div>
      <div v-else>
        <button class="btn btn-primary button-login" @click="login">
          Đăng nhập
        </button>
        <button class="btn btn-danger button-register" @click="register">
          Đăng ký
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Authorization from "@/services/client/authorization.service";
export default {
  data() {
    return {
      isLoggedIn: false, // Ban đầu chưa đăng nhập
    };
  },
  created() {
    this.checkLoggedIn();
  },
  computed: {},
  name: "app-header-admin",
  methods: {
    checkLoggedIn() {
      const token = this.getTokenFromCookie();
      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    getTokenFromCookie() {
      // Phương thức để lấy token từ cookie
      const name = "tokenUser="; // Tên cookie chứa token
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null;
    },
    login() {
      // Đăng nhập
      this.$router.push({ name: "login-client" });
      // this.isLoggedIn = true;
    },
    logout() {
      // Đăng xuất
      if (confirm("Bạn muốn đăng xuất?")) {
        try {
          const respone = Authorization.logOut();
          // this.isLoggedIn = false;
          this.$router.push({ name: "home" });
        } catch (error) {
          console.log(error);
        }
      }  
    },
    register() {
      // Đăng ký
      this.$router.push({ name: "register-client" });
    },
  },
};
</script>

<style scoped>
.navbar-brand-container {
  display: flex;
  align-items: center;
}

.login-logout-register-container {
  margin-left: auto;
  margin-right: 20px;
}

.navbar-brand {
  margin-right: 20px;
  margin-left: 10%;
}

.nav-link {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.fa-book {
  margin-left: 5px;
}

.fa-info-circle {
  color: #ffffff;
  font-size: 1.5rem;
}

.btn-danger {
  margin-left: 15px;
}
</style>

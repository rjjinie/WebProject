<template>
  <div class="home-container">
    <h3 class="home-title">Đăng nhập với tư cách</h3>

    <div class="button-container">
      <button @click="redirectToAdminLogin" class="login-button admin-button">
        <img src="@/assets/admin-icon.png" alt="Admin" class="button-icon">
        Admin
      </button>

      <button @click="redirectToClientLogin" class="login-button client-button">
        <img src="@/assets/client-icon.png" alt="Client" class="button-icon">
        Client
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToAdminLogin() {
      window.location.href = "/admin/auth/login";
    },
    redirectToClientLogin() {
      window.location.href = "/auth/login";
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  max-width: 600px;
  margin: 10% auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

.home-title {
  color: #333;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 2rem;
}

.login-button {
  width: 220px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.login-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
}

.admin-button {
  background-color: #007bff;
  color: #ffffff;
}

.client-button {
  background-color: #28a745;
  color: #ffffff;
}

.button-icon {
  height: 40px;
  margin-right: 15px;
}

.login-button span {
  font-weight: bold;
}

@media (max-width: 768px) {
  .home-container {
    width: 80%;
    padding: 20px;
  }

  .login-button {
    width: 100%;
    margin-bottom: 15px;
  }

  .button-icon {
    height: 35px;
    margin-right: 10px;
  }
}
</style>

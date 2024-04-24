<template>
    <div class="page">
        <p class="centered-text">
            Oops, không thể tìm thấy trang. Trở về
            <router-link to="/admin/books">trang chủ.</router-link>
        </p>
    </div>
</template>

<style>
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.centered-text {
    text-align: center;
}
</style>

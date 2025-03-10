<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(() => {
    const token = route.query.token;
    console.log('token: ', token);
    if (token) {
        localStorage.setItem('accessToken', token);
        console.log('Token lưu thành công:', token);
        router.push('/'); // Chuyển hướng về trang chủ
    } else {
        console.error('Không tìm thấy token trong URL');
        router.push('/'); // Chuyển hướng về trang chủ nếu không có token
    }
});
</script>

<template>
    <div>Đang xử lý đăng nhập...</div>
</template>

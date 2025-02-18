<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <Card class="mx-auto max-w-md md:max-w-lg w-full p-8">
            <CardHeader class="space-y-1">
                <CardTitle class="text-2xl font-bold text-center">Quên mật khẩu</CardTitle>
                <CardDescription>Nhập email của bạn bên dưới để nhận mật khẩu mới </CardDescription>
            </CardHeader>
            <CardContent>
                <form class="space-y-4" @submit.prevent="sendResetLink">
                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
                        <p class="text-sm text-gray-500" style="margin-top: 20px; margin-bottom: 4px">
                            Kiểm tra đường link đã được gửi qua email.
                        </p>
                    </div>
                    <!-- <Button type="submit" class="w-full">Lấy lại mật khẩu</Button> -->
                    <Button type="submit" class="w-full my-16" :disabled="loading">
                        <span v-if="loading">Đang gửi...</span>
                        <span v-else>Lấy lại mật khẩu</span>
                    </Button>
                </form>
                <div class="mt-4 text-center text-sm">
                    Đã nhớ mật khẩu?
                    <router-link to="/login" class="underline">Đăng nhập</router-link>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from '@/utils/axios';
import { useToast } from 'vue-toastification';

const email = ref('');
const loading = ref(false);
const router = useRouter();

const sendResetLink = async () => {
    const toast = useToast();

    if (!email.value.trim()) {
        toast.error('Vui lòng nhập email hợp lệ');
        return;
    }
    loading.value = true;

    try {
        const res = await axios.post(`/user/forgotPassword?email=${encodeURIComponent(email.value)}`);
        if (res.data.success) {
            toast.success('Liên kết đặt lại mật khẩu đã được gửi!');
        } else {
            toast.error('Gửi email thất bại, vui lòng thử lại');
        }
    } catch (error: any) {
        console.error('Error sending reset link:', error.message);
        toast.error('Failed to send reset link');
    } finally {
        loading.value = false;
    }
};
</script>

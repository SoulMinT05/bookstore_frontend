<template>
    <div class="flex items-center justify-center min-h-screen">
        <Card class="mx-auto max-w-md md:max-w-lg p-8">
            <CardHeader class="space-y-1">
                <CardTitle class="text-2xl font-bold text-center">Đặt lại mật khẩu</CardTitle>
                <CardDescription class="text-center">Nhập mật khẩu mới để đặt lại tài khoản của bạn.</CardDescription>
            </CardHeader>
            <CardContent>
                <form class="space-y-4" @submit.prevent="resetPassword">
                    <div class="space-y-2">
                        <Label for="password">Mật khẩu mới</Label>
                        <Input
                            id="password"
                            v-model="password"
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            required
                        />
                    </div>
                    <Button type="submit" class="w-full">Đặt lại mật khẩu</Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const token = ref('');
const password = ref('');

onMounted(() => {
    token.value = route.params.token || '';
    console.log('Token từ URL:', token.value);
});

const resetPassword = async () => {
    const toast = useToast();
    if (!password.value) {
        alert('Vui lòng nhập mật khẩu mới');
        return;
    }

    try {
        const response = await axios.put(`${import.meta.env.VITE_API_FRONTEND}/api/user/resetPassword`, {
            password: password.value,
            token: token.value,
        });

        if (response.data.success) {
            toast.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
            router.push('/login');
        } else {
            toast.error(response.data.message || 'Có lỗi xảy ra. Vui lòng thử lại!');
        }
    } catch (error) {
        console.error('Lỗi đặt lại mật khẩu:', error.response?.data?.message || error.message);
        toast.error('Lỗi đặt lại mật khẩu, vui lòng thử lại sau.');
    }
};
</script>

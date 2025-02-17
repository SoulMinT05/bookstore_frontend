<template>
    <div>
        <Header />
        <div class="flex items-center justify-center min-h-screen w-full">
            <Card class="w-full max-w-md md:max-w-lg mx-auto">
                <CardHeader class="text-center">
                    <CardTitle>Thay đổi mật khẩu</CardTitle>
                    <CardDescription>Cập nhật mật khẩu mới</CardDescription>
                </CardHeader>
                <CardContent class="space-y-8">
                    <form @submit.prevent="changePassword" class="space-y-4">
                        <div class="space-y-2">
                            <Label for="currentPassword"> Mật khẩu hiện tại </Label>
                            <Input
                                v-model="currentPassword"
                                id="currentPassword"
                                placeholder="Mật khẩu hiện tại"
                                required
                            />
                        </div>

                        <div class="space-y-2">
                            <Label for="newPassword"> Mật khẩu mới </Label>
                            <Input v-model="newPassword" id="newPassword" placeholder="Mật khẩu mới" required />
                        </div>

                        <Button type="submit" class="w-full" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Đang xử lý...' : 'Cập nhật' }}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const currentPassword = ref('');
const newPassword = ref('');
const isCurrentPasswordVisible = ref(false);
const isNewPasswordVisible = ref(false);

const togglePasswordVisibility = (type) => {
    if (type === 'current') {
        isCurrentPasswordVisible.value = !isCurrentPasswordVisible.value;
    } else if (type === 'new') {
        isNewPasswordVisible.value = !isNewPasswordVisible.value;
    }
};

const changePassword = async () => {
    const userPassword = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
    };

    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userToken = user.accessToken;
        const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/user/changePassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(userPassword),
        });
        const data = await res.json();
        const toast = useToast();
        if (!data.success) {
            toast.error(data.message);
            return;
        }
        toast.success('Đổi mật khẩu thành công!');
    } catch (error) {
        const toast = useToast();
        toast.error(error.message);
    }
};
</script>

<style scoped>
/* Optional: custom styles */
</style>

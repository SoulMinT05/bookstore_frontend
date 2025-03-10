<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { jwtDecode } from 'jwt-decode';
import axios from '@/utils/axios';

const email = ref('');
const password = ref('');
const router = useRouter();
const toast = useToast();

const callback = async (response) => {
    if (response?.credential) {
        try {
            const decoded = jwtDecode(response.credential);

            const userData = {
                Ho: decoded.family_name,
                Ten: decoded.given_name,
                email: decoded.email,
                avatar: decoded.picture, // Profile picture URL
            };

            const { data } = await axios.post('/auth/google-login', userData);
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data));

                toast.success('Đăng nhập thành công!');
                router.push('/');
            } else {
                toast.error('Xác thực Google thất bại!');
            }
        } catch (error) {
            console.error('Failed to decode JWT:', error);
        }
    }
};

const onSubmit = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        const data = await response.json();
        if (!data.success) {
            toast.error(data.message);
            return;
        }

        toast.success('Đăng nhập thành công!');
        localStorage.setItem('user', JSON.stringify(data)); // Store user info
        router.push('/');
    } catch (error) {
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại!');
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <Card class="w-full max-w-md md:max-w-lg mx-auto">
            <CardHeader class="text-center">
                <CardTitle>Đăng nhập</CardTitle>
                <CardDescription>Đăng nhập bằng email và password</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="onSubmit">
                    <div class="grid gap-6">
                        <div class="grid gap-6">
                            <div class="grid gap-2">
                                <Label for="email">Email</Label>
                                <Input v-model="email" id="email" type="email" required />
                            </div>
                            <div class="grid gap-2">
                                <Label for="password">Password</Label>
                                <Input v-model="password" id="password" type="password" required />
                            </div>
                            <div class="flex justify-between items-center">
                                <label class="flex items-center text-sm text-gray-500 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span class="ml-2">Remember me</span>
                                </label>
                                <router-link to="forgot-password" class="text-sm underline-offset-4 hover:underline"
                                    >Quên mật khẩu?
                                </router-link>
                            </div>
                            <Button type="submit" class="w-full">Đăng nhập</Button>
                        </div>
                        <div
                            class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
                        >
                            <span class="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                        <div class="flex flex-col gap-4">
                            <GoogleLogin :callback="callback" />
                            <Button @click.prevent variant="outline" class="w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 mr-2">
                                    <path
                                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Login with Apple
                            </Button>
                        </div>
                        <p class="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                            Chưa có tài khoản?
                            <router-link
                                to="/register"
                                class="font-medium text-gray-900 hover:underline dark:text-gray-100"
                            >
                                Đăng ký
                            </router-link>
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>

<template>
    <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
                Đăng nhập cho quản lý
            </h1>
            <form class="mt-6 space-y-6" @submit.prevent="onLogin">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-900 dark:text-white"> Email </label>
                    <input
                        v-model="email"
                        type="email"
                        name="email"
                        id="email"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div class="relative">
                    <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        name="password"
                        id="password"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                    <button
                        type="button"
                        @click="showPassword = !showPassword"
                        style="margin-top: 12px"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
                    >
                        <i v-if="showPassword" class="fas fa-eye text-gray-600 dark:text-white"></i>
                        <i v-else class="fas fa-eye-slash text-gray-600 dark:text-white"></i>
                    </button>
                </div>
                <div class="flex justify-between items-center">
                    <label class="flex items-center text-sm text-gray-500 dark:text-gray-300">
                        <input
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span class="ml-2">Remember me</span>
                    </label>
                    <a href="#" class="text-sm text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                </div>
                <button
                    type="submit"
                    class="w-full py-2.5 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    </section>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            email: '',
            password: '',
            showPassword: false, // Flag to toggle password visibility
        };
    },
    methods: {
        async onLogin() {
            const userData = {
                email: this.email,
                password: this.password,
            };
            try {
                const res = await fetch('http://localhost:3001/api/staff/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                const data = await res.json();

                const toast = useToast();
                console.log('dataLogin: ', data);
                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                toast.success('Đăng nhập thành công!');
                localStorage.setItem('staff', JSON.stringify(data)); // Store user info
                this.$router.push('/admin/dashboard');
            } catch (error) {
                console.log('error: ', error);
                toast.error(error.message);
            }
        },
    },
};
</script>

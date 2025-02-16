<template>
    <main class="h-screen w-screen flex items-center justify-center">
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                >
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                        >
                            Đăng ký
                        </h1>
                        <form class="space-y-4 md:space-y-6" @submit.prevent="onRegister">
                            <div class="flex gap-4">
                                <div class="w-1/2">
                                    <label for="Ho" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Họ</label
                                    >
                                    <input
                                        type="text"
                                        v-model="Ho"
                                        id="Ho"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div class="w-1/2">
                                    <label
                                        for="Ten"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Tên</label
                                    >
                                    <input
                                        type="text"
                                        v-model="Ten"
                                        id="Ten"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    v-model="email"
                                    id="email"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div class="relative">
                                <label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >Password</label
                                >
                                <!-- <input
                                    type="text"
                                    v-model="password"
                                    id="password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                /> -->
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
                                    style="margin-top: 18px"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
                                >
                                    <i v-if="showPassword" class="fas fa-eye text-gray-600 dark:text-white"></i>
                                    <i v-else class="fas fa-eye-slash text-gray-600 dark:text-white"></i>
                                </button>
                            </div>
                            <button
                                type="submit"
                                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Create account
                            </button>
                            <p class="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?
                                <router-link
                                    to="/login"
                                    class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Login here
                                </router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            Ho: '',
            Ten: '',
            email: '',
            password: '',
            showPassword: false, // Quản
        };
    },
    methods: {
        async onRegister() {
            const userData = {
                Ho: this.Ho,
                Ten: this.Ten,
                email: this.email,
                password: this.password,
            };

            try {
                const res = await fetch('http://localhost:3001/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const toast = useToast(); // Khởi tạo toast
                const data = await res.json();
                console.log('dataRegister: ', data); // Xử lý dữ liệu trả về

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                toast.success('Đăng ký thành công!. Hãy đăng nhập tài khoản');
                this.$router.push('/login');
            } catch (error) {
                console.error('Error:', error);
                toast.error('Đăng ký thất bại: ' + error.message);
            }
        },
    },
};
</script>

<style scoped>
/* Điều chỉnh kích thước form */
</style>

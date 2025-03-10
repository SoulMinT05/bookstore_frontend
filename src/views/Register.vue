<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

// Schema kiểm tra dữ liệu đầu vào
const registerSchema = yup.object({
    Ho: yup.string().required('Cần nhập họ'),
    Ten: yup.string().required('Cần nhập tên'),
    email: yup.string().email('Invalid email address').required('Cần nhập email'),
    password: yup
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự, trong đó gồm ký tự in hoa, thường và ký tự đặc biệt')
        .required('Cần nhập mật khẩu'),
});

// Khởi tạo form với vee-validate
const { handleSubmit, isSubmitting } = useForm({
    validationSchema: registerSchema,
});

// Lấy giá trị của các input
const Ho = useField('Ho');
const Ten = useField('Ten');
const email = useField('email');
const password = useField('password');

const serverError = ref(null);
const toast = useToast(); // Khởi tạo toast
const router = useRouter();

// Xử lý submit form
const onSubmit = handleSubmit(async (values) => {
    // serverError.value = null;
    const userData = {
        Ho: Ho.value,
        Ten: Ten.value,
        email: email.value,
        password: password.value,
    };
    try {
        const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        console.log('dataRegister: ', data); // Xử lý dữ liệu trả về

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        toast.success('Đăng ký thành công!. Hãy đăng nhập tài khoản');
        router.push('/login');
    } catch (error) {
        toast.error('Đăng kí thất bại. Hãy kiểm tra lại!');
        console.log('errorRegister: ', error);
        // serverError.value = 'An error occurred during registration. Please try again.';
    }
});
</script>

<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <Card class="w-full max-w-md md:max-w-lg mx-auto">
            <CardHeader class="text-center">
                <CardTitle>Đăng ký</CardTitle>
                <CardDescription>Đăng ký tạo tài khoản</CardDescription>
            </CardHeader>
            <CardContent class="space-y-8">
                <form @submit.prevent="onSubmit" class="space-y-4">
                    <div class="space-y-2">
                        <Label for="Ho">Họ</Label>
                        <Input id="Ho" type="text" v-model="Ho.value" />
                        <p v-if="Ho.errorMessage" class="text-red-500 text-sm mt-1">{{ Ho.errorMessage }}</p>
                    </div>
                    <div class="space-y-2">
                        <Label for="Ten">Tên</Label>
                        <Input id="Ten" type="text" v-model="Ten.value" />
                        <p v-if="Ten.errorMessage" class="text-red-500 text-sm mt-1">{{ Ten.errorMessage }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" v-model="email.value" />
                        <p v-if="email.errorMessage" class="text-red-500 text-sm mt-1">{{ email.errorMessage }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password">Mật khẩu</Label>
                        <Input id="password" type="password" v-model="password.value" />
                        <p v-if="password.errorMessage" class="text-red-500 text-sm mt-1">
                            {{ password.errorMessage }}
                        </p>
                    </div>

                    <p v-if="serverError" class="text-red-500 text-sm">{{ serverError }}</p>

                    <Button type="submit" class="w-full" :disabled="isSubmitting">
                        {{ isSubmitting ? 'Đang xử lý...' : 'Đăng ký' }}
                    </Button>
                    <p class="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                        Đã có tài khoản?
                        <router-link to="/login" class="font-medium text-gray-900 hover:underline dark:text-gray-100">
                            Đăng nhập
                        </router-link>
                    </p>
                </form>
            </CardContent>
        </Card>
    </div>
</template>

<template>
    <div>
        <Header />
        <div class="flex items-center justify-center min-h-screen w-full mt-16">
            <Card class="w-full max-w-md md:max-w-lg mx-auto">
                <CardHeader class="text-center">
                    <CardTitle>Thông tin người dùng</CardTitle>
                    <CardDescription>Cập nhật thông tin tài khoản</CardDescription>
                </CardHeader>
                <CardContent class="space-y-8">
                    <form @submit.prevent="onSubmit" class="space-y-4">
                        <!-- Họ -->
                        <div class="space-y-2">
                            <Label for="Ho">Họ</Label>
                            <Input id="Ho" type="text" placeholder="Nguyễn" v-model="userToEdit.Ho" />
                            <!-- <p v-if="Ho.errorMessage" class="text-red-500 text-sm mt-1">{{ Ho.errorMessage }}</p> -->
                        </div>

                        <!-- Tên -->
                        <div class="space-y-2">
                            <Label for="Ten">Tên</Label>
                            <Input id="Ten" type="text" placeholder="Văn Thy" v-model="userToEdit.Ten" />
                            <!-- <p v-if="Ten.errorMessage" class="text-red-500 text-sm mt-1">{{ Ten.errorMessage }}</p> -->
                        </div>

                        <!-- Email -->
                        <div class="space-y-2">
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@gmail.com"
                                v-model="userToEdit.email"
                                disabled
                            />
                        </div>

                        <!-- Ngày Sinh -->
                        <div class="space-y-2">
                            <Label for="NgaySinh">Ngày sinh</Label>
                            <Popover v-model:open="isPopoverOpen">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" class="w-full justify-start text-left font-normal">
                                        {{ formatDate(userToEdit.NgaySinh) }}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-2">
                                    <Calendar v-model="userToEdit.NgaySinh" placeholder="Chọn ngày sinh" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <!-- Địa chỉ -->
                        <div class="space-y-2">
                            <Label for="DiaChi">Địa chỉ</Label>
                            <Input id="DiaChi" type="text" placeholder="Địa chỉ" v-model="userToEdit.DiaChi" />
                        </div>

                        <!-- Số điện thoại -->
                        <div class="space-y-2">
                            <Label for="DienThoai">Số điện thoại</Label>
                            <Input
                                id="DienThoai"
                                type="text"
                                placeholder="Số điện thoại"
                                v-model="userToEdit.DienThoai"
                            />
                        </div>

                        <!-- Giới tính -->
                        <div class="space-y-2">
                            <Label for="Phai">Giới tính</Label>
                            <Select v-model="userToEdit.Phai" id="Phai" class="w-full" placement="bottom">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                                <SelectContent class="w-full">
                                    <SelectItem value="male">Nam</SelectItem>
                                    <SelectItem value="female">Nữ</SelectItem>
                                    <SelectItem value="other">Khác</SelectItem>
                                </SelectContent>
                            </Select>
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
import { ref, reactive } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'; // Import Popover
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from 'vue-toastification';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const isPopoverOpen = ref(false);

// Validation schema for updating user data
const updateSchema = yup.object({
    Ho: yup.string().required('Cần nhập họ'),
    Ten: yup.string().required('Cần nhập tên'),
    email: yup.string().email('Địa chỉ email không hợp lệ').required('Cần nhập email'),
    // NgaySinh: yup.date().required('Cần nhập ngày sinh'),
    DiaChi: yup.string().required('Cần nhập địa chỉ'),
    DienThoai: yup
        .string()
        .matches(/^\d{10}$/, 'Số điện thoại không hợp lệ')
        .required('Cần nhập số điện thoại'),
});

// Initialize form with vee-validate
const { handleSubmit, isSubmitting } = useForm({
    validationSchema: updateSchema,
});

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);

    // Đảm bảo ngày và tháng có 2 chữ số nếu cần
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, cần +1
    const day = d.getDate().toString().padStart(2, '0');

    // Trả về định dạng yyyy/mm/dd
    return `${year}-${month}-${day}`;
};

// Fetch user data to edit
const userToEdit = reactive({
    Ho: '',
    Ten: '',
    email: '',
    // NgaySinh: '',
    DiaChi: '',
    DienThoai: '',
    Phai: '',
});

const toast = useToast();

const fetchUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userData) {
        Object.assign(userToEdit, user.userData); // ✅ Gán giá trị vào `reactive()`
    }
};

fetchUser();

// Handle form submission
const onSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userToken = user?.accessToken;
    if (!userToken) {
        toast.error('Token không hợp lệ');
        return;
    }

    try {
        const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/user/updateInfoFromUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(userToEdit),
        });

        const data = await res.json();

        if (!data.success) {
            toast.error(data.message);
            return;
        }

        const updatedUser = {
            ...user,
            userData: { ...user.userData, ...userToEdit },
        };

        console.log('updatedUser: ', updatedUser);

        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Cập nhật thông tin thành công!');
    } catch (error) {
        console.error('error: ', error);
        toast.error('Cập nhật thất bại. Hãy kiểm tra lại!');
    }
};

fetchUser();
</script>

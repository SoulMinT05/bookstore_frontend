<template>
    <div>
        <!-- Header -->
        <Header />

        <!-- Main -->

        <main class="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] mt-20">
            <div>
                <!-- <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1> -->
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink as-child>
                                <RouterLink class="text-xl" to="/">Trang chủ</RouterLink>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator> / </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage class="text-xl">Giỏ hàng</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">Hình ảnh</th>
                                <th scope="col" class="px-6 py-3">Tên</th>
                                <th scope="col" class="px-6 py-3">Số lượng</th>
                                <th scope="col" class="px-6 py-3">Giá</th>
                                <th scope="col" class="px-6 py-3">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in carts"
                                :key="item.product._id"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td class="p-4">
                                    <img
                                        :src="item.product.images[0]"
                                        class="w-16 md:w-32 max-w-full max-h-full"
                                        :alt="item.product.name"
                                    />
                                </td>
                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {{ item.product.name }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <button
                                            class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            type="button"
                                            @click="decreaseQuantityCart(item.product._id)"
                                        >
                                            <span class="sr-only">Decrease quantity</span>
                                            <svg
                                                class="w-3 h-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 2"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M1 1h16"
                                                />
                                            </svg>
                                        </button>
                                        <div>
                                            <input
                                                type="number"
                                                :value="item.quantityCart"
                                                id="first_product"
                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                                readonly
                                            />
                                        </div>
                                        <button
                                            class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            type="button"
                                            @click="increaseQuantityCart(item.product._id)"
                                        >
                                            <span class="sr-only">Increase quantity</span>
                                            <svg
                                                class="w-3 h-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M9 1v16M1 9h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {{ formatCurrency(item.product.price) }}
                                </td>
                                <td class="px-6 py-4" @click="removeProductCart(item.product._id)">
                                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >Xoá</a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Đơn mượn</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span>Tổng số lượng</span>
                            <span>28</span>
                        </div>

                        <Separator />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin người mượn</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="firstName">Họ</Label>
                                <Input id="firstName" placeholder="Lý" />
                            </div>
                            <div class="space-y-2">
                                <Label for="lastName">Tên</Label>
                                <Input id="lastName" placeholder="Lệ Hoa" />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <Label for="email">Email</Label>
                            <Input id="email" type="email" placeholder="lehoa@example.com" />
                        </div>
                        <div class="space-y-2">
                            <Label for="address">Địa chỉ</Label>
                            <Textarea id="address" placeholder="123 Hai Bà Trưng, TP HCM" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button class="w-full">Mượn sách</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>

        <!-- Footer -->
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/utils/axios';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
function formatCurrency(value: number | null | undefined): string {
    if (value == null || isNaN(value)) return '0 ₫'; // Xử lý trường hợp giá trị không hợp lệ
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0, // Không hiển thị phần thập phân
    }).format(value);
}

const carts = ref([]);
const getCart = async () => {
    try {
        const res = await axios.get('/user/getCart');
        console.log('res.data.user: ', res.data.user);
        carts.value = res.data.user.cart;
        console.log('carts.value11: ', carts.value);
    } catch (error) {
        console.error('Error fetching get cart: ', error.message);
    }
};
const increaseQuantityCart = async (productId) => {
    try {
        const res = await axios.post('/user/addToCart', {
            productId,
        });
        console.log('res.dataIncrease: ', res.data);
        toast.success('Thêm vào giỏ hàng thành công');
        getCart();
    } catch (error) {
        console.error('Error fetching add to cart: ', error.message);
        toast.success('Thêm vào giỏ hàng thất bại');
    }
};
const decreaseQuantityCart = async (productId) => {
    try {
        const res = await axios.post('/user/decreaseProductCart', { productId });
        console.log('res.dataDecrease: ', res.data);

        toast.success('Giảm số lượng thành công');
        getCart();
    } catch (error) {
        console.error('Error fetching decrease from cart: ', error.message);
        toast.error('Giảm số lượng thất bại');
    }
};
const removeProductCart = async (productId) => {
    try {
        const res = await axios.post('/user/removeProductCart', { productId });
        console.log('res.dataRemove: ', res.data);

        toast.success('Xoá sản phẩm thành công');
        getCart();
    } catch (error) {
        console.error('Error fetching remove from cart: ', error.message);
        toast.error('Xoá sản phẩm thất bại');
    }
};
onMounted(() => {
    getCart();
});
</script>

<style scoped>
/* Custom styles */
</style>

<template>
    <div>
        <!-- Header -->
        <Header />

        <!-- Main -->

        <Breadcrumb class="mt-20" :style="{ marginLeft: '130px' }">
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
        <main class="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
            <div>
                <!-- <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1> -->
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    <!-- <Checkbox /> -->
                                    <!-- <Checkbox v-model="selectAll" @change="toggleSelectAll" /> -->
                                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                                </th>
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
                                <td class="px-6 py-4">
                                    <!-- <Checkbox v-model="item.selected" @change="updateSelectAll" /> -->
                                    <!-- <input type="checkbox"
                                        :value="item.product._id"
                                     v-model="item.selected"
                                      @change="updateSelectAll" /> -->
                                    <input
                                        type="checkbox"
                                        :value="item.product._id"
                                        v-model="selectedProductIds"
                                        @change="updateSelectAll"
                                    />
                                </td>

                                <td class="p-4">
                                    <img
                                        :src="item.product.HinhAnhSach[0]"
                                        class="w-16 md:w-32 max-w-full max-h-full"
                                        :alt="item.product.TenSach"
                                    />
                                </td>
                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {{ item.product.TenSach }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <NumberField
                                            id="quantityCart"
                                            :default-value="item.quantityCart"
                                            :min="0"
                                            class="w-28"
                                            @change="handleQuantityChange(item.product._id, $event)"
                                        >
                                            <NumberFieldContent>
                                                <NumberFieldDecrement
                                                    class="mx-2"
                                                    @click="decreaseQuantityCart(item.product._id)"
                                                />
                                                <NumberFieldInput readonly />
                                                <NumberFieldIncrement @click="increaseQuantityCart(item.product._id)" />
                                            </NumberFieldContent>
                                        </NumberField>
                                    </div>
                                </td>
                                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {{ formatCurrency(item.product.DonGia) }}
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
                        <CardTitle>Thông tin người mượn</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="Ho">Họ</Label>
                                <Input v-model="currentUser.Ho" id="Ho" placeholder="Lý" />
                            </div>
                            <div class="space-y-2">
                                <Label for="Ten">Tên</Label>
                                <Input v-model="currentUser.Ten" id="Ten" placeholder="Lệ Hoa" />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <Label for="email">Email</Label>
                            <Input
                                v-model="currentUser.email"
                                id="email"
                                type="email"
                                placeholder="lehoa@example.com"
                            />
                        </div>
                        <div class="space-y-2">
                            <Label for="DiaChi">Địa chỉ</Label>
                            <Textarea v-model="currentUser.DiaChi" id="DiaChi" placeholder="123 Hai Bà Trưng, TP HCM" />
                        </div>
                        <div class="flex items-center space-x-2 mt-4">
                            <Popover v-model:open="isPopoverOpen">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" class="w-full justify-start text-left font-normal">
                                        <!-- {{ startDate ? formatDate(startDate) : 'Chọn ngày bắt đầu' }} -->
                                        {{ formatDate(startDate || new Date()) }}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-full p-2">
                                    <Calendar v-model="startDate" placeholder="Chọn ngày bắt đầu" />
                                </PopoverContent>
                            </Popover>

                            <!-- <Button @click="selectDate">Thống kê</Button> -->
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button @click="borrowBooks" class="w-full">Mượn sách</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/utils/axios';
// import axiosUser from '@/utils/axiosUser';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'; // Import Popover
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from '@/components/ui/number-field';
import { Calendar } from '@/components/ui/calendar'; // Import Calendar từ ShadCN
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

function formatCurrency(value: number | null | undefined): string {
    if (value == null || isNaN(value)) return '0 ₫'; // Xử lý trường hợp giá trị không hợp lệ
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0, // Không hiển thị phần thập phân
    }).format(value);
}

const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    const d = new Date(date);

    // Đảm bảo ngày và tháng có 2 chữ số nếu cần
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, cần +1
    const day = d.getDate().toString().padStart(2, '0');

    // Trả về định dạng yyyy/mm/dd
    return `${year}-${month}-${day}`;
};

const selectAll = ref(false);
const currentUser = ref({});
const carts = ref([]);
const startDate = ref(null);
const isPopoverOpen = ref(false);
const selectedProductIds = ref([]);

const toggleSelectAll = () => {
    console.log('selectAll: ', selectAll.value);
    if (selectAll.value) {
        selectedProductIds.value = carts.value.map((item) => item.product._id);
    } else {
        selectedProductIds.value = [];
    }
    console.log(' selectedProductIds.value: ', selectedProductIds.value);
};

const updateSelectAll = () => {
    selectAll.value = carts.value.every((item) => selectedProductIds.value.includes(item.product._id));
};

watch(
    carts,
    (newCarts) => {
        selectAll.value = newCarts.every((item) => item.selected);
    },
    { deep: true },
);

const borrowBooks = async () => {
    // Kiểm tra nếu không có sản phẩm nào được chọn
    if (selectedProductIds._rawValue.length === 0) {
        toast.error('Cần phải chọn sản phẩm');
        return;
    }

    // Kiểm tra nếu thông tin cá nhân chưa đầy đủ
    const { Ho, Ten, email, DiaChi } = currentUser.value;
    if (!Ho || !Ten || !email || !DiaChi) {
        toast.error('Cần nhập đầy đủ thông tin cá nhân trước khi mượn sách');
        return;
    }

    // Xử lý ngày bắt đầu
    let formattedStartDate = startDate.value ? formatDate(startDate.value) : formatDate(new Date());

    // Chuẩn bị dữ liệu gửi tới backend
    const orderData = {
        startDate: formattedStartDate,
        orderedProductIds: selectedProductIds._rawValue,
    };

    console.log('orderData: ', orderData);

    try {
        // Gửi yêu cầu POST đến backend
        const res = await axios.post('/order/createOrder', orderData);
        console.log('res.data: ', res.data);

        // Hiển thị thông báo thành công
        toast.success('Mượn sách thành công');
        router.push('orderSuccess');
    } catch (error) {
        // Xử lý lỗi từ server
        console.error('Error fetching borrow books: ', error.message);
        toast.error('Mượn sách thất bại. Vui lòng thử lại sau.');
    }
};
const getCart = async () => {
    try {
        const res = await axios.get('/user/getCart');
        currentUser.value = res.data.user;
        console.log('currentUser.value: ', currentUser.value);
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
        toast.success('Tăng số lượng thành công');
        getCart();
    } catch (error) {
        console.error('Error fetching add to cart: ', error.message);
        toast.error('Tăng số lượng thất bại');
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

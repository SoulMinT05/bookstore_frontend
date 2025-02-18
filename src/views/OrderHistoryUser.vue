<template>
    <div>
        <Header />
        <div class="container mx-auto p-4">
            <Breadcrumb class="mt-20" :style="{ marginLeft: '22px' }">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink as-child>
                            <RouterLink class="text-xl" to="/">Trang chủ</RouterLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator> / </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage class="text-xl">Lịch sử đơn hàng</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div class="w-full px-4 py-6 space-y-6 mt-4">
                <!-- <h1 class="text-2xl font-bold">Lịch sử đơn mượn</h1> -->
                <ul class="space-y-4">
                    <li v-for="order in orders" :key="order._id">
                        <Card>
                            <CardHeader>
                                <div class="flex items-center justify-between">
                                    <CardTitle>Mã đơn </CardTitle>
                                    <Badge>{{ order._id }}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div class="flex items-center justify-between">
                                    <span class="font-medium">Ngày bắt đầu mượn </span>
                                    <span>{{ formatDate(order.NgayMuon) }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="font-medium">Ngày hết hạn mượn </span>
                                    <span>{{ formatDate(order.NgayTra) }}</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <span class="font-medium">Tổng số lượng </span>
                                    <span>{{ order.SoQuyen }}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="font-medium">Tình trạng </span>
                                    <Badge :class="getStatusClass(order.TinhTrang)">{{
                                        getStatusText(order.TinhTrang)
                                    }}</Badge>
                                    <!-- <Badge disabled :class="statusClass">{{ statusText }}</Badge> -->
                                </div>
                            </CardContent>
                            <CardFooter>
                                <router-link :to="`/orderDetails/${order._id}`" class="text-blue-500 hover:underline">
                                    Xem chi tiết
                                </router-link>
                            </CardFooter>
                        </Card>
                    </li>
                </ul>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/utils/axios';
import { ref, onMounted, computed } from 'vue';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
    _id: string;
    NgayMuon: string;
    NgayTra: string;
    SoQuyen: number;
    TinhTrang: string;
}

const orders = ref<Order[]>([]);

const getStatusClass = (TinhTrang: string): string => {
    switch (TinhTrang.toLowerCase()) {
        case 'pending':
            return 'bg-blue-100 text-blue-600 hover:bg-blue-100';
        case 'accepted':
            return 'bg-green-100 text-green-600 hover:bg-green-100';
        case 'rejected':
            return 'bg-red-100 text-red-600 hover:bg-red-100';
        case 'cancel':
            return 'bg-gray-100 text-gray-600 hover:bg-gray-100';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

const getStatusText = (TinhTrang: string): string => {
    switch (TinhTrang.toLowerCase()) {
        case 'pending':
            return 'Đang xử lý';
        case 'accepted':
            return 'Đã chấp nhận';
        case 'rejected':
            return 'Đã từ chối';
        case 'cancel':
            return 'Đã hủy';
        default:
            return 'Không xác định';
    }
};
const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    const d = new Date(date);

    // Đảm bảo ngày và tháng có 2 chữ số nếu cần
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, cần +1
    const day = d.getDate().toString().padStart(2, '0');

    // Trả về định dạng yyyy/mm/dd
    return `${day}/${month}/${year}`;
};

const getListOrder = async () => {
    try {
        const res = await axios.get('/order/getUserOrderFromUser');

        console.log('res.data: ', res.data);
        orders.value = res.data.order;
        console.log('orders.value: ', orders.value);
    } catch (error: any) {
        console.error('Error fetching get cart: ', error.message);
    }
};
onMounted(() => {
    getListOrder();
});
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Check class="w-16 h-16 text-green-500" />
        <h1 class="mt-4 text-2xl font-semibold text-center">Cám ơn vì đã mượn sách</h1>
        <p class="mt-2 text-center text-gray-500">Đơn của bạn đã đặt thành công và đang chờ xác nhận</p>
        <Card class="mt-8 w-full max-w-md">
            <CardHeader>
                <CardTitle>Đơn mượn</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="flex justify-between items-center">
                    <span class="font-medium">STT đơn</span>
                    <span>{{ lastOrder._id }}</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-medium">Ngày mượn</span>
                    <span>{{ formatDate(lastOrder.startDate) }}</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-medium">Ngày hết hạn</span>
                    <span>{{ formatDate(lastOrder.endDate) }}</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-medium">Số lượng</span>
                    <span>{{ lastOrder.quantity }}</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-medium">Trạng thái</span>
                    <Badge disabled :class="statusClass">{{ lastOrder.status }}</Badge>
                </div>
            </CardContent>
        </Card>
        <div class="mt-8 space-x-4">
            <Button asChild>
                <router-link :to="`/orderDetails/${lastOrder._id}`">Xem chi tiết đơn</router-link>
            </Button>
            <Button asChild variant="outline">
                <router-link to="/">Tiếp tục mượn sách</router-link>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from '@/utils/axios';
import { Separator } from '@/components/ui/separator';
import { onMounted, ref, watch, computed } from 'vue';

const orders = ref([]);
const lastOrder = ref({});

const statusClass = computed(() => {
    const status = lastOrder.value.status;
    if (status === 'pending') return 'bg-blue-500 hover:bg-blue-500'; // Màu xanh dương, không thay đổi khi hover
    if (status === 'accepted') return 'bg-green-500 hover:bg-green-500'; // Màu xanh lá, không thay đổi khi hover
    if (status === 'rejected') return 'bg-red-500 hover:bg-red-500'; // Màu đỏ, không thay đổi khi hover
    return 'bg-gray-500 hover:bg-gray-500'; // Màu mặc định, không thay đổi khi hover
});
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
const getInfoUser = async () => {
    try {
        const res = await axios.get('/order/getUserOrderFromUser');

        console.log('res.data: ', res.data);
        orders.value = res.data.order;
        console.log(' orders.value: ', orders.value);
        if (orders.value) {
            lastOrder.value = orders.value[orders.value.length - 1]; // Lấy phần tử cuối cùng
            console.log('Last order.value: ', lastOrder.value);
        }
        // console.log('currentUser.value: ', currentUser.value);
        // console.log('carts.value11: ', carts.value);
    } catch (error) {
        console.error('Error fetching get cart: ', error.message);
    }
};
onMounted(() => {
    getInfoUser();
});
</script>

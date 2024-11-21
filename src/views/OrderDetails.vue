<template>
    <div class="mt-20">
        <Header />
        <Breadcrumb class="mt-20" :style="{ marginLeft: '22px' }">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink as-child>
                        <RouterLink class="text-xl" to="/">Trang chủ</RouterLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink as-child>
                        <RouterLink class="text-xl" to="/orderHistoryUser">Lịch sử đơn hàng</RouterLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage class="text-xl">Chi tiết đơn mượn</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div class="w-full px-4 py-6 space-y-6 mt-8" id="order-pdf">
            <Card v-if="orderDetails">
                <CardHeader>
                    <CardTitle>Mã đơn {{ orderDetails._id }}</CardTitle>
                </CardHeader>
            </Card>
            <Card v-if="orderDetails">
                <CardHeader>
                    <CardTitle>Thông tin người mượn</CardTitle>
                </CardHeader>
                <CardContent class="space-y-2">
                    <div class="grid gap-2 md:grid-cols-2">
                        <div class="grid gap-1">
                            <div>
                                Họ và tên:
                                {{ orderDetails?.MaDocGia?.Ho + ' ' + orderDetails?.MaDocGia?.Ten }}
                            </div>
                        </div>
                        <div class="grid gap-1" v-if="orderDetails?.NgayMuon">
                            <div>Ngày bắt đầu mượn: {{ formatDate(orderDetails?.NgayMuon) }}</div>
                        </div>
                    </div>
                    <div class="grid gap-2 md:grid-cols-2">
                        <div class="grid gap-1">
                            <div v-if="orderDetails?.MaDocGia?.email">Email: {{ orderDetails?.MaDocGia?.email }}</div>
                            <div v-if="orderDetails?.MaDocGia?.DiaChi">
                                Địa chỉ: {{ orderDetails?.MaDocGia?.DiaChi }}
                            </div>
                        </div>
                        <div class="grid gap-1" v-if="orderDetails?.NgayTra">
                            <div>Ngày hết hạn mượn: {{ formatDate(orderDetails?.NgayTra) }}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div class="border-t border-gray-200 dark:border-gray-800" />
            <Card class="mt-4">
                <CardHeader>
                    <CardTitle>Thông tin sách mượn</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-40">Hình ảnh</TableHead>
                                <TableHead class="max-w-[150px]">Tên</TableHead>
                                <TableHead>Số lượng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="(product, index) in orderDetails?.MaSach" :key="index">
                                <TableCell>
                                    <img
                                        class="w-20 h-20 object-cover rounded"
                                        :src="product?.product?.HinhAnhSach[0]"
                                        alt="Product Image"
                                        crossOrigin="anonymous"
                                    />
                                </TableCell>
                                <TableCell class="font-medium">{{ product?.product?.TenSach }}</TableCell>
                                <TableCell class="font-medium">{{ product?.count }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card class="mt-4" v-if="orderDetails">
                <CardHeader>
                    <CardTitle>Tóm tắt</CardTitle>
                </CardHeader>
                <CardContent class="grid gap-4">
                    <div class="flex items-center">
                        <div>Tổng số lượng</div>
                        <div class="ml-auto">{{ orderDetails?.SoQuyen }}</div>
                    </div>
                    <div class="flex items-center">
                        <div>Trạng thái</div>
                        <div class="ml-auto">
                            <Badge
                                v-if="orderDetails?.TinhTrang"
                                :class="`transition-none ${getStatusClass(orderDetails?.TinhTrang)}`"
                                >{{ orderDetails?.TinhTrang }}</Badge
                            >
                        </div>
                    </div>
                    <Separator />
                </CardContent>
                <!-- <CardFooter class="flex items-center gap-2">
                    <Button size="sm" @click="exportToPDF">In PDF</Button>
                    <Button variant="outline" size="sm">Huỷ đơn</Button>
                </CardFooter> -->
            </Card>
        </div>
        <CardFooter class="flex items-center gap-2">
            <Button size="sm" @click="exportToPDF">In PDF</Button>
            <Button variant="destructive" @click="cancelOrder" size="sm">Huỷ đơn</Button>
        </CardFooter>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/utils/axios';
import jsPDF from 'jspdf';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

import html2pdf from 'html2pdf.js';

// Lấy route để truy cập tham số URL
const route = useRoute();
const orderDetails = ref({});
const toast = useToast();

// Lấy id từ URL params
const id = route.params.id;
console.log('id: ', id);

const cancelOrder = async () => {
    if (!window.confirm('Bạn chắc chắn huỷ đơn này không?')) return;
    try {
        const res = await axios.put(`/order/cancelOrderFromUser/${id}`);
        console.log('res.data: ', res.data);
        orderDetails.value = res.data.updatedOrder;
        console.log('orderDetails.valueCancel : ', orderDetails.value);
        toast.success('Huỷ đơn thành công');
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const exportToPDF = () => {
    const element = document.getElementById('order-pdf'); // Lấy nội dung cần xuất PDF
    if (!element) return;

    setTimeout(() => {
        const options = {
            margin: 1,
            filename: 'order-details.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf().set(options).from(element).save();
    }, 1000);
};

const getStatusClass = (TinhTrang: string): string => {
    switch (TinhTrang.toLowerCase()) {
        case 'pending':
            return 'bg-blue-100 text-blue-600 hover:bg-blue-100';
        case 'accepted':
            return 'bg-green-100 text-green-600 hover:bg-green-100';
        case 'rejected':
            return 'bg-red-100 text-red-600 hover:bg-red-100';
        case 'cancel':
            return 'bg-black-100 text-black-600 hover:bg-black-100';
        default:
            return 'bg-gray-100 text-gray-600';
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

const fetchOrderDetails = async () => {
    try {
        const res = await axios.get(`/order/${id}`);

        orderDetails.value = res.data.orders;
        console.log('orderDetails.value : ', orderDetails.value);
        // bookDetails.value = res.data.product;
        // console.log('bookDetails.value: ', bookDetails.value);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
onMounted(() => {
    fetchOrderDetails();
});
console.log('id from URL:', id); // Log id ra console
</script>

<style scoped>
.transition-none {
    transition: none !important;
}
</style>

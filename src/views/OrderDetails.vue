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
                    <BreadcrumbPage class="text-xl">Chi tiết đơn mượn</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div class="w-full px-4 py-6 space-y-6 mt-8">
            <Card v-if="orderDetails">
                <CardHeader>
                    <CardTitle>Mã đơn {{ orderDetails._id }}</CardTitle>
                </CardHeader>
            </Card>
            <Card v-if="orderDetails">
                <!-- <CardHeader>Mã đơn {{ orderDetails._id }}</CardHeader> -->
                <CardHeader>
                    <CardTitle>Thông tin người mượn</CardTitle>
                </CardHeader>
                <CardContent class="space-y-2">
                    <div class="grid gap-2 md:grid-cols-2">
                        <div class="grid gap-1">
                            <div>
                                Họ và tên:
                                {{ orderDetails?.orderBy?.firstName + ' ' + orderDetails?.orderBy?.lastName }}
                            </div>
                        </div>
                        <div class="grid gap-1" v-if="orderDetails?.startDate">
                            <div>Ngày bắt đầu mượn: {{ formatDate(orderDetails?.startDate) }}</div>
                        </div>
                    </div>
                    <div class="grid gap-2 md:grid-cols-2">
                        <div class="grid gap-1">
                            <div v-if="orderDetails?.orderBy?.email">Email: {{ orderDetails?.orderBy?.email }}</div>
                            <div v-if="orderDetails?.orderBy?.address">
                                Địa chỉ: {{ orderDetails?.orderBy?.address }}
                            </div>
                        </div>
                        <div class="grid gap-1" v-if="orderDetails?.endDate">
                            <div>Ngày hết hạn mượn: {{ formatDate(orderDetails?.endDate) }}</div>
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
                            <TableRow v-for="(product, index) in orderDetails?.products" :key="index">
                                <TableCell>
                                    <img
                                        class="w-20 h-20 object-cover rounded"
                                        :src="product?.product?.images[0]"
                                        alt="Product Image"
                                    />
                                </TableCell>
                                <TableCell class="font-medium">{{ product?.product?.name }}</TableCell>
                                <TableCell class="font-medium">{{ product?.count }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card class="mt-4" v-if="orderDetails">
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent class="grid gap-4">
                    <div class="flex items-center">
                        <div>Tổng số lượng</div>
                        <div class="ml-auto">{{ orderDetails?.quantity }}</div>
                    </div>
                    <div class="flex items-center">
                        <div>Trạng thái</div>
                        <div class="ml-auto">
                            <Badge v-if="orderDetails?.status" :class="getStatusClass(orderDetails?.status)">{{
                                orderDetails?.status
                            }}</Badge>
                        </div>
                    </div>
                    <Separator />
                </CardContent>
                <CardFooter class="flex items-center gap-2">
                    <Button size="sm">In PDF</Button>
                    <Button variant="outline" size="sm">Huỷ đơn</Button>
                </CardFooter>
            </Card>
        </div>
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

// Lấy route để truy cập tham số URL
const route = useRoute();
const orderDetails = ref({});

// Lấy id từ URL params
const id = route.params.id;
console.log('id: ', id);

const generatePDF = () => {
    if (!orderDetails.value) return;

    const doc = new jsPDF();

    doc.setFont('helvetica', 'normal');
    doc.text(20, 20, `Mã đơn: ${orderDetails.value._id}`);
    doc.text(20, 30, `Thông tin người mượn:`);
    doc.text(20, 40, `Họ và tên: ${orderDetails.value?.orderBy?.firstName} ${orderDetails.value?.orderBy?.lastName}`);
    doc.text(20, 50, `Email: ${orderDetails.value?.orderBy?.email || 'Không có'}`);
    doc.text(20, 60, `Địa chỉ: ${orderDetails.value?.orderBy?.address || 'Không có'}`);
    doc.text(20, 70, `Ngày bắt đầu mượn: ${formatDate(orderDetails.value?.startDate)}`);
    doc.text(20, 80, `Ngày hết hạn mượn: ${formatDate(orderDetails.value?.endDate)}`);

    let yOffset = 90;
    doc.text(20, yOffset, `Thông tin sách mượn:`);
    yOffset += 10;

    orderDetails.value?.products.forEach((product, index) => {
        doc.text(20, yOffset, `Sách: ${product?.product?.name}, Số lượng: ${product?.count}`);
        yOffset += 10;
    });

    doc.text(20, yOffset, `Trạng thái: ${orderDetails.value?.status}`);
    yOffset += 10;

    doc.text(20, yOffset, `Tổng số lượng: ${orderDetails.value?.quantity}`);

    doc.save('order-details.pdf');
};

const getStatusClass = (status: string): string => {
    switch (status.toLowerCase()) {
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

<style scoped></style>

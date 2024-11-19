<template>
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <div className="flex items-center">
                    <div>Order number</div>
                    <div className="ml-auto font-medium">#3102</div>
                </div>
                <div className="flex items-center">
                    <div>Date</div>
                    <div className="ml-auto font-medium">June 23, 2022</div>
                </div>
                <div className="flex items-center">
                    <div>Total</div>
                    <div className="ml-auto font-semibold">$150.00</div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <div className="flex items-center">
                    <div>Name</div>
                    <div className="ml-auto font-medium">Sophia Anderson</div>
                </div>
                <div className="flex items-center">
                    <div>Email</div>
                    <div className="ml-auto font-medium">sophia@example.com</div>
                </div>
                <div className="flex items-start">
                    <div>Shipping address</div>
                    <div className="ml-auto grid gap-1 text-right">
                        <div>Sophia Anderson</div>
                        <div>1234 Main St.</div>
                        <div>Anytown, CA 12345</div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src="/placeholder.svg"
                        width="100"
                        height="100"
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                    />
                    <div className="grid gap-1">
                        <div className="font-medium">Glimmer Lamps</div>
                        <div>Quantity: 2</div>
                        <div className="font-semibold">Total: $120.00</div>
                    </div>
                </div>
                <div className="border-t" />
                <div className="flex items-center gap-4">
                    <img
                        src="/placeholder.svg"
                        width="100"
                        height="100"
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                    />
                    <div className="grid gap-1">
                        <div className="font-medium">Aqua Filters</div>
                        <div>Quantity: 3</div>
                        <div className="font-semibold">Total: $49.00</div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <div>Standard Shipping (3-5 business days)</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <div>Credit Card ending in 1234</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <div>Shipped on June 25, 2022</div>
            </CardContent>
            Card
            <div className="flex justify-center gap-4">
                <Button>Print invoice</Button>
                <Button>Track order</Button>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/utils/axios';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

// Lấy route để truy cập tham số URL
const route = useRoute();

// Lấy orderId từ URL params
const orderId = route.params.orderId;

function formatCurrency(value: number | null | undefined): string {
    if (value == null || isNaN(value)) return '0 ₫'; // Xử lý trường hợp giá trị không hợp lệ
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0, // Không hiển thị phần thập phân
    }).format(value);
}

const fetchOrderDetails = async () => {
    try {
        const res = await axios.get(`/order/${orderId}`);
        console.log('res.data: ', res.data);
        // bookDetails.value = res.data.product;
        // console.log('bookDetails.value: ', bookDetails.value);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
onMounted(() => {
    fetchOrderDetails();
});
console.log('orderId from URL:', orderId); // Log orderId ra console
</script>

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
                    <span class="font-medium">Order number</span>
                    <span>#1234567890</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-medium">Date</span>
                    <span>November 18, 2024</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-medium">Total</span>
                    <span>$99.99</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <span class="font-medium">Status</span>
                    <Badge>Processing</Badge>
                </div>
            </CardContent>
        </Card>
        <div class="mt-8 space-x-4">
            <Button asChild>
                <router-link to="/orderDetails">Xem chi tiết đơn</router-link>
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
</script>

<template>
    <div>
        <Header />
        <Breadcrumb class="mt-20" :style="{ marginLeft: '130px' }">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink as-child>
                        <RouterLink class="text-xl" to="/">Trang chủ</RouterLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage class="text-xl">Lịch sử đơn mượn</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div class="w-full px-4 py-6 space-y-6 mt-16">
            <!-- <h1 class="text-2xl font-bold">Lịch sử đơn mượn</h1> -->
            <ul class="space-y-4">
                <li v-for="order in orders" :key="order.id">
                    <Card>
                        <CardHeader>
                            <div class="flex items-center justify-between">
                                <CardTitle>{{ order.title }}</CardTitle>
                                <Badge :class="order.statusClass">{{ order.status }}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div class="flex items-center justify-between">
                                <span class="font-medium">Date:</span>
                                <span>{{ order.date }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="font-medium">Items Purchased:</span>
                                <span>{{ order.items }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="font-medium">Total Amount:</span>
                                <span>{{ order.amount }}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <router-link :to="order.detailsLink" class="text-blue-500 hover:underline">
                                View Details
                            </router-link>
                        </CardFooter>
                    </Card>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/utils/axios';
import { ref } from 'vue';
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

const orders = [
    {
        id: 12345,
        title: 'Order #12345',
        status: 'Delivered',
        statusClass: 'font-medium',
        date: 'December 12, 2023',
        items: 3,
        amount: '$150',
        detailsLink: '#',
    },
    {
        id: 12346,
        title: 'Order #12346',
        status: 'Pending',
        statusClass: 'font-medium bg-yellow-500',
        date: 'December 13, 2023',
        items: 2,
        amount: '$75',
        detailsLink: '#',
    },
    {
        id: 12347,
        title: 'Order #12347',
        status: 'Cancelled',
        statusClass: 'font-medium bg-red-500',
        date: 'December 14, 2023',
        items: 1,
        amount: '$45',
        detailsLink: '#',
    },
];
</script>

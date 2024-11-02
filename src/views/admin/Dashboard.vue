<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRangePicker } from '@/components/ui/daterange-picker';
import RecentSales from '@/components/examples/RecentSales.vue';
import ChartMonth from '@/components/ChartMonth.vue';

import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';

const statistics = ref({
    currentMonth: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
    growthRates: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
});

const fetchStatistics = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userToken = user.accessToken;
        const res = await fetch('http://localhost:3001/api/statistic/month', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        });
        const data = await res.json();
        const toast = useToast();
        console.log('dataMonth: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        statistics.value = {
            currentMonth: {
                users: data.users,
                products: data.products,
                orders: data.orders,
                publishers: data.publishers,
            },
            growthRates: {
                users: data.users.growthRate,
                products: data.products.growthRate,
                orders: data.orders.growthRate,
                publishers: data.publishers.growthRate,
            },
        };
    } catch (error) {
        console.error('Failed to fetch statistics:', error);
    }
};
const currentMonthYear = computed(() => {
    const now = new Date();
    const options = { month: 'long', year: 'numeric' }; // Định dạng tháng và năm
    return now.toLocaleDateString('vi-VN', options); // Định dạng theo ngôn ngữ Việt Nam
});

onMounted(fetchStatistics);
</script>

<template>
    <div>
        <page-header title="Dashboard">
            <div class="flex items-center space-x-2">
                <DateRangePicker />
                <Button>Download</Button>
            </div>
        </page-header>

        <Tabs default-value="monthly" class="space-y-4">
            <TabsList>
                <TabsTrigger value="weekly">Tuần </TabsTrigger>
                <TabsTrigger value="monthly">Tháng </TabsTrigger>
                <TabsTrigger value="yearly">Năm </TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card v-for="(item, key) in statistics.currentMonth" :key="key">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">{{ item.title }}</CardTitle>
                        </CardHeader>
                        <CardContent class="flex justify-between items-center">
                            <div class="text-2xl font-bold">{{ item.count }}</div>
                            <p
                                class="text-sm flex items-center"
                                :class="statistics.growthRates[key] > 0 ? 'text-green-500' : 'text-red-500'"
                            >
                                {{ statistics.growthRates[key] > 0 ? '+' : '-' }}
                                {{ Math.abs(statistics.growthRates[key]).toFixed(2) }}%
                                <span class="ms-1">
                                    <template v-if="statistics.growthRates[key] > 0">
                                        <!-- SVG màu xanh -->
                                        <svg
                                            class="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 13V1m0 0L1 5m4-4 4 4"
                                            />
                                        </svg>
                                    </template>
                                    <template v-else>
                                        <svg
                                            class="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 1v12m0 0L9 9M5 13 1 9"
                                            />
                                        </svg>
                                    </template>
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card class="col-span-4">
                        <CardHeader>
                            <CardTitle>Đơn mượn các tháng</CardTitle>
                        </CardHeader>
                        <CardContent class="pl-2">
                            <ChartMonth />
                        </CardContent>
                    </Card>
                    <Card class="col-span-3">
                        <CardHeader>
                            <CardTitle>Những đơn gần nhất</CardTitle>
                            <CardDescription> Tính theo {{ currentMonthYear }} </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentSales />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    </div>
</template>

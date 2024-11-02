<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card v-for="(item, key) in statistics.currentYear" :key="key">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">{{ item.title }}</CardTitle>
            </CardHeader>
            <CardContent class="flex justify-between items-center">
                <div class="text-2xl font-bold">{{ item.count }}</div>
                <p
                    class="text-sm flex items-center"
                    :class="statistics.growthRatesYear[key] >= 0 ? 'text-green-500' : 'text-red-500'"
                >
                    {{ statistics.growthRatesYear[key] >= 0 ? '+' : '-' }}
                    {{ Math.abs(statistics.growthRatesYear[key]).toFixed(2) }}%
                    <span class="ms-1">
                        <template v-if="statistics.growthRatesYear[key] >= 0">
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
                <CardTitle>Đơn mượn các năm</CardTitle>
            </CardHeader>
            <CardContent class="pl-2">
                <ChartYear />
            </CardContent>
        </Card>
        <Card class="col-span-3">
            <CardHeader>
                <CardTitle>Những đơn gần nhất</CardTitle>
                <CardDescription> Tính theo năm {{ new Date().getFullYear() }} </CardDescription>
            </CardHeader>
            <CardContent>
                <RecentOrderYear />
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import ChartYear from '@/components/ChartYear.vue';
import RecentOrderYear from '@/components/RecentOrderYear.vue';

const props = defineProps({
    statistics: {
        type: Object,
        required: true,
    },
});

const currentMonthYear = computed(() => {
    const now = new Date();
    const options = { month: 'long', year: 'numeric' };
    return now.toLocaleDateString('vi-VN', options);
});
</script>

<style scoped>
/* Thêm style nếu cần */
</style>

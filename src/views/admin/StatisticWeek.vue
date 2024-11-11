<template>
    <TabsContent value="weekly" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <!-- Hiển thị thống kê của tuần hiện tại từ statisticsWeek -->
            <Card v-for="(item, key) in currentWeekStatistics" :key="key">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">{{ item.title }}</CardTitle>
                </CardHeader>
                <CardContent class="flex justify-between items-center">
                    <div class="text-2xl font-bold">{{ item.count }}</div>
                    <p
                        class="text-sm flex items-center"
                        :class="item.growthRate >= 0 ? 'text-green-500' : 'text-red-500'"
                    >
                        {{ item.growthRate >= 0 ? '+' : '-' }}
                        {{ Math.abs(item.growthRate).toFixed(2) }}%
                        <span class="ms-1">
                            <template v-if="item.growthRate >= 0">
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
                    <CardTitle>Đơn mượn các tuần</CardTitle>
                </CardHeader>
                <CardContent class="pl-2">
                    <ChartWeek />
                </CardContent>
            </Card>
            <Card class="col-span-3">
                <CardHeader>
                    <CardTitle>Những đơn gần nhất</CardTitle>
                    <CardDescription>Tính theo {{ props.statistics.statisticsWeek?.[0].week }}</CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentOrderWeek />
                </CardContent>
            </Card>
        </div>
    </TabsContent>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import ChartWeek from '@/components/ChartWeek.vue';
import RecentOrderWeek from '@/components/RecentOrderWeek.vue';

const props = defineProps({
    statistics: {
        type: Object,
        required: true,
    },
});

console.log('propsWeek: ', props.statistics);

const currentWeekStatistics = computed(() => {
    const data = props.statistics.statisticsWeek?.[0] || {};
    console.log('dataWeeeeek: ', data);
    return [
        { title: 'Người dùng', count: data.users?.count || 0, growthRate: data.users?.growthRate || 0 },
        { title: 'Sản phẩm', count: data.products?.count || 0, growthRate: data.products?.growthRate || 0 },
        { title: 'Đơn mượn', count: data.orders?.count || 0, growthRate: data.orders?.growthRate || 0 },
        { title: 'Nhà xuất bản', count: data.publishers?.count || 0, growthRate: data.publishers?.growthRate || 0 },
    ];
});
</script>

<style scoped>
/* Thêm style nếu cần */
</style>

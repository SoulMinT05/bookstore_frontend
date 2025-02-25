<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from 'vue-toastification';

type Reader = {
    Ho: string;
    Ten: string;
    email: string;
    avatarUrl?: string;
};

type Order = {
    MaDocGia: Reader;
    TinhTrang: 'pending' | 'accepted' | 'rejected' | 'cancel';
};

type StatisticsData = {
    currentWeek: {
        users: number;
        products: number;
        orders: number;
        publishers: number;
        populateOrders: Order[];
    };
    growthRates: {
        users: number;
        products: number;
        orders: number;
        publishers: number;
    };
};

const statistics = ref<StatisticsData>({
    currentWeek: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
        populateOrders: [], // Thêm trường này để lưu đơn hàng
    },
    growthRates: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
});

const fetchData = async () => {
    try {
        const staffData = localStorage.getItem('staff');
        const staff = staffData ? JSON.parse(staffData) : null;
        const staffToken = staff?.accessToken ?? '';

        const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/statistic/week`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${staffToken}`,
            },
        });

        const data = await res.json();
        console.log('dataRecentWeek: ', data);

        const toast = useToast();
        if (!data.success) {
            toast.error(data.message);
            return;
        }

        // Kiểm tra dữ liệu trả về
        if (!data.statisticsWeek || data.statisticsWeek.length === 0) {
            return;
        }

        // Lấy số liệu từ tuần đầu tiên
        const firstWeekData = data.statisticsWeek[0];

        statistics.value = {
            currentWeek: {
                users: firstWeekData.users.count,
                products: firstWeekData.products.count,
                orders: firstWeekData.orders.count,
                publishers: firstWeekData.publishers.count,
                populateOrders: Array.isArray(firstWeekData.orders.populateOrders)
                    ? firstWeekData.orders.populateOrders
                    : [],
                // Giả định rằng `populateOrders` nằm trong `orders`
            },
            growthRates: {
                users: firstWeekData.users.growthRate,
                products: firstWeekData.products.growthRate,
                orders: firstWeekData.orders.growthRate,
                publishers: firstWeekData.publishers.growthRate,
            },
        };
        console.log(' statistics.valueWeeeeeek: ', statistics.value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getStatusMessage = (TinhTrang: 'pending' | 'accepted' | 'rejected' | 'cancel') => {
    switch (TinhTrang) {
        case 'pending':
            return 'Đang xử lý';
        case 'accepted':
            return 'Chấp nhận';
        case 'rejected':
            return 'Từ chối';
        case 'cancel':
            return 'Huỷ đơn';
        default:
            return '';
    }
};

onMounted(() => {
    fetchData(); // Gọi hàm fetchData khi component được mounted
});
</script>

<template>
    <div class="space-y-8">
        <div v-if="statistics.currentWeek.populateOrders.length === 0" class="text-center text-gray-500">
            Chưa có đơn hàng
        </div>
        <div v-else>
            <div
                v-for="(order, index) in statistics.currentWeek.populateOrders"
                :key="index"
                class="flex items-center mt-4"
            >
                <Avatar class="h-9 w-9">
                    <AvatarImage :src="order.MaDocGia.avatarUrl || 'https://github.com/shadcn.png'" alt="Avatar" />
                    <AvatarFallback>
                        {{ order.MaDocGia.Ho.charAt(0) || '' }}{{ order.MaDocGia.Ten.charAt(0) || '' }}
                    </AvatarFallback>
                </Avatar>
                <div class="ml-4 space-y-1">
                    <p class="text-sm font-medium leading-none">
                        {{ order.MaDocGia.Ho || '' }} {{ order.MaDocGia.Ten || '' }}
                    </p>
                    <p class="text-sm text-muted-foreground">{{ order.MaDocGia.email || '' }}</p>
                </div>
                <div class="ml-auto">
                    <span
                        :class="{
                            'bg-blue-500 text-white': order.TinhTrang === 'pending',
                            'bg-green-500 text-white': order.TinhTrang === 'accepted',
                            'bg-red-500 text-white': order.TinhTrang === 'rejected',
                            'bg-gray-500 text-white': order.TinhTrang === 'cancel',
                        }"
                        class="px-3 py-1 rounded-full text-sm font-medium"
                    >
                        {{ getStatusMessage(order.TinhTrang) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

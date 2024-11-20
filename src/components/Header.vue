<script setup lang="ts">
import GlobalSearchPopover from '@/components/core/GlobalSearchPopover.vue';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import { computed, onMounted, ref } from 'vue';
import {
    LogOut,
    User,
    Bell,
    Sun,
    MoonStar,
    Menu,
    KeyRound,
    UsersRound,
    ShoppingCart,
    ShoppingBag,
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/app';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import axios from '@/utils/axios';

const store = useAppStore();
const router = useRouter();
const isLoggedIn = ref(!!localStorage.getItem('user'));
const carts = ref([]);
const cartCount = ref(0);
const buttonWidth = ref(300);

const toggleMode = () => {
    store.toggleTheme();
};
const getName = computed(() => {
    // if (!isLoggedIn.value) return '';
    try {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user); // Chuyển đổi chuỗi JSON thành đối tượng
        return userObj.userData.firstName + ' ' + userObj.userData.lastName; // Trả về tên người dùng
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng từ localStorage:', error);
        return 'Người dùng không tồn tại'; // Trả về giá trị mặc định khi có lỗi
    }
});
const getEmail = computed(() => {
    // if (!isLoggedIn.value) return '';
    try {
        const user = localStorage.getItem('user');

        const userObj = JSON.parse(user); // Chuyển đổi chuỗi JSON thành đối tượng
        return userObj.userData.email; // Trả về tên người dùng
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng từ localStorage:', error);
        return 'Người dùng không tồn tại'; // Trả về giá trị mặc định khi có lỗi
    }
});
const handleLogout = async () => {
    const toast = useToast();
    const user = JSON.parse(localStorage.getItem('user'));
    const userToken = user.accessToken;
    try {
        const res = await fetch('http://localhost:3001/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        });
        const data = await res.json();

        if (!data.success) {
            toast.error('Đăng xuất thất bại');
            return;
        }
        localStorage.removeItem('user');
        toast.success('Đăng xuất thành công');
        router.push('/login');
    } catch (error) {
        toast.error('Đăng xuất thất bại');
        return;
    }
};

const getCart = async () => {
    try {
        const res = await axios.get('/user/getCart');
        console.log('res.data.user: ', res.data.user);
        carts.value = res.data.user.cart;
        cartCount.value = carts.value.length;
        console.log('carts.valueHeader: ', carts.value);
        console.log('cartCount.valueHeader: ', cartCount.value);
    } catch (error) {
        console.error('Error fetching get cart: ', error.message);
    }
};
onMounted(() => {
    getCart();
});
</script>

<template>
    <nav
        class="flex items-center justify-between h-[64px] border-b-[1px] fixed z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border w-full"
        :style="{ padding: '0 92px' }"
    >
        <div class="w-24 hidden lg:block">
            <router-link to="/">
                <img src="../assets/images/book-white.png" class="w-full" alt="" />
            </router-link>
        </div>
        <div class="w-2/5 hidden lg:block">
            <GlobalSearchPopover />
        </div>
        <Button
            variant="outline"
            class="p-[6px] w-8 h-8 transition-all duration-200 block lg:hidden"
            :class="store.sidebarExpanded ? 'bg-transparent' : 'dark:bg-white'"
            @click="store.toggleSidebar()"
        >
            <Menu class="transition-all duration-500 text-black" />
        </Button>
        <div class="flex items-center">
            <Button variant="outline" class="border-0 p-[6px] w-8 h-8">
                <Bell />
            </Button>
            <router-link to="/cart" class="relative">
                <Button variant="outline" class="border-0 p-[6px] ml-2 w-8 h-8">
                    <ShoppingCart />
                </Button>
                <span
                    class="absolute bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    :style="{ right: '-6px', top: '-8px' }"
                >
                    {{ cartCount }}
                </span>
            </router-link>
            <Button variant="outline" class="border-0 p-[6px] ml-2 w-8 h-8" @click="toggleMode">
                <Sun v-if="store.isDark" />
                <MoonStar v-else />
            </Button>
            <div class="border-x-[1px] border-gray-300 h-[24px] w-[1px] mx-2"></div>
            <DropdownMenu>
                <template v-if="!isLoggedIn">
                    <router-link to="/login">
                        <Button variant="outline" class="border-0 flex items-center max-w-[200px] w-full justify-start">
                            <span>Đăng nhập</span>
                        </Button>
                    </router-link>
                </template>
                <template v-else>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" class="border-0 flex items-center max-w-[200px] w-full justify-start">
                            <Avatar class="h-8 w-8">
                                <AvatarImage src="https://github.com/radix-vue.png"></AvatarImage>
                            </Avatar>
                            <span class="ml-2 hidden md:flex justify-start flex-col items-start">
                                <p class="mb-0">{{ getName }}</p>
                                <small class="text-xs text-slate-400 font-light">{{ getEmail }}</small>
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56 relative mr-4">
                        <DropdownMenuLabel>{{ getName }}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <router-link to="/profileUser" class="flex items-center">
                            <DropdownMenuItem class="w-full">
                                <UsersRound class="mr-2 h-4 w-4" />
                                <span>Hồ sơ</span>
                            </DropdownMenuItem>
                        </router-link>
                        <router-link to="/changePasswordUser" class="flex items-center">
                            <DropdownMenuItem class="w-full">
                                <KeyRound class="mr-2 h-4 w-4" />
                                <span>Đổi mật khẩu</span>
                            </DropdownMenuItem>
                        </router-link>
                        <router-link to="/orderHistoryUser" class="flex items-center">
                            <DropdownMenuItem class="w-full">
                                <ShoppingBag class="mr-2 h-4 w-4" />
                                <span>Lịch sử đơn hàng</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </router-link>

                        <DropdownMenuItem @click="handleLogout">
                            <LogOut class="mr-2 h-4 w-4 text-red-500" />
                            <span class="text-red-500">Đăng xuất</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </template>
            </DropdownMenu>
        </div>
    </nav>
</template>

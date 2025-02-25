<template>
    <Popover v-model:open="isPopoverOpen">
        <PopoverTrigger class="w-full">
            <div ref="triggerRef" class="relative w-full">
                <Input
                    v-model="searchQuery"
                    placeholder="Tìm kiếm sách..."
                    class="pr-10 w-full"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @keydown="handleKeydown"
                    @keyup.enter="handleSearch"
                />
                <Search
                    @click="handleSearch"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer transition-transform duration-200 ease-in-out hover:text-foreground hover:scale-110 active:scale-90"
                    :size="18"
                />
            </div>
        </PopoverTrigger>

        <PopoverContent class="popover-content" :style="{ width: popoverWidth }">
            <div v-if="searchHistory.length > 0">
                <p class="text-sm text-gray-500 mb-2">Lịch sử tìm kiếm:</p>
                <ul class="space-y-2">
                    <li
                        v-for="(keyword, index) in searchHistory"
                        :key="index"
                        class="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        @click="selectSearchHistory(keyword)"
                    >
                        {{ keyword }}
                    </li>
                </ul>
            </div>
            <p v-else class="text-sm text-gray-500">Chưa có lịch sử tìm kiếm.</p>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, onBeforeUnmount } from 'vue';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import axiosUser from '@/utils/axiosUser';

const searchQuery = ref('');
const searchHistory = ref([]);
const searchResults = ref([]);
const isPopoverOpen = ref(false);
const focusTimeout = ref(null);

const router = useRouter();

onMounted(async () => {
    await fetchSearchHistory();

    updatePopoverWidth(); // Cập nhật lần đầu
    window.addEventListener('resize', updatePopoverWidth);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('resize', updatePopoverWidth); // Gỡ bỏ event khi component bị hủy
});

const selectSearchHistory = (keyword: string) => {
    searchQuery.value = keyword;
    isPopoverOpen.value = false;
};

const fetchSearchHistory = async () => {
    try {
        const response = await axiosUser.get('/book/getSearchHistory');
        searchHistory.value = response.data.searchHistory || [];
    } catch (error) {
        console.error('Lỗi khi lấy lịch sử tìm kiếm', error);
    }
};

const handleFocus = () => {
    if (focusTimeout.value !== null) clearTimeout(focusTimeout.value);
    focusTimeout.value = setTimeout(() => {
        isPopoverOpen.value = true;
    }, 200);
};

const handleBlur = (event) => {
    setTimeout(() => {
        if (
            triggerRef.value &&
            !triggerRef.value.contains(event.relatedTarget) // Kiểm tra nếu blur ra ngoài Input/Search
        ) {
            isPopoverOpen.value = false;
        }
    }, 100);
};

const handleKeydown = (event) => {
    isPopoverOpen.value = true; // Giữ popover mở khi gõ dấu cách
    if (event.key === ' ') {
        event.preventDefault(); // Chặn hành động mặc định (submit)
    }
};

const handleClickOutside = (event) => {
    if (triggerRef.value && !triggerRef.value.contains(event.target)) {
        isPopoverOpen.value = false;
    }
};

const handleSearch = async () => {
    if (!searchQuery.value.trim()) return;
    try {
        const res = await axiosUser.get(`/book/search?keyword=${searchQuery.value}`);
        console.log('searchResults.value: ', res.data.books);
        searchResults.value = res.data.books;

        router.push({
            name: 'search',
            params: {
                keyword: searchQuery.value,
            },
            state: {
                searchResults: searchResults.value,
            },
        });
    } catch (error) {
        console.error('Lỗi khi tìm kiếm', error);
    }
};

const popoverWidth = ref('300px'); // Giá trị mặc định
const triggerRef = ref<HTMLElement | null>(null);

const updatePopoverWidth = async () => {
    if (triggerRef.value instanceof HTMLElement) {
        popoverWidth.value = `${triggerRef.value.getBoundingClientRect().width}px`;
    }
};

// const debounceTimeout = ref(null);
// watch(searchQuery, (newValue) => {
//     if (debounceTimeout.value) clearTimeout(debounceTimeout.value); // Xóa timeout trước đó nếu có

//     debounceTimeout.value = setTimeout(async () => {
//         if (!newValue.trim()) {
//             searchResults.value = [];
//             return;
//         }

//         console.log('searchQuery:', newValue); // Log giá trị người dùng nhập

//         try {
//             const { data } = await axiosUser.get(`/book/search?keyword=${encodeURIComponent(newValue)}`);
//             console.log('API Response:', data); // Log kết quả API

//             searchResults.value = data.books; // Lưu kết quả vào biến để hiển thị UI
//         } catch (error) {
//             console.error('Lỗi khi tìm kiếm', error);
//         }
//     }, 1000); // Trì hoãn 500ms (có thể điều chỉnh)
// });
</script>

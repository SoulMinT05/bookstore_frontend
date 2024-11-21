<template>
    <div class="container">
        <h1 class="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>
        <div class="flex justify-between items-center">
            <button
                @click="exportToExcel"
                class="cursor-pointer text-white mb-4 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition duration-150 ease-in-out"
            >
                Xuất excel
            </button>
        </div>

        <div class="mb-6">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Tìm kiếm đơn..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        </div>

        <div class="overflow-x-auto bg-white shadow-md rounded-lg">
            <div v-if="isLoading" class="flex justify-center items-center py-10">
                <div class="loader"></div>
            </div>

            <table v-else class="w-full table-auto">
                <thead>
                    <tr class="text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('firstName')">
                            Họ
                            <span v-if="currentSort !== 'firstName'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'firstName' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'firstName' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('lastName')">
                            Tên
                            <span v-if="currentSort !== 'lastName'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'lastName' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'lastName' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('SoQuyen')">
                            Số lượng
                            <span v-if="currentSort !== 'SoQuyen'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'SoQuyen' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'SoQuyen' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('status')">
                            Tình trạng
                            <span v-if="currentSort !== 'status'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'status' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'status' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('startDate')">
                            Ngày mượn
                            <span v-if="currentSort !== 'startDate'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'startDate' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'startDate' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('endDate')">
                            Ngày hết hạn
                            <span v-if="currentSort !== 'endDate'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'endDate' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'endDate' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-center cursor-pointer" @click="sortBy('createdAt')">
                            Ngày tạo
                            <span v-if="currentSort !== 'createdAt'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'createdAt' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'createdAt' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <!-- <th class="py-3 px-6 text-center cursor-pointer">Updated Date</th> -->
                        <th class="py-3 px-6 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr
                        v-for="order in sortedAndPaginatedOrders"
                        :key="order?.id"
                        class="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ order?.orderBy?.firstName }}</span>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ order?.orderBy?.lastName }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <span>{{ order?.SoQuyen }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <Select
                                v-model="order.status"
                                @update:modelValue="(newStatus) => updateOrderStatus(order._id, newStatus)"
                                class="w-full"
                            >
                                <SelectTrigger
                                    className="flex items-center justify-start  h-10 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <SelectValue placeholder="Chọn trạng thái" />
                                </SelectTrigger>
                                <SelectContent class="-ml-4">
                                    <SelectGroup>
                                        <SelectLabel class="pl-4">Trạng thái đơn hàng</SelectLabel>
                                        <SelectItem value="pending">
                                            <span class="text-blue-600">Pending</span>
                                        </SelectItem>
                                        <SelectItem value="accepted">
                                            <span class="text-green-600">Accepted</span>
                                        </SelectItem>
                                        <SelectItem value="rejected">
                                            <span class="text-red-600">Rejected</span>
                                        </SelectItem>
                                        <SelectItem value="cancel">
                                            <span class="text-gray-600">Cancel</span>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <span>{{ formatDate(order?.startDate) }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <span>{{ formatDate(order?.endDate) }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <span>{{ formatDate(order?.createdAt) }}</span>
                        </td>
                        <!-- <td class="py-4 px-6 text-center">
                            <span>{{ formatDate(order?.updatedAt) }}</span>
                        </td> -->
                        <td class="py-4 px-6 text-center">
                            <div class="flex item-center justify-center">
                                <button
                                    @click="viewOrder(order)"
                                    class="cursor-pointer hover:opacity-95 w-4 mr-2 transform hover:text-purple-500 hover:scale-110 transition-all duration-300 z-50"
                                >
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button
                                    @click="deleteOrder(order)"
                                    class="cursor-pointer hover:opacity-95 w-4 mr-2 transform hover:text-red-500 hover:scale-110 transition-all duration-300"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add order modal -->
        <div
            v-if="isAddOrderModalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/3 modal-content">
                <h2 class="text-lg font-bold mb-4">Thêm đơn hàng</h2>
                <form @submit.prevent="addOrder">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Id</label>
                        <input
                            v-model="newOrder.orderBy"
                            type="text"
                            id="name"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            v-model="newOrder.address"
                            type="text"
                            id="address"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="SoQuyen" class="block text-sm font-medium text-gray-700">SoQuyen</label>
                        <input
                            v-model="newOrder.SoQuyen"
                            type="text"
                            id="SoQuyen"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            v-model="newOrder.status"
                            type="text"
                            id="status"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeAddOrderModal"
                            class="cursor-pointer hover:opacity-95 mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Đóng
                        </button>
                        <button
                            type="submit"
                            class="cursor-pointer hover:opacity-95 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Thêm đơn hàng
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- View detail order -->
        <div
            v-if="selectedOrder"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-scroll"
        >
            <div @click.stop class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                <h2 class="text-xl font-bold text-center mb-4">Thông tin đơn hàng</h2>
                <div class="space-y-2">
                    <p><strong>Họ: </strong> {{ selectedOrder.orderBy?.firstName }}</p>
                    <p><strong>Tên: </strong> {{ selectedOrder.orderBy?.lastName }}</p>
                    <p><strong>Email: </strong> {{ selectedOrder?.orderBy?.email }}</p>
                    <p><strong>Số lượng: </strong> {{ selectedOrder.SoQuyen }}</p>
                    <p>
                        <strong>Tình trạng: </strong>
                        <!-- {{ selectedOrder.status }} -->
                        <Badge
                            v-if="selectedOrder.status === 'accepted'"
                            class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
                            >Accepted</Badge
                        >

                        <Badge
                            v-else-if="selectedOrder.status === 'pending'"
                            class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs"
                            >Pending</Badge
                        >

                        <Badge
                            v-else-if="selectedOrder.status === 'rejected'"
                            class="bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs"
                            >Rejected</Badge
                        >
                        <Badge
                            v-else-if="selectedOrder.status === 'cancel'"
                            class="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-xs"
                            >Cancel</Badge
                        >
                    </p>

                    <p><strong>Ngày mượn: </strong> {{ formatDate(selectedOrder.startDate) }}</p>
                    <p><strong>Ngày hết hạn: </strong> {{ formatDate(selectedOrder.endDate) }}</p>
                    <p><strong>Ngày tạo: </strong> {{ formatDate(selectedOrder.createdAt) }}</p>
                    <p><strong>Ngày cập nhật: </strong> {{ formatDate(selectedOrder.updatedAt) }}</p>
                </div>
                <div class="mt-6 flex justify-end">
                    <button
                        @click="closeModal"
                        class="cursor-pointer hover:opacity-95 text-white bg-blue-600 rounded-md px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit order modal -->
        <div
            v-if="isEditOrderModalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/3 modal-content">
                <h2 class="text-lg font-bold mb-4">Chỉnh sửa thông tin đơn hàng</h2>
                <form @submit.prevent="saveEditedOrder">
                    <div class="mb-4">
                        <label for="editStatus" class="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            v-model="orderToEdit.status"
                            type="text"
                            id="editStatus"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeEditPublisherModal"
                            class="cursor-pointer hover:opacity-95 mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Đóng
                        </button>
                        <button
                            type="submit"
                            class="cursor-pointer hover:opacity-95 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="mt-4 flex justify-between">
            <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-md cursor-pointer hover:opacity-95 transition duration-150 ease-in-out"
                :class="{
                    'bg-blue-500 text-white': currentPage > 1,
                    'bg-gray-400 text-gray-200 cursor-not-allowed': currentPage === 1,
                }"
            >
                Trước
            </button>
            <span class="self-center">Trang {{ currentPage }}/{{ totalPages }}</span>
            <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-md cursor-pointer hover:opacity-95 transition duration-150 ease-in-out"
                :class="{
                    'bg-blue-500 text-white': currentPage < totalPages,
                    'bg-gray-400 text-gray-200 cursor-not-allowed': currentPage === totalPages,
                }"
            >
                Sau
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-vue-next';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const orders = ref([]);
const currentSort = ref('');
const currentSortDir = ref('asc');
const searchQuery = ref('');

const newOrder = ref({
    name: '',
    address: '',
});
const isAddOrderModalVisible = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const selectedOrder = ref(null);
const orderToEdit = ref(null);
const isEditOrderModalVisible = ref(false);
const isLoading = ref(false);

const totalPages = computed(() => {
    return Math.ceil(filteredOrders.value.length / pageSize.value);
});

// Computed: Paginated publishers
const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return filteredOrders.value.slice(start, start + pageSize.value);
});

// Computed: Sorted Orders
const sortedOrdersComputed = computed(() => {
    const ordersToSort = filteredOrders.value;

    if (!currentSort.value) {
        return ordersToSort;
    }

    const direction = currentSortDir.value === 'asc' ? 1 : -1;
    return [...ordersToSort].sort((a, b) => {
        const valueA = a[currentSort.value];
        const valueB = b[currentSort.value];

        if (valueA < valueB) return -1 * direction;
        if (valueA > valueB) return 1 * direction;
        return 0;
    });
});

// Computed: Sorted and paginated Orders
const sortedAndPaginatedOrders = computed(() => {
    const sortedOrders = sortedOrdersComputed.value;

    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;

    return sortedOrders.slice(start, end);
});

// Computed: Filtered publishers based on the search query
const filteredOrders = computed(() => {
    const searchQueryInput = searchQuery.value.toLowerCase().replace(/\//g, ''); // Remove "/"
    return orders.value.filter((order) => {
        const firstName = order.orderBy.firstName ? String(order.orderBy.firstName).toLowerCase() : '';
        const lastName = order.orderBy.lastName ? String(order.orderBy.lastName).toLowerCase() : '';
        const status = order.status ? String(order.status).toLowerCase() : '';
        const createdAt = order.createdAt ? new Date(order.createdAt) : null;
        const startDate = order.startDate ? new Date(order.startDate) : null;
        const endDate = order.endDate ? new Date(order.endDate) : null;
        // const updatedAt = order.updatedAt ? new Date(order.updatedAt) : null;

        const formattedCreatedAt = createdAt
            ? createdAt.getDate().toString().padStart(2, '0') +
              (createdAt.getMonth() + 1).toString().padStart(2, '0') +
              createdAt.getFullYear()
            : '';
        const formattedStartDate = startDate
            ? startDate.getDate().toString().padStart(2, '0') +
              (startDate.getMonth() + 1).toString().padStart(2, '0') +
              startDate.getFullYear()
            : '';

        const formattedEndDate = endDate
            ? endDate.getDate().toString().padStart(2, '0') +
              (endDate.getMonth() + 1).toString().padStart(2, '0') +
              endDate.getFullYear()
            : '';

        const searchQueryNumber = Number(searchQueryInput);
        const isSearchQueryNumber = !isNaN(searchQueryNumber);
        const matchNumber = (value) => {
            if (isSearchQueryNumber && value != null) {
                return value.toString().includes(searchQueryInput); // Tìm kiếm theo chuỗi số
            }
            return false;
        };

        return (
            firstName.includes(searchQueryInput) ||
            lastName.includes(searchQueryInput) ||
            status.includes(searchQueryInput) ||
            matchNumber(order.SoQuyen) ||
            formattedCreatedAt.includes(searchQueryInput) || // Compare formatted date
            formattedStartDate.includes(searchQueryInput) || // Compare formatted date
            formattedEndDate.includes(searchQueryInput) // Compare formatted date
        );
    });
});

const toast = useToast();

function sortBy(column) {
    if (currentSort.value === column) {
        // Nếu đã sắp xếp theo cột này, đổi chiều
        currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc';
    } else {
        // Nếu chưa sắp xếp theo cột này, sắp xếp tăng dần
        currentSort.value = column;
        currentSortDir.value = 'asc';
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function goToPage(page) {
    currentPage.value = page;
}
function resetToFirstPage(page) {
    currentPage.value = 1;
}

function formatDate(date) {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(orders.value);
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    const fileName = `orders_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

async function fetchOrders() {
    isLoading.value = true;
    try {
        const staff = JSON.parse(localStorage.getItem('staff'));
        const staffToken = staff.accessToken;
        const res = await fetch('http://localhost:3001/api/order/getAllOrders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${staffToken}`,
            },
        });
        const data = await res.json();
        console.log('dataOrders: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        orders.value = data.orders;
    } catch (error) {
        console.log('error: ', error);
        toast.error(error.message);
    } finally {
        isLoading.value = false;
    }
}

async function updateOrderStatus(orderId, newStatus) {
    try {
        const staff = JSON.parse(localStorage.getItem('staff'));
        const staffToken = staff.accessToken;
        const res = await fetch(`http://localhost:3001/api/order/updateStatus/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${staffToken}`,
            },
            body: JSON.stringify({ status: newStatus }),
        });
        const data = await res.json();
        console.log('dataUpdateStatus: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        toast.success('Cập nhật tình trạng đơn hàng thành công');
    } catch (error) {
        console.error('Error adding order:', error);
        toast.error(error.message);
    }
}

function viewOrder(order) {
    selectedOrder.value = order;
}

function closeModal() {
    selectedOrder.value = null;
}

async function deleteOrder(order) {
    if (!confirm('Bạn chắc chắn xoá đơn hàng này không?')) return;
    try {
        const staff = JSON.parse(localStorage.getItem('staff'));
        const staffToken = staff.accessToken;
        const res = await fetch(`http://localhost:3001/api/order/${order._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${staffToken}`,
            },
        });
        const data = await res.json();
        console.log('dataDeleteOrders: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        orders.value.splice(
            orders.value.findIndex((o) => o._id === order._id),
            1,
        );
        toast.success('Xoá đơn hàng thành công');
    } catch (error) {
        console.error('Error deleting user:', error.message);
        toast.error(error.message);
    }
}

watch(searchQuery, () => {
    resetToFirstPage();
});

onMounted(fetchOrders);
</script>

<style scoped>
/* Thêm CSS tùy chỉnh ở đây nếu cần */
.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4f46e5;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 1s linear infinite;
}
.modal-content {
    max-height: 100vh; /* Đặt chiều cao tối đa cho modal */
    overflow-y: auto; /* Cho phép cuộn nếu nội dung vượt quá chiều cao */
}
.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 60px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* Xuất hiện ở phía trên biểu tượng */
    left: 50%;
    margin-left: -30px; /* Trung tâm tooltip */
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>

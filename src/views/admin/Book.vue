<template>
    <div class="container">
        <h1 class="text-3xl font-bold mb-6">Quản lý sách</h1>
        <div class="flex justify-between items-center">
            <button
                @click="showAddProductModal"
                type="button"
                class="cursor-pointer text-white mb-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-150 ease-in-out"
            >
                Thêm sách
            </button>
            <button
                @click="exportToExcel"
                class="cursor-pointer text-white mb-4 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition duration-150 ease-in-out"
            >
                Xuất excel
            </button>
        </div>

        <div class="overflow-x-auto bg-white shadow-md rounded-lg">
            <div v-if="isLoading" class="flex justify-center items-center py-10">
                <div class="loader"></div>
            </div>

            <table v-else class="w-full table-auto">
                <thead>
                    <tr class="text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">Name</th>
                        <th class="py-3 px-6 text-left">Address</th>
                        <!-- <th class="py-3 px-6 text-left">Price</th> -->
                        <th class="py-3 px-6 text-left">Quantity</th>
                        <th class="py-3 px-6 text-left">Year of publication</th>
                        <th class="py-3 px-6 text-left">Publisher</th>
                        <th class="py-3 px-6 text-center">Created Date</th>
                        <th class="py-3 px-6 text-center">Updated Date</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr
                        v-for="product in paginatedProducts"
                        :key="product?.id"
                        class="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.name }}</span>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.author }}</span>
                        </td>
                        <!-- <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.price }}</span>
                        </td> -->
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.quantity }}</span>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.yearOfPublication }}</span>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.publisherId?.name }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <span>{{ formatDate(product?.createdAt) }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <span>{{ formatDate(product?.updatedAt) }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <div class="flex item-center justify-center">
                                <button
                                    @click="viewProduct(product)"
                                    class="cursor-pointer hover:opacity-95 w-4 mr-2 transform hover:text-purple-500 hover:scale-110 transition-all duration-300 z-50"
                                >
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button
                                    @click="editProduct(product)"
                                    class="cursor-pointer hover:opacity-95 w-4 mr-2 transform hover:text-yellow-500 hover:scale-110 transition-all duration-300"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button
                                    @click="deleteProduct(product)"
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

        <!-- Add product modal -->
        <div
            v-if="isAddProductModalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/3 modal-content">
                <h2 class="text-lg font-bold mb-4">Thêm sách</h2>
                <form @submit.prevent="addProduct">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            v-model="newProduct.name"
                            type="text"
                            id="name"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            v-model="newProduct.author"
                            type="text"
                            id="author"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            v-model="newProduct.price"
                            type="text"
                            id="price"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            v-model="newProduct.quantity"
                            type="text"
                            id="quantity"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="yearOfPublication" class="block text-sm font-medium text-gray-700"
                            >Year publication</label
                        >
                        <input
                            v-model="newProduct.yearOfPublication"
                            type="number"
                            id="yearOfPublication"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <!-- <label for="publisher" class="block text-sm font-medium text-gray-700">Publisher</label>
                        <input
                            v-model="newProduct.publisher"
                            type="text"
                            id="publisher"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        /> -->
                        <label for="publisher" class="block text-sm font-medium text-gray-700">Publisher</label>
                        <select
                            v-model="newProduct.publisher"
                            id="publisher"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option disabled value="">Chọn nhà xuất bản</option>
                            <option v-for="publisher in publishers" :key="publisher._id" :value="publisher.name">
                                {{ publisher.name }}
                            </option>
                        </select>
                    </div>
                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeAddProductModal"
                            class="cursor-pointer hover:opacity-95 mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Đóng
                        </button>
                        <button
                            type="submit"
                            class="cursor-pointer hover:opacity-95 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Thêm sách
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- View detail product -->
        <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div @click.stop class="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 class="text-lg font-bold mb-4">Thông tin sách</h2>
                <p><strong>Name:</strong> {{ selectedProduct.name }}</p>
                <p><strong>Author:</strong> {{ selectedProduct.author }}</p>
                <p><strong>Price:</strong> {{ formatPrice(selectedProduct.price) }}</p>
                <p><strong>Quantity:</strong> {{ selectedProduct.quantity }}</p>
                <p><strong>Year publication:</strong> {{ selectedProduct.yearOfPublication }}</p>
                <p><strong>Publisher:</strong> {{ selectedProduct.publisherId.name }}</p>
                <p><strong>Created Date:</strong> {{ formatDate(selectedProduct.createdAt) }}</p>
                <p><strong>Updated Date:</strong> {{ formatDate(selectedProduct.updatedAt) }}</p>

                <div class="mt-4">
                    <button
                        @click="closeModal"
                        class="cursor-pointer hover:opacity-95 text-white bg-blue-500 rounded-md px-4 py-2"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit product modal -->
        <div
            v-if="isEditProductModalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/3 modal-content">
                <h2 class="text-lg font-bold mb-4">Chỉnh sửa thông tin sách</h2>
                <form @submit.prevent="saveEditedProduct">
                    <div class="mb-4">
                        <label for="editName" class="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            v-model="productToEdit.name"
                            type="text"
                            id="editName"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div class="mb-4">
                        <label for="editAuthor" class="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            v-model="productToEdit.author"
                            type="text"
                            id="editAuthor"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editPrice" class="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            v-model="productToEdit.price"
                            type="text"
                            id="editPrice"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editQuantity" class="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            v-model="productToEdit.quantity"
                            type="text"
                            id="editQuantity"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editYearOfPublication" class="block text-sm font-medium text-gray-700"
                            >Year publication</label
                        >
                        <input
                            v-model="productToEdit.yearOfPublication"
                            type="number"
                            id="editYearOfPublication"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editPublisher" class="block text-sm font-medium text-gray-700">Publisher</label>
                        <input
                            v-model="productToEdit.publisher"
                            type="text"
                            id="editPublisher"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeEditProductModal"
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
                @click="previousPage"
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
                @click="nextPage"
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

<script>
import { useToast } from 'vue-toastification';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-vue-next';

export default {
    data() {
        return {
            products: [], // Dữ liệu sách
            newProduct: {
                name: '',
                author: '',
                price: null,
                quantity: null,
                yearOfPublication: null,
                publisher: '',
            },
            publishers: [],
            isAddProductModalVisible: false,
            currentPage: 1, // Bắt đầu với trang đầu tiên
            pageSize: 10, // Hiển thị 10 sách mỗi trang
            selectedProduct: null,
            productToEdit: null,
            isEditProductModalVisible: false, // For Edit product modal
            isLoading: false,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.products.length / this.pageSize);
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.products.slice(start, start + this.pageSize);
        },
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        formatDate(date) {
            // const createdAtDate = new Date(date); // Tạo đối tượng Date
            // return createdAtDate.toGMTString(); // Chuyển đổi thành chuỗi GMT
            const d = new Date(date);
            const year = d.getUTCFullYear();
            const month = String(d.getUTCMonth() + 1).padStart(2, '0');
            const day = String(d.getUTCDate()).padStart(2, '0');

            return `${day}/${month}/${year}`;
        },
        formatPrice(value) {
            if (value >= 1000000) {
                return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M VND';
            } else if (value >= 1000) {
                return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k VND';
            } else {
                return value.toString();
            }
        },
        exportToExcel() {
            // Tạo một workbook mới
            const wb = XLSX.utils.book_new();

            // Chuyển đổi dữ liệu sách thành bảng
            const ws = XLSX.utils.json_to_sheet(this.products);

            // Thêm bảng vào workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Products');

            // Tạo tên file
            const fileName = `products_${new Date().toISOString().split('T')[0]}.xlsx`;

            // Xuất file
            XLSX.writeFile(wb, fileName);
        },
        async fetchPublishers() {
            this.isLoading = true;
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userToken = user.accessToken;
                const res = await fetch('http://localhost:3001/api/publisher/getAllPublishers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                const data = await res.json();
                const toast = useToast();
                console.log('dataPublishers: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                this.publishers = data.publishers;
            } catch (error) {
                console.log('error: ', error);
                toast.error(error.message);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchProducts() {
            this.isLoading = true;
            try {
                // const user = JSON.parse(localStorage.getItem('user'));
                // const userToken = user.accessToken;
                const res = await fetch('http://localhost:3001/api/book/getAllProducts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: `Bearer ${userToken}`,
                    },
                });
                const data = await res.json();
                const toast = useToast();
                console.log('dataProducts: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                this.products = data.products;
            } catch (error) {
                console.log('error: ', error);
                toast.error(error.message);
            } finally {
                this.isLoading = false;
            }
        },
        showAddProductModal() {
            this.isAddProductModalVisible = true;
        },
        closeAddProductModal() {
            this.isAddProductModalVisible = false;
            this.resetNewProduct(); // Đặt lại thông tin sách mới sau khi đóng modal
        },
        resetNewProduct() {
            this.newProduct = {
                name: '',
                author: '',
                price: null,
                quantity: null,
                yearOfPublication: null,
                publisher: null,
            };
        },
        async addProduct() {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userToken = user.accessToken;
                const res = await fetch('http://localhost:3001/api/book/createProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify(this.newProduct),
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataAddProducts: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                this.products.push(data.newProduct);
                toast.success('Thêm sách thành công');
                this.closeAddProductModal();
            } catch (error) {
                console.error('Error adding product:', error);
                toast.error(error.message);
            }
        },

        editProduct(product) {
            this.productToEdit = { ...product }; // Make a copy of the publisher object to avoid directly modifying the array
            this.isEditProductModalVisible = true;
        },
        closeEditProductModal() {
            this.isEditProductModalVisible = false;
            this.productToEdit = null; // Clear the productToEdit data after closing the modal
        },
        async saveEditedProduct() {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userToken = user.accessToken;

                // Lấy productId từ publisherToEdit
                const publisherId = this.publisherToEdit._id;
                const res = await fetch(`http://localhost:3001/api/publisher/${publisherId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify(this.publisherToEdit),
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataEditPublishers: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                // Cập nhật danh sách users sau khi chỉnh sửa
                const index = this.publishers.findIndex((publisher) => publisher._id === publisherId);
                if (index !== -1) {
                    this.publishers[index] = data.updatedPublisher;
                }
                toast.success('Cập nhật thông tin sách thành công');
                this.closeEditProductModal();
            } catch (error) {
                console.error('Error adding product:', error);
                toast.error(error.message);
            }
        },
        viewProduct(product) {
            // Logic xem chi tiết sách
            this.selectedProduct = product;
        },
        closeModal() {
            this.selectedProduct = null;
        },

        async deleteProduct(product) {
            if (!confirm('Bạn chắc chắn xoá sách này không?')) return;
            try {
                const userLocalStorage = JSON.parse(localStorage.getItem('user'));
                const userToken = userLocalStorage.accessToken;

                const res = await fetch(`http://localhost:3001/api/publisher/${publisher._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataDeletePublishers: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                this.publishers.splice(
                    this.publishers.findIndex((p) => p._id === publisher._id),
                    1,
                );
                toast.success('Xoá sách thành công');
            } catch (error) {
                console.error('Error deleting user:', error.message);
                toast.error('Error deleting user: ', error.message);
            }
        },

        showToast(message) {
            this.toastMessage = message;
            setTimeout(() => {
                this.toastMessage = '';
            }, 3000);
        },
    },

    mounted() {
        this.fetchProducts();
        this.fetchPublishers();
    },
};
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

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

        <div class="mb-6">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Tìm kiếm sách..."
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
                        <th class="py-3 px-6 text-left cursor-pointer">Hình ảnh</th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('TenSach')">
                            Tên
                            <span v-if="currentSort !== 'TenSach'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'TenSach' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'TenSach' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('TacGia')">
                            Tác giả
                            <span v-if="currentSort !== 'TacGia'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'TacGia' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'TacGia' && currentSortDir === 'desc'" class="ml-2">
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
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('NamXuatBan')">
                            Năm XB
                            <span v-if="currentSort !== 'NamXuatBan'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'NamXuatBan' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'NamXuatBan' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('MaNXB.TenNXB')">
                            Nhà XB
                            <span v-if="currentSort !== 'MaNXB.TenNXB'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'MaNXB.TenNXB' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'MaNXB.TenNXB' && currentSortDir === 'desc'" class="ml-2">
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
                        <!-- <th class="py-3 px-6 text-center">Updated Date</th> -->
                        <th class="py-3 px-6 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr
                        v-for="product in sortedAndPaginatedBooks"
                        :key="product?.id"
                        class="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td class="py-4 px-6 text-left">
                            <div v-if="product.HinhAnhSach?.length">
                                <img class="w-16 h-16 object-cover" :src="product.HinhAnhSach[0]" alt="Product Image" />
                            </div>
                            <div v-else>No HinhAnhSach available</div>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.TenSach }}</span>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.TacGia }}</span>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.SoQuyen }}</span>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.NamXuatBan }}</span>
                        </td>
                        <td class="py-4 px-6 text-left">
                            <span class="font-medium">{{ product?.MaNXB?.TenNXB }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <span>{{ formatDate(product?.createdAt) }}</span>
                        </td>
                        <!-- <td class="py-4 px-6 text-center">
                            <span>{{ formatDate(product?.updatedAt) }}</span>
                        </td> -->
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
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 modal-content">
                <h2 class="text-lg font-bold mb-4">Thêm sách</h2>
                <form @submit.prevent="addProduct">
                    <div class="mb-4">
                        <label for="TenSach" class="block text-sm font-medium text-gray-700">Tên</label>
                        <input
                            v-model="newProduct.TenSach"
                            type="text"
                            id="TenSach"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="TacGia" class="block text-sm font-medium text-gray-700">Tác giả</label>
                        <input
                            v-model="newProduct.TacGia"
                            type="text"
                            id="TacGia"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="DonGia" class="block text-sm font-medium text-gray-700">Giá</label>
                        <input
                            v-model="newProduct.DonGia"
                            type="number"
                            id="DonGia"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="SoQuyen" class="block text-sm font-medium text-gray-700">Số lượng</label>
                        <input
                            v-model="newProduct.SoQuyen"
                            type="number"
                            id="SoQuyen"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="NamXuatBan" class="block text-sm font-medium text-gray-700">Năm XB</label>
                        <input
                            v-model="newProduct.NamXuatBan"
                            type="number"
                            id="NamXuatBan"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
                        <label for="publisher" class="block text-sm font-medium text-gray-700">Nhà XB</label>
                        <select
                            v-model="newProduct.publisher"
                            id="publisher"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option disabled value="">Chọn nhà xuất bản</option>
                            <option v-for="publisher in publishers" :key="publisher._id" :value="publisher.TenNXB">
                                {{ publisher.TenNXB }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <!-- Thêm trường upload ảnh -->
                        <label for="images" class="block text-sm font-medium text-gray-700">Chọn ảnh</label>
                        <input
                            type="file"
                            id="images"
                            multiple
                            @change="handleFileChange"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        <small class="text-gray-500">Chọn tối đa 10 ảnh</small>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mb-6 overflow-hidden">
                        <div v-for="(image, index) in previewImages" :key="index" class="relative">
                            <img :src="image" alt="Preview Image" class="w-full h-44 object-cover rounded-md" />
                        </div>
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
                            :disabled="loading"
                            class="cursor-pointer hover:opacity-95 px-4 py-2 bg-blue-500 text-white rounded-md relative flex items-center justify-center"
                        >
                            <div v-if="loading" class="flex justify-center items-center absolute">
                                <div class="loader"></div>
                            </div>
                            <span :class="{ 'opacity-0': loading, 'transition-opacity duration-200': loading }"
                                >Thêm sách</span
                            >
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- View detail product -->
        <div
            v-if="selectedProduct"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-scroll"
        >
            <div @click.stop class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
                <h2 class="text-xl font-bold text-center mb-4">Thông tin sách</h2>

                <div class="space-y-2">
                    <p><strong>Hình ảnh:</strong></p>
                    <div class="flex flex-wrap justify-start gap-3 mb-4">
                        <div v-for="(image, index) in selectedProduct.HinhAnhSach" :key="index" class="flex-shrink-0">
                            <img :src="image" alt="Hình ảnh sách" class="rounded-lg w-24 h-24 object-cover" />
                        </div>
                    </div>
                    <p><strong>Tên sách:</strong> {{ selectedProduct.TenSach }}</p>
                    <p><strong>Tác giả:</strong> {{ selectedProduct.TacGia }}</p>
                    <p><strong>Giá:</strong> {{ formatPrice(selectedProduct.DonGia) }}</p>
                    <p><strong>Số lượng:</strong> {{ selectedProduct.SoQuyen }}</p>
                    <p><strong>Năm xuất bản:</strong> {{ selectedProduct.NamXuatBan }}</p>
                    <p><strong>Nhà xuất bản:</strong> {{ selectedProduct.MaNXB.TenNXB }}</p>
                    <p><strong>Ngày tạo:</strong> {{ formatDate(selectedProduct.createdAt) }}</p>
                    <p><strong>Ngày cập nhật:</strong> {{ formatDate(selectedProduct.updatedAt) }}</p>
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

        <!-- Edit product modal -->
        <div
            v-if="isEditProductModalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 modal-content">
                <h2 class="text-lg font-bold mb-4">Chỉnh sửa thông tin sách</h2>
                <form @submit.prevent="saveEditedProduct">
                    <div class="mb-4">
                        <label for="editTenSach" class="block text-sm font-medium text-gray-700">Tên</label>
                        <input
                            v-model="productToEdit.TenSach"
                            type="text"
                            id="editTenSach"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div class="mb-4">
                        <label for="editTacGia" class="block text-sm font-medium text-gray-700">Tác giả</label>
                        <input
                            v-model="productToEdit.TacGia"
                            type="text"
                            id="editTacGia"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editDonGia" class="block text-sm font-medium text-gray-700">Gía</label>
                        <input
                            v-model="productToEdit.DonGia"
                            type="number"
                            id="editDonGia"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editSoQuyen" class="block text-sm font-medium text-gray-700">Số lượng</label>
                        <input
                            v-model="productToEdit.SoQuyen"
                            type="number"
                            id="editSoQuyen"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editNamXuatBan" class="block text-sm font-medium text-gray-700">Năm XB</label>
                        <input
                            v-model="productToEdit.NamXuatBan"
                            type="number"
                            id="editNamXuatBan"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="publisher" class="block text-sm font-medium text-gray-700">Nhà XB</label>
                        <select
                            v-model="productToEdit.MaNXB"
                            id="publisher"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        >
                            <option disabled value="">Chọn nhà xuất bản</option>
                            <option v-for="publisher in publishers" :key="publisher._id" :value="publisher.TenNXB">
                                {{ publisher.TenNXB }}
                            </option>
                        </select>

                        <!-- <label for="publisher" class="block text-sm font-medium text-gray-700">Nhà XB</label> -->

                        <!-- <select
                            v-model="productToEdit.publisherId"
                            id="publisher"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        >
                            <option disabled value="">Chọn nhà xuất bản</option>
                            <option v-for="publisher in publishers" :key="publisher._id" :value="publisher._id">
                                {{ publisher.name }}
                            </option>
                        </select> -->
                    </div>
                    <!-- <select
                            v-model="newProduct.publisher"
                            id="publisher"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option disabled value="">Chọn nhà xuất bản</option>
                            <option v-for="publisher in publishers" :key="publisher._id" :value="publisher.TenNXB">
                                {{ publisher.TenNXB }}
                            </option>
                        </select> -->

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Ảnh hiện tại</label>
                        <div class="grid grid-cols-3 gap-4">
                            <div v-for="(image, index) in currentImages" :key="index" class="relative">
                                <img :src="image" alt="Current Image" class="w-full h-44 object-cover rounded-md" />
                                <button
                                    @click="removeCurrentImage(index)"
                                    type="button"
                                    class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Thêm ảnh mới</label>
                        <input
                            type="file"
                            id="newImages"
                            multiple
                            @change="handleNewFileChange"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div class="grid grid-cols-3 gap-4">
                        <div v-for="(image, index) in previewNewImages" :key="index" class="relative">
                            <img :src="image" alt="New Image Preview" class="w-full h-32 object-cover rounded-md" />
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeEditProductModal"
                            class="cursor-pointer hover:opacity-95 mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Đóng
                        </button>
                        <!-- <button
                            type="button"
                            @click="exportToPDF"
                            class="cursor-pointer hover:opacity-95 px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                            Xuất PDF
                        </button> -->
                        <button
                            type="submit"
                            :disabled="loading"
                            class="cursor-pointer hover:opacity-95 px-4 py-2 bg-blue-500 text-white rounded-md relative flex items-center justify-center"
                        >
                            <div v-if="loading" class="flex justify-center items-center absolute">
                                <div class="loader"></div>
                            </div>
                            <span :class="{ 'opacity-0': loading, 'transition-opacity duration-200': loading }"
                                >Cập nhật</span
                            >
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

<script>
import { useToast } from 'vue-toastification';
import * as XLSX from 'xlsx';

export default {
    data() {
        return {
            products: [], // Dữ liệu sách
            currentSort: '', // Cột hiện tại để sắp xếp
            currentSortDir: 'asc',
            searchQuery: '',
            newProduct: {
                TenSach: '',
                TacGia: '',
                DonGia: null,
                SoQuyen: null,
                NamXuatBan: null,
                publisher: '',
            },
            // Create images
            uploadImages: [],
            previewImages: [],
            // Edit images
            currentImages: [], // Ảnh hiện tại của sản phẩm
            previewNewImages: [], // Preview ảnh mới
            newImages: [], // Danh sách file ảnh mới
            deletedImages: [], // Danh sách ảnh bị xóa
            publishers: [],
            isAddProductModalVisible: false,
            loading: false,
            loadingEdit: false,
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
            return Math.ceil(this.filteredBooks.length / this.pageSize);
        },
        paginatedBooks() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.filteredBooks.slice(start, start + this.pageSize);
        },
        sortedAndPaginatedBooks() {
            // Sắp xếp dữ liệu
            const sortedBooks = this.sortedBooks;

            // Tính toán các chỉ số phân trang
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;

            // Trả về dữ liệu phân trang sau khi đã sắp xếp
            return sortedBooks.slice(start, end);
        },
        sortedBooks() {
            // If no sort column is specified, return the Books array as is
            const booksToSort = this.filteredBooks;
            if (!this.currentSort) {
                return booksToSort;
            }

            const direction = this.currentSortDir === 'asc' ? 1 : -1;
            return [...booksToSort].sort((a, b) => {
                let valueA = a[this.currentSort];
                let valueB = b[this.currentSort];

                if (this.currentSort === 'publisher') {
                    valueA = a.MaNXB ? a.MaNXB.TenNXB : '';
                    valueB = b.MaNXB ? b.MaNXB.TenNXB : '';
                }

                if (valueA < valueB) return -1 * direction;
                if (valueA > valueB) return 1 * direction;
                return 0;
            });
        },
        filteredBooks() {
            const searchQuery = this.searchQuery.toLowerCase().replace(/\//g, '');
            return this.products.filter((book) => {
                const TenSach = book.TenSach ? book.TenSach.toLowerCase() : '';
                const TacGia = book.TacGia ? book.TacGia.toLowerCase() : '';
                const publisher = book.MaNXB?.TenNXB ? book.MaNXB?.TenNXB.toLowerCase() : '';
                const createdAt = book.createdAt ? new Date(book.createdAt) : null;
                const updatedAt = book.updatedAt ? new Date(book.updatedAt) : null;

                const formattedCreatedAt = createdAt
                    ? createdAt.getDate().toString().padStart(2, '0') +
                      (createdAt.getMonth() + 1).toString().padStart(2, '0') +
                      createdAt.getFullYear()
                    : '';
                const formattedUpdatedAt = updatedAt
                    ? updatedAt.getDate().toString().padStart(2, '0') +
                      (updatedAt.getMonth() + 1).toString().padStart(2, '0') +
                      updatedAt.getFullYear()
                    : '';

                const searchQueryNumber = Number(searchQuery);
                const isSearchQueryNumber = !isNaN(searchQueryNumber);

                const matchNumber = (value) => {
                    if (isSearchQueryNumber && value != null) {
                        return value.toString().includes(searchQuery); // Tìm kiếm theo chuỗi số
                    }
                    return false;
                };

                return (
                    TenSach.includes(searchQuery.toLowerCase()) ||
                    TacGia.includes(searchQuery.toLowerCase()) ||
                    publisher.includes(searchQuery.toLowerCase()) ||
                    matchNumber(book.SoQuyen) ||
                    matchNumber(book.NamXuatBan) ||
                    formattedCreatedAt.includes(searchQuery) // So sánh chuỗi ngày tháng
                    // formattedUpdatedAt.includes(searchQuery)
                );
            });
        },
    },
    methods: {
        sortBy(column) {
            if (this.currentSort === column) {
                // Nếu đã sắp xếp theo cột này, đổi chiều
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            } else {
                // Nếu chưa sắp xếp theo cột này, sắp xếp tăng dần
                this.currentSort = column;
                this.currentSortDir = 'asc';
            }
        },
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
        goToPage(page) {
            this.currentPage = page;
        },
        resetToFirstPage() {
            this.currentPage = 1;
        },
        validateNumber(event) {
            const inputValue = event.target.value;
            // Chỉ cho phép nhập số hoặc chuỗi rỗng
            if (!/^\d*$/.test(inputValue)) {
                event.target.value = inputValue.replace(/[^\d]/g, ''); // Loại bỏ ký tự không phải số
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
        exportToPDF() {
            // Tạo một tài liệu PDF mới
            const doc = new jsPDF();

            // Tiêu đề
            doc.setFontSize(20);
            doc.text('Danh sách sản phẩm', 10, 10);

            // Thêm tiêu đề bảng
            doc.setFontSize(12);
            const headers = ['Tên', 'Tác giả', 'Giá', 'Số lượng', 'Năm xuất bản', 'Nhà xuất bản'];
            const data = this.products.map((product) => [
                product.TenSach,
                product.TacGia,
                this.formatPrice(product.DonGia),
                product.SoQuyen,
                product.NamXuatBan,
                product.publisher,
            ]);

            // Tạo bảng
            doc.autoTable({
                head: [headers],
                body: data,
                startY: 20, // Bắt đầu vẽ bảng từ vị trí Y = 20
            });

            // Lưu file PDF
            doc.save(`products_${new Date().toISOString().split('T')[0]}.pdf`);
        },
        async fetchPublishers() {
            this.isLoading = true;
            try {
                const staff = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staff.accessToken;
                const res = await fetch('http://localhost:3001/api/publisher/getAllPublishers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${staffToken}`,
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
                TenSach: '',
                TacGia: '',
                DonGia: null,
                SoQuyen: null,
                NamXuatBan: null,
                publisher: '',
            };
            this.uploadImages = [];
            this.previewImages = [];
        },

        handleFileChange(event) {
            const files = event.target.files; // Lấy danh sách file từ input
            if (files.length > 10) {
                // Nếu người dùng chọn quá 10 ảnh, có thể báo lỗi
                alert('Chọn tối đa 10 ảnh.');
                return;
            }

            this.uploadImages = []; // Xóa danh sách ảnh cũ
            this.previewImages = [];
            for (let i = 0; i < files.length; i++) {
                this.uploadImages.push(files[i]); // Thêm từng file vào uploadImages

                // Tạo URL cho preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImages.push(e.target.result); // Lưu URL của ảnh
                };
                reader.readAsDataURL(files[i]); // Đọc file dưới dạng UR
            }

            console.log('this.uploadImages: ', this.uploadImages);
            console.log('this.previewImages: ', this.previewImages);
        },

        async addProduct() {
            this.loading = true;
            try {
                const staff = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staff.accessToken;

                this.isUploading = true;

                const formData = new FormData();
                formData.append('TenSach', this.newProduct.TenSach);
                formData.append('TacGia', this.newProduct.TacGia);
                formData.append('DonGia', this.newProduct.DonGia);
                formData.append('SoQuyen', this.newProduct.SoQuyen);
                formData.append('NamXuatBan', this.newProduct.NamXuatBan);
                formData.append('publisher', this.newProduct.publisher);
                // Thêm các ảnh đã chọn vào form data
                this.uploadImages.forEach((image) => {
                    formData.append('HinhAnhSach', image); // Gửi từng ảnh
                });

                // Gửi request tạo sản phẩm cùng với ảnh
                const res = await fetch('http://localhost:3001/api/book/createProduct', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                    },
                    body: formData,
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataAddProducts: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }

                // Thêm sản phẩm mới vào danh sách
                this.products.push(data.newProduct);

                console.log('this.products: ', this.products);
                toast.success('Thêm sách thành công');
                this.closeAddProductModal();
            } catch (error) {
                console.error('Error adding product:', error);
                toast.error(error.message);
            } finally {
                this.loading = false;
            }
        },
        // Edit product
        handleNewFileChange(event) {
            const files = event.target.files;
            this.previewNewImages = [...files].map((file) => URL.createObjectURL(file));
            this.newImages = Array.from(files);
            console.log('filesEditImgNew: ', files);
        },
        async removeCurrentImage(index) {
            if (!window.confirm('Bạn chắc chắn xoá ảnh này chứ?')) return;
            const deletedImage = this.currentImages[index]; // Lấy ảnh từ currentImages
            this.deletedImages.push(deletedImage); // Thêm ảnh vào mảng deletedImages

            // Xóa ảnh khỏi currentImages (chỉ xóa trên giao diện)
            this.currentImages.splice(index, 1);
        },

        editProduct(product) {
            this.productToEdit = { ...product }; // Make a copy of the publisher object to avoid directly modifying the array
            this.currentImages = [...product.HinhAnhSach];
            this.deletedImages = [];
            this.newImages = [];
            this.isEditProductModalVisible = true;
        },
        closeEditProductModal() {
            this.isEditProductModalVisible = false;
            this.productToEdit = null; // Clear the productToEdit data after closing the modal
            this.deletedImages = [];
            this.newImages = [];
            this.currentImages = [];
            this.previewNewImages = [];
        },
        async saveEditedProduct() {
            this.loading = true;
            try {
                const staff = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staff.accessToken;

                // Lấy productId từ productToEdit
                const productId = this.productToEdit._id;

                const formData = new FormData();
                // Gán các thông tin sản phẩm từ productToEdit vào FormData
                formData.append('TenSach', this.productToEdit.TenSach);
                formData.append('TacGia', this.productToEdit.TacGia);
                formData.append('DonGia', this.productToEdit.DonGia);
                formData.append('SoQuyen', this.productToEdit.SoQuyen);
                formData.append('NamXuatBan', this.productToEdit.NamXuatBan);
                formData.append('publisher', this.productToEdit.publisher);
                // Gửi đường dẫn hình ảnh đã xóa
                if (this.deletedImages.length > 0) {
                    formData.append('deleteImage', JSON.stringify(this.deletedImages));
                }
                // Thêm hình ảnh mới (là các file, không phải link text)
                if (this.newImages.length > 0) {
                    for (const file of this.newImages) {
                        formData.append('HinhAnhSach', file); // Chỉ thêm file, không thêm link
                    }
                }

                const res = await fetch(`http://localhost:3001/api/book/${productId}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                    },
                    body: formData, // Gửi FormData
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataEditProducts: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }

                // Cập nhật danh sách sản phẩm sau khi chỉnh sửa
                const index = this.products.findIndex((product) => product._id === productId);
                if (index !== -1) {
                    this.products[index] = data.updatedProduct;
                }

                toast.success('Cập nhật thông tin sách thành công');
                this.closeEditProductModal();
            } catch (error) {
                console.error('Error adding product:', error);
                const toast = useToast();
                toast.error(error.message);
            } finally {
                this.loading = false;
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
                const staff = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staff.accessToken;

                const res = await fetch(`http://localhost:3001/api/book/${product._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${staffToken}`,
                    },
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataDeleteProducts: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                this.products.splice(
                    this.products.findIndex((p) => p._id === product._id),
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
    watch: {
        searchQuery() {
            this.resetToFirstPage();
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
    width: 20px; /* Giảm kích thước của loader */
    height: 20px;
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

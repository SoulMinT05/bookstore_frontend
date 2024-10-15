<template>
    <div class="container">
        <h1 class="text-3xl font-bold mb-6">User Management</h1>
        <!-- <button @click="addUser" class="mb-4 px-4 py-2 bg-green-500 text-white rounded-md">Add User</button> -->
        <button
            @click="showAddUserModal"
            type="button"
            class="text-white mb-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-150 ease-in-out"
        >
            Add User
        </button>

        <div class="overflow-x-auto bg-white shadow-md rounded-lg">
            <table class="w-full table-auto">
                <thead>
                    <tr class="text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">First Name</th>
                        <th class="py-3 px-6 text-left">Last Name</th>
                        <th class="py-3 px-6 text-left">Email</th>
                        <th class="py-3 px-6 text-center">Status</th>
                        <th class="py-3 px-6 text-center">Role</th>
                        <th class="py-3 px-6 text-center">Creation Date</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr
                        v-for="user in paginatedUsers"
                        :key="user.id"
                        class="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td class="py-3 px-6 text-left">
                            <span class="font-medium">{{ user.firstName }}</span>
                        </td>
                        <td class="py-3 px-6 text-left">
                            <span>{{ user.lastName }}</span>
                        </td>
                        <td class="py-3 px-6 text-left">
                            <span>{{ user.email }}</span>
                        </td>
                        <td class="px-6 py-4 flex justify-center items-center">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" v-model="user.isLocked" />
                                <div
                                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                                ></div>
                                <!-- <span class="ml-2 text-sm font-medium text-gray-900">{{
                                  user.isLocked ? 'Unlocked' : 'Locked'
                              }}</span> -->
                            </label>
                        </td>

                        <td class="py-3 px-6 text-center">
                            <span
                                :class="[
                                    user.role === 'Admin' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600',
                                    'py-1 px-3 rounded-full text-xs',
                                ]"
                            >
                                {{ user.role }}
                            </span>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <span>{{ user.createdAt }}</span>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center">
                                <button
                                    @click="viewUser(user)"
                                    class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 transition-all duration-300 z-50"
                                >
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button
                                    @click="editUser(user)"
                                    class="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110 transition-all duration-300"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button
                                    @click="deleteUser(user)"
                                    class="w-4 mr-2 transform hover:text-red-500 hover:scale-110 transition-all duration-300"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add user modal -->
        <div
            v-if="isAddUserModalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 class="text-lg font-bold mb-4">Add New User</h2>
                <form @submit.prevent="addUser">
                    <div class="mb-4">
                        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            v-model="newUser.firstName"
                            type="text"
                            id="firstName"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            v-model="newUser.lastName"
                            type="text"
                            id="lastName"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            v-model="newUser.email"
                            type="email"
                            id="email"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeAddUserModal"
                            class="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Add User</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- View detail user -->
        <div
            v-if="selectedUser"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            @click="closeModal"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 class="text-lg font-bold mb-4">User Details</h2>
                <p><strong>First Name:</strong> {{ selectedUser.firstName }}</p>
                <p><strong>Last Name:</strong> {{ selectedUser.lastName }}</p>
                <p><strong>Email:</strong> {{ selectedUser.email }}</p>
                <p><strong>Status:</strong> {{ selectedUser.isLocked ? 'Locked' : 'Unlocked' }}</p>
                <p><strong>Role:</strong> {{ selectedUser.role }}</p>
                <p><strong>Creation Date:</strong> {{ selectedUser.createdAt }}</p>
                <div class="mt-4">
                    <button @click="closeModal" class="text-white bg-blue-500 rounded-md px-4 py-2">Close</button>
                </div>
            </div>
        </div>

        <!-- Edit user modal -->
        <div
            v-if="isEditUserModalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 class="text-lg font-bold mb-4">Edit User</h2>
                <form @submit.prevent="saveEditedUser">
                    <div class="mb-4">
                        <label for="editFirstName" class="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            v-model="userToEdit.firstName"
                            type="text"
                            id="editFirstName"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editLastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            v-model="userToEdit.lastName"
                            type="text"
                            id="editLastName"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editEmail" class="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            v-model="userToEdit.email"
                            type="email"
                            id="editEmail"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeEditUserModal"
                            class="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="mt-4 flex justify-between">
            <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:opacity-95 transition duration-150 ease-in-out"
            >
                Previous
            </button>
            <span class="self-center">Page {{ currentPage }} of {{ totalPages }}</span>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:opacity-95 transition duration-150 ease-in-out"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [], // Dữ liệu người dùng
            newUser: { firstName: '', lastName: '', email: '' },
            isAddUserModalVisible: false,
            currentPage: 1, // Bắt đầu với trang đầu tiên
            pageSize: 10, // Hiển thị 10 người dùng mỗi trang
            selectedUser: null,
            userToEdit: null,
            isEditUserModalVisible: false, // For Edit User modal
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.users.length / this.pageSize);
        },
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.users.slice(start, start + this.pageSize);
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
        showAddUserModal() {
            this.isAddUserModalVisible = true;
        },
        closeAddUserModal() {
            this.isAddUserModalVisible = false;
            this.resetNewUser(); // Đặt lại thông tin người dùng mới sau khi đóng modal
        },
        resetNewUser() {
            this.newUser = { firstName: '', lastName: '', email: '' };
        },
        addUser() {
            // Thêm người dùng mới vào danh sách
            const newUser = {
                id: this.users.length + 1,
                firstName: this.newUser.firstName,
                lastName: this.newUser.lastName,
                email: this.newUser.email,
                isLocked: false, // Mặc định khóa là false
                role: 'User', // Mặc định role là User
                createdAt: new Date().toLocaleDateString(),
            };
            this.users.push(newUser); // Thêm người dùng mới vào danh sách
            this.closeAddUserModal(); // Đóng modal sau khi thêm người dùng
        },
        editUser(user) {
            this.userToEdit = { ...user }; // Make a copy of the user object to avoid directly modifying the array
            this.isEditUserModalVisible = true;
        },
        closeEditUserModal() {
            this.isEditUserModalVisible = false;
            this.userToEdit = null; // Clear the userToEdit data after closing the modal
        },
        saveEditedUser() {
            // Find the user in the users array and update its data
            const index = this.users.findIndex((u) => u.id === this.userToEdit.id);
            if (index !== -1) {
                this.users.splice(index, 1, this.userToEdit); // Replace the old user with the edited user
            }
            this.closeEditUserModal(); // Close the modal after saving
        },
        viewUser(user) {
            // Logic xem chi tiết người dùng
            this.selectedUser = user;
        },
        closeModal() {
            this.selectedUser = null;
        },

        deleteUser(user) {
            if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
                // Proceed with deletion
                this.users = this.users.filter((u) => u.id !== user.id);
            }
        },
    },
    mounted() {
        // Giả lập dữ liệu người dùng (thay thế bằng API gọi thực tế)
        this.users = Array.from({ length: 50 }, (_, index) => ({
            id: index + 1,
            firstName: `First ${index + 1}`,
            lastName: `Last ${index + 1}`,
            email: `user${index + 1}@example.com`,
            isLocked: false,
            role: index % 2 === 0 ? 'Admin' : 'User',
            createdAt: new Date().toLocaleDateString(),
        }));
    },
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh ở đây nếu cần */
</style>

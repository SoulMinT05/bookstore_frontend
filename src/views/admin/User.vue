<template>
    <div class="container">
        <h1 class="text-3xl font-bold mb-6">Quản lý độc giả</h1>
        <div class="flex justify-between items-center">
            <!-- <button
                @click="showAddUserModal"
                type="button"
                class="cursor-pointer text-white mb-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-150 ease-in-out"
            >
                Thêm người dùng
            </button> -->
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
                placeholder="Tìm kiếm người dùng..."
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
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('Ho')">
                            Họ
                            <span v-if="currentSort !== 'Ho'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'Ho' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'Ho' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('Ten')">
                            Tên
                            <span v-if="currentSort !== 'Ten'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'Ten' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'Ten' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-left cursor-pointer" @click="sortBy('email')">
                            Email
                            <span v-if="currentSort !== 'email'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'email' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'email' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-center cursor-pointer" @click="sortBy('isLocked')">
                            Trạng thái
                            <span v-if="currentSort !== 'isLocked'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'isLocked' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'isLocked' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-center cursor-pointer" @click="sortBy('ChucVu')">
                            Chức vụ
                            <span v-if="currentSort !== 'ChucVu'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'ChucVu' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'ChucVu' && currentSortDir === 'desc'" class="ml-2">
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
                        <th class="py-3 px-6 text-center cursor-pointer" @click="sortBy('updatedAt')">
                            Ngày cập nhật
                            <span v-if="currentSort !== 'updatedAt'" class="ml-2">
                                <i class="fas fa-sort"></i>
                            </span>
                            <span v-if="currentSort === 'updatedAt' && currentSortDir === 'asc'" class="ml-2">
                                <i class="fas fa-sort-up"></i>
                            </span>
                            <span v-if="currentSort === 'updatedAt' && currentSortDir === 'desc'" class="ml-2">
                                <i class="fas fa-sort-down"></i>
                            </span>
                        </th>
                        <th class="py-3 px-6 text-center cursor-pointer" @click="sortBy('updatedAt')">Hành động</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr
                        v-for="user in sortedAndPaginatedUsers"
                        :key="user.id"
                        class="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td class="py-3 px-6 text-left">
                            <span class="font-medium">{{ user.Ho }}</span>
                        </td>
                        <td class="py-3 px-6 text-left">
                            <span>{{ user.Ten }}</span>
                        </td>
                        <td class="py-3 px-6 text-left">
                            <span>{{ user.email }}</span>
                        </td>
                        <td class="px-6 py-4 flex justify-center items-center">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input
                                    v-model="user.isLocked"
                                    @click="toggleLockUser(user)"
                                    type="checkbox"
                                    class="sr-only peer"
                                />
                                <div
                                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                                ></div>
                            </label>
                        </td>

                        <td class="py-3 px-6 text-center">
                            <Badge
                                v-if="user.ChucVu === 'admin'"
                                class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
                                >Quản lý</Badge
                            >

                            <Badge
                                v-else-if="user.ChucVu === 'staff'"
                                class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs"
                                >Nhân viên</Badge
                            >

                            <Badge
                                v-else-if="user.ChucVu === 'user'"
                                class="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-xs"
                                >Người dùng</Badge
                            >
                        </td>
                        <td class="py-3 px-6 text-center">
                            <span>{{ formatDate(user.createdAt) }}</span>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <span>{{ formatDate(user.updatedAt) }}</span>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center">
                                <button
                                    @click="viewUser(user)"
                                    class="cursor-pointer hover:opacity-95 w-4 mr-2 transform hover:text-purple-500 hover:scale-110 transition-all duration-300 z-50"
                                >
                                    <i class="fas fa-eye"></i>
                                </button>
                                <!-- <button
                                    @click="editUser(user)"
                                    class="cursor-pointer hover:opacity-95 w-4 mr-2 transform hover:text-yellow-500 hover:scale-110 transition-all duration-300"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button
                                    @click="deleteUser(user)"
                                    class="cursor-pointer hover:opacity-95 w-4 mr-2 transform hover:text-red-500 hover:scale-110 transition-all duration-300"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button> -->
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
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 modal-content">
                <h2 class="text-lg font-bold mb-4">Thêm người dùng</h2>
                <form @submit.prevent="addUser">
                    <div class="mb-4">
                        <label for="Ho" class="block text-sm font-medium text-gray-700">Họ</label>
                        <input
                            v-model="newUser.Ho"
                            type="text"
                            id="Ho"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="Ten" class="block text-sm font-medium text-gray-700">Tên</label>
                        <input
                            v-model="newUser.Ten"
                            type="text"
                            id="Ten"
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
                    <div class="mb-4">
                        <label for="NgaySinh" class="block text-sm font-medium text-gray-700">Sinh nhật</label>
                        <input
                            type="date"
                            id="NgaySinh"
                            v-model="newUser.NgaySinh"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="DiaChi" class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <input
                            v-model="newUser.DiaChi"
                            type="text"
                            id="DiaChi"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="DienThoai" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <input
                            v-model="newUser.DienThoai"
                            type="text"
                            id="DienThoai"
                            aria-describedby="helper-text-explanation"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            pattern="[0-9]{10}"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="Phai" class="block text-sm font-medium text-gray-700">Giới tính</label>
                        <select
                            v-model="newUser.Phai"
                            id="Phai"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="" disabled selected>Choose a Phai</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="ChucVu" class="block text-sm font-medium text-gray-700">Chức vụ</label>
                        <select
                            v-model="newUser.ChucVu"
                            id="ChucVu"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="" disabled selected>Chức vụ</option>
                            <option v-if="currentChucVu === 'admin'" value="user">Người dùng</option>
                            <option v-if="currentChucVu === 'admin'" value="staff">Nhân viên</option>
                            <option v-if="currentChucVu === 'staff'" value="user">Người dùng</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input
                            v-model="newUser.password"
                            type="text"
                            id="password"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        <p class="text-sm italic text-gray-500 mt-1">Nếu không nhập, mật khẩu mặc định là '123456'</p>
                    </div>
                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeAddUserModal"
                            class="cursor-pointer hover:opacity-95 mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Đóng
                        </button>
                        <button
                            type="submit"
                            class="cursor-pointer hover:opacity-95 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Thêm người dùng
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- View detail user -->
        <div
            v-if="selectedUser"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-scroll"
        >
            <div @click.stop class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
                <h2 class="text-xl font-bold text-center mb-4">Thông tin người dùng</h2>
                <div class="space-y-2">
                    <p><strong>First Name:</strong> {{ selectedUser.Ho }}</p>
                    <p><strong>Last Name:</strong> {{ selectedUser.Ten }}</p>
                    <p><strong>Email:</strong> {{ selectedUser.email }}</p>
                    <p><strong>NgaySinh:</strong> {{ formatNgaySinhHtml(selectedUser.NgaySinh) }}</p>
                    <p><strong>DiaChi:</strong> {{ selectedUser.DiaChi }}</p>
                    <p><strong>Phai:</strong> {{ selectedUser.Phai }}</p>
                    <p><strong>Phone number:</strong> {{ selectedUser.DienThoai }}</p>
                    <p>
                        <strong>Tinh Trang:</strong>
                        <span
                            :class="[
                                selectedUser.isLocked
                                    ? 'bg-red-200 text-red-600' // Màu đỏ cho trạng thái đã khoá
                                    : 'bg-green-200 text-green-600', // Màu xanh cho trạng thái hoạt động
                                'py-1 px-3 rounded-full text-xs',
                            ]"
                        >
                            {{ selectedUser.isLocked ? 'Đã khoá' : 'Hoạt động' }}
                        </span>
                    </p>

                    <p>
                        <strong>ChucVu: </strong>
                        <span
                            :class="[
                                selectedUser.ChucVu === 'admin'
                                    ? 'bg-green-200 text-green-600' // Màu cho admin
                                    : selectedUser.ChucVu === 'staff'
                                      ? 'bg-blue-100 text-blue-800' // Màu cho staff
                                      : 'bg-yellow-100 text-yellow-800', // Màu cho người dùng
                                'py-1 px-3 rounded-full text-xs',
                            ]"
                        >
                            {{
                                selectedUser.ChucVu === 'admin'
                                    ? 'Quản lý'
                                    : selectedUser.ChucVu === 'staff'
                                      ? 'Nhân viên'
                                      : 'Người dùng'
                            }}
                        </span>
                    </p>
                    <!-- <p>
                        <strong>ChucVu:</strong>
                        <span :class="selectedUser.ChucVu === 'admin' ? 'text-blue-500' : 'text-yellow-500'">
                            {{ selectedUser.ChucVu === 'admin' ? 'Quản lý' : 'Người dùng' }}
                        </span>
                    </p> -->

                    <p><strong>Created Date:</strong> {{ formatDate(selectedUser.createdAt) }}</p>
                    <p><strong>Updated Date:</strong> {{ formatDate(selectedUser.updatedAt) }}</p>
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

        <!-- Edit user modal -->
        <div
            v-if="isEditUserModalVisible"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div class="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 modal-content">
                <h2 class="text-lg font-bold mb-4">Chỉnh sửa thông tin người dùng</h2>
                <form @submit.prevent="saveEditedUser">
                    <div class="mb-4">
                        <label for="editHo" class="block text-sm font-medium text-gray-700">Họ</label>
                        <input
                            v-model="userToEdit.Ho"
                            type="text"
                            id="editHo"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editTen" class="block text-sm font-medium text-gray-700">Tên</label>
                        <input
                            v-model="userToEdit.Ten"
                            type="text"
                            id="editTen"
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
                    <div class="mb-4">
                        <label for="editNgaySinh" class="block text-sm font-medium text-gray-700">Sinh nhật</label>
                        <input
                            v-model="userToEdit.NgaySinh"
                            type="date"
                            id="editNgaySinh"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div class="mb-4">
                        <label for="editDiaChi" class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <input
                            v-model="userToEdit.DiaChi"
                            type="text"
                            id="editDiaChi"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editDienThoai" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <input
                            v-model="userToEdit.DienThoai"
                            type="text"
                            id="editDienThoai"
                            aria-describedby="helper-text-explanation"
                            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            pattern="[0-9]{10}"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="editPhai" class="block text-sm font-medium text-gray-700">Giới tính</label>
                        <select
                            v-model="userToEdit.Phai"
                            id="Phai"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="" disabled selected>Choose a Phai</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="ChucVu" class="block text-sm font-medium text-gray-700">Chức vụ</label>
                        <template v-if="currentChucVu === 'staff'">
                            <span
                                class="block p-2.5 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                {{
                                    userToEdit.ChucVu === 'staff'
                                        ? 'Nhân viên'
                                        : userToEdit.ChucVu === 'admin'
                                          ? 'Quản lý'
                                          : 'Người dùng'
                                }}
                            </span>
                        </template>
                        <!-- <template v-else>

                            <select
                                v-model="userToEdit.ChucVu"
                                id="ChucVu"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="" disabled selected>Chọn ChucVu</option>
                                <option value="user">Người dùng</option>
                                <option value="staff">Nhân viên</option>
                            </select>
                        </template> -->
                        <template v-if="userToEdit.ChucVu === 'admin'">
                            <span
                                class="block p-2.5 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                Quản lý
                            </span>
                        </template>
                        <template v-else>
                            <!-- Nếu là admin và không phải là admin đang được chỉnh sửa, cho phép chọn ChucVu -->
                            <select
                                v-model="userToEdit.ChucVu"
                                id="ChucVu"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="" disabled selected>Chọn ChucVu</option>
                                <option value="user">Người dùng</option>
                                <option value="staff">Nhân viên</option>
                            </select>
                        </template>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button
                            type="button"
                            @click="closeEditUserModal"
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

<script>
import { useToast } from 'vue-toastification';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-vue-next';

import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LucideArrowUp, LucideArrowDown, MoveUp, MoveDown } from 'lucide-vue-next';

export default {
    data() {
        return {
            users: [], // Dữ liệu người dùng
            currentSort: '', // Cột hiện tại để sắp xếp
            currentSortDir: 'asc',
            newUser: {
                Ho: '',
                Ten: '',
                email: '',
                NgaySinh: null,
                DiaChi: '',
                DienThoai: '',
                Phai: '',
                password: '',
                ChucVu: '',
            },
            currentChucVu: 'staff',
            searchQuery: '',
            isAddUserModalVisible: false,
            currentPage: 1, // Bắt đầu với trang đầu tiên
            pageSize: 10, // Hiển thị 10 người dùng mỗi trang
            selectedUser: null,
            userToEdit: null,
            isEditUserModalVisible: false, // For Edit User modal
            isLoading: false,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredUsers.length / this.pageSize);
        },
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.filteredUsers.slice(start, start + this.pageSize);
        },
        sortedAndPaginatedUsers() {
            // Sắp xếp dữ liệu
            const sortedUsers = this.sortedUsers;

            // Tính toán các chỉ số phân trang
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;

            // Trả về dữ liệu phân trang sau khi đã sắp xếp
            return sortedUsers.slice(start, end);
        },
        sortedUsers() {
            // If no sort column is specified, return the users array as is
            const usersToSort = this.filteredUsers;
            if (!this.currentSort) {
                return usersToSort;
            }

            const direction = this.currentSortDir === 'asc' ? 1 : -1;
            return [...usersToSort].sort((a, b) => {
                const valueA = a[this.currentSort];
                const valueB = b[this.currentSort];

                if (valueA < valueB) return -1 * direction;
                if (valueA > valueB) return 1 * direction;
                return 0;
            });
        },
        filteredUsers() {
            const searchQuery = this.searchQuery.toLowerCase().trim().replace(/\//g, '');

            const ChucVuMap = {
                'nhân viên': 'staff',
                'quản lý': 'admin',
                'người dùng': 'user',
            };

            const normalizedSearchQuery = ChucVuMap[searchQuery] || searchQuery;
            return this.users.filter((user) => {
                const Ho = user.Ho ? user.Ho.toLowerCase() : '';
                const Ten = user.Ten ? user.Ten.toLowerCase() : '';
                const email = user.email ? user.email?.toLowerCase() : '';
                const ChucVu = user.ChucVu ? user.ChucVu?.toLowerCase() : '';

                const createdAt = user.createdAt ? new Date(user.createdAt) : null;
                const updatedAt = user.updatedAt ? new Date(user.updatedAt) : null;

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

                return (
                    Ho.includes(searchQuery.toLowerCase()) ||
                    Ten.includes(searchQuery.toLowerCase()) ||
                    email.includes(searchQuery.toLowerCase()) ||
                    ChucVu.includes(normalizedSearchQuery) ||
                    formattedCreatedAt.includes(searchQuery) ||
                    formattedUpdatedAt.includes(searchQuery)
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
        formatDate(date) {
            // const createdAtDate = new Date(date); // Tạo đối tượng Date
            // return createdAtDate.toGMTString(); // Chuyển đổi thành chuỗi GMT
            const d = new Date(date);
            const year = d.getUTCFullYear();
            const month = String(d.getUTCMonth() + 1).padStart(2, '0');
            const day = String(d.getUTCDate()).padStart(2, '0');

            return `${day}/${month}/${year}`;
        },
        formatNgaySinhHtml(dateString) {
            if (!dateString) return ''; // Trả về chuỗi rỗng nếu không có ngày sinh
            const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
            const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm 0 nếu cần
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0)
            const year = date.getFullYear(); // Lấy năm
            return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
        },
        formatNgaySinh(NgaySinh) {
            if (!NgaySinh) return '';
            const date = new Date(NgaySinh); // Chuyển đổi thành đối tượng Date
            if (isNaN(date)) return ''; // Kiểm tra nếu ngày không hợp lệ
            const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng 0-11)
            const year = date.getFullYear(); // Lấy năm
            return `${year}-${month}-${day}`;
        },
        exportToExcel() {
            // Tạo một workbook mới
            const wb = XLSX.utils.book_new();

            // Chuyển đổi dữ liệu người dùng thành bảng
            const ws = XLSX.utils.json_to_sheet(this.users);

            // Thêm bảng vào workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Users');

            // Tạo tên file
            const fileName = `users_${new Date().toISOString().split('T')[0]}.xlsx`;

            // Xuất file
            XLSX.writeFile(wb, fileName);
        },
        async fetchUsers() {
            this.isLoading = true;
            try {
                const staff = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staff.accessToken;
                const res = await fetch('http://localhost:3001/api/user/getAllUsers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${staffToken}`,
                    },
                });
                const data = await res.json();
                const toast = useToast();
                console.log('dataUsers: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                this.users = data.users;
            } catch (error) {
                console.log('error: ', error);
                toast.error(error.message);
            } finally {
                this.isLoading = false;
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
            this.newUser = {
                Ho: '',
                Ten: '',
                email: '',
                NgaySinh: null,
                DiaChi: '',
                DienThoai: '',
                Phai: '',
                password: '',
                ChucVu: '',
            };
        },
        async addUser() {
            try {
                const staff = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staff.accessToken;
                const res = await fetch('http://localhost:3001/api/user/createUserFromAdmin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${staffToken}`,
                    },
                    body: JSON.stringify(this.newUser),
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataAddUsers: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                this.users.push(data.newUser);
                // this.showToast('Thêm người dùng thành công');
                toast.success('Thêm người dùng thành công');
                this.closeAddUserModal();
            } catch (error) {
                console.error('Error adding user:', error);
                toast.error(error.message);
            }
        },

        editUser(user) {
            console.log('User to edit:', user);
            this.userToEdit = { ...user }; // Make a copy of the user object to avoid directly modifying the array
            this.userToEdit.NgaySinh = this.formatNgaySinh(user.NgaySinh);
            console.log('Converted NgaySinh for edit:', this.userToEdit.NgaySinh);
            this.isEditUserModalVisible = true;
        },
        closeEditUserModal() {
            this.isEditUserModalVisible = false;
            this.userToEdit = null; // Clear the userToEdit data after closing the modal
        },
        async saveEditedUser() {
            try {
                const staff = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staff.accessToken;

                // Lấy userId từ userToEdit
                const userId = this.userToEdit._id;
                const res = await fetch(`http://localhost:3001/api/user/updateInfoFromAdmin/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${staffToken}`,
                    },
                    body: JSON.stringify(this.userToEdit),
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataEditUsers: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                // Cập nhật danh sách users sau khi chỉnh sửa
                const index = this.users.findIndex((user) => user._id === userId);
                if (index !== -1) {
                    // this.$set(this.users, index, data.updatedUser); // Cập nhật thông tin user đã sửa
                    this.users[index] = data.updatedUser;
                }

                toast.success('Cập nhật thông tin người dùng thành công');
                this.closeEditUserModal();
            } catch (error) {
                console.error('Error adding user:', error);
                toast.error(error.message);
            }
        },
        viewUser(user) {
            // Logic xem chi tiết người dùng
            this.selectedUser = user;
        },
        closeModal() {
            this.selectedUser = null;
        },

        async deleteUser(user) {
            if (!confirm('Bạn chắc chắn xoá người dùng này không?')) return;
            try {
                const staffLocalStorage = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staffLocalStorage.accessToken;

                const res = await fetch(`http://localhost:3001/api/user/${user._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${staffToken}`,
                    },
                });

                const data = await res.json();
                const toast = useToast();
                console.log('dataDeleteUsers: ', data);

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                this.users.splice(
                    this.users.findIndex((u) => u._id === user._id),
                    1,
                );
                toast.success('Xoá người dùng thành công');
            } catch (error) {
                console.error('Error deleting user:', error.message);
                toast.error('Error deleting user: ', error.message);
            }
        },

        async toggleLockUser(user) {
            try {
                const staffLocalStorage = JSON.parse(localStorage.getItem('staff'));
                const staffToken = staffLocalStorage.accessToken;

                const res = await fetch(`http://localhost:3001/api/user/locked/${user._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${staffToken}`,
                    },
                });

                const data = await res.json();
                console.log('dataLocked: ', data);
                const toast = useToast();

                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                toast.success(`${user.isLocked ? 'Khoá' : 'Mở khoá'} tài khoản người dùng thành công`);
            } catch (error) {
                console.error('Error locking/unlocking user:', error.message);
                toast.error('Failed to toggle lock state');
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
        this.fetchUsers();
        const staffLocalStorage = JSON.parse(localStorage.getItem('staff'));
        console.log('staffLocalStorage: ', staffLocalStorage);
        // const currentUserChucVu = staffLocalStorage.userData.ChucVu;
        const currentUserChucVu =
            staffLocalStorage && staffLocalStorage.userData ? staffLocalStorage.userData.ChucVu : 'staff';
        console.log('currentUserChucVu: ', currentUserChucVu);
        this.currentChucVu = currentUserChucVu;
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

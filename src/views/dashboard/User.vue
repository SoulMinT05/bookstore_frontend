<template>
  <div class="p-4">
    <!-- <h1 class="text-2xl font-bold">Quản lý người dùng</h1>
    <button @click="openAddUserModal" class="bg-blue-500 text-white px-4 py-2 rounded">
      Thêm người dùng
    </button> -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Quản lý người dùng</h1>
      <button
        @click="openAddUserModal"
        class="hover:opacity-90 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm người dùng
      </button>
    </div>

    <table class="min-w-full mt-4 border">
      <thead>
        <tr>
          <th class="border px-4 py-2">Firstname</th>
          <th class="border px-4 py-2">Lastname</th>
          <th class="border px-4 py-2">Email</th>
          <th class="border px-4 py-2">Địa chỉ</th>
          <th class="border px-4 py-2">Vai trò</th>
          <th class="border px-4 py-2">Trạng thái</th>
          <th class="border px-4 py-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="border px-4 py-2 text-center align-middle">{{ user.firstName }}</td>
          <td class="border px-4 py-2 text-center align-middle">{{ user.lastName }}</td>
          <td class="border px-4 py-2 text-center align-middle">{{ user.email }}</td>
          <td class="border px-4 py-2 text-center align-middle">{{ user.address }}</td>
          <td class="border px-4 py-2 text-center align-middle">
            {{ user.role === 'user' ? 'Người dùng' : 'Quản lý' }}
          </td>
          <td class="border px-4 py-2 text-center align-middle">
            <span
              class="inline-block px-3 py-1 text-white rounded"
              :class="user.isBlocked ? 'bg-red-500' : 'bg-green-500'"
            >
              {{ user.isBlocked ? 'Blocked' : 'Active' }}
            </span>
          </td>
          <td class="border px-4 py-2 text-center align-middle">
            <button @click="viewUser(user.id)" class="text-blue-500">View</button>
            <button @click="editUser(user.id)" class="text-yellow-500 ml-2">Edit</button>
            <button @click="deleteUser(user.id)" class="text-red-500 ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add User Modal (Example) -->
    <div
      v-if="isAddUserModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded shadow-md w-96 h-auto max-h-[80vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">Thêm người dùng</h2>
        <form @submit.prevent="addUser">
          <div class="mb-4">
            <label for="firstName" class="block">Firstname</label>
            <input
              v-model="newUser.firstName"
              id="firstName"
              class="border w-full p-2"
              type="text"
              required
            />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block">Lastname</label>
            <input
              v-model="newUser.lastName"
              id="lastName"
              class="border w-full p-2"
              type="text"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block">Email</label>
            <input
              v-model="newUser.email"
              id="email"
              class="border w-full p-2"
              type="email"
              required
            />
          </div>
          <div class="mb-4">
            <label for="address" class="block">Địa chỉ</label>
            <input
              v-model="newUser.address"
              id="address"
              class="border w-full p-2"
              type="text"
              required
            />
          </div>
          <div class="mb-4">
            <label for="role" class="block">Vai trò</label>
            <input v-model="newUser.role" id="role" class="border w-full p-2" type="text" />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="hover:opacity-80 bg-blue-500 text-white px-4 py-2 rounded">
              Xác nhận
            </button>
            <button
              @click="closeAddUserModal"
              class="hover:opacity-80 bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Huỷ bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          firstName: 'user1',
          lastName: 'user1',
          email: 'user1@example.com',
          address: '123 Main St',
          role: 'user',
          isBlocked: false
        },
        {
          id: 2,
          firstName: 'user2',
          lastName: 'user2',
          email: 'user2@example.com',
          address: '456 Elm St',
          role: 'admin',
          isBlocked: true
        }
        // Thêm dữ liệu người dùng mẫu khác ở đây
      ],
      isAddUserModalOpen: false,
      newUser: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        role: ''
      }
    }
  },
  methods: {
    openAddUserModal() {
      this.isAddUserModalOpen = true
    },
    closeAddUserModal() {
      this.isAddUserModalOpen = false
      this.newUser = { firstName: '', lastName: '', email: '', address: '', role: '' } // Reset form
    },
    addUser() {
      const newUser = {
        id: this.users.length + 1,
        ...this.newUser,
        isBlocked: false
      }
      this.users.push(newUser)
      this.closeAddUserModal()
    },
    viewUser(userId) {
      // Logic để xem thông tin người dùng
      alert(`Viewing user: ${userId}`)
    },
    editUser(userId) {
      // Logic để sửa thông tin người dùng
      alert(`Editing user: ${userId}`)
    },
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId)
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>

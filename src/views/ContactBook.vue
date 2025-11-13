<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <div v-if="activeContact">
  <ContactCard :contact="activeContact" />
  <router-link 
    :to="{ name: 'contact.edit', params: { id: activeContact._id } }" 
    class="btn btn-warning btn-sm mt-3 d-block"
  >
    <i class="fas fa-edit"></i> Hiệu chỉnh
  </router-link>
</div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

h4 {
  color: #495057;
  font-weight: 600;
  margin-bottom: 15px;
}

.list-group-item {
  border: none;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
  font-weight: 500;
}

.list-group-item:hover {
  background-color: #e3f2fd;
  transform: translateX(5px);
}

.list-group-item.active {
  background-color: #2196f3 !important;
  color: white;
  font-weight: bold;
}

.btn {
  border-radius: 6px;
  font-weight: 500;
  padding: 8px 16px;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.btn-primary { background-color: #007bff; border: none; }
.btn-success { background-color: #28a745; border: none; }
.btn-danger { background-color: #dc3545; border: none; }

.btn-primary:hover { background-color: #0056b3; }
.btn-success:hover { background-color: #218838; }
.btn-danger:hover { background-color: #c82333; }

.contact-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-size: 1rem;
}

.contact-card strong {
  color: #495057;
}

.fa-check { color: #28a745; }
.fa-times { color: #dc3545; }
</style>

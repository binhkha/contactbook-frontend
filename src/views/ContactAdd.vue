<template>
  <div class="page">
    <h4 class="mb-4">Thêm Liên hệ mới</h4>
    <ContactForm :contact="newContact" @submit:contact="addContact" />
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: { ContactForm },
  data() {
    return {
      newContact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
    };
  },
  methods: {
    async addContact(data) {
      try {
        await ContactService.create(data);
        alert("Thêm liên hệ thành công!");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.error("Lỗi khi thêm:", error);
        alert("Lỗi: Không thể thêm liên hệ. Kiểm tra backend.");
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>
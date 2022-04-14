<template>
  <div class="home">
    <nav-bar :stickyMode="stickyMode" @onOpenLoginModal="openLoginModal" @onLogout="logout"/>
    <router-view />
    <login-modal v-if="isLoginModalOpen" :isOpen="isLoginModalOpen" @onCloseModal="closeLoginModal"/>

    <div class="bp-main-container">
      <section class="main-top-section">
        <p>socialLogin</p>
        <p v-if='isLoggedIn'> userName : {{username}} </p>
        <p v-if='isLoggedIn'> role : {{roleType}} </p>
      </section>
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import LoginModal from "@/components/LoginModal";
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "Home",
  components: { NavBar, LoginModal },
  data() {
    return {
      isLoginModalOpen: false,
      isScrollTop: true,
    };
  },
  created() {
    window.addEventListener("scroll", () => {
      this.isScrollTop = window.scrollY === 0;
    });
    window.onload=function(){
      console.log("웩")
      console.log(process.env.VUE_APP_BACKEND_DOMAIN==null)
    }
  },
  methods: {
    ...mapMutations(['setToken', 'setUser']),
    openLoginModal() {
      this.isLoginModalOpen = true;
      //////////////////////////////////////////////////////////////

      console.log(location);
    },
    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
      alert("로그아웃 되었습니다.");
      if (this.$route.path !== "/") this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(['token', 'user']),
    stickyMode() {
      return !(this.isScrollTop && this.$route.path === "/");
    },
    isLoggedIn () {
      return this.token != null
    },
    isAdmin () {
      return this.user && this.user.roleType === 'ADMIN'
    },
    username () {
      if (!this.user) return ''
      return this.user.username
    },
    roleType () {
      if (!this.user) return ''
      return this.user.roleType
    }
  },
};
</script>

<style scoped>
.bp-main-container .main-top-section {
  width: 100%;
  height: 320px;
  padding-top: 5rem;
}

@media screen and (min-width: 768px) {
  .bp-main-container .main-top-section .slogan-container {
    padding-top: 70px;
  }
}
</style>
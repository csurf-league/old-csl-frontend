<template>
  <header class="header">
    <div class="header-content">
      <nav class="header-nav">
        <div class="header-nav__first first">
          <NuxtLink to="/" class="first__logo">Home</NuxtLink>
        </div>
        <div class="header-nav__second second">
          <ul class="second__list">
            <li v-if="!useUserStore().isLoggedIn">
              <a class="second__signin" :href="config.API_URL + '/login'"> Sign In </a>
            </li>
            <li v-else>
              <span class="second__is-logged">IsLogged as {{ useUserStore().userInfo?.personaname || '' }}</span>
              <button class="second__logout" @click="useUserStore().removeUserSettings()">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user'
const config = useRuntimeConfig()
</script>

<style scoped lang="scss">
.header {
  --tw-gradient-from: var(--color-header-highlight-bg);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, hsla(0, 0%, 100%, 0));
  --tw-gradient-to: var(--color-header-bg);
  background-color: var(--color-header-bg);
  background-image: linear-gradient(to top right, var(--tw-gradient-stops));

  border-bottom: 2px solid var(--color-border);

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  height: var(--header-height);
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 25;
}
.header-content {
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.header-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 100%;
  width: 100%;

  &__first {
    .first {
      &__logo {
        color: var(--color-header);
        text-decoration: none;
      }
    }
  }

  &__second {
    .second {
      &__list {
        list-style: none;
      }

      &__is-logged {
        color: var(--color-header);
        font-size: 1rem;
      }

      &__signin {
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-header);
        text-decoration: none;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 60px;
        height: 30px;
        background-color: var(--color-highlight);
        border-radius: 5px;

        color: var(--color-header);
      }

      &__logout {
        color: tomato;
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
}
</style>

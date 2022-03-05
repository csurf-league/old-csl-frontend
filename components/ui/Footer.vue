<template>
  <footer class="footer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path
        d="m0 64 24 5.3C48 75 96 85 144 74.7 192 64 240 32 288 48c48 16 96 80 144 122.7C480 213 528 235 576 240s96-5 144-48S816 75 864 58.7c48-15.7 96 26.3 144 32 48 5.3 96-26.7 144-16 48 10.3 96 64.3 144 64 48 .3 96-53.7 120-80l24-26.7v288H0Z"
      ></path>
    </svg>
    <div class="footer-content"></div>
  </footer>
</template>

<script lang="ts"></script>

<style lang="scss">
.footer {
  font-size: 0;
  height: var(--footer-height);
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  z-index: 10;

  svg {
    fill: var(--color-header-bg);
    height: var(--footer-height-wave);
    width: 100%;
  }
}

.footer-content {
  align-items: center;
  background-color: var(--color-header-bg);
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  height: var(--footer-height-content);
  justify-content: center;
  width: 100%;
}
</style>

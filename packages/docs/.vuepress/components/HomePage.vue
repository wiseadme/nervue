<script>

</script>
<template>
  <div class="home-page">
    <div class="container">
      <div class="main">
        <h1 class="main__head">
          <span class="main__head-title">Nervue</span>
        </h1>
        <div class="main__text">Vue composition API compatible state manager library</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .home-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    min-height: 300px;
  }

  .main__head-title {
    font-size: 6rem;
    background: -webkit-linear-gradient(315deg, var(--c-brand) 25%, var(--c-brand-light));
    background-clip: text;
    font-weight: 700;
    font-family: 'Orbitron', sans-serif;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .main__text {
    text-align: center;
    padding: 5px 0;
  }
</style>

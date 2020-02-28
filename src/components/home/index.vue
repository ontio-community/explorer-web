<template>
  <div class="home">
    <!-- <header-div></header-div> -->
    <banner-div></banner-div>
    <search-div></search-div>
    <blockline-div></blockline-div>
    <overview-div></overview-div>
    <lastdata-div></lastdata-div>
    <!-- <footer-div></footer-div> -->
  </div>
</template>

<script>
/* import headerDiv from '../common/header' */
import bannerDiv from './banner'
import searchDiv from './search'
import blocklineDiv from './blockline'
import overviewDiv from './overview'
import lastdataDiv from './lastdata'
/* import footerDiv from '../common/footer' */
export default {
  components: {
    /* headerDiv, */
    bannerDiv,
    searchDiv,
    blocklineDiv,
    overviewDiv,
    lastdataDiv,
    /* footerDiv */
  }
}
</script>

<style lang="less" scoped>

@media only screen and (max-width:960px) {
  .home{
    padding: 0 25px;
  }
}
</style>

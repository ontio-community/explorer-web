<template>
  <div>
    <div class="mobile_Top_nav" ref="mobile_Top_nav">
      <div class="top_title shadowb" id="shadowb_title">
        <div class="show_nav" ref="show_nav" @click="showNav">
          <i></i>
          <i></i>
        </div>
        <img src="../../assets/images/common/smalllogo.svg" alt @click="toOnt()" />
      </div>
      <div class="top_nav_box" id="top_nav_box">
        <MobileNav class="mobile_footer_nav" @showNav="showNav" :navData="navData" :isShowLang="isShowLang" />
      </div>
    </div>
  </div>
</template>

<script>
import MobileNav from './MobileNav.vue'
import $ from 'jquery'

export default {
  data () {
    return {
      isShow: false,
      isShowLang: true
    }
  },
  methods: {
    toOnt() {
      // window.location.href = 'https://ont.io/'
      window.open('https://ont.io/', '_blank')
    },
    showNav () {
      if (this.isShow) {
        $('#app').removeClass('ohapp')
        this.$refs.show_nav.classList.remove('isactive')
        this.$refs.mobile_Top_nav.classList.remove('isheight')
        this.isShow = false
        $('#top_nav_box').slideUp()
        $('#top_nav_box').removeClass('openbg')
        $('#shadowb_title').addClass('shadowb')
      } else {
        $('#app').addClass('ohapp')
        this.$refs.show_nav.classList.add('isactive')
        this.$refs.mobile_Top_nav.classList.add('isheight')
        this.isShow = true
        $('#top_nav_box').slideDown()
        $('#top_nav_box').addClass('openbg')
        $('#shadowb_title').removeClass('shadowb')
      }
    },
    toIndex () {
      this.$router.push({ path: '/' })
    }
  },
  components: {
    MobileNav
  },
  props: ['navData']
}
</script>

<style lang="less" scoped>

.mobile_Top_nav {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 0;
  transition: background-color 0.6s;
  z-index: 105;
  .top_title {
    padding: 18px 18px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    position: relative;
    img {
      display: block;
      height: 20px;
      cursor: pointer;
      transform: translateX(4px);
    }
    padding-right: 27px;
  }
  .top_title.shadowb {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  }
  .show_nav {
    width: 18px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    i {
      display: block;
      width: 18px;
      height: 2px;
      border-radius: 1px;
      background: #000;
      transition: all 0.3s ease-in-out;
    }
  }
  .show_nav.isactive {
    i:nth-of-type(1) {
      transform: translateY(5px) rotate(45deg);
    }
    i:nth-of-type(2) {
      transform: translateY(-3px) rotate(-45deg);
    }
  }
  .top_nav_box {
    background: #fff;
    display: none;
    padding-bottom: 20px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .top_nav_box.openbg {
    opacity: 1;
  }
}
.mobile_Top_nav.isheight {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

</style>

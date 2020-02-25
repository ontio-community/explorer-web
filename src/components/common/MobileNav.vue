<template>
  <div class="mobile_nav">
    <div class="link_box">
      <div
        class="top_link"
        @click="gopageNav(item)"
        v-for="(item, index) in navData"
        :key="index"
      >{{item.title}}</div>
    </div>
    <el-collapse accordion>
      <!-- <el-collapse-item v-for="(item, index) in navData" :key="index">
        <template slot="title">{{item.title}}</template>
        <div
          :class="item.isAbout ? 'nav_item isAbout': 'nav_item'"
          v-for="(ele, idx) in item.list"
          :key="idx"
        >
          <div @click="gopageNav(ele)" class="mobile_link">
            {{ele.text}}
            <img
              v-if="ele.url.indexOf('dapp')>-1"
              class="nav-wailian-img"
              src="../../assets/images/wailian.svg"
            />
          </div>
        </div>
      </el-collapse-item> -->
      <el-collapse-item v-if="isShowLang">
        <template slot="title">{{this.$i18n.locale | langStyle}}</template>
        <div class="nav_item">
          <a href @click.prevent="changeLang('ch')">中文</a>
        </div>
        <div class="nav_item">
          <a href @click.prevent="changeLang('en')">English</a>
        </div>
        <div class="nav_item">
          <a href @click.prevent="changeLang('ko')">한국어</a>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import LangStorage from '../../helpers/lang'
import $ from 'jquery'

export default {
  data() {
    return {
    }
  },
  props: ['navData', 'isShowLang'],
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang
      LangStorage.setLang(this.$i18n.locale)
      let self = this
      this.$emit('showNav')
      $('html,body').animate({ 'scrollTop': 0 }, 1)
      setTimeout(() => {
        self.$router.go(0)
      }, 200)
    },
    // gopageNav(data) {
    //   // console.log(data)
    //   if (data.blok) {
    //     window.open(data.url)
    //   } else {
    //     this.$router.push({ path: data.url })
    //     this.$emit('showNav')
    //     this.$forceUpdate()
    //   }
    // },
    gopageNav(data) {
      this.$router.push({ path: data.url })
      this.$emit('showNav')
      this.$forceUpdate()
    },
  },
  filters: {
    langStyle: function (value) {
      if (value === 'en') {
        return 'English'
      } else if (value === 'ch') {
        return '中文'
      } else {
        return '한국어'
      }
    }
  },
  mounted() {
    // console.log('navData', this.navData)
  }
}
</script>

<style lang="less" scoped>
.mobile_nav {
  padding: 0 20px;
  .link_box {
    .top_link {
      font-size: 14px;
      color: #000 !important;
      font-weight: 600;
      height: 56px;
      line-height: 56px;
      border-bottom: none !important;
      border-bottom: 1px solid #fafafa !important;
    }
  }
  .nav_item {
    .mobile_link,
    a {
      display: block;
      line-height: 16px;
      padding-bottom: 24px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 13px;
      text-align: left;
      transition: all 0.5s ease;
      &:hover {
        opacity: 0.7;
      }
      .nav-wailian-img {
        width: 11px;
        margin-left: 4px;
        opacity: 0.6;
        // display: none;
      }
    }
  }
  .isAbout {
    .mobile_link {
      .nav-wailian-img {
        // display: inline-block;
      }
    }
  }
  .el-collapse {
    border-top: none;
  }
  /deep/ .el-collapse-item__header {
    font-size: 14px;
    color: #000 !important;
    font-weight: 600;
    // font-family: Roboto-Medium;
    height: 56px;
    line-height: 56px;
    border-bottom: none !important;
    .el-icon-arrow-right {
      opacity: 0.1;
    }
    .el-icon-arrow-right:before {
      content: "";
      color: #000;
      // font-weight: bold;
    }
    .el-collapse-item__arrow.is-active {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  /deep/ .el-collapse-item__wrap {
    border-bottom: none !important;
  }
  /deep/ .el-collapse-item__header.is-active {
    border-bottom: none !important;
  }
  /deep/ .el-collapse-item {
    border-bottom: 1px solid #fafafa !important;
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
  /deep/ .el-collapse-item:nth-last-of-type(1) {
    border-bottom: none !important;
    .el-collapse-item__header {
      border-bottom: none;
    }
    .el-collapse-item__wrap {
      border-bottom: none;
    }
  }
}
</style>

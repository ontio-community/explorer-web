<template>
  <div class="home_footer">
    <div class="footer_box home_contanier">
      <MobileFooterNav class="mobile_footer_nav" :navData="form.navData" :isShowLang="isShowLang" />
      <div class="share_link">
        <a href="https://twitter.com/OntologyNetwork" target="_blank" class="hover1"></a>
        <a
          href="https://www.facebook.com/Ontology-Network-468098413590227/"
          target="_blank"
          class="hover1"
        ></a>
        <a href="https://medium.com/ontologynetwork" target="_blank" class="hover1"></a>
        <a href="https://t.me/OntologyNetwork" target="_blank" class="hover1"></a>
        <a
          href="https://www.youtube.com/channel/UCXzLZJgDglAWRU0b2GOa7pA"
          target="_blank"
          class="hover1"
        ></a>
        <a
          href="https://www.linkedin.com/company/ontology-network-official/"
          target="_blank"
          class="hover1"
        ></a>
        <a href="https://open.kakao.com/o/gMm1F05" target="_blank" class="hover1"></a>
      </div>
      <div class="copyright">&#169; 2018 - 2019 Ontology. All rights reserved</div>
    </div>
  </div>
</template>

<script>
import MobileFooterNav from "./MobileFooterNav.vue";

export default {
  methods: {
    openNewPage(url) {
      window.open(url);
    },
    getData() {
      let self = this;
      let par = {
        type: "footer",
        language: self.value
      };
      let url = "api/api-query-data";
      this.$http.post(url, par).then(res => {
        console.log("resfooter.data", res);
        if (res.status === 200) {
          res.data.map((item, index) => {
            // 관하여
            if (
              item.title === "关于" ||
              item.title === "About" ||
              item.title === "관하여"
            ) {
              item.isAbout = true;
            }
          });
          self.form.navData = this.filterData(res.data);
          this.$nextTick(() => {
            //   this.routeChange()
          });
        }
      });
    },
    gopageNav(data) {
      // console.log(data)
      if (data.blok) {
        window.open(data.url);
      } else {
        this.$router.push({ path: data.url });
      }
    },
    filterData(data) {
      data.map((value, index) => {
        value.list.map((ele, idx) => {
          if (ele.url === "/aboutus") {
            ele.url = "https://ont.io" + ele.url;
            ele.blok = true;
          }
          if (ele.url === "/contactUs") {
            ele.url = "https://ont.io" + ele.url;
            ele.blok = true;
          }
        });
      });
      return data;
    }
  },
  components: {
    MobileFooterNav
  },
  data() {
    return {
      navData: [
        {
          title: "Developer Center",
          navList: [
            {
              name: "Documentation",
              url: "https://ontio.github.io/documentation/wp_download_en.html"
            },
            {
              name: "Github",
              url: "https://github.com/ontio-ontid"
            }
          ]
        },
        {
          title: "Cooperation",
          navList: [
            {
              name: "Cooperate with Ontology",
              url: "https://ont.io/contactUs"
            },
            {
              name: "Trust Anchor",
              url: "https://info.ont.io/trust-anchor/en"
            }
          ]
        },
        {
          title: "Wallets",
          navList: [
            {
              name: "ONTO",
              url: "https://onto.app/"
            },
            {
              name: "OWallet",
              url: "https://github.com/ontio/owallet"
            }
          ]
        },
        {
          title: "DApps",
          navList: [
            {
              name: "DApps List",
              url: "https://dapp.ont.io/"
            },
            {
              name: "Submit a DApp",
              url: "https://ont.io/dapp"
            }
          ]
        }
      ],
      isShowLang: false,
      value: this.$i18n.locale,
      form: {
        navData: []
      },
      enData:
        '[{"title":"Developer","url":"","list":[{"text":"Developer Center","url":"https://developer.ont.io/","sort":"","blok":true},{"text":"Bounty Program","url":"https://bounty.ont.io/","sort":"","blok":true},{"text":"Documentation","url":"https://dev-docs.ont.io/#/","sort":"","blok":true},{"text":"Explorer","url":"https://explorer.ont.io/","sort":"","blok":true}],"sort":""},{"title":"dApps","url":"","list":[{"text":"dApp List","url":"http://oodapp.io","sort":"","blok":true},{"text":"Submit a dApp","url":"http://submit.oodapp.io","sort":"","blok":true}],"blok":false},{"title":"Wallets","url":"","list":[{"text":"ONTO","url":"https://onto.app/","sort":"","blok":true},{"text":"OWallet","url":"https://github.com/ontio/owallet","sort":"","blok":true}],"sort":"","blok":false},{"title":"Trust Ecosystem","url":"","list":[{"text":"PAX","url":"https://pax.ont.io ","blok":true},{"text":"Node","url":"https://info.ont.io/listtriones/en","blok":true}],"sort":"3"},{"title":"About","url":"","list":[{"text":"About us","url":"/aboutus","blok":false},{"text":"News","url":"https://medium.com/ontologynetwork","sort":"","blok":true},{"text":"Contact us","url":"/contactUs","sort":"","blok":false},{"text":"White papers","url":"https://dev-docs.ont.io/#/docs-en/DeveloperGuide/06-white-papers","sort":"","blok":true}],"sort":"3"}]',
      chData:
        '[{"title":"开发者","url":"","list":[{"text":"开发者中心","url":"https://developer.ont.io/","blok":true},{"text":"Bounty Program","url":"https://bounty.ont.io/","blok":true},{"text":"文档中心","url":"https://dev-docs.ont.io/#/docs-cn/","blok":true},{"text":"区块浏览器","url":"https://explorer.ont.io/","sort":"","blok":true}],"sort":"1","blok":false},{"title":"dApps","url":"","list":[{"text":"dApp List","url":"https://oodapp.io/","sort":"","blok":true},{"text":"Submit a dApp","url":"https://submit.oodapp.io/","sort":"","blok":true}],"sort":"2"},{"title":"钱包","url":"","list":[{"text":"ONTO","url":"https://onto.app/","sort":"","blok":true},{"text":"OWallet","url":"https://github.com/ontio/owallet","sort":"","blok":true}],"sort":"3","blok":""},{"title":"信任生态","url":"","list":[{"text":"PAX","url":"https://pax.ont.io ","blok":true},{"text":"节点","url":"https://info.ont.io/listtriones/en","blok":true}],"sort":"4"},{"title":"关于","url":"","list":[{"text":"关于我们","url":"/aboutus","sort":"1"},{"text":"联系我们","url":"/contactUs","sort":"4","blok":false},{"text":"白皮书","url":"https://dev-docs.ont.io/#/docs-cn/DeveloperGuide/06-white-papers","sort":"5","blok":true}],"sort":"5"}]',
      koData:
        '[{"title":"개발자","url":"","list":[{"text":"개발자 센터","url":"https://developer.ont.io/","sort":"","blok":true},{"text":"Bounty Program","url":"https://bounty.ont.io/","sort":"","blok":true},{"text":"문서 센터","url":"https://dev-docs.ont.io/#/docs-kr/","sort":"","blok":true},{"text":"블록체인 브라우저","url":"https://explorer.ont.io/","sort":"","blok":true}],"sort":""},{"title":"dApp","url":"","list":[{"text":"리스트","url":"https://oodapp.io/","sort":"","blok":true},{"text":"dApp 제출하기","url":"https://submit.oodapp.io/","sort":"","blok":true}],"blok":false},{"title":"월렛","url":"","list":[{"text":"ONTO","url":"https://onto.app/","sort":"","blok":true},{"text":"OWallet","url":"https://github.com/ontio/owallet","sort":"","blok":true}],"blok":false},{"title":"신뢰 생태계","url":"","list":[{"text":"PAX","url":"https://pax.ont.io ","blok":true},{"text":"노드","url":"https://node.ont.io","blok":true}]},{"title":"소개","url":"","list":[{"text":"온톨로지는","url":"/aboutus","blok":false},{"text":"연락하기","url":"/contactUs","sort":"","blok":true},{"text":"White Paper","url":"https://dev-docs.ont.io/#/docs-kr/DeveloperGuide/06-white-papers","sort":"","blok":true}]}]',
      jaData:
        '[{"title":"開発者","url":"","list":[{"text":"開発者センター","url":"https://developer.ont.io/","blok":true},{"text":"賞金プログラム","url":"https://bounty.ont.io/","blok":true},{"text":"ドキュメントセンター","url":"https://dev-docs.ont.io/#/","blok":true},{"text":"ブロックブラウザ","url":"https://explorer.ont.io/","sort":"","blok":true}],"sort":"1","blok":false},{"title":"dApps","url":"","list":[{"text":"dApp List","url":"https://oodapp.io/","sort":"","blok":true},{"text":"Submit a dApp","url":"https://submit.oodapp.io/","sort":"","blok":true}],"sort":"2"},{"title":"財布","url":"","list":[{"text":"ONTO","url":"https://onto.app/","sort":"","blok":true},{"text":"OWallet","url":"https://github.com/ontio/owallet","sort":"","blok":true}],"sort":"3","blok":""},{"title":"信頼エコロジー","url":"","list":[{"text":"ONT ID","url":"https://ontid.ont.io/","blok":true},{"text":"ノード","url":"https://info.ont.io/listtriones/en","blok":true}],"sort":"4"},{"title":"について","url":"","list":[{"text":"Ontologyについて","url":"/aboutus","sort":"1"},{"text":"お問い合わせ","url":"/contactUs","sort":"4","blok":false},{"text":"ホワイトペーパー","url":"https://dev-docs.ont.io/#/docs-en/DeveloperGuide/06-white-papers","sort":"5","blok":true}],"sort":"5"}]',
      ruData:
        '[{"title":"Разработчикам  ","url":"","list":[{"text":"Центр разработки","url":"https://developer.ont.io/","sort":"","blok":true},{"text":"Баунти Программа","url":"https://bounty.ont.io/","sort":"","blok":true},{"text":"Документация","url":"https://dev-docs.ont.io/","sort":"","blok":true},{"text":"Explorer","url":"https://explorer.ont.io/","sort":"","blok":true}],"sort":""},{"title":"dApp","url":"","list":[{"text":"Каталог dApp","url":"https://oodapp.io/","sort":"","blok":true},{"text":"Загрузить свое dApp","url":"https://submit.oodapp.io/","sort":"","blok":true}],"blok":false},{"title":"Кошелек","url":"","list":[{"text":"ONTO","url":"https://onto.app/","sort":"","blok":true},{"text":"OWallet","url":"https://github.com/ontio/owallet","sort":"","blok":true}],"blok":false},{"title":"Экосистема Доверия","url":"","list":[{"text":"ONT ID","url":"https://ontid.ont.io/","blok":true},{"text":"PAX","url":"https://pax.ont.io ","blok":true},{"text":"Ноды","url":"https://node.ont.io","blok":true}]},{"title":"О проекте","url":"","list":[{"text":"О нас","url":"/aboutus","blok":false},{"text":"Свяжитесь с нами","url":"/contactUs","sort":"","blok":true},{"text":"White Paper","url":"https://dev-docs.ont.io/#/docs-en/DeveloperGuide/06-white-papers","sort":"","blok":true}]}]'
    };
  },
  mounted() {
    switch (this.$i18n.locale) {
      case "en":
        this.form.navData = this.filterData(JSON.parse(this.enData));
        break;
      case "ch":
        this.form.navData = this.filterData(JSON.parse(this.chData));
        break;
      case "ko":
        this.form.navData = this.filterData(JSON.parse(this.koData));
        break;
      case "ja":
        this.form.navData = this.filterData(JSON.parse(this.jaData));
        break;
      case "ru":
        this.form.navData = this.filterData(JSON.parse(this.ruData));
        break;
      default:
        this.form.navData = this.filterData(JSON.parse(this.enData));
    }
    // this.getData()
  }
};
</script>

<style scoped lang="less">
#app.lang_en .home_footer .footer_box .link_box .ele_list .footer_main_title {
  font-weight: 600;
}
.home_footer {
  width: 100%;
  padding: 60px 0 40px;
  background: #fff;
  .footer_box {
    .link_box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 60px;
      border-bottom: 1px solid #fafafa;
      .ele_list {
        text-align: left;
        .logo {
          width: 94px;
          height: 22px;
          background: url(../../assets/images/common/logo.svg) no-repeat;
          background-size: contain;
        }
        .footer_main_title {
          font-size: 14px;
          font-weight: 800;
          color: rgba(0, 0, 0, 1);
          line-height: 15px;
          margin-bottom: 30px;
        }
        .link_item {
          a {
            font-size: 13px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 16px;
            position: relative;
            &:hover {
              color: rgba(0, 0, 0, 1);
              &::after {
                opacity: 1;
              }
            }
          }
          margin-bottom: 20px;
        }
      }
    }
    .share_link {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
      padding: 50px 0 40px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      a {
        display: block;
        width: 20px;
        height: 16px;
        &:hover {
          opacity: 0.5;
        }
      }
      a:nth-of-type(1) {
        background: url(../../assets/images/common/f-2.svg) no-repeat center;
        background-size: cover;
      }
      a:nth-of-type(2) {
        background: url(../../assets/images/common/f-3.svg) no-repeat center;
        background-size: cover;
      }
      a:nth-of-type(3) {
        background: url(../../assets/images/common/f-4.svg) no-repeat center;
        background-size: cover;
      }
      a:nth-of-type(4) {
        width: 21px;
        background: url(../../assets/images/common/f-7.svg) no-repeat center;
        background-size: cover;
      }
      a:nth-of-type(5) {
        background: url(../../assets/images/common/f-8.svg) no-repeat center;
        background-size: cover;
      }
      a:nth-of-type(6) {
        width: 16px;
        background: url(../../assets/images/common/f-9.svg) no-repeat center;
        background-size: cover;
      }
      a:nth-of-type(7) {
        width: 17px;
        background: url(../../assets/images/common/f-10.svg) no-repeat center;
        background-size: cover;
      }
    }
    .mobile_footer {
      width: 100%;
      padding-left: 20px;
      display: none;
      margin-bottom: 34px;
      margin-top: 24px;
      .first_line,
      .second_line {
        display: flex;
        justify-content: flex-start;
      }
      .first_line {
        margin-bottom: 20px;
        a:nth-of-type(1) {
          background: url(../../assets/images/common/f-1.svg) no-repeat center;
          background-size: cover;
        }
        a:nth-of-type(2) {
          background: url(../../assets/images/common/f-2.svg) no-repeat center;
          background-size: cover;
        }
        a:nth-of-type(3) {
          background: url(../../assets/images/common/f-3.svg) no-repeat center;
          background-size: cover;
        }
        a:nth-of-type(4) {
          background: url(../../assets/images/common/f-4.svg) no-repeat center;
          background-size: cover;
        }
        a:nth-of-type(5) {
          background: url(../../assets/images/common/f-5.svg) no-repeat center;
          background-size: cover;
        }
        a:nth-of-type(6) {
          background: url(../../assets/images/common/f-6.svg) no-repeat center;
          background-size: cover;
        }
      }
      .second_line {
        a:nth-of-type(1) {
          background: url(../../assets/images/common/f-7.svg) no-repeat center;
          background-size: cover;
        }
        a:nth-of-type(2) {
          background: url(../../assets/images/common/f-8.svg) no-repeat center;
          background-size: cover;
        }
        a:nth-of-type(3) {
          background: url(../../assets/images/common/f-9.svg) no-repeat center;
          background-size: cover;
        }
      }
      a {
        display: block;
        width: 20px;
        height: 16px;
        background: #000;
        margin-right: 20px;
      }
    }
    .copyright {
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.3);
      line-height: 22px;
    }
  }
}
.mobile_footer_nav,
.mobile_footer_logo {
  display: none;
}
.outLink::after {
  content: "";
  width: 12px;
  height: 12px;
  background: url(../../assets/images/common/wailian.svg) 50% no-repeat;
  background-size: contain;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -18px;
  z-index: 2;
  opacity: 0.6;
  transition: all 0.5s;
}
@media only screen and (max-width: 960px) {
  .footer_box {
    padding-left: 5px;
    padding-right: 5px;
    .link_box {
      display: none !important;
    }
  }
  .mobile_footer_nav {
    display: block;
  }
}
@media only screen and (max-width: 960px) {
  .home_footer {
    position: relative;
    padding-top: 40px;
    .mobile_footer_logo {
      height: 15px;
      display: block;
      position: absolute;
      left: 25px;
      top: 30px;
    }
  }
}
@media only screen and (max-width: 767px) {
  .footer_box {
    padding-left: 5px;
    padding-right: 5px;
    .link_box {
      display: none !important;
    }
    .share_link {
      padding: 25px 0 25px 20px !important;
      width: 70% !important;
      margin: initial !important;
    }
  }
  .copyright {
    text-align: left !important;
    padding-left: 20px;
  }
  .home_footer .footer_box .copyright {
    padding-bottom: 20px;
    width: 180px;
    line-height: 22px;
  }
}
</style>

<template>
  <div class="home_footer">
    <div class="container">
      <div class="line"></div>
      <div class="up">
        <div class="logo"></div>
        <div class="title">Blockchain Explorer & Trust Verifier</div>
        <div class="social_link_box">
          <a href="https://twitter.com/OntologyNetwork" target="_blank" class="hover1">+TWITTER</a>
          <a
            href="https://www.facebook.com/Ontology-Network-468098413590227/"
            target="_blank"
            class="hover1"
          >+FACEBOOK</a>
          <a href="https://medium.com/ontologynetwork" target="_blank" class="hover1">+MEDIUM</a>
          <a href="https://t.me/OntologyNetwork" target="_blank" class="hover1">+TELEGRAM</a>
          <a
            href="https://www.youtube.com/channel/UCXzLZJgDglAWRU0b2GOa7pA"
            target="_blank"
            class="hover1"
          >+YOUTUBE</a>
          <a
            href="https://www.linkedin.com/company/ontology-network-official/"
            target="_blank"
            class="hover1"
          >+LINKEDIN</a>
          <a href="https://open.kakao.com/o/gMm1F05" target="_blank" class="hover1">+KAKAO</a>
        </div>
      </div>
      <div class="down">
        <div class="social_link_box">
          <a href="https://twitter.com/OntologyNetwork" target="_blank" class="hover1">+TWITTER</a>
          <a
            href="https://www.facebook.com/Ontology-Network-468098413590227/"
            target="_blank"
            class="hover1"
          >+FACEBOOK</a>
          <a href="https://medium.com/ontologynetwork" target="_blank" class="hover1">+MEDIUM</a>
          <a href="https://t.me/OntologyNetwork" target="_blank" class="hover1">+TELEGRAM</a>
          <a
            href="https://www.youtube.com/channel/UCXzLZJgDglAWRU0b2GOa7pA"
            target="_blank"
            class="hover1"
          >+YOUTUBE</a>
          <a
            href="https://www.linkedin.com/company/ontology-network-official/"
            target="_blank"
            class="hover1"
          >+LINKEDIN</a>
          <a href="https://open.kakao.com/o/gMm1F05" target="_blank" class="hover1">+KAKAO</a>
        </div>
        <div class="copyright">&#169; 2018 - 2020 Ontology. All rights reserved</div>
      </div>
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

<style lang="less" scoped>
.home_footer {
  padding-top: 140px;
  .container {
    .line {
      width: 100%;
      border-top: 1px solid #fafafa;
      padding-bottom: 60px;
    }
    .up {
      padding-top: 0;
      display: flex;
      text-align: left;
      align-items: center;
      .logo {
        width: 40px;
        height: 40px;
        background-image: url(../../assets/images/common/smalllogo.svg);
        background-size: 100%;
        background-repeat: no-repeat;
        margin-right: 30px;
      }
      .title {
        width: 234px;
        font-size: 22px;
        font-family: Explorerfonts-Bold, SamsungSharpSans;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        line-height: 27px;
      }
      .social_link_box {
        display: none;
      }
    }
    .down {
      display: flex;
      justify-content: space-between;
      padding-top: 80px;
      padding-bottom: 50px;
      .social_link_box {
        a {
          font-size: 13px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 15px;
          margin-right: 25px;
          transition: all ease 0.5s;
        }
        a:hover {
          text-decoration-line: line-through;
          transition: all ease 0.5s;
        }
      }
      .copyright {
        font-size: 13px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 15px;
      }
    }
  }
}
@media only screen and (max-width: 960px) {
  .home_footer {
    padding-top: 140px;
    padding-left: 50px;
    padding-right: 50px;
    .container {
      .line {
        width: 100%;
        border-top: 1px solid #fafafa;
        padding-bottom: 60px;
      }
      .up {
        display: flex;
        align-items: flex-start;
        .logo {
          margin-right: 15px;
        }
        .title {
          width: 117px;
          font-size: 11px;
          font-family: Explorerfonts-Bold, SamsungSharpSans;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 14px;
          margin-right: 25px;
        }
        .social_link_box {
          display: flex;
          flex-direction: column;
          a {
            font-size: 12px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            line-height: 14px;
            margin-bottom: 10px;
            transition: all ease 0.5s;
          }
          a:hover {
            text-decoration-line: line-through;
            transition: all ease 0.5s;
          }
        }
      }
      .down {
        display: flex;
        justify-content: space-between;
        padding-top: 40px;
        padding-bottom: 35px;
        flex-direction: column;
        text-align: left;
        .social_link_box {
          display: none;
        }
        .copyright {
          font-size: 11px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 13px;
          padding-top: 20px;
        }
      }
    }
  }
}
</style>

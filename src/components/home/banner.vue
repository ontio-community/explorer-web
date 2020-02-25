<template>
  <div class="home-banner">
    <div class="banner-container container">
        <div class="banner-content">
            <div class="banner-text">
                Blockchain Explorer & Trust Verifier
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@keyframes showcase {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
.home-banner{
    .banner-container{
        padding-top: 15%;
        .banner-content{
            animation: showcase 1s;
            max-width: 800px;
            text-align: left;
            .banner-text{
                font-size:80px;
                font-family:Explorerfonts-Bold,SamsungSharpSans;
                font-weight:bold;
                color:rgba(0,0,0,1);
                line-height:101px;
            }
        }
    }
}
@media only screen and (max-width:960px) {
  
.home-banner{
    .banner-container{
        padding-top: calc( 40vh - 75px );
        .banner-content{
            animation: showcase 1s;
            max-width: 400px;
            text-align: left;
            .banner-text{
                font-size:40px;
                font-family:Explorerfonts-Bold,SamsungSharpSans;
                font-weight:bold;
                color:rgba(0,0,0,1);
                line-height:50px;
            }
        }
    }
}
}
</style>

<template>
  <div class="list-page">
    <div class="noshow" ></div>
    <div class="container">
    <title-div class="list-title" :title="$t('transList.name')" :total="transactions.total"></title-div>

      <div class="list-content">
        <div class="table-responsive"   v-loading="fullscreenLoading">
          <table class="table">
            <thead>
              <tr>
              <th scope="col" class="text-first">{{ $t('transList.hash') }}</th>
              <th  scope="col">{{ $t('all.status') }}</th>
              <th scope="col">{{ $t('all.height') }}</th>
              <th scope="col">{{ $t('all.fee') }}</th>
              <th class="text-right text-last" scope="col">{{ $t('all.time') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(tx,index) in transactions.list" :key="index">
              <td class="click-able text-first" @click="toTransactionDetailPage(tx.tx_hash)">
                {{tx.tx_hash.substr(0,8) + '...' + tx.tx_hash.substr(56)}}
              </td>
              <td :class="tx.confirm_flag === 1 ? 'confirmed' : 'failed'">{{ tx.confirm_flag === 1 ? $t('transList.confirmed') : $t('transList.failed') }}</td>
              <!--<td class="s-color">{{ tx.TxnType === 208 ? 'Deploy' : 'Run' }}</td>-->
              <!--<td class="s-color">{{ tx.BlockIndex }}</td>-->
              <td >{{tx.block_height}}</td>
              <td >{{$HelperTools.toFinancialVal(tx.fee)}}</td>
              <td class="text-right text-last" >{{$HelperTools.getTransDate(tx.tx_time)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ont-pagination :total="transactions.total"></ont-pagination>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
import titleDiv from "../common/listTitle";
import Helper from "./../../helpers/helper.js";
  import GetTransactionType from './../../common/OntMsg/GetTransactionType.js'

  export default {
  components: {
    titleDiv
  },
    data() {
      return {
        current: 1,
        showItem: 5,
        allpage: 1,
        allnum: '',
        size: 0,
        loadingFlag:false,
        listType:'littlelist',
        fullscreenLoading: true
      }
    },
    mounted() {
      this.getTransactions()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    watch: {
      '$route':function(){
        this.fullscreenLoading = true
        this.getTransactions()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      'transactions':function(){
        this.fullscreenLoading = false
        console.log(this.transactions)
      }
    },
    computed: {
      ...mapState({
        transactions: state => state.Transactions.List
      })
    },
    methods: {
      getTransactions() {
        this.loadingFlag = false
        this.testNetPageSizeCheck()
        this.$store.dispatch('GetTransactions', this.$route.params).then()
      },
      testNetPageSizeCheck(){
        if(this.$route.params.net == "testnet"){
          if(this.$route.params.pageSize > 30){
            this.$message({message: this.$t('error.pagesize')});
            this.$route.params.pageSize = 30
            this.$router.push({name: this.$route.name, params: this.$route.params})
            return
          }
        }
      },
      toTransactionDetailPage($TxnId) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'TransactionDetail', params: {tx_hash: $TxnId}})
        } else {
          this.$router.push({name: 'TransactionDetailTest', params: {tx_hash: $TxnId, net: 'testnet'}})
        }
      },
      getTransactionType($case) {
        return GetTransactionType.getTransactionType($case)
      }
    }
  }
</script>

<style lang="less" scoped>
@import "../../assets/css/list-page.less";
</style>
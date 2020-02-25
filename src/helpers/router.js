/**
 * 所有路径跳转方法，自定义名称为：$RouterTools。
 * 在main.js import和use可全局使用。
 */
import DecimalMath from 'decimal.js';
import axios from 'axios'
import router from '../router'
import Vue from "vue";

const RouterTools = {
    // 跳转到交易详情页
    toTxDetail($TxnId) {
        router.push({ name: 'TransactionDetail', params: { tx_hash: $TxnId } })
    },
    // 跳转到区块详情页
    toBlockDetail($blockHeight) {
        router.push({ name: 'blockDetail', params: { param: $blockHeight } })
    },
    // 跳转到地址详情页
    toAddressDetail($address, $assetName, $pageSize, $pageNumber) {
        $assetName = $assetName ? $assetName : "ALL"
        $pageSize = $pageSize ? $pageSize : 20
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({ name: 'AddressDetail', params: { address: $address, assetName: "ALL", pageSize: $pageSize, pageNumber: $pageNumber } })
    },
    // 跳转到ONTID详情页
    toOntidDetail($ontid, $pageSize, $pageNumber) {
        $pageSize = $pageSize ? $pageSize : 20
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({ name: 'OntIdDetail', params: { ontid: $ontid, pageSize: $pageSize, pageNumber: $pageNumber } })
    },
    // 跳转到智能合约详情页
    toScDetail($contract_hash, $contract_type, $pageSize, $pageNumber) {
        $pageSize = $pageSize ? $pageSize : 10
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({
            name: 'ContractDetail', params: {
                contractHash: $contract_hash,
                contractType: $contract_type ? 'other' : $contract_type,
                pageSize: $pageSize,
                pageNumber: $pageNumber
            }
        })
    },
    // 跳转到TOKEN详情页
    toTokenDetail($contract_hash, $contract_type, $name, $pageSize, $pageNumber) {
        $pageSize = $pageSize ? $pageSize : 10
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({
            name: 'TokenDetail', params: {
                contractType: $contract_type,
                tokenName: $name,
                contractHash: $contract_hash,
                pageSize: $pageSize,
                pageNumber: $pageNumber
            }
        })
    },
    // 跳转到区块列表页
    toBlockListPage($pageSize, $pageNumber) {
        $pageSize = $pageSize ? $pageSize : 20
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({ name: 'blockList', params: { pageSize: $pageSize, pageNumber: $pageNumber } })
    },
    // 跳转到交易列表页
    toTransactionListPage($pageSize, $pageNumber) {
        $pageSize = $pageSize ? $pageSize : 20
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({ name: 'TransactionList', params: { pageSize: $pageSize, pageNumber: $pageNumber } })
    },
    // 跳转到ONTID事件列表页
    toOntIdListPage($pageSize, $pageNumber) {
        $pageSize = $pageSize ? $pageSize : 20
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({ name: 'OntIdList', params: { pageSize: $pageSize, pageNumber: $pageNumber } })
    },
    // 跳转到合约列表页
    toContractList($pageSize, $pageNumber) {
        $pageSize = $pageSize ? $pageSize : 20
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({name: 'ContractList', params: {pageSize: $pageSize, pageNumber: $pageNumber}})
    },
    // 跳转到TOKEN列表页
    toTokenList($type, $pageSize, $pageNumber) {
        $pageSize = $pageSize ? $pageSize : 10
        $pageNumber = $pageNumber ? $pageNumber : 1
        router.push({name: 'TokenList', params: {contractType: $type, pageSize: $pageSize, pageNumber: $pageNumber}})
    },
    // 跳转到TOKEN提交页
    toTokenSubmit() {
        router.push({name: 'TokenSubmit'})
    },
    // 跳转到分析页
    toStatistics($day) {
        let name = 'Statistics';
        let params = {day: $day?$day:"14"};

        if (this.$route.params.net === 'testnet') {
          params.net = "testnet";
          name = name + 'Test'
        }
        router.push({name: name, params: params});
      }
};

export default {
    install: function (Vue) {
        Vue.prototype.$RouterTools = RouterTools
    },
    RouterTools
}

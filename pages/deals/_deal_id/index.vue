<template>
  <div>
    <h3>{{$store.state.deals.car.title}}</h3>
  </div>
</template>

<script>
  export default {
    name: "showDeal",
    async fetch({store, params}) {
      await store.dispatch('deals/show', {car_id: params.deal_id});
    }
  }
</script>

<style scoped>

</style>
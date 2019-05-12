<template>
  <b-row>
    <b-col>
      <b-btn variant="outline-success" class="mb-3" :to="'/deals/new'">
        {{$t('deals.new')}}
      </b-btn>
      <b-table striped hover :items="list" :fields="fields">
        <template slot="name" slot-scope="data">
          <b-link :to="`/deals/${data.item.id}/edit`">{{data.item.name}}</b-link>
        </template>
        <template slot="members" slot-scope="data">
          {{data.item.users.length}}
        </template>
        <template slot="updated_at" slot-scope="data">
          {{data.item.updated_at | moment("from", "now")}}
        </template>
        <template slot="actions" slot-scope="data">
          <b-btn variant="primary" :to="'deals/'+data.item.id+'/edit'">
            {{$t('edit')}}
          </b-btn>
          &nbsp;
          <b-btn variant="outline-secondary" @click="id = data.item.id" v-b-modal.confirmDestroy>
            {{$t('remove')}}
          </b-btn>
        </template>
      </b-table>
      <b-modal id="confirmDestroy" :title="$t('destroy_confirm_title')" @ok="destroy">
        {{$t('destroy_confirm')}}
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    async fetch({store}) {
      await store.dispatch('deals/get')
    },
    computed: {
      ...mapState({
        list: state => {
          return state.deals.list
        }
      })
    },
    data() {
      return {
        id: 0,
        fields: [
          {
            key: 'make',
            label: this.$t('deals.make'),
            sortable: true,
          },
          {
            key: 'model',
            label: this.$t('deals.model'),
            sortable: true,
          },
          {
            key: 'year',
            label: this.$t('deals.year'),
            sortable: true,
          },
          {
            key: 'updated_at',
            sortable: true,
            label: this.$t('updated_at')
          },
          {
            key: 'actions',
            label: this.$t('actions')
          }
        ]
      }
    },
    methods: {
      destroy() {
        this.$store.dispatch('deals/delete', {id: this.id}).then(() => this.$store.dispatch('deals/get'))
      }
    }
  }
</script>
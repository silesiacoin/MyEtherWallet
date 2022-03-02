<template>
  <div>
    <div class="d-flex flex-column superPrimary pa-6 rounded">
      <div class="d-flex justify-space-between">
        <span>{{ $t('ens.register.domain-name') }}:</span>
        <span class="font-weight-medium">{{ name }}</span>
      </div>
      <div class="d-flex justify-space-between">
        <span>{{ $t('ens.register.term') }}:</span>
        <span class="font-weight-medium">{{
          duration === 1
            ? $tc('ens.commit.year', 1)
            : $tc('ens.commit.year', 2, { duration: duration })
        }}</span>
      </div>
      <div class="d-flex justify-space-between">
        <span> Estimated Transaction cost:</span>
        <span class="font-weight-medium">{{ commitmentFee }}</span>
      </div>
    </div>
    <div
      v-if="minimumAge || canRegister"
      class="timer-container d-flex flex-column align-center justify-center mt-4"
    >
      <mew-icon
        class="canRegister ? 'disabled' : ''"
        icon-name="clock"
        :img-height="80"
      />
      <span class="ticket-subtitle primary--text">{{ ticker }}</span>
      <div
        v-if="!canRegister"
        class="d-flex flex-column mt-5 justify-center align-center"
      >
        <span class="mew-heading-2">{{ $t('ens.hang-on') }}</span>
        <span class="mt-3 desc-container">{{
          $t('ens.hang-on-committing')
        }}</span>
      </div>
      <div
        v-if="canRegister"
        class="d-flex flex-column mt-5 justify-center align-center"
      >
        <span class="mew-heading-2">{{ $t('ens.register.complete-reg') }}</span>
        <span class="mt-3 desc-container">{{
          $t('ens.register.complete-reg-desc')
        }}</span>
      </div>
    </div>
    <div class="d-flex justify-center mt-6">
      <mew-button
        :disabled="disableBtn"
        :title="
          canRegister
            ? $t('ens.register.name')
            : $t('ens.register.create-commitment')
        "
        btn-size="xlarge"
        @click.native="!canRegister ? commit() : register(duration)"
      />
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapState } from 'vuex';
export default {
  name: 'EnsRegister',
  props: {
    loadingCommit: {
      default: false,
      type: Boolean
    },
    name: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1
    },
    minimumAge: {
      type: String,
      default: ''
    },
    register: {
      default: function () {
        return {};
      },
      type: Function
    },
    nameHandler: {
      type: Object,
      default: () => {}
    },
    commit: {
      default: function () {
        return {};
      },
      type: Function
    }
  },
  data() {
    return {
      ticker: '00:00',
      timer: () => {},
      canRegister: false,
      commitmentFee: '0'
    };
  },
  computed: {
    ...mapState('wallet', ['balanceInETH']),
    hasEnoughBalanceToCommit() {
      if (BigNumber(this.commitmentFee).eq(0)) {
        return false;
      }
      return BigNumber(this.balanceInETH).gt(this.commitmentFee);
    },
    disableBtn() {
      if (!this.canRegister) {
        return (
          (this.loadingCommit || this.ticker !== '00:00') &&
          !this.hasEnoughBalanceToCommit
        );
      }
      return false;
    }
  },
  watch: {
    minimumAge(newVal) {
      this.ticker = `0${newVal / 60 < 10 ? Math.ceil(newVal / 60) : '00'}:00`;
    },
    loadingCommit(newVal) {
      if (newVal) {
        clearInterval(this.timer);
        const startTime = new Date().getTime();
        const endTime = startTime + this.minimumAge * 1000;
        if (this.minimumAge > 0) {
          this.timer = setInterval(() => {
            const startInterval = new Date().getTime();
            const difference = endTime - startInterval;
            const minutes = Math.floor(
              (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            this.ticker = `${
              minutes >= 10 ? minutes : minutes < 0 ? '00' : '0' + minutes
            }:${seconds >= 10 ? seconds : seconds < 0 ? '00' : '0' + seconds}`;
            if (seconds < 0) {
              clearInterval(this.timer);
            }
          }, 1000);
        }
      } else if (!newVal) {
        clearInterval(this.timer);
        this.canRegister = true;
        this.ticker = '00:00';
      } else {
        clearInterval(this.timer);
      }
    }
  },
  mounted() {
    this.nameHandler.getCommitmentFees().then(res => {
      this.commitmentFee = res;
    });
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.timer-container {
  .disabled {
    filter: grayscale(100%);
  }
  .desc-container {
    max-width: 300px;
  }
  .ticket-subtitle {
    line-height: 34px;
  }
}
</style>

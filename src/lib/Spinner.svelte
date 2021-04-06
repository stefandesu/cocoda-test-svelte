<script lang="ts">
  export let size = "40"
</script>

<div
  class="lds-spinner"
  style="--size: { size }px;">
  <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div>

<style>
  .lds-spinner {
    display: inline-block;
    position: relative;
    width: var(--size);
    height: var(--size);
  }
  .lds-spinner div {
    transform-origin: calc(var(--size) / 2) calc(var(--size) / 2);
    animation: lds-spinner 0.8s linear infinite;
  }
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: calc(var(--size) / 2 - 3px);
    width: 6px;
    height: calc(var(--size) / 4.5);
    border-radius: 20%;
    background: #000;
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(45deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(90deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(135deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(180deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(225deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(270deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(315deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

</style>

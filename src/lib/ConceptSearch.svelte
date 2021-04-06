<script lang="ts">
  import Spinner from "$lib/Spinner.svelte"
  import ItemName from "$lib/ItemName.svelte"

  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  import { debounce } from "$lib/utils"

  export let scheme

  let value = ""
  let focused = false

  let loading = false
  let results = []
  $: showResults = value !== "" && focused
  let selected = 0

  function select() {
    if (results[selected]) {
      dispatch("select", results[selected])
    }
  }

  function handleKey({ code, target }) {
    // TODO: Scrolling for up/down
    switch (code) {
      case "Escape":
        target && target.blur && target.blur()
        break
      case "ArrowDown":
        selected = (selected + 1) % results.length
        break
      case "ArrowUp":
        if (selected === 0) {
          selected = results.length - 1
        } else {
          selected -= 1
        }
        break
      case "Enter":
        select()
        target && target.blur && target.blur()
        break
    }
  }

  let cancel
  const handleChange = debounce(async function(value: string) {
    cancel && cancel()
    const promise = scheme._registry.search({ scheme, search: value })
    cancel = promise.cancel
    results = await promise
    loading = false
  }, 200)

  $: if (value) {
    loading = true
    selected = 0
    handleChange(value)
  } else {
    results = []
  }

  function onFocus() {
    focused = true
  }
  function onBlur(event) {
    if (event.relatedTarget && event.relatedTarget.className.includes("result")) {
      select()
    }
    focused = false
  }
</script>

<div class="concept-search">
  <input
    bind:value
    on:focus={ onFocus }
    on:blur={ onBlur }
    on:keydown={ handleKey }
    placeholder="Type to search..." />

  {#if showResults}
    <div class=results>
      {#if loading}
        <div class=result>
          <Spinner size=20 />
        </div>
      {:else if results.length === 0}
        <div class=result>No results</div>
      {:else}
        {#each results as result, index }
          <!--
            on:click won't work here since on:blur from input fires first.
            So instead, we handle clicks in the on:blur handler above.
          -->
          <div
            class=result
            class:selected={ selected === index }
            tabindex="-1"
            on:mouseover={ () => { selected = index } }>
            <ItemName item={ result } />
          </div>
        {/each}
      {/if}
    </div>
  {/if}

</div>

<style>
  .concept-search {
    position: relative;
  }
  input {
    width: 100%;
  }
  .results {
    position: absolute;
    overflow: scroll;
    width: 100%;
    max-height: 250px;
    margin: 2px 0 0 4px;
    box-shadow: 0 2px 4px 0 #00000077;
    z-index: 1;
  }
  .result {
    padding: 3px 0 3px 12px;
    cursor: pointer;
    text-align: left;
    background-color: white;
  }
  .result.selected {
    background-color: lightgray;
  }
</style>

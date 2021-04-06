<script lang="ts">
  import { selected } from "$lib/store"
  import Spinner from "$lib/Spinner.svelte"
  import ItemName from "$lib/ItemName.svelte"

  export let concept
</script>

<div class=concept-details>
  {#if concept}
    {#if concept.ancestors && concept.ancestors.length}
      {#if concept.ancestors.length === 1 && concept.ancestors[0] === null}
        <Spinner size=20 />
      {:else}
        <ul class="ancestors">
          {#each concept.ancestors as ancestor}
            <li>
              ⬑
              <ItemName
                item={ ancestor }
                isLink={ true }
                on:click={ () => { selected.set(ancestor) } } />
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
    <p>
      <ItemName item={ concept } />
    </p>
    <p>
      { concept.uri }
    </p>
    {#if concept.narrower && concept.narrower.length}
      {#if concept.narrower.length === 1 && concept.narrower[0] === null}
        <Spinner size=20 />
      {:else}
        <ul class="narrower">
          {#each concept.narrower as child}
            <li>
              ⬐
              <ItemName
                item={ child }
                isLink={ true }
                on:click={ () => { selected.set(child) } } />
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
  {:else}
    <p>
      No concept given.
    </p>
  {/if}
</div>

<style>
  .concept-details {
    padding: 10px;
    margin-top: 20px;
  }
  .ancestors, .narrower {
    list-style: none;
    padding: 0;
    font-size: 0.9em;
  }
</style>

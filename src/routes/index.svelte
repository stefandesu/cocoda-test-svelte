<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
	  return {
	    props: {
	      uri: page.query.get("uri") ?? "",
	    },
	  }
	}
</script>

<script lang="ts">
	import ConceptSearch from "$lib/ConceptSearch.svelte"
	import ConceptDetails from "$lib/ConceptDetails.svelte"
	import ItemName from "$lib/ItemName.svelte"

	import { selected, scheme, setSelectedUri } from "$lib/store"

	let items = []
	async function generateItems(count) {
	  items = Array.from(Array(count).keys()).map((value) => {
	    return {
	      uri: `uri:test:${value}`,
	      notation: [`${value}`],
	      prefLabel: { en: `Concept #${value}` },
	    }
	  })
	}

	export let uri: string
	if (uri) {
		setSelectedUri(uri)
	}
</script>

<main>
	<h1>Cocoda Test Svelte</h1>

	<section>
		<ConceptSearch
			{ scheme }
			on:select={ (concept) => { selected.set(concept.detail) }} />
	</section>
	<section>
		<ConceptDetails
			concept={ $selected } />
	</section>
	<section>
		<p>
			Generate elements:
			{#each [1000, 10000, 100000] as count }
				<button on:click={ () => generateItems(count) }>
					{ count }
				</button>
			{/each}
		</p>
		{#each items as item}
			<div><ItemName { item } isLink={ true } on:click={ () => { selected.set(item) }} /></div>
		{/each}
	</section>
</main>

<style>
	main {
		padding: 1em;
		margin: 0 auto;
		max-width: 450px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		height: 100vh;
	}
	section:last-child {
		flex: 1;
		overflow: scroll;
	}
</style>

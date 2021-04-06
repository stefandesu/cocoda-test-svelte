<script lang="ts">
	import jskos from "jskos-tools"

	export let item: Object
	export let showNotation = true
	export let showText = true
	export let isLink = false
	$: notation = jskos.notation(item)
</script>

<span
	class=itemName
	class:hoverable={ isLink }
	on:click>
	{#if showNotation}
		<b>
			{ notation }
		</b>
	{/if}
	{#if showText}
		{ jskos.prefLabel(item, { fallbackToUri: notation == null }) }
	{/if}
</span>

<style>
	.itemName.hoverable:hover {
		cursor: pointer;
		text-decoration: underline;
	}
</style>

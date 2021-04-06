import * as cdk from "cocoda-sdk"
import jskos from "jskos-tools"
import { writable } from "svelte/store"

const registry = cdk.initializeRegistry({
  provider: "ConceptApi",
  status: "https://coli-conc.gbv.de/api/status",
})
// Fixed to DDC
export const scheme = {
  uri: "http://dewey.info/scheme/edition/e23/",
  prefLabel: {
    de: "Dewey-Dezimalklassifikation",
  },
  notation: [
    "DDC",
  ],
  identifier: [
    "http://bartoc.org/en/node/241",
  ],
  type: [
    "http://www.w3.org/2004/02/skos/core#ConceptScheme",
  ],
  _registry: registry,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selected = writable<any>(null)

let previous
selected.subscribe(async (value) => {
  if (value !== null && !jskos.compare(value, previous)) {
    previous = value
    // Load data from API
    if (!value.ancestors || value.ancestors[0] === null) {
      const ancestors = await registry.getAncestors({ concept: value })
      selected.update(_value => {
        // Check is necessary since value could have changed in the meantime
        if (jskos.compare(value, _value)) {
          _value.ancestors = ancestors
        }
        return _value
      })
    }
    if (!value.narrower || value.narrower[0] === null) {
      const narrower = await registry.getNarrower({ concept: value })
      selected.update(_value => {
        // Check is necessary since value could have changed in the meantime
        if (jskos.compare(value, _value)) {
          _value.narrower = narrower
        }
        return _value
      })
    }
    if (!value.__DETAILSLOADED__) {
      const [details] = await registry.getConcepts({ concepts: [value] })
      selected.update(_value => {
        if (jskos.compare(_value, details)) {
          for (const key in details) {
            if (!_value[key]) {
              _value[key] = details[key]
            }
          }
          _value.__DETAILSLOADED__ = 1
        }
        return _value
      })
    }
    // Set URI in URL
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("uri", value.uri)
    const url = `${window.location.href.replace(window.location.search, "")}?${urlParams.toString()}`
    window.history.replaceState({}, "", url)
  }
})

export function setSelectedUri(uri: string, _scheme?: Record<string, unknown>): void {
  if (!scheme && uri.startsWith("http://dewey.info/class/")) {
    _scheme = scheme
  }
  const concept = {
    uri,
    scheme: _scheme,
  }
  selected.set(concept)
}

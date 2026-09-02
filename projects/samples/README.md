# Project Sample Images

Each project gets its own subfolder here, named after its `id` in `projects-data.js`.

```
projects/samples/
  smartfarming/
  blogger/
  ecart/
  manoratha/
  traffic-violation-detection/
  spyder-robot/
  janata-voice/
  citc-website/
```

## Adding images to a project

1. Drop your image file(s) into the matching subfolder — any filename works
   (e.g. `1.jpg`, `2.jpg`, `screenshot-dashboard.png`).
2. Open `projects/projects-data.js` and find that project's entry.
3. Add a `{ file: "yourfile.jpg", caption: "Short description" }` object to
   its `samples` array — the `file` must match the filename exactly.

Example:

```js
samples: [
  { file: "1.jpg", caption: "Dashboard overview" },
  { file: "2.jpg", caption: "Mobile view" },
  { file: "leak-alert.png", caption: "Leak alert notification" },
],
```

That's it — `project.js` builds the full path automatically as
`./samples/<sampleFolder>/<file>` and renders every image in the array as a
carousel slide with its caption, in the order listed.

## Tips

- Keep images reasonably sized (compress large photos/screenshots before
  adding them) so project pages load quickly.
- Landscape/16:9-ish images look best — the carousel crops to a fixed
  aspect ratio.
- There's no limit on how many images a project can have; the carousel
  scrolls through all of them with arrows, dots, and a thumbnail strip.

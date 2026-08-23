// Where the cursor sits over the image, as a percentage of its size — used
// as the CSS transform-origin for the zoom-on-hover effect.
const computeZoomPosition = ({ offsetX, offsetY, width, height }) => ({
    x: (offsetX / width) * 100,
    y: (offsetY / height) * 100,
});

export { computeZoomPosition };

import { FastAverageColor } from 'fast-average-color';
import { useEffect, useState } from 'react';

function OverlayBackground({ idMovie, imgUrl, light = false }) {
    const [averageColor, setAverageColor] = useState({});
    useEffect(() => {
        async function getAverageColor(imgUrl) {
            const fac = new FastAverageColor();
            const img = document.createElement('img');
            img.src = imgUrl;
            img.crossOrigin = 'Anonymous';
            const color = await fac.getColorAsync(img).then((col) => {
                return col;
            });
            const valueColor = { R: color.value[0], G: color.value[1], B: color.value[2] };
            setAverageColor({ id: idMovie, ...valueColor });
        }
        getAverageColor(imgUrl);
    }, [idMovie, imgUrl]);
    return (
        <div
            id={`div_bg_image_${idMovie}`}
            style={{
                background: `linear-gradient(to right, rgba(${!light ? averageColor.R : `3`}, ${
                    !light ? averageColor.G : `37`
                }, ${!light ? averageColor.B : `65`}, ${!light ? `1` : '0.75'}) ${!light ? `150px` : '0%'}, rgba(${
                    !light ? averageColor.R : `3`
                }, ${!light ? averageColor.G : `37`}, ${!light ? averageColor.B : `65`}, ${!light ? `0.84` : '0.75'}) ${
                    !light ? `100%` : '100%'
                })`,
            }}
            className="absolute top-0 bottom-0 left-0 right-0 bg-center bg-cover brightness-[0.3]"
        ></div>
    );
}

export default OverlayBackground;

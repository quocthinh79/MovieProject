function CircleRated({ percent, size = 1 }) {
    const initialWidthWrap = 38 * size + 'px';
    const initialWidthSvg = 34 * size + 'px';
    const fontSize = 1.5 * size + 'rem';
    const dashArray = Math.PI * 100;
    percent = Math.round(percent * 10);
    const dashOffset = Math.round(Math.PI * (100 - percent));

    const bar = {
        low: '#db2360',
        medium: '#d2d531',
        high: '#21d07a',
        none: '#d4d4d4',
    };

    const track = {
        low: '#571435',
        medium: '#423d0f',
        high: '#204529',
        none: '#666666',
    };

    const getColor = (ratingPercent) => {
        if (ratingPercent >= 70) return 'high';
        if (ratingPercent >= 40) return 'medium';
        if (ratingPercent > 0) return 'low';
        return 'none';
    };

    return (
        <div
            style={{ width: initialWidthWrap }}
            className={`aspect-square bg-[#081c22] rounded-full flex justify-center items-center`}
        >
            <svg style={{ width: initialWidthSvg }} viewBox="0 0 100 100" className={`rotate-[-90deg]  aspect-square `}>
                <circle
                    cx="52.5"
                    cy="52.5"
                    r="50"
                    fill="transparent"
                    stroke={track[getColor(percent)]}
                    strokeWidth={6}
                    strokeDasharray={dashArray}
                    className="scale-[0.95]"
                />
                <circle
                    cx="52.5"
                    cy="52.5"
                    r="50"
                    fill="transparent"
                    stroke={bar[getColor(percent)]}
                    strokeWidth={6}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    className="scale-[0.95]"
                    strokeLinecap="round"
                />
            </svg>
            <div
                style={{ fontSize: fontSize }}
                className={`font-semibold absolute text-white flex justify-center items-center`}
            >
                {percent ? (
                    <>
                        {percent}
                        <sup className="text-sm">%</sup>
                    </>
                ) : (
                    'NR'
                )}
            </div>
        </div>
    );
}

export default CircleRated;

function CircleRated({ percent, size = 1 }) {
    let initialWidthWrap = 38;
    let initialWidthSvg = 34;
    let fontSize = 1.5;
    let lineHeight = 2;
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
            className={`w-[calc(${initialWidthWrap}px*${size})] aspect-square bg-[#081c22] rounded-full flex justify-center items-center`}
        >
            <svg
                viewBox="0 0 100 100"
                className={`rotate-[-90deg] w-[calc(${initialWidthSvg}px*${size})] aspect-square `}
            >
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
                className={`font-semibold absolute text-white flex justify-center items-center text-[calc(${fontSize}rem*${size})]`}
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

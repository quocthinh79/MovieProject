import { number } from 'prop-types';
import { useEffect } from 'react';

function DescriptionItem({ title, content }) {
    return (
        <div className="mb-[20px] flex flex-col items-start">
            <span className="font-bold">{title}</span>
            <span className="">
                {Number.isInteger(content)
                    ? '$' + content.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                    : content}
            </span>
        </div>
    );
}

export default DescriptionItem;

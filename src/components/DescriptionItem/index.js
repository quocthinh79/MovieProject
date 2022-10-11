import { number } from 'prop-types';
import { useEffect } from 'react';
import Button from '../Button';

function DescriptionItem({ title, content, keyWords = [] }) {
    return (
        <div className="mb-[20px] flex flex-col items-start">
            <span className="font-bold mb-[10px]">{title}</span>
            <span className="flex flex-wrap">
                {content && Number.isInteger(content)
                    ? '$' + content.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                    : content}
                {keyWords.map((item, index) => (
                    <Button to={`/keyword/${item.id}`} keyword={true}>
                        {item.name}
                    </Button>
                ))}
            </span>
        </div>
    );
}

export default DescriptionItem;

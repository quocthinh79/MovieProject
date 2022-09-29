import classNames from 'classnames/bind';
import styles from './PlayIcon.module.scss';
const cx = classNames.bind(styles);

function PlayIcon({ color = 'white', width = 64, height = 64, className }) {
    const classes = cx({
        [className]: className,
    });
    return (
        <svg
            id="glyphicons-basic"
            className={`absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]`}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
        >
            <path
                className={classes}
                fill={color}
                id="play"
                d="M24.8175,16.86432,9.503,25.77667A1,1,0,0,1,8,24.91235V7.08765a1,1,0,0,1,1.503-.86432L24.8175,15.13568A1.00006,1.00006,0,0,1,24.8175,16.86432Z"
            />
        </svg>
    );
}

export default PlayIcon;

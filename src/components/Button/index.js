import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ children, onClickShowPopup, linear = false, className, ...passProps }) {
    const classes = cx({
        [className]: className,
        linear,
    });
    return (
        <button
            className={`p-7 border-2 border-solid rounded-l-[30px] rounded-r-[30px] m-4 ${classes}`}
            onClick={onClickShowPopup}
        >
            {children}
        </button>
    );
}

export default Button;

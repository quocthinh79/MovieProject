import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ children, to, href, onClick, linear = false, disable = false, className, ...passProps }) {
    const classes = cx({
        [className]: className,
        linear,
    });

    const props = {
        onClick,
        ...passProps,
    };

    let Component = 'button';
    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    // Disable events
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    return (
        <Component
            className={`p-7 border-2 border-solid rounded-l-[30px] rounded-r-[30px] m-4 ${classes}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </Component>
    );
}

export default Button;

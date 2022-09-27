import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    children,
    to,
    href,
    onClick,
    linear = false,
    disable = false,
    tippy = false,
    content = '',
    placement = '',
    circle = false,
    iconBtnCircle = '',
    primaryShape = true,
    className,
    ...passProps
}) {
    const classes = cx({
        [className]: className,
        linear,
        circle,
        primaryShape,
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

    let ComponentTippy = 'div';
    if (tippy) {
        ComponentTippy = Tippy;
    } else {
        ComponentTippy = 'div';
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
        <ComponentTippy className="inline-block" content={content} placement={placement}>
            <Component className={`${classes}`} onClick={onClick} {...props}>
                {!circle ? (
                    children
                ) : (
                    <img
                        alt=""
                        style={{ width: 16, height: 16, display: 'inline-block' }}
                        // className="w-[16px] aspect-square inline-block"
                        src={iconBtnCircle}
                    />
                )}
            </Component>
        </ComponentTippy>
    );
}

export default Button;

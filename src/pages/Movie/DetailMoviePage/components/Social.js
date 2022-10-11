import { faFacebook, faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import images from '~/assets/images';

function Social() {
    return (
        <div className="flex items-center">
            <Tippy content={`Visit Facebook`}>
                <a href="" className="py-4 mx-2">
                    <img width={28} height={28} src={`${images.facebook}`} />
                </a>
            </Tippy>
            <Tippy content={`Visit Twitter`}>
                <a href="" className="py-4 mx-2">
                    <img width={28} height={28} src={`${images.twitter}`} />
                </a>
            </Tippy>
            <Tippy content={`Visit Instagram`}>
                <a href="" className="py-4 mx-2">
                    <img width={28} height={28} src={`${images.instagram}`} />
                </a>
            </Tippy>
            <div className=" inline-flex justify-center items-center h-full">|</div>
            <Tippy content={`Visit Homepage`}>
                <a href="" className="py-4 mx-2 flex justify-center items-center">
                    <img width={28} height={28} src={`${images.link}`} />
                </a>
            </Tippy>
        </div>
    );
}

export default Social;

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { apiConfigImage } from '~/untils/request';
import Button from '../Button';
import ShortVideoCard from '../ShortVideoCard';

function Popup({
    children,
    heroSlide,
    textInButton,
    idVideo,
    getTrailer,
    width,
    height,
    shortVideoCard = false,
    urlBackGround,
}) {
    const customStyles = {
        content: {
            background: '#000',
            border: 'none',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: width,
            height: height,
            position: 'relative',
        },
        overlay: {
            background: '#272936a6',
            zIndex: 100000,
        },
    };
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        getTrailer(idVideo);
        heroSlide.autoplay.stop();
        setIsOpen(true);
    };

    function closeModal() {
        heroSlide.autoplay.start();
        setIsOpen(false);
    }

    return (
        <>
            {!shortVideoCard ? (
                <Button onClick={openModal}>{textInButton}</Button>
            ) : (
                <div onClick={openModal}>
                    <ShortVideoCard idVideo={idVideo} urlBackGround={apiConfigImage.w335H299Image(urlBackGround)} />
                </div>
            )}
            <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                <button onClick={closeModal}>
                    <FontAwesomeIcon className="absolute text-white top-0 right-0 px-2" size="2x" icon={faClose} />
                </button>
                {children}
            </ReactModal>
        </>
    );
}

export default Popup;

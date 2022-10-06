import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateIdBackroundOnHover } from '~/redux/idBackgroundOnHoverSlice';
import { updateUrlBackroundOnHover } from '~/redux/urlBackgroundOnHoverSlice';
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
    textColor = '#000',
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
        if (heroSlide) heroSlide.autoplay.stop();
        setIsOpen(true);
    };

    function closeModal() {
        if (heroSlide) heroSlide.autoplay.start();
        setIsOpen(false);
    }
    const dispatch = useDispatch();
    const handleHoverTrailerCard = () => {
        dispatch(updateUrlBackroundOnHover(apiConfigImage.originalImage(urlBackGround)));
        dispatch(updateIdBackroundOnHover(idVideo));
    };

    useEffect(() => {
        dispatch(updateUrlBackroundOnHover(apiConfigImage.originalImage(urlBackGround)));
    }, []);

    return (
        <>
            {!shortVideoCard ? (
                <Button onClick={openModal}>{textInButton}</Button>
            ) : (
                <div onClick={openModal} onMouseEnter={handleHoverTrailerCard} className="h-auto pt-5">
                    <ShortVideoCard
                        textColor={textColor}
                        idVideo={idVideo}
                        urlBackGround={apiConfigImage.w335H299Image(urlBackGround)}
                    />
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

import "./Modal.scss";
import React from "react";
import { CSSTransition } from "react-transition-group";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

export const Modal = (props: React.PropsWithChildren<ModalProps>) => {
    const duration = 300;

    return (
        <>
            <CSSTransition in={props.visible} classNames="modal-transition" timeout={duration} unmountOnExit={true}>
                <div className="modal-container">{props.children}</div>
            </CSSTransition>
            <CSSTransition
                in={props.visible}
                classNames="modal-mask-transition"
                timeout={duration}
                unmountOnExit={true}
            >
                <div className="modal-mask" onClick={props.onClose} />
            </CSSTransition>
        </>
    );
};

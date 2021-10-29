import "./FullModal.scss";
import React from "react";
import { CSSTransition } from "react-transition-group";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

export const FullModal = (props: React.PropsWithChildren<ModalProps>) => {
    const duration = 300;

    return (
        <>
            <CSSTransition
                in={props.visible}
                classNames="full-modal-transition"
                timeout={duration}
                unmountOnExit={true}
            >
                <div className="full-modal-container">{props.children}</div>
            </CSSTransition>
        </>
    );
};

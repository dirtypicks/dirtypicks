"use client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/toastify.module.css';

const ToastProvider = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName={styles.toast}
                className={styles.toastBody}
                closeButton={({ closeToast }) => (
                    <button onClick={closeToast} className={styles.closeButton}>
                        ×
                    </button>
                )}
            />
        </>
    );
}

export default ToastProvider;

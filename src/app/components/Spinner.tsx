import * as React from "react";

export const Spinner = (props: { message?: string }) => {
  const { message } = props;

  const css = `
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 50px;
      height: 50px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 35px;
      height: 35px;
      margin: 8px;
      border: 4px solid var(--color-text);
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--color-text) transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .spinner-container {
      display: flex;
      width: 100%;
      height: 30vh;
      background-color: var(--color-bg);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }
    .spinner-message {
      font-family: Arial, sans-serif;
      font-size: 1rem;
      color: var(--color-text);
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="spinner-container">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {message && <div className="spinner-message">{message}</div>}
      </div>
    </>
  );
};

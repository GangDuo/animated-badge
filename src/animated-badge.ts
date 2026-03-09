/*
色変更方法
animated-badge {
  --check-color: #2196f3;
}
または
document.querySelector('animated-badge').style.setProperty('--check-color', '#f44336');
*/

class AnimatedBadge extends HTMLElement {
  static observedAttributes = ['playing'];

  connectedCallback(): void {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          --check-color: #4caf50;
        }

        .badge {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid var(--check-color);
          position: relative;
          animation: none;
          opacity: 0;
          pointer-events: none;
        }

        .badge.active {
          animation: pop 0.4s forwards;
          opacity: 1;
        }

        /* 共通リセット */
        .badge::before,
        .badge::after {
          content: '';
          position: absolute;
          opacity: 0;
        }

        /* check（デフォルト） */
        :host(:not([type])) .badge::after,
        :host([type="check"]) .badge::after {
          width: 12px;
          height: 7px;
          border-left: 3px solid var(--check-color);
          border-bottom: 3px solid var(--check-color);
          top: 8px;
          left: 7px;
          transform: rotate(-45deg);
        }

        /* cross */
        :host([type="cross"]) .badge::before,
        :host([type="cross"]) .badge::after {
          width: 14px;
          height: 3px;
          background: var(--check-color);
          top: 50%;
          left: 50%;
        }
        :host([type="cross"]) .badge::before { transform: translate(-50%, -50%) rotate(45deg); }
        :host([type="cross"]) .badge::after  { transform: translate(-50%, -50%) rotate(-45deg); }

        /* minus */
        :host([type="minus"]) .badge::after {
          width: 14px;
          height: 3px;
          background: var(--check-color);
          top: calc(50% - 1.5px);
          left: calc(50% - 7px);
          transform: scaleX(0);
          transform-origin: left center;
        }

        /* draw アニメーション */
        :host(:not([type])) .badge.done::after,
        :host([type="check"]) .badge.done::after { animation: draw 0.4s 0.3s both; }

        :host([type="cross"]) .badge.done::before { animation: draw 0.4s 0.6s both; }
        :host([type="cross"]) .badge.done::after { animation: draw 0.8s 0.3s both; }

        :host([type="minus"]) .badge.done::after { animation: drawline 0.4s 0.3s both; }

        @keyframes pop {
          0% { transform: scale(0.2); }
          100% { transform: scale(1); }
        }

        @keyframes draw {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes drawline {
          from { opacity: 1; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
        }
      </style>
      <div class="badge"></div>
    `;
  }

  play(): void {
    this.shadowRoot!.querySelector('.badge')!.classList.add('active', 'done');
  }

  reset(): void {
    this.shadowRoot!.querySelector('.badge')!.classList.remove('active', 'done');
  }

  attributeChangedCallback(name: string, _oldVal: string | null, newVal: string | null): void {
    if (name === 'playing') newVal !== null ? this.play() : this.reset();
  }
}

customElements.define('animated-badge', AnimatedBadge);

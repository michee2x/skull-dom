
export const CSS_ANIMATIONS = `
  /* Keyframes */
  @keyframes sk-pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  @keyframes sk-wave {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes sk-glimmer {
    0% { mask-position: -200%; -webkit-mask-position: -200%; }
    100% { mask-position: 200%; -webkit-mask-position: 200%; }
  }
  @keyframes sk-scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes sk-breathing {
    0% { transform: scale(0.99); opacity: 0.8; }
    50% { transform: scale(1.0); opacity: 1; }
    100% { transform: scale(0.99); opacity: 0.8; }
  }
  @keyframes sk-fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes sk-slide-in {
    0% { transform: translateY(10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes sk-rumble {
    0% { transform: translateX(-1px); }
    25% { transform: translateX(1px); }
    50% { transform: translateX(-1px); }
    75% { transform: translateX(1px); }
    100% { transform: translateX(-1px); }
  }
  @keyframes sk-neon {
    0% { box-shadow: 0 0 5px #e5e7eb; }
    50% { box-shadow: 0 0 15px #9ca3af; }
    100% { box-shadow: 0 0 5px #e5e7eb; }
  }
  @keyframes sk-shimmer-vertical {
    0% { background-position: 0 -200%; }
    100% { background-position: 0 200%; }
  }
  @keyframes sk-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }

  /* Classes */
  .sk-anim-pulse { animation: sk-pulse 1.5s ease-in-out infinite; }
  
  .sk-anim-wave { 
    background: linear-gradient(90deg, var(--sk-color, #d1d5db) 25%, var(--sk-highlight, #e5e7eb) 50%, var(--sk-color, #d1d5db) 75%);
    background-size: 200% 100%;
    animation: sk-wave 2s infinite linear; 
  }

  .sk-anim-glimmer {
    position: relative;
    overflow: hidden;
  }
  .sk-anim-glimmer::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transform: skewX(-20deg);
    animation: sk-wave 1.5s infinite;
  }

  /* Scan uses a pseudo-element overlay */
  .sk-anim-scan {
    position: relative;
    overflow: hidden;
  }
  .sk-anim-scan::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: #fff;
    box-shadow: 0 0 10px #fff;
    animation: sk-scan 2s linear infinite;
  }

  .sk-anim-breathing { animation: sk-breathing 3s ease-in-out infinite; }
  .sk-anim-fade-in { animation: sk-fade-in 0.5s ease-out forwards; }
  .sk-anim-slide-in { animation: sk-slide-in 0.4s ease-out forwards; }
  .sk-anim-rumble { animation: sk-rumble 0.2s linear infinite; }
  .sk-anim-neon { animation: sk-neon 2s ease-in-out infinite; }
  
  .sk-anim-shimmer-vertical {
    background: linear-gradient(180deg, var(--sk-color, #d1d5db) 25%, var(--sk-highlight, #e5e7eb) 50%, var(--sk-color, #d1d5db) 75%);
    background-size: 100% 200%;
    animation: sk-shimmer-vertical 2s infinite linear;
  }
  
  .sk-anim-bounce { animation: sk-bounce 2s ease-in-out infinite; }
  .sk-anim-classic { /* No animation */ }
`;

export function injectStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('skull-dom-styles')) return;

    const style = document.createElement('style');
    style.id = 'skull-dom-styles';
    style.textContent = CSS_ANIMATIONS;
    document.head.appendChild(style);
}

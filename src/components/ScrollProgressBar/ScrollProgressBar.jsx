export default function ScrollProgressBar({ progress }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3px',
        background: 'var(--gold)',
        zIndex: 9990,
        transition: 'width 0.1s linear',
      }}
    />
  );
}

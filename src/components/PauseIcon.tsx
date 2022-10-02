const PauseIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
    >
      <g>
        <path
          d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
         S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
        />
        <path d="M33,46h8V14h-8V46z M35,16h4v28h-4V16z" />
        <path d="M19,46h8V14h-8V46z M21,16h4v28h-4V16z" />
      </g>
    </svg>
  );
};

export default PauseIcon;

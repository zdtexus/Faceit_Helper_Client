interface LevelIndicatorProps {
  level: number;
  className?: string;
}

export const LevelIndicator: React.FC<LevelIndicatorProps> = ({ level, className }) => {
  let svgIcon;

  switch (level) {
    case 0:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.685 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/></svg>

      );
      break;
    case 1:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.685 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M5.894 15.816 3.858 17.09a9.7 9.7 0 0 0 1.894 2.2l1.562-1.822a7.2 7.2 0 0 1-1.42-1.65z" fill="#EEE"/><path d="m11.765 10.233-1.487.824v-1.034L12 8.948h.991V14.4h-1.226z" fill="#EEE"/></svg>
      );
      break;
    case 2:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.685 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="m5.257 14.53-2.249.842a9.6 9.6 0 0 0 2.743 3.917l1.563-1.822a7.2 7.2 0 0 1-2.057-2.938z" fill="#1CE400"/><path d="M10.05 13.157q0-.454.252-.79a1.6 1.6 0 0 1 .655-.512 8 8 0 0 1 .748-.286 2.8 2.8 0 0 0 .663-.302q.235-.16.235-.378v-.698q0-.26-.21-.344-.226-.093-.705-.092-.58 0-1.529.21V9.04a8.5 8.5 0 0 1 1.756-.177q.99 0 1.47.303.486.302.487 1.008v.756q0 .428-.26.747a1.57 1.57 0 0 1-.656.47q-.378.16-.773.286a2.7 2.7 0 0 0-.68.336q-.244.185-.244.437v.277h2.621v.916h-3.83v-1.243z" fill="#1CE400"/></svg>
      );
      break;
    case 3:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M2.4 12a9.58 9.58 0 0 0 3.352 7.29l1.562-1.823A7.18 7.18 0 0 1 4.801 12z" fill="#1CE400"/><path d="M11.79 14.484q-.705 0-1.831-.126v-.975l.269.05q.16.034.176.043l.286.05q.1.017.428.05.252.026.513.026.486 0 .672-.118.192-.118.193-.445v-.63q0-.395-.849-.395h-.99v-.84h.99q.656 0 .656-.479v-.529a.45.45 0 0 0-.068-.269q-.067-.1-.243-.142a2.2 2.2 0 0 0-.504-.042q-.48 0-1.479.1V8.94q1.143-.075 1.613-.076 1.024 0 1.479.235.462.235.462.832v.899a.62.62 0 0 1-.152.42.7.7 0 0 1-.37.227q.74.26.74.814v.89q0 .699-.479 1-.479.303-1.512.303" fill="#1CE400"/></svg>
      );
      break;
    case 4:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M6.91 6.91 5.211 5.211A9.57 9.57 0 0 0 2.4 12a9.58 9.58 0 0 0 3.352 7.289l1.562-1.822A7.18 7.18 0 0 1 4.801 12c0-1.988.805-3.788 2.108-5.09z" fill="#FFC800"/><path d="M12.303 13.3h-2.52v-.967l2.243-3.385h1.386v3.47H14v.881h-.588v1.1h-1.109zm0-.883v-2.31l-1.47 2.31z" fill="#FFC800"/></svg>
      );
      break;
    case 5:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M12 2.4A9.6 9.6 0 0 0 2.4 12a9.58 9.58 0 0 0 3.352 7.29l1.562-1.823A7.2 7.2 0 0 1 12 4.8z" fill="#FFC800"/><path d="M11.815 14.484q-.58 0-1.739-.093v-1.016q1.042.193 1.571.193.462 0 .672-.1a.36.36 0 0 0 .21-.337v-.814q0-.227-.151-.32-.151-.1-.496-.1h-1.68V8.948h3.444v.941H11.43v1.109h.856q.488 0 .95.185a.91.91 0 0 1 .554.865v1.142q0 .328-.126.588-.126.252-.32.387a1.3 1.3 0 0 1-.453.201q-.278.075-.537.101a10 10 0 0 1-.538.017z" fill="#FFC800"/></svg>
      );
      break;
    case 6:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M17.934 7.92a7.2 7.2 0 1 0-10.62 9.546L5.752 19.29A9.58 9.58 0 0 1 2.4 12a9.6 9.6 0 0 1 17.512-5.44z" fill="#FFC800"/><path d="M12.546 9.906H9.9v-.958h4v.84L11.807 14.4h-1.36l2.1-4.494z" fill="#FFC800"/></svg>
      );
      break;
    case 7:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M17.934 7.92a7.2 7.2 0 1 0-10.62 9.546L5.752 19.29A9.58 9.58 0 0 1 2.4 12a9.6 9.6 0 0 1 17.512-5.44z" fill="#FFC800"/><path d="M12.546 9.906H9.9v-.958h4v.84L11.807 14.4h-1.36l2.1-4.494z" fill="#FFC800"/></svg>
      );
      break;
    case 8:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M19.2 12h2.4A9.6 9.6 0 0 0 12 2.4 9.6 9.6 0 0 0 2.4 12a9.58 9.58 0 0 0 3.352 7.29l1.562-1.823A7.2 7.2 0 1 1 19.2 12" fill="#FF6309"/><path d="M12 14.484q-1.084 0-1.588-.269-.495-.27-.496-.932v-.941q0-.27.269-.504.269-.235.638-.32v-.033a.88.88 0 0 1-.504-.235.61.61 0 0 1-.218-.462v-.781q0-.587.428-.866.436-.276 1.47-.277c1.034-.001 1.176.093 1.462.277q.437.278.437.866v.78a.61.61 0 0 1-.219.463.88.88 0 0 1-.504.235v.034q.37.084.639.319c.269.235.268.325.268.504v.94q0 .681-.512.941-.513.26-1.57.26zm0-3.293q.369 0 .512-.1.15-.11.15-.345v-.63q0-.244-.15-.345-.143-.108-.513-.109-.37 0-.52.11-.143.1-.143.344v.63a.41.41 0 0 0 .142.336q.135.11.521.11zm0 2.495q.36 0 .52-.042.168-.042.218-.143.06-.1.06-.32v-.738q0-.244-.144-.362-.142-.108-.646-.109-.48 0-.647.11-.16.1-.16.36v.74q0 .218.05.32.06.1.219.142.168.042.53.042" fill="#FF6309"/></svg>
      );
      break;
    case 9:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M18.517 15.066a7.2 7.2 0 1 0-11.202 2.4L5.751 19.29A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.6 9.6 0 0 1-.91 4.089z" fill="#FF6309"/><path d="M11.84 14.484q-.721 0-1.553-.084v-.874q1.075.118 1.537.118.429 0 .622-.059.192-.06.252-.218.066-.16.067-.504v-.513h-.907q-.454 0-.656-.008a2.6 2.6 0 0 1-.453-.084.9.9 0 0 1-.395-.193 1.05 1.05 0 0 1-.235-.37 1.7 1.7 0 0 1-.093-.588v-.74q0-.385.118-.671.118-.294.302-.462.168-.143.437-.235.278-.093.546-.118.32-.017.58-.017.394 0 .621.025.235.018.496.101a1.13 1.13 0 0 1 .74.689 1.9 1.9 0 0 1 .117.689v2.537q0 .848-.513 1.218-.504.36-1.63.36zm.925-2.949V10.26q0-.285-.05-.395-.043-.109-.194-.143a2.7 2.7 0 0 0-.529-.034 2 2 0 0 0-.504.042.26.26 0 0 0-.193.152q-.05.108-.05.378v.831q0 .203.05.294.05.084.201.118a2.7 2.7 0 0 0 .504.033z" fill="#FF6309"/></svg>
      );
      break;
    case 10:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=''><circle cx="12" cy="12" r="12" fill="#1F1F22"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#CDCDCD" fillOpacity=".1"/><path fillRule="evenodd" clipRule="evenodd" d="M16.686 17.467a7.2 7.2 0 1 0-9.371 0l-1.563 1.822A9.58 9.58 0 0 1 2.4 12 9.6 9.6 0 0 1 12 2.4a9.6 9.6 0 0 1 9.6 9.6 9.58 9.58 0 0 1-3.352 7.29z" fill="#FE1F00"/><path d="m9.233 10.233-1.487.824v-1.034l1.722-1.075h.991V14.4H9.233zm4.595 4.251q-.37 0-.604-.025a3.3 3.3 0 0 1-.513-.101 1.2 1.2 0 0 1-.462-.235 1.2 1.2 0 0 1-.294-.454 1.7 1.7 0 0 1-.126-.689v-2.612q0-.387.118-.68a1.2 1.2 0 0 1 .302-.463q.16-.142.437-.226a2.5 2.5 0 0 1 .554-.118q.32-.017.588-.017.378 0 .605.025a2.4 2.4 0 0 1 .504.101q.303.093.479.244.177.15.302.437.126.285.126.697v2.612q0 .387-.126.68a1.15 1.15 0 0 1-.302.454 1.3 1.3 0 0 1-.462.235q-.285.092-.546.11a6 6 0 0 1-.58.025m.017-.79q.353 0 .504-.042a.3.3 0 0 0 .202-.176q.05-.126.05-.412v-2.78q0-.285-.05-.412a.28.28 0 0 0-.202-.168q-.15-.05-.504-.05-.36 0-.52.05a.28.28 0 0 0-.202.168q-.05.126-.05.412v2.78q0 .285.05.412.05.126.201.176.16.042.521.042" fill="#FE1F00"/></svg>
      );
      break;
    default:
      svgIcon = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <title>Default Skill Level</title>
          <circle cx="12" cy="12" r="12" fill="#1F1F22"></circle>
          <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-1.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" fill="#D3D3D3"></path>
        </svg>
      );
      break;
  }

  return (
    <div className={`flex items-center w-[34px] ${className}`}>
      {svgIcon}
    </div>
  );
};

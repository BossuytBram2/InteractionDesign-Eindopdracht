let platforms = [];
let stationData = {};
let trains = [];
let tl = gsap.timeline({});
let tl2 = gsap.timeline({});

const clock = function () {
  const d = new Date();
  document.querySelector('.js-clock').innerHTML = d.toLocaleTimeString();
};

const ShowPlatforms = function () {
  for (const departure of stationData.departures.departure) {
    if (!platforms.includes(departure.platform) & (departure.platform != '?')) {
      platforms.push(departure.platform);
    }
  }
  platforms.sort();
  html = '';
  for (const plat of platforms) {
    html += `<div class="c-grid__item js-platform${plat}"><h1>Platform ${plat}</h1>
    <svg id="Train-master" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 100">
    <rect id="Rail" class="c-rail" y="77" width="1100" height="1" />
    <g id="Train" class="c-train">
      <g id="T3">
        <g id="T3-W" class="c-train__wheels">
          <path id="T3-W4" d="M897.5,68h0c.18-.13.37-.25.57-.37l.19-.1.52-.23c.13,0,.26-.08.4-.12l.41-.11a5.5,5.5,0,0,1,.91-.09,5,5,0,0,1,0,10,5.5,5.5,0,0,1-.91-.09l-.26-.06a6.17,6.17,0,0,1-.61-.19l-.25-.1a4.78,4.78,0,0,1-.74-.4l-.15-.12a4,4,0,0,1-.51-.41l-.24-.25c-.11-.13-.22-.26-.32-.4a3.06,3.06,0,0,1-.21-.29A4.95,4.95,0,0,1,897.5,68Z" transform="translate(0)" />
          <path id="T3-W3" d="M877.5,67a5.5,5.5,0,0,1,.91.09l.41.11c.14,0,.27.07.4.12l.52.23.19.1c.2.12.39.24.57.37h0a4.95,4.95,0,0,1,1.2,6.67,3.06,3.06,0,0,1-.21.29c-.1.14-.21.27-.32.4l-.24.25a4,4,0,0,1-.51.41l-.15.12a4.78,4.78,0,0,1-.74.4l-.25.1a6.17,6.17,0,0,1-.61.19l-.26.06a5.5,5.5,0,0,1-.91.09,5,5,0,0,1,0-10Z" transform="translate(0)" />
          <path id="T3-W2" d="M712.5,68h0c.18-.13.37-.25.57-.37l.19-.1.52-.23c.13,0,.26-.08.4-.12l.41-.11a5.5,5.5,0,0,1,.91-.09,5,5,0,0,1,0,10,5.5,5.5,0,0,1-.91-.09l-.26-.06a6.17,6.17,0,0,1-.61-.19l-.25-.1a4.78,4.78,0,0,1-.74-.4l-.15-.12a4,4,0,0,1-.51-.41l-.24-.25c-.11-.13-.22-.26-.32-.4a3.06,3.06,0,0,1-.21-.29A4.95,4.95,0,0,1,712.5,68Z" transform="translate(0)" />
          <path id="T3-W1" d="M692.5,67a5.5,5.5,0,0,1,.91.09l.41.11c.14,0,.27.07.4.12l.52.23.19.1c.2.12.39.24.57.37h0a4.95,4.95,0,0,1,1.2,6.67,3.06,3.06,0,0,1-.21.29c-.1.14-.21.27-.32.4l-.24.25a4,4,0,0,1-.51.41l-.15.12a4.78,4.78,0,0,1-.74.4l-.25.1a6.17,6.17,0,0,1-.61.19l-.26.06a5.5,5.5,0,0,1-.91.09,5,5,0,0,1,0-10Z" transform="translate(0)" />
        </g>
        <path id="T3-B" d="M675.5,34V68H697a5.93,5.93,0,0,1,1.54,4,6,6,0,0,1-.35,2h11.7a6,6,0,0,1-.35-2A5.93,5.93,0,0,1,711,68h9.38l5.08,5h144l3-5H882a5.93,5.93,0,0,1,1.54,4,6,6,0,0,1-.35,2h11.7a6,6,0,0,1-.35-2A5.93,5.93,0,0,1,896,68h8.27l3.19,5h13V69l-2-1h0V63.07h3c0-.24,0-.59,0-1-.12-2.89-1.25-5.14-3-8-1.29-2.12-1.56-2.36-4-6-3.23-4.85-3-4.75-4-6a20.76,20.76,0,0,0-7-6,20.15,20.15,0,0,0-8-2c-.82,0-1.5,0-2,0h-218Zm220,13h6v6h-6Zm-12,1h5v6h-5Zm-23-1a1,1,0,0,1-1,1h-3a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1Zm-12,3h12V70h-12Zm-9-9a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm-16,18a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm0-18a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm-16,18a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm0-18a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm-16,18a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm0-18a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm-16,18a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm0-18a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm-16,0a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm-16,0a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1Zm-9,18a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-3a1,1,0,0,1-1-1Zm0-18a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-3a1,1,0,0,1-1-1Zm-40,5h20V67h-20Z" transform="translate(0)" />
        <path id="T3-D3" class="c-train__door js-door-right" d="M848.5,50V70h12V50Zm4,6a2,2,0,0,1,4,0v9a2,2,0,0,1-4,0Z" transform="translate(0)" />
        <path id="T3-D2" class="c-train__door js-door-right" d="M704.5,46V68h10V46Zm2,6a2,2,0,0,1,4,0v9a2,2,0,0,1-4,0Z" transform="translate(0)" />
        <path id="T3-D1" class="c-train__door js-door-left" d="M694.5,46V68h10V46Zm8,15a2,2,0,0,1-4,0V52a2,2,0,0,1,4,0Z" transform="translate(0)" />
      </g>
      <g id="T2">
        <g id="T2-W" class="c-train__wheels">
          <path id="T2-W4" d="M468.5,67a5,5,0,0,0-4,8h0a2.75,2.75,0,0,0,.22.26l.09.12.24.25.17.13a3,3,0,0,0,.34.28l.15.12a4.78,4.78,0,0,0,.74.4l.25.1c.1,0,.2.06.3.09l.31.1.26.06a5.5,5.5,0,0,0,.91.09,5,5,0,0,0,0-10Z" transform="translate(0)" />
          <path id="T2-W3" d="M445.5,67a5.5,5.5,0,0,0-.91.09l-.41.11c-.14,0-.27.07-.4.12l-.52.23-.19.1c-.2.12-.39.24-.57.37a5.51,5.51,0,0,0-.75.7l-.18.22c-.12.16-.23.32-.34.49a4.09,4.09,0,0,0-.25.46c0,.1-.09.19-.12.28a4.69,4.69,0,0,0-.24.75l0,.18a5.38,5.38,0,0,0-.09.9,5,5,0,0,0,.09.88,2.82,2.82,0,0,0,.07.31,4.48,4.48,0,0,0,.16.52c0,.11.08.23.13.34a4.36,4.36,0,0,0,.35.64h0a3.06,3.06,0,0,0,.21.29,2.43,2.43,0,0,0,.2.25l.12.15.24.25.17.13a3,3,0,0,0,.34.28l.15.12a4.78,4.78,0,0,0,.74.4l.25.1c.1,0,.2.06.3.09l.31.1.26.06a5.5,5.5,0,0,0,.91.09,5.38,5.38,0,0,0,.9-.09l.18,0a4.69,4.69,0,0,0,.75-.24l.28-.12a4.09,4.09,0,0,0,.46-.25l.49-.34.22-.18a5.51,5.51,0,0,0,.7-.75h0a5,5,0,0,0-4-8Z" transform="translate(0)" />
          <path id="T2-W2" d="M653.5,67a5,5,0,0,0-4,8h0a2.75,2.75,0,0,0,.22.26l.09.12.24.25.17.13a3,3,0,0,0,.34.28l.15.12a4.78,4.78,0,0,0,.74.4l.25.1.3.09.31.1.26.06a5.5,5.5,0,0,0,.91.09,5,5,0,0,0,0-10Z" transform="translate(0)" />
          <path id="T2-W1" d="M630.5,67a5.5,5.5,0,0,0-.91.09l-.41.11c-.14,0-.27.07-.4.12l-.52.23-.19.1c-.2.12-.39.24-.57.37a5.51,5.51,0,0,0-.75.7l-.18.22c-.12.16-.23.32-.34.49a4.09,4.09,0,0,0-.25.46c0,.1-.09.19-.12.28a4.69,4.69,0,0,0-.24.75l0,.18a5.38,5.38,0,0,0-.09.9,5,5,0,0,0,.09.88,2.82,2.82,0,0,0,.07.31,4.48,4.48,0,0,0,.16.52c0,.11.08.23.13.34a4.36,4.36,0,0,0,.35.64h0a3.06,3.06,0,0,0,.21.29,2.43,2.43,0,0,0,.2.25l.12.15.24.25.17.13a3,3,0,0,0,.34.28l.15.12a4.78,4.78,0,0,0,.74.4l.25.1.3.09.31.1.26.06a5.5,5.5,0,0,0,.91.09,5.38,5.38,0,0,0,.9-.09l.18,0a4.69,4.69,0,0,0,.75-.24l.28-.12a4.09,4.09,0,0,0,.46-.25l.49-.34.22-.18a5.51,5.51,0,0,0,.7-.75h0a5,5,0,0,0-4-8Z" transform="translate(0)" />
        </g>
        <path id="T2-B" d="M428.5,34V68H450a6,6,0,0,1,.73,7h12.62a6,6,0,0,1,.73-7h8.37l6.09,6h142l5.77-6H635a6,6,0,0,1,.73,7h12.62a6,6,0,0,1,.73-7H671.5V34Zm17,24a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V53a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm22,9h-20V46h20Zm25-2a1,1,0,0,1-1,1h-3a1,1,0,0,1-1-1V60a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1Zm0-17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm18,17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V60a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm0-17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm4,0V41a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1v7a1,1,0,0,1-1,1h-12A1,1,0,0,1,514.5,48Zm15,17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V60a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm18,0a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V60a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm0-17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm4,0V41a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1v7a1,1,0,0,1-1,1h-12A1,1,0,0,1,551.5,48Zm15,17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V60a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm3-17V41a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1v7a1,1,0,0,1-1,1h-12A1,1,0,0,1,569.5,48Zm15,17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V60a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm4-17V41a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1v7a1,1,0,0,1-1,1h-12A1,1,0,0,1,588.5,48Zm15,17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V60a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm3-17V41a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v7a1,1,0,0,1-1,1h-4A1,1,0,0,1,606.5,48Zm15,17a1,1,0,0,1-1,1h-12a1,1,0,0,1-1-1V60a1,1,0,0,1,1-1h12a1,1,0,0,1,1,1Zm31,2h-20V46h20Z" transform="translate(0)" />
        <path id="T2-D4" class="c-train__door js-door-right" d="M642.5,46V68h10V46Zm2,6a2,2,0,0,1,4,0v9a2,2,0,0,1-4,0Z" transform="translate(0)" />
        <path id="T2-D3" class="c-train__door js-door-left" d="M632.5,46V68h10V46Zm8,15a2,2,0,0,1-4,0V52a2,2,0,0,1,4,0Z" transform="translate(0)" />
        <path id="T2-D2" class="c-train__door js-door-right" d="M457.5,46V68h10V46Zm2,6a2,2,0,0,1,4,0v9a2,2,0,0,1-4,0Z" transform="translate(0)" />
        <path id="T2-D1" class="c-train__door js-door-left" d="M447.5,46V68h10V46Zm8,15a2,2,0,0,1-4,0V52a2,2,0,0,1,4,0Z" transform="translate(0)" />
      </g>
      <g id="T1">
        <g id="T1-W" class="c-train__wheels">
          <path id="T1-W4" d="M407.5,67a5.5,5.5,0,0,0-.91.09l-.41.11c-.14,0-.27.07-.4.12l-.52.23-.19.1c-.2.12-.39.24-.57.37h0a4.95,4.95,0,0,0-1.2,6.67,3.06,3.06,0,0,0,.21.29c.1.14.21.27.32.4l.24.25a4,4,0,0,0,.51.41l.15.12a4.78,4.78,0,0,0,.74.4l.25.1a6.17,6.17,0,0,0,.61.19l.26.06a5.5,5.5,0,0,0,.91.09,5,5,0,0,0,0-10Z" transform="translate(0)" />
          <path id="T1-W3" d="M387.5,68h0c-.18-.13-.37-.25-.57-.37l-.19-.1-.52-.23c-.13,0-.26-.08-.4-.12l-.41-.11a5.5,5.5,0,0,0-.91-.09,5,5,0,0,0,0,10,5.5,5.5,0,0,0,.91-.09l.26-.06a6.17,6.17,0,0,0,.61-.19l.25-.1a4.78,4.78,0,0,0,.74-.4l.15-.12a4,4,0,0,0,.51-.41l.24-.25c.11-.13.22-.26.32-.4a3.06,3.06,0,0,0,.21-.29A4.95,4.95,0,0,0,387.5,68Z" transform="translate(0)" />
          <path id="T1-W2" d="M222.5,67a5.5,5.5,0,0,0-.91.09l-.41.11c-.14,0-.27.07-.4.12l-.52.23-.19.1c-.2.12-.39.24-.57.37h0a4.95,4.95,0,0,0-1.2,6.67,3.06,3.06,0,0,0,.21.29c.1.14.21.27.32.4l.24.25a4,4,0,0,0,.51.41l.15.12a4.78,4.78,0,0,0,.74.4l.25.1a6.17,6.17,0,0,0,.61.19l.26.06a5.5,5.5,0,0,0,.91.09,5,5,0,0,0,0-10Z" transform="translate(0)" />
          <path id="T1-W1" d="M202.5,68h0c-.18-.13-.37-.25-.57-.37l-.19-.1-.52-.23c-.13,0-.26-.08-.4-.12l-.41-.11a5.5,5.5,0,0,0-.91-.09,5,5,0,0,0,0,10,5.5,5.5,0,0,0,.91-.09l.26-.06a6.17,6.17,0,0,0,.61-.19l.25-.1a4.78,4.78,0,0,0,.74-.4l.15-.12a4,4,0,0,0,.51-.41l.24-.25c.11-.13.22-.26.32-.4a3.06,3.06,0,0,0,.21-.29A4.95,4.95,0,0,0,202.5,68Z" transform="translate(0)" />
        </g>
        <path id="T1-B" d="M374.5,34h-168c-.5,0-1.18,0-2,0a20.15,20.15,0,0,0-8,2,20.76,20.76,0,0,0-7,6c-1,1.26-.77,1.16-4,6-2.44,3.66-2.71,3.9-4,6-1.75,2.87-2.88,5.12-3,8,0,.42,0,.77,0,1h3V68h0l-2,1v4h13l3.19-5H204a5.93,5.93,0,0,1,1.54,4,6,6,0,0,1-.35,2h11.7a6,6,0,0,1-.35-2A5.93,5.93,0,0,1,218,68h9.43l3,5h144l5.08-5H389a5.93,5.93,0,0,1,1.54,4,6,6,0,0,1-.35,2h11.7a6,6,0,0,1-.35-2A5.93,5.93,0,0,1,403,68H424.5V34Zm-170,19h-6V47h6Zm12,1h-5V48h5Zm23-13a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1h-3a1,1,0,0,1-1-1Zm12,29h-12V50h12Zm9-23a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm16,18a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V59a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm0-18a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm16,18a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V59a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm0-18a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm16,18a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V59a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm0-18a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm16,18a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V59a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm0-18a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm16,0a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm16,0a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h10a1,1,0,0,1,1,1Zm9,18a1,1,0,0,1-1,1h-3a1,1,0,0,1-1-1V59a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1Zm0-18a1,1,0,0,1-1,1h-3a1,1,0,0,1-1-1V41a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1Zm40,20h-20V46h20Z" transform="translate(0)" />
        <path id="T1-D3" class="c-train__door js-door-right" d="M395.5,46V68h10V46Zm2,6a2,2,0,0,1,4,0v9a2,2,0,0,1-4,0Z" transform="translate(0)" />
        <path id="T1-D2" class="c-train__door js-door-left" d="M385.5,46V68h10V46Zm8,15a2,2,0,0,1-4,0V52a2,2,0,0,1,4,0Z" transform="translate(0)" />
        <path id="T1-D1" class="c-train__door js-door-left" d="M239.5,50V70h12V50Zm8,15a2,2,0,0,1-4,0V56a2,2,0,0,1,4,0Z" transform="translate(0)" />
      </g>
    </g>
  </svg></div>`;
  }
  document.querySelector('.js-platforms').innerHTML = html;
  gsap.set('#Train', { x: -1000 });
};

const ShowCurrentTrains = function () {
  for (const departure of stationData.departures.departure) {
    if ((departure.time * 1000 - Date.now() < 180000) & (departure.time * 1000 > Date.now()) & !trains.includes(departure.vehicle)) {
      trains.push(departure.vehicle);
      gsap.set(`.js-platform${departure.platform} > #Train-master > #Train`, { x: 0 });
      OpenDoors(departure.platform);
      document.querySelector(`.js-platform${departure.platform} > h1`).innerHTML = departure.vehicle;
    }
  }
};

const UpdateTrains = function () {
  for (const departure of stationData.departures.departure) {
    if ((departure.time * 1000 <= Date.now()) & trains.includes(departure.vehicle) & (departure.canceled != 1)) {
      const index = trains.indexOf(departure.vehicle);
      if (index > -1) {
        trains.splice(index, 1);
      }
      console.log(trains);
      tl.call(CloseDoors, [departure.platform]).to(`.js-platform${departure.platform} > #Train-master > #Train`, { duration: 5, ease: 'power2.in', x: 1000 }).set(`.js-platform${departure.platform} > #Train-master > #Train`, { duration: 0, x: -1000 });
      document.querySelector(`.js-platform${departure.platform} > h1`).innerHTML = `Platform ${departure.platform}`;
    }
    if ((departure.time * 1000 - Date.now() < 180000) & (departure.time * 1000 > Date.now()) & !trains.includes(departure.vehicle)) {
      trains.push(departure.vehicle);
      console.log(trains);
      document.querySelector(`.js-platform${departure.platform} > h1`).innerHTML = departure.vehicle;
      tl2.to(`.js-platform${departure.platform} > #Train-master > #Train`, { ease: 'power2.out', duration: 5, x: 0 }).call(OpenDoors, [departure.platform]);
    }
  }
};

const OpenDoors = function (platform) {
  for (let index = 1; index < 4; index++) {
    gsap.to(`.js-platform${platform} > #Train-master > #Train > #T${index} > .js-door-left`, { ease: 'power1.inout', x: -8 });
    gsap.to(`.js-platform${platform} > #Train-master > #Train > #T${index} > .js-door-right`, { ease: 'power1.inout', x: 8 });
  }
};
const CloseDoors = function (platform) {
  for (let index = 1; index < 4; index++) {
    gsap.to(`.js-platform${platform} > #Train-master > #Train > #T${index} > .js-door-left`, { ease: 'power1.inout', x: 0 });
    gsap.to(`.js-platform${platform} > #Train-master > #Train > #T${index} > .js-door-right`, { ease: 'power1.inout', x: 0 });
  }
};

document.addEventListener('DOMContentLoaded', async function () {
  stationData = await getData();
  console.log(stationData);
  ShowPlatforms();
  ShowCurrentTrains();
  setInterval(UpdateTrains, 1000);
  setInterval(async function () {
    stationData = await getData();
    console.log(stationData);
  }, 300000);
  setInterval(clock, 1000);
});

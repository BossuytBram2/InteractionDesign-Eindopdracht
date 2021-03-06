let platforms = [];
let stationData = {};
let stations = {};
let trains = [];
let stationId = 'BE.NMBS.008813003';
let position;
let digital = false;
let tl = gsap.timeline({});
let tl2 = gsap.timeline({});
let tl3 = gsap.timeline({});
let tl4 = gsap.timeline({});

function compare(a, b) {
  if (a.standardname < b.standardname) {
    return -1;
  }
  if (a.standardname > b.standardname) {
    return 1;
  }
  return 0;
}
function compareDistance(a, b) {
  let dista = Math.pow(parseFloat(a.locationY) - position.coords.latitude, 2) + Math.pow(parseFloat(a.locationX) - position.coords.longitude, 2);
  let distb = Math.pow(parseFloat(b.locationY) - position.coords.latitude, 2) + Math.pow(parseFloat(b.locationX) - position.coords.longitude, 2);
  return dista - distb;
}

const clock = function () {
  const d = new Date();
  if (digital) {
    document.querySelector('.js-clock').innerHTML = d.toLocaleTimeString();
  } else {
    if (d.getSeconds() == 0) {
      tl3.set('#Clock-Seconds', { rotation: -6 });
      if (d.getMinutes() == 0) {
        tl3.set('#Clock-Minutes', { rotation: -0.1 });
        if (d.getHours() % 12 == 0) {
          tl3.set('Clock-Hours', { rotation: -0.1 / 60 });
        }
      }
    }

    tl3
      .set('#Clock-Seconds', {
        transformOrigin: '50% 84.88%',
      })
      .set('#Clock-Minutes', {
        transformOrigin: '50% 76.40%',
      })
      .set('#Clock-Hours', {
        transformOrigin: '50% 72.00%',
      })
      .to('#Clock-Seconds', {
        duration: 1,
        rotation: d.getSeconds() * 6,
        ease: 'power4.out',
      })
      .to(
        '#Clock-Minutes',
        {
          duration: 1,
          rotation: (d.getSeconds() + d.getMinutes() * 60) / 10,
          ease: 'none',
        },
        '<'
      )
      .to(
        '#Clock-Hours',
        {
          duration: 1,
          rotation: (d.getSeconds() + d.getMinutes() * 60 + (d.getHours() % 12) * 3600) / 120,
          ease: 'none',
        },
        '<'
      );
  }
};

const switchClock = function () {
  if (digital) {
    digital = false;
    document.querySelector('.js-clock').innerHTML = `<svg id="Clock-Master" class="c-clock-master" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Clock">
      <g id="Clock-Body">
        <path d="M100,20a80,80,0,1,0,80,80A80,80,0,0,0,100,20Zm0,158a78,78,0,1,1,78-78A78,78,0,0,1,100,178Z" transform="translate(0 0)" />
        <g id="Clock-digits">
          <rect x="98" y="160" width="4" height="16" />
          <rect x="98" y="24" width="4" height="16" />
          <rect x="128.69" y="163.69" width="2" height="6" transform="translate(-56.59 67.16) rotate(-24)" />
          <rect x="69.31" y="30.31" width="2" height="6" transform="translate(-7.47 31.48) rotate(-24)" />
          <rect x="106.63" y="169.6" width="2" height="6" transform="translate(-17.45 12.2) rotate(-6)" />
          <rect x="91.37" y="24.4" width="2" height="6" transform="translate(-2.36 9.81) rotate(-6)" />
          <rect x="114.18" y="168.4" width="2" height="6" transform="translate(-33.12 27.69) rotate(-12)" />
          <rect x="83.82" y="25.6" width="2" height="6" transform="translate(-4.09 18.26) rotate(-12)" />
          <rect x="121.56" y="166.43" width="2" height="6" transform="translate(-46.36 46.16) rotate(-18)" />
          <rect x="76.44" y="27.57" width="2" height="6" transform="translate(-5.66 25.43) rotate(-18)" />
          <rect x="132" y="150.89" width="4" height="16" transform="translate(-61.49 88.29) rotate(-30)" />
          <rect x="64" y="33.11" width="4" height="16" transform="translate(-11.71 38.51) rotate(-30)" />
          <rect x="158.06" y="139.91" width="2" height="6" transform="translate(-50.05 187.59) rotate(-54)" />
          <rect x="39.94" y="54.09" width="2" height="6" transform="translate(-29.31 56.66) rotate(-54)" />
          <rect x="141.91" y="156.06" width="2" height="6" transform="translate(-66.2 114.38) rotate(-36)" />
          <rect x="56.09" y="37.94" width="2" height="6" transform="matrix(0.81, -0.59, 0.59, 0.81, -13.16, 41.38)" />
          <rect x="147.85" y="151.25" width="2" height="6" transform="translate(-64.98 139.22) rotate(-42)" />
          <rect x="50.15" y="42.75" width="2" height="6" transform="translate(-17.47 45.98) rotate(-42)" />
          <rect x="153.25" y="145.85" width="2" height="6" transform="translate(-59.58 163.88) rotate(-48)" />
          <rect x="44.75" y="48.15" width="2" height="6" transform="translate(-22.88 50.92) rotate(-48)" />
          <rect x="156.89" y="126" width="4" height="16" transform="translate(-36.6 204.6) rotate(-60)" />
          <rect x="39.11" y="58" width="4" height="16" transform="translate(-36.6 68.6) rotate(-60)" />
          <rect x="171.6" y="104.63" width="2" height="6" transform="translate(47.52 268.03) rotate(-84)" />
          <rect x="26.4" y="89.37" width="2" height="6" transform="translate(-67.33 109.96) rotate(-84)" />
          <rect x="165.69" y="126.69" width="2" height="6" transform="translate(-19.59 229.22) rotate(-66)" />
          <rect x="32.31" y="67.31" width="2" height="6" transform="translate(-44.47 72.14) rotate(-66)" />
          <rect x="168.43" y="119.56" width="2" height="6" transform="translate(0.51 245.82) rotate(-72)" />
          <rect x="29.57" y="74.44" width="2" height="6" transform="translate(-52.53 82.59) rotate(-72)" />
          <rect x="170.4" y="112.18" width="2" height="6" transform="translate(23.11 258.89) rotate(-78)" />
          <rect x="27.6" y="81.82" width="2" height="6" transform="translate(-60.32 95.16) rotate(-78)" />
          <rect x="166" y="92" width="4" height="16" transform="translate(68 268) rotate(-90)" />
          <rect x="30" y="92" width="4" height="16" transform="translate(-68 132) rotate(-90)" />
          <rect x="165.69" y="67.31" width="2" height="6" transform="translate(170.26 251.18) rotate(-114)" />
          <rect x="32.31" y="126.69" width="2" height="6" transform="translate(-71.62 212.87) rotate(-114)" />
          <rect x="171.6" y="89.37" width="2" height="6" transform="translate(98.78 273.68) rotate(-96)" />
          <rect x="26.4" y="104.63" width="2" height="6" transform="translate(-76.78 146.13) rotate(-96)" />
          <rect x="170.4" y="81.82" width="2" height="6" transform="translate(124.07 270.12) rotate(-102)" />
          <rect x="27.6" y="112.18" width="2" height="6" transform="translate(-78.12 167.09) rotate(-102)" />
          <rect x="168.43" y="74.44" width="2" height="6" transform="translate(148.13 262.51) rotate(-108)" />
          <rect x="29.57" y="119.56" width="2" height="6" transform="translate(-76.54 189.51) rotate(-108)" />
          <rect x="156.89" y="58" width="4" height="16" transform="translate(181.18 236.6) rotate(-120)" />
          <rect x="39.11" y="126" width="4" height="16" transform="translate(-54.38 236.6) rotate(-120)" />
          <rect x="141.91" y="37.94" width="2" height="6" transform="translate(234.46 158.06) rotate(-144)" />
          <rect x="56.09" y="156.06" width="2" height="6" transform="translate(9.79 321.3) rotate(-144)" />
          <rect x="158.06" y="54.09" width="2" height="6" transform="translate(206.36 219.33) rotate(-126)" />
          <rect x="39.94" y="139.91" width="2" height="6" transform="matrix(-0.59, -0.81, 0.81, -0.59, -50.61, 260.03)" />
          <rect x="153.25" y="48.15" width="2" height="6" transform="translate(219.45 200.01) rotate(-132)" />
          <rect x="44.75" y="145.85" width="2" height="6" transform="translate(-34.25 282.44) rotate(-132)" />
          <rect x="147.85" y="42.75" width="2" height="6" transform="translate(228.85 179.35) rotate(-138)" />
          <rect x="50.15" y="151.25" width="2" height="6" transform="translate(-14.05 303.11) rotate(-138)" />
          <rect x="132" y="33.11" width="4" height="16" transform="translate(229.49 143.71) rotate(-150)" />
          <rect x="64" y="150.89" width="4" height="16" transform="translate(43.71 329.49) rotate(-150)" />
          <rect x="106.63" y="24.4" width="2" height="6" transform="matrix(-0.99, -0.1, 0.1, -0.99, 211.81, 65.9)" />
          <rect x="91.37" y="169.6" width="2" height="6" transform="translate(166.19 353.91) rotate(-174)" />
          <rect x="128.69" y="30.31" width="2" height="6" transform="translate(234.62 116.49) rotate(-156)" />
          <rect x="69.31" y="163.69" width="2" height="6" transform="translate(66.74 347.56) rotate(-156)" />
          <rect x="121.56" y="27.57" width="2" height="6" transform="translate(229.67 97.52) rotate(-162)" />
          <rect x="76.44" y="166.43" width="2" height="6" transform="translate(98.74 354.49) rotate(-162)" />
          <rect x="114.18" y="25.6" width="2" height="6" transform="translate(221.89 80.51) rotate(-168)" />
          <rect x="83.82" y="168.4" width="2" height="6" transform="translate(132.15 356.7) rotate(-168)" />
        </g>
        <circle id="Clock-Center" cx="100" cy="100" r="5" />
      </g>
      <path id="Clock-Hours" d="M103,46H97q-1,37.5-2,75h10Q104,83.5,103,46Z" transform="translate(0 0)" />
      <path id="Clock-Minutes" d="M101,32q1,44.51,2,89H97q1-44.5,2-89Z" transform="translate(0 0)" />
      <path id="Clock-Seconds" class="c-clock-seconds" d="M99,66.93V95.62a4.49,4.49,0,0,0,0,8.76V113h2v-8.62a4.49,4.49,0,0,0,0-8.76V66.93a7.5,7.5,0,0,0,0-14.86V27H99V52.07a7.5,7.5,0,0,0,0,14.86ZM100,64a4.5,4.5,0,1,1,4.5-4.5A4.49,4.49,0,0,1,100,64Z" transform="translate(0 0)" />
    </g>
  </svg>`;
  } else {
    digital = true;
    const d = new Date();
    document.querySelector('.js-clock').innerHTML = d.toLocaleTimeString();
  }
};

const listenToClockClick = function () {
  document.querySelector('.js-clocks').addEventListener('click', function () {
    tl4.to('.js-clocks', { duration: 2, ease: "elastic.in(1, 1)", scale: 0 }).call(switchClock).to('.js-clocks', { duration: 2, ease: "elastic.out(1, 1)", scale: 1 });
  });
};

const listenToClockMouseenter = function () {
  document.querySelector('.js-clocks').addEventListener('mouseenter', function () {
    this.style.cursor = 'pointer';
    gsap.to('.js-clock', { duration: 1, scale: 1.1 });
  });
};

const listenToClockmouseleave = function () {
  document.querySelector('.js-clocks').addEventListener('mouseleave', function () {
    gsap.to('.js-clock', { duration: 1, scale: 1 });
  });
};

const getLocation = async function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(GetNearestStation);
  }
};

const GetNearestStation = function (location) {
  position = location;
  stationId = stations.station.sort(compareDistance)[0].id;
  ShowStation(stationId);
};

const ShowSelect = async function () {
  html = '';
  for (const station of stations.station.sort(compare)) {
    html += `<option value="${station.id}">${station.standardname}</option>`;
  }
  document.querySelector('.js-select').innerHTML = html;
  document.querySelector('.js-select').value = stationData.stationinfo.id;
  document.querySelector('.js-select').addEventListener('change', function () {
    ShowStation(this.value);
  });
};

const ShowStation = async function (station) {
  stationId = station;
  stationData = await getData(`https://api.irail.be/liveboard/?format=json&id=${stationId}`);
  console.log(stationData);
  document.querySelector('.js-station').innerHTML = stationData.station.split('/')[0];
  document.querySelector('.js-select').value = stationData.stationinfo.id;
  platforms = [];
  ShowPlatforms();
  trains = [];
  ShowCurrentTrains();
};

const ShowPlatforms = function () {
  for (const departure of stationData.departures.departure) {
    if (!platforms.includes(departure.platform) & (departure.platform != '?')) {
      platforms.push(departure.platform);
    }
  }
  if (platforms.includes('A')) {
    platforms.sort();
  } else {
    platforms.sort((a, b) => parseInt(a) - parseInt(b));
  }
  html = '';
  for (const plat of platforms) {
    html += `
    <h2 class="c-platform">${plat}</h2>
    <h2 class="js-vehicle${plat} c-vehicle"></h2>
    <h2 class="js-destination${plat} c-destination"></h2>
    <div class="c-grid__item js-platform${plat}">
    <svg id="Train-master" class="c-train-master" xmlns="http://www.w3.org/2000/svg" viewBox="0 30 1100 50">
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
  if (platforms.length == 0) {
    html += `
    <h2 class="c-platform">?</h2>
    <h2 class="js-vehicle? c-vehicle"></h2>
    <h2 class="js-destination? c-destination"></h2>
    <div class="c-grid__item js-platform?">
    <svg id="Train-master" class="c-train-master" xmlns="http://www.w3.org/2000/svg" viewBox="0 30 1100 50">
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
    if ((departure.time * 1000 - Date.now() < 180000) & (departure.time * 1000 > Date.now()) & !trains.includes(departure.vehicle) & (departure.canceled != 1)) {
      trains.push(departure.vehicle);
      gsap.set(`.js-platform${departure.platform} > #Train-master > #Train`, { x: 0 });
      OpenDoors(departure.platform);
      document.querySelector(`.js-vehicle${departure.platform}`).innerHTML = departure.vehicleinfo.shortname;
      document.querySelector(`.js-destination${departure.platform}`).innerHTML = departure.station.split('/')[0];
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
      document.querySelector(`.js-vehicle${departure.platform}`).innerHTML = ``;
      document.querySelector(`.js-destination${departure.platform}`).innerHTML = ``;
    }
    if ((departure.time * 1000 - Date.now() < 180000) & (departure.time * 1000 > Date.now()) & !trains.includes(departure.vehicle)) {
      trains.push(departure.vehicle);
      console.log(trains);
      document.querySelector(`.js-vehicle${departure.platform}`).innerHTML = departure.vehicleinfo.shortname;
      document.querySelector(`.js-destination${departure.platform}`).innerHTML = departure.station;
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
  listenToClockClick();
  listenToClockMouseenter();
  listenToClockmouseleave();
  stations = await getData('https://api.irail.be/stations/?format=json&lang=en');
  getLocation();
  stationData = await getData(`https://api.irail.be/liveboard/?format=json&id=${stationId}`);
  ShowSelect();
  console.log(stationData);
  document.querySelector('.js-station').innerHTML = stationData.station;
  ShowPlatforms();
  ShowCurrentTrains();
  setInterval(UpdateTrains, 1000);
  setInterval(async function () {
    stationData = await getData(`https://api.irail.be/liveboard/?format=json&id=${stationId}`);
    console.log(stationData);
  }, 300000);
  setInterval(clock, 1000);
});

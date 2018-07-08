import clock from "clock";
import document from "document";
import * as Utils from '../common/utils';
import * as ConfigFile from '../common/configFile';
import * as messaging from "messaging";


const NUM_OF_DEGREES = 360;
const NUM_OF_HOURS = 12;
const NUM_OF_MINUTES = 60;
const NUM_OF_SECONDS = 60;

const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

const DEFAULT_COLOR = '#00BFFF';
const CLOCK_COLOR_KEY = 'clockColor';

// Fetch handles to UI elements
const arcSeconds = document.getElementById("arcSeconds");
const arcMinutes = document.getElementById("arcMinutes");
const arcHours = document.getElementById("arcHours");
const dayNumber = document.getElementById("dayNumber");
const dayName = document.getElementById("dayName");


// clock colors
let clockColor, clockTime;

// Initialize
init();

// Update the clock every second
clock.granularity = "seconds";

// Update current time every second
clock.ontick = (evt) => {
  clockTime = evt.date;
  render(clockTime, clockColor);
}

// Update color when a settings message is received
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data.key == CLOCK_COLOR_KEY) {
    clockColor = evt.data.value;
    render(clockTime, clockColor);
    ConfigFile.setItem(CLOCK_COLOR_KEY, clockColor)
    ConfigFile.save();
  }
}

function init() {
  clockTime = null;
  clockColor = DEFAULT_COLOR;
  if(ConfigFile.load()) {
    let color = ConfigFile.getItem(CLOCK_COLOR_KEY)
    clockColor  = color ? color : clockColor
  }
}

// Render clock face according to color and time
function render(time, color) {
  let hours = time.getHours() % 12;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  
  let hoursOpacity = -0.4 + (hours/20);
  let minutesOpacity = -0.5 + (minutes/100);
  let secondsOpacity = -0.6 + (seconds/100);
  
  arcHours.sweepAngle = NUM_OF_DEGREES / NUM_OF_HOURS * (hours + minutes/NUM_OF_MINUTES);
  arcMinutes.sweepAngle = NUM_OF_DEGREES / NUM_OF_MINUTES * (minutes + seconds/NUM_OF_SECONDS);
  arcSeconds.sweepAngle = NUM_OF_DEGREES / NUM_OF_SECONDS * seconds;
  
  arcHours.style.fill = Utils.colorLuminance(color, hoursOpacity);
  arcMinutes.style.fill = Utils.colorLuminance(color, minutesOpacity);
  arcSeconds.style.fill = Utils.colorLuminance(color, secondsOpacity);
  
  dayNumber.text = Utils.zeroPad(time.getDate());
  dayName.text = days[time.getDay()];
}

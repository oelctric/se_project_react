import { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js';
import './ToggleSwitch.css';

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__input"
        checked={currentTemperatureUnit === 'C'}
        onChange={handleToggleSwitchChange}
        aria-label="Toggle temperature unit"
      />
      <span className="toggle-switch__knob" aria-hidden="true">
        {currentTemperatureUnit}
      </span>
      <span
        className="toggle-switch__unit toggle-switch__unit--f"
        aria-hidden="true"
      >
        F
      </span>
      <span
        className="toggle-switch__unit toggle-switch__unit--c"
        aria-hidden="true"
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;

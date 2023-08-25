import React from 'react';

const Sidebar = ({ isClockwise, toggleClockwise, iconSize, toggleIconSize, cursorTracking, toggleCursorTracking }) => {
  return (
    <div className="Sidebar">
      <div className = "Togglebutton">
        <label>
          Track Rotate Icon:
          <input type="checkbox" checked={isClockwise} onChange={toggleClockwise} />
        </label>
      </div>
      <div className = "Togglebutton">
        <label>
          Track Resize Icon:
          <input type="checkbox" checked={iconSize > 250} onChange={toggleIconSize} />
        </label>
      </div>
      <div className = "Togglebutton">
        <label>
          Track Cursor Inactivity:
          <input type="checkbox" checked={cursorTracking} onChange={toggleCursorTracking} />
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
